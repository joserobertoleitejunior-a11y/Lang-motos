/** Invasores: defenda a cidade das naves que descem. */
const SPRITES = [
  ['..X.....X..', '...X...X...', '..XXXXXXX..', '.XX.XXX.XX.', 'XXXXXXXXXXX', 'X.XXXXXXX.X', 'X.X.....X.X', '...XX.XX...'],
  ['..X.....X..', 'X..X...X..X', 'X.XXXXXXX.X', 'XXX.XXX.XXX', 'XXXXXXXXXXX', '.XXXXXXXXX.', '..X.....X..', '.X.......X.'],
];
const CORES = ['#ff5ad1', '#ff5a5a', '#ffa13d', '#46e08a', '#3fd6ff'];

function desenharSprite(ctx, mapa, x, y, px, cor) {
  ctx.fillStyle = cor;
  for (let l = 0; l < mapa.length; l++) for (let c = 0; c < mapa[l].length; c++) if (mapa[l][c] === 'X') ctx.fillRect(x + c * px, y + l * px, px, px);
}

export default {
  id: 'invasores', nome: 'Invasores', cor: '#ff5ad1', w: 160, h: 120,
  desc: 'Atire nas naves antes que elas cheguem ao chão.',
  dica: 'Setas para mover · Espaço atira', dicaToque: 'Arraste para mover · segure para atirar',
  pad: ['esq', 'acao', 'dir'],
  criar(api) {
    const W = api.w;
    const H = api.h;
    const PX = 0.9;
    const nave = { x: W / 2, y: H - 9 };
    let tiro = null;
    let inimigos = [];
    let tirosInimigos = [];
    let dir = 1;
    let vel = 9;
    let onda = 1;
    let vidas = 3;
    let quadro = 0;
    let tQuadro = 0;
    let explosoes = [];
    let invencivel = 0;
    api.vidas(vidas);

    function montar() {
      inimigos = [];
      for (let l = 0; l < 5; l++) for (let c = 0; c < 8; c++) inimigos.push({ x: 14 + c * 15, y: 12 + l * 10, l });
      vel = 8 + onda * 2; dir = 1;
    }
    montar();

    function atirar() { if (!tiro) { tiro = { x: nave.x, y: nave.y - 4 }; api.som('tiro'); } }

    function moverInimigos(dt) {
      let borda = false;
      for (const i of inimigos) { i.x += dir * vel * dt; if (i.x < 2 || i.x > W - 12) borda = true; }
      if (borda) { dir = -dir; for (const i of inimigos) { i.y += 3; i.x += dir * 1.5; } }
      vel = (8 + onda * 2) * (1 + (40 - inimigos.length) * 0.06);
      tQuadro += dt; if (tQuadro > 0.45) { tQuadro = 0; quadro = 1 - quadro; }
      if (inimigos.length && Math.random() < dt * (0.9 + onda * 0.25)) {
        const a = inimigos[(Math.random() * inimigos.length) | 0];
        tirosInimigos.push({ x: a.x + 5, y: a.y + 8 });
      }
      if (inimigos.some((i) => i.y > nave.y - 10)) { api.fim('As naves pousaram'); }
    }

    function colisoes() {
      if (tiro) {
        const alvo = inimigos.find((i) => tiro.x > i.x && tiro.x < i.x + 10 && tiro.y > i.y && tiro.y < i.y + 8);
        if (alvo) {
          inimigos.splice(inimigos.indexOf(alvo), 1); explosoes.push({ x: alvo.x + 5, y: alvo.y + 4, t: 0.35, cor: CORES[alvo.l] });
          api.pontuar((5 - alvo.l) * 10); api.som('explosao'); tiro = null;
        }
      }
      for (const t of tirosInimigos) {
        if (invencivel <= 0 && Math.abs(t.x - nave.x) < 6 && t.y > nave.y - 3 && t.y < nave.y + 4) {
          t.morto = true; vidas--; api.vidas(vidas); api.som('perdeu'); invencivel = 1.5;
          explosoes.push({ x: nave.x, y: nave.y, t: 0.5, cor: '#ffffff' });
          if (vidas <= 0) { api.fim('Sua nave foi destruída'); return; }
        }
      }
      tirosInimigos = tirosInimigos.filter((t) => !t.morto && t.y < H);
      if (!inimigos.length) { onda++; api.pontuar(200); api.som('linha'); api.aviso(`Onda ${onda}`); montar(); setTimeout(() => api.aviso(''), 1400); }
    }

    return {
      atualizar(dt) {
        const p = api.ponteiro;
        if (p.baixo && p.dentro) { nave.x += Math.max(-140 * dt, Math.min(140 * dt, p.x - nave.x)); atirar(); }
        else if (p.mexeu && p.dentro) nave.x = p.x;
        if (api.segurando('esq')) nave.x -= 95 * dt;
        if (api.segurando('dir')) nave.x += 95 * dt;
        nave.x = Math.max(7, Math.min(W - 7, nave.x));
        if (api.segurando('acao') || api.apertou('acao') || api.apertou('cima') || api.toque) atirar();
        if (tiro) { tiro.y -= 170 * dt; if (tiro.y < 0) tiro = null; }
        for (const t of tirosInimigos) t.y += 62 * dt;
        invencivel = Math.max(0, invencivel - dt);
        for (const e of explosoes) e.t -= dt;
        explosoes = explosoes.filter((e) => e.t > 0);
        moverInimigos(dt);
        colisoes();
      },
      desenhar(ctx, t) {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        for (let i = 0; i < 24; i++) ctx.fillRect((i * 37.7) % W, (i * 23.3 + t * 3) % (H - 20), 0.8, 0.8);
        for (const i of inimigos) desenharSprite(ctx, SPRITES[quadro], i.x, i.y, PX, CORES[i.l]);
        for (const e of explosoes) { ctx.fillStyle = e.cor; const r = (0.5 - e.t) * 18; ctx.globalAlpha = e.t * 2.5; ctx.beginPath(); ctx.arc(e.x, e.y, r, 0, Math.PI * 2); ctx.fill(); }
        ctx.globalAlpha = 1;
        if (invencivel <= 0 || Math.floor(t * 12) % 2) {
          ctx.fillStyle = '#e4c97e';
          ctx.fillRect(nave.x - 6, nave.y, 12, 3); ctx.fillRect(nave.x - 3.5, nave.y - 2, 7, 2); ctx.fillRect(nave.x - 1, nave.y - 4.5, 2, 2.5);
        }
        if (tiro) { ctx.fillStyle = '#ffffff'; ctx.fillRect(tiro.x - 0.6, tiro.y, 1.2, 4); }
        ctx.fillStyle = '#ff5a5a'; for (const s of tirosInimigos) ctx.fillRect(s.x - 0.7, s.y, 1.4, 3.5);
        ctx.fillStyle = 'rgba(201,168,76,0.6)'; ctx.fillRect(0, H - 3, W, 1);
      },
    };
  },
};
