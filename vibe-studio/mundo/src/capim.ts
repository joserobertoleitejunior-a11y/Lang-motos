import * as THREE from 'three';
import { aleatorio, fbm, limitar, suave } from './ruido';
import { GLSL_VENTO, U } from './vento';
import { type Campo, MEIA } from './terreno';
import { injetarVento, semInverter } from './arvores';

/* ------------------------------------------------------------------ capim: tufos que "andam" com a câmera e se curvam com o vento */

function geometriaTufo(): THREE.BufferGeometry {
  const pos: number[] = [], nor: number[] = [], col: number[] = [], ay: number[] = [], idx: number[] = [];
  const linhas = 4;
  for (let b = 0; b < 3; b++) {
    const yaw = (b / 3) * Math.PI + 0.3, cy = Math.cos(yaw), sy = Math.sin(yaw);
    const inclina = 0.12 + b * 0.07;
    const base = pos.length / 3;
    for (let i = 0; i < linhas; i++) {
      const t = i / (linhas - 1);
      const w = 0.026 * (1 - t * 0.9);
      const y = t, z = inclina * t * t;
      for (const lado of [-1, 1]) {
        const x = lado * w;
        pos.push(x * cy - z * sy * 0 + z * 0, y, x * sy + z * 0);
        // gira o tufo em torno do eixo y e empurra a ponta para fora
        const px = x * cy - 0, pz = x * sy;
        pos[pos.length - 3] = px + (-sy) * z; pos[pos.length - 1] = pz + cy * z;
        nor.push(0.2 * cy, 0.96, 0.2 * sy);
        const k = 0.35 + 0.65 * t;
        col.push(k * 0.55, k * 0.95, k * 0.35);
        ay.push(t);
      }
    }
    for (let i = 0; i < linhas - 1; i++) { const a = base + i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('aY', new THREE.Float32BufferAttribute(ay, 1));
  g.setIndex(idx);
  return g;
}

function geometriaFlor(): THREE.BufferGeometry {
  const pos: number[] = [], nor: number[] = [], col: number[] = [], ay: number[] = [], cab: number[] = [], idx: number[] = [];
  // caule
  for (const t of [0, 1]) for (const lado of [-1, 1]) { pos.push(lado * 0.006, t, 0); nor.push(0, 1, 0); col.push(0.25, 0.5, 0.15); ay.push(t); cab.push(0); }
  idx.push(0, 1, 2, 1, 3, 2);
  // pétalas
  const n = 6;
  for (let p = 0; p < n; p++) {
    const a = (p / n) * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
    const b = pos.length / 3;
    const pts: [number, number, number][] = [[0, 1, 0], [ca * 0.07 - sa * 0.03, 1.02, sa * 0.07 + ca * 0.03], [ca * 0.07 + sa * 0.03, 1.02, sa * 0.07 - ca * 0.03]];
    for (const [x, y, z] of pts) { pos.push(x, y, z); nor.push(0, 1, 0); col.push(1, 1, 1); ay.push(1); cab.push(1); }
    idx.push(b, b + 1, b + 2, b, b + 2, b + 1);
  }
  const b = pos.length / 3;
  for (const [x, z] of [[0.02, 0], [-0.01, 0.017], [-0.01, -0.017]]) { pos.push(x, 1.035, z); nor.push(0, 1, 0); col.push(1, 0.8, 0.1); ay.push(1); cab.push(2); }
  idx.push(b, b + 1, b + 2, b, b + 2, b + 1);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('aY', new THREE.Float32BufferAttribute(ay, 1));
  g.setAttribute('aCab', new THREE.Float32BufferAttribute(cab, 1));
  g.setIndex(idx);
  return g;
}

function injetarCampo(sh: { uniforms: Record<string, unknown>; vertexShader: string; fragmentShader: string }, campo: Campo, janela: number, flor: boolean) {
  sh.uniforms.uTime = U.uTime; sh.uniforms.uWindDir = U.uWindDir; sh.uniforms.uWind = U.uWind; sh.uniforms.uWindMs = U.uWindMs;
  sh.uniforms.uCam = U.uCam; sh.uniforms.uJanela = { value: janela }; sh.uniforms.uCampoTex = { value: campo.textura }; sh.uniforms.uMeia = { value: MEIA };
  sh.vertexShader = sh.vertexShader
    .replace('#include <common>', `#include <common>
      attribute vec4 aRand; attribute float aY; ${flor ? 'attribute float aCab; varying vec3 vFlor; varying float vCab;' : ''}
      uniform float uJanela; uniform vec3 uCam; uniform sampler2D uCampoTex; uniform float uMeia;
      varying float vRajada;
      ${GLSL_VENTO}`)
    .replace('#include <begin_vertex>', `
      vec2 cam = uCam.xz;
      vec2 off = (fract(aRand.xy - cam / uJanela) - 0.5) * uJanela;
      vec2 base = cam + off;
      vec4 tc = texture2D(uCampoTex, clamp((base + uMeia) / (2.0 * uMeia), 0.001, 0.999));
      float dist = length(off);
      float dens = tc.b * (1.0 - smoothstep(uJanela * 0.28, uJanela * 0.5, dist));
      ${flor ? 'dens *= smoothstep(0.62, 0.72, vn(base * 0.07 + 5.0)) * 0.9;' : 'dens *= 0.55 + 0.45 * smoothstep(0.2, 0.6, vn(base * 0.2));'}
      float keep = step(aRand.w, dens);
      float gh = ${flor ? '(0.28 + 0.3 * aRand.z)' : '(0.34 + 0.5 * aRand.z * aRand.z + 0.18 * vn(base * 0.5))'} * keep;
      float yaw = aRand.z * 37.0;
      float cy = cos(yaw), sy = sin(yaw);
      vec3 lp = vec3(position.x * cy - position.z * sy, position.y * gh, position.x * sy + position.z * cy);
      float rj = rajada(base); vRajada = rj;
      float forca = uWind * (0.3 + 0.7 * rj) + 0.06;
      float osc = sin(uTime * (2.4 + uWindMs * 0.35) + base.x * 0.9 + base.y * 0.6 + aRand.z * 6.0);
      float curva = aY * aY * gh * (forca * 0.95 + 0.14 * forca * osc);
      lp.xz += uWindDir * curva; lp.y -= curva * 0.3;
      vec3 transformed = vec3(base.x + lp.x, tc.r - 0.03 + lp.y, base.y + lp.z);
      ${flor ? `vCab = aCab; float h6 = fract(aRand.z * 7.13);
      vFlor = h6 < 0.28 ? vec3(0.95, 0.95, 0.92) : h6 < 0.5 ? vec3(1.0, 0.82, 0.12) : h6 < 0.72 ? vec3(0.78, 0.28, 0.62) : h6 < 0.88 ? vec3(0.45, 0.4, 0.95) : vec3(1.0, 0.45, 0.18);` : ''}
    `);
  sh.fragmentShader = sh.fragmentShader
    .replace('#include <common>', `#include <common>\nvarying float vRajada; uniform float uWind;${flor ? ' varying vec3 vFlor; varying float vCab;' : ''}`)
    .replace('#include <color_fragment>', `#include <color_fragment>
      ${flor ? 'if (vCab > 1.5) diffuseColor.rgb = vec3(0.95, 0.7, 0.05); else if (vCab > 0.5) diffuseColor.rgb = vFlor * 0.9;' : 'diffuseColor.rgb *= 0.78 + 0.5 * vRajada * (0.2 + uWind);'}`)
    .replace('#include <normal_fragment_begin>', semInverter());
}

export function criarCapim(campo: Campo, total: number, flores: number) {
  const grupo = new THREE.Group();
  const mk = (geo: THREE.BufferGeometry, n: number, janela: number, flor: boolean, seed: number) => {
    const g = geo.clone();
    const ig = new THREE.InstancedBufferGeometry(); ig.copy(g as unknown as THREE.InstancedBufferGeometry);
    const r = aleatorio(seed);
    const dados = new Float32Array(n * 4);
    for (let i = 0; i < n * 4; i++) dados[i] = r();
    ig.setAttribute('aRand', new THREE.InstancedBufferAttribute(dados, 4));
    ig.instanceCount = n;
    const m = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.95, metalness: 0 });
    m.onBeforeCompile = (sh) => injetarCampo(sh, campo, janela, flor);
    const mesh = new THREE.Mesh(ig, m);
    mesh.frustumCulled = false; mesh.receiveShadow = false; mesh.castShadow = false;
    grupo.add(mesh);
    return mesh;
  };
  const tufo = geometriaTufo();
  mk(tufo, Math.round(total * 0.42), 34, false, 91);
  mk(tufo, Math.round(total * 0.58), 105, false, 92);
  const flor = geometriaFlor();
  mk(flor, Math.round(flores * 0.55), 40, true, 93);
  mk(flor, Math.round(flores * 0.45), 110, true, 94);
  return { grupo };
}

/* ------------------------------------------------------------------ pedras */

export function criarPedras(campo: Campo, quantidade: number, sombra: boolean) {
  const grupo = new THREE.Group();
  const r = aleatorio(555);
  const geos: THREE.BufferGeometry[] = [];
  for (let v = 0; v < 3; v++) {
    const g = new THREE.IcosahedronGeometry(1, 3);
    const p = g.attributes.position;
    const col: number[] = [];
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const n = 1 + 0.32 * fbm(x * 1.4 + v * 7, z * 1.4 + y, 3) + 0.12 * fbm(x * 4 + y * 3, z * 4, 2);
      p.setXYZ(i, x * n * (1.1 + v * 0.1), y * n * 0.62, z * n);
      const sombra = 0.7 + 0.5 * fbm(x * 3 + v, y * 3, 2);
      const mus = Math.max(0, fbm(x * 2, z * 2 + 4, 2)) * 0.25;
      col.push(0.5 * sombra + mus * 0.2, 0.48 * sombra + mus, 0.45 * sombra);
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    g.computeVertexNormals();
    geos.push(g);
  }
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0 });
  const por: THREE.Matrix4[][] = [[], [], []];
  let tent = 0, feitos = 0;
  while (feitos < quantidade && tent < quantidade * 40) {
    tent++;
    const x = (r() * 2 - 1) * 640, z = (r() * 2 - 1) * 640;
    const h = campo.h(x, z);
    const perto = suave(2.5, 0.2, h) * 0.9 + suave(30, 120, h) * 0.5 + campo.declive(x, z) * 1.2;
    if (r() > perto * 0.7) continue;
    if (h < -0.4) continue;
    const s = 0.35 + Math.pow(r(), 2.2) * 2.4 * (1 + suave(40, 140, h) * 1.6);
    const m = new THREE.Matrix4().compose(new THREE.Vector3(x, h + s * 0.08, z), new THREE.Quaternion().setFromEuler(new THREE.Euler((r() - 0.5) * 0.4, r() * 6.28, (r() - 0.5) * 0.4)), new THREE.Vector3(s, s * (0.8 + r() * 0.5), s));
    por[Math.floor(r() * 3)].push(m);
    feitos++;
  }
  geos.forEach((g, i) => {
    if (!por[i].length) return;
    const im = new THREE.InstancedMesh(g, mat, por[i].length);
    por[i].forEach((m, k) => im.setMatrixAt(k, m));
    im.castShadow = sombra; im.receiveShadow = false; im.frustumCulled = false;
    grupo.add(im);
  });
  return { grupo };
}

/* ------------------------------------------------------------------ juncos na margem (balançam com o vento e com as ondas) */

export function criarJuncos(campo: Campo, quantidade: number) {
  const r = aleatorio(777);
  const pos: number[] = [], nor: number[] = [], col: number[] = [], sw: number[] = [], fl: number[] = [], idx: number[] = [];
  const H = 2.2;
  for (let b = 0; b < 7; b++) {
    const a = r() * Math.PI, ca = Math.cos(a), sa = Math.sin(a);
    const h = H * (0.55 + r() * 0.45);
    const cx = (r() - 0.5) * 0.5, cz = (r() - 0.5) * 0.5;
    const dobra = (r() - 0.5) * 0.35;
    const seg = 5, base = pos.length / 3;
    for (let i = 0; i <= seg; i++) {
      const t = i / seg, w = 0.035 * (1 - t * 0.85);
      const y = t * h, bx = dobra * t * t * h;
      for (const lado of [-1, 1]) {
        pos.push(cx + bx * -sa + lado * w * ca, y, cz + bx * ca + lado * w * sa);
        nor.push(0, 0.9, 0.3);
        const k = 0.45 + 0.55 * t;
        col.push(0.5 * k + 0.12, 0.7 * k + 0.1, 0.22 * k);
        sw.push(y / H); fl.push(0.1);
      }
    }
    for (let i = 0; i < seg; i++) { const q = base + i * 2; idx.push(q, q + 1, q + 2, q + 1, q + 3, q + 2); }
    if (b % 3 === 0) { // espiga marrom (taboa)
      const topoY = h * 0.78, radial = 6, bb = pos.length / 3;
      for (let k = 0; k < 2; k++) for (let j = 0; j <= radial; j++) {
        const an = (j / radial) * Math.PI * 2, y = topoY + k * 0.34;
        const px = cx + dobra * 0.6 * -sa * 0.0 + Math.cos(an) * 0.05, pz = cz + Math.sin(an) * 0.05;
        pos.push(px, y, pz); nor.push(Math.cos(an), 0, Math.sin(an)); col.push(0.28, 0.16, 0.08); sw.push(y / H); fl.push(0.1);
      }
      for (let j = 0; j < radial; j++) { const q = bb + j; idx.push(q, q + radial + 1, q + 1, q + 1, q + radial + 1, q + radial + 2); }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setAttribute('aSway', new THREE.Float32BufferAttribute(sw, 1));
  g.setAttribute('aFlut', new THREE.Float32BufferAttribute(fl, 1));
  g.setIndex(idx);
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.9 });
  mat.onBeforeCompile = (sh) => injetarVento(sh, false);
  const mats: THREE.Matrix4[] = [];
  let tent = 0;
  while (mats.length < quantidade && tent < quantidade * 60) {
    tent++;
    const x = (r() * 2 - 1) * 330, z = -70 + (r() * 2 - 1) * 260;
    const h = campo.h(x, z);
    if (h > 0.55 || h < -1.0) continue;
    if (fbm(x * 0.03 + 3, z * 0.03 - 8, 2) < -0.05 && r() > 0.12) continue;
    const s = 0.6 + r() * 0.7;
    mats.push(new THREE.Matrix4().compose(new THREE.Vector3(x, h - 0.1, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), r() * 6.28), new THREE.Vector3(s, s, s)));
  }
  const im = new THREE.InstancedMesh(g, mat, Math.max(1, mats.length));
  mats.forEach((m, k) => im.setMatrixAt(k, m));
  im.frustumCulled = false;
  return { malha: im };
}

export { limitar };
