/** Quebra-blocos: rebata a bola e limpe a parede. */
const CORES = ['#ffd34d', '#ffa13d', '#ff5a5a', '#ff5ad1', '#3fd6ff', '#46e08a'];

export default {
  id: 'quebra-blocos', nome: 'Quebra-blocos', cor: '#ffa13d', w: 160, h: 120,
  desc: 'Rebata a bola e destrua todos os tijolos coloridos.',
  dica: 'Mouse ou setas · Espaço lança', dicaToque: 'Arraste o dedo · toque para lançar',
  pad: ['esq', 'acao', 'dir'],
  criar(api) {
    const W = api.w;
    const H = api.h;
    const raquete = { x: W / 2, y: H - 8, w: 28, h: 3.5 };
    let bola;
    let presa = true;
    let vidas = 3;
    let nivel = 1;
    let tijolos = [];
    let faiscas = [];
    api.vidas(vidas);

    function montar() {
      tijolos = [];
      const cols = 10;
      const linhas = Math.min(6, 3 + nivel);
      const bw = 14;
      const bh = 5;
      const x0 = (W - cols * (bw + 1.5)) / 2 + 0.75;
      for (let l = 0; l < linhas; l++) for (let c = 0; c < cols; c++) {
        tijolos.push({ x: x0 + c * (bw + 1.5), y: 12 + l * (bh + 1.5), w: bw, h: bh, cor: CORES[l % CORES.length], vida: l === 0 && nivel > 2 ? 2 : 1 });
      }
    }
    function reiniciarBola() { bola = { x: raquete.x, y: raquete.y - 4, vx: 0, vy: 0, r: 2.2 }; presa = true; api.aviso('Toque ou aperte espaço para lançar'); }
    function lancar() {
      const v = 82 + nivel * 10;
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 0.7;
      bola.vx = Math.cos(a) * v; bola.vy = Math.sin(a) * v; presa = false; api.aviso(''); api.som('pulo');
    }
    montar(); reiniciarBola();

    function controlar(dt) {
      const p = api.ponteiro;
      if (p.mexeu && p.dentro) raquete.x = p.x;
      const vel = 160;
      if (api.segurando('esq')) raquete.x -= vel * dt;
      if (api.segurando('dir')) raquete.x += vel * dt;
      raquete.x = Math.max(raquete.w / 2, Math.min(W - raquete.w / 2, raquete.x));
      if (presa) { bola.x = raquete.x; bola.y = raquete.y - 4; if (api.apertou('acao') || api.toque || p.apertou) lancar(); }
    }

    function bater(t) {
      t.vida--; api.som('batida');
      for (let i = 0; i < 5; i++) faiscas.push({ x: bola.x, y: bola.y, vx: (Math.random() - 0.5) * 70, vy: (Math.random() - 0.5) * 70, vida: 0.4, cor: t.cor });
      if (t.vida <= 0) { api.pontuar(10 * nivel); t.morto = true; }
      else t.cor = '#ffffff';
    }

    function fisica(dt) {
      const px = bola.x;
      const py = bola.y;
      bola.x += bola.vx * dt; bola.y += bola.vy * dt;
      if (bola.x < bola.r) { bola.x = bola.r; bola.vx = Math.abs(bola.vx); api.som('batida'); }
      if (bola.x > W - bola.r) { bola.x = W - bola.r; bola.vx = -Math.abs(bola.vx); api.som('batida'); }
      if (bola.y < bola.r) { bola.y = bola.r; bola.vy = Math.abs(bola.vy); api.som('batida'); }
      if (bola.vy > 0 && bola.y + bola.r >= raquete.y && bola.y - bola.r <= raquete.y + raquete.h && Math.abs(bola.x - raquete.x) <= raquete.w / 2 + bola.r) {
        const k = (bola.x - raquete.x) / (raquete.w / 2);
        const v = Math.min(190, Math.hypot(bola.vx, bola.vy) * 1.02);
        const a = -Math.PI / 2 + k * 1.05;
        bola.vx = Math.cos(a) * v; bola.vy = Math.sin(a) * v; bola.y = raquete.y - bola.r; api.som('pulo');
      }
      for (const t of tijolos) {
        if (t.morto) continue;
        if (bola.x + bola.r < t.x || bola.x - bola.r > t.x + t.w || bola.y + bola.r < t.y || bola.y - bola.r > t.y + t.h) continue;
        const veioDoLado = px + bola.r <= t.x || px - bola.r >= t.x + t.w;
        if (veioDoLado) bola.vx = -bola.vx; else bola.vy = -bola.vy;
        bater(t);
        break;
      }
      tijolos = tijolos.filter((t) => !t.morto);
      if (bola.y > H + 6) {
        vidas--; api.vidas(vidas); api.som('perdeu');
        if (vidas <= 0) { api.fim('Acabaram as bolas'); return; }
        reiniciarBola();
      }
      if (!tijolos.length) { nivel++; api.pontuar(100); api.som('linha'); montar(); reiniciarBola(); api.aviso(`Nível ${nivel}`); }
    }

    return {
      atualizar(dt) {
        controlar(dt);
        if (!presa) fisica(dt);
        for (const f of faiscas) f.vida -= dt;
        faiscas = faiscas.filter((f) => f.vida > 0);
        for (const f of faiscas) { f.x += f.vx * dt; f.y += f.vy * dt; }
      },
      desenhar(ctx) {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
        for (const t of tijolos) { ctx.fillStyle = t.cor; ctx.fillRect(t.x, t.y, t.w, t.h); }
        for (const f of faiscas) { ctx.globalAlpha = f.vida * 2.5; ctx.fillStyle = f.cor; ctx.fillRect(f.x - 0.8, f.y - 0.8, 1.6, 1.6); }
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#e4c97e'; ctx.fillRect(raquete.x - raquete.w / 2, raquete.y, raquete.w, raquete.h);
        ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(bola.x, bola.y, bola.r, 0, Math.PI * 2); ctx.fill();
      },
    };
  },
};
