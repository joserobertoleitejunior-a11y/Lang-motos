import * as THREE from 'three';
import { ajustesDe, MOBILE, nivelInicial, PARAMS, type Projeto } from './config';
import { atualizarVento, mundo, U } from './vento';
import { gerarCampo, criarTerreno, INICIO } from './terreno';
import { criarCeu } from './ceu';
import { atualizarOndas, criarAgua } from './agua';
import { criarFloresta } from './arvores';
import { criarCapim, criarJuncos, criarPedras } from './capim';
import { criarFauna } from './animais';
import { criarQuadros } from './quadros';
import { carregarFonte, criarAscii } from './ascii';
import { colorir, criarUI } from './ui';

const nivel = nivelInicial();
const aj = ajustesDe(nivel);
const teste = PARAMS.get('teste') === '1';
const app = document.getElementById('app')!;
const esperar = (ms = 0) => new Promise<void>((r) => requestAnimationFrame(() => setTimeout(r, ms)));

let projetos: Projeto[] = (window.__MUNDO_PROJETOS ?? []).filter((p) => p.mostrar !== false);
if (PARAMS.get('clientes') === '0') projetos = projetos.filter((p) => !p.cliente);
const imagens = window.__MUNDO_IMAGENS ?? {};

async function iniciar() {
  const canvas = document.createElement('canvas');
  canvas.id = 'mundo';
  app.appendChild(canvas);
  const ui = criarUI(app, projetos, acoes);
  ui.progresso('carregando fonte e letras…', 0.05);
  await esperar();
  await carregarFonte();

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: nivel !== 'baixa', powerPreference: 'high-performance', preserveDrawingBuffer: teste });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.autoClear = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(62, 1, 0.3, 9000);
  camera.rotation.order = 'YXZ';

  ui.progresso('modelando terreno, lago e montanhas…', 0.15); await esperar();
  const campo = gerarCampo(aj.segTerreno);
  const terreno = criarTerreno(campo);
  scene.add(terreno.interno, terreno.externo);
  const ceu = criarCeu(scene, renderer, aj.nuvens);
  const agua = criarAgua(scene, renderer, campo, aj.reflexo);
  ui.progresso('plantando árvores…', 0.4); await esperar();
  const floresta = criarFloresta(campo, aj.arvores, aj.sombra > 0);
  scene.add(floresta.grupo);
  ui.progresso('espalhando capim, flores e pedras…', 0.6); await esperar();
  const capim = criarCapim(campo, aj.capim, aj.flores);
  const pedras = criarPedras(campo, aj.pedras, aj.sombra > 0);
  const juncos = criarJuncos(campo, aj.juncos);
  scene.add(capim.grupo, pedras.grupo, juncos.malha);
  agua.ocultarNoReflexo(capim.grupo);
  ui.progresso('criando os animais…', 0.8); await esperar();
  const fauna = criarFauna(scene, campo, camera, aj.sombra > 0);
  fauna.ligarOndulacoes((x, z, f) => agua.ondular(x, z, f));
  fauna.ocultosNoReflexo.forEach((o) => agua.ocultarNoReflexo(o));
  ui.progresso('pendurando os quadros…', 0.92); await esperar();
  const quadros = criarQuadros(campo, projetos, imagens);
  scene.add(quadros.grupo);

  /* ---------- modo de imagem: ASCII (padrão) ou realista ---------- */
  let ascii = PARAMS.get('modo') !== 'real';
  const celulaInicial = MOBILE ? 4 : 5;
  const asc = criarAscii(renderer, celulaInicial);
  let pixel = aj.pixel;
  const pixelAtual = () => (ascii ? Math.min(pixel, 1.5) : pixel);

  // copia a profundidade do mundo (já renderizado em ASCII) para que os quadros fiquem atrás de árvores e montanhas
  const blit = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
    uniforms: { tProf: { value: asc.rt.depthTexture } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: 'uniform sampler2D tProf; varying vec2 vUv; void main(){ gl_FragColor = vec4(0.0); gl_FragDepth = texture2D(tProf, vUv).x; }',
    colorWrite: false, depthWrite: true, depthTest: true, depthFunc: THREE.AlwaysDepth,
  }));
  blit.frustumCulled = false;
  const cenaBlit = new THREE.Scene(); cenaBlit.add(blit);
  const camBlit = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  function tamanho() {
    const w = innerWidth, h = innerHeight;
    renderer.setPixelRatio(pixelAtual());
    renderer.setSize(w, h, false);
    canvas.style.width = '100%'; canvas.style.height = '100%';
    camera.aspect = w / h; camera.updateProjectionMatrix();
    asc.ajustar();
    fauna.definirPixel(pixelAtual());
  }
  addEventListener('resize', tamanho); tamanho();

  /* ---------- estado do jogador ---------- */
  let yaw = 0, pitch = 0.17;
  let voando = false;
  const pos = new THREE.Vector3(INICIO.x, campo.h(INICIO.x, INICIO.z) + 1.7, INICIO.z);
  const teclas = new Set<string>();
  const joyV = { x: 0, y: 0 };
  let up = 0;
  let intro = true;
  let voo: { de: THREE.Vector3; para: THREE.Vector3; yawDe: number; yawPara: number; pDe: number; pPara: number; t: number; dur: number; fim?: () => void } | null = null;
  let selecionado = -1;
  let tour = -1, tourEspera = 0;

  function olharPara(alvo: THREE.Vector3, de: THREE.Vector3) {
    const d = alvo.clone().sub(de);
    return { yaw: Math.atan2(-d.x, -d.z), pitch: Math.atan2(d.y, Math.hypot(d.x, d.z)) };
  }
  const angDiff = (a: number, b: number) => { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };

  function voarPara(p: THREE.Vector3, alvo: THREE.Vector3, dur: number, fim?: () => void) {
    const o = olharPara(alvo, p);
    voo = { de: pos.clone(), para: p.clone(), yawDe: yaw, yawPara: yaw + angDiff(yaw, o.yaw), pDe: pitch, pPara: o.pitch, t: 0, dur, fim };
    intro = false;
  }
  function visitar(i: number, abrir = true) {
    const q = quadros.quadros[i]; if (!q) return;
    selecionado = i; marcarNitido();
    if (!voando) alternarVoo(true);
    const hf = Math.tan((camera.fov / 2) * Math.PI / 180) * camera.aspect;
    const v = q.posicaoVisita(Math.max(26, (18 * 0.62) / hf));
    voarPara(v.pos, v.alvo, 2.6, () => { if (abrir) ui.abrirPainel(q.projeto, i); });
    if (abrir) ui.abrirPainel(q.projeto, i);
  }
  function alternarVoo(forcar?: boolean) {
    voando = forcar ?? !voando;
    ui.bVoo.classList.toggle('on', voando);
    ui.bVoo.textContent = voando ? '⌂ Andar' : '✈ Voar';
    ui.alt.classList.toggle('on', voando && MOBILE);
  }
  function alternarModo() {
    ascii = !ascii;
    ui.bModo.classList.toggle('on', ascii);
    ui.bModo.textContent = ascii ? '▦ ASCII' : '◉ Realista';
    tamanho();
  }
  function marcarNitido() { quadros.quadros.forEach((q, k) => q.tela.layers.set(2)); }
  function fecharTudo() {
    ui.fecharPainel(); ui.fecharMenus(); selecionado = -1; marcarNitido();
    if (ui.visorAberto()) ui.fecharVisor();
  }
  function iniciarTour() {
    if (tour >= 0) { tour = -1; ui.bTour.classList.remove('on'); ui.bTour.textContent = '▶ Tour'; return; }
    tour = 0; tourEspera = 0; ui.bTour.classList.add('on'); ui.bTour.textContent = '■ Parar';
    visitar(0, true);
  }
  let autoHora = false;
  function alternarCodigo() { ui.codigo.classList.toggle('on'); ui.bCod.classList.toggle('on', ui.codigo.classList.contains('on')); }

  Object.assign(acoesRef, {
    modo: alternarModo, voar: () => alternarVoo(), tour: iniciarTour, codigo: alternarCodigo,
    catalogo: (i: number) => visitar(i), sobrevoar: (i: number) => visitar(i, false),
    hora: (h: number) => { mundo.hora = h; }, vento: (v: number) => { mundo.vento = v; },
    letras: (px: number) => asc.definirCelula(px), autoHora: (b: boolean) => { autoHora = b; }, fechar: fecharTudo,
  });
  ui.bModo.classList.toggle('on', ascii); ui.bModo.textContent = ascii ? '▦ ASCII' : '◉ Realista';
  if (!MOBILE && innerWidth > 1000) { ui.codigo.classList.add('on'); ui.bCod.classList.add('on'); }
  if (MOBILE) ui.dica.textContent = 'Arraste para olhar · joystick à esquerda para andar · toque nos quadros';

  /* ---------- entrada ---------- */
  const raio = new THREE.Raycaster(); raio.layers.enable(1); raio.layers.enable(2);
  const ndc = new THREE.Vector2();
  function quadroEm(cx: number, cy: number): number {
    ndc.set((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1);
    raio.setFromCamera(ndc, camera);
    const hit = raio.intersectObjects(quadros.grupo.children, true).find((h) => h.object.userData.quadroIdx !== undefined);
    return hit ? (hit.object.userData.quadroIdx as number) : -1;
  }
  function interromper() { intro = false; if (voo) { voo = null; } if (tour >= 0) iniciarTour(); }

  const ptr = new Map<number, { x: number; y: number; x0: number; y0: number; t0: number; tipo: 'olhar' | 'joy'; mov: number }>();
  let joyCentro = { x: 0, y: 0 };
  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    const toque = e.pointerType !== 'mouse';
    const tipo = toque && e.clientX < innerWidth * 0.4 && !ptrTem('joy') ? 'joy' : 'olhar';
    ptr.set(e.pointerId, { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t0: performance.now(), tipo, mov: 0 });
    if (tipo === 'joy') { joyCentro = { x: e.clientX, y: e.clientY }; ui.joy.style.display = 'block'; ui.joy.style.left = e.clientX + 'px'; ui.joy.style.top = e.clientY + 'px'; }
    ui.fecharMenus();
  });
  const ptrTem = (t: string) => [...ptr.values()].some((p) => p.tipo === t);
  canvas.addEventListener('pointermove', (e) => {
    const p = ptr.get(e.pointerId);
    if (!p) { // passando o mouse sobre os quadros
      if (e.pointerType === 'mouse') { const i = quadroEm(e.clientX, e.clientY); quadros.quadros.forEach((q, k) => (q.alvoBrilho = k === i ? 1 : 0)); canvas.style.cursor = i >= 0 ? 'pointer' : 'grab'; }
      return;
    }
    const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY; p.mov += Math.abs(dx) + Math.abs(dy);
    if (p.tipo === 'joy') {
      const vx = e.clientX - joyCentro.x, vy = e.clientY - joyCentro.y, m = Math.min(1, Math.hypot(vx, vy) / 50), a = Math.atan2(vy, vx);
      joyV.x = Math.cos(a) * m; joyV.y = Math.sin(a) * m;
      (ui.joy.firstElementChild as HTMLElement).style.transform = `translate(${Math.cos(a) * m * 40}px,${Math.sin(a) * m * 40}px)`;
    } else if (p.mov > 3) {
      interromper();
      const s = e.pointerType === 'mouse' ? 0.0042 : 0.0055;
      yaw -= dx * s; pitch = Math.max(-1.3, Math.min(1.3, pitch - dy * s));
      canvas.style.cursor = 'grabbing';
    }
  });
  const soltar = (e: PointerEvent) => {
    const p = ptr.get(e.pointerId); if (!p) return;
    ptr.delete(e.pointerId);
    if (p.tipo === 'joy') { joyV.x = joyV.y = 0; ui.joy.style.display = 'none'; (ui.joy.firstElementChild as HTMLElement).style.transform = ''; return; }
    canvas.style.cursor = 'grab';
    if (p.mov < 8 && performance.now() - p.t0 < 500 && e.type === 'pointerup') {
      const i = quadroEm(e.clientX, e.clientY);
      if (i >= 0) visitar(i); else fecharTudo();
    }
  };
  canvas.addEventListener('pointerup', soltar); canvas.addEventListener('pointercancel', soltar);
  canvas.addEventListener('wheel', (e) => { e.preventDefault(); interromper(); const f = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)); pos.addScaledVector(f, -e.deltaY * 0.04); }, { passive: false });
  canvas.style.cursor = 'grab';

  addEventListener('keydown', (e) => {
    if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
    const k = e.key.toLowerCase();
    if (k === 'escape') { fecharTudo(); return; }
    if (k === 'm') alternarModo(); else if (k === 'f') alternarVoo(); else if (k === 't') iniciarTour();
    else if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift', ' ', 'q', 'e', 'c'].includes(k)) { teclas.add(k); interromper(); e.preventDefault(); }
  });
  addEventListener('keyup', (e) => teclas.delete(e.key.toLowerCase()));
  addEventListener('blur', () => teclas.clear());
  const segura = (b: HTMLElement, v: number) => { b.addEventListener('pointerdown', (e) => { e.stopPropagation(); up = v; interromper(); }); b.addEventListener('pointerup', () => (up = 0)); b.addEventListener('pointerleave', () => (up = 0)); };
  segura(ui.bUp, 1); segura(ui.bDn, -1);

  /* ---------- movimento ---------- */
  const fr = new THREE.Vector3(), dir = new THREE.Vector3();
  function mover(dt: number) {
    if (voo) {
      voo.t += dt / voo.dur;
      const t = Math.min(1, voo.t), e = t * t * (3 - 2 * t);
      pos.lerpVectors(voo.de, voo.para, e);
      pos.y += Math.sin(e * Math.PI) * 6;
      yaw = voo.yawDe + (voo.yawPara - voo.yawDe) * e; pitch = voo.pDe + (voo.pPara - voo.pDe) * e;
      if (t >= 1) { const f = voo.fim; voo = null; f?.(); }
      return;
    }
    let f = (teclas.has('w') || teclas.has('arrowup') ? 1 : 0) - (teclas.has('s') || teclas.has('arrowdown') ? 1 : 0) - joyV.y;
    let s = (teclas.has('d') || teclas.has('arrowright') ? 1 : 0) - (teclas.has('a') || teclas.has('arrowleft') ? 1 : 0) + joyV.x;
    const n = Math.hypot(f, s); if (n > 1) { f /= n; s /= n; }
    const corre = teclas.has('shift') || Math.hypot(joyV.x, joyV.y) > 0.92;
    const vel = voando ? (corre ? 60 : 18) : (corre ? 12 : 5);
    if (voando) fr.set(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
    else fr.set(-Math.sin(yaw), 0, -Math.cos(yaw));
    dir.set(Math.cos(yaw), 0, -Math.sin(yaw));
    const nx = pos.x + (fr.x * f + dir.x * s) * vel * dt, nz = pos.z + (fr.z * f + dir.z * s) * vel * dt;
    const ny = pos.y + fr.y * f * vel * dt;
    const lim = 660;
    if (voando || campo.h(nx, nz) > -1.3) { pos.x = Math.max(-lim, Math.min(lim, nx)); pos.z = Math.max(-lim, Math.min(lim, nz)); }
    if (voando) {
      const v = (teclas.has(' ') || teclas.has('e') ? 1 : 0) - (teclas.has('q') || teclas.has('c') ? 1 : 0) + up;
      pos.y = ny + v * vel * 0.6 * dt;
      pos.y = Math.max(Math.max(campo.h(pos.x, pos.z), 0) + 1.3, Math.min(150, pos.y));
    } else {
      const alvoY = Math.max(campo.h(pos.x, pos.z), 0) + 1.7 + Math.sin(mundo.tempo * 7) * 0.025 * Math.min(1, Math.hypot(f, s));
      pos.y += (alvoY - pos.y) * Math.min(1, dt * 10);
    }
  }

  /* ---------- painel de código (trechos reais deste projeto) ---------- */
  const trechos = window.__MUNDO_CODIGO ?? [];
  let tIdx = 0, tChars = 0, tPausa = 0;
  function atualizarCodigo(dt: number) {
    if (!ui.codigo.classList.contains('on') || !trechos.length) return;
    const t = trechos[tIdx];
    if (tChars < t.texto.length) { tChars = Math.min(t.texto.length, tChars + dt * 160); }
    else { tPausa += dt; if (tPausa > 3.2) { tPausa = 0; tChars = 0; tIdx = (tIdx + 1) % trechos.length; } }
    const vis = t.texto.slice(0, Math.floor(tChars)).split('\n');
    const max = 17; const ini = Math.max(0, vis.length - max);
    ui.cabc.textContent = t.arquivo;
    ui.precod.innerHTML = colorir(vis.slice(ini), ini + 1) + (tChars < t.texto.length ? '<span style="opacity:.8">▌</span>' : '');
  }

  /* ---------- laço principal ---------- */
  let acumFps = 0, nFps = 0, fps = 60, ultimoHud = 0, lento = 0, rapido = 0;
  const limpa = new THREE.Color();
  function quadro(dt: number) {
    atualizarVento(dt);
    if (autoHora) { mundo.hora += dt / 18; ui.sincHora(mundo.hora); }
    mover(dt);
    if (intro && !voo) { yaw = Math.sin(mundo.tempo * 0.09) * 0.32; pitch = 0.17 + Math.sin(mundo.tempo * 0.13) * 0.03; }
    camera.position.copy(pos);
    camera.rotation.set(pitch, yaw, 0);
    camera.updateMatrixWorld();
    U.uCam.value.copy(camera.position);
    ceu.atualizar(camera.position);
    atualizarOndas(mundo.ventoSuave, mundo.angulo);
    const luz = Math.max(0.12, Math.min(1, ceu.direcao.y * 2.2 + 0.25));
    const noite = Math.max(0, Math.min(1, -ceu.direcao.y * 4 + 0.1));
    agua.atualizar(camera, ceu.sol, ceu.hemi.color, luz, scene.fog as THREE.FogExp2, mundo.tempo);
    fauna.atualizar(dt, mundo.tempo, noite, luz);
    quadros.atualizar(mundo.tempo, noite);
    quadros.quadros.forEach((q, k) => ((q.tela.material as THREE.ShaderMaterial).uniforms.uBoost.value = 0));
    if (tour >= 0 && !voo) {
      tourEspera += dt;
      if (tourEspera > 5.5) { tourEspera = 0; tour = (tour + 1) % quadros.quadros.length; visitar(tour, true); }
    }
    atualizarCodigo(dt);
    asc.mat.uniforms.uNoite.value = noite;

    camera.layers.enableAll();
    agua.renderReflexo(camera, scene);
    if (ascii) {
      camera.layers.set(0); camera.layers.enable(1);
      renderer.setRenderTarget(asc.rt); renderer.clear(); renderer.render(scene, camera); renderer.setRenderTarget(null);
      renderer.autoClear = false; renderer.clear();
      asc.desenhar();
      renderer.render(cenaBlit, camBlit);
      camera.layers.set(2);
      renderer.render(scene, camera);
      camera.layers.enableAll();
      renderer.autoClear = true;
    } else {
      camera.layers.enableAll();
      renderer.render(scene, camera);
    }
    void limpa;

    // desempenho adaptativo e linha de dados
    acumFps += dt; nFps++;
    if (acumFps > 1) {
      fps = nFps / acumFps; acumFps = 0; nFps = 0;
      if (fps < 24) { lento++; rapido = 0; } else if (fps > 52) { rapido++; lento = 0; } else { lento = rapido = 0; }
      if (lento >= 2 && pixel > 0.6) { pixel = Math.max(0.6, pixel - 0.15); lento = 0; tamanho(); }
      else if (rapido >= 8 && pixel < aj.pixel) { pixel = Math.min(aj.pixel, pixel + 0.1); rapido = 0; tamanho(); }
    }
    ultimoHud += dt;
    if (ultimoHud > 0.25) {
      ultimoHud = 0;
      const letras = ascii ? asc.info.colunas * asc.info.linhas : 0;
      ui.hud1.textContent = `vento ${U.uWindMs.value.toFixed(1)} m/s   hora ${ui.hh(mundo.hora)}   ${ascii ? 'letras ' + letras : 'modo realista'}   ${Math.round(fps)} fps`;
      ui.sincVento(U.uWindMs.value);
    }
  }

  let ultimo = performance.now();
  function laco() {
    const agora = performance.now();
    const dt = Math.min(0.1, (agora - ultimo) / 1000); ultimo = agora;
    quadro(dt);
    requestAnimationFrame(laco);
  }

  window.__vcp = {
    fauna, capim, pedras, juncos, floresta, agua, camera, scene, renderer, campo, mundo, quadros, ascii: asc,
    ver(x: number, y: number, z: number, y2: number, p2: number) { intro = false; voo = null; pos.set(x, y, z); yaw = y2; pitch = p2; },
    passo(n = 1, dt = 0.05) { for (let i = 0; i < n; i++) quadro(dt); },
    modo(a: boolean) { if (a !== ascii) alternarModo(); },
    visitar, ui,
  };

  ui.progresso('pronto', 1);
  quadro(0.016); quadro(0.016);
  await esperar(250);
  ui.abertura.classList.add('fim');
  setTimeout(() => ui.abertura.remove(), 1000);
  setTimeout(() => (ui.dica.style.opacity = '0'), 14000);
  if (!teste) requestAnimationFrame(laco);
}

const acoesRef: Record<string, (...a: never[]) => void> = {};
const acoes = new Proxy(acoesRef, { get: (t, k: string) => (...a: unknown[]) => (t[k] as (...x: unknown[]) => void)?.(...a) }) as unknown as Parameters<typeof criarUI>[2];

iniciar().catch((e) => {
  console.error(e);
  const m = document.createElement('div');
  m.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center;color:#fff;font:15px Inter,sans-serif;background:#0b1020;z-index:9';
  m.textContent = 'Não foi possível iniciar o mundo 3D neste aparelho (WebGL indisponível?). Tente outro navegador.';
  document.body.appendChild(m);
});
