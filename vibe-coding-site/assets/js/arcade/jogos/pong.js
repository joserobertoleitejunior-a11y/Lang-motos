/** Pong contra a máquina: quem fizer 7 primeiro ganha. */
export default {
  id: 'pong', nome: 'Pong', cor: '#3fd6ff', w: 160, h: 100,
  desc: 'O primeiro videogame da história, agora em letras.',
  dica: 'Mouse ou ↑ ↓', dicaToque: 'Arraste o dedo para mover',
  pad: ['cima', 'baixo'],
  criar(api) {
    const W = api.w;
    const H = api.h;
    const AR = 18;
    const ESP = 3;
    const voce = { y: H / 2, pts: 0 };
    const cpu = { y: H / 2, pts: 0, vel: 58 };
    let bola;
    let espera = 1.2;
    let fim = false;
    function saque(lado) {
      const a = (Math.random() - 0.5) * 0.8;
      const v = 78;
      bola = { x: W / 2, y: H / 2, vx: Math.cos(a) * v * lado, vy: Math.sin(a) * v, r: 2 };
      espera = 0.9;
    }
    saque(Math.random() < 0.5 ? 1 : -1);

    function rebater(raq, lado) {
      const k = (bola.y - raq.y) / (AR / 2);
      const v = Math.min(170, Math.hypot(bola.vx, bola.vy) * 1.06);
      const a = k * 0.85;
      bola.vx = Math.cos(a) * v * lado; bola.vy = Math.sin(a) * v; api.som('batida');
    }

    function marcar(quem) {
      quem.pts++;
      if (quem === voce) { api.pontuar(1); api.som('ponto'); } else api.som('perdeu');
      api.aviso(`Você ${voce.pts} × ${cpu.pts} Máquina`);
      if (voce.pts >= 7 || cpu.pts >= 7) { fim = true; api.fim(voce.pts >= 7 ? 'Você venceu!' : 'A máquina venceu'); return; }
      saque(quem === voce ? -1 : 1);
    }

    return {
      atualizar(dt) {
        if (fim) return;
        const p = api.ponteiro;
        if (p.mexeu && p.dentro) voce.y = p.y;
        if (api.segurando('cima')) voce.y -= 110 * dt;
        if (api.segurando('baixo')) voce.y += 110 * dt;
        voce.y = Math.max(AR / 2, Math.min(H - AR / 2, voce.y));
        const alvo = bola.vx > 0 ? bola.y : H / 2;
        cpu.vel = 56 + (voce.pts - cpu.pts) * 5;
        cpu.y += Math.max(-cpu.vel * dt, Math.min(cpu.vel * dt, alvo - cpu.y));
        cpu.y = Math.max(AR / 2, Math.min(H - AR / 2, cpu.y));
        if (espera > 0) { espera -= dt; return; }
        bola.x += bola.vx * dt; bola.y += bola.vy * dt;
        if (bola.y < bola.r || bola.y > H - bola.r) { bola.vy = -bola.vy; bola.y = Math.max(bola.r, Math.min(H - bola.r, bola.y)); api.som('batida'); }
        if (bola.vx < 0 && bola.x - bola.r <= 6 + ESP && bola.x > 4 && Math.abs(bola.y - voce.y) <= AR / 2 + bola.r) { bola.x = 6 + ESP + bola.r; rebater(voce, 1); }
        if (bola.vx > 0 && bola.x + bola.r >= W - 6 - ESP && bola.x < W - 4 && Math.abs(bola.y - cpu.y) <= AR / 2 + bola.r) { bola.x = W - 6 - ESP - bola.r; rebater(cpu, -1); }
        if (bola.x < -6) marcar(cpu);
        else if (bola.x > W + 6) marcar(voce);
      },
      desenhar(ctx) {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(63,214,255,0.22)';
        ctx.font = '900 34px "Barlow Condensed", "Arial Narrow", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(String(voce.pts), W * 0.3, H * 0.28); ctx.fillText(String(cpu.pts), W * 0.7, H * 0.28);
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        for (let y = 2; y < H; y += 8) ctx.fillRect(W / 2 - 0.6, y, 1.2, 4);
        ctx.fillStyle = '#3fd6ff'; ctx.fillRect(6, voce.y - AR / 2, ESP, AR);
        ctx.fillStyle = '#ff5ad1'; ctx.fillRect(W - 6 - ESP, cpu.y - AR / 2, ESP, AR);
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(bola.x, bola.y, bola.r, 0, Math.PI * 2); ctx.fill();
      },
    };
  },
};
