/**
 * Lang Motos — comportamento geral.
 * WhatsApp pré-preenchido, menu em tela cheia, cabeçalho que some na
 * descida, dock de widgets flutuantes, agendamento, horário ao vivo,
 * ordem de serviço (orçamento), FAQ e contadores.
 * JS puro, progressivo: sem ele o site continua completo.
 */
(function () {
  "use strict";

  var config = window.LANG_CONFIG || {};
  var raiz = document.documentElement;

  /* ---------- Rolagem (Lenis quando existir; nativo como fallback) ---------- */
  function irPara(alvo) {
    if (window.LangScroll && window.LangScroll.ir) window.LangScroll.ir(alvo);
    else if (alvo && alvo.scrollIntoView) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function travarRolagem(travar) {
    if (window.LangScroll && window.LangScroll.travar) window.LangScroll.travar(travar);
    document.body.style.overflow = travar ? "hidden" : "";
  }

  /* ---------- WhatsApp ---------- */
  function montarLinkWhatsApp(mensagem) {
    var texto = encodeURIComponent(mensagem || config.whatsappMensagemPadrao || "");
    return "https://wa.me/" + (config.whatsappNumero || "") + "?text=" + texto;
  }
  function abrirWhatsApp(mensagem) {
    window.open(montarLinkWhatsApp(mensagem), "_blank", "noopener");
  }
  function preencherLinksWhatsApp() {
    document.querySelectorAll("[data-whatsapp-mensagem]").forEach(function (link) {
      link.setAttribute("href", montarLinkWhatsApp(link.getAttribute("data-whatsapp-mensagem")));
    });
    document.querySelectorAll("[data-whatsapp-link]").forEach(function (link) {
      link.setAttribute("href", montarLinkWhatsApp());
    });
  }

  /* ---------- Menu em tela cheia ---------- */
  function iniciarMenu() {
    var botao = document.querySelector(".menu-btn");
    var menu = document.querySelector(".menu");
    if (!botao || !menu) return;
    var rotulo = botao.querySelector(".menu-btn__txt");

    function definir(aberto) {
      raiz.classList.toggle("menu-aberto", aberto);
      botao.setAttribute("aria-expanded", aberto ? "true" : "false");
      menu.setAttribute("aria-hidden", aberto ? "false" : "true");
      if (rotulo) rotulo.textContent = aberto ? "FECHAR" : "MENU";
      travarRolagem(aberto);
    }
    botao.addEventListener("click", function () {
      definir(!raiz.classList.contains("menu-aberto"));
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { definir(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && raiz.classList.contains("menu-aberto")) definir(false);
    });
  }

  /* ---------- Cabeçalho: vidro depois do topo, some ao descer ---------- */
  function iniciarCabecalho() {
    var topo = document.querySelector(".topo");
    var dock = document.querySelector(".dock");
    var rodape = document.querySelector(".rodape__base");
    if (!topo) return;
    var ultimoY = window.scrollY;
    var agendado = false;

    function atualizar() {
      agendado = false;
      var y = window.scrollY;
      topo.classList.toggle("topo--vidro", y > 40);
      var descendo = y > ultimoY + 4;
      var subindo = y < ultimoY - 4;
      if (y > 480 && descendo && !algumWidgetAberto()) topo.classList.add("topo--escondido");
      if (subindo || y < 200) topo.classList.remove("topo--escondido");
      if (dock && rodape) {
        var r = rodape.getBoundingClientRect();
        dock.classList.toggle("dock--oculto", r.top < window.innerHeight - 40);
      }
      ultimoY = y;
    }
    window.addEventListener("scroll", function () {
      if (!agendado) { agendado = true; requestAnimationFrame(atualizar); }
    }, { passive: true });
    atualizar();
  }

  /* ---------- Dock de widgets flutuantes ---------- */
  var widgetAtual = null;
  function algumWidgetAberto() { return !!widgetAtual; }

  function fecharWidget() {
    if (!widgetAtual) return;
    widgetAtual.painel.classList.remove("aberto");
    widgetAtual.painel.setAttribute("aria-hidden", "true");
    widgetAtual.botao.setAttribute("aria-expanded", "false");
    widgetAtual = null;
  }

  function iniciarDock() {
    document.querySelectorAll("[data-widget]").forEach(function (botao) {
      var painel = document.getElementById(botao.getAttribute("data-widget"));
      if (!painel) return;
      botao.addEventListener("click", function (e) {
        e.stopPropagation();
        var mesmo = widgetAtual && widgetAtual.painel === painel;
        fecharWidget();
        if (window.LangAssistente) window.LangAssistente.fechar();
        if (mesmo) return;
        painel.classList.add("aberto");
        painel.setAttribute("aria-hidden", "false");
        botao.setAttribute("aria-expanded", "true");
        widgetAtual = { painel: painel, botao: botao };
      });
      painel.addEventListener("click", function (e) { e.stopPropagation(); });
      painel.querySelectorAll("[data-widget-fechar]").forEach(function (b) {
        b.addEventListener("click", fecharWidget);
      });
    });
    document.addEventListener("click", fecharWidget);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") fecharWidget(); });
    // Abrir o assistente fecha qualquer widget aberto
    document.querySelectorAll("[data-chat-abrir]").forEach(function (b) {
      b.addEventListener("click", fecharWidget);
    });
  }

  /* ---------- Agendamento (folha flutuante) ---------- */
  function iniciarAgendamento() {
    var fundo = document.querySelector("[data-agendamento]");
    if (!fundo) return;
    var ultimoFoco = null;

    function abrir(servico) {
      fecharWidget();
      ultimoFoco = document.activeElement;
      fundo.classList.add("aberto");
      travarRolagem(true);
      var select = fundo.querySelector("select[name=servico]");
      if (select && servico) {
        Array.prototype.forEach.call(select.options, function (o) { if (o.text === servico) select.value = o.value; });
      }
      var primeiro = fundo.querySelector("input");
      if (primeiro) setTimeout(function () { primeiro.focus({ preventScroll: true }); }, 120);
    }
    function fechar() {
      fundo.classList.remove("aberto");
      travarRolagem(false);
      if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus({ preventScroll: true });
    }

    document.querySelectorAll("[data-abrir-agendamento]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); abrir(b.getAttribute("data-servico")); });
    });
    fundo.querySelectorAll("[data-fechar-agendamento]").forEach(function (b) { b.addEventListener("click", fechar); });
    fundo.addEventListener("click", function (e) { if (e.target === fundo) fechar(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && fundo.classList.contains("aberto")) fechar(); });

    var form = fundo.querySelector("form");
    var status = fundo.querySelector("[data-status-agendamento]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var nome = (d.get("nome") || "").toString().trim();
      var tel = (d.get("telefone") || "").toString().trim();
      if (!nome || tel.replace(/\D/g, "").length < 10) {
        status.textContent = "Preencha nome e WhatsApp com DDD.";
        status.className = "status-msg status-msg--erro";
        return;
      }
      var linhas = [
        "Olá! Quero agendar um horário na Lang Motos.",
        "• Nome: " + nome,
        "• WhatsApp: " + tel,
        "• Moto: " + ((d.get("moto") || "").toString().trim() || "não informado"),
        "• Serviço: " + d.get("servico"),
        "• Período preferido: " + d.get("periodo"),
      ];
      var msg = (d.get("mensagem") || "").toString().trim();
      if (msg) linhas.push("• Detalhes: " + msg);
      status.textContent = "Abrindo o WhatsApp…";
      status.className = "status-msg status-msg--ok";
      abrirWhatsApp(linhas.join("\n"));
      setTimeout(fechar, 900);
      form.reset();
    });

    window.LangAgendamento = { abrir: abrir, fechar: fechar };
  }

  /* ---------- Horário ao vivo ---------- */
  var DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  var DIAS_CURTOS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  function agoraSP() {
    try {
      var partes = new Intl.DateTimeFormat("en-US", {
        timeZone: config.fusoHorario || "America/Sao_Paulo",
        weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
      }).formatToParts(new Date());
      var m = {};
      partes.forEach(function (p) { m[p.type] = p.value; });
      var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { dia: dias[m.weekday], min: (parseInt(m.hour, 10) % 24) * 60 + parseInt(m.minute, 10) };
    } catch (erro) {
      var d = new Date();
      return { dia: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }
  function minutos(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
  function hora(hhmm) { return hhmm.replace(":00", "h"); }

  function statusHorario() {
    var h = config.horario || {};
    var a = agoraSP();
    var hoje = h[a.dia];
    if (hoje && a.min >= minutos(hoje[0]) && a.min < minutos(hoje[1])) {
      var falta = minutos(hoje[1]) - a.min;
      return { aberto: true, texto: falta <= 60 ? "Aberto · fecha " + hora(hoje[1]) : "Aberto agora", curto: "Aberto", dia: a.dia };
    }
    for (var i = 0; i < 8; i++) {
      var dia = (a.dia + i) % 7, f = h[dia];
      if (!f || (i === 0 && a.min >= minutos(f[0]))) continue;
      var quando = i === 0 ? "hoje" : i === 1 ? "amanhã" : DIAS_CURTOS[dia].toLowerCase();
      return { aberto: false, texto: "Fechado · abre " + quando + " " + hora(f[0]), curto: "Fechado", dia: a.dia };
    }
    return { aberto: false, texto: "Fechado agora", curto: "Fechado", dia: a.dia };
  }

  function iniciarHorario() {
    var selos = document.querySelectorAll("[data-status-horario]");
    function atualizar() {
      var s = statusHorario();
      selos.forEach(function (selo) {
        selo.classList.toggle("status--aberto", s.aberto);
        selo.classList.toggle("status--fechado", !s.aberto);
        var t = selo.querySelector("[data-status-texto]") || selo;
        t.textContent = selo.hasAttribute("data-status-curto") ? s.curto : s.texto;
      });
    }
    if (selos.length) { atualizar(); setInterval(atualizar, 60000); }

    var hoje = agoraSP().dia;
    document.querySelectorAll("[data-tabela-horario]").forEach(function (lista) {
      var classeLinha = lista.getAttribute("data-tabela-horario") || "horario__linha";
      lista.innerHTML = "";
      [1, 2, 3, 4, 5, 6, 0].forEach(function (dia) {
        var f = (config.horario || {})[dia];
        var li = document.createElement("li");
        li.className = classeLinha + (dia === hoje ? " " + classeLinha + "--hoje hoje" : "");
        var n = document.createElement("span");
        n.textContent = DIAS[dia] + (dia === hoje ? " · hoje" : "");
        var v = document.createElement("span");
        v.textContent = f ? f[0] + "–" + f[1] : (dia === 6 ? "Consulte" : "Fechado");
        li.appendChild(n); li.appendChild(v);
        lista.appendChild(li);
      });
    });
  }

  /* ---------- Ordem de serviço (orçamento) ---------- */
  function iniciarOrcamento() {
    var form = document.querySelector("[data-form-orcamento]");
    if (!form) return;
    var preview = document.querySelector("[data-orcamento-preview]");
    var numero = document.querySelector("[data-os-numero]");
    var data = document.querySelector("[data-os-data]");
    var agora = new Date();
    if (numero) numero.textContent = String(agora.getFullYear()).slice(2) + String(agora.getMonth() + 1).padStart(2, "0") + "-" + String(Math.floor(Math.random() * 900) + 100);
    if (data) data.textContent = agora.toLocaleDateString("pt-BR");

    function mensagem() {
      var d = new FormData(form);
      var moto = [d.get("marca"), d.get("modelo"), d.get("ano")]
        .map(function (v) { return (v || "").toString().trim(); }).filter(Boolean).join(" ");
      var servicos = d.getAll("servico");
      var linhas = ["Olá, Lang Motos! Quero um orçamento."];
      linhas.push("• Moto: " + (moto || "não informei ainda"));
      linhas.push("• Preciso de: " + (servicos.length ? servicos.join(", ") : "ainda não sei, quero avaliação"));
      var det = (d.get("detalhe") || "").toString().trim();
      if (det) linhas.push("• O que está acontecendo: " + det);
      return linhas.join("\n");
    }
    function atualizar() { if (preview) preview.textContent = mensagem(); }
    form.addEventListener("input", atualizar);
    form.addEventListener("change", atualizar);
    form.addEventListener("submit", function (e) { e.preventDefault(); abrirWhatsApp(mensagem()); });
    var enviar = document.querySelector("[data-orcamento-enviar]");
    if (enviar) enviar.addEventListener("click", function () { abrirWhatsApp(mensagem()); });
    atualizar();

    document.querySelectorAll("[data-consultar-servico]").forEach(function (gatilho) {
      gatilho.addEventListener("click", function (e) {
        if (e.target.closest("a") && e.target.closest("a") !== gatilho) return;
        var nome = gatilho.getAttribute("data-consultar-servico");
        form.querySelectorAll("input[name=servico]").forEach(function (c) { if (c.value === nome) c.checked = true; });
        atualizar();
        irPara(document.getElementById("orcamento"));
        var campo = form.querySelector("input[name=marca]");
        if (campo) setTimeout(function () { campo.focus({ preventScroll: true }); }, 1100);
      });
    });
  }

  /* ---------- FAQ ---------- */
  function iniciarFaq() {
    document.querySelectorAll("[data-faq]").forEach(function (lista) {
      var botoes = lista.querySelectorAll(".faq__q");
      botoes.forEach(function (b) {
        b.addEventListener("click", function () {
          var aberto = b.getAttribute("aria-expanded") === "true";
          botoes.forEach(function (o) {
            o.setAttribute("aria-expanded", "false");
            o.closest(".faq__item").classList.remove("faq__item--aberto");
          });
          if (!aberto) {
            b.setAttribute("aria-expanded", "true");
            b.closest(".faq__item").classList.add("faq__item--aberto");
          }
        });
      });
    });
  }

  /* ---------- Contadores (estilo odômetro) ---------- */
  function iniciarContadores() {
    var nums = document.querySelectorAll("[data-contar]");
    if (!nums.length) return;
    var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function animar(el) {
      var alvo = parseFloat(el.getAttribute("data-contar"));
      var casas = (el.getAttribute("data-contar").split(".")[1] || "").length;
      var de = parseFloat(el.getAttribute("data-de") || "0");
      function fmt(v) { return v.toFixed(casas).replace(".", ","); }
      if (reduz) { el.textContent = fmt(alvo); return; }
      var t0 = null, dur = 1600;
      function passo(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var e = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(de + (alvo - de) * e);
        if (p < 1) requestAnimationFrame(passo);
      }
      requestAnimationFrame(passo);
    }
    if (!("IntersectionObserver" in window)) { nums.forEach(animar); return; }
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { animar(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { obs.observe(n); });
  }

  function preencherAno() {
    document.querySelectorAll("[data-ano]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    preencherLinksWhatsApp();
    iniciarMenu();
    iniciarCabecalho();
    iniciarDock();
    iniciarAgendamento();
    iniciarHorario();
    iniciarOrcamento();
    iniciarFaq();
    iniciarContadores();
    preencherAno();
  });

  window.LangWhatsApp = { montarLink: montarLinkWhatsApp, abrir: abrirWhatsApp };
  window.LangHorario = { status: statusHorario };
  window.LangWidgets = { fechar: fecharWidget };
})();
