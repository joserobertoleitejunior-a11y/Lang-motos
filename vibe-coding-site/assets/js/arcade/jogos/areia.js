/** Areia de letras: um brinquedo. Desenhe com areia, água e pedra e veja tudo cair. */
const VAZIO = 0;
const AREIA = 1;
const AGUA = 2;
const PEDRA = 3;

export default {
  id: 'areia', nome: 'Areia de letras', cor: '#e4c97e', w: 160, h: 100,
  desc: 'Sem pontos e sem pressa. Desenhe e veja as letras caírem.',
  dica: 'Clique e arraste para desenhar', dicaToque: 'Arraste o dedo para desenhar',
  pad: [],
  ferramentas: [
    { id: 'areia', nome: 'Areia', cor: '#e4c97e' }, { id: 'agua', nome: 'Água', cor: '#3fd6ff' },
    { id: 'pedra', nome: 'Pedra', cor: '#9aa0aa' }, { id: 'apagar', nome: 'Apagar', cor: '#ff5a5a' },
  ],
  criar(api) {
    const W = api.w;
    const H = api.h;
    const mat = new Uint8Array(W * H);
    const tom = new Uint8Array(W * H);
    const img = new ImageData(W, H);
    const tela = document.createElement('canvas'); tela.width = W; tela.height = H;
    const tctx = tela.getContext('2d');
    let par = false;
    let ultimo = null;
    let auto = 3;
    // um morrinho inicial para mostrar o que acontece
    for (let x = 30; x < 130; x++) { const h = Math.round(6 + 6 * Math.sin(x / 9)); for (let y = H - h; y < H; y++) { mat[y * W + x] = AREIA; tom[y * W + x] = (Math.random() * 60) | 0; } }
    for (let x = 60; x < 100; x++) mat[(H - 30) * W + x] = PEDRA;
    api.aviso('Desenhe na tela');

    const tipo = () => ({ areia: AREIA, agua: AGUA, pedra: PEDRA, apagar: VAZIO })[api.ferramenta] ?? AREIA;
    function pincel(cx, cy) {
      const r = api.ferramenta === 'apagar' ? 5 : 3;
      const t = tipo();
      for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) {
        if (x * x + y * y > r * r) continue;
        const px = (cx + x) | 0;
        const py = (cy + y) | 0;
        if (px < 0 || py < 0 || px >= W || py >= H) continue;
        const i = py * W + px;
        if (t === VAZIO || mat[i] === VAZIO || t === PEDRA) {
          if ((t === AREIA || t === AGUA) && Math.random() < 0.45) continue;
          mat[i] = t; tom[i] = (Math.random() * 60) | 0;
        }
      }
    }
    function trocar(a, b) { const m = mat[a]; mat[a] = mat[b]; mat[b] = m; const t = tom[a]; tom[a] = tom[b]; tom[b] = t; }

    function passo() {
      par = !par;
      for (let y = H - 2; y >= 0; y--) {
        for (let k = 0; k < W; k++) {
          const x = par ? k : W - 1 - k;
          const i = y * W + x;
          const m = mat[i];
          if (m !== AREIA && m !== AGUA) continue;
          const abaixo = i + W;
          if (mat[abaixo] === VAZIO || (m === AREIA && mat[abaixo] === AGUA)) { trocar(i, abaixo); continue; }
          const d = Math.random() < 0.5 ? -1 : 1;
          for (const s of [d, -d]) {
            const nx = x + s; if (nx < 0 || nx >= W) continue;
            const j = abaixo + s;
            if (mat[j] === VAZIO || (m === AREIA && mat[j] === AGUA)) { trocar(i, j); break; }
            if (m === AGUA && mat[i + s] === VAZIO) { trocar(i, i + s); break; }
          }
        }
      }
    }

    return {
      atualizar() {
        const p = api.ponteiro;
        if (p.baixo && p.dentro) {
          api.aviso('');
          if (ultimo) { const passos = Math.ceil(Math.hypot(p.x - ultimo.x, p.y - ultimo.y) / 2) || 1; for (let s = 1; s <= passos; s++) pincel(ultimo.x + ((p.x - ultimo.x) * s) / passos, ultimo.y + ((p.y - ultimo.y) * s) / passos); }
          else pincel(p.x, p.y);
          ultimo = { x: p.x, y: p.y };
        } else ultimo = null;
        if (auto > 0) { auto -= 1 / 60; if (Math.random() < 0.6) { mat[2 * W + 40 + ((Math.random() * 6) | 0)] = AREIA; mat[2 * W + 118 + ((Math.random() * 6) | 0)] = AGUA; } }
        passo();
        let somado = 0; for (let i = 0; i < mat.length; i += 7) if (mat[i]) somado++;
        if (api.pontos !== somado) api.pontuar(somado - api.pontos);
      },
      desenhar(ctx) {
        const d = img.data;
        for (let i = 0; i < mat.length; i++) {
          const m = mat[i];
          const o = i * 4;
          const t = tom[i];
          if (m === AREIA) { d[o] = 228 - t; d[o + 1] = 190 - t; d[o + 2] = 100 - t; }
          else if (m === AGUA) { d[o] = 40; d[o + 1] = 150 + t; d[o + 2] = 255; }
          else if (m === PEDRA) { d[o] = 150 + t; d[o + 1] = 155 + t; d[o + 2] = 165 + t; }
          else { d[o] = 0; d[o + 1] = 0; d[o + 2] = 0; }
          d[o + 3] = 255;
        }
        tctx.putImageData(img, 0, 0);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tela, 0, 0, W, H);
        ctx.imageSmoothingEnabled = true;
      },
    };
  },
};
