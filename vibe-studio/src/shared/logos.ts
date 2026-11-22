/**
 * Criador de logotipos em SVG (vetorial, sem IA): monograma, nome, emblema e horizontal.
 * Gera variações a partir do nome, do segmento e das cores. Quando houver chave de
 * imagem (OpenAI/Gemini), o app também poderá gerar logos por IA.
 */
export type FonteLogo = { id: string; nome: string; familia: string; peso: number; arquivo: string; largura: number };
export const FONTES_LOGO: FonteLogo[] = [
  { id: 'bricolage', nome: 'Bricolage', familia: 'Bricolage Grotesque', peso: 800, arquivo: 'bricolage-grotesque-latin-800-normal.woff2', largura: 0.56 },
  { id: 'anton', nome: 'Anton', familia: 'Anton', peso: 400, arquivo: 'anton-latin-400-normal.woff2', largura: 0.43 },
  { id: 'playfair', nome: 'Playfair', familia: 'Playfair Display', peso: 700, arquivo: 'playfair-display-latin-700-normal.woff2', largura: 0.58 },
  { id: 'fredoka', nome: 'Fredoka', familia: 'Fredoka', peso: 700, arquivo: 'fredoka-latin-700-normal.woff2', largura: 0.56 },
  { id: 'nunito', nome: 'Nunito', familia: 'Nunito', peso: 800, arquivo: 'nunito-latin-800-normal.woff2', largura: 0.56 },
  { id: 'inter', nome: 'Inter', familia: 'Inter', peso: 800, arquivo: 'inter-latin-800-normal.woff2', largura: 0.6 },
  { id: 'caveat', nome: 'Caveat', familia: 'Caveat', peso: 700, arquivo: 'caveat-latin-700-normal.woff2', largura: 0.4 },
];

export type IconeId = 'engrenagem' | 'chave' | 'tesoura' | 'casa' | 'folha' | 'raio' | 'coroa' | 'diamante' | 'pino' | 'sacola' | 'escudo' | 'nenhum';
type DefIcone = { nome: string; d: string; modo: 'fill' | 'stroke'; regra?: 'evenodd' };

function engrenagem(): string {
  const pts: string[] = [];
  const n = 8;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2;
    const passo = (Math.PI * 2) / n;
    for (const [da, r] of [[-0.28, 8.2], [-0.16, 11], [0.16, 11], [0.28, 8.2]] as const) {
      const a = a0 + da * passo * 1.7;
      pts.push(`${(12 + Math.cos(a) * r).toFixed(2)} ${(12 + Math.sin(a) * r).toFixed(2)}`);
    }
  }
  return `M${pts.join('L')}ZM12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2z`;
}

export const ICONES: Record<Exclude<IconeId, 'nenhum'>, DefIcone> = {
  engrenagem: { nome: 'Engrenagem', d: engrenagem(), modo: 'fill', regra: 'evenodd' },
  chave: { nome: 'Chave inglesa', d: 'M14.7 6.3a4 4 0 0 0-5.4 5l-6 6a2 2 0 0 0 2.8 2.8l6-6a4 4 0 0 0 5-5.4l-2.5 2.5-2.3-.6-.6-2.3z', modo: 'fill' },
  tesoura: { nome: 'Tesoura', d: 'M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM8.1 8.1L20 19M8.1 15.9L20 5', modo: 'stroke' },
  casa: { nome: 'Casa', d: 'M3 11l9-8 9 8v10h-6v-6H9v6H3z', modo: 'fill' },
  folha: { nome: 'Folha', d: 'M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19l8-8', modo: 'stroke' },
  raio: { nome: 'Raio', d: 'M13 2L4 14h7l-1 8 9-12h-7z', modo: 'fill' },
  coroa: { nome: 'Coroa', d: 'M3 18h18l1-11-5 4-5-7-5 7-5-4z', modo: 'fill' },
  diamante: { nome: 'Diamante', d: 'M6 3h12l4 6-10 12L2 9z', modo: 'fill' },
  pino: { nome: 'Local', d: 'M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', modo: 'fill', regra: 'evenodd' },
  sacola: { nome: 'Sacola', d: 'M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2', modo: 'stroke' },
  escudo: { nome: 'Escudo', d: 'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z', modo: 'fill' },
};

export const SEGMENTOS_LOGO: { id: string; nome: string; icones: IconeId[] }[] = [
  { id: 'oficina', nome: 'Oficina, peças e mecânica', icones: ['engrenagem', 'chave', 'raio'] },
  { id: 'beleza', nome: 'Barbearia, salão e estética', icones: ['tesoura', 'coroa', 'diamante'] },
  { id: 'comercio', nome: 'Loja e comércio em geral', icones: ['sacola', 'diamante', 'pino'] },
  { id: 'casa', nome: 'Construção, reformas e imóveis', icones: ['casa', 'escudo', 'chave'] },
  { id: 'natureza', nome: 'Natureza, saúde e bem-estar', icones: ['folha', 'escudo', 'pino'] },
  { id: 'servicos', nome: 'Serviços e tecnologia', icones: ['raio', 'escudo', 'engrenagem'] },
];

export type Paleta3 = { fundo: string; principal: string; detalhe: string };
export const PALETAS_LOGO: Paleta3[] = [
  { fundo: '#FFFFFF', principal: '#0B1020', detalhe: '#FF6A00' },
  { fundo: '#FFFFFF', principal: '#1747FF', detalhe: '#FFB400' },
  { fundo: '#111111', principal: '#F5F5F5', detalhe: '#E5322D' },
  { fundo: '#FFFFFF', principal: '#0F5132', detalhe: '#D4A017' },
  { fundo: '#F8F3EA', principal: '#4A1D2E', detalhe: '#C08A3E' },
  { fundo: '#0B1020', principal: '#FFFFFF', detalhe: '#34D399' },
];

export type EstiloLogo = 'monograma' | 'nome' | 'emblema' | 'horizontal';
export type FormaLogo = 'circulo' | 'escudo' | 'quadrado' | 'hexagono';
export type LogoSpec = {
  nome: string; slogan: string; estilo: EstiloLogo; forma: FormaLogo; icone: IconeId;
  fonte: string; cores: Paleta3; fundoTransparente: boolean;
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const iniciais = (nome: string) => {
  const p = nome.trim().split(/\s+/).filter((w) => !/^(de|da|do|das|dos|e)$/i.test(w));
  return ((p[0]?.[0] ?? '') + (p.length > 1 ? p[1][0] : '')).toUpperCase() || '?';
};
const fonteDe = (id: string) => FONTES_LOGO.find((f) => f.id === id) ?? FONTES_LOGO[0];

function forma(f: FormaLogo, cx: number, cy: number, r: number, cor: string, traco?: string): string {
  const t = traco ? ` stroke="${traco}" stroke-width="${r * 0.06}"` : '';
  switch (f) {
    case 'escudo': {
      const w = r * 0.92;
      return `<path d="M${cx} ${cy - r}L${cx + w} ${cy - r * 0.72}V${cy + r * 0.05}C${cx + w} ${cy + r * 0.62} ${cx + w * 0.5} ${cy + r * 0.88} ${cx} ${cy + r}C${cx - w * 0.5} ${cy + r * 0.88} ${cx - w} ${cy + r * 0.62} ${cx - w} ${cy + r * 0.05}V${cy - r * 0.72}Z" fill="${cor}"${t}/>`;
    }
    case 'quadrado': return `<rect x="${cx - r * 0.9}" y="${cy - r * 0.9}" width="${r * 1.8}" height="${r * 1.8}" rx="${r * 0.28}" fill="${cor}"${t}/>`;
    case 'hexagono': {
      const pts = Array.from({ length: 6 }, (_, i) => { const a = (Math.PI / 3) * i - Math.PI / 2; return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`; }).join(' ');
      return `<polygon points="${pts}" fill="${cor}"${t}/>`;
    }
    default: return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${cor}"${t}/>`;
  }
}

function icone(id: IconeId, cx: number, cy: number, tam: number, cor: string): string {
  if (id === 'nenhum') return '';
  const d = ICONES[id];
  const k = tam / 24;
  const g = d.modo === 'fill'
    ? `<path d="${d.d}" fill="${cor}"${d.regra ? ` fill-rule="${d.regra}"` : ''}/>`
    : `<path d="${d.d}" fill="none" stroke="${cor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<g transform="translate(${cx - tam / 2} ${cy - tam / 2}) scale(${k})">${g}</g>`;
}

/** Escolhe o tamanho da fonte para o texto caber na largura (estimativa por fonte). */
function tamFonte(texto: string, f: FonteLogo, larguraMax: number, max: number): number {
  return Math.max(18, Math.min(max, larguraMax / (Math.max(3, texto.length) * f.largura)));
}

export function svgLogo(spec: LogoSpec): { svg: string; largura: number; altura: number } {
  const f = fonteDe(spec.fonte);
  const c = spec.cores;
  const nome = spec.nome.trim() || 'Seu nome';
  const fam = `font-family="'${f.familia}',sans-serif" font-weight="${f.peso}"`;
  let L = 400;
  let A = 400;
  let corpo = '';
  const slog = (x: number, y: number, tam: number, anchor: string, cor: string) => (spec.slogan.trim() ? `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="'Inter',sans-serif" font-weight="800" font-size="${tam}" letter-spacing="${tam * 0.22}" fill="${cor}">${esc(spec.slogan.trim().toUpperCase())}</text>` : '');

  if (spec.estilo === 'monograma') {
    L = 400; A = 400;
    const ini = iniciais(nome);
    corpo = forma(spec.forma, 200, 200, 185, c.principal) + forma(spec.forma, 200, 200, 160, 'none', c.detalhe)
      + `<text x="200" y="${200 + (ini.length > 1 ? 52 : 70)}" text-anchor="middle" ${fam} font-size="${ini.length > 1 ? 150 : 200}" fill="${c.fundo === c.principal ? c.detalhe : c.fundo}" letter-spacing="-4">${esc(ini)}</text>`;
  } else if (spec.estilo === 'nome') {
    L = 900; A = spec.slogan.trim() ? 300 : 240;
    const tam = tamFonte(nome, f, 800, 150);
    const y = 130 + tam * 0.3;
    corpo = `<text x="450" y="${y}" text-anchor="middle" ${fam} font-size="${tam}" fill="${c.principal}" letter-spacing="${-tam * 0.02}">${esc(nome)}</text><rect x="${450 - 70}" y="${y + 24}" width="140" height="10" rx="5" fill="${c.detalhe}"/>${slog(450, y + 74, 26, 'middle', c.principal)}`;
  } else if (spec.estilo === 'emblema') {
    L = 520; A = spec.slogan.trim() ? 640 : 590;
    corpo = forma(spec.forma, 260, 230, 200, c.principal) + forma(spec.forma, 260, 230, 172, 'none', c.detalhe)
      + icone(spec.icone === 'nenhum' ? 'escudo' : spec.icone, 260, 230, 190, c.detalhe);
    const tam = tamFonte(nome, f, 470, 84);
    corpo += `<text x="260" y="${470 + tam * 0.3}" text-anchor="middle" ${fam} font-size="${tam}" fill="${c.principal}" letter-spacing="${-tam * 0.02}">${esc(nome)}</text>${slog(260, 470 + tam * 0.3 + 46, 22, 'middle', c.principal)}`;
  } else {
    L = 1000; A = 280;
    corpo = forma(spec.forma, 140, 140, 124, c.principal) + (spec.icone === 'nenhum'
      ? `<text x="140" y="${140 + 46}" text-anchor="middle" ${fam} font-size="130" fill="${c.fundo === c.principal ? c.detalhe : c.fundo}">${esc(iniciais(nome)[0])}</text>`
      : icone(spec.icone, 140, 140, 124, c.detalhe));
    const tam = tamFonte(nome, f, 640, 120);
    corpo += `<text x="300" y="${140 + tam * 0.18 - (spec.slogan.trim() ? 14 : 0)}" ${fam} font-size="${tam}" fill="${c.principal}" letter-spacing="${-tam * 0.02}">${esc(nome)}</text>${slog(304, 140 + tam * 0.18 + 40, 24, 'start', c.principal)}`;
  }
  const fundoRect = spec.fundoTransparente ? '' : `<rect width="${L}" height="${A}" fill="${c.fundo}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L} ${A}" width="${L}" height="${A}">${fundoRect}${corpo}</svg>`;
  return { svg, largura: L, altura: A };
}

/** Variações variadas (estilos, formas, fontes e paletas) para o cliente escolher. */
export function variacoes(base: { nome: string; slogan: string; segmento: string; cores?: string[] }, n = 8, semente = 0): LogoSpec[] {
  const seg = SEGMENTOS_LOGO.find((s) => s.id === base.segmento) ?? SEGMENTOS_LOGO[2];
  const paletas = [...(base.cores && base.cores.length >= 2 ? [{ fundo: '#FFFFFF', principal: base.cores[0], detalhe: base.cores[1] }, { fundo: base.cores[0], principal: '#FFFFFF', detalhe: base.cores[1] }] : []), ...PALETAS_LOGO];
  const estilos: EstiloLogo[] = ['emblema', 'horizontal', 'monograma', 'nome', 'emblema', 'horizontal', 'monograma', 'nome'];
  const formas: FormaLogo[] = ['escudo', 'circulo', 'hexagono', 'quadrado'];
  const fontes = FONTES_LOGO.map((f) => f.id);
  const saida: LogoSpec[] = [];
  for (let i = 0; i < n; i++) {
    const k = i + semente * 3;
    saida.push({
      nome: base.nome, slogan: base.slogan, estilo: estilos[i % estilos.length], forma: formas[(k + 1) % formas.length],
      icone: seg.icones[k % seg.icones.length], fonte: fontes[(k * 2 + 1) % fontes.length], cores: paletas[k % paletas.length], fundoTransparente: false,
    });
  }
  return saida;
}
