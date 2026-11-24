import * as THREE from 'three';
import { aleatorio, fbm, limitar, misturar, suave } from './ruido';
import { GLSL_VENTO, U } from './vento';
import { type Campo, ILHA, NIVEL_AGUA } from './terreno';

/* ------------------------------------------------------------------ vento no vértice (compartilhado por árvores, capim, juncos) */

export const GLSL_COPA_PARS = /* glsl */ `
attribute float aSway; attribute float aFlut;
varying float vRajada;
${GLSL_VENTO}`;

export const GLSL_COPA_VERT = /* glsl */ `
vec3 transformed = vec3(position);
#ifdef USE_INSTANCING
  mat4 imx = instanceMatrix;
#else
  mat4 imx = mat4(1.0);
#endif
vec3 baseW = (modelMatrix * imx * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
mat3 im3 = mat3(imx);
float escala2 = dot(im3[0], im3[0]);
float rj = rajada(baseW.xz);
vRajada = rj;
float forca = uWind * (0.22 + 0.78 * rj) + 0.04;
float fase = baseW.x * 0.37 + baseW.z * 0.53;
float osc = 0.78 + 0.22 * sin(uTime * (1.1 + uWindMs * 0.12) + fase);
float curva = aSway * aSway * forca * 1.35 * osc;
vec3 desloc = vec3(uWindDir.x, -0.04, uWindDir.y) * curva;
float fl = aFlut * forca;
desloc += fl * 0.22 * vec3(sin(uTime * 7.3 + position.x * 5.1 + fase), 0.4 * sin(uTime * 6.1 + position.y * 4.7), sin(uTime * 8.1 + position.z * 5.9 + fase * 2.0));
transformed += (transpose(im3) * desloc) / escala2;
`;

export function injetarVento(sh: { uniforms: Record<string, unknown>; vertexShader: string; fragmentShader: string }, folha: boolean) {
  sh.uniforms.uTime = U.uTime; sh.uniforms.uWindDir = U.uWindDir; sh.uniforms.uWind = U.uWind; sh.uniforms.uWindMs = U.uWindMs;
  sh.vertexShader = sh.vertexShader
    .replace('#include <common>', `#include <common>\n${GLSL_COPA_PARS}`)
    .replace('#include <begin_vertex>', GLSL_COPA_VERT);
  if (folha) {
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vRajada; uniform float uWind;')
      .replace('#include <color_fragment>', `#include <color_fragment>\n diffuseColor.rgb *= 0.82 + 0.62 * vRajada * (0.25 + uWind);`)
      .replace('#include <normal_fragment_begin>', semInverter());
  }
}

/** Folhas e capim têm duas faces: a normal não pode virar de cabeça para baixo no verso (senão ficam pretos). */
export function semInverter(): string {
  return THREE.ShaderChunk.normal_fragment_begin.replace(/gl_FrontFacing\s*\?\s*1\.0\s*:\s*-\s*1\.0/, '1.0');
}

/* ------------------------------------------------------------------ texturas de folhagem desenhadas por código */

function texturaFolhas(tons: string[], n: number, tam: number, semente: number): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const r = aleatorio(semente);
  g.clearRect(0, 0, 256, 256);
  for (let i = 0; i < n; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 108;
    const x = 128 + Math.cos(a) * d, y = 128 + Math.sin(a) * d * 0.9;
    const ang = r() * Math.PI * 2, l = tam * (0.7 + r() * 0.6), w = l * 0.52;
    g.save(); g.translate(x, y); g.rotate(ang);
    g.beginPath(); g.moveTo(0, -l / 2); g.bezierCurveTo(w, -l / 4, w, l / 4, 0, l / 2); g.bezierCurveTo(-w, l / 4, -w, -l / 4, 0, -l / 2);
    g.fillStyle = tons[Math.floor(r() * tons.length)]; g.fill();
    g.strokeStyle = 'rgba(20,40,10,0.35)'; g.lineWidth = 0.8; g.beginPath(); g.moveTo(0, -l / 2); g.lineTo(0, l / 2); g.stroke();
    g.restore();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; t.generateMipmaps = true;
  return t;
}

function texturaAgulhas(semente: number): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 128; c.height = 256;
  const g = c.getContext('2d')!;
  const r = aleatorio(semente);
  g.clearRect(0, 0, 128, 256);
  const tons = ['#2f6b38', '#3a7d44', '#438a4d', '#2a5f33', '#4f9a56'];
  g.strokeStyle = '#3a2a1a'; g.lineWidth = 2.2; g.beginPath(); g.moveTo(64, 250); g.lineTo(64, 6); g.stroke();
  for (let i = 0; i < 150; i++) {
    const t = r(); const y = 250 - t * 240; const lado = r() < 0.5 ? -1 : 1;
    const comp = (1 - t * 0.55) * (34 + r() * 26);
    g.strokeStyle = tons[Math.floor(r() * tons.length)]; g.lineWidth = 1.5 + r() * 0.8;
    g.beginPath(); g.moveTo(64, y); g.lineTo(64 + lado * comp, y - 10 - r() * 22 + comp * 0.15); g.stroke();
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

/* ------------------------------------------------------------------ construtor de geometria */

type Acc = { pos: number[]; nor: number[]; col: number[]; uv: number[]; sway: number[]; flut: number[]; idx: number[] };
const novo = (): Acc => ({ pos: [], nor: [], col: [], uv: [], sway: [], flut: [], idx: [] });
function geom(a: Acc): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(a.pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(a.nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(a.col, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(a.uv, 2));
  g.setAttribute('aSway', new THREE.Float32BufferAttribute(a.sway, 1));
  g.setAttribute('aFlut', new THREE.Float32BufferAttribute(a.flut, 1));
  g.setIndex(a.idx);
  return g;
}

function tubo(a: Acc, pts: THREE.Vector3[], raios: number[], radial: number, cor: (t: number, k: number) => [number, number, number], altTotal: number) {
  const base = a.pos.length / 3;
  const T = new THREE.Vector3(), U1 = new THREE.Vector3(), V1 = new THREE.Vector3(), ref = new THREE.Vector3(0.0, 0.0, 1);
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    T.subVectors(pts[Math.min(i + 1, pts.length - 1)], pts[Math.max(i - 1, 0)]).normalize();
    ref.set(Math.abs(T.y) > 0.9 ? 1 : 0, Math.abs(T.y) > 0.9 ? 0 : 1, 0);
    U1.crossVectors(T, ref).normalize(); V1.crossVectors(T, U1).normalize();
    for (let k = 0; k <= radial; k++) {
      const ang = (k / radial) * Math.PI * 2, c = Math.cos(ang), s = Math.sin(ang);
      const nx = U1.x * c + V1.x * s, ny = U1.y * c + V1.y * s, nz = U1.z * c + V1.z * s;
      a.pos.push(p.x + nx * raios[i], p.y + ny * raios[i], p.z + nz * raios[i]);
      a.nor.push(nx, ny, nz);
      const col = cor(i / (pts.length - 1), k / radial);
      a.col.push(col[0], col[1], col[2]);
      a.uv.push(k / radial, i / (pts.length - 1));
      a.sway.push(limitar(p.y / altTotal, 0, 1)); a.flut.push(0);
    }
  }
  for (let i = 0; i < pts.length - 1; i++) for (let k = 0; k < radial; k++) {
    const q0 = base + i * (radial + 1) + k, q1 = q0 + 1, q2 = q0 + radial + 1, q3 = q2 + 1;
    a.idx.push(q0, q2, q1, q1, q2, q3);
  }
}

function cartao(a: Acc, c: THREE.Vector3, u: THREE.Vector3, v: THREE.Vector3, normais: (p: THREE.Vector3) => THREE.Vector3, cor: THREE.Color, ao: number, altTotal: number, flut = 1) {
  const base = a.pos.length / 3;
  const cantos: [number, number][] = [[-1, -1], [1, -1], [-1, 1], [1, 1]];
  for (const [su, sv] of cantos) {
    const p = new THREE.Vector3().copy(c).addScaledVector(u, su).addScaledVector(v, sv);
    const n = normais(p);
    a.pos.push(p.x, p.y, p.z); a.nor.push(n.x, n.y, n.z);
    a.col.push(cor.r * ao, cor.g * ao, cor.b * ao);
    a.uv.push((su + 1) / 2, (sv + 1) / 2);
    a.sway.push(limitar(p.y / altTotal, 0, 1)); a.flut.push(flut);
  }
  a.idx.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
}

const rndDir = (r: () => number) => { const z = r() * 2 - 1, a = r() * Math.PI * 2, s = Math.sqrt(1 - z * z); return new THREE.Vector3(s * Math.cos(a), z, s * Math.sin(a)); };

/* ------------------------------------------------------------------ espécies */

type Especie = 'carvalho' | 'betula' | 'pinheiro';

function copaLatifoliada(especie: 'carvalho' | 'betula', semente: number) {
  const r = aleatorio(semente);
  const H = especie === 'carvalho' ? 11 + r() * 3 : 9 + r() * 2.5;
  const tronco = novo(), folha = novo();
  const R = H * (especie === 'carvalho' ? 0.40 : 0.27);
  const topo = H * (especie === 'carvalho' ? 0.52 : 0.62);
  // tronco levemente torto
  const pts: THREE.Vector3[] = [], raios: number[] = [];
  const entorta = new THREE.Vector2((r() - 0.5) * 0.9, (r() - 0.5) * 0.9);
  for (let i = 0; i <= 8; i++) {
    const t = i / 8; const y = t * topo * 1.18;
    pts.push(new THREE.Vector3(entorta.x * t * t, y, entorta.y * t * t));
    raios.push((especie === 'carvalho' ? 0.42 : 0.2) * (1 - t * 0.78) * (i === 0 ? 1.25 : 1));
  }
  const corCasca = (t: number, k: number): [number, number, number] => {
    const ruido = 0.82 + 0.3 * Math.sin(k * 40 + t * 9) * Math.sin(t * 23);
    if (especie === 'betula') { const mancha = Math.sin(t * 38 + k * 6) > 0.72 ? 0.18 : 1; return [0.78 * mancha * ruido, 0.77 * mancha * ruido, 0.72 * mancha * ruido]; }
    return [0.2 * ruido, 0.14 * ruido, 0.095 * ruido];
  };
  tubo(tronco, pts, raios, 7, corCasca, H);
  const topoP = pts[pts.length - 1];
  // galhos e aglomerados de folhas
  const n = especie === 'carvalho' ? 8 : 6;
  const verde: THREE.Color[] = especie === 'carvalho'
    ? [new THREE.Color(1.0, 1.05, 0.9), new THREE.Color(0.9, 1.0, 0.85), new THREE.Color(1.1, 1.1, 0.9)]
    : [new THREE.Color(1.1, 1.08, 0.9), new THREE.Color(1.0, 1.0, 0.85), new THREE.Color(1.15, 1.1, 0.9)];
  for (let ci = 0; ci < n; ci++) {
    const ang = (ci / n) * Math.PI * 2 + r() * 0.8;
    const dist = ci === 0 ? 0 : R * (0.35 + r() * 0.55);
    const centro = new THREE.Vector3(topoP.x + Math.cos(ang) * dist, topo + (r() - 0.25) * R * 0.75 + (ci === 0 ? R * 0.35 : 0), topoP.z + Math.sin(ang) * dist);
    // galho
    if (dist > 0.5) {
      const ini = new THREE.Vector3(pts[5].x, pts[5].y * (0.8 + r() * 0.3), pts[5].z);
      const mid = ini.clone().lerp(centro, 0.55).add(new THREE.Vector3(0, R * 0.12, 0));
      tubo(tronco, [ini, mid, centro.clone().lerp(ini, 0.15)], [0.12, 0.07, 0.03], 5, (t) => corCasca(t, 0.5), H);
    }
    const rc = R * (0.5 + r() * 0.28);
    const cartoes = especie === 'carvalho' ? 22 : 16;
    for (let k = 0; k < cartoes; k++) {
      const d = rndDir(r).multiplyScalar(rc * Math.cbrt(r()));
      const c = centro.clone().add(new THREE.Vector3(d.x, d.y * 0.8, d.z));
      const nrm = rndDir(r);
      const u = new THREE.Vector3().crossVectors(nrm, new THREE.Vector3(0, 1, 0.01)).normalize();
      const v = new THREE.Vector3().crossVectors(nrm, u).normalize();
      const tam = (especie === 'carvalho' ? 1.65 : 1.3) * (0.8 + r() * 0.5) * (H / 12);
      u.multiplyScalar(tam); v.multiplyScalar(tam);
      const dist01 = limitar(d.length() / rc, 0, 1);
      const ao = misturar(0.5, 1.12, dist01 * 0.7 + (c.y - topo) / (R * 3) * 0.3 + 0.2);
      cartao(folha, c, u, v, (p) => p.clone().sub(centro).divideScalar(rc).add(new THREE.Vector3(0, 0.45, 0)).normalize(), verde[Math.floor(r() * verde.length)], ao, H);
    }
  }
  return { tronco: geom(tronco), folha: geom(folha), H };
}

function copaPinheiro(semente: number) {
  const r = aleatorio(semente);
  const H = 14 + r() * 8;
  const tronco = novo(), folha = novo();
  const pts: THREE.Vector3[] = [], raios: number[] = [];
  for (let i = 0; i <= 8; i++) { const t = i / 8; pts.push(new THREE.Vector3((r() - 0.5) * 0.06, t * H * 0.97, (r() - 0.5) * 0.06)); raios.push(0.34 * (1 - t) ** 0.9 + 0.03); }
  tubo(tronco, pts, raios, 7, (t, k) => { const q = 0.85 + 0.3 * Math.sin(k * 30 + t * 14); return [0.25 * q, 0.15 * q, 0.1 * q]; }, H);
  const verdes = [new THREE.Color(1.0, 1.0, 1.0), new THREE.Color(0.9, 0.95, 0.9), new THREE.Color(1.1, 1.1, 1.0)];
  const camadas = 15;
  for (let li = 0; li < camadas; li++) {
    const t = li / (camadas - 1);
    const y = H * (0.16 + t * 0.8);
    const L = (0.3 * H) * Math.pow(1 - t, 0.85) + 0.55;
    const ramos = Math.max(4, Math.round(8 - t * 4));
    const off = r() * 6.28;
    for (let b = 0; b < ramos; b++) {
      const a = off + (b / ramos) * Math.PI * 2 + (r() - 0.5) * 0.4;
      const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
      const caida = 0.28 + r() * 0.12;
      const base = new THREE.Vector3(dir.x * 0.1, y, dir.z * 0.1);
      const ponta = new THREE.Vector3(dir.x * L, y - L * caida, dir.z * L);
      const eixo = ponta.clone().sub(base);
      const lateral = new THREE.Vector3().crossVectors(eixo, new THREE.Vector3(0, 1, 0)).normalize().multiplyScalar(L * 0.34);
      const metade = base.clone().add(ponta).multiplyScalar(0.5);
      const v = eixo.clone().multiplyScalar(0.5);
      const cor = verdes[Math.floor(r() * verdes.length)];
      const ao = 0.55 + 0.6 * (L / (0.3 * H + 0.55)) * 0.0 + 0.55 * Math.min(1, t + 0.35);
      // o cartão sai do tronco para a ponta; textura: v=0 na base, v=1 na ponta
      const baseA = a;
      void baseA;
      const centro = metade;
      const pCanto = (su: number, sv: number) => new THREE.Vector3().copy(centro).addScaledVector(lateral, su).addScaledVector(v, sv);
      const b0 = a0(folha);
      for (const [su, sv] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as [number, number][]) {
        const p = pCanto(su, sv);
        const n = new THREE.Vector3(dir.x * 0.75, 0.55, dir.z * 0.75).normalize();
        folha.pos.push(p.x, p.y, p.z); folha.nor.push(n.x, n.y, n.z);
        const tt = (sv + 1) / 2; const sombra = ao * (0.7 + 0.5 * tt);
        folha.col.push(cor.r * sombra, cor.g * sombra, cor.b * sombra);
        folha.uv.push((su + 1) / 2, tt); folha.sway.push(limitar(p.y / H, 0, 1)); folha.flut.push(0.6 + 0.4 * tt);
      }
      folha.idx.push(b0, b0 + 1, b0 + 2, b0 + 1, b0 + 3, b0 + 2);
    }
  }
  // ponta
  for (let k = 0; k < 2; k++) {
    const a = k * Math.PI / 2; const dir = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
    const u = dir.clone().multiplyScalar(0.55), v = new THREE.Vector3(0, 1.3, 0);
    cartao(folha, new THREE.Vector3(0, H * 0.97 + 0.5, 0), u, v, () => new THREE.Vector3(0, 1, 0), verdes[0], 1.0, H, 0.5);
  }
  return { tronco: geom(tronco), folha: geom(folha), H };
}
const a0 = (a: Acc) => a.pos.length / 3;

/* ------------------------------------------------------------------ floresta instanciada */

export type Floresta = { grupo: THREE.Group; arvores: { x: number; z: number; h: number; esp: Especie; raio: number }[]; sombras: THREE.Object3D[] };

export function criarFloresta(campo: Campo, quantidade: number, sombra: boolean): Floresta {
  const grupo = new THREE.Group();
  const r = aleatorio(4242);
  const matCasca = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.96, metalness: 0 });
  matCasca.onBeforeCompile = (sh) => injetarVento(sh, false);
  const texCarvalho = texturaFolhas(['#6aa83a', '#79b843', '#54952c', '#8fcc4d', '#5fa84a'], 110, 30, 11);
  const texBetula = texturaFolhas(['#a6cc45', '#b8da55', '#92b83a', '#cfe66a', '#9ccc5e'], 120, 24, 12);
  const texPinho = texturaAgulhas(13);

  const mat = (map: THREE.Texture, corte = 0.42) => {
    const m = new THREE.MeshStandardMaterial({ map, vertexColors: true, alphaTest: corte, side: THREE.DoubleSide, roughness: 0.82, metalness: 0, alphaToCoverage: true });
    m.onBeforeCompile = (sh) => injetarVento(sh, true);
    return m;
  };
  const prof = (map: THREE.Texture, corte = 0.42) => {
    const m = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map, alphaTest: corte });
    m.onBeforeCompile = (sh) => injetarVento(sh, false);
    return m;
  };
  const matCarvalho = mat(texCarvalho), matBetula = mat(texBetula), matPinho = mat(texPinho, 0.35);
  const profCarvalho = prof(texCarvalho), profBetula = prof(texBetula), profPinho = prof(texPinho, 0.35);
  const profCasca = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
  profCasca.onBeforeCompile = (sh) => injetarVento(sh, false);

  const variantes: { esp: Especie; g: ReturnType<typeof copaPinheiro>; mat: THREE.Material; prof: THREE.Material }[] = [];
  for (let i = 0; i < 3; i++) variantes.push({ esp: 'carvalho', g: copaLatifoliada('carvalho', 100 + i), mat: matCarvalho, prof: profCarvalho });
  for (let i = 0; i < 2; i++) variantes.push({ esp: 'betula', g: copaLatifoliada('betula', 200 + i), mat: matBetula, prof: profBetula });
  for (let i = 0; i < 3; i++) variantes.push({ esp: 'pinheiro', g: copaPinheiro(300 + i), mat: matPinho, prof: profPinho });

  // posições: rejeição guiada pela densidade de floresta, espaçamento mínimo e espécie por altitude/umidade
  const matrizes: THREE.Matrix4[][] = variantes.map(() => []);
  const cores: THREE.Color[][] = variantes.map(() => []);
  const arvores: Floresta['arvores'] = [];
  const grade = new Map<string, number>();
  const chave = (x: number, z: number) => `${Math.floor(x / 4)},${Math.floor(z / 4)}`;
  const livre = (x: number, z: number, d: number) => {
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
      const idx = grade.get(`${Math.floor(x / 4) + i},${Math.floor(z / 4) + j}`);
      if (idx !== undefined) { const t = arvores[idx]; if (Math.hypot(t.x - x, t.z - z) < d) return false; }
    }
    return true;
  };
  const colocar = (x: number, z: number, esp: Especie, escala: number) => {
    const h = campo.h(x, z);
    const cand = variantes.map((v, i) => [v, i] as const).filter(([v]) => v.esp === esp);
    const [v, vi] = cand[Math.floor(r() * cand.length)];
    const m = new THREE.Matrix4().compose(new THREE.Vector3(x, h - 0.12, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), r() * Math.PI * 2), new THREE.Vector3(escala, escala, escala));
    matrizes[vi].push(m);
    const c = new THREE.Color().setHSL(0.24 + (r() - 0.5) * 0.05, 0.1 + r() * 0.1, 0.5 + (r() - 0.5) * 0.12);
    cores[vi].push(esp === 'pinheiro' ? new THREE.Color(0.8 + r() * 0.2, 0.85 + r() * 0.15, 0.8 + r() * 0.2) : new THREE.Color(0.85 + r() * 0.3, 0.9 + r() * 0.2, 0.75 + r() * 0.3));
    void c;
    arvores.push({ x, z, h, esp, raio: 0.5 * escala });
    grade.set(chave(x, z), arvores.length - 1);
  };
  let tentativas = 0;
  while (arvores.length < quantidade && tentativas < quantidade * 60) {
    tentativas++;
    const x = (r() * 2 - 1) * 690, z = (r() * 2 - 1) * 690;
    const m = campo.mascara(x, z);
    if (r() > m.floresta * 1.15) continue;
    const h = campo.h(x, z);
    if (h < 2.2) continue;
    if (!livre(x, z, 4.6)) continue;
    const alto = suave(40, 85, h);
    const umido = 1 - suave(3, 16, h);
    const u = r();
    const esp: Especie = u < alto * 0.9 + 0.22 ? 'pinheiro' : u < alto * 0.9 + 0.22 + 0.3 + umido * 0.2 ? 'carvalho' : 'betula';
    colocar(x, z, esp, 0.8 + r() * 0.55 - alto * 0.2);
  }
  // árvores de destaque na margem do lago, na ilha e perto do início (para a cena de abertura)
  const extras: [number, number, Especie, number][] = [];
  for (let i = 0; i < 7; i++) { const a = r() * Math.PI * 2, d = 4 + r() * 12; extras.push([ILHA.x + Math.cos(a) * d, ILHA.z + Math.sin(a) * d, r() < 0.6 ? 'betula' : 'carvalho', 0.7 + r() * 0.3]); }
  extras.push([-34, 58, 'carvalho', 1.35], [-52, 40, 'betula', 1.1], [44, 52, 'carvalho', 1.25], [62, 38, 'pinheiro', 1.0], [-70, 70, 'pinheiro', 1.2], [30, 30, 'betula', 0.95]);
  for (const [x, z, e, s] of extras) { const h = campo.h(x, z); if (h > 0.9 && livre(x, z, 3.5)) colocar(x, z, e, s); }

  const sombras: THREE.Object3D[] = [];
  variantes.forEach((v, i) => {
    const n = matrizes[i].length; if (!n) return;
    const mk = (geo: THREE.BufferGeometry, material: THREE.Material, profMat: THREE.Material, usaCor: boolean) => {
      const im = new THREE.InstancedMesh(geo, material, n);
      matrizes[i].forEach((m, k) => { im.setMatrixAt(k, m); if (usaCor) im.setColorAt(k, cores[i][k]); });
      im.instanceMatrix.needsUpdate = true; if (im.instanceColor) im.instanceColor.needsUpdate = true;
      im.castShadow = sombra; im.receiveShadow = false; im.frustumCulled = false;
      im.customDepthMaterial = profMat as THREE.MeshDepthMaterial;
      grupo.add(im); sombras.push(im);
      return im;
    };
    mk(v.g.tronco, matCasca, profCasca, false);
    mk(v.g.folha, v.mat, v.prof, true);
  });
  return { grupo, arvores, sombras };
}

export { fbm, NIVEL_AGUA };
