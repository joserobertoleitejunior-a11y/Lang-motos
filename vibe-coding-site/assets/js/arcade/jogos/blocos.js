/** Blocos: encaixe as peças e complete linhas. */
const PECAS = {
  I: { cor: '#3fd6ff', m: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]] },
  O: { cor: '#ffd34d', m: [[1, 1], [1, 1]] },
  T: { cor: '#ff5ad1', m: [[0, 1, 0], [1, 1, 1], [0, 0, 0]] },
  S: { cor: '#46e08a', m: [[0, 1, 1], [1, 1, 0], [0, 0, 0]] },
  Z: { cor: '#ff5a5a', m: [[1, 1, 0], [0, 1, 1], [0, 0, 0]] },
  J: { cor: '#4d7cff', m: [[1, 0, 0], [1, 1, 1], [0, 0, 0]] },
  L: { cor: '#ffa13d', m: [[0, 0, 1], [1, 1, 1], [0, 0, 0]] },
};
const NOMES = Object.keys(PECAS);
const COLS = 10;
const LINS = 20;
const T = 7;
const X0 = 4;
const Y0 = 5;
const girarMatriz = (m) => m[0].map((_, c) => m.map((l) => l[c]).reverse());

export default {
  id: 'blocos', nome: 'Blocos', cor: '#4d7cff', w: 112, h: 150,
  desc: 'Encaixe as peças que caem e complete linhas inteiras.',
  dica: '← → mover · ↑ girar · ↓ descer · Espaço solta', dicaToque: 'Toque gira · deslize move · deslize p/ baixo solta',
  pad: ['esq', 'cima', 'baixo', 'dir', 'acao'],
  criar(api) {
    const grade = Array.from({ length: LINS }, () => Array(COLS).fill(null));
    let saco = [];
    let atual;
    let proxima;
    let queda = 0;
    let linhas = 0;
    let nivel = 1;
    let travar = 0;
    let piscar = [];
    let tPiscar = 0;
    const repetir = { esq: 0, dir: 0 };

    function sortear() { if (!saco.length) saco = [...NOMES].sort(() => Math.random() - 0.5); return saco.pop(); }
    function nova() {
      const n = proxima || sortear(); proxima = sortear();
      atual = { n, m: PECAS[n].m.map((l) => l.slice()), x: 3 + (n === 'O' ? 1 : 0), y: n === 'I' ? -1 : 0 };
      if (bate(atual.m, atual.x, atual.y)) api.fim('Os blocos chegaram ao topo');
    }
    function bate(m, x, y) {
      for (let l = 0; l < m.length; l++) for (let c = 0; c < m[l].length; c++) {
        if (!m[l][c]) continue;
        const gx = x + c;
        const gy = y + l;
        if (gx < 0 || gx >= COLS || gy >= LINS) return true;
        if (gy >= 0 && grade[gy][gx]) return true;
      }
      return false;
    }
    function mover(dx) { if (!bate(atual.m, atual.x + dx, atual.y)) { atual.x += dx; api.som('batida'); return true; } return false; }
    function girar() {
      const m = girarMatriz(atual.m);
      for (const dx of [0, -1, 1, -2, 2]) if (!bate(m, atual.x + dx, atual.y)) { atual.m = m; atual.x += dx; api.som('pulo'); return; }
    }
    function fixar() {
      atual.m.forEach((l, i) => l.forEach((v, c) => { if (v && atual.y + i >= 0) grade[atual.y + i][atual.x + c] = PECAS[atual.n].cor; }));
      const cheias = [];
      grade.forEach((l, i) => { if (l.every(Boolean)) cheias.push(i); });
      if (cheias.length) {
        piscar = cheias; tPiscar = 0.25;
        const tabela = [0, 100, 300, 500, 800];
        api.pontuar(tabela[cheias.length] * nivel); api.som('linha');
        linhas += cheias.length; nivel = 1 + Math.floor(linhas / 10);
      } else api.som('batida');
      nova();
    }
    function limparLinhas() {
      for (const i of piscar.sort((a, b) => a - b)) { grade.splice(i, 1); grade.unshift(Array(COLS).fill(null)); }
      piscar = [];
    }
    function soltar() { let n = 0; while (!bate(atual.m, atual.x, atual.y + 1)) { atual.y++; n++; } api.pontuar(n * 2); fixar(); }
    function sombra() { let y = atual.y; while (!bate(atual.m, atual.x, y + 1)) y++; return y; }

    nova();

    function entrada(dt) {
      for (const lado of ['esq', 'dir']) {
        if (api.apertou(lado)) { mover(lado === 'esq' ? -1 : 1); repetir[lado] = -0.17; }
        else if (api.segurando(lado)) { repetir[lado] += dt; if (repetir[lado] > 0.05) { repetir[lado] = 0; mover(lado === 'esq' ? -1 : 1); } }
      }
      if (api.apertou('cima') || api.toque) girar();
      if (api.apertou('acao')) { soltar(); return; }
      const d = api.deslize;
      if (d === 'esq') { mover(-1); mover(-1); }
      if (d === 'dir') { mover(1); mover(1); }
      if (d === 'baixo') soltar();
      if (d === 'cima') girar();
    }

    return {
      atualizar(dt) {
        if (tPiscar > 0) { tPiscar -= dt; if (tPiscar <= 0) limparLinhas(); return; }
        entrada(dt);
        const intervalo = Math.max(0.06, 0.62 - (nivel - 1) * 0.055) * (api.segurando('baixo') ? 0.12 : 1);
        queda += dt;
        if (queda >= intervalo) {
          queda = 0;
          if (!bate(atual.m, atual.x, atual.y + 1)) { atual.y++; travar = 0; if (api.segurando('baixo')) api.pontuar(1); }
          else { travar += intervalo; if (travar > 0.25 || api.segurando('baixo')) { travar = 0; fixar(); } }
        }
      },
      desenhar(ctx, t) {
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, api.w, api.h);
        ctx.strokeStyle = 'rgba(77,124,255,0.55)'; ctx.lineWidth = 1; ctx.strokeRect(X0 - 1.5, Y0 - 1.5, COLS * T + 3, LINS * T + 3);
        grade.forEach((l, i) => l.forEach((cor, c) => {
          if (!cor) return;
          ctx.fillStyle = piscar.includes(i) && Math.floor(t * 20) % 2 ? '#ffffff' : cor;
          ctx.fillRect(X0 + c * T + 0.5, Y0 + i * T + 0.5, T - 1, T - 1);
        }));
        if (atual && tPiscar <= 0) {
          const ys = sombra();
          ctx.fillStyle = 'rgba(255,255,255,0.18)';
          atual.m.forEach((l, i) => l.forEach((v, c) => { if (v && ys + i >= 0) ctx.fillRect(X0 + (atual.x + c) * T + 0.5, Y0 + (ys + i) * T + 0.5, T - 1, T - 1); }));
          ctx.fillStyle = PECAS[atual.n].cor;
          atual.m.forEach((l, i) => l.forEach((v, c) => { if (v && atual.y + i >= 0) ctx.fillRect(X0 + (atual.x + c) * T + 0.5, Y0 + (atual.y + i) * T + 0.5, T - 1, T - 1); }));
        }
        const px = 80;
        const py = 10;
        const p = PECAS[proxima];
        ctx.strokeStyle = 'rgba(201,168,76,0.6)'; ctx.strokeRect(px - 2, py - 2, 30, 26);
        ctx.fillStyle = p.cor;
        p.m.forEach((l, i) => l.forEach((v, c) => { if (v) ctx.fillRect(px + 2 + c * 5.5, py + 4 + i * 5.5, 5, 5); }));
        ctx.fillStyle = 'rgba(201,168,76,0.75)';
        for (let i = 0; i < Math.min(nivel, 10); i++) ctx.fillRect(px - 1 + i * 3, py + 30, 2, 6);
        ctx.fillStyle = 'rgba(77,124,255,0.6)';
        for (let i = 0; i < linhas % 10; i++) ctx.fillRect(px - 1 + i * 3, py + 40, 2, 3);
      },
    };
  },
};
