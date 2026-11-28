/**
 * VCP Arcade — jogos clássicos desenhados com letras.
 * Monta a caixa do arcade dentro de um elemento, cuida de entrada (teclado,
 * mouse, toque e botões na tela), laço de jogo, recordes e som.
 */
import { criarLetras, prepararFonte } from '../letras.js';
import { desenharCubo } from '../cubo.js';
import cobrinha from './jogos/cobrinha.js';
import quebraBlocos from './jogos/quebra-blocos.js';
import voo from './jogos/voo.js';
import pong from './jogos/pong.js';
import invasores from './jogos/invasores.js';
import blocos from './jogos/blocos.js';
import areia from './jogos/areia.js';

export const JOGOS = [cobrinha, quebraBlocos, voo, blocos, invasores, pong, areia];

const TECLAS = {
  ArrowLeft: 'esq', KeyA: 'esq', ArrowRight: 'dir', KeyD: 'dir', ArrowUp: 'cima', KeyW: 'cima',
  ArrowDown: 'baixo', KeyS: 'baixo', Space: 'acao', Enter: 'acao', KeyX: 'acao2', KeyZ: 'acao2',
};
const ROTULOS = { esq: '◀', dir: '▶', cima: '▲', baixo: '▼', acao: 'A', acao2: 'B' };

function ler(chave, padrao) { try { const v = localStorage.getItem(chave); return v ? JSON.parse(v) : padrao; } catch { return padrao; } }
function gravar(chave, valor) { try { localStorage.setItem(chave, JSON.stringify(valor)); } catch { /* sem armazenamento */ } }

function el(tag, classe, html) { const e = document.createElement(tag); if (classe) e.className = classe; if (html !== undefined) e.innerHTML = html; return e; }

/* ---------- som (WebAudio, só depois de um toque) ---------- */
function criarSom() {
  let ctx = null;
  let mudo = ler('vcp-arcade-mudo', false);
  const tabela = {
    ponto: [880, 0.07, 'square', 0.05], batida: [330, 0.04, 'square', 0.04], pulo: [520, 0.08, 'triangle', 0.06],
    tiro: [1200, 0.05, 'sawtooth', 0.03], explosao: [90, 0.25, 'sawtooth', 0.06], perdeu: [140, 0.45, 'triangle', 0.08],
    linha: [660, 0.18, 'square', 0.05], inicio: [440, 0.12, 'triangle', 0.05],
  };
  return {
    acordar() { if (!ctx) { const C = window.AudioContext || window.webkitAudioContext; if (C) ctx = new C(); } if (ctx && ctx.state === 'suspended') ctx.resume(); },
    tocar(tipo) {
      if (mudo || !ctx) return;
      const t = tabela[tipo] || tabela.ponto;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = t[2]; o.frequency.setValueAtTime(t[0], ctx.currentTime);
      if (tipo === 'perdeu' || tipo === 'explosao') o.frequency.exponentialRampToValueAtTime(Math.max(40, t[0] * 0.4), ctx.currentTime + t[1]);
      if (tipo === 'linha') o.frequency.exponentialRampToValueAtTime(t[0] * 2, ctx.currentTime + t[1]);
      g.gain.setValueAtTime(t[3], ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t[1]);
      o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + t[1] + 0.02);
    },
    get mudo() { return mudo; },
    alternar() { mudo = !mudo; gravar('vcp-arcade-mudo', mudo); return mudo; },
  };
}

/* ---------- entrada ---------- */
function criarEntrada() {
  const segurando = new Set();
  const novos = new Set();
  const ponteiro = { x: 0, y: 0, baixo: false, apertou: false, soltou: false, dentro: false, mexeu: false };
  let deslize = null;
  let toque = false;
  return {
    segurando, novos, ponteiro,
    apertar(n) { if (!segurando.has(n)) novos.add(n); segurando.add(n); },
    soltar(n) { segurando.delete(n); },
    deslizou(d) { deslize = d; },
    tocou() { toque = true; },
    api: {
      segurando: (n) => segurando.has(n),
      apertou: (n) => novos.has(n),
      get deslize() { return deslize; },
      get toque() { return toque; },
      ponteiro,
    },
    limpar() { novos.clear(); deslize = null; toque = false; ponteiro.apertou = false; ponteiro.soltou = false; ponteiro.mexeu = false; },
    zerar() { segurando.clear(); novos.clear(); },
  };
}

function montarDom(raiz, som) {
  raiz.classList.add('arc');
  raiz.innerHTML = `
    <div class="arc-topo">
      <span class="arc-marca"><i class="arc-led"></i><i class="arc-led"></i><i class="arc-led"></i><b>VCP ARCADE</b><span class="arc-nome">escolha um jogo</span></span>
      <span class="arc-ctrl">
        <button type="button" class="arc-bt" data-acao="menor" aria-label="Letras menores">A−</button>
        <button type="button" class="arc-bt" data-acao="maior" aria-label="Letras maiores">A+</button>
        <button type="button" class="arc-bt" data-acao="cru" aria-pressed="false" title="Ver o desenho sem letras">sem letras</button>
        <button type="button" class="arc-bt" data-acao="som" aria-pressed="${!som.mudo}">${som.mudo ? 'som: off' : 'som: on'}</button>
        <button type="button" class="arc-bt" data-acao="cheia" aria-label="Tela cheia">⛶</button>
      </span>
    </div>
    <div class="arc-tela">
      <canvas class="arc-letras" aria-hidden="true"></canvas>
      <canvas class="arc-cru" aria-hidden="true" hidden></canvas>
      <div class="arc-camada arc-menu" role="menu" aria-label="Jogos"></div>
      <div class="arc-camada arc-pausa" hidden><p class="arc-titulo">Pausado</p><div class="arc-linha"><button type="button" class="arc-grande" data-acao="continuar">Continuar</button><button type="button" class="arc-grande sec" data-acao="menu">Trocar de jogo</button></div></div>
      <div class="arc-camada arc-fim" hidden></div>
      <p class="arc-aviso" aria-live="polite"></p>
      <div class="arc-ferramentas" hidden></div>
    </div>
    <div class="arc-hud"><span class="arc-dados">—</span><span class="arc-dica"></span></div>
    <div class="arc-pad" hidden></div>`;
  return {
    letras: raiz.querySelector('.arc-letras'), cru: raiz.querySelector('.arc-cru'), tela: raiz.querySelector('.arc-tela'),
    menu: raiz.querySelector('.arc-menu'), pausa: raiz.querySelector('.arc-pausa'), fim: raiz.querySelector('.arc-fim'),
    aviso: raiz.querySelector('.arc-aviso'), dados: raiz.querySelector('.arc-dados'), dica: raiz.querySelector('.arc-dica'),
    nome: raiz.querySelector('.arc-nome'), pad: raiz.querySelector('.arc-pad'), ferramentas: raiz.querySelector('.arc-ferramentas'),
    btSom: raiz.querySelector('[data-acao="som"]'), btCru: raiz.querySelector('[data-acao="cru"]'),
  };
}

/** Cena do menu: o cubo da Vibe Coding girando, desenhado em letras. */
function cenaMenu() {
  let ang = 0.5;
  let angX = 0.42;
  return {
    w: 200, h: 120,
    atualizar(dt, entrada) {
      const p = entrada.ponteiro;
      ang += dt * 0.5 + (p.dentro ? (p.x / 200 - 0.5) * dt * 1.6 : 0);
      angX = 0.42 + (p.dentro ? (p.y / 120 - 0.5) * 0.5 : Math.sin(ang * 0.7) * 0.08);
    },
    desenhar(ctx, w, h, t) {
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h);
      desenharCubo(ctx, { cx: w / 2, cy: h / 2 + 2, tamanho: h * 0.36, rotY: ang, rotX: angX, tempo: t, faces: ['IA', 'VCP', 'APPS', 'JOGUE', 'SITES', 'BOTS'] });
    },
  };
}

export async function criarArcade(raiz, opcoes = {}) {
  const som = criarSom();
  const dom = montarDom(raiz, som);
  await prepararFonte();
  const toqueGrosso = window.matchMedia('(pointer: coarse)').matches;
  const letras = criarLetras(dom.letras, { celula: opcoes.celula ?? (toqueGrosso ? 5 : 6), fundo: 0.8, corFundo: [0.36, 0.28, 0.1] });
  const fonte = dom.cru;
  const ctx = fonte.getContext('2d');
  const entrada = criarEntrada();
  const recordes = ler('vcp-arcade-recordes', {});

  let estado = 'menu';
  let jogoAtual = null;
  let instancia = null;
  let cena = cenaMenu();
  let pontos = 0;
  let vidas = null;
  let ferramenta = null;
  let mostrarCru = false;
  let visivel = true;
  let tempo = 0;
  let fps = 60;
  let acumFps = 0;
  let quadros = 0;
  const ESCALA = 3;

  /* ----- api entregue aos jogos ----- */
  const api = {
    get w() { return cena.w; }, get h() { return cena.h; },
    segurando: entrada.api.segurando, apertou: entrada.api.apertou,
    get deslize() { return entrada.api.deslize; }, get toque() { return entrada.api.toque; },
    ponteiro: entrada.ponteiro,
    get tempo() { return tempo; },
    get ferramenta() { return ferramenta; },
    pontuar(n) { pontos += n; },
    get pontos() { return pontos; },
    vidas(n) { vidas = n; },
    som: (t) => som.tocar(t),
    aviso(txt) { dom.aviso.textContent = txt || ''; dom.aviso.classList.toggle('on', !!txt); },
    fim(texto) { terminar(texto); },
  };

  /* ----- menu ----- */
  JOGOS.forEach((j, i) => {
    const b = el('button', 'arc-cartao', `<b>${j.nome}</b><span>${j.desc}</span><small>${j.dica}</small>`);
    b.type = 'button'; b.setAttribute('role', 'menuitem'); b.style.setProperty('--cor', j.cor);
    b.addEventListener('click', () => iniciar(i));
    dom.menu.appendChild(b);
  });

  function montarPad(j) {
    dom.pad.innerHTML = '';
    const botoes = j.pad || [];
    dom.pad.hidden = !toqueGrosso || botoes.length === 0;
    for (const nome of botoes) {
      const b = el('button', `arc-pad-bt pad-${nome}`, ROTULOS[nome] || nome);
      b.type = 'button'; b.setAttribute('aria-label', nome);
      const solta = (e) => { e.preventDefault(); entrada.soltar(nome); };
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); som.acordar(); entrada.apertar(nome); });
      b.addEventListener('pointerup', solta); b.addEventListener('pointercancel', solta); b.addEventListener('pointerleave', solta);
      dom.pad.appendChild(b);
    }
    dom.ferramentas.innerHTML = '';
    dom.ferramentas.hidden = !j.ferramentas;
    if (j.ferramentas) {
      ferramenta = j.ferramentas[0].id;
      for (const f of j.ferramentas) {
        const b = el('button', 'arc-chip', f.nome); b.type = 'button'; b.dataset.id = f.id; b.style.setProperty('--cor', f.cor);
        b.setAttribute('aria-pressed', String(f.id === ferramenta));
        b.addEventListener('click', (e) => { e.stopPropagation(); ferramenta = f.id; dom.ferramentas.querySelectorAll('.arc-chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.id === f.id))); });
        dom.ferramentas.appendChild(b);
      }
    }
  }

  function iniciar(i) {
    som.acordar(); som.tocar('inicio');
    jogoAtual = JOGOS[i];
    cena = { w: jogoAtual.w, h: jogoAtual.h };
    pontos = 0; vidas = null; api.aviso('');
    entrada.zerar();
    montarPad(jogoAtual);
    instancia = jogoAtual.criar(api);
    estado = 'jogando';
    dom.menu.hidden = true; dom.pausa.hidden = true; dom.fim.hidden = true;
    dom.nome.textContent = jogoAtual.nome;
    dom.dica.textContent = toqueGrosso ? jogoAtual.dicaToque || jogoAtual.dica : jogoAtual.dica;
    raiz.focus({ preventScroll: true });
    opcoes.aoIniciar?.(jogoAtual.id);
  }

  function voltarMenu() {
    estado = 'menu'; jogoAtual = null; instancia = null; cena = cenaMenu();
    dom.menu.hidden = false; dom.pausa.hidden = true; dom.fim.hidden = true; dom.pad.hidden = true; dom.ferramentas.hidden = true;
    dom.nome.textContent = 'escolha um jogo'; dom.dica.textContent = ''; api.aviso('');
  }

  function pausar() { if (estado !== 'jogando') return; estado = 'pausado'; dom.pausa.hidden = false; entrada.zerar(); }
  function continuar() { if (estado !== 'pausado') return; estado = 'jogando'; dom.pausa.hidden = true; raiz.focus({ preventScroll: true }); }

  function terminar(texto) {
    if (estado !== 'jogando') return;
    estado = 'fim';
    som.tocar('perdeu');
    const id = jogoAtual.id;
    const antes = recordes[id] || 0;
    const novo = pontos > antes;
    if (novo) { recordes[id] = pontos; gravar('vcp-arcade-recordes', recordes); }
    dom.fim.innerHTML = `<p class="arc-titulo">${texto || 'Fim de jogo'}</p>
      <p class="arc-placar"><b>${pontos}</b> pontos ${novo && pontos > 0 ? '<em>novo recorde!</em>' : `<span>recorde ${Math.max(antes, pontos)}</span>`}</p>
      <div class="arc-linha"><button type="button" class="arc-grande" data-acao="denovo">Jogar de novo</button><button type="button" class="arc-grande sec" data-acao="menu">Outro jogo</button><button type="button" class="arc-grande sec" data-acao="desafiar">Desafiar um amigo</button></div>`;
    dom.fim.hidden = false;
    opcoes.aoTerminar?.(id, pontos);
  }

  async function desafiar() {
    const texto = `Fiz ${pontos} pontos no ${jogoAtual?.nome || 'VCP Arcade'} feito só com letras pela Vibe Coding Process. Duvido você bater:`;
    const url = location.href.split('#')[0] + '#arcade';
    try {
      if (navigator.share) { await navigator.share({ title: 'VCP Arcade', text: texto, url }); return; }
      await navigator.clipboard.writeText(`${texto} ${url}`);
      api.aviso('Link copiado. Cole no WhatsApp ou no direct.');
    } catch { api.aviso(url); }
  }

  /* ----- cliques nos botões da caixa ----- */
  raiz.addEventListener('click', (e) => {
    const b = e.target.closest('[data-acao]'); if (!b) return;
    const a = b.dataset.acao;
    if (a === 'continuar') continuar();
    else if (a === 'menu') voltarMenu();
    else if (a === 'denovo') iniciar(JOGOS.indexOf(jogoAtual));
    else if (a === 'desafiar') desafiar();
    else if (a === 'som') { const m = som.alternar(); som.acordar(); b.textContent = m ? 'som: off' : 'som: on'; b.setAttribute('aria-pressed', String(!m)); }
    else if (a === 'menor') letras.definirCelula(Math.max(4, letras.celula - 1));
    else if (a === 'maior') letras.definirCelula(Math.min(12, letras.celula + 1));
    else if (a === 'cru') { mostrarCru = !mostrarCru; dom.cru.hidden = !mostrarCru; b.setAttribute('aria-pressed', String(mostrarCru)); b.textContent = mostrarCru ? 'com letras' : 'sem letras'; posicionarCru(); }
    else if (a === 'cheia') { const f = raiz.requestFullscreen || raiz.webkitRequestFullscreen; if (document.fullscreenElement) document.exitFullscreen?.(); else f?.call(raiz)?.catch?.(() => {}); }
  });

  /* ----- teclado ----- */
  raiz.tabIndex = 0;
  raiz.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' || e.code === 'KeyP') { if (estado === 'jogando') pausar(); else if (estado === 'pausado') continuar(); e.preventDefault(); return; }
    const n = TECLAS[e.code];
    if (!n || estado !== 'jogando') return;
    e.preventDefault(); som.acordar(); entrada.apertar(n);
  });
  raiz.addEventListener('keyup', (e) => { const n = TECLAS[e.code]; if (n) entrada.soltar(n); });
  raiz.addEventListener('blur', () => entrada.zerar());

  /* ----- ponteiro e gestos dentro da tela ----- */
  let vista = { x: 0, y: 0, w: 1, h: 1 };
  let inicioToque = null;
  function paraJogo(e) {
    const r = dom.letras.getBoundingClientRect();
    return { x: ((e.clientX - r.left - vista.x) / vista.w) * cena.w, y: ((e.clientY - r.top - vista.y) / vista.h) * cena.h, lx: e.clientX - r.left, ly: e.clientY - r.top };
  }
  dom.letras.addEventListener('pointerdown', (e) => {
    som.acordar();
    const p = paraJogo(e);
    Object.assign(entrada.ponteiro, { x: p.x, y: p.y, baixo: true, apertou: true, dentro: true, mexeu: true });
    inicioToque = { x: e.clientX, y: e.clientY, t: performance.now() };
    dom.letras.setPointerCapture?.(e.pointerId);
    letras.onda(p.lx, p.ly, 0.9, tempo);
    if (estado === 'jogando') raiz.focus({ preventScroll: true });
  });
  dom.letras.addEventListener('pointermove', (e) => {
    const p = paraJogo(e);
    Object.assign(entrada.ponteiro, { x: p.x, y: p.y, dentro: true, mexeu: true });
    if (!entrada.ponteiro.baixo && e.pointerType === 'mouse' && Math.random() < 0.08) letras.onda(p.lx, p.ly, 0.35, tempo);
  });
  const fimToque = (e) => {
    entrada.ponteiro.baixo = false; entrada.ponteiro.soltou = true;
    if (!inicioToque) return;
    const dx = e.clientX - inicioToque.x;
    const dy = e.clientY - inicioToque.y;
    const dist = Math.hypot(dx, dy);
    const dt = performance.now() - inicioToque.t;
    if (dist < 12 && dt < 350) entrada.tocou();
    else if (dist > 26) entrada.deslizou(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'dir' : 'esq') : (dy > 0 ? 'baixo' : 'cima'));
    inicioToque = null;
  };
  dom.letras.addEventListener('pointerup', fimToque);
  dom.letras.addEventListener('pointercancel', fimToque);
  dom.letras.addEventListener('pointerleave', () => { entrada.ponteiro.dentro = false; });

  /* ----- tamanho ----- */
  function calcularVista() {
    const W = dom.letras.clientWidth;
    const H = dom.letras.clientHeight;
    const margem = estado === 'menu' ? 0.92 : 0.96;
    const esc = Math.min((W * margem) / cena.w, (H * margem) / cena.h);
    const w = cena.w * esc;
    const h = cena.h * esc;
    vista = { x: (W - w) / 2, y: (H - h) / 2, w, h };
  }
  function posicionarCru() {
    if (!mostrarCru) return;
    Object.assign(dom.cru.style, { left: vista.x + 'px', top: vista.y + 'px', width: vista.w + 'px', height: vista.h + 'px' });
  }
  const ro = new ResizeObserver(() => { letras.redimensionar(); calcularVista(); posicionarCru(); });
  ro.observe(dom.letras);

  /* ----- pausa automática fora da tela ----- */
  new IntersectionObserver((ents) => { visivel = ents[0].isIntersecting; if (!visivel) pausar(); }, { threshold: 0.15 }).observe(raiz);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pausar(); });

  /* ----- laço ----- */
  let ultimo = performance.now();
  let acum = 0;
  const PASSO = 1 / 60;
  function laco(agora) {
    requestAnimationFrame(laco);
    if (!visivel) { ultimo = agora; return; }
    const dt = Math.min(0.1, (agora - ultimo) / 1000); ultimo = agora;
    tempo += dt; acumFps += dt; quadros++;
    if (acumFps >= 0.5) { fps = quadros / acumFps; acumFps = 0; quadros = 0; }
    if (estado === 'jogando') {
      acum += dt;
      let n = 0;
      while (acum >= PASSO && n < 5) { instancia.atualizar(PASSO); entrada.limpar(); acum -= PASSO; n++; }
      if (n === 5) acum = 0;
    } else if (estado === 'menu') { cena.atualizar(dt, entrada); entrada.limpar(); }
    else entrada.limpar();
    desenharQuadro();
  }

  function desenharQuadro() {
    const w = cena.w * ESCALA;
    const h = cena.h * ESCALA;
    if (fonte.width !== w || fonte.height !== h) { fonte.width = w; fonte.height = h; calcularVista(); posicionarCru(); }
    ctx.setTransform(ESCALA, 0, 0, ESCALA, 0, 0);
    ctx.imageSmoothingEnabled = true;
    if (estado === 'menu') cena.desenhar(ctx, cena.w, cena.h, tempo);
    else if (instancia) instancia.desenhar(ctx, tempo);
    letras.desenhar(fonte, vista, tempo);
    const rec = jogoAtual ? Math.max(recordes[jogoAtual.id] || 0, pontos) : 0;
    const cor = vidas !== null ? `   VIDAS ${'♥'.repeat(Math.max(0, vidas))}` : '';
    dom.dados.textContent = jogoAtual
      ? `${jogoAtual.nome.toUpperCase()}   PONTOS ${pontos}   RECORDE ${rec}${cor}   ${Math.round(fps)} fps   ${letras.info.letras.toLocaleString('pt-BR')} letras`
      : `MENU   ${Math.round(fps)} fps   ${letras.info.letras.toLocaleString('pt-BR')} letras   ${letras.info.colunas}×${letras.info.linhas}`;
  }

  calcularVista();
  requestAnimationFrame(laco);
  voltarMenu();
  return { iniciar, voltarMenu, pausar, continuar, get estado() { return estado; }, get pontos() { return pontos; }, letras, jogos: JOGOS };
}
