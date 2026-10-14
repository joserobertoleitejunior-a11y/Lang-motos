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

  /* ================= Letreiro: botões que correm, reagem à rolagem e ao arrasto ================= */
  function iniciarLetreiros() {
    document.querySelectorAll(".letreiro__trilha").forEach(function (trilha) {
      var secao = trilha.parentElement, grupo = trilha.querySelector(".letreiro__grupo");
      if (!grupo) return;
      var originais = Array.prototype.slice.call(grupo.children);
      var clones = originais.map(function (el) {
        var c = el.cloneNode(true);
        c.setAttribute("aria-hidden", "true"); c.setAttribute("tabindex", "-1");
        return c;
      });
      clones.forEach(function (c) { grupo.appendChild(c); });
      var itens = originais.concat(clones), pos = [], larg = [], total = 0, altura = 0;

      // Cada item vira uma peça solta e leve (translate3d), em vez de uma faixa gigante de uma peça só.
      function medir() {
        trilha.classList.remove("pronto");
        itens.forEach(function (el) { el.style.transform = ""; });
        grupo.classList.remove("solto");
        var soma = 0;
        itens.forEach(function (el, i) { larg[i] = el.offsetWidth; pos[i] = soma; soma += larg[i]; altura = Math.max(altura, el.offsetHeight); });
        total = soma;                      // largura das duas voltas juntas
        trilha.style.height = altura + "px";
        grupo.classList.add("solto");
        trilha.classList.add("pronto");
      }
      medir();
      var tm = null;
      window.addEventListener("resize", function () { clearTimeout(tm); tm = setTimeout(medir, 150); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);

      var x = 0, base = reduz ? 0 : -0.7, impulso = 0, direcao = 1, inercia = 0, vel = 0;
      var ultimoY = window.scrollY, visivel = true, arrasto = null, moveu = false, ultimoT = performance.now();
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (es) { visivel = es[0].isIntersecting; }, { rootMargin: "120px 0px" }).observe(secao);
      }
      window.addEventListener("scroll", function () {
        var dy = window.scrollY - ultimoY; ultimoY = window.scrollY;
        if (reduz) return;
        if (dy !== 0) direcao = dy > 0 ? 1 : -1;
        impulso = Math.max(-28, Math.min(28, impulso + dy * 0.12));
      }, { passive: true });

      var dica = document.createElement("span");
      dica.className = "letreiro__dica"; dica.setAttribute("aria-hidden", "true"); dica.textContent = "Toque num item ou arraste";
      secao.appendChild(dica);

      function soltar(e) {
        if (!arrasto || (e && e.pointerId !== arrasto.id)) return;
        if (arrasto.ativo) {
          inercia = Math.max(-70, Math.min(70, vel));
          if (Math.abs(inercia) > 0.5) direcao = inercia > 0 ? -1 : 1;
          moveu = true; setTimeout(function () { moveu = false; }, 60);
        }
        try { secao.releasePointerCapture(arrasto.id); } catch (err) {}
        secao.classList.remove("arrastando"); arrasto = null;
      }
      secao.addEventListener("pointerdown", function (e) {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        arrasto = { id: e.pointerId, x0: e.clientX, ult: e.clientX, t: e.timeStamp, ativo: false };
        vel = 0; inercia = 0;
      });
      secao.addEventListener("pointermove", function (e) {
        if (!arrasto || e.pointerId !== arrasto.id) return;
        if (!arrasto.ativo) {
          if (Math.abs(e.clientX - arrasto.x0) < 4) return;
          arrasto.ativo = true; secao.classList.add("arrastando");
          try { secao.setPointerCapture(e.pointerId); } catch (err) {}
          dica.classList.add("some");
        }
        var d = e.clientX - arrasto.ult; arrasto.ult = e.clientX;
        x += d; vel = vel * 0.5 + d * 0.5;
      });
      secao.addEventListener("pointerup", soltar);
      secao.addEventListener("pointercancel", soltar);
      secao.addEventListener("lostpointercapture", soltar);
      secao.addEventListener("dragstart", function (e) { e.preventDefault(); });
      // arrastou? então não conta como toque no botão
      secao.addEventListener("click", function (e) {
        if (moveu || (arrasto && arrasto.ativo)) { e.preventDefault(); e.stopPropagation(); return; }
        var botao = e.target.closest("[data-faixa]");
        if (botao && !botao.hasAttribute("aria-hidden")) abrirFaixa(botao);
        else if (botao) { var ori = originais[clones.indexOf(botao)]; if (ori) abrirFaixa(ori); }
      }, true);

      var ultimaX = null;
      function desenhar() {
        if (!total) return;
        var meio = total;                    // duas voltas
        var xm = ((x % meio) + meio) % meio; // 0..meio
        if (xm === ultimaX) return; ultimaX = xm;
        var vw = secao.clientWidth;
        for (var i = 0; i < itens.length; i++) {
          var px = pos[i] + xm;
          if (px >= meio - larg[i]) px -= meio;      // volta pela esquerda
          var fora = px > vw + 40 || px < -larg[i] - 40;
          var el = itens[i];
          if (fora) { if (!el._f) { el.style.visibility = "hidden"; el._f = 1; } }
          else { if (el._f) { el.style.visibility = ""; el._f = 0; } el.style.transform = "translate3d(" + px.toFixed(1) + "px,0,0)"; }
        }
      }

      requestAnimationFrame(function quadro(t) {
        var dt = Math.min(3, Math.max(0.5, (t - ultimoT) / 16.667)); ultimoT = t;   // mantém a velocidade igual em celular lento
        var segurando = arrasto && arrasto.ativo;
        if (visivel || segurando) {
          if (segurando) { vel *= Math.pow(0.85, dt); impulso *= Math.pow(0.9, dt); }
          else {
            x += (base * direcao - Math.abs(impulso) * direcao * 0.5 + inercia) * dt;
            impulso *= Math.pow(0.9, dt); inercia *= Math.pow(0.94, dt);
            if (Math.abs(inercia) < 0.05) inercia = 0;
          }
          desenhar();
        }
        requestAnimationFrame(quadro);
      });
    });
  }

  /* ================= Janela do item do letreiro (curiosidade + foto) ================= */
  var faixaCaixa = null;
  function abrirFaixa(botao) {
    var d = botao.dataset, cfg = window.LANG_CONFIG || {};
    if (!faixaCaixa) {
      faixaCaixa = document.createElement("div");
      faixaCaixa.className = "faixa-modal"; faixaCaixa.setAttribute("role", "dialog"); faixaCaixa.setAttribute("aria-modal", "true"); faixaCaixa.setAttribute("aria-labelledby", "faixa-titulo");
      faixaCaixa.innerHTML =
        '<div class="faixa-modal__veu" data-fecha></div>' +
        '<article class="faixa-modal__cartao">' +
        '<button class="faixa-modal__x" type="button" data-fecha aria-label="Fechar">×</button>' +
        '<figure class="faixa-modal__foto"><img alt="" decoding="async"><span class="faixa-modal__selo mono"></span></figure>' +
        '<div class="faixa-modal__corpo"><span class="rotulo faixa-modal__rot"><b>Você sabia?</b></span><h3 id="faixa-titulo"></h3><p class="faixa-modal__cur"></p><p class="faixa-modal__txt"></p>' +
        '<div class="faixa-modal__acoes"><button class="btn" type="button" data-orcar><span></span><span class="btn__seta" aria-hidden="true"></span></button><a class="btn btn--vidro faixa-modal__zap" target="_blank" rel="noopener"><span class="ponto-zap"></span> Falar no WhatsApp</a></div></div>' +
        '</article>';
      document.body.appendChild(faixaCaixa);
      faixaCaixa.addEventListener("click", function (e) { if (e.target.closest("[data-fecha]")) fecharFaixa(); });
      faixaCaixa.querySelector("[data-orcar]").addEventListener("click", function () {
        var nome = faixaCaixa.dataset.servico; fecharFaixa();
        var alvo = document.querySelector('[data-consultar-servico="' + nome + '"]');
        if (alvo) alvo.click(); else { var o = document.getElementById("orcamento"); if (o) ir(o); }
      });
      document.addEventListener("keydown", function (e) {
        if (!faixaCaixa.classList.contains("aberto")) return;
        if (e.key === "Escape") fecharFaixa();
        if (e.key === "Tab") {
          var f = Array.prototype.slice.call(faixaCaixa.querySelectorAll("button, a[href]")).filter(function (n) { return n.offsetParent !== null; });
          if (!f.length) return;
          var p = f[0], u = f[f.length - 1];
          if (e.shiftKey && document.activeElement === p) { e.preventDefault(); u.focus(); }
          else if (!e.shiftKey && document.activeElement === u) { e.preventDefault(); p.focus(); }
        }
      });
    }
    var img = faixaCaixa.querySelector("img");
    faixaCaixa._foco = document.activeElement;
    faixaCaixa.dataset.servico = d.servico || "";
    faixaCaixa.querySelector("h3").textContent = d.titulo || "";
    faixaCaixa.querySelector(".faixa-modal__cur").textContent = d.cur || "";
    faixaCaixa.querySelector(".faixa-modal__txt").textContent = d.txt || "";
    faixaCaixa.querySelector(".faixa-modal__selo").textContent = "Lang Motos · Itapetininga";
    faixaCaixa.querySelector("[data-orcar] span").textContent = "Pedir orçamento";
    var zap = faixaCaixa.querySelector(".faixa-modal__zap");
    zap.href = "https://wa.me/" + (cfg.whatsappNumero || "") + "?text=" + encodeURIComponent(d.msg || "");
    img.classList.remove("carregada");
    img.onload = function () { requestAnimationFrame(function () { img.classList.add("carregada"); }); };
    img.style.objectPosition = d.pos || "50% 50%";
    img.alt = "Foto da Lang Motos: " + (d.titulo || "");
    img.src = d.img;
    if (img.complete) img.classList.add("carregada");
    faixaCaixa.classList.add("aberto");
    travar(true); document.body.style.overflow = "hidden";
    setTimeout(function () { var x = faixaCaixa.querySelector(".faixa-modal__x"); if (x) x.focus({ preventScroll: true }); }, 30);
  }
  function fecharFaixa() {
    if (!faixaCaixa) return;
    faixaCaixa.classList.remove("aberto"); travar(false); document.body.style.overflow = "";
    var f = faixaCaixa._foco; if (f && f.focus) f.focus({ preventScroll: true });
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
