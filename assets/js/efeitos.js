/**
 * Efeitos premium da Lang Motos (camada visual, opcional):
 * abertura com a marca, barra de progresso de leitura, holofote + tilt 3D
 * nos cards, botões magnéticos e galeria em tela cheia (lightbox).
 * Tudo progressivo: sem JS o site continua completo; respeita
 * prefers-reduced-motion e não roda efeitos de mouse em telas de toque.
 */
(function () {
  "use strict";

  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mouseFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Abertura (só na 1ª página da visita) ---------- */
  function iniciarAbertura() {
    var abertura = document.querySelector("[data-abertura]");
    if (!abertura) return;
    var jaViu = false;
    try { jaViu = sessionStorage.getItem("lang-abertura") === "1"; } catch (e) {}
    if (jaViu || reduz) {
      abertura.remove();
      document.documentElement.classList.remove("com-abertura");
      return;
    }
    try { sessionStorage.setItem("lang-abertura", "1"); } catch (e) {}
    var fechou = false;
    function fechar() {
      if (fechou) return;
      fechou = true;
      abertura.classList.add("abertura--saindo");
      document.documentElement.classList.remove("com-abertura");
      setTimeout(function () { abertura.remove(); }, 900);
    }
    // Sai assim que a página carrega (mínimo 1,1s pra animação respirar,
    // máximo 2,6s pra nunca prender o visitante numa conexão lenta).
    var inicio = performance.now();
    window.addEventListener("load", function () {
      setTimeout(fechar, Math.max(0, 1100 - (performance.now() - inicio)));
    });
    setTimeout(fechar, 2600);
    abertura.addEventListener("click", fechar);
  }

  /* ---------- Barra de progresso de leitura ---------- */
  function iniciarProgresso() {
    var barra = document.querySelector(".progresso-leitura");
    if (!barra) return;
    var agendado = false;
    function atualizar() {
      agendado = false;
      var total = document.documentElement.scrollHeight - window.innerHeight;
      barra.style.transform = "scaleX(" + (total > 0 ? Math.min(window.scrollY / total, 1) : 0) + ")";
    }
    window.addEventListener("scroll", function () {
      if (!agendado) { agendado = true; requestAnimationFrame(atualizar); }
    }, { passive: true });
    atualizar();
  }

  /* ---------- Holofote + tilt 3D nos cards ---------- */
  function iniciarHolofote() {
    if (!mouseFino) return;
    document.querySelectorAll("[data-holofote]").forEach(function (card) {
      var inclina = card.hasAttribute("data-tilt") && !reduz;
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = e.clientX - r.left, y = e.clientY - r.top;
        card.style.setProperty("--mx", x + "px");
        card.style.setProperty("--my", y + "px");
        if (inclina) {
          var rx = ((y / r.height) - 0.5) * -7;
          var ry = ((x / r.width) - 0.5) * 9;
          card.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-6px)";
        }
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Botões magnéticos ---------- */
  function iniciarMagneticos() {
    if (!mouseFino || reduz) return;
    document.querySelectorAll("[data-magnetico]").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.22;
        var y = (e.clientY - r.top - r.height / 2) * 0.32;
        el.style.transform = "translate(" + x + "px," + y + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
  }

  /* ---------- Lightbox da galeria ---------- */
  function iniciarLightbox() {
    var itens = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    if (!itens.length) return;

    var caixa = document.createElement("div");
    caixa.className = "lightbox";
    caixa.setAttribute("role", "dialog");
    caixa.setAttribute("aria-modal", "true");
    caixa.setAttribute("aria-label", "Foto ampliada");
    caixa.innerHTML =
      '<button class="lightbox__fechar" type="button" aria-label="Fechar">×</button>' +
      '<button class="lightbox__nav lightbox__nav--ant" type="button" aria-label="Foto anterior">‹</button>' +
      '<figure class="lightbox__figura"><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lightbox__nav lightbox__nav--prox" type="button" aria-label="Próxima foto">›</button>' +
      '<span class="lightbox__contador" aria-live="polite"></span>';
    document.body.appendChild(caixa);

    var img = caixa.querySelector("img");
    var legenda = caixa.querySelector("figcaption");
    var contador = caixa.querySelector(".lightbox__contador");
    var atual = 0, ultimoFoco = null, toqueX = null;

    function mostrar(i) {
      atual = (i + itens.length) % itens.length;
      var item = itens[atual];
      var miniatura = item.querySelector("img");
      img.classList.remove("carregada");
      img.onload = function () { img.classList.add("carregada"); };
      img.src = item.getAttribute("data-lightbox");
      img.alt = miniatura ? miniatura.alt : "";
      var cap = item.querySelector("figcaption");
      legenda.textContent = cap ? cap.textContent : "";
      contador.textContent = (atual + 1) + " / " + itens.length;
    }
    function abrir(i) {
      ultimoFoco = document.activeElement;
      mostrar(i);
      caixa.classList.add("aberto");
      document.body.style.overflow = "hidden";
      caixa.querySelector(".lightbox__fechar").focus();
    }
    function fechar() {
      caixa.classList.remove("aberto");
      document.body.style.overflow = "";
      if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
    }

    itens.forEach(function (item, i) {
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      item.addEventListener("click", function () { abrir(i); });
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(i); }
      });
    });
    caixa.querySelector(".lightbox__fechar").addEventListener("click", fechar);
    caixa.querySelector(".lightbox__nav--ant").addEventListener("click", function () { mostrar(atual - 1); });
    caixa.querySelector(".lightbox__nav--prox").addEventListener("click", function () { mostrar(atual + 1); });
    caixa.addEventListener("click", function (e) { if (e.target === caixa) fechar(); });
    document.addEventListener("keydown", function (e) {
      if (!caixa.classList.contains("aberto")) return;
      if (e.key === "Escape") fechar();
      if (e.key === "ArrowLeft") mostrar(atual - 1);
      if (e.key === "ArrowRight") mostrar(atual + 1);
    });
    caixa.addEventListener("touchstart", function (e) { toqueX = e.touches[0].clientX; }, { passive: true });
    caixa.addEventListener("touchend", function (e) {
      if (toqueX === null) return;
      var dx = e.changedTouches[0].clientX - toqueX;
      if (Math.abs(dx) > 50) mostrar(atual + (dx < 0 ? 1 : -1));
      toqueX = null;
    });
  }

  iniciarAbertura();
  document.addEventListener("DOMContentLoaded", function () {
    iniciarProgresso();
    iniciarHolofote();
    iniciarMagneticos();
    iniciarLightbox();
  });
})();
