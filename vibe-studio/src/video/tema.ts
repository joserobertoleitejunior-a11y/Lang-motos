import { staticFile } from 'remotion';
import type { Estilo, Fundo, Paleta } from '../shared/spec';
import { contraste, corLegivelSobre } from '../shared/linhaDoTempo';

export type Tema = {
  fonteTitulo: string;
  pesoTitulo: number;
  fonteTexto: string;
  pesoTexto: number;
  caixaAlta: boolean;
  espacamento: string; // letter-spacing do título
  alturaLinha: number;
  raio: number; // fração da menor dimensão
  bolhas: boolean; // decoração de fundo
};

export const TEMAS: Record<Estilo, Tema> = {
  'fofo-3d': { fonteTitulo: 'Fredoka', pesoTitulo: 700, fonteTexto: 'Nunito', pesoTexto: 800, caixaAlta: false, espacamento: '-0.01em', alturaLinha: 1.05, raio: 0.045, bolhas: true },
  moderno: { fonteTitulo: 'Bricolage Grotesque', pesoTitulo: 800, fonteTexto: 'Inter', pesoTexto: 600, caixaAlta: false, espacamento: '-0.035em', alturaLinha: 1.0, raio: 0.03, bolhas: false },
  impacto: { fonteTitulo: 'Anton', pesoTitulo: 400, fonteTexto: 'Inter', pesoTexto: 700, caixaAlta: true, espacamento: '0.005em', alturaLinha: 1.02, raio: 0.02, bolhas: false },
  elegante: { fonteTitulo: 'Playfair Display', pesoTitulo: 700, fonteTexto: 'Inter', pesoTexto: 500, caixaAlta: false, espacamento: '-0.015em', alturaLinha: 1.08, raio: 0.03, bolhas: false },
  minimalista: { fonteTitulo: 'Inter', pesoTitulo: 800, fonteTexto: 'Inter', pesoTexto: 500, caixaAlta: false, espacamento: '-0.045em', alturaLinha: 1.0, raio: 0.03, bolhas: false },
};

/** Arquivos de fonte empacotados em public/fontes (sem depender da internet). */
export const ARQUIVOS_FONTES: { family: string; weight: string; style?: string; arquivo: string }[] = [
  ...[600, 700, 800].map((w) => ({ family: 'Bricolage Grotesque', weight: String(w), arquivo: `bricolage-grotesque-latin-${w}-normal.woff2` })),
  ...[400, 500, 600, 700, 800].map((w) => ({ family: 'Inter', weight: String(w), arquivo: `inter-latin-${w}-normal.woff2` })),
  ...[500, 600, 700].map((w) => ({ family: 'Fredoka', weight: String(w), arquivo: `fredoka-latin-${w}-normal.woff2` })),
  ...[600, 700, 800, 900].map((w) => ({ family: 'Nunito', weight: String(w), arquivo: `nunito-latin-${w}-normal.woff2` })),
  { family: 'Anton', weight: '400', arquivo: 'anton-latin-400-normal.woff2' },
  ...[600, 700, 800].map((w) => ({ family: 'Playfair Display', weight: String(w), arquivo: `playfair-display-latin-${w}-normal.woff2` })),
  { family: 'Playfair Display', weight: '700', style: 'italic', arquivo: 'playfair-display-latin-700-italic.woff2' },
  ...[600, 700].map((w) => ({ family: 'Caveat', weight: String(w), arquivo: `caveat-latin-${w}-normal.woff2` })),
];

export const pilhaFonte = (f: string) => `'${f}', 'Inter', system-ui, sans-serif`;

/** URL de mídia: absoluta (http/data) passa direto; relativa vem de public/. */
declare global { interface Window { __VCP_ASSETS?: Record<string, string> } }

export function src(s: string): string {
  const embutido = typeof window !== 'undefined' ? window.__VCP_ASSETS?.[s] : undefined;
  if (embutido) return embutido;
  return /^(https?:|data:|blob:|\/midia\/)/.test(s) ? s : staticFile(s.replace(/^\//, ''));
}

/* ------------------------------------------------------------------ cores */

export function hexParaRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function alfa(hex: string, a: number): string {
  const [r, g, b] = hexParaRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

export function misturar(a: string, b: string, t: number): string {
  const ca = hexParaRgb(a);
  const cb = hexParaRgb(b);
  const c = ca.map((v, i) => Math.round(v + (cb[i] - v) * t));
  return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
}

export type CoresFundo = { base: string; texto: string; destaque: string; suave: string; cartao: string; textoCartao: string; escuro: boolean };

export function coresDoFundo(fundo: Fundo, p: Paleta): CoresFundo {
  switch (fundo) {
    case 'escuro': {
      const base = '#0F1218';
      const destaque = contraste(p.destaque, base) >= 3 ? p.destaque : contraste(p.primaria, base) >= 3 ? p.primaria : '#FFD84D';
      return { base, texto: '#FFFFFF', destaque, suave: 'rgba(255,255,255,0.72)', cartao: '#1B212C', textoCartao: '#FFFFFF', escuro: true };
    }
    case 'marca': {
      const texto = corLegivelSobre(p.primaria);
      const destaque = contraste(p.destaque, p.primaria) >= 2.6 ? p.destaque : texto === '#FFFFFF' ? '#FFE27A' : '#14161F';
      return { base: p.primaria, texto, destaque, suave: alfa(texto, 0.78), cartao: '#FFFFFF', textoCartao: p.texto, escuro: texto === '#FFFFFF' };
    }
    case 'destaque': {
      const texto = corLegivelSobre(p.destaque);
      const destaque = contraste(p.primaria, p.destaque) >= 2.6 ? p.primaria : texto;
      return { base: p.destaque, texto, destaque, suave: alfa(texto, 0.78), cartao: '#FFFFFF', textoCartao: p.texto, escuro: texto === '#FFFFFF' };
    }
    case 'foto':
      return { base: '#000000', texto: '#FFFFFF', destaque: contraste(p.destaque, '#000000') >= 3 ? p.destaque : '#FFD84D', suave: 'rgba(255,255,255,0.8)', cartao: '#FFFFFF', textoCartao: p.texto, escuro: true };
    default: {
      const destaque = contraste(p.primaria, p.fundo) >= 2.4 ? p.primaria : p.texto;
      return { base: p.fundo, texto: p.texto, destaque, suave: alfa(p.texto, 0.66), cartao: '#FFFFFF', textoCartao: p.texto, escuro: false };
    }
  }
}
