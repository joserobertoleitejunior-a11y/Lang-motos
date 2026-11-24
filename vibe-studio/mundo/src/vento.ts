import { Vector2, Vector3 } from 'three';

/** Uniformes compartilhados: o MESMO vento move árvores, capim, água, nuvens e partículas. */
export const U = {
  uTime: { value: 0 },
  uWindDir: { value: new Vector2(0.8, 0.6).normalize() },
  uWind: { value: 0.4 }, // 0..1
  uWindMs: { value: 5 }, // m/s
  uSun: { value: new Vector3(0.3, 0.8, 0.3) },
  uCam: { value: new Vector3() },
};

export const mundo = {
  vento: 0.4, // alvo (controle do usuário)
  ventoSuave: 0.4,
  angulo: 0.6, // direção para onde o vento sopra (rad)
  hora: 10.6,
  autoHora: false,
  tempo: 0,
};

export function atualizarVento(dt: number) {
  mundo.tempo += dt;
  mundo.ventoSuave += (mundo.vento - mundo.ventoSuave) * Math.min(1, dt * 0.8);
  // a direção muda devagar, como no mundo real
  mundo.angulo += Math.sin(mundo.tempo * 0.05) * dt * 0.02;
  const ms = 0.6 + mundo.ventoSuave * 13.5;
  U.uWind.value = mundo.ventoSuave;
  U.uWindMs.value = ms;
  U.uWindDir.value.set(Math.cos(mundo.angulo), Math.sin(mundo.angulo));
  U.uTime.value = mundo.tempo;
}

/** Funções GLSL de ruído e rajada de vento (campo de rajadas que corre pelo terreno). */
export const GLSL_VENTO = /* glsl */ `
uniform float uTime; uniform vec2 uWindDir; uniform float uWind; uniform float uWindMs;
float vh21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float vn(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(vh21(i),vh21(i+vec2(1,0)),f.x), mix(vh21(i+vec2(0,1)),vh21(i+vec2(1,1)),f.x), f.y); }
float vfbm(vec2 p){ float a=0.5, s=0.0; for(int i=0;i<4;i++){ s+=a*vn(p); p=p*2.03+17.1; a*=0.5; } return s; }
vec2 vgrad(vec2 p){ float e=0.07; return vec2(vn(p+vec2(e,0.))-vn(p-vec2(e,0.)), vn(p+vec2(0.,e))-vn(p-vec2(0.,e)))/(2.*e); }
float rajada(vec2 p){
  vec2 q = p - uWindDir * uTime * (1.5 + uWindMs * 0.9);
  return 0.55*vn(q*0.018) + 0.32*vn(q*0.06+7.1) + 0.13*vn(q*0.22+3.3);
}
`;
