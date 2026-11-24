/** Ruído procedural (simplex 2D) e utilidades matemáticas. Tudo determinístico. */
export function aleatorio(semente: number) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const perm = new Uint8Array(512);
const permMod = new Uint8Array(512);
(() => {
  const r = aleatorio(20261122);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  for (let i = 0; i < 512; i++) { perm[i] = p[i & 255]; permMod[i] = perm[i] % 8; }
})();
const G = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]];
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;

/** Ruído simplex em [-1, 1]. */
export function ruido(x: number, y: number): number {
  const s = (x + y) * F2;
  const i = Math.floor(x + s), j = Math.floor(y + s);
  const t = (i + j) * G2;
  const x0 = x - (i - t), y0 = y - (j - t);
  const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1;
  const x1 = x0 - i1 + G2, y1 = y0 - j1 + G2, x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2;
  const ii = i & 255, jj = j & 255;
  let n = 0;
  let q = 0.5 - x0 * x0 - y0 * y0;
  if (q > 0) { q *= q; const g = G[permMod[ii + perm[jj]]]; n += q * q * (g[0] * x0 + g[1] * y0); }
  q = 0.5 - x1 * x1 - y1 * y1;
  if (q > 0) { q *= q; const g = G[permMod[ii + i1 + perm[jj + j1]]]; n += q * q * (g[0] * x1 + g[1] * y1); }
  q = 0.5 - x2 * x2 - y2 * y2;
  if (q > 0) { q *= q; const g = G[permMod[ii + 1 + perm[jj + 1]]]; n += q * q * (g[0] * x2 + g[1] * y2); }
  return 70 * n;
}

export function fbm(x: number, y: number, oitavas = 4, lac = 2, ganho = 0.5): number {
  let a = 1, f = 1, soma = 0, norm = 0;
  for (let i = 0; i < oitavas; i++) { soma += a * ruido(x * f, y * f); norm += a; a *= ganho; f *= lac; }
  return soma / norm;
}

/** Cristas de montanha: 0..1, com picos afiados. */
export function crista(x: number, y: number, oitavas = 5): number {
  let a = 1, f = 1, soma = 0, norm = 0, peso = 1;
  for (let i = 0; i < oitavas; i++) {
    let n = 1 - Math.abs(ruido(x * f, y * f));
    n *= n; n *= peso; peso = Math.min(1, Math.max(0, n * 1.6));
    soma += a * n; norm += a; a *= 0.5; f *= 2.07;
  }
  return soma / norm;
}

export const limitar = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
export const misturar = (a: number, b: number, t: number) => a + (b - a) * t;
export const suave = (a: number, b: number, x: number) => { const t = limitar((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
