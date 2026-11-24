import { type Projeto } from './config';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const el = <T extends HTMLElement>(tag: string, id?: string, cls?: string, html?: string): T => {
  const e = document.createElement(tag) as T; if (id) e.id = id; if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e;
};

export type Acoes = {
  modo(): void; voar(): void; tour(): void; codigo(): void; catalogo(i: number): void; sobrevoar(i: number): void;
  hora(h: number): void; vento(v: number): void; letras(px: number): void; autoHora(b: boolean): void; fechar(): void;
};

export function criarUI(app: HTMLElement, projetos: Projeto[], a: Acoes) {
  const hud = el('div', 'hud', '', '<b>VIBE CODING PROCESS</b><span id="hud1">carregando…</span>');
  const dock = el('div', 'dock');
  const btn = (txt: string, cls: string, fn: () => void, id?: string) => { const b = el<HTMLButtonElement>('button', id, 'bt vidro ' + cls, txt); b.onclick = (e) => { e.stopPropagation(); fn(); }; dock.appendChild(b); return b; };
  const bModo = btn('▦ ASCII', 'on', a.modo, 'bmodo');
  const bVoo = btn('✈ Voar', '', a.voar, 'bvoo');
  const bTour = btn('▶ Tour', '', a.tour, 'btour');
  const bLista = btn('▤ Quadros', '', () => alternar(lista), 'blista');
  const bAj = btn('☼ Ajustes', '', () => alternar(ajustes), 'baj');
  const bCod = btn('</> Código', '', a.codigo, 'bcod');

  const lista = el('div', 'lista', 'vidro');
  projetos.forEach((p, i) => {
    const b = el<HTMLButtonElement>('button', undefined, '', `<i style="background:${p.cor}"></i><span>${esc(p.titulo)}<small>${esc(p.tag)}</small></span>`);
    b.onclick = () => { lista.classList.remove('on'); a.catalogo(i); };
    lista.appendChild(b);
  });

  const ajustes = el('div', 'ajustes', 'vidro', `
    <label>HORA DO DIA · <span id="vh">08:12</span></label><input id="ih" type="range" min="0" max="24" step="0.05" value="8.2">
    <label>VENTO · <span id="vv">5 m/s</span></label><input id="iv" type="range" min="0" max="1" step="0.01" value="0.4">
    <label>TAMANHO DAS LETRAS (modo ASCII)</label><input id="il" type="range" min="6" max="16" step="1" value="9">
    <div class="lin"><button class="bt vidro" id="ba">⟳ Dia automático</button><button class="bt vidro" id="bn">☾ Noite</button><button class="bt vidro" id="bp">☀ Pôr do sol</button></div>`);

  const painel = el('div', 'painel', 'vidro', '');
  const dica = el('div', 'dica', 'vidro', 'Arraste para olhar · WASD mover · Shift correr · F voar · M modo · clique nos quadros');
  const codigo = el('div', 'codigo', 'vidro', '<header id="cabc">arquivo</header><pre id="precod"></pre>');
  const visor = el('div', 'visor', '', `<div class="topo"><b id="vtit"></b><a class="bt vidro ac" id="vabrir" target="_blank" rel="noopener noreferrer">Abrir em nova aba ↗</a><button class="bt vidro" id="vfechar">✕ Fechar</button></div><iframe id="vif" title="Projeto" referrerpolicy="no-referrer" loading="lazy"></iframe><small>Alguns sites bloqueiam exibição dentro de outra página. Se ficar em branco, use “Abrir em nova aba”.</small>`);
  const joy = el('div', 'joy', '', '<i></i>');
  const alt = el('div', 'alt', '', '');
  const bUp = el<HTMLButtonElement>('button', 'bup', 'bt vidro', '▲'); const bDn = el<HTMLButtonElement>('button', 'bdn', 'bt vidro', '▼');
  alt.append(bUp, bDn);
  const abertura = el('div', 'abertura', '', '<b>VIBE CODING PROCESS</b><em id="ab1">gerando o mundo em código…</em><div class="barra"><i id="abb"></i></div>');
  app.append(hud, dock, lista, ajustes, painel, dica, codigo, visor, joy, alt, abertura);

  function alternar(e: HTMLElement) { const on = !e.classList.contains('on'); lista.classList.remove('on'); ajustes.classList.remove('on'); if (on) e.classList.add('on'); }
  const g = (id: string) => document.getElementById(id)!;
  const hh = (h: number) => { const t = ((h % 24) + 24) % 24; return String(Math.floor(t)).padStart(2, '0') + ':' + String(Math.floor((t % 1) * 60)).padStart(2, '0'); };
  const ih = g('ih') as HTMLInputElement, iv = g('iv') as HTMLInputElement, il = g('il') as HTMLInputElement;
  ih.oninput = () => { a.autoHora(false); a.hora(+ih.value); g('vh').textContent = hh(+ih.value); };
  iv.oninput = () => a.vento(+iv.value);
  il.oninput = () => a.letras(+il.value);
  g('ba').onclick = () => a.autoHora(true);
  g('bn').onclick = () => { a.autoHora(false); ih.value = '23'; ih.oninput!(new Event('input')); };
  g('bp').onclick = () => { a.autoHora(false); ih.value = '18.1'; ih.oninput!(new Event('input')); };
  g('vfechar').onclick = () => { visor.classList.remove('on'); (g('vif') as HTMLIFrameElement).src = 'about:blank'; };

  let atual: Projeto | null = null;
  function abrirPainel(p: Projeto, i: number) {
    atual = p;
    const link = p.url ? `<a class="bt ac" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Abrir projeto ↗</a><button class="bt vidro" id="pver">Ver aqui</button>` : `<span class="bt vidro" style="cursor:default">Projeto em preparação</span>`;
    painel.innerHTML = `<button class="x" aria-label="Fechar">×</button><div class="tg" style="color:${p.cor}">${esc(p.tag)}</div><h2>${esc(p.titulo)}</h2><p>${esc(p.descricao)}</p><div class="ln">${link}<button class="bt vidro" id="pvoar">Voar até aqui</button></div>`;
    painel.classList.add('on');
    (painel.querySelector('.x') as HTMLElement).onclick = a.fechar;
    (painel.querySelector('#pvoar') as HTMLElement).onclick = () => a.sobrevoar(i);
    const pv = painel.querySelector('#pver') as HTMLElement | null;
    if (pv && p.url) pv.onclick = () => { g('vtit').textContent = p.titulo; (g('vabrir') as HTMLAnchorElement).href = p.url!; (g('vif') as HTMLIFrameElement).src = p.url!; visor.classList.add('on'); };
  }
  function fecharPainel() { painel.classList.remove('on'); atual = null; }

  return {
    hud1: g('hud1'), bModo, bVoo, bTour, bCod, bLista, bAj, abrirPainel, fecharPainel, painel, dica, codigo, joy, alt, bUp, bDn, abertura, il, ih, iv, lista, ajustes,
    get atual() { return atual; },
    hh, cabc: g('cabc'), precod: g('precod'),
    progresso(t: string, p: number) { g('ab1').textContent = t; (g('abb') as HTMLElement).style.width = Math.round(p * 100) + '%'; },
    fecharMenus() { lista.classList.remove('on'); ajustes.classList.remove('on'); },
    visorAberto() { return visor.classList.contains('on'); },
    fecharVisor() { (g('vfechar') as HTMLElement).click(); },
    sincHora(h: number) { ih.value = String(((h % 24) + 24) % 24); g('vh').textContent = hh(h); },
    sincVento(ms: number) { g('vv').textContent = ms.toFixed(1) + ' m/s'; },
  };
}

/** Colore um trecho de código TypeScript de forma simples. */
export function colorir(linhas: string[], ini = 1): string {
  const kw = /\b(const|let|function|return|if|else|for|of|export|import|from|new|type|as|while|switch|case|break|continue|void|number|boolean|string)\b/g;
  return linhas.map((l, i) => {
    let h = esc(l);
    const ci = h.indexOf('//');
    let com = '';
    if (ci >= 0) { com = `<span class="c">${h.slice(ci)}</span>`; h = h.slice(0, ci); }
    h = h.replace(/(&#39;[^&]*&#39;|'[^']*'|`[^`]*`)/g, '<span class="s">$1</span>').replace(kw, '<span class="k">$1</span>').replace(/\b(\d+\.?\d*)\b/g, '<span class="n">$1</span>');
    return `<span class="g">${String(i + ini).padStart(3, ' ')}  </span>${h}${com}`;
  }).join('\n');
}
