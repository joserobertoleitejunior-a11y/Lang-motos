/** O cubo dourado do topo, desenhado com letras. Arraste para girar. */
import { criarLetras, prepararFonte } from './letras.js';
import { desenharCubo } from './cubo.js';

const FACES = ['IA', 'VCP', 'APPS', 'BOTS', 'SITES', 'SP'];

export async function iniciarHero(caixa, canvas, hud) {
  await prepararFonte();
  const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const celular = window.matchMedia('(pointer: coarse)').matches;
  let letras;
  try { letras = criarLetras(canvas, { celula: celular ? 5 : 6, fundo: 0.75, corFundo: [0.42, 0.33, 0.12] }); }
  catch { caixa.classList.add('sem-webgl'); return; }

  const W = 220;
  const H = 200;
  const ESC = 3;
  const fonte = document.createElement('canvas');
  fonte.width = W * ESC; fonte.height = H * ESC;
  const ctx = fonte.getContext('2d');
  let rotY = 0.55;
  let rotX = 0.38;
  let vy = calmo ? 0 : 0.45;
  let vx = 0;
  let arrastando = null;
  let visivel = true;
  let tempo = 0;

  canvas.addEventListener('pointerdown', (e) => {
    arrastando = { x: e.clientX, y: e.clientY, t: performance.now() };
    canvas.setPointerCapture?.(e.pointerId);
    const r = canvas.getBoundingClientRect();
    letras.onda(e.clientX - r.left, e.clientY - r.top, 1, tempo);
  });
  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    if (arrastando) {
      const dx = e.clientX - arrastando.x;
      const dy = e.clientY - arrastando.y;
      rotY += dx * 0.012; rotX = Math.max(-1.1, Math.min(1.1, rotX + dy * 0.01));
      vy = dx * 0.6; vx = dy * 0.4;
      arrastando.x = e.clientX; arrastando.y = e.clientY;
    } else if (e.pointerType === 'mouse' && !calmo && Math.random() < 0.06) {
      letras.onda(e.clientX - r.left, e.clientY - r.top, 0.4, tempo);
    }
  });
  const soltar = () => { arrastando = null; };
  canvas.addEventListener('pointerup', soltar);
  canvas.addEventListener('pointercancel', soltar);

  new ResizeObserver(() => letras.redimensionar()).observe(canvas);
  new IntersectionObserver((ents) => { visivel = ents[0].isIntersecting; }, { threshold: 0.05 }).observe(caixa);

  function vista() {
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const esc = Math.min(cw / W, ch / H);
    return { x: (cw - W * esc) / 2, y: (ch - H * esc) / 2, w: W * esc, h: H * esc };
  }

  let ultimo = performance.now();
  let contador = 0;
  function laco(agora) {
    requestAnimationFrame(laco);
    if (!visivel || document.hidden) { ultimo = agora; return; }
    const dt = Math.min(0.05, (agora - ultimo) / 1000); ultimo = agora; tempo += dt;
    if (!arrastando) {
      vy += ((calmo ? 0 : 0.45) - vy) * Math.min(1, dt * 1.5);
      vx += (0 - vx) * Math.min(1, dt * 2);
      rotY += vy * dt; rotX += vx * dt;
      rotX += (0.38 - rotX) * Math.min(1, dt * 0.8);
    }
    ctx.setTransform(ESC, 0, 0, ESC, 0, 0);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    desenharCubo(ctx, { cx: W / 2, cy: H / 2, tamanho: 62, rotY, rotX, tempo, faces: FACES });
    letras.desenhar(fonte, vista(), tempo);
    if (++contador % 15 === 0) hud.textContent = `cubo ${(vy).toFixed(2)} rad/s · ${letras.info.letras.toLocaleString('pt-BR')} letras · ${letras.info.colunas}×${letras.info.linhas}`;
  }
  requestAnimationFrame(laco);
  return letras;
}
