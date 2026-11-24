import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cancelRender, continueRender, delayRender, random, useCurrentFrame, useVideoConfig } from 'remotion';
import { useVideo } from '../contexto';

const RAMPA = ' .`:-~=+*#%@';

type Grade = { cols: number; rows: number; lum: Float32Array; r: Uint8Array; g: Uint8Array; b: Uint8Array; a: Uint8Array };

/** Amostra a imagem numa grade de células (cada célula vira um caractere). Foto preenche (corta); recorte com transparência é mostrado inteiro. */
function amostrar(img: HTMLImageElement, cols: number, rows: number): Grade {
  const cv = document.createElement('canvas');
  cv.width = cols;
  cv.height = rows;
  const ctx = cv.getContext('2d', { willReadFrequently: true })!;
  const t = document.createElement('canvas');
  t.width = 24; t.height = 24;
  const tc = t.getContext('2d', { willReadFrequently: true })!;
  tc.drawImage(img, 0, 0, 24, 24);
  const td = tc.getImageData(0, 0, 24, 24).data;
  let transparente = false;
  for (let i = 3; i < td.length; i += 4) if (td[i] < 200) { transparente = true; break; }
  const e = (transparente ? Math.min : Math.max)(cols / img.naturalWidth, rows / img.naturalHeight);
  const w = img.naturalWidth * e;
  const h = img.naturalHeight * e;
  ctx.drawImage(img, (cols - w) / 2, (rows - h) / 2, w, h);
  const d = ctx.getImageData(0, 0, cols, rows).data;
  const n = cols * rows;
  const g: Grade = { cols, rows, lum: new Float32Array(n), r: new Uint8Array(n), g: new Uint8Array(n), b: new Uint8Array(n), a: new Uint8Array(n) };
  for (let i = 0; i < n; i++) {
    g.r[i] = d[i * 4]; g.g[i] = d[i * 4 + 1]; g.b[i] = d[i * 4 + 2]; g.a[i] = d[i * 4 + 3];
    g.lum[i] = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
  }
  return g;
}

export const contarCaracteres = (cols: number, rows: number) => cols * rows;

/**
 * Foto desenhada em caracteres coloridos: surge de cima para baixo (com letras
 * embaralhadas até "assentar"), depois a luz balança como uma onda.
 */
export const ArteAscii: React.FC<{ src: string; largura: number; altura: number; inicio: number; cols?: number; cor?: string; aoMedir?: (c: number, l: number) => void }> = ({ src, largura, altura, inicio, cols = 54, cor = '#7CFFB2', aoMedir }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u } = useVideo();
  const ref = useRef<HTMLCanvasElement>(null);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [espera] = useState(() => delayRender('Preparando arte ASCII'));
  const proporcao = 1.9;

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const g = amostrar(img, cols, Math.floor(altura / ((largura / cols) * proporcao)));
        setGrade(g);
        aoMedir?.(g.cols * g.rows, g.rows);
        continueRender(espera);
      } catch (e) { cancelRender(e); }
    };
    img.onerror = () => cancelRender(new Error('Não consegui abrir a imagem da arte ASCII.'));
    img.src = src;
  }, [src, cols, largura, altura]); // eslint-disable-line react-hooks/exhaustive-deps

  const dpr = 1;
  const celW = largura / cols;
  const celH = celW * proporcao;
  const ruido = useMemo(() => {
    if (!grade) return null;
    const a = new Float32Array(grade.cols * grade.rows);
    for (let i = 0; i < a.length; i++) a[i] = random(`asc-${i}`);
    return a;
  }, [grade]);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || !grade || !ruido) return;
    const ctx = cv.getContext('2d')!;
    ctx.clearRect(0, 0, cv.width, cv.height);
    const t = Math.max(0, frame - inicio) / fps;
    const prog = Math.min(1.15, t / 1.9); // fração revelada (de cima para baixo)
    const yOff = (altura - grade.rows * celH) / 2;
    ctx.font = `700 ${celH * 0.9}px 'JetBrains Mono', monospace`;
    ctx.textBaseline = 'top';
    for (let r = 0; r < grade.rows; r++) {
      for (let c = 0; c < grade.cols; c++) {
        const i = r * grade.cols + c;
        if (grade.a[i] < 70) continue;
        const posicao = r / grade.rows + ruido[i] * 0.22;
        if (posicao > prog) continue;
        const x = c * celW;
        const y = yOff + r * celH;
        const assentando = prog - posicao < 0.16;
        let ch: string;
        let alfa = 1;
        let cr: number, cg: number, cb: number;
        if (assentando) {
          ch = RAMPA[Math.floor(random(`f${i}-${Math.floor(frame / 2)}`) * RAMPA.length)];
          cr = 124; cg = 255; cb = 178; alfa = 0.85;
        } else {
          const onda = 0.09 * Math.sin(c * 0.42 + r * 0.31 + t * 3.1) + 0.05 * Math.sin(c * 0.11 - t * 1.7);
          const l = Math.min(1, Math.max(0, grade.lum[i] + onda));
          ch = RAMPA[Math.min(RAMPA.length - 1, Math.floor(l * RAMPA.length))];
          if (ch === ' ') continue;
          // realça a cor da foto (mais saturada e viva)
          const m = (grade.r[i] + grade.g[i] + grade.b[i]) / 3;
          const k = 1.35;
          cr = Math.max(0, Math.min(255, m + (grade.r[i] - m) * k + 24));
          cg = Math.max(0, Math.min(255, m + (grade.g[i] - m) * k + 24));
          cb = Math.max(0, Math.min(255, m + (grade.b[i] - m) * k + 24));
          alfa = 0.55 + l * 0.45;
        }
        ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alfa})`;
        ctx.fillText(ch, x, y);
      }
    }
    // varredura luminosa na frente da revelação
    if (prog < 1.1) {
      const yScan = yOff + Math.min(1, prog) * grade.rows * celH;
      const gr = ctx.createLinearGradient(0, yScan - 30 * u, 0, yScan + 4);
      gr.addColorStop(0, 'rgba(124,255,178,0)');
      gr.addColorStop(1, cor + 'cc');
      ctx.fillStyle = gr;
      ctx.fillRect(0, yScan - 30 * u, largura, 34 * u);
    }
  }, [frame, grade, ruido, inicio, fps, largura, altura, celW, celH, cor, u]);

  return <canvas ref={ref} width={Math.round(largura * dpr)} height={Math.round(altura * dpr)} style={{ width: largura, height: altura, display: 'block' }} />;
};

/* ------------------------------------------------------------------ painel de código */

const CODIGO_PADRAO = [
  '# [ascii] foto -> caracteres',
  'RAMPA = " .`:-~=+*#%@"',
  'img = np.asarray(foto.resize((COLS, ROWS)))',
  'lum = img.mean(axis=2) / 255',
  'idx = (lum * (len(RAMPA) - 1)).astype(int)',
  '',
  '# [onda] o brilho balança com o tempo',
  'lum += 0.09 * np.sin(c * 0.4 + t * 3)',
  'cor = media + (pixel - media) * 1.35',
  '',
  'for r in range(ROWS):',
  '    linha = "".join(RAMPA[i] for i in idx[r])',
  '    tela.escrever(linha, cor[r])',
];

function colorir(l: string): React.ReactNode[] {
  if (/^\s*#/.test(l)) return [<span key="c" style={{ color: '#6C7A89' }}>{l}</span>];
  const partes = l.split(/(".*?"|\b\d+(?:\.\d+)?\b|\b(?:for|in|range|if|return|def)\b|[=+*/%-]+)/g);
  return partes.map((p, i) => {
    if (!p) return null;
    let cor = '#C9D1D9';
    if (/^".*"$/.test(p)) cor = '#A5D6A7';
    else if (/^\d/.test(p)) cor = '#FFB86B';
    else if (/^(for|in|range|if|return|def)$/.test(p)) cor = '#FF79C6';
    else if (/^[=+*/%-]+$/.test(p)) cor = '#8BE9FD';
    return <span key={i} style={{ color: cor }}>{p}</span>;
  });
}

export const PainelCodigo: React.FC<{ linhas?: string[] | null; inicio: number; largura: number; altura: number; tamanho: number }> = ({ linhas, inicio, largura, altura, tamanho }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const codigo = linhas && linhas.length ? linhas : CODIGO_PADRAO;
  const total = codigo.reduce((a, l) => a + l.length + 1, 0);
  const digitados = Math.floor(Math.max(0, frame - inicio) * (total / (fps * 3.4)));
  let restante = digitados;
  const visiveis: { texto: string; n: number }[] = [];
  for (let i = 0; i < codigo.length; i++) {
    if (restante <= 0) break;
    visiveis.push({ texto: codigo[i].slice(0, restante), n: 474 + i });
    restante -= codigo[i].length + 1;
  }
  const alturaLinha = tamanho * 1.45;
  const maxLinhas = Math.floor((altura - 24) / alturaLinha);
  const mostrar = visiveis.slice(-maxLinhas);
  return (
    <div style={{ width: largura, height: altura, background: 'rgba(8,12,18,0.92)', borderTop: '2px solid rgba(124,255,178,0.35)', padding: '12px 16px', fontFamily: "'JetBrains Mono', monospace", fontSize: tamanho, lineHeight: `${alturaLinha}px`, overflow: 'hidden', boxSizing: 'border-box' }}>
      {mostrar.map((l, i) => (
        <div key={l.n} style={{ display: 'flex', gap: tamanho, whiteSpace: 'pre' }}>
          <span style={{ color: '#3F4B5A', minWidth: tamanho * 2.4, textAlign: 'right' }}>{l.n}</span>
          <span>{colorir(l.texto)}{i === mostrar.length - 1 && Math.floor(frame / 8) % 2 === 0 ? <span style={{ background: '#7CFFB2', color: '#7CFFB2' }}>_</span> : null}</span>
        </div>
      ))}
    </div>
  );
};
