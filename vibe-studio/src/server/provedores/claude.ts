/**
 * Agentes que usam o Claude: Diretor (roteiro), Editor (alterações por chat)
 * e Revisor (confere os quadros montados). Saída sempre estruturada (JSON
 * validado pelo schema), com fallback de modelo no servidor ligado.
 */
import Anthropic from '@anthropic-ai/sdk';
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod';
import * as z from 'zod/v4';
import { FUNDOS, LAYOUTS, RoteiroIA } from '../../shared/spec';
import { CONFIG } from '../config';
import { obterChave } from '../chaves';
import { ErroApp } from '../util';
import { SISTEMA_DIRETOR, SISTEMA_EDITOR, SISTEMA_REVISOR } from '../prompts';

// US$ por milhão de tokens (entrada, saída)
const PRECOS: Record<string, [number, number]> = {
  'claude-fable-5-2': [8, 40],
  'claude-opus-5-5': [4, 20],
  'claude-sonnet-5-5': [2, 10],
  'claude-haiku-5-5': [0.1, 0.5],
};

export type ImagemEntrada = { mime: 'image/jpeg' | 'image/png' | 'image/webp'; base64: string; rotulo: string };
export type Resultado<T> = { dados: T; usd: number; modelo: string; tokens: { entrada: number; saida: number } };

function cliente(): Anthropic {
  const chave = obterChave('anthropic');
  if (!chave) throw new ErroApp('A chave do Claude (Anthropic) não está configurada.', 400);
  return new Anthropic({ apiKey: chave, maxRetries: 3, timeout: 9 * 60 * 1000 });
}

function custo(uso: { input_tokens: number; output_tokens: number; cache_creation_input_tokens?: number | null; cache_read_input_tokens?: number | null }, modelo: string): number {
  const [e, s] = PRECOS[modelo] ?? PRECOS[CONFIG.modeloClaude] ?? [4, 20];
  const entrada = uso.input_tokens + (uso.cache_creation_input_tokens ?? 0) * 1.25 + (uso.cache_read_input_tokens ?? 0) * 0.1;
  return (entrada * e + uso.output_tokens * s) / 1_000_000;
}

function blocos(imagens: ImagemEntrada[], texto: string): Anthropic.Beta.BetaContentBlockParam[] {
  const b: Anthropic.Beta.BetaContentBlockParam[] = [];
  for (const im of imagens) {
    b.push({ type: 'text', text: im.rotulo });
    b.push({ type: 'image', source: { type: 'base64', media_type: im.mime, data: im.base64 } });
  }
  b.push({ type: 'text', text: texto });
  return b;
}

async function estruturado<T>(schema: z.ZodType<T>, sistema: string, conteudo: Anthropic.Beta.BetaContentBlockParam[]): Promise<Resultado<T>> {
  const c = cliente();
  try {
    const r = await c.beta.messages.parse({
      model: CONFIG.modeloClaude,
      max_tokens: 16000,
      system: sistema,
      messages: [{ role: 'user', content: conteudo }],
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { format: betaZodOutputFormat(schema), effort: CONFIG.esforcoClaude },
    });
    if (r.stop_reason === 'refusal') throw new ErroApp('O Claude não aceitou este pedido. Tente escrever de outra forma.', 400);
    if (r.stop_reason === 'max_tokens') throw new ErroApp('A resposta do Claude ficou longa demais. Peça um vídeo mais curto.', 400);
    if (!r.parsed_output) throw new ErroApp('O Claude não devolveu um roteiro válido. Tente de novo.', 502);
    return { dados: r.parsed_output as T, usd: custo(r.usage, r.model), modelo: r.model, tokens: { entrada: r.usage.input_tokens, saida: r.usage.output_tokens } };
  } catch (e) {
    if (e instanceof ErroApp) throw e;
    if (e instanceof Anthropic.AuthenticationError) throw new ErroApp('A chave do Claude é inválida.', 400);
    if (e instanceof Anthropic.PermissionDeniedError) throw new ErroApp('A chave do Claude não tem permissão para este modelo.', 400);
    if (e instanceof Anthropic.RateLimitError) throw new ErroApp('Limite de uso do Claude atingido. Tente de novo em alguns instantes.', 429);
    if (e instanceof Anthropic.BadRequestError && /schema|output_config|format|grammar/i.test(e.message)) return semFormato(schema, sistema, conteudo);
    if (e instanceof Anthropic.BadRequestError) throw new ErroApp('A API do Claude recusou o pedido: ' + e.message.slice(0, 300), 400);
    if (e instanceof Anthropic.APIError) throw new ErroApp(`A API do Claude falhou (erro ${e.status}). Tente de novo.`, 502);
    throw e;
  }
}

/**
 * Plano B: se a API recusar o formato estruturado (ex.: schema complexo demais),
 * pede o JSON no texto e valida com o mesmo schema.
 */
async function semFormato<T>(schema: z.ZodType<T>, sistema: string, conteudo: Anthropic.Beta.BetaContentBlockParam[]): Promise<Resultado<T>> {
  const c = cliente();
  const jsonSchema = JSON.stringify(z.toJSONSchema(schema));
  const instrucao = `\n\nResponda SOMENTE com um objeto JSON válido (sem texto antes ou depois, sem markdown) que siga exatamente este JSON Schema:\n${jsonSchema}`;
  const r = await c.beta.messages.create({
    model: CONFIG.modeloClaude,
    max_tokens: 16000,
    system: sistema + instrucao,
    messages: [{ role: 'user', content: conteudo }],
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort: CONFIG.esforcoClaude },
  });
  if (r.stop_reason === 'refusal') throw new ErroApp('O Claude não aceitou este pedido. Tente escrever de outra forma.', 400);
  const texto = r.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
  const ini = texto.indexOf('{');
  const fim = texto.lastIndexOf('}');
  let dados: unknown = null;
  try { dados = JSON.parse(texto.slice(ini, fim + 1)); } catch { /* inválido */ }
  const v = schema.safeParse(dados);
  if (!v.success) throw new ErroApp('O Claude devolveu um roteiro fora do formato. Tente de novo.', 502);
  return { dados: v.data, usd: custo(r.usage, r.model), modelo: r.model, tokens: { entrada: r.usage.input_tokens, saida: r.usage.output_tokens } };
}

/** Diretor: pedido + fotos -> roteiro completo. */
export function dirigir(mensagem: string, imagens: ImagemEntrada[]): Promise<Resultado<RoteiroIA>> {
  return estruturado(RoteiroIA, SISTEMA_DIRETOR, blocos(imagens, mensagem));
}

const Edicao = z.object({
  roteiro: RoteiroIA,
  resumo: z.string().describe('O que mudou, em 1 ou 2 frases, falando com o cliente'),
});
export type Edicao = z.infer<typeof Edicao>;

/** Editor: roteiro atual + pedido do cliente -> roteiro alterado. */
export function editar(p: { roteiro: RoteiroIA; pedido: string; contexto: string; imagens: ImagemEntrada[] }): Promise<Resultado<Edicao>> {
  const texto = `ROTEIRO ATUAL (JSON):\n${JSON.stringify(p.roteiro)}\n\n${p.contexto}\n\nPEDIDO DE ALTERAÇÃO DO CLIENTE:\n"""${p.pedido.trim()}"""`;
  return estruturado(Edicao, SISTEMA_EDITOR, blocos(p.imagens, texto));
}

export const Revisao = z.object({
  ok: z.boolean(),
  problemas: z.array(z.object({
    cena: z.number().int().describe('número da cena, começando em 1'),
    problema: z.string(),
    correcao: z.object({
      titulo: z.string().nullable(),
      subtitulo: z.string().nullable(),
      destaques: z.array(z.string()).nullable(),
      fundo: z.enum(FUNDOS).nullable(),
      layout: z.enum(LAYOUTS).nullable(),
    }),
  })),
});
export type Revisao = z.infer<typeof Revisao>;

/** Revisor: confere um quadro de cada cena. */
export function revisar(roteiro: RoteiroIA, quadros: ImagemEntrada[]): Promise<Resultado<Revisao>> {
  return estruturado(Revisao, SISTEMA_REVISOR, blocos(quadros, `ROTEIRO (JSON):\n${JSON.stringify(roteiro)}`));
}
