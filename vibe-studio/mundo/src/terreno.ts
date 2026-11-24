import * as THREE from 'three';
import { crista, fbm, limitar, misturar, suave } from './ruido';
import { GLSL_VENTO, U } from './vento';

/** Medidas do mundo (metros). O lago fica no centro-norte; o jogador começa na margem sul. */
export const MEIA = 700;
export const MEIA_EXT = 3193.75;
export const LAGO = { cx: 0, cz: -70, rx: 235, rz: 150 };
export const ILHA = { x: 70, z: -88 };
export const NIVEL_AGUA = 0;
export const INICIO = { x: 4, z: 72 };

const sp = (x: number) => (x > 18 ? x : Math.log1p(Math.exp(x)));

/** Altura do terreno em qualquer ponto. Função pura: tudo o que existe no mundo nasce dela. */
export function altura(x: number, z: number): number {
  const w = fbm(x * 0.0045 + 3.1, z * 0.0045 - 7.7, 3) * 0.2;
  const dx = (x - LAGO.cx) / LAGO.rx;
  const dz = (z - LAGO.cz) / LAGO.rz;
  const d = Math.hypot(dx, dz) + w + 0.05 * fbm(x * 0.02 + 5, z * 0.02 + 1, 2);
  const r = Math.hypot(x, z);
  const colinas = 5 + 9 * fbm(x * 0.0055 + 9, z * 0.0055 + 2, 4) + 2.5 * fbm(x * 0.03, z * 0.03, 2);
  const terraBase = 1.7 + sp(colinas * 0.9);
  const norte = limitar(-z / Math.max(r, 1), -1, 1);
  const fator = suave(190, 540, r) * (0.62 + 0.5 * suave(-0.3, 0.9, norte));
  const mont = crista(x * 0.0018 + 1.3, z * 0.0018 + 4.2, 5);
  const mont2 = fbm(x * 0.007, z * 0.007, 4);
  const terra = terraBase + fator * (35 + 250 * mont + 40 * mont2);
  const k = limitar(1 - d / 0.62, 0, 1);
  let leito = -13 * Math.pow(k, 0.85);
  const ex = x - ILHA.x, ez = z - ILHA.z;
  leito += 12.8 * Math.exp(-(ex * ex + ez * ez) / (2 * 21 * 21)) * suave(0, 0.2, k);
  return misturar(leito, terra, suave(0.6, 1.03, d));
}

/** Quanto de floresta cabe neste ponto (0..1). */
export function densidadeFloresta(x: number, z: number, h: number, declive: number): number {
  const f = suave(0.1, 0.46, fbm(x * 0.0042 + 21, z * 0.0042 - 13, 3));
  const alt = 1 - suave(70, 135, h);
  const margem = suave(2.6, 6.5, h);
  const incl = 1 - suave(0.22, 0.5, declive);
  const clareira = suave(40, 110, Math.hypot(x - INICIO.x, z - INICIO.z));
  return f * alt * margem * incl * clareira;
}

export function densidadeCampo(h: number, declive: number, floresta: number): number {
  return (1 - floresta * 0.88) * suave(0.7, 2.0, h) * (1 - suave(0.18, 0.4, declive)) * (1 - suave(55, 105, h));
}

export type Campo = {
  seg: number; tam: number; celula: number; alturas: Float32Array; normais: Float32Array; floresta: Float32Array; campo: Float32Array;
  textura: THREE.DataTexture;
  h(x: number, z: number): number;
  normal(x: number, z: number, out?: THREE.Vector3): THREE.Vector3;
  declive(x: number, z: number): number;
  mascara(x: number, z: number): { floresta: number; campo: number };
};

export function gerarCampo(seg: number): Campo {
  const n = seg + 1;
  const tam = MEIA * 2;
  const celula = tam / seg;
  const alturas = new Float32Array(n * n);
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) alturas[j * n + i] = altura(-MEIA + i * celula, -MEIA + j * celula);
  const normais = new Float32Array(n * n * 3);
  const floresta = new Float32Array(n * n);
  const campo = new Float32Array(n * n);
  const H = (i: number, j: number) => alturas[limitar(j, 0, seg) * n + limitar(i, 0, seg)];
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const gx = (H(i + 1, j) - H(i - 1, j)) / (2 * celula);
      const gz = (H(i, j + 1) - H(i, j - 1)) / (2 * celula);
      const l = Math.hypot(gx, 1, gz);
      const k = j * n + i;
      normais[k * 3] = -gx / l; normais[k * 3 + 1] = 1 / l; normais[k * 3 + 2] = -gz / l;
      const decl = 1 - normais[k * 3 + 1];
      const x = -MEIA + i * celula, z = -MEIA + j * celula;
      floresta[k] = densidadeFloresta(x, z, alturas[k], decl);
      campo[k] = densidadeCampo(alturas[k], decl, floresta[k]);
    }
  }
  // textura para a GPU: R = altura, G = floresta, B = campo (meia precisão)
  const dados = new Uint16Array(n * n * 4);
  for (let k = 0; k < n * n; k++) {
    dados[k * 4] = THREE.DataUtils.toHalfFloat(alturas[k]);
    dados[k * 4 + 1] = THREE.DataUtils.toHalfFloat(floresta[k]);
    dados[k * 4 + 2] = THREE.DataUtils.toHalfFloat(campo[k]);
    dados[k * 4 + 3] = THREE.DataUtils.toHalfFloat(1);
  }
  const textura = new THREE.DataTexture(dados, n, n, THREE.RGBAFormat, THREE.HalfFloatType);
  textura.minFilter = THREE.LinearFilter; textura.magFilter = THREE.LinearFilter;
  textura.wrapS = textura.wrapT = THREE.ClampToEdgeWrapping; textura.needsUpdate = true;

  const amostra = (arr: Float32Array, x: number, z: number, passo = 1, off = 0) => {
    const fx = limitar((x + MEIA) / celula, 0, seg - 0.0001), fz = limitar((z + MEIA) / celula, 0, seg - 0.0001);
    const i = Math.floor(fx), j = Math.floor(fz), tx = fx - i, tz = fz - j;
    const a = arr[(j * n + i) * passo + off], b = arr[(j * n + i + 1) * passo + off], c = arr[((j + 1) * n + i) * passo + off], d = arr[((j + 1) * n + i + 1) * passo + off];
    return (a * (1 - tx) + b * tx) * (1 - tz) + (c * (1 - tx) + d * tx) * tz;
  };
  const dentro = (x: number, z: number) => Math.abs(x) < MEIA - 1 && Math.abs(z) < MEIA - 1;
  return {
    seg, tam, celula, alturas, normais, floresta, campo, textura,
    h: (x, z) => (dentro(x, z) ? amostra(alturas, x, z) : altura(x, z)),
    normal: (x, z, out = new THREE.Vector3()) => out.set(amostra(normais, x, z, 3, 0), amostra(normais, x, z, 3, 1), amostra(normais, x, z, 3, 2)).normalize(),
    declive: (x, z) => 1 - amostra(normais, x, z, 3, 1),
    mascara: (x, z) => ({ floresta: amostra(floresta, x, z), campo: amostra(campo, x, z) }),
  };
}

/* ------------------------------------------------------------------ malha */

function malhaInterna(c: Campo): THREE.BufferGeometry {
  const n = c.seg + 1;
  const pos: number[] = [], nor: number[] = [];
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
    const k = j * n + i;
    pos.push(-MEIA + i * c.celula, c.alturas[k], -MEIA + j * c.celula);
    nor.push(c.normais[k * 3], c.normais[k * 3 + 1], c.normais[k * 3 + 2]);
  }
  const idx: number[] = [];
  for (let j = 0; j < c.seg; j++) for (let i = 0; i < c.seg; i++) {
    const a = j * n + i, b = a + 1, d = a + n, e = d + 1;
    idx.push(a, d, b, b, d, e);
  }
  // saia: esconde frestas entre a malha detalhada e a de fundo
  const base = pos.length / 3;
  const borda: number[] = [];
  for (let i = 0; i < n; i++) borda.push(i);
  for (let j = 1; j < n; j++) borda.push(j * n + c.seg);
  for (let i = c.seg - 1; i >= 0; i--) borda.push(c.seg * n + i);
  for (let j = c.seg - 1; j >= 1; j--) borda.push(j * n);
  borda.forEach((k) => { pos.push(pos[k * 3], pos[k * 3 + 1] - 45, pos[k * 3 + 2]); nor.push(nor[k * 3], nor[k * 3 + 1], nor[k * 3 + 2]); });
  const m = borda.length;
  for (let q = 0; q < m; q++) { const a = borda[q], b = borda[(q + 1) % m]; const sa = base + q, sb = base + ((q + 1) % m); idx.push(a, sa, b, b, sa, sb); }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setIndex(idx);
  return g;
}

function malhaExterna(): THREE.BufferGeometry {
  const cel = 43.75, N = 73;
  const lado = N * 2 + 1;
  const pos: number[] = [], nor: number[] = [];
  const e = 4;
  for (let j = -N; j <= N; j++) for (let i = -N; i <= N; i++) {
    const x = i * cel, z = j * cel;
    const h = altura(x, z);
    const gx = (altura(x + e, z) - altura(x - e, z)) / (2 * e), gz = (altura(x, z + e) - altura(x, z - e)) / (2 * e);
    const l = Math.hypot(gx, 1, gz);
    pos.push(x, h, z); nor.push(-gx / l, 1 / l, -gz / l);
  }
  const idx: number[] = [];
  for (let j = 0; j < lado - 1; j++) for (let i = 0; i < lado - 1; i++) {
    const cx = (i - N + 0.5) * cel, cz = (j - N + 0.5) * cel;
    if (Math.abs(cx) < MEIA && Math.abs(cz) < MEIA) continue;
    const a = j * lado + i, b = a + 1, d = a + lado, f = d + 1;
    idx.push(a, d, b, b, d, f);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setIndex(idx);
  return g;
}

/* ------------------------------------------------------------------ material (cores feitas por código) */

const VERT_PARS = /* glsl */ `varying vec3 vWPos; varying float vDist; varying vec3 vWNor;`;
const FRAG_PARS = /* glsl */ `
varying vec3 vWPos; varying float vDist; varying vec3 vWNor;
uniform sampler2D uCampoTex; uniform float uMeia; uniform float uDentro;
${GLSL_VENTO}
vec3 terrenoCor(vec3 p, vec3 nW, float floresta, float campoM){
  float h = p.y;
  float slope = 1.0 - nW.y;
  float nA = vfbm(p.xz*0.045), nB = vfbm(p.xz*0.35+9.0), nC = vn(p.xz*2.6);
  vec3 grama1 = vec3(0.115,0.205,0.045), grama2 = vec3(0.235,0.30,0.075), seca = vec3(0.37,0.34,0.14);
  vec3 g = mix(grama1, grama2, smoothstep(0.25,0.75,nA*0.7+nB*0.5));
  g = mix(g, seca, smoothstep(0.55,0.85,nA)*0.55*(1.0-floresta));
  g *= 0.82 + 0.36*nC;
  vec3 chao = vec3(0.075,0.085,0.035) * (0.8+0.5*nB);
  vec3 col = mix(g, chao, floresta*0.85);
  // areia perto da água, molhada na beira
  float areia = smoothstep(1.7, 0.55, h) * smoothstep(0.55, 0.15, slope+nB*0.18);
  vec3 areiaC = mix(vec3(0.60,0.52,0.36), vec3(0.45,0.38,0.26), smoothstep(0.7,0.0,h));
  col = mix(col, areiaC*(0.85+0.3*nC), clamp(areia,0.0,1.0));
  // rocha nas encostas e nas alturas
  float rocha = smoothstep(0.28, 0.5, slope + (nA-0.5)*0.22) + smoothstep(85.0, 150.0, h + (nB-0.5)*40.0)*0.7;
  vec3 rochaC = mix(vec3(0.30,0.285,0.27), vec3(0.45,0.42,0.38), vn(p.xz*0.9 + p.y*0.15));
  rochaC *= 0.8 + 0.4*vn(vec2(p.y*1.7, p.x*0.2));
  col = mix(col, rochaC, clamp(rocha,0.0,1.0));
  // neve
  float neve = smoothstep(150.0, 185.0, h + (nA-0.5)*45.0) * smoothstep(0.75, 0.35, slope);
  col = mix(col, vec3(0.90,0.93,0.98), clamp(neve,0.0,1.0));
  // fundo do lago: lama escura, com luz ondulante (cáusticas) na parte rasa
  float sub = smoothstep(0.1, -0.5, h);
  float prof = clamp(-h/9.0, 0.0, 1.0);
  vec3 fundo = mix(vec3(0.20,0.19,0.13), vec3(0.04,0.06,0.06), prof);
  float cau = pow(1.0 - abs(vn(p.xz*0.7 + uTime*vec2(0.25,0.18))*2.0-1.0), 5.0) + pow(1.0 - abs(vn(p.xz*1.1 - uTime*vec2(0.2,0.3))*2.0-1.0), 6.0);
  fundo += cau * 0.10 * smoothstep(5.0, 0.0, -h);
  col = mix(col, fundo, sub);
  return col;
}`;

export function materialTerreno(c: Campo, interno: boolean) {
  const m = new THREE.MeshStandardMaterial({ roughness: 0.96, metalness: 0 });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = U.uTime; sh.uniforms.uWindDir = U.uWindDir; sh.uniforms.uWind = U.uWind; sh.uniforms.uWindMs = U.uWindMs;
    sh.uniforms.uCampoTex = { value: c.textura }; sh.uniforms.uMeia = { value: MEIA }; sh.uniforms.uDentro = { value: interno ? 1 : 0 };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>\n${VERT_PARS}`)
      .replace('#include <begin_vertex>', `#include <begin_vertex>\nvWNor = normalize(mat3(modelMatrix) * objectNormal); vWPos = (modelMatrix * vec4(transformed,1.0)).xyz; vDist = length((modelViewMatrix*vec4(transformed,1.0)).xyz);`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>\n${FRAG_PARS}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
        vec3 nW = normalize(vWNor);
        float flo = 0.0, cmp = 1.0;
        if (uDentro > 0.5) { vec4 tc = texture2D(uCampoTex, (vWPos.xz + uMeia) / (2.0*uMeia)); flo = tc.g; cmp = tc.b; }
        else { flo = (1.0 - smoothstep(60.0, 120.0, vWPos.y)) * smoothstep(0.1, 0.5, vfbm(vWPos.xz*0.0042+21.0)) * 0.6; }
        diffuseColor.rgb = terrenoCor(vWPos, nW, flo, cmp);`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        { float fade = 1.0/(1.0 + vDist*0.025);
          vec2 pg = vgrad(vWPos.xz*0.8)*0.45 + vgrad(vWPos.xz*3.1)*0.18 + vgrad(vWPos.xz*0.12)*0.7;
          vec3 gw = vec3(-pg.x, 0.0, -pg.y) * fade * 0.55;
          normal = normalize(normal + (viewMatrix * vec4(gw,0.0)).xyz); }`);
  };
  return m;
}

export function criarTerreno(c: Campo): { interno: THREE.Mesh; externo: THREE.Mesh } {
  const interno = new THREE.Mesh(malhaInterna(c), materialTerreno(c, true));
  interno.receiveShadow = true;
  interno.frustumCulled = false;
  const externo = new THREE.Mesh(malhaExterna(), materialTerreno(c, false));
  externo.frustumCulled = false;
  return { interno, externo };
}
