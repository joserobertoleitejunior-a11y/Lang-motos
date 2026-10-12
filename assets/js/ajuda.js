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
    { t: "geral", ir: "geral", alvo: "#periodo", titulo: "Escolha o período", texto: "Toque em 7, 30 ou 90 dias. Todos os números e gráficos da tela mudam juntos. Teste agora: toque em outro período." },
    { t: "geral", ir: "geral", alvo: "#kpis", titulo: "Seus números principais", texto: "Visitas são as pessoas que abriram o site. Leads são as que mandaram um pedido. Abaixo: orçamentos pedidos, quantos você está atendendo e o dinheiro dos serviços concluídos. A seta compara com o período anterior." },
    { t: "geral", ir: "geral", alvo: "#c-visitas", titulo: "Gráficos que respondem ao toque", texto: "Passe o mouse ou encoste o dedo numa barra para ver o número exato daquele dia. O botão “Ver tabela” mostra os mesmos dados em lista." },
    { t: "geral", ir: "geral", alvo: "#c-funilsite", titulo: "Da visita ao serviço", texto: "Mostra quantos visitantes clicaram para falar com você, quantos mandaram pedido e quantos viraram serviço feito. Se a barra de baixo for pequena, vale melhorar o atendimento." },
    { t: "geral", ir: "geral", alvo: "#c-retornos", titulo: "Precisa de atenção", texto: "Aqui ficam os clientes esperando resposta e os retornos atrasados. Toque no nome para abrir o cliente e resolver na hora." },
    { t: "geral", ir: "geral", alvo: "#c-orc", titulo: "Orçamentos", texto: "Quantos orçamentos pediram, quantos você fechou e a taxa de fechamento. Embaixo, em que etapa cada orçamento está." },
    { t: "geral", ir: "geral", alvo: "#c-servicos", titulo: "O que mais procuram", texto: "Serviços mais pedidos. Use para decidir o que divulgar e que peças manter em estoque." },
    { t: "geral", ir: "geral", alvo: "#c-compram", titulo: "Quem mais compra e quem mais volta", texto: "O primeiro ranking soma o valor dos serviços concluídos de cada cliente. O segundo mostra quem mais entrou em contato. São seus melhores clientes: cuide bem deles." },
    { t: "geral", ir: "geral", alvo: "#c-canais", titulo: "Onde clicam para falar com você", texto: "Mostra qual botão do site mais gera contato: WhatsApp da barra fixa, botão flutuante, ligar, mapa e Instagram." },
    { t: "crm", ir: "crm", alvo: function () { return celular() ? primeiroVisivel("#kanban-abas") : primeiroVisivel("#kanban"); }, titulo: "CRM: o caminho de cada cliente", texto: function () { return celular() ? "Cada botão é uma etapa: Novo, Em contato, Orçamento enviado, Agendado, Concluído, Perdido. O número mostra quantos clientes há em cada uma. Toque para trocar de etapa." : "Cada coluna é uma etapa do atendimento, da esquerda para a direita. Os clientes novos entram sozinhos na primeira coluna. Arraste o cartão de uma coluna para outra para avançar."; } },
    { t: "crm", ir: "crm", alvo: function () { return primeiroVisivel(".kanban__col.on .card, .kanban__col .card"); }, titulo: "Cada cartão é um cliente", texto: "Mostra nome, moto, serviço e de onde veio. Borda vermelha e “retorno atrasado” significam que você prometeu voltar e passou do prazo. Toque no cartão para abrir tudo sobre o cliente." },
    { t: "crm", ir: "crm", alvo: function () { return primeiroVisivel(".kanban__col.on .card .b, .kanban__col .card .b"); }, titulo: "A seta avança a etapa", texto: "Respondeu o cliente? Toque na seta e o cartão vai para a próxima etapa. É o jeito mais rápido de manter o painel em dia." },
    { t: "lead", ir: "leads", abrirLead: true, alvo: ".etapas", titulo: "Mude a etapa do cliente", texto: "Este é o cliente aberto. Toque numa etapa para mover. Ao escolher “Perdido”, aparece um campo para anotar o motivo. Isso ajuda a entender por que ele não fechou." },
    { t: "lead", ir: "leads", abrirLead: true, alvo: ".acoes-contato", titulo: "Chame no WhatsApp com mensagem pronta", texto: "Escolha uma mensagem pronta (por exemplo, orçamento ou lembrete), toque em WhatsApp e a conversa abre já escrita. Também dá para ligar ou copiar o número." },
    { t: "lead", ir: "leads", abrirLead: true, alvo: function () { var i = $("#g-valor"); return i ? i.closest(".linha2") : null; }, titulo: "Valor e próximo contato", texto: "Quando fechar o serviço, preencha o valor: ele entra na receita da Visão geral. Marque a data para voltar a falar com o cliente: se passar, ele aparece em “Precisa de atenção”. Tudo salva sozinho." },
    { t: "lead", ir: "leads", abrirLead: true, alvo: function () { var i = $("#g-nota"); return i ? i.closest(".campo") : null; }, titulo: "Anote tudo no histórico", texto: "Escreva o que combinou (“vem sábado de manhã”) e toque em Salvar anotação. Todo mundo da equipe vê o histórico, e as mudanças de etapa ficam registradas automaticamente." },
    { t: "leads", ir: "leads", alvo: ".filtros", titulo: "Todos os leads: busque e filtre", texto: "Digite nome, telefone, moto ou serviço. Use os filtros de etapa e origem para achar rápido. Toque numa linha para abrir o cliente." },
    { t: "leads", ir: "leads", alvo: "[data-acao=\"exportar\"]", titulo: "Leve para uma planilha", texto: "“Exportar CSV” baixa a lista que você está vendo, pronta para abrir no Excel ou no Google Planilhas." },
    { t: "novo", ir: "geral", alvo: function () { return primeiroVisivel(".cab__acoes [data-acao=\"novo-lead\"]"); }, titulo: "Cadastre o cliente do balcão", texto: "Atendeu alguém pessoalmente ou por telefone? Toque em “Novo lead”, preencha o básico e ele entra no CRM junto com os do site." },
    { t: "equipe", ir: "equipe", admin: true, alvo: "#form-equipe", titulo: "Libere a sua equipe", texto: "Só o administrador vê esta tela. Digite o e-mail do funcionário, escolha o papel e toque em Liberar. A pessoa cria a senha na tela de entrada e já acessa. Para tirar o acesso, use o botão da lista." },
    { t: "fim", ir: "ajuda", alvo: null, titulo: "Pronto, você já conhece o painel", texto: "Na tela Ajuda e tutorial você revê qualquer função, com o passo a passo e o botão “Mostrar na tela”. Dúvida? Toque em “Passeio guiado” a qualquer momento." },
  ];

  /* ---------------------------------------------------------------- tela de ajuda */
  var TOPICOS = [
    { id: "geral", ico: "📊", nome: "Visão geral: os números do negócio", oque: "A tela inicial resume o site e o atendimento: visitas, pedidos, orçamentos, dinheiro e rankings.", passos: ["Escolha 7, 30 ou 90 dias no alto.", "Olhe os quadros grandes: visitas, leads, orçamentos, atendimento e receita.", "Passe o mouse (ou o dedo) nas barras para ver o número exato.", "Toque em “Ver tabela” para ver o mesmo gráfico em lista.", "Use “Precisa de atenção” como sua lista de tarefas do dia."] },
    { id: "crm", ico: "🗂️", nome: "CRM: acompanhar cada cliente", oque: "Um quadro com uma coluna para cada etapa do atendimento. O cliente novo entra sozinho na primeira coluna.", passos: ["No computador, arraste o cartão para a coluna seguinte.", "No celular, escolha a etapa nos botões e use a seta do cartão para avançar.", "Borda vermelha: retorno atrasado.", "Toque no cartão para abrir os detalhes."] },
    { id: "lead", ico: "👤", nome: "Dentro do cliente: WhatsApp, valor e anotações", oque: "A ficha do cliente abre ao lado. Tudo o que você digita salva sozinho.", passos: ["Troque a etapa tocando em Novo, Em contato, Orçamento…", "Escolha a mensagem pronta e toque em WhatsApp.", "Preencha moto, serviços, valor e próximo contato.", "Escreva uma anotação e toque em Salvar anotação.", "Feche no X para voltar."] },
    { id: "leads", ico: "📋", nome: "Todos os leads: buscar, filtrar, exportar", oque: "Lista completa de pedidos, do mais novo para o mais antigo.", passos: ["Digite no campo Buscar (nome, telefone, moto ou serviço).", "Filtre por etapa ou por origem.", "Toque numa linha para abrir o cliente.", "Toque em “Exportar CSV” para levar a lista para o Excel."] },
    { id: "novo", ico: "➕", nome: "Novo lead: cliente do balcão ou do telefone", oque: "Cadastro manual, para quem não veio pelo site.", passos: ["Toque em “Novo lead” no alto.", "Preencha nome, telefone, moto e serviço.", "Salve: ele aparece no CRM na etapa Novo."] },
    { id: "equipe", ico: "🔑", nome: "Equipe: quem pode entrar", oque: "Só o administrador vê. Aqui você libera e remove o acesso de cada pessoa.", passos: ["Digite o e-mail da pessoa.", "Escolha o papel: Cliente (atende leads) ou Administrador (faz tudo).", "Toque em Liberar.", "A pessoa abre o painel, toca em “Primeiro acesso? Criar minha senha” e confirma pelo e-mail."] },
  ];
  var ETAPAS = [
    ["Novo", "var(--f1)", "Acabou de chegar. Ninguém respondeu ainda."],
    ["Em contato", "var(--f2)", "Você já falou com o cliente."],
    ["Orçamento enviado", "var(--f3)", "Você passou o valor e espera a resposta."],
    ["Agendado", "var(--f4)", "O cliente vai trazer a moto em dia marcado."],
    ["Concluído", "var(--f5)", "Serviço feito. Preencha o valor para entrar na receita."],
    ["Perdido", "var(--f6)", "Não fechou. Anote o motivo para aprender."],
  ];
  var DUVIDAS = [
    ["Os números estão zerados. É normal?", "Sim, até o site ser publicado e receber visitas. Em “Passeio guiado” e no modo demonstração (painel.html#demo) você vê tudo preenchido com dados de exemplo."],
    ["Como sei que chegou um cliente novo?", "O botão CRM e a aba Todos os leads mostram o contador laranja de clientes novos. Com o painel aberto, o cliente aparece sozinho, sem recarregar."],
    ["Preciso salvar?", "Não. Valor, moto, serviços e próximo contato salvam sozinhos. Só a anotação precisa do botão Salvar anotação."],
    ["Apaguei um cliente sem querer.", "Só o administrador pode apagar e não há como desfazer. Na dúvida, mova o cliente para “Perdido” em vez de apagar."],
    ["O que é “origem”?", "É o formulário do site que gerou o pedido: Orçamento, Agendamento ou Pré-atendimento (assistente). “Manual” é o que você cadastrou."],
    ["Por que não vejo “clientes que mais acessam”?", "O site conta visitas sem identificar a pessoa, por privacidade (LGPD). Por isso o painel mostra quem mais volta a pedir contato, usando o telefone."],
    ["Esqueci a senha.", "Na tela de entrada, digite o e-mail e toque em “Esqueci a senha”. Chega um link para criar outra."],
  ];

  function montarAjuda() {
    var s = $("#v-ajuda"); if (!s || s.dataset.pronto) return; s.dataset.pronto = "1";
    s.innerHTML =
      '<div class="aj-heroi"><div><h2>Comece por aqui</h2><p>Em 2 minutos você conhece todas as funções do painel. O passeio guiado abre cada tela, destaca os botões e explica em palavras simples.</p></div><button class="b" type="button" data-tour-iniciar="tudo">▶ Fazer o passeio guiado</button></div>' +
      '<h3 class="aj-t">Seu dia a dia em 4 passos</h3>' +
      '<ol class="aj-passos">' +
      '<li><b>Veja quem chegou</b><span>Abra o CRM. Os clientes novos ficam na primeira coluna, com a hora que chegaram.</span></li>' +
      '<li><b>Responda no WhatsApp</b><span>Toque no cartão, escolha a mensagem pronta e toque em WhatsApp.</span></li>' +
      '<li><b>Avance a etapa</b><span>Falou com o cliente? Toque na seta do cartão. Passou o preço? Mova para Orçamento enviado.</span></li>' +
      '<li><b>Marque o retorno e feche</b><span>Defina o próximo contato. Ao concluir, coloque o valor para o dinheiro aparecer na Visão geral.</span></li></ol>' +
      '<h3 class="aj-t">Cada tela, em linguagem simples</h3>' +
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
    "v-geral": "Aqui você vê, de relance, como o site e o atendimento estão indo. Comece por “Precisa de atenção”.",
    "v-leads": "Todos os pedidos em lista. Busque, filtre e toque numa linha para abrir o cliente.",
    "v-equipe": "Quem tem acesso ao painel. Só o administrador vê esta tela.",
  };
  function dicas() {
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
    a.innerHTML = '<div><b>Primeira vez por aqui?</b><span>Faça o passeio guiado de 2 minutos e conheça todas as funções.</span></div><div class="aviso-tour__b"><button class="b b--p" type="button" data-tour-iniciar="tudo">Começar passeio</button><button class="b b--linha b--p" type="button" data-tour-dispensar>Agora não</button></div>';
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
