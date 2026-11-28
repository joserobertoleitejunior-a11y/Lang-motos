/**
 * O cubo dourado da Vibe Coding Process, desenhado em canvas 2D
 * (depois o motor de letras transforma o desenho em caracteres).
 */

const VERTICES = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];
// cada face: cantos na ordem de leitura vistos de fora (sup. esq., sup. dir., inf. dir., inf. esq.)
const FACES = [
  [5, 4, 7, 6], // z+
  [0, 1, 2, 3], // z- (a que começa virada para a câmera)
  [4, 0, 3, 7], // x-
  [1, 5, 6, 2], // x+
  [4, 5, 1, 0], // topo (y-)
  [3, 2, 6, 7], // base (y+)
];
const ARESTAS = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];

function girar([x, y, z], ry, rx) {
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx];
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{cx:number, cy:number, tamanho:number, rotY:number, rotX:number, tempo?:number, faces?:string[], ouro?:string, brilho?:number}} o
 */
export function desenharCubo(ctx, o) {
  const dist = 4.2;
  const ouro = o.ouro || '#e4c97e';
  const pts3 = VERTICES.map((v) => girar(v, o.rotY, o.rotX));
  const pts = pts3.map(([x, y, z]) => {
    const s = (o.tamanho * dist) / (z + dist);
    return [o.cx + x * s, o.cy + y * s];
  });
  const faces = FACES.map((f, i) => {
    const [a, b, c] = f.map((k) => pts[k]);
    const giro = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
    const zMedio = f.reduce((s, k) => s + pts3[k][2], 0) / 4;
    return { f, i, frente: giro > 0, z: zMedio };
  }).sort((p, q) => q.z - p.z);

  ctx.save();
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';

  // faces de trás: só o contorno, apagado
  for (const face of faces) {
    if (face.frente) continue;
    caminho(ctx, face.f, pts);
    ctx.strokeStyle = 'rgba(201,168,76,0.35)'; ctx.lineWidth = o.tamanho * 0.02; ctx.stroke();
  }
  // faces da frente: véu dourado, nome e contorno brilhante
  for (const face of faces) {
    if (!face.frente) continue;
    caminho(ctx, face.f, pts);
    ctx.fillStyle = 'rgba(201,168,76,0.025)'; ctx.fill();
    const rotulo = o.faces?.[face.i];
    if (rotulo) rotuloNaFace(ctx, face.f.map((k) => pts[k]), rotulo, ouro);
  }
  ctx.strokeStyle = 'rgba(201,168,76,0.28)'; ctx.lineWidth = o.tamanho * 0.11;
  for (const [a, b] of ARESTAS) linha(ctx, pts[a], pts[b]);
  ctx.strokeStyle = ouro; ctx.lineWidth = o.tamanho * 0.035;
  for (const face of faces) if (face.frente) { caminho(ctx, face.f, pts); ctx.stroke(); }

  // faíscas orbitando
  const t = o.tempo || 0;
  for (let i = 0; i < 7; i++) {
    const a = t * (0.4 + i * 0.07) + i * 0.9;
    const r = o.tamanho * (1.55 + 0.12 * Math.sin(t + i));
    const x = o.cx + Math.cos(a) * r;
    const y = o.cy + Math.sin(a) * r * 0.42;
    ctx.fillStyle = i % 3 === 0 ? '#fff3d0' : 'rgba(228,201,126,0.85)';
    ctx.beginPath(); ctx.arc(x, y, o.tamanho * 0.035, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

function caminho(ctx, f, pts) {
  ctx.beginPath(); ctx.moveTo(pts[f[0]][0], pts[f[0]][1]);
  for (let k = 1; k < 4; k++) ctx.lineTo(pts[f[k]][0], pts[f[k]][1]);
  ctx.closePath();
}
function linha(ctx, a, b) { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }

/** Escreve o texto "colado" na face (transformação afim a partir de 3 cantos). */
function rotuloNaFace(ctx, cantos, texto, cor) {
  const [p0, p1, , p3] = cantos;
  ctx.save();
  ctx.transform((p1[0] - p0[0]) / 100, (p1[1] - p0[1]) / 100, (p3[0] - p0[0]) / 100, (p3[1] - p0[1]) / 100, p0[0], p0[1]);
  ctx.fillStyle = cor;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const tam = texto.length <= 2 ? 66 : texto.length <= 3 ? 52 : texto.length <= 5 ? 34 : 24;
  ctx.font = `900 ${tam}px "Barlow Condensed", "Arial Narrow", sans-serif`;
  ctx.fillText(texto, 50, 53);
  ctx.restore();
}
