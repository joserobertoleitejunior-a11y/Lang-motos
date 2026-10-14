/**
 * Lang Motos — Ajuda e passeio guiado do painel.
 * Não mexe nos dados: só navega pelas telas, destaca botões e explica cada função.
 */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var P = function () { return window.LangPainel || {}; };
  function visivel(el) { return !!(el && (el.offsetParent !== null || getComputedStyle(el).position === "fixed")); }
  function primeiroVisivel(sel) { return $$(sel).filter(visivel)[0] || null; }
  function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function ler(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  var celular = function () { return window.matchMedia("(max-width: 899px)").matches; };

  /* ---------------------------------------------------------------- passos do passeio */
  var PASSOS = [
    { t: "inicio", ir: "inicio", alvo: ".ini__cards", titulo: "Aqui você vê quem está esperando", texto: "O quadro laranja mostra quantos clientes pediram serviço e ainda esperam a sua resposta. Toque nele para ver quem são. O outro quadro mostra com quem você marcou de falar hoje." },
    { t: "inicio", ir: "inicio", alvo: ".ini__nums", titulo: "Como está o movimento", texto: "Quantas pessoas olharam o site esta semana, quantas pediram serviço e quanto dinheiro entrou com os serviços feitos no mês." },
    { t: "inicio", ir: "inicio", alvo: ".ini__botoes", titulo: "Atalhos para o que você mais faz", texto: "Ver os clientes, cadastrar alguém que veio na loja, ver os gráficos ou abrir a ajuda. É só tocar." },
    { t: "clientes", ir: "clientes", alvo: "#c-busca", titulo: "Procure um cliente", texto: "Escreva um pedaço do nome, do telefone ou da moto. A lista mostra só quem combina." },
    { t: "clientes", ir: "clientes", alvo: "#c-filtros", titulo: "Escolha quem você quer ver", texto: "“Esperando resposta” são os novos. “Falar hoje” são os que você marcou para voltar a falar. “Conversando” são os que estão em andamento. “Todos” mostra a lista inteira." },
    { t: "clientes", ir: "clientes", alvo: function () { return primeiroVisivel(".cli .cli__zap"); }, titulo: "O botão verde chama no WhatsApp", texto: "Toque nele e o WhatsApp abre com uma mensagem pronta para aquele cliente. Você só precisa apertar enviar." },
    { t: "clientes", ir: "clientes", alvo: function () { return primeiroVisivel(".cli"); }, titulo: "Toque no cliente para abrir a ficha", texto: "Na ficha você vê tudo sobre ele, marca como está o atendimento e faz anotações." },
    { t: "lead", ir: "clientes", abrirLead: true, alvo: ".g-contato", titulo: "Chamar ou ligar", texto: "O botão verde abre o WhatsApp. O botão branco liga para o cliente. Logo abaixo você pode trocar a mensagem que já vai escrita." },
    { t: "lead", ir: "clientes", abrirLead: true, alvo: ".etapas--grandes", titulo: "Como está este cliente?", texto: "Toque na opção que combina: ainda conversando, você passou o preço, marcou o dia, o serviço foi feito ou ele não fechou. Assim você nunca perde o fio da meada." },
    { t: "lead", ir: "clientes", abrirLead: true, alvo: function () { var i = $("#g-proximo_contato"); return i ? i.closest(".campo") : null; }, titulo: "Lembrar de falar de novo", texto: "Escolha o dia e a hora. Quando chegar o momento, o cliente aparece em “Falar hoje” na tela inicial. Quando o serviço estiver feito, aparece aqui também o campo para escrever o valor." },
    { t: "lead", ir: "clientes", abrirLead: true, alvo: function () { var i = $("#g-nota"); return i ? i.closest(".campo") : null; }, titulo: "Anote o que combinaram", texto: "Escreva, por exemplo, “vem sábado de manhã” e toque em Guardar anotação. Todos da equipe conseguem ler depois." },
    { t: "lead", ir: "clientes", abrirLead: true, alvo: ".g-mais", titulo: "Mais detalhes, se precisar", texto: "Aqui ficam o telefone, a moto e o que o cliente escreveu no site. Tudo o que você muda é guardado sozinho." },
    { t: "novo", ir: "inicio", alvo: function () { return primeiroVisivel(".cab__acoes [data-acao=\"novo-lead\"]"); }, titulo: "Cadastrar quem veio na loja", texto: "Atendeu alguém no balcão ou por telefone? Toque aqui, preencha o nome e o telefone e guarde. Ele entra na lista junto com os do site." },
    { t: "mais", ir: "mais", alvo: ".mais", titulo: "Mais opções", texto: "Aqui estão os gráficos, o quadro por etapas, a lista completa para levar ao Excel e, para o administrador, a equipe. Para sair do painel, toque em Sair." },
    { t: "fim", ir: "ajuda", alvo: null, titulo: "Pronto! Já pode usar", texto: "Para rever qualquer parte, abra Ajuda e toque em “Mostrar na tela”. O painel foi feito para ser simples: o mais importante é olhar o Início todos os dias." },
  ];

  /* ---------------------------------------------------------------- tela de ajuda */
  var TOPICOS = [
    { id: "inicio", ico: "🏠", nome: "Tela inicial: o que fazer hoje", oque: "É a primeira tela. Mostra quem está esperando resposta e como está o movimento.", passos: ["Veja o quadro laranja: quantos clientes novos estão esperando.", "Toque nele para ver quem são.", "Veja “Falar hoje”: clientes com quem você marcou de voltar a falar.", "Mais embaixo, o movimento da semana e o dinheiro do mês."] },
    { id: "clientes", ico: "👥", nome: "Clientes: ver, procurar e chamar", oque: "A lista de todos que pediram serviço, com o botão verde do WhatsApp em cada um.", passos: ["Escolha em cima: esperando resposta, falar hoje, conversando ou todos.", "Para procurar, escreva o nome, o telefone ou a moto.", "Toque no botão verde para chamar no WhatsApp com a mensagem pronta.", "Toque no nome para abrir a ficha do cliente."] },
    { id: "lead", ico: "📝", nome: "Ficha do cliente: etapa, lembrete e anotação", oque: "Aqui você cuida de um cliente de cada vez. Tudo é guardado sozinho.", passos: ["Chame no WhatsApp ou ligue pelos botões grandes.", "Toque em como está o cliente: conversando, passei o preço, dia marcado, serviço feito ou não fechou.", "Escolha quando quer falar com ele de novo.", "Quando o serviço for feito, escreva o valor.", "Escreva uma anotação e toque em Guardar anotação."] },
    { id: "novo", ico: "➕", nome: "Cadastrar quem veio na loja", oque: "Para quem não veio pelo site: balcão, telefone ou indicação.", passos: ["Toque em “Cadastrar cliente” no alto.", "Escreva o nome, o telefone e a moto.", "Toque em Guardar cliente."] },
    { id: "mais", ico: "⋯", nome: "Mais opções: gráficos, quadro e equipe", oque: "Para quem quer ver mais detalhes. Não precisa usar todo dia.", passos: ["“Números e gráficos”: visitas, orçamentos e o que mais procuram.", "“Quadro por etapas”: os clientes em colunas.", "“Lista completa”: tudo em lista, para levar ao Excel.", "“Equipe”: libera quem pode entrar no painel (só o administrador)."] },
  ];
  var ETAPAS = [
    ["Novo", "var(--f1)", "Acabou de chegar. Ainda ninguém respondeu."],
    ["Conversando", "var(--f2)", "Você já falou com o cliente."],
    ["Passei o preço", "var(--f3)", "Você mandou o valor e espera a resposta."],
    ["Dia marcado", "var(--f4)", "O cliente vai trazer a moto no dia combinado."],
    ["Serviço feito", "var(--f5)", "Terminou. Escreva o valor para entrar na conta do mês."],
    ["Não fechou", "var(--f6)", "Não deu certo. Anote o motivo para aprender."],
  ];
  var DUVIDAS = [
    ["Os números estão zerados. É normal?", "Sim, até o site ser publicado e receber visitas. No modo demonstração (painel.html#demo) tudo aparece preenchido com dados de exemplo."],
    ["Como sei que chegou um cliente novo?", "Na tela inicial, o quadro laranja mostra quantos estão esperando. No menu, ao lado de Clientes, aparece um número laranja. Com o painel aberto, o novo cliente chega sozinho."],
    ["Preciso apertar para salvar?", "Não. Tudo que você escreve ou escolhe é guardado sozinho. Só a anotação tem o botão Guardar anotação."],
    ["Mexi errado, e agora?", "É só tocar na opção certa de novo. A ficha mostra tudo o que já aconteceu com o cliente."],
    ["Posso apagar um cliente?", "Só o administrador, no fim da ficha, e não dá para desfazer. Se ele não fechou, prefira marcar “Não fechou”."],
    ["Esqueci a senha.", "Na tela de entrada, escreva o e-mail e toque em “Esqueci a senha”. Chega um link para criar outra."],
  ];

  function montarAjuda() {
    var s = $("#v-ajuda"); if (!s || s.dataset.pronto) return; s.dataset.pronto = "1";
    s.innerHTML =
      '<div class="aj-heroi"><div><h2>Comece por aqui</h2><p>Em 2 minutos você aprende tudo. O passeio guiado abre cada tela, mostra cada botão e explica em palavras simples.</p></div><button class="b" type="button" data-tour-iniciar="tudo">▶ Fazer o passeio guiado</button></div>' +
      '<h3 class="aj-t">Seu dia a dia em 4 passos</h3>' +
      '<ol class="aj-passos">' +
      '<li><b>Abra o Início</b><span>Veja o quadro laranja: quantos clientes novos estão esperando.</span></li>' +
      '<li><b>Chame no WhatsApp</b><span>Toque no botão verde do cliente. A mensagem já vai escrita.</span></li>' +
      '<li><b>Marque como está</b><span>Na ficha, toque em “Conversando”, “Passei o preço”, “Dia marcado”…</span></li>' +
      '<li><b>Anote e lembre de voltar</b><span>Escreva o que combinou e escolha o dia de falar de novo. Quando o serviço for feito, escreva o valor.</span></li></ol>' +
      '<h3 class="aj-t">Cada parte, em linguagem simples</h3>' +
      '<div class="aj-lista">' + TOPICOS.map(function (t, i) {
        return '<details class="aj-item"' + (i === 0 ? " open" : "") + '><summary><span class="aj-ico" aria-hidden="true">' + t.ico + '</span><span>' + t.nome + '</span></summary><div class="aj-corpo"><p>' + t.oque + '</p><ol>' + t.passos.map(function (p) { return "<li>" + p + "</li>"; }).join("") + '</ol><button class="b b--linha b--p" type="button" data-tour-iniciar="' + t.id + '">Mostrar na tela</button></div></details>';
      }).join("") + '</div>' +
      '<h3 class="aj-t">As etapas do cliente</h3>' +
      '<div class="aj-etapas">' + ETAPAS.map(function (e, i) { return '<div><span class="aj-n" style="background:' + e[1] + '">' + (i + 1) + '</span><b>' + e[0] + '</b><span>' + e[2] + '</span></div>'; }).join("") + '</div>' +
      '<h3 class="aj-t">Dúvidas comuns</h3>' +
      '<div class="aj-lista">' + DUVIDAS.map(function (d) { return '<details class="aj-item"><summary><span class="aj-ico" aria-hidden="true">?</span><span>' + d[0] + '</span></summary><div class="aj-corpo"><p>' + d[1] + '</p></div></details>'; }).join("") + '</div>';
  }

  /* ---------------------------------------------------------------- dicas no alto de cada tela */
  var DICAS = {
    "v-clientes": "Toque no botão verde para chamar no WhatsApp. Toque no nome para abrir a ficha do cliente.",
    "v-geral": "Para quem quer entender melhor o movimento: visitas, pedidos, orçamentos e o que mais procuram.",
    "v-leads": "Todos os pedidos em lista. Procure, filtre e leve para o Excel.",
    "v-equipe": "Quem tem acesso ao painel. Só o administrador vê esta tela.",
  };
  function voltar() {
    ["v-geral", "v-crm", "v-leads", "v-equipe"].forEach(function (id) {
      var sec = document.getElementById(id); if (!sec || sec.querySelector(".voltar")) return;
      var b = document.createElement("button"); b.type = "button"; b.className = "voltar"; b.setAttribute("data-ir", "mais"); b.textContent = "‹ Voltar para Mais opções";
      sec.insertBefore(b, sec.firstChild);
    });
  }
  function dicas() {
    voltar();
    Object.keys(DICAS).forEach(function (id) {
      var s = document.getElementById(id); if (!s || s.querySelector(".dica-pag")) return;
      var p = document.createElement("p"); p.className = "dica-pag"; p.textContent = DICAS[id]; s.insertBefore(p, s.firstChild);
    });
  }

  /* ---------------------------------------------------------------- passeio guiado */
  var T = { ativo: false, i: 0, lista: [], dom: null, raf: 0, alvoEl: null };

  function criarDom() {
    if (T.dom) return T.dom;
    var d = document.createElement("div"); d.className = "tour"; d.hidden = true;
    d.innerHTML = '<div class="tour__mancha" aria-hidden="true"></div><div class="tour__card" role="dialog" aria-live="polite" aria-label="Passeio guiado"><div class="tour__topo"><span class="tour__n"></span><button type="button" class="tour__x" data-tour-sair aria-label="Sair do passeio">×</button></div><h3 class="tour__t"></h3><p class="tour__p"></p><div class="tour__bar"><span></span></div><div class="tour__acoes"><button type="button" class="b b--linha b--p" data-tour-ant>Voltar</button><button type="button" class="b b--p" data-tour-prox>Próximo</button></div></div>';
    document.body.appendChild(d); T.dom = d;
    d.addEventListener("click", function (e) {
      if (e.target.closest("[data-tour-prox]")) proximo(1);
      else if (e.target.closest("[data-tour-ant]")) proximo(-1);
      else if (e.target.closest("[data-tour-sair]")) sair(true);
    });
    return d;
  }

  function resolver(v, ...args) { return typeof v === "function" ? v.apply(null, args) : v; }
  function achar(passo) {
    var a = resolver(passo.alvo);
    if (!a) return null;
    return typeof a === "string" ? primeiroVisivel(a) : a;
  }

  function esperarAlvo(passo, tent, fim) {
    var el = passo.alvo === null ? null : achar(passo);
    if (passo.alvo === null || el || tent > 25) { fim(el); return; }
    setTimeout(function () { esperarAlvo(passo, tent + 1, fim); }, 80);
  }

  function mostrar() {
    var passo = T.lista[T.i]; if (!passo) return sair(false);
    var L = P();
    // navegação
    if (passo.ir && L.S && L.S.view !== passo.ir) { try { L.ir(passo.ir); } catch (e) {} }
    if (passo.abrirLead) {
      var S = L.S || {};
      if (!S.aberto) {
        var lead = (S.leads || []).filter(function (l) { return l.telefone; })[0] || (S.leads || [])[0];
        if (lead) { try { L.abrirLead(lead.id); } catch (e) {} }
      }
    } else if (L.S && L.S.aberto && L.fecharGaveta) { try { L.fecharGaveta(); } catch (e) {} }
    var dom = criarDom(); dom.hidden = false;
    var card = $(".tour__card", dom);
    $(".tour__n", dom).textContent = "Passo " + (T.i + 1) + " de " + T.lista.length;
    $(".tour__t", dom).textContent = passo.titulo;
    $(".tour__p", dom).textContent = resolver(passo.texto);
    $(".tour__bar span", dom).style.width = ((T.i + 1) / T.lista.length * 100) + "%";
    $("[data-tour-ant]", dom).hidden = T.i === 0;
    var ult = T.i === T.lista.length - 1;
    $("[data-tour-prox]", dom).textContent = ult ? "Concluir" : "Próximo";
    card.classList.remove("tour__card--pronto");
    esperarAlvo(passo, 0, function (el) {
      if (!T.ativo) return;
      T.alvoEl = el;
      if (el) {
        el.style.scrollMarginTop = celular() ? "70px" : "90px";
        var r = el.getBoundingClientRect(), alto = r.height > window.innerHeight * 0.6;
        try { el.scrollIntoView({ block: alto ? "start" : celular() ? "start" : "center", behavior: "auto" }); } catch (e) { el.scrollIntoView(); }
      }
      posicionar();
      card.classList.add("tour__card--pronto");
      var b = $("[data-tour-prox]", dom); if (b) b.focus({ preventScroll: true });
    });
  }

  function posicionar() {
    if (!T.ativo) return;
    var dom = T.dom, m = $(".tour__mancha", dom), card = $(".tour__card", dom), el = T.alvoEl;
    var vw = window.innerWidth, vh = window.innerHeight;
    if (!el || !document.contains(el) || !visivel(el)) {
      m.style.cssText = "left:50%;top:50%;width:0;height:0;";
      card.style.cssText = celular()
        ? "left:10px;right:10px;width:auto;bottom:calc(var(--aba) + 10px + env(safe-area-inset-bottom,0px));top:auto;transform:none;"
        : "left:50%;top:50%;width:" + Math.min(420, vw - 24) + "px;transform:translate(-50%,-50%);bottom:auto;";
    } else {
      var r = el.getBoundingClientRect(), pad = 6;
      var x = Math.max(4, r.left - pad), y = Math.max(4, r.top - pad);
      var w = Math.min(vw - 8 - x, r.width + pad * 2), h = Math.min(r.height + pad * 2, vh - 8 - y);
      if (r.bottom < 0 || r.top > vh) { w = 0; h = 0; }
      m.style.cssText = "left:" + x + "px;top:" + y + "px;width:" + w + "px;height:" + h + "px;";
      if (celular()) {
        card.style.cssText = "left:10px;right:10px;width:auto;bottom:calc(var(--aba) + 10px + env(safe-area-inset-bottom,0px));top:auto;transform:none;";
      } else {
        var cw = Math.min(380, vw - 24), ch = card.offsetHeight || 220;
        var abaixo = vh - (y + h) >= ch + 18, acima = y >= ch + 18;
        var cx = Math.min(Math.max(12, x), vw - cw - 12), cy;
        if (abaixo) cy = y + h + 14; else if (acima) cy = y - ch - 14; else { cy = Math.max(12, vh - ch - 16); cx = x > vw / 2 ? 16 : vw - cw - 16; }
        card.style.cssText = "left:" + cx + "px;top:" + cy + "px;width:" + cw + "px;bottom:auto;transform:none;";
      }
    }
  }
  function laco() { posicionar(); T.raf = requestAnimationFrame(laco); }

  function iniciar(topico) {
    var admin = P().S && P().S.acesso && P().S.acesso.papel === "admin";
    var lista = PASSOS.filter(function (p) { return (topico === "tudo" || p.t === topico || (p.t === "fim" && topico === "tudo")) && (!p.admin || admin); });
    if (!lista.length) { return; }
    if (topico !== "tudo") lista = lista.filter(function (p) { return p.t !== "fim"; });
    T.lista = lista; T.i = 0; T.ativo = true; document.documentElement.classList.add("tour-on");
    guardar("lang-tour-visto", "1"); fecharAviso();
    mostrar(); cancelAnimationFrame(T.raf); T.raf = requestAnimationFrame(laco);
  }
  function proximo(d) {
    var n = T.i + d;
    if (n >= T.lista.length) { sair(true); return; }
    if (n < 0) return;
    T.i = n; mostrar();
  }
  function sair(final) {
    T.ativo = false; cancelAnimationFrame(T.raf);
    if (T.dom) T.dom.hidden = true;
    document.documentElement.classList.remove("tour-on");
    var L = P(); if (L.S && L.S.aberto && L.fecharGaveta) { try { L.fecharGaveta(); } catch (e) {} }
    if (final && T.lista.length && T.lista[T.lista.length - 1].t === "fim" && L.ir) { try { L.ir("ajuda"); } catch (e) {} }
  }

  /* ---------------------------------------------------------------- convite na primeira visita */
  function fecharAviso() { var a = $("#aviso-tour"); if (a) a.remove(); }
  function convite() {
    if (ler("lang-tour-visto") || $("#aviso-tour")) return;
    var c = $("#conteudo"); if (!c) return;
    var a = document.createElement("div"); a.id = "aviso-tour"; a.className = "aviso-tour";
    a.innerHTML = '<div><b>Primeira vez por aqui?</b><span>Faça o passeio guiado de 2 minutos. É bem fácil.</span></div><div class="aviso-tour__b"><button class="b b--p" type="button" data-tour-iniciar="tudo">Começar passeio</button><button class="b b--linha b--p" type="button" data-tour-dispensar>Agora não</button></div>';
    c.insertBefore(a, c.firstChild);
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-tour-iniciar]");
    if (b) { e.preventDefault(); iniciar(b.dataset.tourIniciar); return; }
    if (e.target.closest && e.target.closest("[data-tour-dispensar]")) { guardar("lang-tour-visto", "1"); fecharAviso(); }
  });
  document.addEventListener("keydown", function (e) {
    if (!T.ativo) return;
    if (e.key === "Escape") sair(false); else if (e.key === "ArrowRight") proximo(1); else if (e.key === "ArrowLeft") proximo(-1);
  });
  window.addEventListener("resize", function () { if (T.ativo) posicionar(); });

  /* aguarda o painel abrir (login) para montar a ajuda e oferecer o passeio */
  function ligar() {
    var app = $("#app"); if (!app) return;
    function quando() {
      if (!app.hidden) { montarAjuda(); dicas(); setTimeout(convite, 900); return true; }
      return false;
    }
    if (quando()) return;
    new MutationObserver(function (m, ob) { if (quando()) ob.disconnect(); }).observe(app, { attributes: true, attributeFilter: ["hidden"] });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ligar); else ligar();
  window.LangAjuda = { iniciar: iniciar };
})();
