/**
 * Animações de entrada ao rolar (GSAP + ScrollTrigger) — padrão de
 * motion da agência (PADROES-AGENCIA.md §2), herdado do projeto Remop:
 * títulos "montam" letra a letra uma única vez; cards entram em
 * sequência; a foto da hero desfoca conforme o scroll.
 * Respeita prefers-reduced-motion e degrada sem GSAP (tudo visível).
 */
(function () {
  "use strict";

  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || reduzMovimento) return;

  gsap.registerPlugin(ScrollTrigger);

  function dividirEmLetras(elemento) {
    var textoOriginal = elemento.textContent.trim();
    elemento.setAttribute("aria-label", textoOriginal);
    elemento.innerHTML = "";
    var palavras = textoOriginal.split(/\s+/);
    palavras.forEach(function (palavra, indice) {
      var spanPalavra = document.createElement("span");
      spanPalavra.className = "palavra-montavel";
      spanPalavra.setAttribute("aria-hidden", "true");
      Array.from(palavra).forEach(function (letra) {
        var spanLetra = document.createElement("span");
        spanLetra.className = "letra-montavel";
        spanLetra.textContent = letra;
        spanPalavra.appendChild(spanLetra);
      });
      elemento.appendChild(spanPalavra);
      if (indice < palavras.length - 1) elemento.appendChild(document.createTextNode(" "));
    });
    return elemento.querySelectorAll(".letra-montavel");
  }

  function montarTitulos(seletor) {
    gsap.utils.toArray(seletor).forEach(function (elemento) {
      var letras = dividirEmLetras(elemento);
      if (!letras.length) return;
      gsap.from(letras, {
        x: -50, opacity: 0, ease: "power2.out", duration: 0.55, stagger: 0.018,
        scrollTrigger: { trigger: elemento, start: "top 90%", once: true },
      });
    });
  }

  function revelar(seletor, opcoes) {
    gsap.utils.toArray(seletor).forEach(function (elemento) {
      gsap.from(elemento, Object.assign({
        opacity: 0, y: 32, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: elemento, start: "top 88%", once: true },
      }, opcoes || {}));
    });
  }

  function revelarGrupo(seletorContainer, seletorItens) {
    gsap.utils.toArray(seletorContainer).forEach(function (container) {
      var itens = container.querySelectorAll(seletorItens);
      if (!itens.length) return;
      gsap.from(itens, {
        opacity: 0, y: 28, duration: 0.6, ease: "power2.out", stagger: 0.09,
        scrollTrigger: { trigger: container, start: "top 85%", once: true },
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    montarTitulos(".hero__titulo, .secao__titulo, .faixa-cta__titulo");

    revelar(".eyebrow:not(.hero__conteudo *)", { y: 14, duration: 0.5 });
    revelar(".secao__subtitulo");

    revelarGrupo(".grid-servicos", ".card-servico");
    revelarGrupo(".grid-diferenciais", ".item-diferencial");
    revelarGrupo(".prova-rapida__grid", ".prova-rapida__item");
    revelarGrupo(".grid-galeria", ".foto-galeria");
    revelarGrupo(".grid-categorias", ".categoria");
    revelarGrupo(".faq", ".faq__item");
    revelarGrupo(".linha-tempo", ".linha-tempo__item");

    revelar(".orcamento__caixa", { y: 40, duration: 0.8 });
    revelar(".sobre__foto", { x: -30, y: 0, duration: 0.8 });
    revelar(".sobre__texto", { x: 30, y: 0, duration: 0.8 });
    revelar(".avaliacao-google", { scale: 0.94, y: 0, duration: 0.7 });
    revelar(".localizacao__mapa", { x: -24, y: 0, duration: 0.8 });
    revelar(".localizacao__info", { x: 24, y: 0, duration: 0.8 });

    // Letreiro "corre" na horizontal enquanto rola (efeito de velocidade)
    gsap.utils.toArray(".letreiro-rolante__trilha").forEach(function (trilha, i) {
      gsap.fromTo(trilha, { xPercent: i % 2 ? -25 : 0 }, {
        xPercent: i % 2 ? 0 : -25, ease: "none",
        scrollTrigger: { trigger: trilha, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    });

    var heroFoto = document.querySelector(".hero__foto");
    if (heroFoto) {
      gsap.to(heroFoto, {
        opacity: 0.2, filter: "blur(14px)", scale: 1.1, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.4 },
      });
    }

    gsap.timeline({ defaults: { ease: "power2.out" } })
      .from(".hero__conteudo .eyebrow", { opacity: 0, y: 16, duration: 0.5 })
      .from(".hero__conteudo .selo-horario", { opacity: 0, y: 12, duration: 0.4 }, "-=0.2")
      .from(".hero__texto", { opacity: 0, y: 18, duration: 0.5 }, "-=0.1")
      .from(".hero__ctas .botao", { opacity: 0, y: 14, duration: 0.45, stagger: 0.1 }, "-=0.25");

    // Recalcula posições depois que imagens/fontes empurram o layout
    // (lição aprendida no Remop: sem isso, elementos ficavam invisíveis).
    window.addEventListener("load", function () { ScrollTrigger.refresh(); });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
    }
  });
})();
