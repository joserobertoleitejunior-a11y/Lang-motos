import * as THREE from 'three';
import { aleatorio, fbm, limitar, misturar, suave } from './ruido';
import { U, mundo } from './vento';
import { type Campo, ILHA, INICIO, LAGO } from './terreno';
import { alturaAgua, normalAgua } from './agua';

/* ------------------------------------------------------------------ peças */

const cacheMat = new Map<string, THREE.MeshStandardMaterial>();
const mat = (cor: number, rugosidade = 0.9) => {
  const k = `${cor}-${rugosidade}`;
  if (!cacheMat.has(k)) cacheMat.set(k, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: rugosidade, metalness: 0, vertexColors: true }));
  return cacheMat.get(k)!;
};

/** Esfera achatada (elipsóide) com cor degradê do dorso para a barriga e variação de "pelo". */
function blob(rx: number, ry: number, rz: number, dorso: number, barriga: number, mat0: THREE.Material, seg = 14, semente = 1): THREE.Mesh {
  const g = new THREE.SphereGeometry(1, seg, Math.max(8, seg - 4));
  const p = g.attributes.position;
  const cd = new THREE.Color(dorso), cb = new THREE.Color(barriga), col: number[] = [];
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i), x = p.getX(i), z = p.getZ(i);
    const t = suave(-0.45, 0.55, y);
    const c = cb.clone().lerp(cd, t);
    const n = 0.88 + 0.24 * fbm(x * 3 + semente, z * 3 + y * 2, 2);
    col.push(c.r * n, c.g * n, c.b * n);
    p.setXYZ(i, x * rx, y * ry, z * rz);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat0);
  m.castShadow = true;
  return m;
}

function cilindro(r1: number, r2: number, comp: number, cor: number, rug = 0.9, seg = 7): THREE.Mesh {
  const g = new THREE.CylinderGeometry(r1, r2, comp, seg, 1);
  g.translate(0, -comp / 2, 0); // base no topo, desce em -Y
  const col: number[] = []; const c = new THREE.Color(cor);
  for (let i = 0; i < g.attributes.position.count; i++) col.push(c.r, c.g, c.b);
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const m = new THREE.Mesh(g, mat(cor, rug)); m.castShadow = true;
  return m;
}

function cone(r: number, h: number, cor: number, seg = 6): THREE.Mesh {
  const g = new THREE.ConeGeometry(r, h, seg);
  const col: number[] = []; const c = new THREE.Color(cor);
  for (let i = 0; i < g.attributes.position.count; i++) col.push(c.r, c.g, c.b);
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return new THREE.Mesh(g, mat(cor, 0.85));
}

const esfera = (r: number, cor: number, seg = 8) => blob(r, r, r, cor, cor, mat(cor, 0.4), seg);

function colocarNoChao(campo: Campo, obj: THREE.Object3D, x: number, z: number, yaw: number, suavizar = 1) {
  const h = campo.h(x, z);
  obj.position.set(x, h, z);
  const n = campo.normal(x, z);
  const alvo = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, yaw, 0)).multiply(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1, 0)));
  // inclina o corpo conforme o terreno, no referencial do bicho
  const local = n.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -yaw);
  const pitch = Math.atan2(-local.z, local.y) * 0.8, roll = Math.atan2(local.x, local.y) * 0.8;
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(pitch, yaw, roll, 'YXZ'));
  void alvo;
  obj.quaternion.slerp(q, suavizar);
}

/* ------------------------------------------------------------------ cervo */

const PELE = 0x7a4f2e, BARRIGA = 0xcdb592;

function criarCervo(escala: number, macho: boolean, semente: number) {
  const r = aleatorio(semente);
  const raiz = new THREE.Group();
  const corpo = new THREE.Group(); raiz.add(corpo);
  const m = mat(PELE, 0.95);
  const dorso = new THREE.Color(PELE).offsetHSL((r() - 0.5) * 0.02, 0, (r() - 0.5) * 0.06).getHex();
  const tronco = blob(0.27, 0.31, 0.62, dorso, BARRIGA, m, 16, semente); tronco.position.set(0, 1.04, 0); corpo.add(tronco);
  const peito = blob(0.26, 0.32, 0.3, dorso, BARRIGA, m, 12, semente + 1); peito.position.set(0, 1.08, 0.38); corpo.add(peito);
  const anca = blob(0.27, 0.33, 0.32, dorso, 0xb89a74, m, 12, semente + 2); anca.position.set(0, 1.06, -0.4); corpo.add(anca);
  const rabo = blob(0.07, 0.1, 0.06, 0xf1e6d2, 0xf1e6d2, mat(0xf1e6d2, 0.9), 8); rabo.position.set(0, 1.2, -0.72); corpo.add(rabo);

  const pescoco = new THREE.Group(); pescoco.position.set(0, 1.25, 0.6); corpo.add(pescoco);
  const pc = cilindro(0.115, 0.075, 0.5, PELE, 0.95, 8); pc.rotation.x = -Math.PI + 0.62; // aponta para cima e para a frente
  pc.position.set(0, 0, 0); pescoco.add(pc);
  const cabeca = new THREE.Group(); cabeca.position.set(0, 0.4, 0.3); pescoco.add(cabeca);
  const crânio = blob(0.085, 0.1, 0.17, 0x6f482a, 0xb89a74, mat(0x6f482a, 0.9), 12, semente + 3); crânio.position.set(0, 0.02, 0.08); cabeca.add(crânio);
  const focinho = blob(0.055, 0.06, 0.11, 0x5e3d25, 0xd6c3a2, mat(0x5e3d25, 0.9), 10, semente + 4); focinho.position.set(0, -0.03, 0.22); cabeca.add(focinho);
  const nariz = esfera(0.022, 0x15110e, 6); nariz.position.set(0, -0.025, 0.325); cabeca.add(nariz);
  for (const lado of [-1, 1]) {
    const olho = esfera(0.02, 0x0b0907, 6); olho.position.set(lado * 0.075, 0.05, 0.1); cabeca.add(olho);
    const orelha = blob(0.035, 0.1, 0.02, 0x6b4527, 0xd8c3a0, mat(0x6b4527, 0.9), 8); orelha.position.set(lado * 0.1, 0.13, -0.01); orelha.rotation.z = -lado * 0.7; orelha.rotation.x = -0.2; cabeca.add(orelha);
    if (macho) { // chifres ramificados
      const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(lado * 0.05, 0.18, -0.03), new THREE.Vector3(lado * 0.11, 0.36, -0.1), new THREE.Vector3(lado * 0.1, 0.52, -0.02)];
      const curva = new THREE.CatmullRomCurve3(pts);
      const haste = new THREE.Mesh(new THREE.TubeGeometry(curva, 10, 0.016, 5), mat(0xd7c9a8, 0.8));
      haste.position.set(lado * 0.05, 0.14, 0.0); cabeca.add(haste);
      for (let k = 0; k < 3; k++) {
        const p0 = curva.getPoint(0.3 + k * 0.25);
        const ponta = p0.clone().add(new THREE.Vector3(-lado * 0.04, 0.13 - k * 0.02, 0.1 - k * 0.04));
        const galho = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([p0, p0.clone().lerp(ponta, 0.5).add(new THREE.Vector3(0, 0.02, 0.02)), ponta]), 5, 0.011, 4), mat(0xd7c9a8, 0.8));
        galho.position.set(lado * 0.05, 0.14, 0); cabeca.add(galho);
      }
    }
  }
  // pernas articuladas
  const pernas: { quadril: THREE.Group; joelho: THREE.Group; fase: number }[] = [];
  const posPernas: [number, number, number][] = [[-0.14, 0.42, 0], [0.14, 0.42, Math.PI], [-0.14, -0.4, Math.PI], [0.14, -0.4, 0]];
  for (const [x, z, fase] of posPernas) {
    const quadril = new THREE.Group(); quadril.position.set(x, 0.93, z); corpo.add(quadril);
    const coxa = cilindro(0.065, 0.042, 0.5, PELE, 0.95); quadril.add(coxa);
    const joelho = new THREE.Group(); joelho.position.set(0, -0.5, 0); quadril.add(joelho);
    const canela = cilindro(0.036, 0.024, 0.45, 0x5d3b22, 0.95); joelho.add(canela);
    const casco = cone(0.032, 0.07, 0x1d1713, 6); casco.rotation.x = Math.PI; casco.position.set(0, -0.48, 0.004); joelho.add(casco);
    pernas.push({ quadril, joelho, fase });
  }
  raiz.scale.setScalar(escala);
  return { raiz, corpo, pescoco, cabeca, pernas };
}

type Estado = 'pastar' | 'andar' | 'alerta' | 'fugir';
type Cervo = ReturnType<typeof criarCervo> & {
  x: number; z: number; yaw: number; vel: number; estado: Estado; tEstado: number; alvo: THREE.Vector2; fase: number; comp: number; escala: number; pitchPescoco: number; deslocamento: THREE.Vector2;
};

/* ------------------------------------------------------------------ coelho */

function criarCoelho(semente: number) {
  const raiz = new THREE.Group(); const r = aleatorio(semente);
  const cor = [0x8a7355, 0x9b8a6e, 0x6e5b44, 0xb0a08a][Math.floor(r() * 4)];
  const corpo = blob(0.11, 0.1, 0.17, cor, 0xd9cdb8, mat(cor, 1), 12, semente); corpo.position.set(0, 0.12, 0); raiz.add(corpo);
  const anca = blob(0.1, 0.1, 0.12, cor, cor, mat(cor, 1), 10, semente + 1); anca.position.set(0, 0.13, -0.1); raiz.add(anca);
  const cabeca = new THREE.Group(); cabeca.position.set(0, 0.2, 0.15); raiz.add(cabeca);
  const crânio = blob(0.06, 0.06, 0.08, cor, 0xd9cdb8, mat(cor, 1), 10, semente + 2); crânio.position.set(0, 0, 0.03); cabeca.add(crânio);
  const nariz = esfera(0.012, 0xd98a8a, 6); nariz.position.set(0, -0.01, 0.1); cabeca.add(nariz);
  const orelhas: THREE.Mesh[] = [];
  for (const lado of [-1, 1]) {
    const olho = esfera(0.012, 0x120d0a, 6); olho.position.set(lado * 0.05, 0.02, 0.045); cabeca.add(olho);
    const o = blob(0.022, 0.1, 0.01, cor, 0xe0b6b0, mat(cor, 1), 8, semente + 3); o.position.set(lado * 0.028, 0.12, -0.005); o.rotation.z = -lado * 0.18; cabeca.add(o); orelhas.push(o);
  }
  const rabo = esfera(0.04, 0xf4efe6, 8); rabo.position.set(0, 0.15, -0.23); raiz.add(rabo);
  return { raiz, corpo, cabeca, orelhas };
}

/* ------------------------------------------------------------------ pato e cisne */

function criarAve(cisne: boolean, semente: number) {
  const raiz = new THREE.Group(); const r = aleatorio(semente);
  const s = cisne ? 1.9 : 1;
  const macho = r() < 0.5;
  const cCorpo = cisne ? 0xf4f6f8 : macho ? 0x8a7a5a : 0x9a7f5d;
  const cCabeca = cisne ? 0xf4f6f8 : macho ? 0x1f6b4a : 0x8a7050;
  const corpo = blob(0.14 * s, 0.1 * s, 0.26 * s, cCorpo, cisne ? 0xe5e9ee : 0xd9cfb8, mat(cCorpo, 0.85), 14, semente); corpo.position.set(0, 0.07 * s, 0); raiz.add(corpo);
  const rabo = cone(0.07 * s, 0.17 * s, cCorpo, 5); rabo.rotation.x = -Math.PI / 2 - 0.3; rabo.position.set(0, 0.11 * s, -0.27 * s); raiz.add(rabo);
  // pescoço curvo
  const pesc = new THREE.Group(); pesc.position.set(0, 0.12 * s, 0.17 * s); raiz.add(pesc);
  const pts = cisne
    ? [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.12, 0.08), new THREE.Vector3(0, 0.3, 0.06), new THREE.Vector3(0, 0.42, 0.14), new THREE.Vector3(0, 0.44, 0.22)]
    : [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0.07, 0.04), new THREE.Vector3(0, 0.15, 0.04), new THREE.Vector3(0, 0.2, 0.07)];
  const curva = new THREE.CatmullRomCurve3(pts.map((p) => p.clone().multiplyScalar(cisne ? 1 : 1)));
  const gp = new THREE.TubeGeometry(curva, 12, cisne ? 0.03 : 0.028, 7);
  const cs = new THREE.Color(cCorpo); const colp: number[] = []; for (let i = 0; i < gp.attributes.position.count; i++) colp.push(cs.r, cs.g, cs.b);
  gp.setAttribute('color', new THREE.Float32BufferAttribute(colp, 3));
  const pescMesh = new THREE.Mesh(gp, mat(cCabeca === cCorpo ? cCorpo : cCorpo, 0.85)); pesc.add(pescMesh);
  const fim = pts[pts.length - 1];
  const cab = blob(0.04 * (cisne ? 1.1 : 1.1), 0.04, 0.06, cCabeca, cCabeca, mat(cCabeca, 0.7), 10, semente + 1); cab.position.copy(fim).add(new THREE.Vector3(0, 0.01, 0.03)); pesc.add(cab);
  const bico = blob(0.026, 0.014, 0.06, cisne ? 0xe9791f : 0xe0b020, cisne ? 0xe9791f : 0xe0b020, mat(cisne ? 0xe9791f : 0xe0b020, 0.5), 8, semente + 2); bico.position.copy(fim).add(new THREE.Vector3(0, 0, 0.1)); pesc.add(bico);
  for (const lado of [-1, 1]) {
    const olho = esfera(0.008, 0x0a0a0a, 5); olho.position.copy(fim).add(new THREE.Vector3(lado * 0.034, 0.016, 0.04)); pesc.add(olho);
    const asa = blob(0.02 * s, 0.07 * s, 0.17 * s, cCorpo, cCorpo, mat(cCorpo, 0.85), 8, semente + 5); asa.position.set(lado * 0.13 * s, 0.13 * s, -0.02 * s); asa.rotation.z = lado * 0.25; raiz.add(asa);
  }
  return { raiz, pesc };
}

/* ------------------------------------------------------------------ peixe (a cauda balança no vértice) */

function criarPeixeGeo() {
  const g = new THREE.SphereGeometry(1, 14, 10);
  const p = g.attributes.position; const col: number[] = [];
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const afina = 1 - 0.65 * suave(0.0, 1.0, -z); // afina para trás
    p.setXYZ(i, x * 0.07 * afina, y * 0.11 * (0.55 + afina * 0.5), z * 0.3);
    const c = new THREE.Color().setHSL(0.07, 0.8, 0.5).lerp(new THREE.Color(0.85, 0.88, 0.9), suave(0.2, -0.8, y));
    col.push(c.r, c.g, c.b);
  }
  const cauda = new THREE.ConeGeometry(0.09, 0.13, 3); cauda.rotateX(-Math.PI / 2); cauda.rotateZ(Math.PI / 2); cauda.translate(0, 0, -0.34);
  const ccol: number[] = []; for (let i = 0; i < cauda.attributes.position.count; i++) ccol.push(0.9, 0.4, 0.15);
  cauda.setAttribute('color', new THREE.Float32BufferAttribute(ccol, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const merged = mergeGeos([g, cauda]);
  return merged;
}
function mergeGeos(gs: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const pos: number[] = [], nor: number[] = [], col: number[] = [], idx: number[] = [];
  for (const g of gs) {
    const base = pos.length / 3;
    const gi = g.index ? g : g.toNonIndexed();
    const p = g.attributes.position, n = g.attributes.normal, c = g.attributes.color;
    for (let i = 0; i < p.count; i++) { pos.push(p.getX(i), p.getY(i), p.getZ(i)); nor.push(n.getX(i), n.getY(i), n.getZ(i)); col.push(c.getX(i), c.getY(i), c.getZ(i)); }
    if (g.index) for (let i = 0; i < g.index.count; i++) idx.push(base + g.index.getX(i));
    else for (let i = 0; i < p.count; i++) idx.push(base + i);
    void gi;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  out.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  out.setIndex(idx);
  return out;
}

/* ------------------------------------------------------------------ aves voando (asas batem no vértice) */

function geometriaAve(env: number): THREE.BufferGeometry {
  const pos: number[] = [], asa: number[] = [], idx: number[] = [];
  const v = (x: number, y: number, z: number, a: number) => { pos.push(x, y, z); asa.push(a); return pos.length / 3 - 1; };
  const corpoA = v(0, 0, 0.22 * env, 0), corpoB = v(-0.05 * env, 0, -0.1 * env, 0), corpoC = v(0.05 * env, 0, -0.1 * env, 0), cauda = v(0, 0, -0.24 * env, 0), topo = v(0, 0.04 * env, 0.02 * env, 0);
  idx.push(corpoA, corpoB, corpoC, corpoA, corpoC, topo, corpoA, topo, corpoB, corpoB, cauda, corpoC);
  for (const lado of [-1, 1]) {
    const raiz1 = v(lado * 0.04 * env, 0, 0.1 * env, 0), raiz2 = v(lado * 0.04 * env, 0, -0.08 * env, 0), ponta = v(lado * 0.42 * env, 0, -0.06 * env, 1), meio = v(lado * 0.2 * env, 0, 0.1 * env, 0.45);
    idx.push(raiz1, ponta, raiz2, raiz1, meio, ponta);
    if (lado > 0) { idx.push(raiz2, ponta, raiz1, ponta, meio, raiz1); } else { idx.push(raiz2, raiz1, ponta, ponta, raiz1, meio); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aAsa', new THREE.Float32BufferAttribute(asa, 1));
  g.setIndex(idx);
  return g;
}

function materialAve(cor: number, ritmo: number) {
  const m = new THREE.MeshBasicMaterial({ color: cor, side: THREE.DoubleSide });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = U.uTime;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aAsa; attribute float aFase; uniform float uTime;')
      .replace('#include <begin_vertex>', `vec3 transformed = vec3(position);
        float bate = sin(uTime * ${ritmo.toFixed(1)} + aFase * 6.2831);
        transformed.y += aAsa * ( bate * 0.28 * abs(position.x) + 0.02 * sin(uTime * ${(ritmo * 0.5).toFixed(1)} + aFase));`);
  };
  return m;
}

/* ------------------------------------------------------------------ a fauna toda */

export type Fauna = ReturnType<typeof criarFauna>;

export function criarFauna(scene: THREE.Scene, campo: Campo, camera: THREE.PerspectiveCamera, sombra: boolean) {
  const grupo = new THREE.Group();
  scene.add(grupo);
  const rnd = aleatorio(2026);
  const jogador = camera.position;

  const transitavel = (x: number, z: number) => {
    const h = campo.h(x, z); if (h < 1.5 || h > 60) return false;
    if (campo.declive(x, z) > 0.2) return false;
    return campo.mascara(x, z).floresta < 0.45 && Math.abs(x) < 640 && Math.abs(z) < 640;
  };
  const sortearAlvo = (cx: number, cz: number, raio: number, tentativas = 40) => {
    for (let i = 0; i < tentativas; i++) {
      const a = rnd() * Math.PI * 2, d = 12 + rnd() * raio;
      const x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
      if (transitavel(x, z)) return new THREE.Vector2(x, z);
    }
    return new THREE.Vector2(cx, cz);
  };

  /* ---------- cervos ---------- */
  const rebanho: Cervo[] = [];
  const centroRebanho = new THREE.Vector2(-58, 52);
  if (!transitavel(centroRebanho.x, centroRebanho.y)) { const t = sortearAlvo(-40, 40, 120, 200); centroRebanho.copy(t); }
  const papeis: [number, boolean][] = [[1.1, true], [1.0, true], [0.95, false], [0.95, false], [0.92, false], [0.68, false], [0.64, false]];
  papeis.forEach(([escala, macho], i) => {
    const c = criarCervo(escala, macho, 40 + i) as Cervo;
    c.deslocamento = new THREE.Vector2((rnd() - 0.5) * 18, (rnd() - 0.5) * 18);
    c.x = centroRebanho.x + c.deslocamento.x; c.z = centroRebanho.y + c.deslocamento.y; c.yaw = rnd() * 6.28; c.vel = 0; c.estado = 'pastar'; c.tEstado = rnd() * 6; c.alvo = new THREE.Vector2(c.x, c.z);
    c.fase = rnd() * 6; c.comp = 1.2 * escala; c.escala = escala; c.pitchPescoco = 0;
    c.raiz.traverse((o) => { if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = sombra; });
    colocarNoChao(campo, c.raiz, c.x, c.z, c.yaw, 1);
    grupo.add(c.raiz); rebanho.push(c);
  });
  let alvoRebanho = sortearAlvo(centroRebanho.x, centroRebanho.y, 70);
  let tRebanho = 20;

  function atualizarCervos(dt: number, t: number) {
    tRebanho -= dt;
    // o centro do rebanho caminha de tempos em tempos
    if (tRebanho < 0) { alvoRebanho = sortearAlvo(centroRebanho.x, centroRebanho.y, 80); tRebanho = 25 + rnd() * 30; }
    const dc = alvoRebanho.clone().sub(centroRebanho); const lc = dc.length();
    const algumAndando = rebanho.some((c) => c.estado === 'andar' || c.estado === 'fugir');
    if (lc > 1 && algumAndando) centroRebanho.addScaledVector(dc.normalize(), Math.min(lc, 0.7 * dt));
    for (const c of rebanho) {
      const dJog = Math.hypot(jogador.x - c.x, jogador.z - c.z);
      c.tEstado -= dt;
      if (dJog < 24 && c.estado !== 'fugir') { c.estado = c.estado === 'alerta' || dJog < 14 ? 'fugir' : 'alerta'; c.tEstado = c.estado === 'fugir' ? 6 + rnd() * 3 : 2.5; }
      else if (c.tEstado <= 0) {
        if (c.estado === 'fugir' || c.estado === 'alerta') { c.estado = 'andar'; c.tEstado = 3 + rnd() * 3; }
        else if (c.estado === 'andar') { c.estado = rnd() < 0.7 ? 'pastar' : 'andar'; c.tEstado = 5 + rnd() * 9; }
        else { c.estado = rnd() < 0.5 ? 'andar' : 'pastar'; c.tEstado = 4 + rnd() * 7; }
        if (c.estado === 'andar') c.alvo.set(centroRebanho.x + c.deslocamento.x + (rnd() - 0.5) * 8, centroRebanho.y + c.deslocamento.y + (rnd() - 0.5) * 8);
      }
      let velAlvo = 0, pitchAlvo = 0.0;
      if (c.estado === 'andar') { velAlvo = 0.85; pitchAlvo = 0.1; }
      else if (c.estado === 'pastar') { velAlvo = 0; pitchAlvo = 1.0 + 0.05 * Math.sin(t * 2 + c.fase); }
      else if (c.estado === 'alerta') { velAlvo = 0; pitchAlvo = -0.28; }
      else { velAlvo = 4.6; pitchAlvo = -0.1; }
      // direção
      let alvoX = c.alvo.x, alvoZ = c.alvo.y;
      if (c.estado === 'fugir') { const ax = c.x - jogador.x, az = c.z - jogador.z; const l = Math.hypot(ax, az) + 1e-3; alvoX = c.x + (ax / l) * 20; alvoZ = c.z + (az / l) * 20; }
      if (c.estado === 'alerta') { alvoX = jogador.x; alvoZ = jogador.z; }
      if (c.estado === 'andar' || c.estado === 'fugir') {
        const yawAlvo = Math.atan2(alvoX - c.x, alvoZ - c.z);
        let d = yawAlvo - c.yaw; while (d > Math.PI) d -= 6.2832; while (d < -Math.PI) d += 6.2832;
        c.yaw += limitar(d, -dt * 2.2, dt * 2.2);
      } else if (c.estado === 'alerta') {
        const yawAlvo = Math.atan2(alvoX - c.x, alvoZ - c.z);
        let d = yawAlvo - c.yaw; while (d > Math.PI) d -= 6.2832; while (d < -Math.PI) d += 6.2832;
        c.yaw += limitar(d, -dt * 3, dt * 3);
      }
      c.vel += (velAlvo - c.vel) * Math.min(1, dt * 3);
      const nx = c.x + Math.sin(c.yaw) * c.vel * dt, nz = c.z + Math.cos(c.yaw) * c.vel * dt;
      if (transitavel(nx, nz)) { c.x = nx; c.z = nz; } else { c.tEstado = 0; c.vel *= 0.5; c.alvo.copy(sortearAlvo(c.x, c.z, 25)); }
      c.pitchPescoco += (pitchAlvo - c.pitchPescoco) * Math.min(1, dt * 3);
      c.pescoco.rotation.x = c.pitchPescoco;
      c.cabeca.rotation.x = -c.pitchPescoco * 0.45 + (c.estado === 'pastar' ? 0.08 * Math.sin(t * 5 + c.fase) : 0);
      // ciclo de caminhada / trote
      const ritmo = c.estado === 'fugir' ? 8.5 : 4.2;
      c.fase += dt * ritmo * (c.vel / (0.001 + (c.estado === 'fugir' ? 4.6 : 0.85))) * (c.vel > 0.05 ? 1 : 0);
      const amp = limitar(c.vel / 0.85, 0, 1) * 0.5 * (c.estado === 'fugir' ? 1.0 : 0.65) + (c.estado === 'fugir' ? 0.25 : 0);
      for (const p of c.pernas) {
        const f = c.fase + p.fase;
        p.quadril.rotation.x = Math.sin(f) * amp;
        p.joelho.rotation.x = -Math.max(0, Math.sin(f + 1.1)) * amp * 1.5;
      }
      c.corpo.position.y = Math.abs(Math.sin(c.fase * 2)) * 0.015 * limitar(c.vel, 0, 2);
      // a cauda e as orelhas reagem; o corpo acompanha o terreno
      colocarNoChao(campo, c.raiz, c.x, c.z, c.yaw, Math.min(1, dt * 6));
    }
  }

  /* ---------- coelhos ---------- */
  type Coelho = ReturnType<typeof criarCoelho> & { x: number; z: number; yaw: number; hop: number; estado: 'parado' | 'pulando'; t: number; alvo: THREE.Vector2; };
  const coelhos: Coelho[] = [];
  for (let i = 0; i < 7; i++) {
    const c = criarCoelho(70 + i) as Coelho;
    const p = sortearAlvo(INICIO.x + (rnd() - 0.5) * 40, INICIO.z - 8 + (rnd() - 0.5) * 30, 50, 200);
    c.x = p.x; c.z = p.y; c.yaw = rnd() * 6.28; c.hop = 0; c.estado = 'parado'; c.t = rnd() * 4; c.alvo = p.clone();
    c.raiz.scale.setScalar(1.0 + rnd() * 0.2);
    colocarNoChao(campo, c.raiz, c.x, c.z, c.yaw, 1);
    grupo.add(c.raiz); coelhos.push(c);
  }
  function atualizarCoelhos(dt: number, t: number) {
    for (const c of coelhos) {
      const dJog = Math.hypot(jogador.x - c.x, jogador.z - c.z);
      c.t -= dt;
      const assustado = dJog < 9;
      if (c.estado === 'parado') {
        c.cabeca.rotation.x = 0.1 * Math.sin(t * 6 + c.x) * (c.t < 1 ? 1 : 0.3);
        c.orelhas.forEach((o, i) => (o.rotation.x = 0.1 * Math.sin(t * 2 + i + c.x)));
        if (assustado || c.t <= 0) {
          c.estado = 'pulando'; c.hop = 0;
          const a = assustado ? Math.atan2(c.x - jogador.x, c.z - jogador.z) : rnd() * 6.28;
          c.yaw = a + (rnd() - 0.5) * 0.5; c.t = assustado ? 0.45 : 0.55;
        }
      } else {
        c.hop += dt;
        const f = c.hop / (assustado ? 0.34 : 0.5);
        const dist = (assustado ? 1.6 : 0.55) * dt / (assustado ? 0.34 : 0.5);
        const nx = c.x + Math.sin(c.yaw) * dist, nz = c.z + Math.cos(c.yaw) * dist;
        if (transitavel(nx, nz)) { c.x = nx; c.z = nz; } else c.yaw += 2.4;
        if (f >= 1) { c.estado = 'parado'; c.t = assustado ? 0.2 : 1 + rnd() * 5; }
      }
      colocarNoChao(campo, c.raiz, c.x, c.z, c.yaw, Math.min(1, dt * 8));
      const f = c.estado === 'pulando' ? limitar(c.hop / (assustado ? 0.34 : 0.5), 0, 1) : 0;
      c.raiz.position.y += Math.sin(f * Math.PI) * (assustado ? 0.34 : 0.17);
      c.corpo.rotation.x = -Math.sin(f * Math.PI) * 0.35;
    }
  }

  /* ---------- aves aquáticas (cavalgam as ondas de verdade) ---------- */
  type Ave = ReturnType<typeof criarAve> & { x: number; z: number; yaw: number; vel: number; alvo: THREE.Vector2; t: number; escala: number; mergulho: number; ondulou: number };
  const aves: Ave[] = [];
  const naAgua = (x: number, z: number, prof = 1.4) => campo.h(x, z) < -prof;
  const alvoAgua = (cx: number, cz: number, raio: number) => {
    for (let i = 0; i < 60; i++) { const a = rnd() * 6.28, d = rnd() * raio; const x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d; if (naAgua(x, z, 1.8)) return new THREE.Vector2(x, z); }
    return new THREE.Vector2(LAGO.cx, LAGO.cz);
  };
  for (let i = 0; i < 8; i++) {
    const cisne = i >= 6;
    const a = criarAve(cisne, 120 + i) as Ave;
    const p = alvoAgua(LAGO.cx + (cisne ? 30 : -50 + i * 18), LAGO.cz + 10, 80);
    a.x = p.x; a.z = p.y; a.yaw = rnd() * 6.28; a.vel = 0; a.alvo = p.clone(); a.t = rnd() * 6; a.escala = 1; a.mergulho = 0; a.ondulou = 0;
    a.raiz.position.set(a.x, 0, a.z);
    grupo.add(a.raiz); aves.push(a);
  }
  const ondularRef: { fn: (x: number, z: number, f: number) => void } = { fn: () => {} };
  function atualizarAves(dt: number, t: number) {
    for (const a of aves) {
      a.t -= dt;
      if (a.t <= 0) { a.alvo = alvoAgua(a.x + (rnd() - 0.5) * 80, a.z + (rnd() - 0.5) * 60, 55); a.t = 8 + rnd() * 16; a.mergulho = rnd() < 0.18 ? 2.2 : 0; }
      const yawAlvo = Math.atan2(a.alvo.x - a.x, a.alvo.y - a.z);
      let d = yawAlvo - a.yaw; while (d > Math.PI) d -= 6.2832; while (d < -Math.PI) d += 6.2832;
      a.yaw += limitar(d, -dt * 0.9, dt * 0.9);
      const dist = Math.hypot(a.alvo.x - a.x, a.alvo.y - a.z);
      const velAlvo = a.mergulho > 0 ? 0 : dist > 3 ? 0.55 : 0.05;
      a.vel += (velAlvo - a.vel) * Math.min(1, dt * 1.5);
      const nx = a.x + Math.sin(a.yaw) * a.vel * dt, nz = a.z + Math.cos(a.yaw) * a.vel * dt;
      if (naAgua(nx, nz, 1.2)) { a.x = nx; a.z = nz; } else { a.alvo = alvoAgua(a.x, a.z, 40); }
      if (a.mergulho > 0) a.mergulho -= dt;
      // a ave flutua na superfície das ondas e inclina com elas
      const h = alturaAgua(a.x, a.z, mundo.tempo);
      const n = normalAgua(a.x, a.z);
      a.raiz.position.set(a.x, h - 0.02, a.z);
      const local = n.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -a.yaw);
      const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.atan2(-local.z, local.y) * 0.9, a.yaw, Math.atan2(local.x, local.y) * 0.9, 'YXZ'));
      a.raiz.quaternion.slerp(q, Math.min(1, dt * 5));
      a.pesc.rotation.x = a.mergulho > 0 ? Math.min(1.5, 1.5 * (1 - Math.abs(a.mergulho - 1.1) / 1.1)) : 0.08 * Math.sin(t * 0.8 + a.x);
      a.ondulou -= dt;
      if (a.vel > 0.25 && a.ondulou <= 0) { ondularRef.fn(a.x - Math.sin(a.yaw) * 0.25, a.z - Math.cos(a.yaw) * 0.25, 0.35); a.ondulou = 1.6; }
    }
  }

  /* ---------- peixes ---------- */
  const geoPeixe = criarPeixeGeo();
  const matPeixe = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.45 });
  matPeixe.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = U.uTime;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTime; attribute float aFaseP;')
      .replace('#include <begin_vertex>', `vec3 transformed = vec3(position);
        float k = smoothstep(0.0, -0.4, position.z);
        transformed.x += sin(uTime * 9.0 + position.z * 9.0) * 0.07 * k * (0.4 + 0.6 * k);`);
  };
  type Peixe = { m: THREE.Mesh; cx: number; cz: number; r: number; w: number; f: number; prof: number; salto: number; tSalto: number; vx: number };
  const peixes: Peixe[] = [];
  for (let i = 0; i < 16; i++) {
    const m = new THREE.Mesh(geoPeixe, matPeixe); m.scale.setScalar(0.9 + rnd() * 0.9);
    const p = alvoAgua(LAGO.cx + (rnd() - 0.5) * 140, LAGO.cz + (rnd() - 0.5) * 80, 70);
    peixes.push({ m, cx: p.x, cz: p.y, r: 6 + rnd() * 16, w: (0.18 + rnd() * 0.3) * (rnd() < 0.5 ? -1 : 1), f: rnd() * 6.28, prof: 0.7 + rnd() * 2.2, salto: -1, tSalto: 6 + rnd() * 25, vx: 0 });
    grupo.add(m);
  }
  const gotas: { m: THREE.Mesh; v: THREE.Vector3; vida: number }[] = [];
  const gotaMat = new THREE.MeshBasicMaterial({ color: 0xeaf6ff, transparent: true, opacity: 0.85 });
  for (let i = 0; i < 40; i++) { const m = new THREE.Mesh(new THREE.SphereGeometry(0.035, 5, 4), gotaMat); m.visible = false; grupo.add(m); gotas.push({ m, v: new THREE.Vector3(), vida: 0 }); }
  const dir = new THREE.Vector3();
  function atualizarPeixes(dt: number, t: number) {
    for (const p of peixes) {
      p.f += p.w * dt;
      const x = p.cx + Math.cos(p.f) * p.r, z = p.cz + Math.sin(p.f * 0.8) * p.r * 0.6;
      const dx = -Math.sin(p.f) * p.r * p.w, dz = Math.cos(p.f * 0.8) * p.r * 0.6 * p.w * 0.8;
      p.tSalto -= dt;
      let y = alturaAgua(x, z, t) - p.prof;
      const prof = -campo.h(x, z);
      y = Math.max(y, -prof + 0.25);
      if (p.salto < 0 && p.tSalto <= 0 && prof > 2.2 && Math.abs(x - LAGO.cx) < 140) { p.salto = 0; p.tSalto = 12 + rnd() * 30; ondularRef.fn(x, z, 0.8); for (let k = 0; k < 6; k++) soltarGota(x, alturaAgua(x, z, t), z); }
      if (p.salto >= 0) {
        p.salto += dt;
        const f = p.salto / 1.0;
        y = alturaAgua(x, z, t) - 0.2 + Math.sin(Math.min(1, f) * Math.PI) * 1.15;
        if (f >= 1) { p.salto = -1; ondularRef.fn(x, z, 1.0); for (let k = 0; k < 6; k++) soltarGota(x, alturaAgua(x, z, t), z); }
        p.m.rotation.x = Math.cos(Math.min(1, f) * Math.PI) * -0.9;
      } else p.m.rotation.x *= 0.9;
      p.m.position.set(x, y, z);
      dir.set(dx, 0, dz); p.m.rotation.y = Math.atan2(dir.x, dir.z);
    }
    for (const g of gotas) {
      if (g.vida <= 0) { g.m.visible = false; continue; }
      g.vida -= dt; g.v.y -= 9.8 * dt; g.m.position.addScaledVector(g.v, dt);
      if (g.m.position.y < alturaAgua(g.m.position.x, g.m.position.z, t)) g.vida = 0;
    }
  }
  function soltarGota(x: number, y: number, z: number) {
    const g = gotas.find((q) => q.vida <= 0); if (!g) return;
    g.vida = 1.4; g.m.visible = true; g.m.position.set(x, y, z);
    g.v.set((rnd() - 0.5) * 1.6, 2 + rnd() * 2.2, (rnd() - 0.5) * 1.6);
  }

  /* ---------- bando de pássaros e águia ---------- */
  const NB = 26;
  const geoPassaro = geometriaAve(1.0);
  const fases = new Float32Array(NB); for (let i = 0; i < NB; i++) fases[i] = rnd();
  const ig = new THREE.InstancedBufferGeometry(); ig.copy(geoPassaro as unknown as THREE.InstancedBufferGeometry);
  ig.setAttribute('aFase', new THREE.InstancedBufferAttribute(fases, 1)); ig.instanceCount = NB;
  const bando = new THREE.InstancedMesh(ig, materialAve(0x17181c, 16), NB);
  bando.frustumCulled = false; grupo.add(bando);
  type Pass = { p: THREE.Vector3; v: THREE.Vector3 };
  const pass: Pass[] = Array.from({ length: NB }, (_, i) => ({ p: new THREE.Vector3(LAGO.cx - 60 + rnd() * 60, 36 + rnd() * 12, LAGO.cz + rnd() * 60), v: new THREE.Vector3(Math.cos(i) * 6, 0, Math.sin(i) * 6) }));
  const mAve = new THREE.Matrix4(), qAve = new THREE.Quaternion(), escAve = new THREE.Vector3(1, 1, 1), alvoB = new THREE.Vector3(), tmp = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
  function atualizarBando(dt: number, t: number) {
    alvoB.set(LAGO.cx + Math.cos(t * 0.045) * 150, 44 + Math.sin(t * 0.11) * 8, LAGO.cz + Math.sin(t * 0.06) * 80);
    const centro = new THREE.Vector3(); pass.forEach((b) => centro.add(b.p)); centro.multiplyScalar(1 / NB);
    for (let i = 0; i < NB; i++) {
      const b = pass[i];
      const a = new THREE.Vector3();
      a.add(tmp.copy(alvoB).sub(b.p).normalize().multiplyScalar(2.2));
      a.add(tmp.copy(centro).sub(b.p).multiplyScalar(0.012));
      for (let j = 0; j < NB; j++) { if (i === j) continue; const d = b.p.distanceTo(pass[j].p); if (d < 5 && d > 0.01) a.add(tmp.copy(b.p).sub(pass[j].p).multiplyScalar(2.5 / (d * d))); }
      const h = campo.h(b.p.x, b.p.z); if (b.p.y < h + 14) a.y += 6;
      b.v.addScaledVector(a, dt);
      const vel = limitar(b.v.length(), 8, 11.5); b.v.setLength(vel);
      b.p.addScaledVector(b.v, dt);
      qAve.setFromRotationMatrix(mAve.lookAt(new THREE.Vector3(0, 0, 0), tmp.copy(b.v).multiplyScalar(-1), up));
      const bank = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -a.x * 0.02);
      qAve.multiply(bank);
      mAve.compose(b.p, qAve, escAve);
      bando.setMatrixAt(i, mAve);
    }
    bando.instanceMatrix.needsUpdate = true;
  }
  // águia: círculos largos sobre as montanhas, quase sem bater as asas
  const geoAguia = geometriaAve(5.2);
  const igA = new THREE.InstancedBufferGeometry(); igA.copy(geoAguia as unknown as THREE.InstancedBufferGeometry);
  igA.setAttribute('aFase', new THREE.InstancedBufferAttribute(new Float32Array([0.3]), 1)); igA.instanceCount = 1;
  const aguia = new THREE.InstancedMesh(igA, materialAve(0x2a2118, 1.6), 1);
  aguia.frustumCulled = false; grupo.add(aguia);
  function atualizarAguia(_dt: number, t: number) {
    const w = 0.07, R = 150;
    const cx = -90, cz = -250;
    const a = t * w;
    const p = new THREE.Vector3(cx + Math.cos(a) * R, 105 + Math.sin(t * 0.13) * 12 + Math.sin(t * 0.37) * 3, cz + Math.sin(a) * R * 0.75);
    const vel = new THREE.Vector3(-Math.sin(a) * R, 0, Math.cos(a) * R * 0.75).normalize();
    const q = new THREE.Quaternion().setFromRotationMatrix(mAve.lookAt(new THREE.Vector3(), vel.clone().multiplyScalar(-1), up));
    q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), 0.38));
    mAve.compose(p, q, new THREE.Vector3(1, 1, 1));
    aguia.setMatrixAt(0, mAve); aguia.instanceMatrix.needsUpdate = true;
  }

  /* ---------- borboletas ---------- */
  const NBF = 30;
  const geoBorb = new THREE.BufferGeometry();
  {
    const pos: number[] = [], asa: number[] = [], idx: number[] = [];
    for (const lado of [-1, 1]) {
      const b = pos.length / 3;
      pos.push(0, 0, 0.03, lado * 0.09, 0, 0.08, lado * 0.1, 0, -0.06, 0, 0, -0.04); asa.push(0, 1, 1, 0);
      idx.push(b, b + 1, b + 2, b, b + 2, b + 3, b, b + 2, b + 1, b, b + 3, b + 2);
    }
    geoBorb.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geoBorb.setAttribute('aAsa', new THREE.Float32BufferAttribute(asa, 1));
    geoBorb.setIndex(idx);
  }
  const fb = new Float32Array(NBF); for (let i = 0; i < NBF; i++) fb[i] = rnd();
  const igB = new THREE.InstancedBufferGeometry(); igB.copy(geoBorb as unknown as THREE.InstancedBufferGeometry);
  igB.setAttribute('aFase', new THREE.InstancedBufferAttribute(fb, 1)); igB.instanceCount = NBF;
  const matB = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, vertexColors: false });
  matB.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = U.uTime;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aAsa; attribute float aFase; uniform float uTime;')
      .replace('#include <begin_vertex>', `vec3 transformed = vec3(position); float bate = abs(sin(uTime * 17.0 + aFase * 30.0));
        transformed.y += aAsa * abs(position.x) * (bate * 2.4 - 0.4);`);
  };
  const borboletas = new THREE.InstancedMesh(igB, matB, NBF);
  borboletas.frustumCulled = false; grupo.add(borboletas);
  const bcores = [0xffb347, 0xf7f06a, 0xf2f2f2, 0x7aa7ff, 0xff7aa8, 0xffa14a];
  const bf: { p: THREE.Vector3; c: THREE.Vector2; f: number; yaw: number }[] = [];
  for (let i = 0; i < NBF; i++) {
    const c = new THREE.Vector2(INICIO.x + (rnd() - 0.5) * 120, INICIO.z - 10 + (rnd() - 0.5) * 70);
    borboletas.setColorAt(i, new THREE.Color(bcores[Math.floor(rnd() * bcores.length)]));
    bf.push({ p: new THREE.Vector3(c.x, 1, c.y), c, f: rnd() * 6.28, yaw: 0 });
  }
  function atualizarBorboletas(dt: number, t: number) {
    for (let i = 0; i < NBF; i++) {
      const b = bf[i]; b.f += dt;
      const x = b.c.x + Math.sin(b.f * 0.6 + i) * 6 + Math.sin(b.f * 1.7 + i * 2) * 1.5;
      const z = b.c.y + Math.cos(b.f * 0.5 + i * 1.3) * 6 + Math.cos(b.f * 1.9) * 1.5;
      const y = campo.h(x, z) + 0.9 + 0.5 * Math.sin(b.f * 2.3 + i) + 0.35 * Math.sin(b.f * 5.1);
      // o vento empurra um pouco
      b.p.set(x + U.uWindDir.value.x * mundo.ventoSuave * 2.5, Math.max(y, campo.h(x, z) + 0.3), z + U.uWindDir.value.y * mundo.ventoSuave * 2.5);
      b.yaw = Math.atan2(Math.cos(b.f * 0.6 + i), Math.sin(b.f * 0.5 + i * 1.3));
      mAve.compose(b.p, new THREE.Quaternion().setFromEuler(new THREE.Euler(0.3 * Math.sin(b.f * 3), b.yaw, 0.2 * Math.sin(b.f * 2))), new THREE.Vector3(1.2, 1.2, 1.2));
      borboletas.setMatrixAt(i, mAve);
    }
    borboletas.instanceMatrix.needsUpdate = true;
    if (borboletas.instanceColor) borboletas.instanceColor.needsUpdate = true;
    void t;
  }

  /* ---------- vaga-lumes (aparecem à noite) e poeira que mostra o vento ---------- */
  const NV = 140;
  const posV = new Float32Array(NV * 3), faseV = new Float32Array(NV);
  for (let i = 0; i < NV; i++) {
    const a = rnd() * 6.28, d = 20 + rnd() * 90; posV[i * 3] = INICIO.x + Math.cos(a) * d * 1.3; posV[i * 3 + 2] = INICIO.z - 30 + Math.sin(a) * d * 0.7; posV[i * 3 + 1] = 0.5 + rnd() * 2.5; faseV[i] = rnd() * 6.28;
  }
  const gv = new THREE.BufferGeometry(); gv.setAttribute('position', new THREE.BufferAttribute(posV, 3)); gv.setAttribute('aFase', new THREE.BufferAttribute(faseV, 1));
  const mv = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: U.uTime, uNoite: { value: 0 }, uPx: { value: 1 } },
    vertexShader: `attribute float aFase; uniform float uTime; uniform float uPx; varying float vA;
      void main(){ vec3 p = position; p.x += sin(uTime*0.4+aFase*5.0)*2.5; p.z += cos(uTime*0.33+aFase*3.0)*2.5; p.y += sin(uTime*0.7+aFase*7.0)*0.8;
        vec4 mv = modelViewMatrix*vec4(p,1.0); gl_Position = projectionMatrix*mv; float pisca = pow(0.5+0.5*sin(uTime*2.2+aFase*11.0), 3.0);
        gl_PointSize = (3.0 + 8.0*pisca) * uPx * (60.0 / max(20.0, -mv.z)); vA = pisca; }`,
    fragmentShader: `uniform float uNoite; varying float vA; void main(){ float r = length(gl_PointCoord-0.5); float a = smoothstep(0.5, 0.0, r); gl_FragColor = vec4(0.75,1.0,0.35, a*a*vA*uNoite); }`,
  });
  const vagalumes = new THREE.Points(gv, mv); vagalumes.frustumCulled = false; grupo.add(vagalumes);

  const NP = 520;
  const posP = new Float32Array(NP * 3), seedP = new Float32Array(NP);
  for (let i = 0; i < NP; i++) { posP[i * 3] = (rnd() - 0.5) * 80; posP[i * 3 + 1] = rnd() * 28; posP[i * 3 + 2] = (rnd() - 0.5) * 80; seedP[i] = rnd(); }
  const gp = new THREE.BufferGeometry(); gp.setAttribute('position', new THREE.BufferAttribute(posP, 3)); gp.setAttribute('aSeed', new THREE.BufferAttribute(seedP, 1));
  const mp = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: U.uTime, uWindDir: U.uWindDir, uWind: U.uWind, uWindMs: U.uWindMs, uCam: U.uCam, uDia: { value: 1 }, uPx: { value: 1 } },
    vertexShader: `attribute float aSeed; uniform float uTime; uniform vec2 uWindDir; uniform float uWind; uniform float uWindMs; uniform vec3 uCam; uniform float uPx; varying float vA;
      void main(){ vec3 p = position; float v = (0.6 + uWindMs*0.7) * (0.6 + aSeed*0.8);
        p.xz += uWindDir * uTime * v; p.y += sin(uTime*0.9 + aSeed*20.0)*0.6 + sin(uTime*0.4+p.x*0.2)*0.3;
        vec3 w = vec3(40.0); vec3 rel = mod(p - uCam + w, 2.0*w) - w; vec3 wp = uCam + rel; wp.y = uCam.y + mod(p.y, 26.0) - 8.0;
        vec4 mv = viewMatrix * vec4(wp, 1.0); gl_Position = projectionMatrix * mv;
        float d = length(rel); vA = (1.0 - smoothstep(18.0, 40.0, d)) * (0.35 + 0.65*aSeed); gl_PointSize = (2.0 + 3.0*aSeed) * uPx; }`,
    fragmentShader: `uniform float uDia; uniform float uWind; varying float vA; void main(){ float r = length(gl_PointCoord-0.5); float a = smoothstep(0.5, 0.1, r); gl_FragColor = vec4(1.0, 0.95, 0.8, a*vA*0.45*uDia*(0.4+uWind)); }`,
  });
  const poeira = new THREE.Points(gp, mp); poeira.frustumCulled = false; grupo.add(poeira);

  function atualizar(dt: number, t: number, noite: number, luz: number) {
    atualizarCervos(dt, t); atualizarCoelhos(dt, t); atualizarAves(dt, t); atualizarPeixes(dt, t);
    atualizarBando(dt, t); atualizarAguia(dt, t); atualizarBorboletas(dt, t);
    mv.uniforms.uNoite.value = noite;
    mp.uniforms.uDia.value = luz;
    (borboletas.visible) = luz > 0.25;
  }
  function definirPixel(px: number) { mv.uniforms.uPx.value = px; mp.uniforms.uPx.value = px; }

  return {
    grupo, atualizar, definirPixel, bando, vagalumes, poeira, aguia, borboletas, rebanho, coelhos, aves, peixes,
    ligarOndulacoes(fn: (x: number, z: number, f: number) => void) { ondularRef.fn = fn; },
    ocultosNoReflexo: [vagalumes, poeira] as THREE.Object3D[],
  };
}
export { misturar, ILHA };
