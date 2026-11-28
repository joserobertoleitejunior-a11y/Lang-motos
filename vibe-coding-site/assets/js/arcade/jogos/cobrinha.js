/** Cobrinha: coma, cresça e não bata em você mesmo nem nas bordas. */
const T = 5;
const DIRS = { esq: [-1, 0], dir: [1, 0], cima: [0, -1], baixo: [0, 1] };

export default {
  id: 'cobrinha', nome: 'Cobrinha', cor: '#46e08a', w: 160, h: 100,
  desc: 'A clássica. Cada fruta deixa a cobra maior e mais rápida.',
  dica: 'Setas ou WASD', dicaToque: 'Deslize o dedo ou use as setas',
  pad: ['esq', 'cima', 'baixo', 'dir'],
  criar(api) {
    const C = api.w / T;
    const L = api.h / T;
    const cobra = [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }];
    let dir = [1, 0];
    const fila = [];
    let crescer = 0;
    let passo = 0.12;
    let acum = 0;
    let comida = null;
    let ouro = null;
    let morta = false;
    let pulsar = 0;
    const ocupado = (x, y) => cobra.some((s) => s.x === x && s.y === y);
    function sortear() {
      let x;
      let y;
      do { x = (Math.random() * C) | 0; y = (Math.random() * L) | 0; } while (ocupado(x, y));
      return { x, y };
    }
    comida = sortear();
    api.aviso('Use as setas para começar');

    function virar(nome) {
      const nd = DIRS[nome]; if (!nd) return;
      const ultima = fila.length ? fila[fila.length - 1] : dir;
      if (nd[0] === -ultima[0] && nd[1] === -ultima[1]) return;
      if (nd[0] === ultima[0] && nd[1] === ultima[1]) return;
      if (fila.length < 3) fila.push(nd);
    }

    function mover() {
      if (fila.length) dir = fila.shift();
      const c = cobra[0];
      const n = { x: c.x + dir[0], y: c.y + dir[1] };
      if (n.x < 0 || n.y < 0 || n.x >= C || n.y >= L || ocupado(n.x, n.y)) { morta = true; api.som('explosao'); api.fim('A cobra bateu'); return; }
      cobra.unshift(n);
      if (n.x === comida.x && n.y === comida.y) {
        crescer += 2; api.pontuar(10); api.som('ponto'); comida = sortear(); passo = Math.max(0.055, passo * 0.965); pulsar = 1;
        if (!ouro && Math.random() < 0.25) ouro = { ...sortear(), vida: 7 };
      } else if (ouro && n.x === ouro.x && n.y === ouro.y) {
        crescer += 4; api.pontuar(50); api.som('linha'); ouro = null; pulsar = 1;
      }
      if (crescer > 0) crescer--; else cobra.pop();
    }

    let comecou = false;
    return {
      atualizar(dt) {
        for (const n of Object.keys(DIRS)) if (api.apertou(n)) { virar(n); comecou = true; }
        if (api.deslize) { virar(api.deslize); comecou = true; }
        if (!comecou || morta) return;
        api.aviso('');
        if (ouro) { ouro.vida -= dt; if (ouro.vida <= 0) ouro = null; }
        pulsar = Math.max(0, pulsar - dt * 3);
        acum += dt;
        while (acum >= passo && !morta) { acum -= passo; mover(); }
      },
      desenhar(ctx, t) {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, api.w, api.h);
        ctx.strokeStyle = 'rgba(70,224,138,0.35)'; ctx.lineWidth = 1; ctx.strokeRect(0.5, 0.5, api.w - 1, api.h - 1);
        const brilho = 0.75 + 0.25 * Math.sin(t * 6);
        ctx.fillStyle = `rgba(255,90,90,${brilho})`;
        ctx.beginPath(); ctx.arc(comida.x * T + T / 2, comida.y * T + T / 2, T * 0.55, 0, Math.PI * 2); ctx.fill();
        if (ouro) { ctx.fillStyle = '#ffd34d'; ctx.beginPath(); ctx.arc(ouro.x * T + T / 2, ouro.y * T + T / 2, T * (0.6 + 0.15 * Math.sin(t * 10)), 0, Math.PI * 2); ctx.fill(); }
        cobra.forEach((s, i) => {
          const k = i / Math.max(1, cobra.length - 1);
          ctx.fillStyle = i === 0 ? '#eafff2' : `rgb(${40 + 40 * k},${230 - 90 * k},${140 + 100 * k})`;
          const m = i === 0 ? 0 : 0.5;
          ctx.fillRect(s.x * T + m, s.y * T + m, T - m * 2, T - m * 2);
        });
        if (pulsar > 0) { ctx.strokeStyle = `rgba(70,224,138,${pulsar})`; ctx.lineWidth = 2; ctx.strokeRect(1, 1, api.w - 2, api.h - 2); }
      },
    };
  },
};
