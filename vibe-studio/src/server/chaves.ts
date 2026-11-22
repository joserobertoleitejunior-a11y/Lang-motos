/**
 * Cofre de chaves de API.
 * Ordem: variável de ambiente (painel da hospedagem) > cofre criptografado no disco.
 * O cofre usa AES-256-GCM com chave derivada de SEGREDO_CHAVES. Os valores
 * nunca voltam para o navegador (só os 4 últimos caracteres).
 */
import crypto from 'node:crypto';
import path from 'node:path';
import { CONFIG } from './config';
import { gravarJson, lerJson, ErroApp } from './util';

export const PROVEDORES = {
  anthropic: { env: 'ANTHROPIC_API_KEY', nome: 'Claude (Anthropic)', funcao: 'Roteiro, edição por chat e revisão' },
  elevenlabs: { env: 'ELEVENLABS_API_KEY', nome: 'ElevenLabs', funcao: 'Vozes, clonagem e música' },
  openai: { env: 'OPENAI_API_KEY', nome: 'OpenAI', funcao: 'Imagens (com fundo transparente) e edição de fotos' },
  gemini: { env: 'GEMINI_API_KEY', nome: 'Google Gemini', funcao: 'Imagens Nano Banana e voz econômica' },
  fal: { env: 'FAL_KEY', nome: 'fal.ai', funcao: 'Clipes de vídeo (Kling) e recorte de fundo' },
} as const;
export type Provedor = keyof typeof PROVEDORES;

type Cofre = Record<string, { iv: string; tag: string; dados: string; final: string; em: string }>;
const arquivo = () => path.join(CONFIG.dados, 'chaves.enc.json');

function chaveMestra(): Buffer {
  return crypto.scryptSync(CONFIG.segredoChaves, 'vibe-studio-cofre-v1', 32);
}

export function obterChave(p: Provedor): string | null {
  const env = process.env[PROVEDORES[p].env];
  if (env && env.trim()) return env.trim();
  const c = lerJson<Cofre>(arquivo(), {})[p];
  if (!c || !CONFIG.segredoChaves) return null;
  try {
    const dec = crypto.createDecipheriv('aes-256-gcm', chaveMestra(), Buffer.from(c.iv, 'base64'));
    dec.setAuthTag(Buffer.from(c.tag, 'base64'));
    return Buffer.concat([dec.update(Buffer.from(c.dados, 'base64')), dec.final()]).toString('utf8');
  } catch {
    return null;
  }
}

export function salvarChave(p: Provedor, valor: string) {
  const v = valor.trim();
  if (v.length < 12 || v.length > 400 || /\s/.test(v)) throw new ErroApp('Chave com formato inválido.');
  const iv = crypto.randomBytes(12);
  const cif = crypto.createCipheriv('aes-256-gcm', chaveMestra(), iv);
  const dados = Buffer.concat([cif.update(v, 'utf8'), cif.final()]);
  const cofre = lerJson<Cofre>(arquivo(), {});
  cofre[p] = { iv: iv.toString('base64'), tag: cif.getAuthTag().toString('base64'), dados: dados.toString('base64'), final: v.slice(-4), em: new Date().toISOString() };
  gravarJson(arquivo(), cofre);
}

export function removerChave(p: Provedor) {
  const cofre = lerJson<Cofre>(arquivo(), {});
  delete cofre[p];
  gravarJson(arquivo(), cofre);
}

export function statusChaves() {
  const cofre = lerJson<Cofre>(arquivo(), {});
  return (Object.keys(PROVEDORES) as Provedor[]).map((p) => {
    const env = process.env[PROVEDORES[p].env]?.trim();
    return {
      provedor: p,
      nome: PROVEDORES[p].nome,
      funcao: PROVEDORES[p].funcao,
      configurada: !!obterChave(p),
      origem: env ? 'hospedagem' : cofre[p] ? 'app' : null,
      final: env ? env.slice(-4) : cofre[p]?.final ?? null,
    };
  });
}

export const temChave = (p: Provedor) => !!obterChave(p);
export const cofreDisponivel = () => !!CONFIG.segredoChaves && CONFIG.segredoChaves.length >= 16;
