/**
 * Assistente de diagnóstico guiado da Lang Motos.
 *
 * Fluxo 100% no navegador (funciona no GitHub Pages, sem backend):
 * pergunta o que a moto tem → detalha → qual a moto → nome → monta um
 * resumo e SEMPRE entrega pro atendente humano no WhatsApp.
 * Regra da agência (PADROES-AGENCIA.md §0): o assistente nunca fecha
 * orçamento nem confirma agendamento sozinho — só organiza e repassa.
 */
(function () {
  "use strict";

  var FLUXO = {
    inicio: {
      pergunta: "Opa! Aqui é o pré-atendimento da Lang Motos. Em 4 toques eu organizo seu pedido e passo pro nosso atendente. O que a moto está precisando?",
      opcoes: [
        { rotulo: "Revisão / troca de óleo", valor: "Revisão / troca de óleo", proximo: "revisao" },
        { rotulo: "Barulho estranho", valor: "Barulho estranho", proximo: "barulho" },
        { rotulo: "Não liga / falhando", valor: "Moto não liga ou está falhando", proximo: "falha" },
        { rotulo: "Freio", valor: "Problema no freio", proximo: "freio" },
        { rotulo: "Chassi / alinhamento", valor: "Chassi desalinhado / moto puxando", proximo: "chassi" },
        { rotulo: "Retífica de motor", valor: "Retífica de motor", proximo: "retifica" },
        { rotulo: "Comprar peça ou acessório", valor: "Comprar peça ou acessório", proximo: "peca" },
      ],
    },
    revisao: {
      pergunta: "Boa! Revisão em dia evita dor de cabeça. Faz quanto tempo da última?",
      opcoes: ["Menos de 6 meses", "Mais de 6 meses", "Não lembro / nunca fiz"],
      dica: "Óleo e relação (corrente, coroa e pinhão) são os itens que mais desgastam no dia a dia.",
    },
    barulho: {
      pergunta: "De onde parece vir o barulho?",
      opcoes: ["Do motor", "Da corrente / relação", "Da suspensão", "Do freio", "Não sei dizer"],
      dica: "Barulho novo é sinal de aviso — quanto antes avaliar, menor costuma ser o reparo.",
    },
    falha: {
      pergunta: "Como está acontecendo?",
      opcoes: ["Não dá partida", "Liga e morre", "Falha ao acelerar", "Perdeu força"],
      dica: "Se puder, conte ao atendente quando começou e se acendeu alguma luz no painel.",
    },
    freio: {
      pergunta: "O que você percebeu no freio?",
      opcoes: ["Chiando", "Freando pouco", "Manete / pedal mole", "Trepidando"],
      dica: "Freio é segurança: se estiver falhando, evite rodar até a gente avaliar.",
    },
    chassi: {
      pergunta: "O que está acontecendo?",
      opcoes: ["Moto puxando para um lado", "Sofreu queda / batida", "Guidão torto", "Quero só conferir"],
      dica: "Fazemos alinhamento de chassis — depois de queda vale conferir mesmo sem sintoma.",
    },
    retifica: {
      pergunta: "Qual a situação do motor?",
      opcoes: ["Fumaçando / queimando óleo", "Batendo / barulho interno", "Perdeu compressão", "Quero orçamento de retífica"],
      dica: "Na retífica a avaliação vem antes do orçamento — o atendente vai te orientar.",
    },
    peca: {
      pergunta: "O que você procura?",
      opcoes: ["Peça de reposição", "Capacete", "Acessório", "Óleo / lubrificante", "Outro"],
      dica: "Diga o modelo e o ano da moto — assim já verificamos a peça certa.",
    },
  };

  var estado = { motivo: "", detalhe: "", moto: "", nome: "", telefone: "" };
  var widget, painel, mensagens, opcoesEl, form, input;

  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }

  function rolarFim() {
    mensagens.scrollTop = mensagens.scrollHeight;
  }

  function falaBot(texto, atraso) {
    var digitando = el("div", "msg msg--bot msg--digitando");
    digitando.innerHTML = "<span></span><span></span><span></span>";
    mensagens.appendChild(digitando);
    rolarFim();
    return new Promise(function (resolver) {
      setTimeout(function () {
        digitando.remove();
        mensagens.appendChild(el("div", "msg msg--bot", texto));
        rolarFim();
        resolver();
      }, atraso || 650);
    });
  }

  function falaVisitante(texto) {
    mensagens.appendChild(el("div", "msg msg--visitante", texto));
    rolarFim();
  }

  function limparOpcoes() {
    opcoesEl.innerHTML = "";
    form.hidden = true;
  }

  function mostrarOpcoes(lista, aoEscolher) {
    limparOpcoes();
    lista.forEach(function (item) {
      var opcao = typeof item === "string" ? { rotulo: item, valor: item } : item;
      var b = el("button", "opcao", opcao.rotulo);
      b.type = "button";
      b.addEventListener("click", function () {
        limparOpcoes();
        falaVisitante(opcao.rotulo);
        aoEscolher(opcao);
      });
      opcoesEl.appendChild(b);
    });
  }

  function pedirTexto(placeholder, tipo, aoResponder) {
    limparOpcoes();
    form.hidden = false;
    input.value = "";
    input.type = tipo || "text";
    input.placeholder = placeholder;
    setTimeout(function () { input.focus(); }, 50);
    form.onsubmit = function (evento) {
      evento.preventDefault();
      var valor = input.value.trim();
      if (!valor) return;
      form.hidden = true;
      falaVisitante(valor);
      aoResponder(valor);
    };
  }

  function montarResumo() {
    var linhas = ["Olá, Lang Motos! Fiz o pré-atendimento pelo site."];
    if (estado.nome) linhas.push("• Nome: " + estado.nome);
    if (estado.telefone) linhas.push("• WhatsApp: " + estado.telefone);
    linhas.push("• Moto: " + (estado.moto || "não informada"));
    linhas.push("• Preciso de: " + estado.motivo);
    if (estado.detalhe) linhas.push("• Detalhe: " + estado.detalhe);
    linhas.push("Pode me ajudar?");
    return linhas.join("\n");
  }

  function finalizar() {
    var resumo = montarResumo();
    var caixa = el("div", "msg msg--resumo");
    caixa.appendChild(el("strong", null, "Resumo do seu pedido"));
    caixa.appendChild(el("pre", null, resumo));
    mensagens.appendChild(caixa);
    rolarFim();

    limparOpcoes();
    var wa = el("a", "btn btn--bloco", "Enviar pro atendente");
    wa.href = window.LangWhatsApp ? window.LangWhatsApp.montarLink(resumo) : "#";
    wa.target = "_blank";
    wa.rel = "noopener";
    wa.addEventListener("click", function () {
      if (window.LangLeads) window.LangLeads.registrar("assistente", {
        nome: estado.nome, telefone: estado.telefone, moto: estado.moto,
        servicos: [estado.motivo], mensagem: estado.detalhe,
      });
    });
    opcoesEl.appendChild(wa);

    var recomecar = el("button", "opcao opcao--fantasma", "Recomeçar");
    recomecar.type = "button";
    recomecar.addEventListener("click", reiniciar);
    opcoesEl.appendChild(recomecar);
  }

  function perguntarTelefone(depois) {
    falaBot("Quer deixar seu WhatsApp pra gente te retornar? É opcional.").then(function () {
      pedirTexto("(15) 90000-0000", "tel", function (tel) {
        estado.telefone = tel;
        depois();
      });
      var pular = el("button", "opcao opcao--fantasma", "Pular");
      pular.type = "button";
      pular.addEventListener("click", function () {
        limparOpcoes();
        falaVisitante("Pular");
        depois();
      });
      opcoesEl.appendChild(pular);
    });
  }

  function perguntarNome() {
    falaBot("Pra fechar: como podemos te chamar?").then(function () {
      pedirTexto("Seu nome", "text", function (nome) {
        estado.nome = nome;
        var primeiro = nome.split(" ")[0];
        perguntarTelefone(function () {
          var texto = "Prontinho, " + primeiro + "! Montei o resumo abaixo. É só tocar no botão que ele vai direto pro nosso atendente";
          if (window.LangHorario) {
            var s = window.LangHorario.status();
            texto += s.aberto ? " — estamos abertos agora." : ". Agora estamos fora do horário, mas a mensagem fica lá e respondemos assim que abrirmos.";
          }
          falaBot(texto).then(finalizar);
        });
      });
    });
  }

  function perguntarMoto() {
    falaBot("Qual é a sua moto? (marca, modelo e ano, se souber)").then(function () {
      pedirTexto("Ex.: Honda CG 160 2020", "text", function (moto) {
        estado.moto = moto;
        perguntarNome();
      });
    });
  }

  function iniciarFluxo() {
    var inicio = FLUXO.inicio;
    falaBot(inicio.pergunta, 500).then(function () {
      mostrarOpcoes(inicio.opcoes, function (opcao) {
        estado.motivo = opcao.valor;
        var etapa = FLUXO[opcao.proximo];
        falaBot(etapa.pergunta).then(function () {
          mostrarOpcoes(etapa.opcoes, function (detalhe) {
            estado.detalhe = detalhe.valor;
            var seguir = etapa.dica ? falaBot(etapa.dica) : Promise.resolve();
            seguir.then(perguntarMoto);
          });
        });
      });
    });
  }

  function reiniciar() {
    estado = { motivo: "", detalhe: "", moto: "", nome: "", telefone: "" };
    mensagens.innerHTML = "";
    limparOpcoes();
    iniciarFluxo();
  }

  var iniciado = false;
  function abrir() {
    if (window.LangWidgets) window.LangWidgets.fechar();
    widget.classList.add("aberto");
    painel.setAttribute("aria-hidden", "false");
    document.querySelectorAll("[data-chat-abrir]").forEach(function (b) {
      b.setAttribute("aria-expanded", "true");
    });
    if (!iniciado) {
      iniciado = true;
      iniciarFluxo();
    }
  }
  function fechar() {
    widget.classList.remove("aberto");
    painel.setAttribute("aria-hidden", "true");
    document.querySelectorAll("[data-chat-abrir]").forEach(function (b) {
      b.setAttribute("aria-expanded", "false");
    });
  }

  (document.readyState === "loading" ? function (f) { document.addEventListener("DOMContentLoaded", f); } : function (f) { f(); })(function () {
    widget = document.querySelector("[data-chat-widget]");
    if (!widget) return;
    painel = widget;
    mensagens = widget.querySelector("[data-chat-mensagens]");
    opcoesEl = widget.querySelector("[data-chat-opcoes]");
    form = widget.querySelector("[data-chat-form]");
    input = widget.querySelector("[data-chat-input]");
    form.hidden = true;

    document.querySelectorAll("[data-chat-abrir]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (widget.classList.contains("aberto") && b.hasAttribute("data-chat-alternar")) fechar();
        else abrir();
      });
    });
    widget.querySelectorAll("[data-chat-fechar]").forEach(function (b) {
      b.addEventListener("click", fechar);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && widget.classList.contains("aberto")) fechar();
    });

    window.LangAssistente = { abrir: abrir, fechar: fechar };
  });
})();
