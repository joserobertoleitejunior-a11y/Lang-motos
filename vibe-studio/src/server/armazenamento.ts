/** Persistência simples em arquivos JSON (um usuário, poucos projetos). */
import fs from 'node:fs';
import path from 'node:path';
import type { Pedido, Referencia, RoteiroIA, VideoSpec } from '../shared/spec';
import { CONFIG } from './config';
import { agora, gravarJson, lerJson, novoId, ErroApp } from './util';

export type Personagem = { id: string; nome: string; descricao: string; imagem: string | null };
export type Marca = {
  id: string;
  nome: string;
  segmento: string;
  descricao: string;
  cores: string[];
  logo: string | null; // caminho relativo à pasta da marca
  contato: { whatsapp?: string; instagram?: string; site?: string; endereco?: string };
  personagens: Personagem[];
  criadaEm: string;
};
export type VozSalva = {
  id: string;
  nome: string;
  provedor: 'elevenlabs' | 'gemini';
  vozId: string;
  tipo: 'clone' | 'biblioteca';
  consentimento?: { declarante: string; data: string };
  criadaEm: string;
};
export type Ajustes = {
  provedorImagem: 'auto' | 'openai' | 'gemini' | 'nenhum';
  provedorVoz: 'auto' | 'elevenlabs' | 'gemini' | 'nenhum';
  modeloVozElevenlabs: string;
  qualidadeImagem: 'low' | 'medium' | 'high';
  musicaIA: boolean;
  vozPadrao: string | null; // id de VozSalva
};
export type Custo = { etapa: string; provedor: string; descricao: string; usd: number; em: string };
export type Etapa = { id: string; nome: string; status: 'aguardando' | 'rodando' | 'ok' | 'erro' | 'pulada'; detalhe?: string };
export type Versao = {
  n: number;
  criadaEm: string;
  origem: 'criacao' | 'chat' | 'revisao' | 'restaurada';
  pedidoChat?: string;
  resumo?: string;
  roteiro: RoteiroIA;
  spec: VideoSpec | null;
  render: { arquivo: string; capa: string; criadoEm: string; segundos: number } | null;
  custos: Custo[];
};
export type Mensagem = { de: 'voce' | 'diretor'; texto: string; em: string };
export type Projeto = {
  id: string;
  titulo: string;
  criadoEm: string;
  atualizadoEm: string;
  pedido: Pedido;
  referencias: Referencia[];
  versoes: Versao[];
  versaoAtual: number;
  status: 'gerando' | 'pronto' | 'renderizando' | 'erro';
  etapas: Etapa[];
  erro: string | null;
  mensagens: Mensagem[];
};

const AJUSTES_PADRAO: Ajustes = { provedorImagem: 'auto', provedorVoz: 'auto', modeloVozElevenlabs: 'eleven_multilingual_v2', qualidadeImagem: 'medium', musicaIA: false, vozPadrao: null };

export const caminhos = {
  projetos: () => path.join(CONFIG.dados, 'projetos'),
  projeto: (id: string) => path.join(CONFIG.dados, 'projetos', seguro(id)),
  marcas: () => path.join(CONFIG.dados, 'marcas'),
  marca: (id: string) => path.join(CONFIG.dados, 'marcas', seguro(id)),
};

export function seguro(id: string): string {
  if (!/^[a-z0-9]{4,40}$/.test(id)) throw new ErroApp('Identificador inválido', 400);
  return id;
}

/* ------------------------------------------------------------------ ajustes */
export const lerAjustes = (): Ajustes => ({ ...AJUSTES_PADRAO, ...lerJson<Partial<Ajustes>>(path.join(CONFIG.dados, 'ajustes.json'), {}) });
export function salvarAjustes(a: Partial<Ajustes>): Ajustes {
  const novo = { ...lerAjustes(), ...a };
  gravarJson(path.join(CONFIG.dados, 'ajustes.json'), novo);
  return novo;
}

/* ------------------------------------------------------------------ marcas */
export const listarMarcas = (): Marca[] => lerJson<Marca[]>(path.join(CONFIG.dados, 'marcas.json'), []);
export const obterMarca = (id: string | null | undefined): Marca | null => (id ? listarMarcas().find((m) => m.id === id) ?? null : null);
export function salvarMarca(dados: Partial<Marca> & { nome: string }): Marca {
  const todas = listarMarcas();
  const existente = dados.id ? todas.find((m) => m.id === dados.id) : undefined;
  const m: Marca = {
    id: existente?.id ?? novoId(),
    nome: dados.nome.trim().slice(0, 80),
    segmento: (dados.segmento ?? existente?.segmento ?? '').slice(0, 80),
    descricao: (dados.descricao ?? existente?.descricao ?? '').slice(0, 600),
    cores: (dados.cores ?? existente?.cores ?? []).filter((c) => /^#[0-9a-fA-F]{6}$/.test(c)).slice(0, 4),
    logo: existente?.logo ?? null,
    contato: { ...(existente?.contato ?? {}), ...(dados.contato ?? {}) },
    personagens: dados.personagens ?? existente?.personagens ?? [],
    criadaEm: existente?.criadaEm ?? agora(),
  };
  for (const k of Object.keys(m.contato) as (keyof Marca['contato'])[]) {
    const v = m.contato[k];
    if (typeof v !== 'string' || !v.trim()) delete m.contato[k];
    else m.contato[k] = v.trim().slice(0, 160);
  }
  const lista = existente ? todas.map((x) => (x.id === m.id ? m : x)) : [...todas, m];
  gravarJson(path.join(CONFIG.dados, 'marcas.json'), lista);
  return m;
}
export function atualizarMarca(id: string, f: (m: Marca) => void): Marca {
  const todas = listarMarcas();
  const m = todas.find((x) => x.id === id);
  if (!m) throw new ErroApp('Marca não encontrada', 404);
  f(m);
  gravarJson(path.join(CONFIG.dados, 'marcas.json'), todas);
  return m;
}
export function removerMarca(id: string) {
  gravarJson(path.join(CONFIG.dados, 'marcas.json'), listarMarcas().filter((m) => m.id !== id));
  fs.rmSync(caminhos.marca(id), { recursive: true, force: true });
}

/* ------------------------------------------------------------------ vozes */
export const listarVozes = (): VozSalva[] => lerJson<VozSalva[]>(path.join(CONFIG.dados, 'vozes.json'), []);
export function salvarVoz(v: Omit<VozSalva, 'id' | 'criadaEm'>): VozSalva {
  const nova: VozSalva = { ...v, id: novoId(), criadaEm: agora() };
  gravarJson(path.join(CONFIG.dados, 'vozes.json'), [...listarVozes(), nova]);
  return nova;
}
export function removerVoz(id: string): VozSalva | null {
  const todas = listarVozes();
  const v = todas.find((x) => x.id === id) ?? null;
  gravarJson(path.join(CONFIG.dados, 'vozes.json'), todas.filter((x) => x.id !== id));
  return v;
}

/* ------------------------------------------------------------------ projetos */
const arqProjeto = (id: string) => path.join(caminhos.projeto(id), 'projeto.json');

export function listarProjetos(): Projeto[] {
  const pasta = caminhos.projetos();
  if (!fs.existsSync(pasta)) return [];
  return fs.readdirSync(pasta)
    .filter((d) => /^[a-z0-9]{4,40}$/.test(d))
    .map((d) => lerJson<Projeto | null>(arqProjeto(d), null))
    .filter((p): p is Projeto => !!p)
    .sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
}

export function obterProjeto(id: string): Projeto {
  const p = lerJson<Projeto | null>(arqProjeto(id), null);
  if (!p) throw new ErroApp('Projeto não encontrado', 404);
  return p;
}

export function salvarProjeto(p: Projeto) {
  p.atualizadoEm = agora();
  gravarJson(arqProjeto(p.id), p);
}

/** Atualiza o projeto lendo a versão mais recente do disco (evita sobrescrever mudanças paralelas). */
export function mexerProjeto(id: string, f: (p: Projeto) => void): Projeto {
  const p = obterProjeto(id);
  f(p);
  salvarProjeto(p);
  return p;
}

export function removerProjeto(id: string) {
  fs.rmSync(caminhos.projeto(id), { recursive: true, force: true });
}

/* ------------------------------------------------------------------ custos (livro-caixa) */
type Lancamento = Custo & { projeto: string };
const arqCustos = () => path.join(CONFIG.dados, 'custos.json');
export function lancarCusto(projeto: string, c: Custo) {
  const lista = lerJson<Lancamento[]>(arqCustos(), []);
  lista.push({ ...c, projeto });
  gravarJson(arqCustos(), lista.slice(-5000));
}
export function custoDoMes(): { total: number; porProvedor: Record<string, number> } {
  const mes = new Date().toISOString().slice(0, 7);
  const porProvedor: Record<string, number> = {};
  let total = 0;
  for (const l of lerJson<Lancamento[]>(arqCustos(), [])) {
    if (!l.em.startsWith(mes)) continue;
    total += l.usd;
    porProvedor[l.provedor] = (porProvedor[l.provedor] ?? 0) + l.usd;
  }
  return { total, porProvedor };
}
