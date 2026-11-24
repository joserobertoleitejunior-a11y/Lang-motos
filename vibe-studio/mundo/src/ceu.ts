import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { aleatorio, limitar, misturar, suave } from './ruido';
import { GLSL_VENTO, U, mundo } from './vento';

const C = (hex: number) => new THREE.Color(hex);

/** Direção do sol pela hora (6h nasce a leste, 12h no alto, 18h se põe a oeste). */
export function direcaoSol(hora: number, out = new THREE.Vector3()) {
  const ang = ((hora - 6) / 12) * Math.PI;
  return out.set(Math.cos(ang), Math.sin(ang) * 0.93, Math.sin(ang) * 0.38).normalize();
}

export type Ceu = ReturnType<typeof criarCeu>;

export function criarCeu(scene: THREE.Scene, renderer: THREE.WebGLRenderer, nuvens: boolean) {
  const sky = new Sky();
  sky.scale.setScalar(5200);
  sky.renderOrder = -10;
  scene.add(sky);
  const su = sky.material.uniforms;
  su.turbidity.value = 3.2; su.rayleigh.value = 1.6; su.mieCoefficient.value = 0.0045; su.mieDirectionalG.value = 0.82;

  const sol = new THREE.DirectionalLight(0xffffff, 3);
  sol.castShadow = false;
  scene.add(sol, sol.target);
  const lua = new THREE.DirectionalLight(0x8fa6ff, 0);
  scene.add(lua);
  const hemi = new THREE.HemisphereLight(0x9ec3ff, 0x39402a, 0.6);
  scene.add(hemi);
  scene.fog = new THREE.FogExp2(0xa9c7e6, 0.0011);

  /* estrelas, com a Via Láctea */
  const rnd = aleatorio(777);
  const N = 2600;
  const pos = new Float32Array(N * 3), tam = new Float32Array(N), fase = new Float32Array(N), cor = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    let x: number, y: number, z: number;
    if (i < 900) { // faixa da Via Láctea
      const a = rnd() * Math.PI * 2, e = (rnd() + rnd() + rnd() - 1.5) * 0.18;
      const v = new THREE.Vector3(Math.cos(a), e, Math.sin(a)).normalize();
      v.applyAxisAngle(new THREE.Vector3(1, 0, 0), 0.9);
      [x, y, z] = [v.x, v.y, v.z];
    } else {
      const u = rnd() * 2 - 1, a = rnd() * Math.PI * 2, r = Math.sqrt(1 - u * u);
      [x, y, z] = [r * Math.cos(a), u, r * Math.sin(a)];
    }
    pos.set([x * 4800, y * 4800, z * 4800], i * 3);
    tam[i] = i < 900 ? 0.6 + rnd() * 1.1 : 0.9 + Math.pow(rnd(), 4) * 2.6;
    fase[i] = rnd() * 6.28;
    const t = rnd();
    cor.set([0.75 + 0.25 * t, 0.82 + 0.1 * t, 1 - 0.25 * t], i * 3);
  }
  const gEst = new THREE.BufferGeometry();
  gEst.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  gEst.setAttribute('aTam', new THREE.BufferAttribute(tam, 1));
  gEst.setAttribute('aFase', new THREE.BufferAttribute(fase, 1));
  gEst.setAttribute('aCor', new THREE.BufferAttribute(cor, 3));
  const mEst = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    uniforms: { uNoite: { value: 0 }, uTime: U.uTime, uPx: { value: renderer.getPixelRatio() } },
    vertexShader: `attribute float aTam; attribute float aFase; attribute vec3 aCor; uniform float uTime; uniform float uPx; varying float vA; varying vec3 vC;
      void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*mv; gl_PointSize = aTam*uPx*(1.0+0.25*sin(uTime*1.6+aFase)); vA = 0.55+0.45*sin(uTime*2.1+aFase*3.0); vC = aCor; }`,
    fragmentShader: `uniform float uNoite; varying float vA; varying vec3 vC; void main(){ vec2 d = gl_PointCoord-0.5; float r = length(d); float a = smoothstep(0.5,0.0,r); gl_FragColor = vec4(vC, a*a*vA*uNoite); }`,
  });
  const estrelas = new THREE.Points(gEst, mEst);
  estrelas.frustumCulled = false; estrelas.renderOrder = -9;
  scene.add(estrelas);

  /* lua */
  const cv = document.createElement('canvas'); cv.width = cv.height = 256;
  const g = cv.getContext('2d')!;
  const halo = g.createRadialGradient(128, 128, 20, 128, 128, 128);
  halo.addColorStop(0, 'rgba(230,238,255,0.55)'); halo.addColorStop(0.35, 'rgba(180,200,255,0.18)'); halo.addColorStop(1, 'rgba(160,180,255,0)');
  g.fillStyle = halo; g.fillRect(0, 0, 256, 256);
  g.beginPath(); g.arc(128, 128, 46, 0, Math.PI * 2); g.fillStyle = '#eef2fb'; g.fill();
  g.globalCompositeOperation = 'source-atop';
  const mr = aleatorio(5);
  for (let i = 0; i < 22; i++) { g.beginPath(); g.arc(98 + mr() * 60, 98 + mr() * 60, 4 + mr() * 11, 0, 7); g.fillStyle = `rgba(150,160,185,${0.10 + mr() * 0.18})`; g.fill(); }
  const texLua = new THREE.CanvasTexture(cv); texLua.colorSpace = THREE.SRGBColorSpace;
  const luaSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texLua, transparent: true, depthWrite: false, fog: false, toneMapped: false }));
  luaSprite.scale.setScalar(1000); luaSprite.renderOrder = -8;
  scene.add(luaSprite);

  /* nuvens: cúpula com ruído que corre com o vento e é iluminada pelo sol */
  let domo: THREE.Mesh | null = null;
  if (nuvens) {
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.BackSide, fog: false,
      uniforms: { uTime: U.uTime, uWindDir: U.uWindDir, uWind: U.uWind, uWindMs: U.uWindMs, uSun: U.uSun, uCobertura: { value: 0.5 }, uLuz: { value: new THREE.Color(1, 1, 1) }, uSombra: { value: new THREE.Color(0.5, 0.55, 0.65) }, uNoite: { value: 0 } },
      vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); vec4 p = modelViewMatrix*vec4(position,1.0); gl_Position = projectionMatrix*p; }`,
      fragmentShader: `${GLSL_VENTO}
        varying vec3 vDir; uniform vec3 uSun; uniform float uCobertura; uniform vec3 uLuz; uniform vec3 uSombra; uniform float uNoite;
        float dens(vec2 uv){ vec2 w = uv + uWindDir*uTime*(0.006+uWind*0.02);
          float b = vfbm(w*1.6); float d = vfbm(w*4.5+b*1.5+3.0);
          return smoothstep(uCobertura, uCobertura+0.28, b*0.75+d*0.4); }
        void main(){
          vec3 d = normalize(vDir); if (d.y < 0.015) discard;
          vec2 uv = d.xz / (d.y*0.85 + 0.22);
          float c = dens(uv);
          if (c < 0.01) discard;
          vec2 su = normalize(uSun.xz+1e-4)*0.07;
          float c2 = dens(uv + su*1.0);
          float luz = clamp(1.0 - (c2 - c)*2.2 - c*0.35, 0.0, 1.0);
          float borda = clamp(1.0 - c, 0.0, 1.0);
          vec3 col = mix(uSombra, uLuz, luz) + uLuz*pow(borda, 3.0)*0.55*smoothstep(-0.1,0.4,uSun.y);
          col = mix(col, col*vec3(0.12,0.15,0.28)*1.2, uNoite);
          float fade = smoothstep(0.015, 0.2, d.y);
          gl_FragColor = vec4(col, c*fade*0.96);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    domo = new THREE.Mesh(new THREE.SphereGeometry(4600, 32, 16), mat);
    domo.renderOrder = -7; domo.frustumCulled = false;
    scene.add(domo);
  }

  const sd = new THREE.Vector3();
  const cA = new THREE.Color(), cB = new THREE.Color();

  function atualizar(centro: THREE.Vector3) {
    const hora = ((mundo.hora % 24) + 24) % 24;
    direcaoSol(hora, sd);
    const s = sd.y; // altura do sol: -1..1
    U.uSun.value.copy(sd);
    su.sunPosition.value.copy(sd);
    const dia = suave(-0.06, 0.2, s);
    const dourado = (1 - suave(0.0, 0.42, s)) * suave(-0.12, 0.03, s);
    su.turbidity.value = misturar(2.4, 7.5, dourado);
    su.rayleigh.value = misturar(0.9, 2.6, dourado) * (0.3 + 0.7 * dia) + 0.15;
    su.mieCoefficient.value = misturar(0.004, 0.012, dourado);

    // luz do sol: laranja ao nascer/pôr, branca ao meio-dia
    sol.position.copy(centro).addScaledVector(sd, 400);
    sol.target.position.copy(centro);
    sol.color.setRGB(1, 0.55, 0.28).lerp(cA.setRGB(1, 0.96, 0.9), suave(0.02, 0.5, s));
    sol.intensity = 3.4 * suave(-0.03, 0.2, s);
    // lua: o oposto do sol
    lua.position.copy(centro).addScaledVector(sd, -400);
    lua.intensity = 0.55 * suave(0.02, -0.2, s);
    luaSprite.position.copy(centro).addScaledVector(sd, -3600);
    luaSprite.material.opacity = suave(0.0, -0.18, s);

    // céu para o hemisfério e neblina: paleta por altura do sol
    const horizDia = cA.setRGB(0.66, 0.78, 0.92);
    const horizOuro = cB.setRGB(0.96, 0.62, 0.42);
    const horiz = new THREE.Color().copy(horizDia).lerp(horizOuro, dourado);
    const noite = new THREE.Color(0.018, 0.03, 0.07);
    horiz.lerp(noite, 1 - suave(-0.2, 0.0, s) * 1);
    horiz.lerp(new THREE.Color(0.30, 0.22, 0.34), suave(-0.2, -0.05, s) * (1 - suave(-0.05, 0.02, s)) * 0.5);
    (scene.fog as THREE.FogExp2).color.copy(horiz);
    (scene.fog as THREE.FogExp2).density = misturar(0.0012, 0.0021, dourado) * (1 + (1 - dia) * 0.2) * (1 + mundo.ventoSuave * 0.15);
    hemi.color.copy(horiz).lerp(new THREE.Color(0.55, 0.7, 1.0), 0.45 * dia);
    hemi.groundColor.setRGB(0.22, 0.26, 0.15).multiplyScalar(0.35 + 0.65 * dia);
    hemi.intensity = misturar(0.16, 0.62, dia);
    renderer.toneMappingExposure = misturar(0.95, 0.58, dia) * misturar(1.0, 1.1, dourado);

    mEst.uniforms.uNoite.value = suave(0.02, -0.28, s);
    if (domo) {
      const mu = (domo.material as THREE.ShaderMaterial).uniforms;
      mu.uCobertura.value = 0.62 - mundo.ventoSuave * 0.12;
      mu.uLuz.value.setRGB(1, 0.98, 0.95).lerp(cA.setRGB(1, 0.62, 0.38), dourado).multiplyScalar(0.5 + 0.9 * dia);
      mu.uSombra.value.setRGB(0.42, 0.5, 0.66).lerp(cA.setRGB(0.55, 0.38, 0.45), dourado).multiplyScalar(0.3 + 0.8 * dia);
      mu.uNoite.value = suave(0.0, -0.25, s);
    }
    sky.position.copy(centro);
    estrelas.position.copy(centro);
    domo?.position.copy(centro);
  }

  return { sky, sol, lua, hemi, atualizar, direcao: sd, horizonte: () => (scene.fog as THREE.FogExp2).color };
}
export { limitar };
