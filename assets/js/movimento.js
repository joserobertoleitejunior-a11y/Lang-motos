/**
 * Lang Motos — movimento.
 * Coreografia de rolagem própria do projeto:
 *  - abertura: odômetro rola 0000 → 1997 e a "porta de enrolar" sobe
 *  - rolagem suave com inércia (Lenis), sincronizada com o ScrollTrigger
 *  - títulos revelados linha a linha (máscara), sem quebrar em letras
 *  - fotos abrem como porta de enrolar (clip de baixo pra cima)
 *  - letreiro corre sozinho e acelera/inverte com a velocidade da rolagem
 *  - faixa de cravos de pneu "roda" conforme a página desce
 *  - indicador lateral com o número e o nome da seção atual
 * Sem GSAP/Lenis tudo continua visível e funcional (degrada para nativo).
 */
(function () {
  "use strict";

  var raiz = document.documentElement;
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var temGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  var lenis = null;

  /* ================= Abertura ================= */
  var aberturaAtiva = raiz.classList.contains("com-abertura");
  function fimAbertura() {
    raiz.classList.remove("com-abertura");
    document.dispatchEvent(new CustomEvent("lang:abertura-fim"));
  }
  function iniciarAbertura() {
    var el = document.querySelector("[data-abertura]");
    if (!el || !aberturaAtiva) { if (el) el.remove(); aberturaAtiva = false; return; }
    try { sessionStorage.setItem("lang-abertura", "1"); } catch (e) {}
    var alvo = "1997";
    var odo = el.querySelector(".abertura__odo");
    odo.innerHTML = "";
    var colunas = [];
    alvo.split("").forEach(function () {
      var span = document.createElement("span");
      var rolo = document.createElement("i");
      for (var n = 0; n <= 9; n++) { var b = document.createElement("b"); b.textContent = n; rolo.appendChild(b); }
      span.appendChild(rolo); odo.appendChild(span); colunas.push(rolo);
    });
    requestAnimationFrame(function () {
      setTimeout(function () {
        colunas.forEach(function (rolo, i) {
          rolo.style.transitionDelay = (i * 0.08) + "s";
          rolo.style.transform = "translateY(-" + alvo[i] + "em)";
        });
      }, 120);
    });
    var saiu = false;
    function sair() {
      if (saiu) return; saiu = true;
      el.classList.add("abertura--sobe");
      setTimeout(fimAbertura, 250);
      setTimeout(function () { el.remove(); }, 1000);
    }
    var t0 = performance.now();
    window.addEventListener("load", function () { setTimeout(sair, Math.max(0, 1700 - (performance.now() - t0))); });
    setTimeout(sair, 3000);
    el.addEventListener("click", sair);
  }

  /* ================= Rolagem suave ================= */
  function alturaTopo() {
    var t = document.querySelector(".topo");
    return t ? t.offsetHeight : 0;
  }
  function iniciarRolagem() {
    var podeLenis = typeof window.Lenis !== "undefined" && !reduz;
    if (podeLenis) {
      lenis = new window.Lenis({
        duration: 1.15,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel: true,
        wheelMultiplier: 0.95,
      });
      if (temGsap) {
        lenis.on("scroll", window.ScrollTrigger.update);
        window.gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
      }
      if (aberturaAtiva) { lenis.stop(); document.addEventListener("lang:abertura-fim", function () { lenis.start(); }); }
    }

    // Âncoras internas passam pela mesma curva de rolagem
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href*="#"]');
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
  function ir(alvo) {
    if (!alvo) return;
    if (lenis) lenis.scrollTo(alvo, { offset: -alturaTopo() + 1, duration: 1.4 });
    else window.scrollTo({ top: alvo.getBoundingClientRect().top + window.scrollY - alturaTopo(), behavior: reduz ? "auto" : "smooth" });
  }
  function travar(sim) {
    if (!lenis) return;
    if (sim) lenis.stop(); else lenis.start();
  }

  /* ================= Letreiro guiado pela rolagem (sem GSAP) ================= */
  function iniciarLetreiros() {
    document.querySelectorAll(".letreiro__trilha").forEach(function (trilha) {
      var grupo = trilha.querySelector(".letreiro__grupo");
      if (!grupo) return;
      trilha.appendChild(grupo.cloneNode(true)).setAttribute("aria-hidden", "true");
      var largura = grupo.offsetWidth;
      window.addEventListener("resize", function () { largura = grupo.offsetWidth; });
      var x = 0, base = reduz ? 0 : -0.6, impulso = 0, direcao = 1, ultimoY = window.scrollY, visivel = true;
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (es) { visivel = es[0].isIntersecting; }).observe(trilha);
      }
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
  function iniciarCoreografia() {
    if (!temGsap || reduz) return;
    var gsap = window.gsap, ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);

    // Títulos: linhas sobem de dentro da máscara
    gsap.utils.toArray("[data-linhas]").forEach(function (titulo) {
      if (titulo.closest(".hero")) return; // hero tem entrada própria
      gsap.from(titulo.querySelectorAll(".linha-mask > span"), {
        yPercent: 108, duration: 1.05, ease: "expo.out", stagger: 0.09,
        scrollTrigger: { trigger: titulo, start: "top 88%", once: true },
      });
    });

    // Blocos de texto e listas: entram de leve, em sequência
    gsap.utils.toArray("[data-revela]").forEach(function (el) {
      gsap.from(el, { y: 36, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
    gsap.utils.toArray("[data-revela-grupo]").forEach(function (grupo) {
      gsap.from(grupo.children, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.07, scrollTrigger: { trigger: grupo, start: "top 86%", once: true } });
    });

    // Fotos: porta de enrolar subindo + leve zoom-out
    gsap.utils.toArray("[data-porta]").forEach(function (moldura) {
      var img = moldura.querySelector("img");
      var tl = gsap.timeline({ scrollTrigger: { trigger: moldura, start: "top 85%", once: true } });
      tl.fromTo(moldura, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" });
      if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "expo.out" }, 0.1);
    });

    // Hero: foto desce mais devagar (parallax) e o conteúdo sai de cena
    var heroImg = document.querySelector(".hero__midia img");
    if (heroImg) {
      gsap.to(heroImg, { yPercent: 16, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero__in", { yPercent: -18, opacity: 0.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "40% top", end: "bottom top", scrub: true } });
    }

    // Entrada do hero (depois da abertura, se houver)
    function entradaHero() {
      var tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero [data-linhas] .linha-mask > span", { yPercent: 110, duration: 1.2, stagger: 0.1 })
        .from(".hero__texto, .hero__acoes, .hero .rotulo", { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.8")
        .from(".hero__placa", { y: 40, rotate: -18, opacity: 0, duration: 1.1 }, "-=0.9")
        .from(".hero__base", { opacity: 0, duration: 0.8 }, "-=0.6");
      if (heroImg) gsap.from(heroImg, { scale: 1.18, duration: 2.4, ease: "expo.out" }, 0);
    }
    if (document.querySelector(".hero")) {
      if (aberturaAtiva) {
        gsap.set(".hero [data-linhas] .linha-mask > span", { yPercent: 110 });
        document.addEventListener("lang:abertura-fim", function () { gsap.set(".hero [data-linhas] .linha-mask > span", { clearProps: "transform" }); entradaHero(); }, { once: true });
      } else entradaHero();
    }

    // Cravos do pneu rodam com a rolagem
    gsap.utils.toArray(".pneu__trilha").forEach(function (t) {
      gsap.fromTo(t, { x: 0 }, { x: -88, ease: "none", repeat: 0, scrollTrigger: { trigger: t, start: "top bottom", end: "bottom top", scrub: 0.3 } });
    });

    // Placa na seção de história gira levemente com a rolagem
    gsap.utils.toArray("[data-placa-gira]").forEach(function (p) {
      gsap.fromTo(p, { rotate: -14 }, { rotate: 6, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // Recalcula depois de imagens/fontes
    window.addEventListener("load", function () { ST.refresh(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
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

  document.addEventListener("DOMContentLoaded", function () {
    iniciarAbertura();
    iniciarRolagem();
    iniciarCoreografia();
    iniciarLetreiros();
    iniciarIndicador();
    iniciarLightbox();
  });
})();
