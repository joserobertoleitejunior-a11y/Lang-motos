import * as THREE from 'three';
import { limitar } from './ruido';
import { GLSL_VENTO, U } from './vento';
import { MEIA, NIVEL_AGUA, type Campo } from './terreno';

/* ------------------------------------------------------------------ ondas (a mesma conta na GPU e na CPU) */

const NW = 6;
const FR = [1, 0.66, 0.44, 0.29, 0.19, 0.125];
const ESPALHA = [0, 0.28, -0.34, 0.62, -0.78, 1.15];
const AMPL = [1, 0.8, 0.62, 0.42, 0.3, 0.2];

export const ondas = {
  dados: new Float32Array(NW * 4), // dirx, dirz, amplitude, k
  w: new Float32Array(NW),
  steep: 0.72,
  tempo: 0,
};

/** Recalcula as ondas a partir do vento: mais vento = ondas maiores, mais longas e mais íngremes. */
export function atualizarOndas(vento01: number, angulo: number) {
  const ms = 0.6 + vento01 * 13.5;
  const Lmax = limitar(2.4 + ms * 1.7, 2.6, 27);
  const Amax = 0.012 + 0.021 * ms;
  for (let i = 0; i < NW; i++) {
    const L = Lmax * FR[i];
    const k = (Math.PI * 2) / L;
    const a = angulo + ESPALHA[i] * (0.45 + 0.55 * vento01);
    ondas.dados[i * 4] = Math.cos(a);
    ondas.dados[i * 4 + 1] = Math.sin(a);
    ondas.dados[i * 4 + 2] = Amax * AMPL[i];
    ondas.dados[i * 4 + 3] = k;
    ondas.w[i] = Math.sqrt(9.81 * k);
  }
  ondas.steep = 0.55 + 0.35 * vento01;
}

/** Altura da superfície da água em (x,z): é por aqui que patos e peixes "respeitam as ondas". */
export function alturaAgua(x: number, z: number, t = ondas.tempo): number {
  let px = x, pz = z;
  for (let it = 0; it < 2; it++) {
    let dx = 0, dz = 0;
    for (let i = 0; i < NW; i++) {
      const d0 = ondas.dados[i * 4], d1 = ondas.dados[i * 4 + 1], A = ondas.dados[i * 4 + 2], k = ondas.dados[i * 4 + 3];
      const Q = limitar(ondas.steep / (k * A * NW + 1e-4), 0, 1);
      const f = k * (d0 * px + d1 * pz) - ondas.w[i] * t;
      const c = Math.cos(f) * Q * A;
      dx += d0 * c; dz += d1 * c;
    }
    px = x - dx; pz = z - dz;
  }
  let y = 0;
  for (let i = 0; i < NW; i++) {
    const d0 = ondas.dados[i * 4], d1 = ondas.dados[i * 4 + 1], A = ondas.dados[i * 4 + 2], k = ondas.dados[i * 4 + 3];
    y += A * Math.sin(k * (d0 * px + d1 * pz) - ondas.w[i] * t);
  }
  return NIVEL_AGUA + y;
}

export function normalAgua(x: number, z: number, out = new THREE.Vector3()): THREE.Vector3 {
  const e = 0.6;
  const hx = alturaAgua(x + e, z) - alturaAgua(x - e, z);
  const hz = alturaAgua(x, z + e) - alturaAgua(x, z - e);
  return out.set(-hx / (2 * e), 1, -hz / (2 * e)).normalize();
}

/* ------------------------------------------------------------------ malha em anéis, centrada na câmera */

function geometriaDisco(): THREE.BufferGeometry {
  const radios: number[] = [0];
  for (let i = 1; i <= 64; i++) radios.push(i * 0.9);
  const r0 = radios[radios.length - 1];
  const Rmax = 2200, passos = 84;
  for (let i = 1; i <= passos; i++) radios.push(r0 * Math.pow(Rmax / r0, i / passos));
  const seg = 288;
  const pos: number[] = [];
  for (let i = 0; i < radios.length; i++) for (let s = 0; s <= seg; s++) { const a = (s / seg) * Math.PI * 2; pos.push(Math.cos(a) * radios[i], 0, Math.sin(a) * radios[i]); }
  const idx: number[] = [];
  for (let i = 0; i < radios.length - 1; i++) for (let s = 0; s < seg; s++) {
    const a = i * (seg + 1) + s, b = a + 1, c = a + seg + 1, d = c + 1;
    idx.push(a, b, c, b, d, c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  return g;
}

const VERT = /* glsl */ `
uniform float uTime; uniform vec4 uOnda[6]; uniform float uOndaW[6]; uniform float uSteep; uniform vec3 uCam; uniform mat4 uTexMat;
varying vec3 vWorld; varying vec3 vNorm; varying vec4 vRefl; varying float vJac; varying float vFogDepth;
void main(){
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vec2 p = wp.xz;
  float lod = smoothstep(220.0, 900.0, length(p - uCam.xz));
  vec3 disp = vec3(0.0); vec3 N = vec3(0.0, 1.0, 0.0); float jac = 1.0;
  for (int i = 0; i < 6; i++) {
    vec2 d = uOnda[i].xy; float A = uOnda[i].z; float k = uOnda[i].w;
    float att = 1.0 - lod * smoothstep(0.35, 1.1, k);
    A *= att;
    float Q = clamp(uSteep / (k*A*6.0 + 1e-4), 0.0, 1.0);
    float f = k * dot(d, p) - uOndaW[i] * uTime;
    float c = cos(f), s = sin(f);
    disp.xz += Q * A * d * c; disp.y += A * s;
    N.xz -= d * k * A * c; N.y -= Q * k * A * s;
    jac -= Q * k * A * s;
  }
  wp.xyz += disp;
  vWorld = wp.xyz; vNorm = normalize(N); vJac = jac;
  vRefl = uTexMat * wp;
  vec4 mv = viewMatrix * wp;
  vFogDepth = -mv.z;
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
${GLSL_VENTO}
uniform sampler2D uRefl; uniform sampler2D uAlt; uniform float uMeia; uniform vec3 uSunDir; uniform vec3 uSunCol; uniform vec3 uCam;
uniform vec3 uRaso; uniform vec3 uFundo; uniform float uLuz; uniform vec3 uCeu;
uniform vec4 uRip[8]; uniform float uDebug;
uniform vec3 fogColor; uniform float fogDensity;
varying vec3 vWorld; varying vec3 vNorm; varying vec4 vRefl; varying float vJac; varying float vFogDepth;
void main(){
  vec3 V = normalize(uCam - vWorld);
  vec2 q = vWorld.xz;
  float amp = mix(0.05, 0.42, uWind);
  vec2 g1 = vgrad(q*0.85 + uWindDir*uTime*0.9);
  vec2 g2 = vgrad(q*2.6 - uWindDir*uTime*1.4 + 4.0);
  vec2 g3 = vgrad(q*7.0 + uWindDir*uTime*2.2 + 9.0);
  float distF = 1.0/(1.0 + length(uCam - vWorld)*0.004);
  vec3 N = vNorm;
  N.xz += (g1*0.55 + g2*0.28 + g3*0.12*distF) * amp;
  // ondulações (peixes pulando, patos, toques)
  for (int i = 0; i < 8; i++) {
    float age = uTime - uRip[i].z;
    if (age > 0.0 && age < 7.0 && uRip[i].w > 0.0) {
      vec2 dq = q - uRip[i].xy; float r = length(dq) + 1e-3;
      float front = age * 2.4;
      float env = exp(-age*0.55) * exp(-abs(r-front)*0.55) * uRip[i].w;
      float ph = (r - front) * 4.8;
      N.xz += (dq / r) * cos(ph) * env * 0.5;
    }
  }
  N = normalize(N);
  float cosT = clamp(dot(N, V), 0.0, 1.0);
  float F = 0.02 + 0.98 * pow(1.0 - cosT, 5.0);
  // reflexo (espelho do mundo, distorcido pelas ondas)
  vec2 ruv = vRefl.xy / vRefl.w + N.xz * (0.03 + 0.025*uWind);
  vec3 refl = texture2D(uRefl, ruv).rgb;
  // profundidade: lê a altura do fundo do lago
  vec2 uvT = (vWorld.xz + uMeia) / (2.0*uMeia);
  float hT = texture2D(uAlt, clamp(uvT, 0.001, 0.999)).r;
  float depth = max(vWorld.y - hT, 0.0);
  float T = exp(-depth * 1.15 / max(V.y, 0.18));
  if (uDebug > 0.5) { gl_FragColor = vec4(depth*0.1, hT*0.1+0.5, F, 1.0); return; }
  vec3 corpo = mix(uRaso, uFundo, 1.0 - exp(-depth*0.38)) * uLuz;
  corpo += uCeu * 0.05 * (1.0 - T);
  float A = 1.0 - T * (1.0 - F);
  // brilho do sol
  vec3 H = normalize(V + uSunDir);
  float nh = max(dot(N, H), 0.0);
  vec3 spec = uSunCol * (pow(nh, 900.0) * 6.0 + pow(nh, 110.0) * 0.35) * (1.0 - T*0.0);
  vec3 C = (corpo * (1.0 - T) * (1.0 - F) + refl * F + spec) / max(A, 0.001);
  // espuma: na margem e nas cristas, mais com vento forte
  float nz = vfbm(q*0.9 + uWindDir*uTime*0.35) ;
  float margem = smoothstep(0.65, 0.0, depth + nz*0.35 - 0.12) * (0.55 + 0.45*sin(depth*13.0 - uTime*1.3 + nz*7.0));
  float crista = smoothstep(0.78, 0.45, vJac) * smoothstep(0.10, 0.65, uWind) * smoothstep(0.35, 0.7, nz);
  float espuma = clamp(margem*0.85 + crista, 0.0, 1.0);
  vec3 espC = vec3(0.92, 0.95, 0.97) * (0.25 + 0.75*uLuz) + uSunCol*0.04;
  C = mix(C, espC, espuma);
  A = max(A, espuma * 0.92);
  gl_FragColor = vec4(C, A);
  float fd = fogDensity * vFogDepth; float fogF = 1.0 - exp(-fd*fd);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, clamp(fogF, 0.0, 1.0));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export type Agua = ReturnType<typeof criarAgua>;

export function criarAgua(scene: THREE.Scene, renderer: THREE.WebGLRenderer, campo: Campo, escalaReflexo: number) {
  const rt = new THREE.WebGLRenderTarget(512, 288, { type: THREE.HalfFloatType, depthBuffer: true, samples: 0 });
  rt.texture.minFilter = THREE.LinearFilter; rt.texture.magFilter = THREE.LinearFilter; rt.texture.generateMipmaps = false;
  const rip = Array.from({ length: 8 }, () => new THREE.Vector4(0, 0, -100, 0));
  const texMat = new THREE.Matrix4();
  const uniforms = {
    uTime: U.uTime, uWindDir: U.uWindDir, uWind: U.uWind, uWindMs: U.uWindMs,
    uOnda: { value: Array.from({ length: NW }, () => new THREE.Vector4()) }, uOndaW: { value: Array.from({ length: NW }, () => 0) }, uSteep: { value: 0.7 },
    uCam: U.uCam, uTexMat: { value: texMat }, uRefl: { value: rt.texture }, uAlt: { value: campo.textura }, uMeia: { value: MEIA },
    uSunDir: U.uSun, uSunCol: { value: new THREE.Color(1, 1, 1) },
    uRaso: { value: new THREE.Color(0.07, 0.34, 0.33) }, uFundo: { value: new THREE.Color(0.012, 0.075, 0.12) }, uLuz: { value: 1 }, uCeu: { value: new THREE.Color(0.5, 0.7, 1) },
    uRip: { value: rip }, uDebug: { value: 0 },
    fogColor: { value: new THREE.Color(0xa9c7e6) }, fogDensity: { value: 0.0012 },
  };
  const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false });
  const malha = new THREE.Mesh(geometriaDisco(), mat);
  malha.frustumCulled = false; malha.renderOrder = 5;
  scene.add(malha);

  /* câmera virtual espelhada (técnica do "Reflector") */
  const espelho = new THREE.PerspectiveCamera();
  espelho.layers.enableAll();
  const plano = new THREE.Plane(new THREE.Vector3(0, 1, 0), -NIVEL_AGUA);
  const refPos = new THREE.Vector3(0, NIVEL_AGUA, 0), camPos = new THREE.Vector3(), rot = new THREE.Matrix4(), olhar = new THREE.Vector3(), alvo = new THREE.Vector3(), vista = new THREE.Vector3();
  const normal = new THREE.Vector3(0, 1, 0), clip = new THREE.Vector4(), q = new THREE.Vector4(), planoCam = new THREE.Plane();
  const ocultos: THREE.Object3D[] = [];
  let ripIdx = 0;

  function ondular(x: number, z: number, forca = 1) {
    rip[ripIdx].set(x, z, U.uTime.value, forca);
    ripIdx = (ripIdx + 1) % rip.length;
  }

  function ocultarNoReflexo(o: THREE.Object3D) { ocultos.push(o); }

  function atualizar(camera: THREE.PerspectiveCamera, sol: THREE.DirectionalLight, ceuCor: THREE.Color, luz: number, fog: THREE.FogExp2, cenaTempo: number) {
    ondas.tempo = cenaTempo;
    for (let i = 0; i < NW; i++) {
      (uniforms.uOnda.value[i] as THREE.Vector4).set(ondas.dados[i * 4], ondas.dados[i * 4 + 1], ondas.dados[i * 4 + 2], ondas.dados[i * 4 + 3]);
      uniforms.uOndaW.value[i] = ondas.w[i];
    }
    uniforms.uSteep.value = ondas.steep;
    malha.position.set(Math.round(camera.position.x / 2) * 2, 0, Math.round(camera.position.z / 2) * 2);
    uniforms.uSunCol.value.copy(sol.color).multiplyScalar(sol.intensity * 0.55);
    uniforms.uLuz.value = luz;
    uniforms.uCeu.value.copy(ceuCor);
    uniforms.fogColor.value.copy(fog.color); uniforms.fogDensity.value = fog.density;
  }

  function renderReflexo(camera: THREE.PerspectiveCamera, cena: THREE.Scene) {
    camPos.setFromMatrixPosition(camera.matrixWorld);
    rot.extractRotation(camera.matrixWorld);
    vista.subVectors(refPos, camPos);
    if (vista.dot(normal) > 0) return; // câmera debaixo d'água: sem reflexo
    vista.reflect(normal).negate().add(refPos);
    olhar.set(0, 0, -1).applyMatrix4(rot).add(camPos);
    alvo.subVectors(refPos, olhar).reflect(normal).negate().add(refPos);
    espelho.position.copy(vista);
    espelho.up.set(0, 1, 0).applyMatrix4(rot).reflect(normal);
    espelho.lookAt(alvo);
    espelho.far = camera.far; espelho.near = camera.near; espelho.fov = camera.fov; espelho.aspect = camera.aspect;
    espelho.updateMatrixWorld(); espelho.updateProjectionMatrix();
    espelho.projectionMatrix.copy(camera.projectionMatrix);
    espelho.matrixWorldInverse.copy(espelho.matrixWorld).invert();
    texMat.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    texMat.multiply(espelho.projectionMatrix).multiply(espelho.matrixWorldInverse);
    // plano de corte oblíquo: não desenha nada que esteja abaixo da água
    plano.setFromNormalAndCoplanarPoint(normal, refPos);
    planoCam.copy(plano).applyMatrix4(espelho.matrixWorldInverse);
    clip.set(planoCam.normal.x, planoCam.normal.y, planoCam.normal.z, planoCam.constant);
    const P = espelho.projectionMatrix;
    q.x = (Math.sign(clip.x) + P.elements[8]) / P.elements[0];
    q.y = (Math.sign(clip.y) + P.elements[9]) / P.elements[5];
    q.z = -1.0;
    q.w = (1.0 + P.elements[10]) / P.elements[14];
    clip.multiplyScalar(2.0 / clip.dot(q));
    P.elements[2] = clip.x; P.elements[6] = clip.y; P.elements[10] = clip.z + 1.0 - 0.003; P.elements[14] = clip.w;

    const w = Math.max(64, Math.floor(renderer.domElement.width * escalaReflexo)), h = Math.max(64, Math.floor(renderer.domElement.height * escalaReflexo));
    if (rt.width !== w || rt.height !== h) rt.setSize(w, h);
    malha.visible = false;
    ocultos.forEach((o) => (o.visible = false));
    const sombra = renderer.shadowMap.autoUpdate;
    renderer.shadowMap.autoUpdate = false;
    const luzesAnt = renderer.getRenderTarget();
    renderer.setRenderTarget(rt);
    renderer.clear();
    renderer.render(cena, espelho);
    renderer.setRenderTarget(luzesAnt);
    renderer.shadowMap.autoUpdate = sombra;
    ocultos.forEach((o) => (o.visible = true));
    malha.visible = true;
  }

  return { malha, atualizar, renderReflexo, ondular, ocultarNoReflexo, uniforms };
}
