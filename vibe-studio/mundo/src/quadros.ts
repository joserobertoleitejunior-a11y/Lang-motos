import * as THREE from 'three';
import { type Projeto } from './config';
import { U, mundo } from './vento';
import { type Campo, INICIO } from './terreno';

export const LARG = 18;
export const ALT = 11.25;

export type Quadro = {
  projeto: Projeto; grupo: THREE.Group; tela: THREE.Mesh; base: THREE.Vector3; yaw: number; fase: number; brilho: number; alvoBrilho: number; indice: number; luz: THREE.Sprite;
  posicaoVisita(distancia?: number): { pos: THREE.Vector3; alvo: THREE.Vector3 };
};

const GLSL_TELA = {
  vert: /* glsl */ `varying vec2 vUv; varying float vProf; void main(){ vUv = uv; vec4 mv = modelViewMatrix*vec4(position,1.0); vProf = -mv.z; gl_Position = projectionMatrix*mv; }`,
  frag: /* glsl */ `
    uniform sampler2D uMapa; uniform float uBrilho; uniform float uTime; uniform float uNoite;
    uniform float uAscii; uniform float uBoost; uniform sampler2D uProf; uniform vec2 uRes; uniform float uNear; uniform float uFar;
    varying vec2 vUv; varying float vProf;
    float linear(float d){ float z = d*2.0-1.0; return 2.0*uNear*uFar/(uFar+uNear - z*(uFar-uNear)); }
    void main(){
      vec3 c = texture2D(uMapa, vUv).rgb;
      float varre = smoothstep(0.0, 0.04, abs(fract(vUv.y*1.0 - uTime*0.35) - 0.5) - 0.46) * uBrilho * 0.0;
      c *= 1.0 + uBrilho*0.22 + uBoost*0.9;
      vec2 b = abs(vUv-0.5)*2.0; float vig = 1.0 - 0.18*pow(max(b.x,b.y), 3.0);
      c *= vig;
      c += vec3(0.01,0.02,0.04)*uNoite;
      gl_FragColor = vec4(c + varre, 1.0);
      #include <colorspace_fragment>
    }`,
};

function texturaPlaca(titulo: string, tag: string, cor: string): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 140;
  const g = c.getContext('2d')!;
  g.fillStyle = 'rgba(8,12,24,0.88)'; g.beginPath(); g.roundRect(4, 4, 1016, 132, 26); g.fill();
  g.strokeStyle = cor; g.lineWidth = 4; g.beginPath(); g.roundRect(4, 4, 1016, 132, 26); g.stroke();
  g.fillStyle = '#f4f7ff'; g.font = '700 58px "Space Grotesk", Inter, system-ui, sans-serif'; g.textBaseline = 'middle';
  g.fillText(titulo.length > 22 ? titulo.slice(0, 21) + '…' : titulo, 36, 56);
  g.fillStyle = cor; g.font = '600 34px "JetBrains Mono", ui-monospace, monospace';
  g.fillText(tag.toUpperCase(), 36, 106);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

function texturaBrilho(cor: THREE.Color): THREE.CanvasTexture {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const gr = g.createRadialGradient(64, 64, 6, 64, 64, 64);
  const rgb = `${Math.round(cor.r * 255)},${Math.round(cor.g * 255)},${Math.round(cor.b * 255)}`;
  gr.addColorStop(0, `rgba(${rgb},0.55)`); gr.addColorStop(0.5, `rgba(${rgb},0.16)`); gr.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export function criarQuadros(campo: Campo, projetos: Projeto[], imagens: Record<string, string>) {
  const grupo = new THREE.Group();
  const quadros: Quadro[] = [];
  const unif = {
    uTime: U.uTime, uNoite: { value: 0 }, uAscii: { value: 0 }, uProf: { value: null as THREE.Texture | null }, uRes: { value: new THREE.Vector2(1, 1) }, uNear: { value: 0.3 }, uFar: { value: 9000 },
  };
  const n = projetos.length;
  // corredor sem paredes: os quadros ficam dos dois lados de uma "passarela" imaginária, virados para o centro
  const X0 = INICIO.x, Z0 = INICIO.z - 58, ESPACO = 30, LARGURA = 17;
  projetos.forEach((p, i) => {
    const k = Math.floor(i / 2), lado = i % 2 === 0 ? -1 : 1;
    const x = X0 + lado * LARGURA, z = Z0 - k * ESPACO;
    const base = new THREE.Vector3(x, Math.max(campo.h(x, z), 0) + 10.5 + (k % 2) * 3 + (lado > 0 ? 1.2 : 0), z);
    const yaw = lado < 0 ? Math.PI / 2 - 0.5 : -Math.PI / 2 + 0.5;
    const g = new THREE.Group(); g.position.copy(base); g.rotation.y = yaw;
    const cor = new THREE.Color(p.cor);

    // imagem do projeto
    const tex = new THREE.Texture(); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
    const im = new Image(); im.onload = () => { tex.image = im; tex.needsUpdate = true; }; im.src = imagens[p.imagem] ?? '';
    const matTela = new THREE.ShaderMaterial({ uniforms: { ...unif, uMapa: { value: tex }, uBrilho: { value: 0 }, uBoost: { value: 0 } }, vertexShader: GLSL_TELA.vert, fragmentShader: GLSL_TELA.frag, toneMapped: false, side: THREE.FrontSide });
    const tela = new THREE.Mesh(new THREE.PlaneGeometry(LARG, ALT), matTela);
    tela.position.z = 0.36;
    tela.userData.quadroIdx = i;
    g.add(tela);

    // moldura: metal escuro com um fio de luz da cor do projeto
    const moldura = new THREE.Mesh(new THREE.BoxGeometry(LARG + 1.1, ALT + 1.1, 0.7), new THREE.MeshStandardMaterial({ color: 0x0c1226, metalness: 0.7, roughness: 0.32 }));
    g.add(moldura);
    const fio = new THREE.Mesh(new THREE.BoxGeometry(LARG + 1.5, ALT + 1.5, 0.3), new THREE.MeshStandardMaterial({ color: cor, emissive: cor, emissiveIntensity: 1.6, roughness: 0.4 }));
    fio.position.z = -0.12; g.add(fio);
    // placa com o nome
    const placa = new THREE.Mesh(new THREE.PlaneGeometry(LARG * 0.62, LARG * 0.62 * 140 / 1024), new THREE.MeshBasicMaterial({ map: texturaPlaca(p.titulo, p.tag, p.cor), transparent: true, toneMapped: false }));
    placa.position.set(0, -ALT / 2 - 1.9, 0.4); placa.userData.quadroIdx = i; g.add(placa);
    // brilho suave atrás
    const luz = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaBrilho(cor), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false, fog: false }));
    luz.scale.set(LARG * 2.2, ALT * 2.3, 1); luz.position.z = -1.2; g.add(luz);

    g.traverse((o) => o.layers.set(2));
    luz.layers.set(1);
    grupo.add(g);
    quadros.push({
      projeto: p, grupo: g, tela, base, yaw, fase: i * 1.7, brilho: 0, alvoBrilho: 0, indice: i, luz,
      posicaoVisita(distancia = 25) {
        const f = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
        const pos = base.clone().addScaledVector(f, distancia); pos.y = base.y - 1.5;
        return { pos, alvo: base.clone() };
      },
    });
  });

  const alvos = quadros.map((q) => q.tela);
  function atualizar(t: number, noite: number) {
    unif.uNoite.value = noite;
    const v = mundo.ventoSuave;
    for (const q of quadros) {
      const bob = Math.sin(t * 0.55 + q.fase) * (0.35 + v * 0.7) + Math.sin(t * 1.3 + q.fase * 2) * 0.1 * v;
      q.grupo.position.set(q.base.x, q.base.y + bob, q.base.z);
      q.grupo.rotation.y = q.yaw + Math.sin(t * 0.4 + q.fase) * (0.012 + 0.05 * v) + U.uWindDir.value.x * 0.0;
      q.grupo.rotation.z = Math.sin(t * 0.7 + q.fase * 1.3) * (0.004 + 0.02 * v);
      q.grupo.rotation.x = Math.sin(t * 0.5 + q.fase) * (0.003 + 0.012 * v);
      q.brilho += (q.alvoBrilho - q.brilho) * 0.14;
      (q.tela.material as THREE.ShaderMaterial).uniforms.uBrilho.value = q.brilho;
      const s = 1 + q.brilho * 0.035; q.grupo.scale.setScalar(s);
      q.luz.material.opacity = (0.6 + 0.4 * noite + q.brilho * 0.5);
    }
  }
  return { grupo, quadros, alvos, atualizar, unif };
}
