import React, { useMemo } from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { measureText } from '@remotion/layout-utils';
import type { AnimTexto } from '../../shared/spec';
import { limparPalavra } from '../../shared/linhaDoTempo';
import { useVideo } from '../contexto';
import { alfa, pilhaFonte } from '../tema';

/* ------------------------------------------------------------------ medição e quebra de linha */

type Medida = { palavras: string[]; larguras: number[]; espaco: number }; // a 100px

function medir(texto: string, fonte: string, peso: number, espacamento: string, caixaAlta: boolean): Medida {
  const palavras = texto.split(/\s+/).filter(Boolean);
  const base = { fontFamily: pilhaFonte(fonte), fontSize: 100, fontWeight: peso, letterSpacing: espacamento, textTransform: (caixaAlta ? 'uppercase' : 'none') as 'uppercase' | 'none' };
  const larguras = palavras.map((p) => measureText({ ...base, text: p }).width);
  const espaco = measureText({ ...base, text: 'a a' }).width - measureText({ ...base, text: 'aa' }).width;
  return { palavras, larguras, espaco };
}

function quebrar(m: Medida, fonte: number, largura: number): number[][] | null {
  const k = fonte / 100;
  const linhas: number[][] = [];
  let atual: number[] = [];
  let w = 0;
  for (let i = 0; i < m.palavras.length; i++) {
    const pw = m.larguras[i] * k;
    if (pw > largura) return null;
    const novo = atual.length ? w + m.espaco * k + pw : pw;
    if (novo <= largura || !atual.length) {
      atual.push(i);
      w = novo;
    } else {
      linhas.push(atual);
      atual = [i];
      w = pw;
    }
  }
  if (atual.length) linhas.push(atual);
  return linhas;
}

export type Ajuste = { fonte: number; linhas: number[][]; palavras: string[]; larguraUsada: number };

/** Maior fonte que cabe em `largura` com no máximo `maxLinhas`, com linhas equilibradas. */
export function ajustar(texto: string, o: { largura: number; maxLinhas: number; maxFonte: number; minFonte: number; fonte: string; peso: number; espacamento: string; caixaAlta: boolean }): Ajuste {
  const m = medir(texto, o.fonte, o.peso, o.espacamento, o.caixaAlta);
  if (!m.palavras.length) return { fonte: o.maxFonte, linhas: [], palavras: [], larguraUsada: 0 };
  let lo = o.minFonte;
  let hi = o.maxFonte;
  let melhor: number[][] | null = null;
  let melhorFonte = o.minFonte;
  while (hi - lo > 0.5) {
    const meio = (lo + hi) / 2;
    const l = quebrar(m, meio, o.largura);
    if (l && l.length <= o.maxLinhas) {
      melhor = l;
      melhorFonte = meio;
      lo = meio;
    } else hi = meio;
  }
  if (!melhor) {
    melhorFonte = o.minFonte;
    melhor = quebrar(m, o.minFonte, o.largura) ?? [m.palavras.map((_, i) => i)];
  }
  // equilibrar: a menor largura que mantém o mesmo número de linhas
  const n = melhor.length;
  if (n > 1) {
    let a = o.largura * 0.4;
    let b = o.largura;
    while (b - a > 2) {
      const meio = (a + b) / 2;
      const l = quebrar(m, melhorFonte, meio);
      if (l && l.length <= n) b = meio;
      else a = meio;
    }
    melhor = quebrar(m, melhorFonte, b) ?? melhor;
  }
  const k = melhorFonte / 100;
  const larguraUsada = Math.max(...melhor.map((l) => l.reduce((acc, i, j) => acc + m.larguras[i] * k + (j ? m.espaco * k : 0), 0)));
  return { fonte: Math.floor(melhorFonte), linhas: melhor, palavras: m.palavras, larguraUsada };
}

function conjuntoDestaques(destaques: string[] | undefined): Set<string> {
  const s = new Set<string>();
  (destaques ?? []).forEach((d) => d.split(/\s+/).forEach((p) => { const l = limparPalavra(p); if (l) s.add(l); }));
  return s;
}

/* ------------------------------------------------------------------ componente */

export type PropsTexto = {
  texto: string;
  inicio: number; // frame (relativo à cena) em que a animação começa
  animacao: AnimTexto;
  largura: number;
  maxLinhas: number;
  maxFonte: number;
  minFonte?: number;
  papel?: 'titulo' | 'texto';
  destaques?: string[];
  cor?: string;
  corDestaque?: string;
  alinhamento?: 'center' | 'left';
  sombra?: boolean; // legibilidade sobre foto
  caixaAlta?: boolean;
  estiloExtra?: React.CSSProperties;
};

export const TextoAnimado: React.FC<PropsTexto> = (p) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { tema, cores } = useVideo();
  const papel = p.papel ?? 'titulo';
  const fonte = papel === 'titulo' ? tema.fonteTitulo : tema.fonteTexto;
  const peso = papel === 'titulo' ? tema.pesoTitulo : tema.pesoTexto;
  const caixaAlta = p.caixaAlta ?? (papel === 'titulo' && tema.caixaAlta);
  const espacamento = papel === 'titulo' ? tema.espacamento : '-0.01em';
  const alturaLinha = papel === 'titulo' ? tema.alturaLinha : 1.25;
  const cor = p.cor ?? (papel === 'titulo' ? cores.texto : cores.suave);
  const corDestaque = p.corDestaque ?? cores.destaque;

  const aj = useMemo(
    () => ajustar(p.texto, { largura: p.largura, maxLinhas: p.maxLinhas, maxFonte: p.maxFonte, minFonte: p.minFonte ?? Math.min(p.maxFonte, 34), fonte, peso, espacamento, caixaAlta }),
    [p.texto, p.largura, p.maxLinhas, p.maxFonte, p.minFonte, fonte, peso, espacamento, caixaAlta],
  );
  const dest = useMemo(() => conjuntoDestaques(p.destaques), [p.destaques]);
  const t = frame - p.inicio;

  // posição de cada palavra na ordem de leitura (para animações por palavra)
  let ordem = 0;
  const totalPalavras = aj.palavras.length;
  const totalLetras = aj.palavras.join(' ').length;
  let letrasAntes = 0;

  const sombra = p.sombra ? `0 ${aj.fonte * 0.04}px ${aj.fonte * 0.18}px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.4)` : undefined;

  return (
    <div
      style={{
        width: p.largura,
        display: 'flex',
        flexDirection: 'column',
        alignItems: p.alinhamento === 'left' ? 'flex-start' : 'center',
        textAlign: p.alinhamento ?? 'center',
        fontFamily: pilhaFonte(fonte),
        fontWeight: peso,
        fontSize: aj.fonte,
        lineHeight: alturaLinha,
        letterSpacing: espacamento,
        textTransform: caixaAlta ? 'uppercase' : 'none',
        color: cor,
        textShadow: sombra,
        ...p.estiloExtra,
      }}
    >
      {aj.linhas.map((linha, li) => {
        // animação por linha
        let estiloLinha: React.CSSProperties = {};
        if (p.animacao === 'pop') {
          const s = spring({ frame: t - li * 3, fps, config: { damping: 11, stiffness: 160, mass: 0.7 } });
          estiloLinha = { transform: `scale(${interpolate(s, [0, 1], [0.55, 1])})`, opacity: interpolate(s, [0, 0.25], [0, 1], { extrapolateRight: 'clamp' }) };
        } else if (p.animacao === 'subir' || p.animacao === 'destaque') {
          const v = interpolate(t - li * 4, [0, 16], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
          estiloLinha = { transform: `translateY(${(1 - v) * aj.fonte * 0.7}px)`, opacity: v, clipPath: undefined };
        }
        return (
          <div key={li} style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: p.alinhamento === 'left' ? 'flex-start' : 'center', whiteSpace: 'nowrap', ...estiloLinha }}>
            {linha.map((wi, j) => {
              const palavra = aj.palavras[wi];
              const i = ordem++;
              const destacada = dest.has(limparPalavra(palavra));
              let estiloPalavra: React.CSSProperties = {};
              let conteudo: React.ReactNode = palavra;
              if (p.animacao === 'palavras') {
                const atraso = Math.min(4, 40 / Math.max(1, totalPalavras));
                const s = spring({ frame: t - i * atraso, fps, config: { damping: 12, stiffness: 200, mass: 0.6 } });
                estiloPalavra = { display: 'inline-block', transform: `translateY(${(1 - s) * aj.fonte * 0.35}px) scale(${interpolate(s, [0, 1], [0.7, 1])})`, opacity: interpolate(s, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }) };
              } else if (p.animacao === 'digitar') {
                const letrasPorFrame = Math.max(0.9, totalLetras / 26);
                const visiveis = Math.floor(Math.max(0, t) * letrasPorFrame) - letrasAntes;
                conteudo = (
                  <>
                    <span>{palavra.slice(0, Math.max(0, visiveis))}</span>
                    <span style={{ opacity: 0 }}>{palavra.slice(Math.max(0, visiveis))}</span>
                  </>
                );
              }
              letrasAntes += palavra.length + 1;
              const espacoAntes = j > 0 ? '0.26em' : 0;
              if (destacada && p.animacao === 'destaque') {
                const v = interpolate(t - 14 - i * 2, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) });
                return (
                  <span key={wi} style={{ position: 'relative', display: 'inline-block', marginLeft: espacoAntes, padding: '0 0.12em', color: v > 0.5 ? cores.base === corDestaque ? cores.texto : contrastar(corDestaque) : cor, ...estiloPalavra }}>
                    <span style={{ position: 'absolute', left: 0, right: 0, top: '8%', bottom: '4%', background: corDestaque, borderRadius: aj.fonte * 0.14, transform: `scaleX(${v})`, transformOrigin: 'left center', zIndex: 0 }} />
                    <span style={{ position: 'relative', zIndex: 1 }}>{conteudo}</span>
                  </span>
                );
              }
              return (
                <span key={wi} style={{ display: 'inline-block', marginLeft: espacoAntes, color: destacada ? corDestaque : undefined, ...estiloPalavra }}>
                  {conteudo}
                </span>
              );
            })}
            {p.animacao === 'digitar' && li === aj.linhas.length - 1 && (
              <span style={{ display: 'inline-block', width: '0.08em', height: '0.9em', marginLeft: '0.08em', alignSelf: 'center', background: corDestaque, opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0.15 }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

function contrastar(hex: string): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.299 * r + 0.587 * g + 0.114 * b > 150 ? '#14161F' : '#FFFFFF';
}

/** Rótulo pequeno em pílula (ex.: "ANTES", "NOVO"). */
export const Pilula: React.FC<{ texto: string; fundo: string; cor: string; tamanho?: number; estilo?: React.CSSProperties }> = ({ texto, fundo, cor, tamanho = 34, estilo }) => {
  const { tema } = useVideo();
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', padding: `${tamanho * 0.32}px ${tamanho * 0.75}px`, borderRadius: 999, background: fundo, color: cor, fontFamily: pilhaFonte(tema.fonteTexto), fontWeight: 800, fontSize: tamanho, letterSpacing: '0.04em', textTransform: 'uppercase', boxShadow: `0 ${tamanho * 0.2}px ${tamanho * 0.6}px ${alfa('#000000', 0.12)}`, ...estilo }}>
      {texto}
    </div>
  );
};
