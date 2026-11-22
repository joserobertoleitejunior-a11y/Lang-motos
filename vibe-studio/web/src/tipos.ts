/** Chamadas ao servidor (mesma origem, cookie de sessão). */
export class ErroApi extends Error {
  constructor(message: string, public status: number) { super(message); }
}

/* ------------------------------------------------------------------ tipos vindos do servidor */
import type { Pedido, RoteiroIA, VideoSpec, VozConfig } from '../../src/shared/spec';
export type { Pedido, RoteiroIA, VideoSpec, VozConfig };

export type StatusChave = { provedor: string; nome: string; funcao: string; configurada: boolean; origem: 'hospedagem' | 'app' | null; final: string | null };
export type Ajustes = { provedorImagem: string; provedorVoz: string; modeloVozElevenlabs: string; qualidadeImagem: string; musicaIA: boolean; vozPadrao: string | null };
export type Estado = {
  provedores: StatusChave[];
  cofre: boolean;
  ajustes: Ajustes;
  custoMes: { total: number; porProvedor: Record<string, number> };
  limites: { video: number; mes: number };
  modeloClaude: string;
  avisos: string[];
};
export type Marca = { id: string; nome: string; segmento: string; descricao: string; cores: string[]; logo: string | null; contato: { whatsapp?: string; instagram?: string; site?: string; endereco?: string }; personagens: { id: string; nome: string; descricao: string; imagem: string | null }[] };
export type VozSalva = { id: string; nome: string; provedor: 'elevenlabs' | 'gemini'; vozId: string; tipo: 'clone' | 'biblioteca' };
export type VozBiblioteca = { vozId: string; nome: string; categoria?: string; descricao: string; previa?: string | null };
export type Vozes = { salvas: VozSalva[]; elevenlabs: VozBiblioteca[] | null; gemini: VozBiblioteca[] | null; erro: string | null };
export type ResumoProjeto = { id: string; titulo: string; status: 'gerando' | 'pronto' | 'renderizando' | 'erro'; criadoEm: string; formato: string; versao: number; versoes: number; capa: string | null; segundos: number | null; custo: number; erro: string | null };
export type Etapa = { id: string; nome: string; status: 'aguardando' | 'rodando' | 'ok' | 'erro' | 'pulada'; detalhe?: string };
export type Versao = { n: number; criadaEm: string; origem: string; pedidoChat?: string; resumo?: string; roteiro: RoteiroIA; spec: VideoSpec | null; render: { arquivo: string; capa: string; segundos: number } | null; custos: { etapa: string; provedor: string; descricao: string; usd: number }[]; video: string | null; capa: string | null };
export type Projeto = {
  id: string; titulo: string; status: ResumoProjeto['status']; pedido: Pedido; etapas: Etapa[]; erro: string | null;
  mensagens: { de: 'voce' | 'diretor'; texto: string; em: string }[];
  referencias: { id: string; arquivo: string; descricao?: string; url: string }[];
  versoes: Versao[]; versaoAtual: number; resumo: ResumoProjeto;
};

export const dolar = (v: number) => `US$ ${v.toFixed(2).replace('.', ',')}`;
export const dataCurta = (iso: string) => new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

export const midiaMarca = (id: string, arq: string) => (arq.startsWith('data:') ? arq : `/midia/m/${id}/${arq}`);
