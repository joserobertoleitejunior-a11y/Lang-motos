/**
 * Comportamento geral do site Lang Motos: links de WhatsApp
 * pré-preenchidos, menu mobile, modal de agendamento, selo de horário
 * "Aberto agora", montador de orçamento, FAQ e faixa arrastável.
 * Padrão VIBE CODING PROCESS — JS puro, sem build, progressivo
 * (o site funciona sem JS; isto só enriquece).
 */
(function () {
  "use strict";

  var config = window.LANG_CONFIG || {};

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

  function iniciarMenuMobile() {
    var botao = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav-principal");
    if (!botao || !nav) return;

    function fechar() {
      nav.classList.remove("aberto");
      botao.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    }

    botao.addEventListener("click", function () {
      var aberto = nav.classList.toggle("aberto");
      botao.classList.toggle("aberto", aberto);
      botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", fechar);
    });
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") fechar();
    });
  }

  /** Cabeçalho ganha fundo sólido e encolhe depois do topo da página. */
  function iniciarCabecalhoRolagem() {
    var cabecalho = document.querySelector(".cabecalho");
    var topo = document.querySelector(".voltar-topo");
    if (!cabecalho) return;
    var agendado = false;
    function atualizar() {
      agendado = false;
      var y = window.scrollY;
      cabecalho.classList.toggle("cabecalho--rolado", y > 40);
      if (topo) topo.classList.toggle("visivel", y > 700);
    }
    window.addEventListener("scroll", function () {
      if (!agendado) {
        agendado = true;
        requestAnimationFrame(atualizar);
      }
    }, { passive: true });
    atualizar();
    if (topo) {
      topo.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  /* ---------------- Modal de agendamento ---------------- */
  function iniciarModalAgendamento() {
    var overlay = document.querySelector("[data-modal-agendamento]");
    if (!overlay) return;
    var ultimoFoco = null;

    function abrir(servico) {
      ultimoFoco = document.activeElement;
      overlay.classList.add("aberto");
      document.body.style.overflow = "hidden";
      var select = overlay.querySelector("select[name=servico]");
      if (select && servico) {
        Array.prototype.forEach.call(select.options, function (opcao) {
          if (opcao.text === servico) select.value = opcao.value;
        });
      }
      var primeiro = overlay.querySelector("input, select, textarea");
      if (primeiro) primeiro.focus();
    }
    function fechar() {
      overlay.classList.remove("aberto");
      document.body.style.overflow = "";
      if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
    }

    document.querySelectorAll("[data-abrir-agendamento]").forEach(function (botao) {
      botao.addEventListener("click", function (evento) {
        evento.preventDefault();
        abrir(botao.getAttribute("data-servico"));
      });
    });
    overlay.querySelectorAll("[data-fechar-modal]").forEach(function (botao) {
      botao.addEventListener("click", fechar);
    });
    overlay.addEventListener("click", function (evento) {
      if (evento.target === overlay) fechar();
    });
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && overlay.classList.contains("aberto")) fechar();
    });

    var form = overlay.querySelector("[data-form-agendamento]");
    var status = overlay.querySelector("[data-status-agendamento]");
    if (form) {
      form.addEventListener("submit", function (evento) {
        evento.preventDefault();
        var dados = new FormData(form);
        var nome = (dados.get("nome") || "").toString().trim();
        var telefone = (dados.get("telefone") || "").toString().trim();
        if (!nome || telefone.replace(/\D/g, "").length < 10) {
          status.textContent = "Preencha seu nome e um WhatsApp com DDD.";
          status.className = "mensagem-status mensagem-status--erro";
          return;
        }
        var linhas = [
          "Olá! Quero agendar um horário na Lang Motos.",
          "• Nome: " + nome,
          "• WhatsApp: " + telefone,
          "• Moto: " + ((dados.get("moto") || "").toString().trim() || "não informado"),
          "• Serviço: " + dados.get("servico"),
          "• Período preferido: " + dados.get("periodo"),
        ];
        var msg = (dados.get("mensagem") || "").toString().trim();
        if (msg) linhas.push("• Detalhes: " + msg);
        status.textContent = "Abrindo o WhatsApp com seu pedido…";
        status.className = "mensagem-status mensagem-status--ok";
        abrirWhatsApp(linhas.join("\n"));
        setTimeout(fechar, 900);
        form.reset();
      });
    }

    window.LangAgendamento = { abrir: abrir, fechar: fechar };
  }

  /* ---------------- Horário: selo "Aberto agora" + tabela ---------------- */
  var NOMES_DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  function agoraEmSaoPaulo() {
    try {
      var partes = new Intl.DateTimeFormat("en-US", {
        timeZone: config.fusoHorario || "America/Sao_Paulo",
        weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
      }).formatToParts(new Date());
      var mapa = {};
      partes.forEach(function (p) { mapa[p.type] = p.value; });
      var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { dia: dias[mapa.weekday], minutos: (parseInt(mapa.hour, 10) % 24) * 60 + parseInt(mapa.minute, 10) };
    } catch (erro) {
      var d = new Date();
      return { dia: d.getDay(), minutos: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function paraMinutos(hhmm) {
    var p = hhmm.split(":");
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }

  function statusHorario() {
    var horario = config.horario || {};
    var agora = agoraEmSaoPaulo();
    var hoje = horario[agora.dia];
    if (hoje && agora.minutos >= paraMinutos(hoje[0]) && agora.minutos < paraMinutos(hoje[1])) {
      var faltam = paraMinutos(hoje[1]) - agora.minutos;
      return { aberto: true, texto: faltam <= 60 ? "Aberto · fecha às " + hoje[1].replace(":00", "h") : "Aberto agora", dia: agora.dia };
    }
    // Procura a próxima abertura (hoje mais tarde ou nos próximos dias)
    for (var i = 0; i < 8; i++) {
      var dia = (agora.dia + i) % 7;
      var faixa = horario[dia];
      if (!faixa) continue;
      if (i === 0 && agora.minutos >= paraMinutos(faixa[0])) continue;
      var quando = i === 0 ? "hoje" : i === 1 ? "amanhã" : NOMES_DIAS[dia].toLowerCase();
      return { aberto: false, texto: "Fechado · abre " + quando + " às " + faixa[0].replace(":00", "h"), dia: agora.dia };
    }
    return { aberto: false, texto: "Fechado agora", dia: agora.dia };
  }

  function iniciarHorario() {
    var selos = document.querySelectorAll("[data-status-horario]");
    function atualizar() {
      var s = statusHorario();
      selos.forEach(function (selo) {
        selo.classList.toggle("selo-horario--aberto", s.aberto);
        selo.classList.toggle("selo-horario--fechado", !s.aberto);
        var texto = selo.querySelector("[data-status-texto]") || selo;
        texto.textContent = s.texto;
      });
    }
    if (selos.length) {
      atualizar();
      setInterval(atualizar, 60000);
    }

    var tabela = document.querySelector("[data-tabela-horario]");
    if (tabela) {
      var hoje = agoraEmSaoPaulo().dia;
      var ordem = [1, 2, 3, 4, 5, 6, 0];
      tabela.innerHTML = "";
      ordem.forEach(function (dia) {
        var faixa = (config.horario || {})[dia];
        var linha = document.createElement("li");
        linha.className = "horario__linha" + (dia === hoje ? " horario__linha--hoje" : "");
        var nome = document.createElement("span");
        nome.textContent = NOMES_DIAS[dia] + (dia === hoje ? " (hoje)" : "");
        var valor = document.createElement("span");
        valor.textContent = faixa ? faixa[0] + " – " + faixa[1] : (dia === 6 ? "Consulte" : "Fechado");
        linha.appendChild(nome);
        linha.appendChild(valor);
        tabela.appendChild(linha);
      });
    }
  }

  /* ---------------- Montador de orçamento ---------------- */
  function iniciarOrcamento() {
    var form = document.querySelector("[data-form-orcamento]");
    if (!form) return;
    var chips = form.querySelectorAll("[data-chip-servico]");
    var preview = form.querySelector("[data-orcamento-preview]");

    function servicosSelecionados() {
      return Array.prototype.filter.call(chips, function (c) {
        return c.getAttribute("aria-pressed") === "true";
      }).map(function (c) { return c.getAttribute("data-chip-servico"); });
    }

    function montarMensagem() {
      var dados = new FormData(form);
      var moto = [dados.get("marca"), dados.get("modelo"), dados.get("ano")]
        .map(function (v) { return (v || "").toString().trim(); })
        .filter(Boolean).join(" ");
      var servicos = servicosSelecionados();
      var linhas = ["Olá, Lang Motos! Quero um orçamento."];
      linhas.push("• Moto: " + (moto || "não informei ainda"));
      linhas.push("• Preciso de: " + (servicos.length ? servicos.join(", ") : "ainda não sei, quero avaliação"));
      var detalhe = (dados.get("detalhe") || "").toString().trim();
      if (detalhe) linhas.push("• O que está acontecendo: " + detalhe);
      return linhas.join("\n");
    }

    function atualizarPreview() {
      if (preview) preview.textContent = montarMensagem();
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var ativo = chip.getAttribute("aria-pressed") === "true";
        chip.setAttribute("aria-pressed", ativo ? "false" : "true");
        atualizarPreview();
      });
    });
    form.addEventListener("input", atualizarPreview);
    form.addEventListener("submit", function (evento) {
      evento.preventDefault();
      abrirWhatsApp(montarMensagem());
    });
    atualizarPreview();

    // Botões "Consultar" dos cards de serviço pré-marcam o chip e rolam
    // até o montador — o visitante só completa a moto e envia.
    document.querySelectorAll("[data-consultar-servico]").forEach(function (botao) {
      botao.addEventListener("click", function () {
        var nome = botao.getAttribute("data-consultar-servico");
        chips.forEach(function (chip) {
          if (chip.getAttribute("data-chip-servico") === nome) chip.setAttribute("aria-pressed", "true");
        });
        atualizarPreview();
        var alvo = document.getElementById("orcamento");
        if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
        var campo = form.querySelector("input[name=marca]");
        if (campo) setTimeout(function () { campo.focus({ preventScroll: true }); }, 650);
      });
    });
  }

  /* ---------------- FAQ (acordeão, um aberto por vez) ---------------- */
  function iniciarAcordeao() {
    document.querySelectorAll("[data-acordeao]").forEach(function (lista) {
      var botoes = lista.querySelectorAll(".faq__pergunta");
      botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
          var aberto = botao.getAttribute("aria-expanded") === "true";
          botoes.forEach(function (outro) {
            outro.setAttribute("aria-expanded", "false");
            outro.parentElement.classList.remove("faq__item--aberto");
          });
          if (!aberto) {
            botao.setAttribute("aria-expanded", "true");
            botao.parentElement.classList.add("faq__item--aberto");
          }
        });
      });
    });
  }

  /* ---------------- Contadores animados ---------------- */
  function iniciarContadores() {
    var numeros = document.querySelectorAll("[data-contar]");
    if (!numeros.length) return;
    var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function animar(el) {
      var alvo = parseFloat(el.getAttribute("data-contar"));
      var casas = (el.getAttribute("data-contar").split(".")[1] || "").length;
      var sufixo = el.getAttribute("data-sufixo") || "";
      if (reduz) {
        el.textContent = alvo.toFixed(casas).replace(".", ",") + sufixo;
        return;
      }
      var inicio = null;
      var duracao = 1400;
      function passo(t) {
        if (!inicio) inicio = t;
        var p = Math.min((t - inicio) / duracao, 1);
        var suave = 1 - Math.pow(1 - p, 3);
        el.textContent = (alvo * suave).toFixed(casas).replace(".", ",") + sufixo;
        if (p < 1) requestAnimationFrame(passo);
      }
      requestAnimationFrame(passo);
    }

    if (!("IntersectionObserver" in window)) {
      numeros.forEach(animar);
      return;
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          animar(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    numeros.forEach(function (n) { obs.observe(n); });
  }

  /* ---------------- Ano no rodapé ---------------- */
  function preencherAno() {
    document.querySelectorAll("[data-ano]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /**
   * Faixa de ícones no topo da hero (padrão herdado do projeto Remop):
   * anda sozinha e pode ser arrastada com dedo/mouse, com inércia.
   */
  function iniciarFaixaArrastavel() {
    var trilha = document.querySelector(".hero__faixa-trilha");
    if (!trilha) return;

    var reduzMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    var VELOCIDADE_AUTOMATICA = 0.035; // px por ms
    var ATRITO = 0.94;
    var LIMIAR_CLIQUE = 6; // px — acima disso, não deixa o clique passar pro link

    var larguraConjunto = trilha.scrollWidth / 2;
    window.addEventListener("resize", function () {
      larguraConjunto = trilha.scrollWidth / 2;
    });

    var posicao = 0;
    var arrastando = false;
    var moveuBastante = false;
    var somaMovimento = 0;
    var pontoX = 0;
    var pontoT = 0;
    var velocidade = 0;
    var quadroAtivo = null;
    var ultimoQuadroAuto = null;
    var ultimoQuadroMomento = null;
    // Só roda o loop de animação enquanto a faixa está visível na tela
    // — sem isso, o requestAnimationFrame ficava rodando pra sempre em
    // segundo plano depois que o visitante rolava a página pra baixo,
    // gastando bateria/CPU à toa e pesando no resto dos efeitos.
    var visivel = true;
    if ("IntersectionObserver" in window) {
      var observador = new IntersectionObserver(
        function (entradas) {
          var estavaVisivel = visivel;
          visivel = entradas[0].isIntersecting;
          if (visivel && !estavaVisivel && !arrastando && !quadroAtivo) {
            quadroAtivo = requestAnimationFrame(autoRolar);
          }
        },
        { threshold: 0 }
      );
      observador.observe(trilha);
    }

    function normalizar() {
      if (larguraConjunto <= 0) return;
      while (posicao <= -larguraConjunto) posicao += larguraConjunto;
      while (posicao > 0) posicao -= larguraConjunto;
    }

    function desenhar() {
      normalizar();
      trilha.style.transform = "translateX(" + posicao + "px)";
    }

    function cancelarQuadro() {
      if (quadroAtivo) cancelAnimationFrame(quadroAtivo);
      quadroAtivo = null;
    }

    function autoRolar(agora) {
      if (!visivel) {
        // Não agenda o próximo quadro — quem acorda o loop de novo é
        // o próprio IntersectionObserver, via aoFicarVisivel().
        quadroAtivo = null;
        ultimoQuadroAuto = null;
        return;
      }
      if (ultimoQuadroAuto === null) ultimoQuadroAuto = agora;
      var passo = agora - ultimoQuadroAuto;
      ultimoQuadroAuto = agora;
      if (!arrastando && !reduzMovimento) {
        posicao -= VELOCIDADE_AUTOMATICA * passo;
        desenhar();
      }
      quadroAtivo = requestAnimationFrame(autoRolar);
    }

    function aplicarMomento(agora) {
      if (ultimoQuadroMomento === null) ultimoQuadroMomento = agora;
      var passo = agora - ultimoQuadroMomento;
      ultimoQuadroMomento = agora;
      posicao += velocidade * passo;
      velocidade *= ATRITO;
      desenhar();
      if (Math.abs(velocidade) > 0.01) {
        quadroAtivo = requestAnimationFrame(aplicarMomento);
      } else {
        ultimoQuadroMomento = null;
        ultimoQuadroAuto = null;
        quadroAtivo = requestAnimationFrame(autoRolar);
      }
    }

    function aoPressionar(evento) {
      arrastando = true;
      moveuBastante = false;
      somaMovimento = 0;
      cancelarQuadro();
      pontoX = evento.clientX;
      pontoT = performance.now();
      velocidade = 0;
      trilha.classList.add("arrastando");
      if (trilha.setPointerCapture) {
        try {
          trilha.setPointerCapture(evento.pointerId);
        } catch (erro) {}
      }
    }

    function aoMover(evento) {
      if (!arrastando) return;
      var agora = performance.now();
      var deltaX = evento.clientX - pontoX;
      var deltaT = Math.max(agora - pontoT, 1);
      posicao += deltaX;
      velocidade = deltaX / deltaT;
      somaMovimento += Math.abs(deltaX);
      if (somaMovimento > LIMIAR_CLIQUE) moveuBastante = true;
      pontoX = evento.clientX;
      pontoT = agora;
      desenhar();
    }

    function aoSoltar() {
      if (!arrastando) return;
      arrastando = false;
      trilha.classList.remove("arrastando");
      cancelarQuadro();
      ultimoQuadroMomento = null;
      if (Math.abs(velocidade) > 0.02 && !reduzMovimento) {
        quadroAtivo = requestAnimationFrame(aplicarMomento);
      } else {
        ultimoQuadroAuto = null;
        quadroAtivo = requestAnimationFrame(autoRolar);
      }
    }

    trilha.addEventListener("pointerdown", aoPressionar);
    trilha.addEventListener("pointermove", aoMover);
    trilha.addEventListener("pointerup", aoSoltar);
    trilha.addEventListener("pointercancel", aoSoltar);
    trilha.addEventListener("pointerleave", function (evento) {
      if (arrastando && evento.buttons === 0) aoSoltar();
    });
    // Depois de um arrasto de verdade, o clique que sobra não deve
    // abrir o link do ícone — só some quando foi mesmo um toque.
    trilha.addEventListener(
      "click",
      function (evento) {
        if (moveuBastante) {
          evento.preventDefault();
          evento.stopPropagation();
        }
      },
      true
    );

    quadroAtivo = requestAnimationFrame(autoRolar);
  }

  document.addEventListener("DOMContentLoaded", function () {
    preencherLinksWhatsApp();
    iniciarMenuMobile();
    iniciarCabecalhoRolagem();
    iniciarModalAgendamento();
    iniciarHorario();
    iniciarOrcamento();
    iniciarAcordeao();
    iniciarContadores();
    iniciarFaixaArrastavel();
    preencherAno();
  });

  window.LangWhatsApp = { montarLink: montarLinkWhatsApp, abrir: abrirWhatsApp };
  window.LangHorario = { status: statusHorario };
})();
