/**
 * Motor de letras da Vibe Coding Process.
 * Recebe um canvas 2D comum (o "desenho") e o transforma em letras coloridas,
 * no mesmo estilo do Mundo VCP 3D: cada célula da tela vira um caractere
 * escolhido pela intensidade e pela direção das bordas do desenho.
 * WebGL 1, sem dependências.
 */

const DENSIDADE = " .'`,:;-~_^\"=+*!?ri|/\\(){}[]tfjlcxzvunsoaeLJYTCZXUOQ0hkbdpqwmBHKNRSDMW&8%#@$";
const DIRECOES = ['-', '/', '|', '\\'];

const VERT = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";

const FRAG = `
precision mediump float;
uniform sampler2D uFonte;
uniform sampler2D uAtlas;
uniform vec2 uCel;
uniform vec4 uVista;
uniform float uN;
uniform float uTotal;
uniform float uTempo;
uniform float uFundo;
uniform float uBorda;
uniform vec3 uCorFundo;
uniform vec4 uOnda[4];

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float ruido(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
vec3 amostra(vec2 uv){ return texture2D(uFonte, uv).rgb; }
float forca(vec3 c){ return max(c.r, max(c.g, c.b)); }

void main(){
  vec2 cel = floor(gl_FragCoord.xy / uCel);
  vec2 dentro = (gl_FragCoord.xy - cel * uCel) / uCel;
  vec2 centro = (cel + 0.5) * uCel;
  vec2 g = (centro - uVista.xy) / uVista.zw;

  float indice = 0.0;
  vec3 cor = vec3(0.0);
  float base = 0.0;

  if (g.x >= 0.0 && g.y >= 0.0 && g.x <= 1.0 && g.y <= 1.0) {
    vec2 t = vec2(g.x, 1.0 - g.y);
    vec2 d = uCel / uVista.zw * 0.3;
    vec3 c0 = amostra(t);
    vec3 tl = amostra(t + vec2(-d.x, -d.y));
    vec3 tr = amostra(t + vec2( d.x, -d.y));
    vec3 bl = amostra(t + vec2(-d.x,  d.y));
    vec3 br = amostra(t + vec2( d.x,  d.y));
    cor = c0 * 0.4 + (tl + tr + bl + br) * 0.15;
    float v = forca(cor);
    float ftl = forca(tl), ftr = forca(tr), fbl = forca(bl), fbr = forca(br);
    float gx = (ftr + fbr) - (ftl + fbl);
    float gy = (ftl + ftr) - (fbl + fbr);
    float mag = length(vec2(gx, gy));
    float nivel = clamp(pow(v, 0.85), 0.0, 0.999);
    indice = floor(nivel * uN);
    if (uBorda > 0.5 && mag > 0.55 && v > 0.12 && v < 0.92) {
      float ang = atan(gy, gx) + 1.5707963;
      float a = mod(ang, 3.14159265) / 3.14159265;
      float dir = floor(mod(a * 4.0 + 0.5, 4.0));
      indice = uN + dir;
    }
    vec3 matiz = cor / max(v, 0.001);
    cor = matiz * (0.55 + 0.6 * v);
    base = v * 0.07;
    if (v < 0.03) {
      float r = ruido(cel * 0.35 + vec2(0.0, uTempo * 0.4));
      float pontos = step(0.96, hash(cel + floor(uTempo * 0.5))) * 0.1 * uFundo;
      indice = floor(clamp(r * 0.045 * uFundo + pontos, 0.0, 0.2) * uN);
      cor = uCorFundo * 1.4;
      base = 0.0;
    }
  } else {
    float r = ruido(cel * vec2(0.09, 0.13) + vec2(uTempo * 0.05, -uTempo * 0.12));
    float r2 = ruido(cel * 0.31 - vec2(uTempo * 0.2, 0.0));
    float n = r * 0.55 + r2 * 0.25;
    float extra = 0.0;
    for (int i = 0; i < 4; i++) {
      vec4 o = uOnda[i];
      if (o.w > 0.0) {
        float idade = uTempo - o.z;
        float dist = length((centro - o.xy) / uCel.x);
        float frente = idade * 34.0;
        extra += o.w * exp(-pow(dist - frente, 2.0) / 18.0) * exp(-idade * 1.4);
        extra += o.w * 0.6 * exp(-dist * dist / 60.0) * exp(-idade * 3.0);
      }
    }
    float nivel = clamp(n * n * 0.55 * uFundo + extra * 0.75, 0.0, 0.999);
    indice = floor(nivel * uN);
    cor = mix(uCorFundo, vec3(1.0, 0.82, 0.42), clamp(extra * 1.4, 0.0, 1.0)) * (0.7 + extra);
  }

  float cobre = texture2D(uAtlas, vec2((indice + dentro.x) / uTotal, 1.0 - dentro.y)).r;
  vec3 saida = cor * base + cor * cobre;
  gl_FragColor = vec4(saida, 1.0);
}`;

function compilar(gl, tipo, fonte) {
  const s = gl.createShader(tipo);
  gl.shaderSource(s, fonte);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader');
  return s;
}

/** Ordena as letras pela "tinta" real de cada uma e desenha o atlas no tamanho exato da célula. */
function desenharAtlas(cw, ch, n) {
  const medir = document.createElement('canvas');
  medir.width = 32; medir.height = 56;
  const m = medir.getContext('2d', { willReadFrequently: true });
  m.font = '700 44px "JetBrains Mono", ui-monospace, Menlo, monospace';
  m.textAlign = 'center'; m.textBaseline = 'middle'; m.fillStyle = '#fff';
  const medidas = [...new Set(DENSIDADE)].map((c) => {
    m.clearRect(0, 0, 32, 56); m.fillText(c, 16, 29);
    const d = m.getImageData(0, 0, 32, 56).data;
    let s = 0; for (let i = 3; i < d.length; i += 4) s += d[i];
    return { c, s };
  }).sort((a, b) => a.s - b.s);
  const escolhidas = [];
  for (let i = 0; i < n; i++) escolhidas.push(medidas[Math.round((i / (n - 1)) * (medidas.length - 1))].c);
  const todas = escolhidas.concat(DIRECOES);
  const atlas = document.createElement('canvas');
  atlas.width = cw * todas.length; atlas.height = ch;
  const a = atlas.getContext('2d');
  a.fillStyle = '#000'; a.fillRect(0, 0, atlas.width, atlas.height);
  a.fillStyle = '#fff';
  a.font = `700 ${Math.max(4, Math.round(ch * 0.82))}px "JetBrains Mono", ui-monospace, Menlo, monospace`;
  a.textAlign = 'center'; a.textBaseline = 'middle';
  todas.forEach((c, i) => a.fillText(c, i * cw + cw / 2, ch / 2 + 0.5));
  return { atlas, total: todas.length };
}

/**
 * @param {HTMLCanvasElement} canvas tela de saída (WebGL)
 * @param {{celula?: number, fundo?: number, corFundo?: number[], bordas?: boolean}} opcoes
 */
export function criarLetras(canvas, opcoes = {}) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false, preserveDrawingBuffer: !!opcoes.preservar });
  if (!gl) throw new Error('WebGL indisponível');
  const prog = gl.createProgram();
  gl.attachShader(prog, compilar(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compilar(gl, gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || 'programa');
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {};
  for (const nome of ['uFonte', 'uAtlas', 'uCel', 'uVista', 'uN', 'uTotal', 'uTempo', 'uFundo', 'uBorda', 'uCorFundo', 'uOnda']) U[nome] = gl.getUniformLocation(prog, nome);

  const texFonte = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texFonte);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const texAtlas = gl.createTexture();
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, texAtlas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.uniform1i(U.uFonte, 0);
  gl.uniform1i(U.uAtlas, 1);

  const N = 28;
  let celulaCss = opcoes.celula ?? 6;
  let cw = 0;
  let ch = 0;
  let dpr = 1;
  const ondas = new Float32Array(16);
  let proxOnda = 0;
  const info = { colunas: 0, linhas: 0, letras: 0 };
  const corFundo = opcoes.corFundo ?? [0.34, 0.27, 0.1];

  function montarAtlas() {
    const { atlas, total } = desenharAtlas(cw, ch, N);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texAtlas);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
    gl.uniform1f(U.uN, N);
    gl.uniform1f(U.uTotal, total);
  }

  function redimensionar() {
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const w = Math.max(16, Math.floor(canvas.clientWidth * dpr));
    const h = Math.max(16, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    const novoCw = Math.max(3, Math.round(celulaCss * dpr));
    const novoCh = Math.round(novoCw * 1.75);
    if (novoCw !== cw || novoCh !== ch) { cw = novoCw; ch = novoCh; montarAtlas(); }
    gl.viewport(0, 0, w, h);
    info.colunas = Math.floor(w / cw); info.linhas = Math.floor(h / ch); info.letras = info.colunas * info.linhas;
  }

  /** Cria uma onda de letras a partir de um ponto (coordenadas CSS relativas ao canvas). */
  function onda(xCss, yCss, intensidade = 1, tempo = performance.now() / 1000) {
    const i = (proxOnda++ % 4) * 4;
    ondas[i] = xCss * dpr; ondas[i + 1] = canvas.height - yCss * dpr; ondas[i + 2] = tempo; ondas[i + 3] = intensidade;
  }

  /**
   * @param {HTMLCanvasElement|null} fonte desenho 2D (pode ser null: só o campo de letras)
   * @param {{x:number,y:number,w:number,h:number}} vista área do desenho dentro do canvas, em px CSS
   */
  function desenhar(fonte, vista, tempo = performance.now() / 1000) {
    if (fonte) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texFonte);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fonte);
    }
    const v = fonte && vista ? vista : { x: -9, y: -9, w: 1, h: 1 };
    gl.uniform2f(U.uCel, cw, ch);
    gl.uniform4f(U.uVista, v.x * dpr, canvas.height - (v.y + v.h) * dpr, v.w * dpr, v.h * dpr);
    gl.uniform1f(U.uTempo, tempo);
    gl.uniform1f(U.uFundo, opcoes.fundo ?? 1);
    gl.uniform1f(U.uBorda, opcoes.bordas === false ? 0 : 1);
    gl.uniform3f(U.uCorFundo, corFundo[0], corFundo[1], corFundo[2]);
    gl.uniform4fv(U.uOnda, ondas);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function definirCelula(px) { celulaCss = px; redimensionar(); }
  function definirFundo(f) { opcoes.fundo = f; }

  redimensionar();
  return { desenhar, redimensionar, definirCelula, definirFundo, onda, info, get celula() { return celulaCss; }, gl };
}

/** Espera a fonte das letras carregar antes de montar o atlas. */
export async function prepararFonte() {
  try { await document.fonts.load('700 24px "JetBrains Mono"'); } catch { /* usa a monoespaçada do sistema */ }
}
