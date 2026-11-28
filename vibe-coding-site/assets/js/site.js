/** Comportamento do site: menu, portfólio, briefing pelo WhatsApp, cubo e arcade. */
import { CONTATO, linkWhatsApp, linkInstagram } from './config.js';
import { PROJETOS, GRUPOS } from './projetos.js';

const $ = (s, r = document) => r.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/* ---------- menu do celular ---------- */
function menu() {
  const bt = $('.menu-bt');
  const nav = $('#nav');
  bt.addEventListener('click', () => {
    const aberto = nav.classList.toggle('aberto');
    bt.setAttribute('aria-expanded', String(aberto));
    bt.textContent = aberto ? '✕' : '☰';
  });
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) { nav.classList.remove('aberto'); bt.setAttribute('aria-expanded', 'false'); bt.textContent = '☰'; } });
}

/* ---------- links de WhatsApp ---------- */
function whatsapp() {
  document.querySelectorAll('[data-zap]').forEach((a) => {
    const url = linkWhatsApp(a.dataset.zap);
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  });
  const canais = $('#canais');
  const itens = [];
  if (CONTATO.whatsapp) itens.push(`<a class="canal" href="${esc(linkWhatsApp('Olá, Jose Roberto! Vim pelo site da Vibe Coding Process.'))}" target="_blank" rel="noopener noreferrer"><small>WhatsApp</small><span>${esc(CONTATO.whatsappVisivel)}</span></a>`);
  const ig = linkInstagram();
  if (ig) itens.push(`<a class="canal" href="${esc(ig)}" target="_blank" rel="noopener noreferrer"><small>Instagram</small><span>@${esc(CONTATO.instagram)}</span></a>`);
  itens.push(`<div class="canal"><small>Onde</small><span>${esc(CONTATO.cidade)}</span></div>`);
  canais.innerHTML = itens.join('');
}

/* ---------- portfólio ---------- */
function portfolio() {
  const visiveis = PROJETOS.filter((p) => p.mostrar !== false);
  document.querySelectorAll('[data-total-projetos]').forEach((n) => { n.textContent = String(visiveis.length); });
  const grade = $('#grade-projetos');
  const filtros = $('#filtros');
  const grupos = GRUPOS.filter((g) => g.id === 'todos' || visiveis.some((p) => p.grupo === g.id));
  filtros.innerHTML = grupos.map((g, i) => `<button type="button" class="filtro" data-grupo="${g.id}" aria-pressed="${i === 0}">${esc(g.nome)}</button>`).join('');
  function desenhar(grupo) {
    const lista = visiveis.filter((p) => grupo === 'todos' || p.grupo === grupo);
    grade.innerHTML = lista.map((p) => `
      <article class="projeto">
        <figure><img src="assets/img/portfolio/${esc(p.imagem)}.jpg" alt="Página inicial do projeto ${esc(p.nome)}" loading="lazy" width="960" height="600"></figure>
        <div class="corpo">
          <span class="seg">${esc(p.segmento)}</span>
          <h3>${esc(p.nome)}</h3>
          <p>${esc(p.resumo)}</p>
          <div class="tags">${p.feito.map((f) => `<span>${esc(f)}</span>`).join('')}</div>
          <div class="abrir">
            ${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">Abrir projeto ↗</a>` : '<span class="breve">Link em breve</span>'}
            <span class="cidade">${esc(p.cidade)}</span>
          </div>
        </div>
      </article>`).join('');
  }
  filtros.addEventListener('click', (e) => {
    const b = e.target.closest('.filtro'); if (!b) return;
    filtros.querySelectorAll('.filtro').forEach((f) => f.setAttribute('aria-pressed', String(f === b)));
    desenhar(b.dataset.grupo);
  });
  desenhar('todos');
}

/* ---------- briefing: monta a mensagem e abre o WhatsApp ---------- */
export function montarMensagem(dados) {
  const linhas = ['Olá, Jose Roberto! Quero falar sobre um projeto.', ''];
  linhas.push(`*Nome:* ${dados.nome}`);
  if (dados.negocio) linhas.push(`*Negócio:* ${dados.negocio}`);
  if (dados.segmento) linhas.push(`*Segmento:* ${dados.segmento}`);
  if (dados.precisa.length) linhas.push(`*Preciso de:* ${dados.precisa.join(', ')}`);
  if (dados.mensagem) linhas.push('', dados.mensagem);
  linhas.push('', '(enviado pelo site da Vibe Coding Process)');
  return linhas.join('\n');
}

function briefing() {
  const form = $('#briefing');
  const erro = $('#b-erro');
  const botao = $('#b-enviar');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const dados = {
      nome: String(f.get('nome') || '').trim(), negocio: String(f.get('negocio') || '').trim(),
      segmento: String(f.get('segmento') || ''), precisa: f.getAll('precisa').map(String), mensagem: String(f.get('mensagem') || '').trim(),
    };
    if (!dados.nome) { erro.textContent = 'Escreva o seu nome para a gente saber com quem está falando.'; $('#b-nome').focus(); return; }
    if (!dados.precisa.length && !dados.mensagem) { erro.textContent = 'Marque o que você precisa ou conte um pouco no campo de texto.'; return; }
    erro.textContent = '';
    const url = linkWhatsApp(montarMensagem(dados));
    if (!url) { erro.textContent = 'O WhatsApp de atendimento ainda não foi configurado.'; return; }
    botao.setAttribute('aria-disabled', 'true'); botao.textContent = 'Abrindo o WhatsApp…';
    const janela = window.open(url, '_blank', 'noopener');
    if (!janela) erro.innerHTML = `Se o WhatsApp não abriu, <a href="${esc(url)}" target="_blank" rel="noopener noreferrer">toque aqui para abrir a mensagem</a>.`;
    setTimeout(() => { botao.removeAttribute('aria-disabled'); botao.textContent = 'Enviar pelo WhatsApp'; }, 2500);
  });
}

/* ---------- partes pesadas só quando chegam perto da tela ---------- */
function quandoPerto(el, fn, margem = '300px') {
  const io = new IntersectionObserver((ents) => { if (ents.some((x) => x.isIntersecting)) { io.disconnect(); fn(); } }, { rootMargin: margem });
  io.observe(el);
}

function cubo() {
  const caixa = $('#vitrine');
  quandoPerto(caixa, async () => {
    try { const { iniciarHero } = await import('./hero.js'); await iniciarHero(caixa, $('#cubo-letras'), $('#hud-cubo')); }
    catch { caixa.classList.add('sem-webgl'); }
  }, '100px');
}

function arcade() {
  const raiz = $('#vcp-arcade');
  quandoPerto(raiz, async () => {
    try { const { criarArcade } = await import('./arcade/arcade.js'); window.__arcade = await criarArcade(raiz); }
    catch (e) { raiz.innerHTML = '<p class="arc-carregando mono">Este aparelho não conseguiu abrir o arcade (WebGL indisponível). Tente em outro navegador.</p>'; console.error(e); }
  });
}

$('#ano').textContent = String(new Date().getFullYear());
menu();
whatsapp();
portfolio();
briefing();
cubo();
arcade();
