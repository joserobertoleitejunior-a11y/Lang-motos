/**
 * Lang Motos — movimento.
 * Coreografia de rolagem própria do projeto:
 *  - rolagem suave com inércia (Lenis), sincronizada com o ScrollTrigger
 *  - títulos revelados linha a linha (máscara), sem quebrar em letras
 *  - fotos abrem como porta de enrolar (clip de baixo pra cima)
 *  - letreiro corre sozinho e acelera/inverte com a velocidade da rolagem
 *  - faixa de cravos de pneu "roda" conforme a página desce
 *  - indicador lateral com o número e o nome da seção atual
 *  - lightbox das fotos
 *
 * A splash NÃO mora aqui: ela é CSS + um controlador inline no <head> de cada
 * página, então não depende deste arquivo nem das bibliotecas externas.
 *
 * Internet ou celular fracos:
 *  - GSAP/ScrollTrigger/Lenis chegam por <script async>; esta página nunca espera por eles.
 *  - Se chegarem tarde, o conteúdo que já está na tela fica como está (nada "pisca"
 *    nem reanima); só o que ainda está abaixo da dobra recebe a animação de entrada.
 *  - Trabalho pesado (ScrollTrigger.refresh, decode da foto do topo) roda fora da splash.
 *  - Sem as bibliotecas, tudo continua visível e funcional (rolagem nativa).
 */
(function () {
  "use strict";

  var raiz = document.documentElement;
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var AB = window.__langAbertura || { fim: true, lento: false };
  var T0 = performance.now();
  var lenis = null;

  function pronto(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  function splashAtiva() { return !AB.fim; }
  function aposSplash(fn) {
    if (!splashAtiva()) { fn(); return; }
    document.addEventListener("lang:abertura-fim", function () { fn(); }, { once: true });
  }
  function ocioso(fn) {
    if ("requestIdleCallback" in window) window.requestIdleCallback(fn, { timeout: 1500 });
    else setTimeout(fn, 200);
  }
  /** Espera uma condição (ex.: biblioteca carregada) sem travar nada. */
  function esperar(cond, ok, limiteMs) {
    var gasto = 0;
    (function tenta() {
      if (cond()) { ok(true); return; }
      if (gasto >= limiteMs) { ok(false); return; }
      gasto += 100; setTimeout(tenta, 100);
    })();
  }

  /* ================= Foto do topo: decodifica fora da thread principal ================= */
  function predecodificarHero() {
    var img = document.querySelector(".hero__midia img");
    if (!img || !img.decode) return;
    var feito = function () { img.decode().catch(function () {}); };
    if (img.complete) feito(); else img.addEventListener("load", feito, { once: true });
  }

  /* ================= Rolagem suave ================= */
  function alturaTopo() {
    var t = document.querySelector(".topo");
    return t ? t.offsetHeight : 0;
  }
  function ir(alvo) {
    if (!alvo) return;
    if (lenis) lenis.scrollTo(alvo, { offset: -alturaTopo() + 1, duration: 1.4 });
    else window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY - alturaTopo(), behavior: reduz ? "auto" : "smooth" });
  }
  function travar(sim) {
    if (!lenis) return;
    if (sim) lenis.stop(); else lenis.start();
  }
  function iniciarRolagem() {
    // Âncoras internas: funcionam já, com ou sem Lenis
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href*="#"]');
      if (!a) return;
      var url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash || url.hash === "#") return;
      var alvo = document.querySelector(url.hash);
      if (!alvo) return;
      e.preventDefault();
      ir(alvo);
      history.replaceState(null, "", url.hash);
    });
    window.LangScroll = { ir: ir, travar: travar };

  }
  function iniciarLenis() {
    if (reduz) return;
    esperar(function () { return typeof window.Lenis !== "undefined"; }, function (tem) {
      if (!tem) return;
      lenis = new window.Lenis({
        duration: 1.15,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel: true,
        wheelMultiplier: 0.95,
      });
      ligarLenisAoGsap();
    }, 15000);
  }
  var lenisLigado = false;
  function ligarLenisAoGsap() {
    if (!lenis || lenisLigado) return;
    if (window.gsap && window.ScrollTrigger) {
      lenisLigado = true;
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } else if (!lenisLigado) {
      lenisLigado = true;
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
    }
  }

  /* ================= Letreiro guiado pela rolagem (sem GSAP) ================= */
  function iniciarLetreiros() {
    document.querySelectorAll(".letreiro__trilha").forEach(function (trilha) {
      var grupo = trilha.querySelector(".letreiro__grupo");
      if (!grupo) return;
      trilha.appendChild(grupo.cloneNode(true)).setAttribute("aria-hidden", "true");
      var largura = grupo.offsetWidth;
      window.addEventListener("resize", function () { largura = grupo.offsetWidth; });
      var x = 0, base = reduz ? 0 : -0.6, impulso = 0, direcao = 1, ultimoY = window.scrollY, visivel = false;
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (es) { visivel = es[0].isIntersecting; }).observe(trilha);
      } else visivel = true;
      window.addEventListener("scroll", function () {
        var dy = window.scrollY - ultimoY; ultimoY = window.scrollY;
        if (reduz) return;
        if (dy !== 0) direcao = dy > 0 ? 1 : -1;
        impulso = Math.max(-28, Math.min(28, impulso + dy * 0.12));
      }, { passive: true });
      (function quadro() {
        if (visivel && largura) {
          x += base * direcao - Math.abs(impulso) * direcao * 0.5;
          impulso *= 0.9;
          if (x <= -largura) x += largura;
          if (x > 0) x -= largura;
          var inclina = Math.max(-10, Math.min(10, impulso * -0.5));
          trilha.style.transform = "translate3d(" + x + "px,0,0) skewX(" + inclina + "deg)";
        }
        requestAnimationFrame(quadro);
      })();
    });
  }

  /* ================= Coreografia GSAP ================= */
  function liberarHero() { raiz.classList.remove("hero-entra"); }

  function iniciarCoreografia() {
    if (reduz) { liberarHero(); return; }
    esperar(function () { return window.gsap && window.ScrollTrigger; }, function (tem) {
      if (!tem) { liberarHero(); return; }
      var gsap = window.gsap, ST = window.ScrollTrigger;
      gsap.registerPlugin(ST);
      ligarLenisAoGsap();

      /* FASE 1 — só leituras (um único layout). */
      var vh = window.innerHeight;
      function fora(el) { return el.getBoundingClientRect().top > vh * 0.88; }
      function lista(sel, extra) {
        return Array.prototype.filter.call(document.querySelectorAll(sel), function (el) {
          return !(extra && extra(el)) && fora(el);
        });
      }
      var titulos = lista("[data-linhas]", function (el) { return el.closest(".hero"); });
      var blocos = lista("[data-revela]");
      var grupos = lista("[data-revela-grupo]");
      var portas = lista("[data-porta]");

      /* FASE 2 — só escritas (estado inicial) + observador que dispara a entrada uma vez. */
      var jobs = new Map();
      var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          var f = jobs.get(e.target); if (f) f();
        });
      }, { rootMargin: "100000px 0px -12% 0px" }) : null;
      /* O topo expandido faz o observador também disparar nos blocos que ficaram acima da tela
         (ex.: salto por âncora do menu), que antes ficariam escondidos. */
      function aoEntrar(el, f) { if (io) { jobs.set(el, f); io.observe(el); } else f(); }

      titulos.forEach(function (t) {
        var linhas = t.querySelectorAll(".linha-mask > span");
        gsap.set(linhas, { yPercent: 108 });
        aoEntrar(t, function () { gsap.to(linhas, { yPercent: 0, duration: 1.05, ease: "expo.out", stagger: 0.09 }); });
      });
      blocos.forEach(function (el) {
        gsap.set(el, { y: 36, opacity: 0 });
        aoEntrar(el, function () { gsap.to(el, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }); });
      });
      grupos.forEach(function (g) {
        var filhos = g.children;
        gsap.set(filhos, { y: 30, opacity: 0 });
        aoEntrar(g, function () { gsap.to(filhos, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.07 }); });
      });
      portas.forEach(function (m) {
        var img = m.querySelector("img");
        gsap.set(m, { clipPath: "inset(100% 0% 0% 0%)" });
        if (img) gsap.set(img, { scale: 1.25 });
        aoEntrar(m, function () {
          gsap.to(m, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" });
          if (img) gsap.to(img, { scale: 1, duration: 1.6, delay: 0.1, ease: "expo.out" });
        });
      });

      /* Entrada do hero. O estado inicial veio do CSS (html.hero-entra), então nada pisca. */
      var linhasHero = ".hero [data-linhas] .linha-mask > span";
      var restoHero = ".hero__texto, .hero__acoes, .hero .rotulo";
      var heroImg = document.querySelector(".hero__midia img");
      if (document.querySelector(".hero") && raiz.classList.contains("hero-entra")) {
        var tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(linhasHero, { yPercent: 110, opacity: 1 }, { yPercent: 0, duration: 1.2, stagger: 0.1 })
          .fromTo(restoHero, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, "-=0.8")
          .fromTo(".hero__placa", { y: 40, rotate: -18, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, duration: 1.1 }, "-=0.9")
          .fromTo(".hero__base", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.6");
        if (heroImg) gsap.from(heroImg, { scale: 1.18, duration: 2.4, ease: "expo.out" });
        liberarHero(); // os valores iniciais já estão em estilo inline: troca sem piscar
      } else liberarHero();

      /* Efeitos presos à rolagem (poucos; criados depois das escritas). */
      if (heroImg) {
        gsap.to(heroImg, { yPercent: 16, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        gsap.to(".hero__in", { yPercent: -18, opacity: 0.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "40% top", end: "bottom top", scrub: true } });
      }
      gsap.utils.toArray(".pneu__trilha").forEach(function (t) {
        gsap.fromTo(t, { x: 0 }, { x: -88, ease: "none", scrollTrigger: { trigger: t, start: "top bottom", end: "bottom top", scrub: 0.3 } });
      });
      gsap.utils.toArray("[data-placa-gira]").forEach(function (pl) {
        gsap.fromTo(pl, { rotate: -14 }, { rotate: 6, ease: "none", scrollTrigger: { trigger: pl, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // Recalcula posições uma vez, com o navegador ocioso
      function recalcular() { ocioso(function () { ST.refresh(); }); }
      if (document.readyState === "complete") recalcular(); else window.addEventListener("load", recalcular, { once: true });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(recalcular);
    }, 15000);
    // Rede muito lenta: se as bibliotecas não vierem logo, o hero aparece como está (sem animar).
    setTimeout(function () { if (raiz.classList.contains("hero-entra")) liberarHero(); }, 2200);
  }

  /* ================= Indicador lateral de seção ================= */
  function iniciarIndicador() {
    var ind = document.querySelector(".indicador");
    var secoes = Array.prototype.slice.call(document.querySelectorAll("[data-secao]"));
    if (!ind || !secoes.length) return;
    var num = ind.querySelector(".indicador__num");
    var txt = ind.querySelector(".indicador__txt");
    var barra = ind.querySelector(".indicador__barra");
    var atual = null, agendado = false;
    function atualizar() {
      agendado = false;
      var meio = window.innerHeight * 0.45, escolhida = secoes[0];
      secoes.forEach(function (s) { if (s.getBoundingClientRect().top <= meio) escolhida = s; });
      if (escolhida !== atual) {
        atual = escolhida;
        var partes = escolhida.getAttribute("data-secao").split("|");
        num.textContent = partes[0]; txt.textContent = partes[1];
      }
      var total = document.documentElement.scrollHeight - window.innerHeight;
      barra.style.transform = "scaleY(" + (total > 0 ? Math.min(window.scrollY / total, 1) : 0) + ")";
    }
    window.addEventListener("scroll", function () { if (!agendado) { agendado = true; requestAnimationFrame(atualizar); } }, { passive: true });
    atualizar();
  }

  /* ================= Lightbox ================= */
  function iniciarLightbox() {
    var itens = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    if (!itens.length) return;
    var caixa = document.createElement("div");
    caixa.className = "lightbox";
    caixa.setAttribute("role", "dialog");
    caixa.setAttribute("aria-modal", "true");
    caixa.setAttribute("aria-label", "Foto ampliada");
    caixa.innerHTML =
      '<span class="lightbox__cont mono"></span>' +
      '<button class="lightbox__btn lightbox__fechar" type="button" aria-label="Fechar">×</button>' +
      '<button class="lightbox__btn lightbox__ant" type="button" aria-label="Foto anterior">‹</button>' +
      '<figure><img alt=""><figcaption class="mono"></figcaption></figure>' +
      '<button class="lightbox__btn lightbox__prox" type="button" aria-label="Próxima foto">›</button>';
    document.body.appendChild(caixa);
    var img = caixa.querySelector("img"), cap = caixa.querySelector("figcaption"), cont = caixa.querySelector(".lightbox__cont");
    var i = 0, foco = null, toqueX = null;
    function mostrar(n) {
      i = (n + itens.length) % itens.length;
      var item = itens[i], mini = item.querySelector("img"), legenda = item.querySelector("figcaption");
      img.classList.remove("carregada");
      img.onload = function () { requestAnimationFrame(function () { img.classList.add("carregada"); }); };
      img.src = item.getAttribute("data-lightbox");
      img.alt = mini ? mini.alt : "";
      cap.textContent = legenda ? legenda.textContent : "";
      cont.textContent = String(i + 1).padStart(2, "0") + " / " + String(itens.length).padStart(2, "0");
    }
    function abrir(n) { foco = document.activeElement; mostrar(n); caixa.classList.add("aberto"); travar(true); document.body.style.overflow = "hidden"; caixa.querySelector(".lightbox__fechar").focus(); }
    function fechar() { caixa.classList.remove("aberto"); travar(false); document.body.style.overflow = ""; if (foco) foco.focus({ preventScroll: true }); }
    itens.forEach(function (item, n) {
      item.setAttribute("tabindex", "0"); item.setAttribute("role", "button");
      item.addEventListener("click", function () { abrir(n); });
      item.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(n); } });
    });
    caixa.querySelector(".lightbox__fechar").addEventListener("click", fechar);
    caixa.querySelector(".lightbox__ant").addEventListener("click", function () { mostrar(i - 1); });
    caixa.querySelector(".lightbox__prox").addEventListener("click", function () { mostrar(i + 1); });
    caixa.addEventListener("click", function (e) { if (e.target === caixa) fechar(); });
    document.addEventListener("keydown", function (e) {
      if (!caixa.classList.contains("aberto")) return;
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowLeft") mostrar(i - 1);
      if (e.key === "ArrowRight") mostrar(i + 1);
    });
    caixa.addEventListener("touchstart", function (e) { toqueX = e.touches[0].clientX; }, { passive: true });
    caixa.addEventListener("touchend", function (e) {
      if (toqueX === null) return;
      var dx = e.changedTouches[0].clientX - toqueX;
      if (Math.abs(dx) > 50) mostrar(i + (dx < 0 ? 1 : -1));
      toqueX = null;
    });
  }

  pronto(function () {
    iniciarRolagem();        // âncoras: leve, funciona já
    predecodificarHero();
    // Todo o resto espera a splash terminar e o navegador ficar ocioso.
    aposSplash(function () {
      ocioso(function () {
        iniciarLenis();
        iniciarCoreografia();
        iniciarLetreiros();
        iniciarIndicador();
        iniciarLightbox();
      });
    });
  });
})();
