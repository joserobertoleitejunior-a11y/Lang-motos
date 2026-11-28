/** Voo: passe pelos vãos sem encostar. Um toque, uma batida de asa. */
export default {
  id: 'voo', nome: 'Voo', cor: '#ffd34d', w: 120, h: 160,
  desc: 'Bata as asas no ritmo certo e atravesse os canos.',
  dica: 'Espaço, ↑ ou clique para voar', dicaToque: 'Toque na tela para voar',
  pad: [],
  criar(api) {
    const W = api.w;
    const H = api.h;
    const CHAO = H - 10;
    const ave = { x: 34, y: H / 2, vy: 0, r: 4 };
    const canos = [];
    let dist = 0;
    let comecou = false;
    let morto = false;
    let velocidade = 46;
    let asas = 0;
    const nuvens = [];
    for (let i = 0; i < 6; i++) nuvens.push({ x: Math.random() * W, y: 10 + Math.random() * 60, v: 6 + Math.random() * 8, r: 4 + Math.random() * 6 });
    api.aviso('Toque para voar');

    function novoCano(x) {
      const vao = Math.max(38, 50 - api.pontos * 0.6);
      const topo = 18 + Math.random() * (CHAO - vao - 36);
      canos.push({ x, topo, vao, passou: false });
    }
    novoCano(W + 20); novoCano(W + 20 + 70);

    function bater() { ave.vy = -132; asas = 1; api.som('pulo'); }

    function colidiu() {
      if (ave.y + ave.r >= CHAO || ave.y - ave.r <= 0) return true;
      return canos.some((c) => ave.x + ave.r > c.x && ave.x - ave.r < c.x + 18 && (ave.y - ave.r < c.topo || ave.y + ave.r > c.topo + c.vao));
    }

    return {
      atualizar(dt) {
        const quer = api.apertou('acao') || api.apertou('cima') || api.toque || api.ponteiro.apertou;
        for (const n of nuvens) { n.x -= n.v * dt; if (n.x < -12) { n.x = W + 12; n.y = 10 + Math.random() * 60; } }
        if (morto) return;
        if (!comecou) { ave.y = H / 2 + Math.sin(api.tempo * 4) * 4; if (quer) { comecou = true; api.aviso(''); bater(); } return; }
        if (quer) bater();
        ave.vy += 380 * dt; ave.y += ave.vy * dt; asas = Math.max(0, asas - dt * 5);
        velocidade = 46 + Math.min(30, api.pontos * 1.2);
        dist += velocidade * dt;
        for (const c of canos) {
          c.x -= velocidade * dt;
          if (!c.passou && c.x + 18 < ave.x) { c.passou = true; api.pontuar(1); api.som('ponto'); }
        }
        if (canos[0].x < -20) canos.shift();
        if (canos[canos.length - 1].x < W - 70) novoCano(W + 4);
        if (colidiu()) { morto = true; api.som('explosao'); api.fim('A ave caiu'); }
      },
      desenhar(ctx) {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(120,150,210,0.35)';
        for (const n of nuvens) { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.arc(n.x + n.r, n.y + 1, n.r * 0.8, 0, Math.PI * 2); ctx.fill(); }
        for (const c of canos) {
          ctx.fillStyle = '#46e08a';
          ctx.fillRect(c.x, 0, 18, c.topo); ctx.fillRect(c.x, c.topo + c.vao, 18, CHAO - c.topo - c.vao);
          ctx.fillStyle = '#b8ffd6';
          ctx.fillRect(c.x - 2, c.topo - 5, 22, 5); ctx.fillRect(c.x - 2, c.topo + c.vao, 22, 5);
        }
        ctx.fillStyle = '#7a6330'; ctx.fillRect(0, CHAO, W, H - CHAO);
        ctx.fillStyle = '#c9a84c';
        for (let x = -((dist * 1) % 8); x < W; x += 8) ctx.fillRect(x, CHAO, 4, 2);
        ctx.save(); ctx.translate(ave.x, ave.y); ctx.rotate(Math.max(-0.5, Math.min(1.1, ave.vy / 220)));
        ctx.fillStyle = '#ffd34d'; ctx.beginPath(); ctx.arc(0, 0, ave.r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ffa13d'; ctx.beginPath(); ctx.moveTo(ave.r - 1, -1); ctx.lineTo(ave.r + 4, 0.5); ctx.lineTo(ave.r - 1, 2); ctx.fill();
        ctx.fillStyle = '#ffffff'; ctx.fillRect(-4, -2 - asas * 3, 4, 2.5);
        ctx.fillStyle = '#000'; ctx.fillRect(1, -2, 1.5, 1.5);
        ctx.restore();
      },
    };
  },
};
