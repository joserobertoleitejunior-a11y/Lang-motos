import * as THREE from 'three';
import { U } from './vento';

/** Carrega a fonte monoespaçada embutida (para o atlas de letras). */
export async function carregarFonte(): Promise<void> {
  const dados = (window as unknown as { __MUNDO_FONTE?: string }).__MUNDO_FONTE;
  try {
    if (dados) {
      const f = new FontFace('JetBrains Mono', `url(${dados})`, { weight: '700' });
      await f.load(); document.fonts.add(f);
    }
    await document.fonts.load('700 24px "JetBrains Mono"');
  } catch { /* usa a fonte monoespaçada do sistema */ }
}

const CANDIDATOS = ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
const CW = 16, CH = 28;

/** Monta a escala de letras ordenada pela quantidade de "tinta" de cada uma (medida de verdade). */
function criarAtlas(n = 30): { tex: THREE.CanvasTexture; n: number; letras: string } {
  const c = document.createElement('canvas'); c.width = CW; c.height = CH;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  g.font = `700 ${CH - 6}px "JetBrains Mono", ui-monospace, Menlo, monospace`; g.textAlign = 'center'; g.textBaseline = 'middle';
  const medidas = [...CANDIDATOS].map((ch) => {
    g.clearRect(0, 0, CW, CH); g.fillStyle = '#fff'; g.fillText(ch, CW / 2, CH / 2 + 1);
    const d = g.getImageData(0, 0, CW, CH).data; let s = 0; for (let i = 3; i < d.length; i += 4) s += d[i];
    return { ch, s };
  }).sort((a, b) => a.s - b.s);
  const escolhidas: string[] = [];
  for (let i = 0; i < n; i++) escolhidas.push(medidas[Math.round((i / (n - 1)) * (medidas.length - 1))].ch);
  const atlas = document.createElement('canvas'); atlas.width = CW * n; atlas.height = CH;
  const a = atlas.getContext('2d')!;
  a.fillStyle = '#000'; a.fillRect(0, 0, atlas.width, atlas.height);
  a.font = g.font; a.textAlign = 'center'; a.textBaseline = 'middle'; a.fillStyle = '#fff';
  escolhidas.forEach((ch, i) => a.fillText(ch, i * CW + CW / 2, CH / 2 + 1));
  const tex = new THREE.CanvasTexture(atlas);
  tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter; tex.generateMipmaps = false; tex.colorSpace = THREE.NoColorSpace;
  return { tex, n, letras: escolhidas.join('') };
}

const VERT = /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;
const FRAG = /* glsl */ `
precision highp float;
uniform sampler2D tCena; uniform sampler2D tProf; uniform sampler2D tAtlas; uniform vec2 uRes; uniform vec2 uCel; uniform float uN; uniform float uExp; uniform float uTime; uniform float uNoite;
varying vec2 vUv;
vec3 aces(vec3 x){ const float a=2.51, b=0.03, c=2.43, d=0.59, e=0.14; return clamp((x*(a*x+b))/(x*(c*x+d)+e), 0.0, 1.0); }
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
void main(){
  vec2 px = vUv * uRes;
  vec2 cel = floor(px / uCel);
  vec2 dentro = fract(px / uCel);
  vec2 cuv = (cel + 0.5) * uCel / uRes;
  vec2 o = uCel / uRes * 0.30;
  vec3 c = texture2D(tCena, cuv).rgb * 0.36
         + texture2D(tCena, cuv + vec2( o.x,  o.y)).rgb * 0.16 + texture2D(tCena, cuv + vec2(-o.x,  o.y)).rgb * 0.16
         + texture2D(tCena, cuv + vec2( o.x, -o.y)).rgb * 0.16 + texture2D(tCena, cuv + vec2(-o.x, -o.y)).rgb * 0.16;
  // realça pontos muito brilhantes (estrelas, sol, reflexos)
  vec3 pico = max(max(texture2D(tCena, cuv + vec2(o.x, 0.0)).rgb, texture2D(tCena, cuv - vec2(o.x, 0.0)).rgb), texture2D(tCena, cuv).rgb);
  c = mix(c, pico, 0.25 * smoothstep(1.2, 3.0, dot(pico, vec3(0.33))));
  vec3 col = pow(aces(c * uExp * (1.0 + 4.5 * uNoite)), vec3(1.0/2.2));
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  // curva de contraste: escuros ficam esparsos (como nos vídeos de referência)
  float ceuF = step(0.99995, texture2D(tProf, cuv).x);
  float l = clamp(pow(lum, 2.0) * 1.3 - 0.01, 0.0, 0.999);
  l *= mix(1.0, mix(0.3, 0.85, uNoite), ceuF);
  l += (hash(cel + floor(uTime*0.0)) - 0.5) * 0.035;   // grão leve para variar as letras vizinhas
  float g = floor(clamp(l, 0.0, 0.999) * uN);
  float cov = texture2D(tAtlas, vec2((g + dentro.x) / uN, dentro.y)).r;
  vec3 cq = floor(col * 9.0 + 0.5) / 9.0;                       // cores "posterizadas": cara de pixel art
  float m = (cq.r + cq.g + cq.b) / 3.0;
  vec3 gc = clamp(m + (cq - m) * 1.55, 0.0, 1.0) * (0.7 + 0.9 * lum);
  vec3 bg = cq * 0.05;
  vec3 saida = bg + gc * cov;
  saida += cq * 0.05 * l;                                       // brilho suave
  vec2 q = vUv - 0.5; saida *= 1.0 - 0.34 * pow(length(q) * 1.45, 2.2);
  gl_FragColor = vec4(saida, 1.0);
}`;

export type Ascii = ReturnType<typeof criarAscii>;

export function criarAscii(renderer: THREE.WebGLRenderer, nCelulaCss: number) {
  const atlas = criarAtlas();
  const rt = new THREE.WebGLRenderTarget(64, 64, { type: THREE.HalfFloatType, depthBuffer: true, samples: 0 });
  rt.depthTexture = new THREE.DepthTexture(64, 64);
  rt.texture.minFilter = THREE.LinearFilter; rt.texture.magFilter = THREE.LinearFilter; rt.texture.generateMipmaps = false;
  const mat = new THREE.ShaderMaterial({
    uniforms: { tCena: { value: rt.texture }, tProf: { value: rt.depthTexture }, tAtlas: { value: atlas.tex }, uRes: { value: new THREE.Vector2(1, 1) }, uCel: { value: new THREE.Vector2(9, 16) }, uN: { value: atlas.n }, uExp: { value: 0.85 }, uTime: U.uTime, uNoite: { value: 0 } },
    vertexShader: VERT, fragmentShader: FRAG, depthTest: false, depthWrite: false, toneMapped: false,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  quad.frustumCulled = false;
  const cena = new THREE.Scene(); cena.add(quad);
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  let celCss = nCelulaCss;
  const info = { colunas: 0, linhas: 0 };

  function ajustar() {
    const sz = new THREE.Vector2(); renderer.getDrawingBufferSize(sz);
    const dpr = renderer.getPixelRatio();
    const cw = celCss * dpr, ch = celCss * dpr * 16 / 9;
    mat.uniforms.uRes.value.copy(sz); mat.uniforms.uCel.value.set(cw, ch);
    const w = Math.max(32, Math.round(sz.x / cw * 3)), h = Math.max(32, Math.round(sz.y / ch * 3));
    if (rt.width !== w || rt.height !== h) rt.setSize(w, h);
    info.colunas = Math.floor(sz.x / cw); info.linhas = Math.floor(sz.y / ch);
  }
  function definirCelula(px: number) { celCss = px; ajustar(); }
  function desenhar() { renderer.render(cena, cam); }
  return { rt, mat, ajustar, desenhar, definirCelula, info, letras: atlas.letras, get celula() { return celCss; } };
}
