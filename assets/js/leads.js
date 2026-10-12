/**
 * Lang Motos — captura de leads e medição do site.
 *
 * O site continua funcionando sem isto: o WhatsApp abre do mesmo jeito. Aqui só
 * guardamos, em segundo plano, (1) o pedido que o visitante enviou (lead) e
 * (2) contagens anônimas de uso (visitas e cliques), para alimentar o painel.
 *
 * Regras:
 *  - nunca bloqueia nem atrasa o WhatsApp; qualquer falha é silenciosa;
 *  - o banco aceita só INSERT do público (RLS) e nenhuma leitura;
 *  - eventos não levam dado pessoal; respeitam "Não rastrear" do navegador;
 *  - lead só é gravado quando a pessoa envia um formulário ou toca em "enviar".
 */
(function () {
  "use strict";

  var cfg = (window.LANG_CONFIG && window.LANG_CONFIG.supabase) || {};
  var ativo = !!(cfg.url && cfg.anonKey);
  var naoRastrear = navigator.doNotTrack === "1" || window.doNotTrack === "1";

  function sessao() {
    try {
      var s = sessionStorage.getItem("lang-sessao");
      if (!s) {
        s = (window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2)).replace(/-/g, "").slice(0, 32);
        sessionStorage.setItem("lang-sessao", s);
      }
      return s;
    } catch (e) { return null; }
  }

  function pagina() {
    var p = location.pathname.split("/").pop() || "index.html";
    return p.slice(0, 200);
  }

  function enviar(tabela, corpo, tentativas) {
    if (!ativo) return Promise.resolve(false);
    var ctl = "AbortController" in window ? new AbortController() : null;
    var limite = ctl ? setTimeout(function () { ctl.abort(); }, 8000) : null;
    return fetch(cfg.url + "/rest/v1/" + tabela, {
      method: "POST",
      headers: {
        "apikey": cfg.anonKey,
        "Authorization": "Bearer " + cfg.anonKey,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
      },
      body: JSON.stringify(corpo),
      keepalive: true,
      signal: ctl ? ctl.signal : undefined,
    }).then(function (r) {
      if (limite) clearTimeout(limite);
      return r.ok;
    }).catch(function () {
      if (limite) clearTimeout(limite);
      // uma nova tentativa para falha de rede (não para erro do servidor)
      if ((tentativas || 0) < 1) {
        return new Promise(function (ok) { setTimeout(ok, 2500); }).then(function () { return enviar(tabela, corpo, 1); });
      }
      return false;
    });
  }

  function limpar(v, max) {
    if (v === null || v === undefined) return null;
    v = String(v).trim();
    return v ? v.slice(0, max) : null;
  }

  var ultimos = {};

  /** Grava um lead. `dados`: nome, telefone, moto, servicos[], mensagem, periodo. Nunca lança erro. */
  function registrar(origem, dados) {
    try {
      dados = dados || {};
      var servicos = (dados.servicos || []).map(function (s) { return limpar(s, 60); }).filter(Boolean).slice(0, 12);
      var corpo = {
        origem: origem,
        nome: limpar(dados.nome, 120),
        telefone: limpar(dados.telefone, 30),
        moto: limpar(dados.moto, 120),
        servicos: servicos,
        mensagem: limpar(dados.mensagem, 2000),
        periodo: ["Manhã", "Tarde", "Tanto faz"].indexOf(dados.periodo) >= 0 ? dados.periodo : null,
        pagina: pagina(),
        sessao: sessao(),
        consentimento: true,
      };
      // evita gravar o mesmo pedido duas vezes (duplo clique) em 60 s
      var chave = origem + "|" + JSON.stringify([corpo.nome, corpo.telefone, corpo.moto, corpo.servicos, corpo.mensagem]);
      var agora = Date.now();
      if (ultimos[chave] && agora - ultimos[chave] < 60000) return Promise.resolve(true);
      ultimos[chave] = agora;
      return enviar("leads", corpo, 0);
    } catch (e) { return Promise.resolve(false); }
  }

  /** Conta um uso do site (sem dado pessoal). */
  function evento(tipo, detalhe) {
    if (naoRastrear || !ativo) return;
    try {
      enviar("eventos", { tipo: tipo, pagina: pagina(), sessao: sessao(), detalhe: limpar(detalhe, 120) }, 0);
    } catch (e) {}
  }

  window.LangLeads = { registrar: registrar, evento: evento, ativo: ativo };

  /* ---------- Medição automática ---------- */
  function visita() {
    try {
      var chave = "lang-visita-" + pagina();
      if (sessionStorage.getItem(chave)) return;
      sessionStorage.setItem(chave, "1");
    } catch (e) {}
    evento("visita");
  }

  function aoClicar(e) {
    var a = e.target.closest && e.target.closest("a, button");
    if (!a) return;
    var href = a.getAttribute("href") || "";
    if (a.hasAttribute("data-whatsapp-link") || a.hasAttribute("data-whatsapp-mensagem") || /^https:\/\/wa\.me\//.test(href)) {
      evento("clique_whatsapp", a.closest(".dock") ? "dock" : a.closest(".widget") ? "widget" : a.closest(".rodape") ? "rodape" : a.closest(".final") ? "final" : a.closest(".hero") ? "topo" : "pagina");
    } else if (/^tel:/.test(href)) {
      evento("clique_telefone");
    } else if (/google\.com\/maps|waze\.com/.test(href)) {
      evento("clique_rota");
    } else if (/instagram\.com/.test(href)) {
      evento("clique_instagram");
    } else if (a.hasAttribute("data-abrir-agendamento")) {
      evento("abre_agendamento");
    } else if (a.hasAttribute("data-chat-abrir")) {
      evento("abre_assistente");
    }
  }

  (document.readyState === "loading" ? function (f) { document.addEventListener("DOMContentLoaded", f); } : function (f) { f(); })(function () {
    visita();
    document.addEventListener("click", aoClicar, true);
    var os = document.querySelector("[data-form-orcamento]");
    if (os) os.addEventListener("focusin", function () { evento("abre_orcamento"); }, { once: true });
  });
})();
