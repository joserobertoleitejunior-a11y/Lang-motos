/**
 * Lang Motos — Painel da equipe (dashboard + CRM).
 *
 * - Login por e-mail e senha (Supabase Auth). Só entra quem foi liberado na tabela
 *   `acessos`; o banco recusa tudo para os demais (RLS), mesmo que a tela seja burlada.
 * - Dashboard: leads, funil, origem, serviços, horário de pico e uso do site.
 * - CRM: funil em colunas (arrastar e soltar), gaveta com dados, histórico, notas,
 *   retorno agendado e mensagens prontas de WhatsApp.
 * - Atualização ao vivo (realtime) com reserva por consulta a cada 60 s.
 * - `painel.html#demo`: dados de exemplo, nada é salvo (serve para mostrar o painel).
 *
 * Todo texto vindo do banco é tratado como não confiável e passa por esc().
 */
(function () {
  "use strict";

  /* ============================== utilidades ============================== */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const TZ = "America/Sao_Paulo";
  const fDia = new Intl.DateTimeFormat("en-CA", { timeZone: TZ });
  const fHora = new Intl.DateTimeFormat("en-GB", { timeZone: TZ, hour: "2-digit", hour12: false });
  const fDM = new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, day: "2-digit", month: "2-digit" });
  const fDMH = new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  const fHM = new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
  const fSem = new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, weekday: "short" });
  const dia = (d) => fDia.format(new Date(d));
  const horaDe = (d) => Number(fHora.format(new Date(d))) % 24;
  const brl = (n) => (n == null ? "—" : Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }));
  const num = (n) => Number(n).toLocaleString("pt-BR");
  const MS = 864e5;

  function digitos(t) { return String(t || "").replace(/\D/g, ""); }
  function fmtTel(t) {
    let d = digitos(t);
    if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
    if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return t || "";
  }
  function zapLink(tel, msg) {
    let d = digitos(tel);
    if (!d) return "";
    if (d.length <= 11) d = "55" + d;
    return "https://wa.me/" + d + (msg ? "?text=" + encodeURIComponent(msg) : "");
  }
  function quando(iso) {
    const d = new Date(iso), diff = Date.now() - d.getTime(), min = Math.round(diff / 60000);
    if (min < 1) return "agora";
    if (min < 60) return `há ${min} min`;
    if (min < 60 * 24 && dia(d) === dia(new Date())) return `há ${Math.round(min / 60)} h`;
    if (dia(d) === dia(new Date(Date.now() - MS))) return "ontem " + fHM.format(d);
    return fDM.format(d);
  }
  function paraInputLocal(iso) {
    if (!iso) return "";
    const d = new Date(iso), p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
  }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }

  /* ============================== domínio ============================== */
  const STATUS = [
    { id: "novo", nome: "Novo", cor: "var(--f1)" },
    { id: "contato", nome: "Em contato", cor: "var(--f2)" },
    { id: "orcamento", nome: "Orçamento enviado", cor: "var(--f3)" },
    { id: "agendado", nome: "Agendado", cor: "var(--f4)" },
    { id: "concluido", nome: "Concluído", cor: "var(--f5)" },
    { id: "perdido", nome: "Perdido", cor: "var(--f6)" },
  ];
  const ST = Object.fromEntries(STATUS.map((s) => [s.id, s]));
  const ABERTOS = ["novo", "contato", "orcamento", "agendado"];
  const ORIGENS = { orcamento: "Orçamento", agendamento: "Agendamento", assistente: "Pré-atendimento", manual: "Manual" };
  const ORIGEM_COR = { orcamento: "var(--s1)", agendamento: "var(--s2)", assistente: "var(--s3)", manual: "var(--s4)" };
  const SERVICOS = ["Oficina mecânica", "Revisão e troca de óleo", "Peças", "Acessórios", "Retífica de motor", "Alinhamento de chassis", "A avaliar"];
  const SERV_COR = Object.fromEntries(SERVICOS.map((s, i) => [s, `var(--s${i + 1})`]));

  function normServico(s) {
    const t = String(s || "").toLowerCase();
    if (/óleo|oleo|revis/.test(t)) return "Revisão e troca de óleo";
    if (/retífic|retific/.test(t)) return "Retífica de motor";
    if (/chassi|alinh/.test(t)) return "Alinhamento de chassis";
    if (/capacete|acess/.test(t)) return "Acessórios";
    if (/peça|peca/.test(t)) return "Peças";
    if (/freio|barulho|liga|falh|mecân|mecan|oficina/.test(t)) return "Oficina mecânica";
    if (/avalia|não sei|nao sei/.test(t)) return "A avaliar";
    return SERVICOS.includes(s) ? s : "A avaliar";
  }
  const servicosDe = (l) => Array.from(new Set((l.servicos && l.servicos.length ? l.servicos : []).map(normServico)));

  const MODELOS_ZAP = [
    { id: "primeiro", nome: "Primeiro contato", txt: (l) => `Olá, ${prim(l)}! Aqui é da Lang Motos. Recebi seu pedido${l.servicos && l.servicos.length ? " sobre " + l.servicos.join(", ").toLowerCase() : ""}${l.moto ? " da sua " + l.moto : ""}. Posso te ajudar?` },
    { id: "orcamento", nome: "Enviar orçamento", txt: (l) => `Olá, ${prim(l)}! Segue o orçamento${l.moto ? " da sua " + l.moto : ""}: ${l.servicos && l.servicos.length ? l.servicos.join(", ") : "serviço"} — ${l.valor != null ? "R$ " + Number(l.valor).toLocaleString("pt-BR") : "R$ [valor]"}. Se estiver de acordo, me diga o melhor dia e horário.` },
    { id: "agenda", nome: "Confirmar horário", txt: (l) => `Olá, ${prim(l)}! Confirmando seu horário na Lang Motos${l.proximo_contato ? " (" + fDMH.format(new Date(l.proximo_contato)) + ")" : ""}. Av. Cinco de Novembro, 825, Vila Nastri. Qualquer imprevisto, me avise.` },
    { id: "pronta", nome: "Moto pronta", txt: (l) => `Olá, ${prim(l)}! Sua moto${l.moto ? " (" + l.moto + ")" : ""} está pronta pra retirada. Funcionamos de segunda a sexta, das 9h às 18h.` },
    { id: "retorno", nome: "Retomar contato", txt: (l) => `Olá, ${prim(l)}! Tudo bem? Passando pra saber se ainda posso te ajudar com ${l.servicos && l.servicos.length ? l.servicos.join(", ").toLowerCase() : "sua moto"}.` },
  ];
  function prim(l) { return (l.nome || "").trim().split(" ")[0] || "tudo bem"; }

  /* ============================== estado ============================== */
  const cfg = (window.LANG_CONFIG && window.LANG_CONFIG.supabase) || {};
  const LOCAL_ZAP = { dock: "Barra fixa do site", widget: "Botão flutuante", topo: "Topo da página", final: "Chamada final", rodape: "Rodapé", pagina: "Dentro do conteúdo" };
  const NOME_PAG = { "index.html": "Início", "institucional.html": "Institucional", "localizacao.html": "Localização", "privacidade.html": "Privacidade" };
  const DEMO = location.hash === "#demo";
  const S = {
    acesso: null, leads: [], eventos: [], equipe: [], notas: [],
    dias: 30, view: "geral", busca: "", fStatus: "", fOrigem: "", mostrar: 50,
    aberto: null, novo: false, vivo: false, demo: DEMO,
  };
  let api = null;
  let timerPoll = null;

  /* ============================== demonstração ============================== */
  function criarApiDemo() {
    let seed = 42;
    const rnd = () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const pick = (a) => a[Math.floor(rnd() * a.length)];
    const nomes = ["Marcos", "Juliana", "Rafael", "Camila", "Diego", "Patrícia", "Lucas", "Fernanda", "Thiago", "Aline", "Bruno", "Carla", "Eduardo", "Renata", "Gustavo", "Priscila", "Anderson", "Vanessa", "Paulo", "Larissa"];
    const sob = ["P.", "S.", "M.", "O.", "F.", "L.", "R.", "A.", "C.", "T."];
    const motos = ["Honda CG 160", "Yamaha Fazer 250", "Honda Biz 125", "Honda Bros 160", "Yamaha Factor 150", "Honda XRE 300", "Suzuki Yes 125", "Honda Pop 110i", "Honda CB 300F", "Yamaha Lander 250", "Honda Titan 160"];
    const relatos = ["Barulho na corrente", "Freio chiando", "Revisão dos 10 mil km", "Moto falhando em baixa", "Quero ver capacete tamanho 58", "Troca de relação completa", "Moto puxando pra um lado depois de queda", "Perdendo óleo", ""];
    const origens = ["orcamento", "orcamento", "orcamento", "agendamento", "agendamento", "assistente", "assistente", "manual"];
    const leads = [], notas = {};
    const agora = Date.now();
    let id = 1;
    for (let d = 59; d >= 0; d--) {
      const dt = new Date(agora - d * MS), sem = dt.getDay();
      const n = sem === 0 ? Math.floor(rnd() * 2) : sem === 6 ? 1 + Math.floor(rnd() * 3) : 2 + Math.floor(rnd() * 5);
      for (let i = 0; i < n; i++) {
        const hr = 8 + Math.floor(rnd() * 12) + (rnd() < 0.2 ? 3 : 0);
        const criado = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), Math.min(hr, 23), Math.floor(rnd() * 60));
        if (criado.getTime() > agora) continue;
        const serv = pick(SERVICOS.slice(0, 6));
        const idade = d;
        let status;
        const r = rnd();
        if (idade > 21) status = r < 0.62 ? "concluido" : r < 0.88 ? "perdido" : "agendado";
        else if (idade > 7) status = r < 0.4 ? "concluido" : r < 0.55 ? "perdido" : r < 0.7 ? "agendado" : r < 0.85 ? "orcamento" : "contato";
        else if (idade > 2) status = r < 0.18 ? "concluido" : r < 0.3 ? "agendado" : r < 0.5 ? "orcamento" : r < 0.8 ? "contato" : "novo";
        else status = r < 0.55 ? "novo" : r < 0.8 ? "contato" : r < 0.92 ? "orcamento" : "agendado";
        const tel = rnd() < 0.78 ? "(15) 99999-" + String(1000 + Math.floor(rnd() * 8999)) : null;
        const l = {
          id: "d" + id++, criado_em: criado.toISOString(), atualizado_em: criado.toISOString(), origem: pick(origens), status,
          nome: rnd() < 0.85 ? pick(nomes) + " " + pick(sob) : null, telefone: tel, moto: rnd() < 0.9 ? pick(motos) : null,
          servicos: [serv], mensagem: pick(relatos) || null, periodo: rnd() < 0.4 ? pick(["Manhã", "Tarde", "Tanto faz"]) : null,
          pagina: "index.html", valor: null, motivo_perda: null, proximo_contato: null, consentimento: true,
        };
        if (status === "concluido") l.valor = Math.round((60 + rnd() * 880) / 10) * 10;
        if (status === "perdido") l.motivo_perda = pick(["Achou caro", "Sem resposta", "Fechou em outra oficina", "Desistiu do serviço"]);
        if (["contato", "orcamento", "agendado"].includes(status) && rnd() < 0.7) l.proximo_contato = new Date(agora + (Math.floor(rnd() * 5) - 1.5) * 3600e3 * (rnd() < 0.5 ? 6 : 24)).toISOString();
        if (status === "orcamento") l.valor = Math.round((80 + rnd() * 700) / 10) * 10;
        leads.push(l);
        const hist = [];
        if (status !== "novo") hist.push({ tipo: "status", texto: "Status: novo → contato", autor: "equipe@langmotos.com.br", criado_em: new Date(criado.getTime() + 25 * 60000).toISOString() });
        if (["concluido", "perdido"].includes(status)) hist.push({ tipo: "nota", texto: status === "concluido" ? "Serviço feito, cliente retirou a moto." : "Cliente não respondeu mais.", autor: "equipe@langmotos.com.br", criado_em: new Date(criado.getTime() + 2 * 86400e3).toISOString() });
        notas[l.id] = hist.map((h, k) => ({ id: "n" + id + k, lead_id: l.id, ...h }));
      }
    }
    const eventos = [];
    const PAG = [["index.html", 0.62], ["institucional.html", 0.14], ["localizacao.html", 0.24]];
    const LOCAIS = [["dock", 0.34], ["widget", 0.22], ["topo", 0.16], ["final", 0.14], ["rodape", 0.08], ["pagina", 0.06]];
    for (let d = 89; d >= 0; d--) {
      const dt = new Date(agora - d * MS), dd = dia(dt), sem = dt.getDay();
      const vis = Math.round((sem === 0 ? 14 : 28 + rnd() * 40) * (1 + (90 - d) / 220));
      PAG.forEach(([pg, f]) => eventos.push({ dia: dd, tipo: "visita", pagina: pg, detalhe: "", total: Math.round(vis * f * 1.4), sessoes: Math.round(vis * f) }));
      const zap = Math.round(vis * (0.2 + rnd() * 0.1));
      LOCAIS.forEach(([lc, f]) => eventos.push({ dia: dd, tipo: "clique_whatsapp", pagina: "index.html", detalhe: lc, total: Math.round(zap * f), sessoes: Math.round(zap * f * 0.9) }));
      eventos.push({ dia: dd, tipo: "clique_telefone", pagina: "index.html", detalhe: "", total: Math.round(vis * 0.05), sessoes: Math.round(vis * 0.04) });
      eventos.push({ dia: dd, tipo: "clique_rota", pagina: "localizacao.html", detalhe: "", total: Math.round(vis * 0.07), sessoes: Math.round(vis * 0.06) });
      eventos.push({ dia: dd, tipo: "clique_instagram", pagina: "index.html", detalhe: "", total: Math.round(vis * 0.04), sessoes: Math.round(vis * 0.035) });
    }
    // clientes recorrentes na demonstração: alguns telefones voltam a pedir serviço
    const fixos = ["(15) 99871-2040", "(15) 99622-7788", "(15) 99144-3050", "(15) 98830-1177"];
    leads.forEach((l, i) => { if (i % 9 === 0) l.telefone = fixos[(i / 9) % fixos.length | 0]; });
    let equipe = [{ email: "dono@langmotos.com.br", papel: "admin", criado_em: new Date(agora - 40 * MS).toISOString() }, { email: "balcao@langmotos.com.br", papel: "cliente", criado_em: new Date(agora - 12 * MS).toISOString() }];
    let ouvinte = null;
    const clone = (x) => JSON.parse(JSON.stringify(x));
    return {
      sessao: async () => ({}), meuAcesso: async () => ({ logado: true, email: "demo@langmotos.com.br", papel: "admin" }),
      leads: async () => clone(leads.sort((a, b) => (a.criado_em < b.criado_em ? 1 : -1))),
      eventos: async () => clone(eventos),
      atualizar: async (lid, patch) => { const l = leads.find((x) => x.id === lid); if (patch.status && patch.status !== l.status) notas[lid] = (notas[lid] || []).concat({ id: "n" + Math.random(), lead_id: lid, tipo: "status", texto: `Status: ${l.status} → ${patch.status}`, autor: "demo@langmotos.com.br", criado_em: new Date().toISOString() }); Object.assign(l, patch, { atualizado_em: new Date().toISOString() }); return clone(l); },
      criar: async (obj) => { const l = Object.assign({ id: "d" + id++, criado_em: new Date().toISOString(), atualizado_em: new Date().toISOString(), status: "novo", consentimento: true, servicos: [] }, obj); leads.unshift(l); notas[l.id] = []; return clone(l); },
      notas: async (lid) => clone(notas[lid] || []),
      addNota: async (lid, texto, tipo) => { const n = { id: "n" + Math.random(), lead_id: lid, tipo: tipo || "nota", texto, autor: "demo@langmotos.com.br", criado_em: new Date().toISOString() }; (notas[lid] = notas[lid] || []).push(n); return clone(n); },
      apagar: async (lid) => { const i = leads.findIndex((x) => x.id === lid); if (i >= 0) leads.splice(i, 1); },
      acessos: async () => clone(equipe),
      addAcesso: async (email, papel) => { equipe.push({ email, papel, criado_em: new Date().toISOString() }); },
      delAcesso: async (email) => { equipe = equipe.filter((a) => a.email !== email); },
      sair: async () => { location.hash = ""; location.reload(); },
      ouvir: (cb) => {
        ouvinte = cb;
        setTimeout(() => cb("on"), 400);
        setTimeout(() => { // simula um lead chegando do site
          const l = { id: "d" + id++, criado_em: new Date().toISOString(), atualizado_em: new Date().toISOString(), origem: "orcamento", status: "novo", nome: "Ricardo T.", telefone: "(15) 99999-4242", moto: "Honda CG 160", servicos: ["Peças"], mensagem: "Preciso de relação completa", consentimento: true };
          leads.unshift(l); notas[l.id] = []; if (ouvinte) ouvinte({ eventType: "INSERT", new: clone(l) });
        }, 25000);
      },
    };
  }

  /* ============================== API real (Supabase) ============================== */
  function criarApiReal() {
    const sb = window.supabase.createClient(cfg.url, cfg.anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    const ok = (r) => { if (r.error) throw r.error; return r.data; };
    const urlBase = location.href.split("#")[0];
    return {
      onAuth: (cb) => sb.auth.onAuthStateChange((ev, s) => cb(ev, s)),
      sessao: async () => ok(await sb.auth.getSession()).session,
      entrar: async (email, senha) => ok(await sb.auth.signInWithPassword({ email, password: senha })),
      criarConta: async (email, senha) => ok(await sb.auth.signUp({ email, password: senha, options: { emailRedirectTo: urlBase } })),
      redefinir: async (email) => ok(await sb.auth.resetPasswordForEmail(email, { redirectTo: urlBase })),
      novaSenha: async (senha) => ok(await sb.auth.updateUser({ password: senha })),
      sair: () => sb.auth.signOut(),
      meuAcesso: async () => ok(await sb.rpc("meu_acesso")),
      reivindicar: async () => ok(await sb.rpc("reivindicar_admin")),
      leads: async () => {
        const desde = new Date(Date.now() - 190 * MS).toISOString();
        return ok(await sb.from("leads").select("*").or(`criado_em.gte.${desde},status.in.(novo,contato,orcamento,agendado)`).order("criado_em", { ascending: false }).limit(5000));
      },
      eventos: async () => ok(await sb.rpc("resumo_eventos_det", { p_dias: 90 })),
      atualizar: async (lid, patch) => ok(await sb.from("leads").update(patch).eq("id", lid).select().single()),
      criar: async (obj) => ok(await sb.from("leads").insert(obj).select().single()),
      notas: async (lid) => ok(await sb.from("lead_notas").select("*").eq("lead_id", lid).order("criado_em", { ascending: true })),
      addNota: async (lid, texto, tipo) => ok(await sb.from("lead_notas").insert({ lead_id: lid, texto, tipo: tipo || "nota" }).select().single()),
      apagar: async (lid) => ok(await sb.from("leads").delete().eq("id", lid)),
      acessos: async () => ok(await sb.from("acessos").select("*").order("criado_em", { ascending: true })),
      addAcesso: async (email, papel) => ok(await sb.from("acessos").insert({ email, papel })),
      delAcesso: async (email) => ok(await sb.from("acessos").delete().eq("email", email)),
      ouvir: (cb) => {
        sb.channel("lang-leads")
          .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, (p) => cb(p))
          .subscribe((st) => cb(st === "SUBSCRIBED" ? "on" : st === "CLOSED" || st === "CHANNEL_ERROR" || st === "TIMED_OUT" ? "off" : null));
      },
    };
  }

  /* ============================== interface comum ============================== */
  function toast(msg, opcoes) {
    const o = opcoes || {};
    const t = document.createElement("div");
    t.className = "toast" + (o.erro ? " toast--erro" : "");
    t.innerHTML = `<span>${esc(msg)}</span>`;
    if (o.acao) { const b = document.createElement("button"); b.type = "button"; b.textContent = o.acao.txt; b.addEventListener("click", () => { o.acao.fn(); t.remove(); }); t.appendChild(b); }
    $("#toasts").appendChild(t);
    setTimeout(() => t.remove(), o.erro ? 7000 : 5500);
  }
  function tela(id) {
    ["tela-carregando", "tela-login", "tela-nova-senha", "tela-pendente", "app"].forEach((t) => { $("#" + t).hidden = t !== id; });
  }
  function msgErroAuth(e) {
    const m = String((e && e.message) || e || "");
    if (/Invalid login/i.test(m)) return "E-mail ou senha incorretos.";
    if (/not confirmed/i.test(m)) return "Confirme seu e-mail pelo link que enviamos na criação da conta.";
    if (/already registered|already been registered/i.test(m)) return "Esse e-mail já tem conta. Use “Entrar”.";
    if (/at least 6|weak/i.test(m)) return "A senha precisa ter pelo menos 6 caracteres.";
    if (/rate limit|too many/i.test(m)) return "Muitas tentativas. Aguarde alguns minutos.";
    if (/network|fetch/i.test(m)) return "Sem conexão. Tente de novo.";
    return "Não deu certo: " + m;
  }

  /* ============================== cálculo do dashboard ============================== */
  function calc() {
    const agora = Date.now(), d = S.dias, ini = agora - d * MS, iniAnt = agora - 2 * d * MS;
    const L = S.leads;
    const t = (l) => new Date(l.criado_em).getTime();
    const per = L.filter((l) => t(l) >= ini);
    const ant = L.filter((l) => t(l) >= iniAnt && t(l) < ini);
    const hojeStr = dia(new Date());
    const fimHoje = new Date(); fimHoje.setHours(23, 59, 59, 999);
    const conc = per.filter((l) => l.status === "concluido");
    const receita = conc.reduce((s, l) => s + (Number(l.valor) || 0), 0);
    const comValor = conc.filter((l) => l.valor != null).length;
    const abertos = L.filter((l) => ABERTOS.includes(l.status));
    const retornar = abertos.filter((l) => l.proximo_contato && new Date(l.proximo_contato).getTime() <= fimHoje.getTime());
    const atrasados = retornar.filter((l) => new Date(l.proximo_contato).getTime() < agora);
    // leads por dia
    const dias = [];
    for (let i = d - 1; i >= 0; i--) dias.push(dia(new Date(agora - i * MS)));
    const porDia = Object.fromEntries(dias.map((x) => [x, 0]));
    per.forEach((l) => { const k = dia(l.criado_em); if (k in porDia) porDia[k]++; });
    // hora
    const porHora = Array(24).fill(0);
    per.forEach((l) => { porHora[horaDe(l.criado_em)]++; });
    // origem, serviço, etapa
    const porOrigem = {}; per.forEach((l) => { porOrigem[l.origem] = (porOrigem[l.origem] || 0) + 1; });
    const porServ = {}; per.forEach((l) => { const s = servicosDe(l); (s.length ? s : ["A avaliar"]).forEach((x) => { porServ[x] = (porServ[x] || 0) + 1; }); });
    const porEtapa = Object.fromEntries(STATUS.map((s) => [s.id, 0])); per.forEach((l) => { porEtapa[l.status]++; });
    // atenção
    const atencao = [];
    abertos.forEach((l) => {
      if (l.proximo_contato && new Date(l.proximo_contato).getTime() <= fimHoje.getTime()) {
        const tt = new Date(l.proximo_contato).getTime();
        atencao.push({ l, ord: tt < agora ? 0 : 1, rot: tt < agora ? "Retorno atrasado" : "Retornar hoje " + fHM.format(new Date(l.proximo_contato)), atraso: tt < agora });
      } else if (l.status === "novo" && agora - t(l) > 3600e3) {
        atencao.push({ l, ord: 2, rot: "Novo " + quando(l.criado_em).replace("há ", "há "), atraso: agora - t(l) > 6 * 3600e3 });
      }
    });
    atencao.sort((a, b) => a.ord - b.ord || t(a.l) - t(b.l));
    // site
    const ev = { visita: 0, clique_whatsapp: 0, clique_telefone: 0, clique_rota: 0, clique_instagram: 0 };
    const iniDia = dia(new Date(ini));
    const visDia = Object.fromEntries(dias.map((x) => [x, 0]));
    const paginas = {}, canais = {};
    S.eventos.forEach((e) => {
      if (e.dia < iniDia) return;
      const v = e.tipo === "visita" ? Number(e.sessoes) : Number(e.total);
      if (e.tipo in ev) ev[e.tipo] += v;
      if (e.tipo === "visita") { if (e.dia in visDia) visDia[e.dia] += v; paginas[e.pagina] = (paginas[e.pagina] || 0) + v; }
      if (e.tipo === "clique_whatsapp") { const k = LOCAL_ZAP[e.detalhe] || "WhatsApp (outros)"; canais[k] = (canais[k] || 0) + v; }
    });
    // clientes (por telefone): quem mais compra e quem mais entra em contato
    const porTel = {};
    L.forEach((l) => {
      const k = digitos(l.telefone); if (k.length < 10) return;
      const c = porTel[k] || (porTel[k] = { tel: l.telefone, nome: l.nome, pedidos: 0, compras: 0, receita: 0, ultimo: 0 });
      c.pedidos++; if (l.nome && !c.nome) c.nome = l.nome;
      const tt = t(l); if (tt > c.ultimo) c.ultimo = tt;
      if (l.status === "concluido") { c.compras++; c.receita += Number(l.valor) || 0; }
    });
    const clientes = Object.values(porTel);
    const compram = clientes.filter((c) => c.compras > 0).sort((a, b) => b.receita - a.receita || b.compras - a.compras).slice(0, 7);
    const frequentes = clientes.filter((c) => c.pedidos > 1).sort((a, b) => b.pedidos - a.pedidos || b.ultimo - a.ultimo).slice(0, 7);
    const recorrentes = clientes.filter((c) => c.pedidos > 1).length;
    // orçamentos
    const orcs = per.filter((l) => l.origem === "orcamento");
    const orcEtapa = Object.fromEntries(STATUS.map((x) => [x.id, 0])); orcs.forEach((l) => { orcEtapa[l.status]++; });
    const orcAberto = L.filter((l) => l.status === "orcamento");
    const orcValor = orcAberto.reduce((x, l) => x + (Number(l.valor) || 0), 0);
    const orcFechados = orcs.filter((l) => l.status === "concluido").length;
    // motos
    const porMoto = {}; per.forEach((l) => { if (l.moto) { const k = l.moto.trim(); porMoto[k] = (porMoto[k] || 0) + 1; } });
    return { per, ant, hoje: L.filter((l) => dia(l.criado_em) === hojeStr).length, conc, receita, ticket: comValor ? receita / comValor : 0, abertos, retornar, atrasados, dias, porDia, porHora, porOrigem, porServ, porEtapa, atencao, ev, visDia, paginas, canais, compram, frequentes, recorrentes, orcs, orcEtapa, orcAberto, orcValor, orcFechados, porMoto };
  }

  /* ============================== componentes de gráfico ============================== */
  function nice(max) { const p = [4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100, 150, 200, 300, 500, 800, 1000]; return p.find((x) => x >= max) || Math.ceil(max / 100) * 100; }
  function cartaoGrafico(id, titulo, sub, grafico, tabela) {
    return `<div class="cartao__cab"><div><h2>${esc(titulo)}</h2><p>${esc(sub)}</p></div><button class="link" type="button" data-acao="tabela" data-alvo="t-${id}" aria-expanded="false">Ver tabela</button></div>${grafico}<div class="tabela-alt" id="t-${id}" hidden>${tabela}</div>`;
  }
  function tabelaSimples(cab, linhas) {
    return `<table><thead><tr>${cab.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${linhas.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }
  function colunas(valores, rotulos, tips, opts) {
    const o = opts || {};
    const max = nice(Math.max(1, ...valores));
    const passo = o.passo || 1;
    const grade = [0, 0.5, 1].map((f) => `<i style="bottom:${f * 100}%"></i><span style="bottom:${f * 100}%">${Math.round(max * f)}</span>`).join("");
    const barras = valores.map((v, i) => `<div class="col-graf__col" tabindex="0" data-tip="${esc(tips[i])}"><b style="height:${(v / max) * 100}%"></b></div>`).join("");
    const eixo = rotulos.map((r, i) => `<span class="${i % passo === 0 || i === rotulos.length - 1 ? "on" : ""}">${esc(r)}</span>`).join("");
    return `<div class="col-graf" role="img" aria-label="${esc(o.aria || "")}"><div class="col-graf__grade">${grade}</div><div class="col-graf__barras">${barras}</div></div><div class="col-eixo">${eixo}</div>`;
  }
  function barrasH(itens, total, opts) {
    // itens: [{nome, valor, cor, extra}]
    const o = opts || {};
    const max = Math.max(1, ...itens.map((i) => i.valor));
    return `<div class="hb" role="img" aria-label="${esc(o.aria || "")}">${itens.map((i) => `<div class="hb__l" data-tip="${esc(i.nome + "|" + i.valor + (total ? " (" + pct(i.valor, total) + "%)" : ""))}" tabindex="0"><div class="hb__nome"><span class="sw" style="background:${i.cor}"></span><span>${esc(i.nome)}</span></div><div class="hb__pista"><div class="hb__barra" style="width:${(i.valor / max) * 100}%;background:${i.cor}"></div></div><div class="hb__v">${num(i.valor)}${total ? `<small>${pct(i.valor, total)}%</small>` : ""}</div></div>`).join("")}</div>`;
  }
  function delta(a, b) {
    if (!b && !a) return `<span class="delta delta--flat">sem dados antes</span>`;
    if (!b) return `<span class="delta delta--up">novo</span>`;
    const p = Math.round(((a - b) / b) * 100);
    if (p === 0) return `<span class="delta delta--flat">= período anterior</span>`;
    return `<span class="delta ${p > 0 ? "delta--up" : "delta--down"}">${p > 0 ? "▲" : "▼"} ${Math.abs(p)}% vs. período anterior</span>`;
  }

  /* ============================== renderização: visão geral ============================== */
  function vazioCartao(titulo, sub, msg) { return `<div class="cartao__cab"><div><h2>${esc(titulo)}</h2>${sub ? `<p>${esc(sub)}</p>` : ""}</div></div><div class="vazio"><strong>${esc(msg || "Sem dados no período")}</strong></div>`; }
  function ranking(itens) {
    return `<ol class="rank">${itens.map((i, k) => `<li><span class="rank__n">${k + 1}</span><span class="rank__t"><b>${esc(i.t)}</b><small>${esc(i.s)}</small></span><span class="rank__v">${esc(i.v)}<small>${esc(i.vs || "")}</small></span></li>`).join("")}</ol>`;
  }
  function renderGeral() {
    const c = calc();
    $("#periodo-txt").textContent = `${fDM.format(new Date(Date.now() - S.dias * MS))} a ${fDM.format(new Date())}`;
    $$("#periodo button").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.dias) === S.dias)));
    const e = c.ev, totalPer = c.per.length;
    const rec = c.ant.length;
    $("#kpis").innerHTML = `
      <div class="kpi kpi--hero"><div class="kpi__rot">Visitas ao site · ${S.dias} dias</div><div class="kpi__val">${num(e.visita)}</div><div class="kpi__sub">${e.visita ? `<span>${pct(e.clique_whatsapp + e.clique_telefone, e.visita)}% chamaram no WhatsApp ou ligaram</span>` : "aparece após publicar o site"}</div></div>
      <div class="kpi"><div class="kpi__rot">Leads</div><div class="kpi__val">${num(totalPer)}</div><div class="kpi__sub">${delta(totalPer, rec)}<span>· hoje: ${c.hoje}</span></div></div>
      <div class="kpi"><div class="kpi__rot">Orçamentos pedidos</div><div class="kpi__val">${num(c.orcs.length)}</div><div class="kpi__sub">${c.orcAberto.length} aguardando · ${brl(c.orcValor)}</div></div>
      <div class="kpi"><div class="kpi__rot">Em atendimento</div><div class="kpi__val">${num(c.abertos.length)}</div><div class="kpi__sub">${c.atrasados.length ? `<span class="atrasado">${c.atrasados.length} com retorno atrasado</span>` : "nenhum retorno atrasado"}</div></div>
      <div class="kpi"><div class="kpi__rot">Receita dos concluídos</div><div class="kpi__val">${brl(c.receita)}</div><div class="kpi__sub">${c.conc.length} concluídos${c.ticket ? " · ticket " + brl(c.ticket) : ""}</div></div>`;

    const passo = S.dias <= 7 ? 1 : S.dias <= 30 ? 5 : 14;
    const sem = (k) => fSem.format(new Date(k + "T12:00:00")).replace(".", "");
    const rotDia = c.dias.map((k) => k.slice(8) + "/" + k.slice(5, 7));

    // visitas por dia
    const vv = c.dias.map((k) => c.visDia[k]);
    $("#c-visitas").innerHTML = e.visita
      ? cartaoGrafico("vis", "Visitas por dia", `Pessoas que abriram o site, últimos ${S.dias} dias`, colunas(vv, rotDia, c.dias.map((k, i) => `${sem(k)}, ${rotDia[i]}|${vv[i]} ${vv[i] === 1 ? "visita" : "visitas"}`), { passo, aria: `Visitas por dia, total ${e.visita}` }), tabelaSimples(["Dia", "Visitas"], c.dias.map((k, i) => [rotDia[i], vv[i]])))
      : vazioCartao("Visitas por dia", "", "Ainda sem visitas medidas — os números aparecem assim que o site for publicado");

    // funil do site
    const contatos = e.clique_whatsapp + e.clique_telefone;
    const itensFS = [{ nome: "Visitaram o site", valor: e.visita, cor: "var(--f1)" }, { nome: "Clicaram para contato", valor: contatos, cor: "var(--f2)" }, { nome: "Enviaram um pedido", valor: totalPer, cor: "var(--f3)" }, { nome: "Serviço concluído", valor: c.conc.length, cor: "var(--f4)" }];
    $("#c-funilsite").innerHTML = e.visita
      ? cartaoGrafico("fs", "Da visita ao serviço", "Quantos chegam em cada passo", barrasH(itensFS, e.visita, { aria: "Funil do site" }), tabelaSimples(["Passo", "Total", "% das visitas"], itensFS.map((i) => [i.nome, i.valor, pct(i.valor, e.visita) + "%"])))
      : vazioCartao("Da visita ao serviço", "", "Sem visitas medidas ainda");

    // leads por dia
    const valoresDia = c.dias.map((k) => c.porDia[k]);
    $("#c-dia").innerHTML = totalPer
      ? cartaoGrafico("dia", "Leads por dia", `Pedidos recebidos pelo site, últimos ${S.dias} dias`, colunas(valoresDia, rotDia, c.dias.map((k, i) => `${sem(k)}, ${rotDia[i]}|${valoresDia[i]} ${valoresDia[i] === 1 ? "lead" : "leads"}`), { passo, aria: `Leads por dia, total ${totalPer}` }), tabelaSimples(["Dia", "Leads"], c.dias.map((k, i) => [rotDia[i], valoresDia[i]])))
      : vazioCartao("Leads por dia", "Pedidos recebidos pelo site", "Nenhum lead neste período");

    // atenção
    $("#c-retornos").innerHTML = `<div class="cartao__cab"><div><h2>Precisa de atenção</h2><p>Retornos marcados e leads novos sem resposta</p></div></div>` +
      (c.atencao.length
        ? `<div class="lista-mini">${c.atencao.slice(0, 7).map((a) => `<button type="button" data-lead="${esc(a.l.id)}"><span class="t">${esc(a.l.nome || (a.l.telefone ? fmtTel(a.l.telefone) : "Sem nome"))}</span><span class="s">${esc(a.l.moto || "")}${a.l.moto && servicosDe(a.l).length ? " · " : ""}${esc(servicosDe(a.l).join(", "))}</span><span class="r ${a.atraso ? "atrasado" : ""}">${esc(a.rot)}</span></button>`).join("")}</div>`
        : `<div class="vazio"><strong>Tudo em dia</strong>Nenhum retorno atrasado nem lead novo esperando.</div>`);

    // orçamentos
    const itensOrc = STATUS.map((x) => ({ nome: x.nome, valor: c.orcEtapa[x.id], cor: x.cor })).filter((i) => i.valor > 0);
    $("#c-orc").innerHTML = c.orcs.length
      ? cartaoGrafico("orc", "Orçamentos", "Pedidos feitos no formulário de orçamento e como estão", `<div class="site-nums site-nums--3"><div><b>${num(c.orcs.length)}</b><span>Pedidos</span></div><div><b>${num(c.orcFechados)}</b><span>Fechados</span></div><div><b>${pct(c.orcFechados, c.orcs.length)}%</b><span>Taxa de fechamento</span></div></div><div style="height:14px"></div>` + barrasH(itensOrc, c.orcs.length, { aria: "Orçamentos por etapa" }), tabelaSimples(["Etapa", "Orçamentos"], itensOrc.map((i) => [i.nome, i.valor])))
      : vazioCartao("Orçamentos", "Pedidos feitos no formulário de orçamento", "Nenhum orçamento pedido no período");

    // serviços
    const itensServ = Object.keys(c.porServ).map((k) => ({ nome: k, valor: c.porServ[k], cor: SERV_COR[k] || "var(--s8)" })).sort((a, b) => b.valor - a.valor).slice(0, 7);
    $("#c-servicos").innerHTML = totalPer
      ? cartaoGrafico("serv", "Mais procurados", "Serviços mais pedidos (um lead pode pedir mais de um)", barrasH(itensServ, null, { aria: "Serviços mais pedidos" }), tabelaSimples(["Serviço", "Pedidos"], itensServ.map((i) => [i.nome, i.valor])))
      : vazioCartao("Mais procurados", "", "Sem pedidos no período");

    // clientes que mais compram
    $("#c-compram").innerHTML = c.compram.length
      ? `<div class="cartao__cab"><div><h2>Clientes que mais compram</h2><p>Por valor dos serviços concluídos (todo o histórico)</p></div></div>` + ranking(c.compram.map((x) => ({ t: x.nome || fmtTel(x.tel), s: `${fmtTel(x.tel)} · ${x.compras} ${x.compras === 1 ? "serviço" : "serviços"}`, v: brl(x.receita), vs: x.compras > 1 ? "cliente fiel" : "" })))
      : vazioCartao("Clientes que mais compram", "Por valor dos serviços concluídos", "Conclua leads com telefone e valor para ver o ranking");

    // clientes que mais acessam / voltam
    $("#c-frequentes").innerHTML = c.frequentes.length
      ? `<div class="cartao__cab"><div><h2>Clientes que mais voltam</h2><p>Quem mais entrou em contato · ${c.recorrentes} ${c.recorrentes === 1 ? "cliente recorrente" : "clientes recorrentes"}</p></div></div>` + ranking(c.frequentes.map((x) => ({ t: x.nome || fmtTel(x.tel), s: `${fmtTel(x.tel)} · último ${quando(new Date(x.ultimo).toISOString())}`, v: x.pedidos + "×", vs: "contatos" })))
      : vazioCartao("Clientes que mais voltam", "Quem mais entra em contato", "Ainda não há clientes que voltaram a pedir");

    // páginas mais acessadas
    const itensPag = Object.keys(c.paginas).map((k, i) => ({ nome: NOME_PAG[k] || k, valor: c.paginas[k], cor: `var(--s${(i % 8) + 1})` })).sort((a, b) => b.valor - a.valor);
    $("#c-paginas").innerHTML = itensPag.length
      ? cartaoGrafico("pag", "Páginas mais acessadas", "Quantas visitas cada página recebeu", barrasH(itensPag, e.visita, { aria: "Visitas por página" }), tabelaSimples(["Página", "Visitas"], itensPag.map((i) => [i.nome, i.valor])))
      : vazioCartao("Páginas mais acessadas", "", "Sem visitas medidas ainda");

    // canais de contato
    const itensCan = Object.keys(c.canais).map((k) => ({ nome: k, valor: c.canais[k], cor: "var(--s1)" }));
    if (e.clique_telefone) itensCan.push({ nome: "Ligar (telefone fixo)", valor: e.clique_telefone, cor: "var(--s2)" });
    if (e.clique_rota) itensCan.push({ nome: "Como chegar (mapa)", valor: e.clique_rota, cor: "var(--s3)" });
    if (e.clique_instagram) itensCan.push({ nome: "Instagram", valor: e.clique_instagram, cor: "var(--s4)" });
    itensCan.sort((a, b) => b.valor - a.valor);
    $("#c-canais").innerHTML = itensCan.length
      ? cartaoGrafico("can", "Onde clicam para falar com você", "Cliques por botão do site", barrasH(itensCan, null, { aria: "Cliques por canal" }), tabelaSimples(["Botão", "Cliques"], itensCan.map((i) => [i.nome, i.valor])))
      : vazioCartao("Onde clicam para falar com você", "", "Sem cliques medidos ainda");

    // motos
    const itensMoto = Object.keys(c.porMoto).map((k) => ({ nome: k, valor: c.porMoto[k], cor: "var(--s5)" })).sort((a, b) => b.valor - a.valor).slice(0, 7);
    $("#c-motos").innerHTML = itensMoto.length
      ? cartaoGrafico("moto", "Motos mais atendidas", "Modelos que mais aparecem nos pedidos", barrasH(itensMoto, null, { aria: "Motos mais atendidas" }), tabelaSimples(["Moto", "Pedidos"], itensMoto.map((i) => [i.nome, i.valor])))
      : vazioCartao("Motos mais atendidas", "", "Sem pedidos no período");

    // funil
    const itensFunil = STATUS.map((x) => ({ nome: x.nome, valor: c.porEtapa[x.id], cor: x.cor }));
    $("#c-funil").innerHTML = totalPer
      ? cartaoGrafico("funil", "Em que etapa estão", `Leads dos últimos ${S.dias} dias, pela etapa atual`, barrasH(itensFunil, totalPer, { aria: "Leads por etapa do funil" }), tabelaSimples(["Etapa", "Leads", "%"], itensFunil.map((i) => [i.nome, i.valor, pct(i.valor, totalPer) + "%"])))
      : vazioCartao("Em que etapa estão", "", "Sem leads no período");

    // origem
    const itensOrigem = Object.keys(ORIGENS).map((k) => ({ nome: ORIGENS[k], valor: c.porOrigem[k] || 0, cor: ORIGEM_COR[k] })).filter((i) => i.valor > 0).sort((a, b) => b.valor - a.valor);
    $("#c-origem").innerHTML = totalPer
      ? cartaoGrafico("origem", "De onde vêm", "Qual formulário do site gerou o lead", barrasH(itensOrigem, totalPer, { aria: "Leads por origem" }), tabelaSimples(["Origem", "Leads", "%"], itensOrigem.map((i) => [i.nome, i.valor, pct(i.valor, totalPer) + "%"])))
      : vazioCartao("De onde vêm", "", "Sem leads no período");

    // horário
    const hs = []; for (let h = 6; h <= 23; h++) hs.push(h);
    $("#c-hora").innerHTML = totalPer
      ? cartaoGrafico("hora", "Horário dos pedidos", "Hora em que o lead chegou (horário de Brasília)", colunas(hs.map((h) => c.porHora[h]), hs.map((h) => h + "h"), hs.map((h) => `${h}h às ${h + 1}h|${c.porHora[h]} ${c.porHora[h] === 1 ? "lead" : "leads"}`), { passo: 3, aria: "Leads por hora do dia" }), tabelaSimples(["Hora", "Leads"], hs.map((h) => [h + "h", c.porHora[h]])))
      : vazioCartao("Horário dos pedidos", "", "Sem leads no período");
    atualizarContagem();
  }

  function atualizarContagem() {
    const n = S.leads.filter((l) => l.status === "novo").length;
    $$("[data-contagem]").forEach((el) => { el.textContent = n > 99 ? "99+" : n; el.hidden = n === 0; });
  }

  /* ============================== renderização: CRM ============================== */
  function cardLead(l) {
    const atraso = ABERTOS.includes(l.status) && l.proximo_contato && new Date(l.proximo_contato).getTime() < Date.now();
    const serv = servicosDe(l).slice(0, 2);
    const idx = STATUS.findIndex((s) => s.id === l.status);
    const prox = idx >= 0 && idx < 4 ? STATUS[idx + 1] : null;
    return `<div class="card${atraso ? " card--atraso" : ""}" draggable="true" tabindex="0" role="button" data-lead="${esc(l.id)}" aria-label="${esc((l.nome || "Sem nome") + ", " + ST[l.status].nome)}">
      <div class="card__topo"><span class="card__nome">${esc(l.nome || (l.telefone ? fmtTel(l.telefone) : "Sem nome"))}</span><span class="card__quando">${esc(quando(l.criado_em))}</span></div>
      <div class="card__moto">${esc(l.moto || "Moto não informada")}${l.telefone && l.nome ? " · " + esc(fmtTel(l.telefone)) : ""}</div>
      <div class="card__serv">${serv.map((s) => `<span class="chip"><i style="background:${SERV_COR[s] || "var(--s8)"}"></i>${esc(s)}</span>`).join("")}${!l.telefone ? `<span class="chip chip--org">sem contato</span>` : ""}</div>
      <div class="card__rod"><span class="chip chip--org">${esc(ORIGENS[l.origem] || l.origem)}</span>${l.valor != null ? `<span class="muted num" style="font-size:.9rem">${brl(l.valor)}</span>` : ""}${atraso ? `<span class="atrasado" style="font-size:.86rem">retorno atrasado</span>` : ""}${prox ? `<button class="b b--linha b--p" type="button" data-acao="avancar" data-id="${esc(l.id)}" title="Mover para ${esc(prox.nome)}" aria-label="Mover para ${esc(prox.nome)}">→</button>` : ""}</div>
    </div>`;
  }
  function renderCrm() {
    const agoraMenos = Date.now() - 45 * MS;
    if (!S.etapaMob) S.etapaMob = "novo";
    $("#kanban-abas").innerHTML = STATUS.map((s) => `<button type="button" data-aba-etapa="${s.id}" aria-pressed="${s.id === S.etapaMob}"><span>${esc(s.nome)}</span><small>${S.leads.filter((l) => l.status === s.id).length}</small></button>`).join("");
    $("#kanban").innerHTML = STATUS.map((s) => {
      let itens = S.leads.filter((l) => l.status === s.id);
      let nota = "";
      if (!ABERTOS.includes(s.id)) { const tot = itens.length; itens = itens.filter((l) => new Date(l.atualizado_em || l.criado_em).getTime() >= agoraMenos); if (itens.length < tot) nota = `<div class="vazio-col">Mostrando os últimos 45 dias (${itens.length} de ${tot})</div>`; }
      itens.sort((a, b) => (ABERTOS.includes(s.id) ? new Date(a.proximo_contato || a.criado_em).getTime() - new Date(b.proximo_contato || b.criado_em).getTime() : new Date(b.atualizado_em || b.criado_em) - new Date(a.atualizado_em || a.criado_em)));
      if (ABERTOS.includes(s.id)) itens.sort((a, b) => { const A = a.proximo_contato ? new Date(a.proximo_contato).getTime() : Infinity, B = b.proximo_contato ? new Date(b.proximo_contato).getTime() : Infinity; return A === B ? new Date(b.criado_em) - new Date(a.criado_em) : A - B; });
      const soma = itens.reduce((x, l) => x + (Number(l.valor) || 0), 0);
      return `<section class="kanban__col${s.id === S.etapaMob ? " on" : ""}" data-status="${s.id}" aria-label="${esc(s.nome)}">
        <div class="kanban__cab"><h3><span class="sw" style="background:${s.cor}"></span>${esc(s.nome)}</h3><span class="n">${itens.length}</span>${soma ? `<span class="soma">${brl(soma)}</span>` : ""}</div>
        <div class="kanban__lista">${itens.length ? itens.map(cardLead).join("") : `<div class="vazio-col">Nenhum lead aqui</div>`}${nota}</div></section>`;
    }).join("");
    atualizarContagem();
  }

  /* ============================== renderização: lista ============================== */
  function filtrados() {
    const q = S.busca.trim().toLowerCase(), qd = digitos(S.busca);
    return S.leads.filter((l) => {
      if (S.fStatus && l.status !== S.fStatus) return false;
      if (S.fOrigem && l.origem !== S.fOrigem) return false;
      if (!q) return true;
      const alvo = [l.nome, l.moto, (l.servicos || []).join(" "), l.mensagem].join(" ").toLowerCase();
      return alvo.includes(q) || (qd.length >= 3 && digitos(l.telefone).includes(qd));
    }).sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));
  }
  function renderLeads() {
    const f = filtrados(), mostrar = f.slice(0, S.mostrar);
    $("#tabela-leads").innerHTML = `<thead><tr><th>Quando</th><th>Nome</th><th>Moto</th><th>Serviços</th><th>Origem</th><th>Etapa</th></tr></thead><tbody>${
      mostrar.length ? mostrar.map((l) => `<tr data-lead="${esc(l.id)}" tabindex="0"><td class="quando num">${esc(fDMH.format(new Date(l.criado_em)))}</td><td class="nome">${esc(l.nome || "Sem nome")}<small>${esc(l.telefone ? fmtTel(l.telefone) : "sem telefone")}</small></td><td class="moto">${esc(l.moto || "—")}</td><td class="serv">${esc((l.servicos || []).join(", ") || "—")}</td><td class="orig"><span class="chip chip--org">${esc(ORIGENS[l.origem] || l.origem)}</span></td><td class="stat"><span class="chip"><i style="background:${ST[l.status].cor}"></i>${esc(ST[l.status].nome)}</span></td></tr>`).join("") : `<tr><td colspan="6"><div class="vazio"><strong>Nenhum lead encontrado</strong>Ajuste a busca ou os filtros.</div></td></tr>`}</tbody>`;
    $("#lista-info").textContent = `${num(f.length)} ${f.length === 1 ? "lead" : "leads"}${S.busca || S.fStatus || S.fOrigem ? " com esses filtros" : ""}`;
    $("#mais").hidden = f.length <= S.mostrar;
  }

  /* ============================== renderização: equipe ============================== */
  async function renderEquipe() {
    try {
      S.equipe = await api.acessos();
    } catch (e) { $("#tabela-equipe").innerHTML = `<tbody><tr><td><div class="vazio">Só administradores veem a equipe.</div></td></tr></tbody>`; return; }
    $("#tabela-equipe").innerHTML = `<thead><tr><th>E-mail</th><th>Papel</th><th>Desde</th><th></th></tr></thead><tbody>${S.equipe.map((a) => `<tr style="cursor:default"><td class="nome">${esc(a.email)}${a.email === (S.acesso && S.acesso.email) ? "<small>você</small>" : ""}</td><td><span class="chip">${a.papel === "admin" ? "Administrador" : "Cliente"}</span></td><td class="num">${esc(fDM.format(new Date(a.criado_em)))}</td><td>${a.email === (S.acesso && S.acesso.email) ? "" : `<button class="b b--perigo b--p" type="button" data-acao="remover-acesso" data-email="${esc(a.email)}">Remover</button>`}</td></tr>`).join("")}</tbody>`;
  }

  /* ============================== gaveta do lead ============================== */
  function abrirVeu(on) { $("#veu").classList.toggle("on", on); $("#gaveta").classList.toggle("on", on); $("#gaveta").setAttribute("aria-hidden", String(!on)); document.body.style.overflow = on ? "hidden" : ""; }
  function fecharGaveta() { S.aberto = null; S.novo = false; abrirVeu(false); }
  function campoGaveta(rotulo, nome, valor, tipo, extra) { return `<div class="campo"><label for="g-${nome}">${esc(rotulo)}</label><input id="g-${nome}" data-campo="${nome}" type="${tipo || "text"}" value="${esc(valor == null ? "" : valor)}" ${extra || ""}></div>`; }

  async function abrirLead(id, foco) {
    const l = S.leads.find((x) => x.id === id); if (!l) return;
    S.aberto = id; S.novo = false;
    $("#g-nome").value = l.nome || ""; $("#g-nome").dataset.campo = "nome"; $("#g-nome").disabled = false;
    $("#g-meta").textContent = `${ORIGENS[l.origem] || l.origem} · ${fDMH.format(new Date(l.criado_em))}${l.pagina ? " · " + l.pagina : ""}`;
    S.notas = [];
    desenharGaveta(l);
    abrirVeu(true);
    try { S.notas = await api.notas(id); } catch (e) { S.notas = []; }
    if (S.aberto === id) { desenharHistorico(); if (foco) { const el = $("#g-" + foco); if (el) el.focus(); } }
  }

  function desenharGaveta(l) {
    const mod = MODELOS_ZAP[0];
    $("#g-corpo").innerHTML = `
      <div><span class="mono muted">Etapa</span><div class="etapas" role="group" aria-label="Etapa" style="margin-top:6px">${STATUS.map((s) => `<button type="button" data-etapa="${s.id}" aria-pressed="${l.status === s.id}"><i style="background:${s.cor}"></i>${esc(s.nome)}</button>`).join("")}</div></div>
      <div class="acoes-contato">
        ${l.telefone ? `<select id="g-modelo" aria-label="Mensagem pronta" class="campo--caixa" style="padding:8px 10px;border:1px solid var(--linha-forte);background:var(--osso);max-width:100%">${MODELOS_ZAP.map((m) => `<option value="${m.id}">${esc(m.nome)}</option>`).join("")}</select>
        <button class="b b--zap b--p" type="button" data-acao="zap">WhatsApp</button>
        <a class="b b--linha b--p" href="tel:${esc(digitos(l.telefone))}">Ligar</a>
        <button class="b b--linha b--p" type="button" data-acao="copiar">Copiar</button>` : `<span class="muted" style="font-size:1rem">Sem telefone: o pedido chegou pelo site. Responda pelo WhatsApp da loja ou peça o número ao cliente.</span>`}
      </div>
      <div class="linha2">${campoGaveta("WhatsApp / telefone", "telefone", l.telefone ? fmtTel(l.telefone) : "", "tel", 'inputmode="tel" autocomplete="off"')}${campoGaveta("Moto", "moto", l.moto)}</div>
      <div class="campo"><label for="g-servicos">Serviços (separe por vírgula)</label><input id="g-servicos" data-campo="servicos" type="text" value="${esc((l.servicos || []).join(", "))}"></div>
      <div class="campo"><label for="g-mensagem">Relato do cliente</label><textarea id="g-mensagem" data-campo="mensagem">${esc(l.mensagem || "")}</textarea></div>
      <div class="linha2">${campoGaveta("Valor do serviço (R$)", "valor", l.valor, "number", 'inputmode="decimal" step="10" min="0"')}${campoGaveta("Próximo contato", "proximo_contato", paraInputLocal(l.proximo_contato), "datetime-local")}</div>
      ${l.periodo ? `<div class="mono muted">Período preferido: ${esc(l.periodo)}</div>` : ""}
      <div class="campo" id="w-perda" ${l.status === "perdido" ? "" : "hidden"}><label for="g-motivo_perda">Motivo da perda</label><input id="g-motivo_perda" data-campo="motivo_perda" type="text" value="${esc(l.motivo_perda || "")}" placeholder="Ex.: achou caro, sem resposta"></div>
      <div class="salvo" id="g-salvo" aria-live="polite"></div>
      <div><span class="mono muted">Histórico</span>
        <div class="hist" id="g-hist" style="margin-top:6px"></div>
        <div class="campo" style="margin-top:12px"><label for="g-nota">Nova anotação</label><textarea id="g-nota" placeholder="Ex.: cliente vem sábado de manhã"></textarea></div>
        <button class="b b--tinta b--p" type="button" data-acao="add-nota" style="margin-top:8px">Salvar anotação</button>
      </div>
      <div id="g-perigo">${S.acesso && S.acesso.papel === "admin" ? `<button class="b b--perigo b--p" type="button" data-acao="apagar">Apagar lead</button>` : ""}</div>`;
    void mod;
  }
  function desenharHistorico() {
    const h = $("#g-hist"); if (!h) return;
    h.innerHTML = S.notas.length ? S.notas.slice().sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em)).map((n) => `<div class="hist__i hist__i--${esc(n.tipo)}"><div><div class="hist__t">${esc(n.texto)}</div><div class="hist__m">${esc(fDMH.format(new Date(n.criado_em)))} · ${esc(n.autor || "")}</div></div></div>`).join("") : `<div class="vazio" style="padding:14px 4px">Sem anotações ainda.</div>`;
  }
  function salvoMsg(t, erro) { const el = $("#g-salvo"); if (!el) return; el.textContent = t; el.style.color = erro ? "var(--alerta)" : ""; if (!erro) setTimeout(() => { if (el.textContent === t) el.textContent = ""; }, 2200); }

  function aplicarNoEstado(l) { const i = S.leads.findIndex((x) => x.id === l.id); if (i >= 0) S.leads[i] = Object.assign(S.leads[i], l); else S.leads.unshift(l); }
  async function salvarCampo(campo, bruto) {
    const l = S.leads.find((x) => x.id === S.aberto); if (!l) return;
    let v = bruto;
    if (campo === "valor") { v = bruto === "" ? null : Number(String(bruto).replace(",", ".")); if (v != null && (isNaN(v) || v < 0)) { salvoMsg("Valor inválido", true); return; } }
    else if (campo === "proximo_contato") v = bruto ? new Date(bruto).toISOString() : null;
    else if (campo === "servicos") v = String(bruto).split(",").map((s) => s.trim()).filter(Boolean).slice(0, 12);
    else if (campo === "telefone") v = digitos(bruto) || null;
    else v = String(bruto).trim() || null;
    if (campo === "nome" || campo === "moto" || campo === "mensagem" || campo === "motivo_perda") v = v == null ? null : String(v).slice(campo === "mensagem" ? 2000 : 120);
    if (JSON.stringify(l[campo] == null ? null : l[campo]) === JSON.stringify(v)) return;
    const antes = l[campo]; l[campo] = v;
    try { await api.atualizar(l.id, { [campo]: v }); salvoMsg("Salvo"); renderAtual(); if (campo === "telefone") { const el = $("#g-telefone"); if (el && v) el.value = fmtTel(v); } }
    catch (e) { l[campo] = antes; salvoMsg("Não salvou. Tente de novo.", true); }
  }
  async function mudarEtapa(id, status, opcoes) {
    const l = S.leads.find((x) => x.id === id); if (!l || l.status === status) return;
    const antes = l.status; l.status = status; renderAtual(); atualizarContagem();
    try { await api.atualizar(id, { status }); if (S.aberto === id) { S.notas = await api.notas(id); desenharHistorico(); $$("#g-corpo [data-etapa]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.etapa === status))); const w = $("#w-perda"); if (w) w.hidden = status !== "perdido"; } }
    catch (e) { l.status = antes; renderAtual(); atualizarContagem(); toast("Não consegui mover o lead. Tente de novo.", { erro: true }); return; }
    if (!(opcoes && opcoes.silencioso)) {
      if (status === "concluido" && l.valor == null) { toast("Concluído! Informe o valor do serviço para a receita."); await abrirLead(id, "valor"); }
      if (status === "perdido") { await abrirLead(id, "motivo_perda"); }
    }
  }
  async function enviarZap() {
    const l = S.leads.find((x) => x.id === S.aberto); if (!l || !l.telefone) return;
    const m = MODELOS_ZAP.find((x) => x.id === ($("#g-modelo") || {}).value) || MODELOS_ZAP[0];
    const url = zapLink(l.telefone, m.txt(l));
    let w = null; try { w = window.open(url, "_blank", "noopener"); } catch (e) {}
    if (!w) { const a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove(); }
    try { await api.addNota(l.id, `WhatsApp aberto: ${m.nome}`, "contato"); S.notas = await api.notas(l.id); desenharHistorico(); } catch (e) {}
    if (l.status === "novo") mudarEtapa(l.id, "contato", { silencioso: true });
  }
  async function addNota() {
    const ta = $("#g-nota"), t = ta.value.trim(); if (!t || !S.aberto) return;
    try { await api.addNota(S.aberto, t.slice(0, 2000), "nota"); ta.value = ""; S.notas = await api.notas(S.aberto); desenharHistorico(); salvoMsg("Anotação salva"); }
    catch (e) { salvoMsg("Não salvou a anotação.", true); }
  }
  function confirmarApagar() {
    const alvo = $("#g-perigo");
    alvo.innerHTML = `<div class="confirma"><span>Apagar este lead e o histórico? Não dá para desfazer.</span><button class="b b--perigo b--p" type="button" data-acao="apagar-sim">Apagar mesmo</button><button class="b b--linha b--p" type="button" data-acao="apagar-nao">Cancelar</button></div>`;
  }
  async function apagarLead() {
    const id = S.aberto; if (!id) return;
    try { await api.apagar(id); S.leads = S.leads.filter((l) => l.id !== id); fecharGaveta(); renderAtual(); atualizarContagem(); toast("Lead apagado."); }
    catch (e) { toast("Só administradores podem apagar.", { erro: true }); }
  }

  function abrirNovo() {
    S.aberto = null; S.novo = true;
    $("#g-nome").value = ""; $("#g-nome").dataset.campo = "novo-nome"; $("#g-nome").placeholder = "Nome do cliente";
    $("#g-meta").textContent = "Novo lead manual (balcão, telefone, indicação)";
    $("#g-corpo").innerHTML = `<div class="linha2">${campoGaveta("WhatsApp / telefone", "n-telefone", "", "tel", 'inputmode="tel"')}${campoGaveta("Moto", "n-moto", "")}</div>
      <div class="campo"><label for="g-n-servicos">Serviços (separe por vírgula)</label><input id="g-n-servicos" type="text" placeholder="Ex.: Revisão e troca de óleo"></div>
      <div class="campo"><label for="g-n-mensagem">Relato</label><textarea id="g-n-mensagem"></textarea></div>
      <button class="b" type="button" data-acao="criar-lead">Criar lead</button><div class="salvo" id="g-salvo"></div>`;
    abrirVeu(true); setTimeout(() => $("#g-nome").focus(), 300);
  }
  async function criarLead() {
    const nome = $("#g-nome").value.trim(), tel = digitos($("#g-n-telefone").value), moto = $("#g-n-moto").value.trim();
    const serv = $("#g-n-servicos").value.split(",").map((s) => s.trim()).filter(Boolean);
    if (!nome && !tel && !moto) { salvoMsg("Preencha pelo menos o nome, o telefone ou a moto.", true); return; }
    try {
      const l = await api.criar({ origem: "manual", nome: nome || null, telefone: tel || null, moto: moto || null, servicos: serv, mensagem: $("#g-n-mensagem").value.trim() || null, consentimento: true });
      aplicarNoEstado(l); renderAtual(); atualizarContagem(); toast("Lead criado."); await abrirLead(l.id);
    } catch (e) { salvoMsg("Não consegui criar. Tente de novo.", true); }
  }

  /* ============================== navegação ============================== */
  const TITULOS = { geral: "Visão geral", crm: "CRM", leads: "Todos os leads", equipe: "Equipe" };
  function renderAtual() {
    if (S.view === "geral") renderGeral(); else if (S.view === "crm") renderCrm(); else if (S.view === "leads") renderLeads(); else if (S.view === "equipe") renderEquipe();
  }
  function ir(view) {
    if (view === "equipe" && !(S.acesso && S.acesso.papel === "admin")) view = "geral";
    S.view = view;
    ["geral", "crm", "leads", "equipe"].forEach((v) => { $("#v-" + v).hidden = v !== view; });
    $$("[data-ir]").forEach((b) => b.setAttribute("aria-current", b.dataset.ir === view ? "page" : "false"));
    $("#titulo-view").textContent = TITULOS[view];
    try { sessionStorage.setItem("lang-painel-view", view); } catch (e) {}
    renderAtual(); window.scrollTo(0, 0);
  }

  /* ============================== dados ao vivo ============================== */
  async function carregar(silencioso) {
    try {
      const [leads, eventos] = await Promise.all([api.leads(), api.eventos().catch(() => [])]);
      S.leads = leads; S.eventos = eventos;
      renderAtual(); atualizarContagem();
    } catch (e) { if (!silencioso) toast("Não consegui carregar os dados. Verifique a conexão.", { erro: true }); }
  }
  function aoMudar(p) {
    if (p === "on" || p === "off") { S.vivo = p === "on"; const v = $("#vivo"); v.classList.toggle("vivo--on", S.vivo); v.textContent = S.vivo ? "Ao vivo" : "Atualizando a cada 1 min"; return; }
    if (!p || !p.eventType) return;
    if (p.eventType === "INSERT") {
      const l = p.new; if (S.leads.some((x) => x.id === l.id)) return;
      S.leads.unshift(l); renderAtual(); atualizarContagem();
      toast(`Novo lead: ${l.nome || fmtTel(l.telefone) || "sem nome"}${l.moto ? " · " + l.moto : ""}`, { acao: { txt: "Abrir", fn: () => abrirLead(l.id) } });
    } else if (p.eventType === "UPDATE") {
      const l = p.new, i = S.leads.findIndex((x) => x.id === l.id);
      if (i >= 0) S.leads[i] = Object.assign(S.leads[i], l); else S.leads.unshift(l);
      renderAtual(); atualizarContagem();
    } else if (p.eventType === "DELETE") {
      const id = p.old && p.old.id; S.leads = S.leads.filter((x) => x.id !== id); renderAtual(); atualizarContagem();
    }
  }
  function iniciarTempoReal() {
    api.ouvir(aoMudar);
    clearInterval(timerPoll);
    timerPoll = setInterval(() => { if (!document.hidden && !S.vivo && !S.demo) carregar(true); }, 60000);
    document.addEventListener("visibilitychange", () => { if (!document.hidden && !S.demo) carregar(true); });
  }

  /* ============================== exportação ============================== */
  function exportarCsv() {
    const f = filtrados();
    const cel = (v) => { let s = v == null ? "" : String(v); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };
    const linhas = [["Data", "Nome", "Telefone", "Moto", "Serviços", "Origem", "Etapa", "Valor", "Próximo contato", "Relato"].map(cel).join(";")];
    f.forEach((l) => linhas.push([fDMH.format(new Date(l.criado_em)), l.nome, fmtTel(l.telefone), l.moto, (l.servicos || []).join(", "), ORIGENS[l.origem] || l.origem, ST[l.status].nome, l.valor, l.proximo_contato ? fDMH.format(new Date(l.proximo_contato)) : "", l.mensagem].map(cel).join(";")));
    const blob = new Blob(["﻿" + linhas.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "leads-lang-motos-" + dia(new Date()) + ".csv";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast(`${f.length} leads exportados.`);
  }

  /* ============================== eventos da interface ============================== */
  function ligarEventos() {
    document.addEventListener("click", (e) => {
      const t = e.target;
      const ir_ = t.closest("[data-ir]"); if (ir_) { ir(ir_.dataset.ir); return; }
      const dias = t.closest("[data-dias]"); if (dias) { S.dias = Number(dias.dataset.dias); renderGeral(); return; }
      const ab = t.closest("[data-aba-etapa]"); if (ab) { S.etapaMob = ab.dataset.abaEtapa; renderCrm(); return; }
      const et = t.closest("[data-etapa]"); if (et && S.aberto) { mudarEtapa(S.aberto, et.dataset.etapa); return; }
      const acao = t.closest("[data-acao]");
      if (acao) {
        const a = acao.dataset.acao;
        if (a === "avancar") { e.stopPropagation(); const l = S.leads.find((x) => x.id === acao.dataset.id); const i = STATUS.findIndex((s) => s.id === l.status); if (i < 4) mudarEtapa(l.id, STATUS[i + 1].id); return; }
        if (a === "tabela") { const alvo = document.getElementById(acao.dataset.alvo); alvo.hidden = !alvo.hidden; acao.setAttribute("aria-expanded", String(!alvo.hidden)); acao.textContent = alvo.hidden ? "Ver tabela" : "Ver gráfico"; return; }
        if (a === "fechar-gaveta") return fecharGaveta();
        if (a === "novo-lead") return abrirNovo();
        if (a === "criar-lead") return criarLead();
        if (a === "zap") return enviarZap();
        if (a === "copiar") { const l = S.leads.find((x) => x.id === S.aberto); if (l && navigator.clipboard) navigator.clipboard.writeText(fmtTel(l.telefone)).then(() => salvoMsg("Telefone copiado"), () => salvoMsg("Não consegui copiar", true)); return; }
        if (a === "add-nota") return addNota();
        if (a === "apagar") return confirmarApagar();
        if (a === "apagar-nao") { const l = S.leads.find((x) => x.id === S.aberto); desenharGaveta(l); desenharHistorico(); return; }
        if (a === "apagar-sim") return apagarLead();
        if (a === "exportar") return exportarCsv();
        if (a === "sair") { api.sair(); return; }
        if (a === "remover-acesso") { api.delAcesso(acao.dataset.email).then(renderEquipe).catch(() => toast("Não consegui remover.", { erro: true })); return; }
      }
      if (t.closest("#veu")) return fecharGaveta();
      const lead = t.closest("[data-lead]"); if (lead) { abrirLead(lead.dataset.lead); return; }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && $("#gaveta").classList.contains("on")) fecharGaveta();
      if ((e.key === "Enter" || e.key === " ") && e.target.matches && e.target.matches(".card, .tabela tbody tr") && e.target === document.activeElement) { e.preventDefault(); abrirLead(e.target.dataset.lead); }
    });
    // campos da gaveta salvam ao sair do campo
    $("#gaveta").addEventListener("change", (e) => { const c = e.target.dataset && e.target.dataset.campo; if (c && S.aberto) salvarCampo(c, e.target.value); });
    $("#g-nome").addEventListener("change", (e) => { if (S.aberto) salvarCampo("nome", e.target.value); });
    // filtros
    $("#f-busca").addEventListener("input", (e) => { S.busca = e.target.value; S.mostrar = 50; renderLeads(); });
    $("#f-status").addEventListener("change", (e) => { S.fStatus = e.target.value; S.mostrar = 50; renderLeads(); });
    $("#f-origem").addEventListener("change", (e) => { S.fOrigem = e.target.value; S.mostrar = 50; renderLeads(); });
    $("#mais").addEventListener("click", () => { S.mostrar += 50; renderLeads(); });
    $("#f-status").innerHTML = `<option value="">Todas</option>` + STATUS.map((s) => `<option value="${s.id}">${esc(s.nome)}</option>`).join("");
    $("#f-origem").innerHTML = `<option value="">Todas</option>` + Object.keys(ORIGENS).map((k) => `<option value="${k}">${esc(ORIGENS[k])}</option>`).join("");
    // equipe
    $("#form-equipe").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = $("#eq-email").value.trim().toLowerCase(), papel = $("#eq-papel").value, m = $("#eq-msg");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { m.textContent = "Digite um e-mail válido."; m.className = "acesso__msg acesso__msg--erro"; return; }
      try { await api.addAcesso(email, papel); $("#eq-email").value = ""; m.textContent = `Acesso liberado para ${email}. Avise a pessoa para criar a senha na tela de entrada.`; m.className = "acesso__msg acesso__msg--ok"; renderEquipe(); }
      catch (err) { m.textContent = /duplicate|already/i.test(String(err.message)) ? "Esse e-mail já está na equipe." : "Não consegui liberar. Só administradores podem."; m.className = "acesso__msg acesso__msg--erro"; }
    });
    // arrastar e soltar
    const kb = $("#kanban"); let arrasto = null;
    kb.addEventListener("dragstart", (e) => { const c = e.target.closest && e.target.closest(".card"); if (!c) return; arrasto = c.dataset.lead; e.dataTransfer.setData("text/plain", arrasto); e.dataTransfer.effectAllowed = "move"; setTimeout(() => c.classList.add("arrastando"), 0); });
    kb.addEventListener("dragend", () => { arrasto = null; $$(".card.arrastando").forEach((c) => c.classList.remove("arrastando")); $$(".kanban__col.alvo").forEach((c) => c.classList.remove("alvo")); });
    kb.addEventListener("dragover", (e) => { const col = e.target.closest(".kanban__col"); if (!col || !arrasto) return; e.preventDefault(); $$(".kanban__col.alvo").forEach((c) => { if (c !== col) c.classList.remove("alvo"); }); col.classList.add("alvo"); });
    kb.addEventListener("drop", (e) => { const col = e.target.closest(".kanban__col"); if (!col || !arrasto) return; e.preventDefault(); const id = arrasto; arrasto = null; col.classList.remove("alvo"); mudarEtapa(id, col.dataset.status); });
    // dica dos gráficos
    const dica = $("#dica");
    function mostrarDica(el, x, y) { const [t, v] = String(el.dataset.tip).split("|"); dica.innerHTML = `<b>${esc(v || "")}</b>${esc(t)}`; dica.classList.add("on"); const w = dica.offsetWidth, h = dica.offsetHeight; dica.style.left = Math.max(8, Math.min(innerWidth - w - 8, x + 12)) + "px"; dica.style.top = Math.max(8, y - h - 12) + "px"; }
    document.addEventListener("pointermove", (e) => { const el = e.target.closest && e.target.closest("[data-tip]"); if (el) mostrarDica(el, e.clientX, e.clientY); else dica.classList.remove("on"); });
    document.addEventListener("focusin", (e) => { const el = e.target.closest && e.target.closest("[data-tip]"); if (el) { const r = el.getBoundingClientRect(); mostrarDica(el, r.left + r.width / 2, r.top); } });
    document.addEventListener("focusout", () => dica.classList.remove("on"));
    document.addEventListener("scroll", () => dica.classList.remove("on"), { passive: true });
  }

  /* ============================== acesso ============================== */
  let modoCriar = false;
  function modoLogin(criar) {
    modoCriar = criar;
    $("#login-titulo").textContent = criar ? "Criar senha" : "Entrar";
    $("#login-sub").textContent = criar ? "Use o e-mail que o administrador liberou. Você vai receber um link para confirmar." : "Acompanhe os pedidos que chegam pelo site e organize o atendimento.";
    $("#lg-confirma-w").hidden = !criar;
    $("#lg-enviar").textContent = criar ? "Criar minha senha" : "Entrar";
    $("#lg-alternar").textContent = criar ? "Já tenho senha. Entrar" : "Primeiro acesso? Criar minha senha";
    $("#lg-senha").autocomplete = criar ? "new-password" : "current-password";
    msgLogin("");
  }
  function msgLogin(t, tipo) { const m = $("#lg-msg"); m.textContent = t; m.className = "acesso__msg" + (tipo ? " acesso__msg--" + tipo : ""); }

  async function decidir() {
    try {
      const s = await api.sessao();
      if (!s) { tela("tela-login"); return; }
      const a = await api.meuAcesso();
      if (a && a.papel) { S.acesso = a; await abrirApp(); return; }
      $("#pd-texto").textContent = a && a.pode_reivindicar
        ? `Você entrou como ${a.email}. Este painel ainda não tem administrador. Se é você quem cuida da Lang Motos, toque no botão abaixo.`
        : `Você entrou como ${a ? a.email : "—"}, mas este e-mail ainda não foi liberado. Peça ao administrador para liberar o acesso e depois toque em “Já fui liberado”.`;
      $("#pd-reivindicar").hidden = !(a && a.pode_reivindicar);
      $("#pd-msg").textContent = "";
      tela("tela-pendente");
    } catch (e) { tela("tela-login"); msgLogin(msgErroAuth(e), "erro"); }
  }

  async function abrirApp() {
    $("#usuario-email").textContent = S.acesso.email || "";
    $("#faixa-demo").hidden = !S.demo;
    $$("[data-so-admin]").forEach((el) => { el.hidden = S.acesso.papel !== "admin"; });
    tela("app");
    let v = "geral"; try { v = sessionStorage.getItem("lang-painel-view") || "geral"; } catch (e) {}
    S.view = v; ir(v);
    await carregar();
    iniciarTempoReal();
    if (S.demo) { const el = $("#vivo"); el.textContent = "Demonstração"; }
  }

  async function iniciar() {
    ligarEventos();
    $("#lg-alternar").addEventListener("click", () => modoLogin(!modoCriar));
    $("#lg-esqueci").addEventListener("click", async () => {
      const email = $("#lg-email").value.trim();
      if (!email) { msgLogin("Digite seu e-mail e toque em “Esqueci a senha” de novo.", "erro"); return; }
      try { await api.redefinir(email); msgLogin("Se esse e-mail tiver conta, enviamos um link para criar uma nova senha.", "ok"); } catch (e) { msgLogin(msgErroAuth(e), "erro"); }
    });
    $("#form-login").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = $("#lg-email").value.trim().toLowerCase(), senha = $("#lg-senha").value;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msgLogin("Digite um e-mail válido.", "erro"); return; }
      if (senha.length < 6) { msgLogin("A senha precisa ter pelo menos 6 caracteres.", "erro"); return; }
      const botao = $("#lg-enviar"); botao.disabled = true;
      try {
        if (modoCriar) {
          if (senha !== $("#lg-senha2").value) { msgLogin("As senhas não são iguais.", "erro"); botao.disabled = false; return; }
          const r = await api.criarConta(email, senha);
          if (r && r.session) { await decidir(); } else { msgLogin(`Enviamos um link de confirmação para ${email}. Confirme e volte aqui para entrar.`, "ok"); modoLogin(false); $("#lg-email").value = email; msgLogin(`Enviamos um link de confirmação para ${email}. Confirme e volte aqui para entrar.`, "ok"); }
        } else { await api.entrar(email, senha); await decidir(); }
      } catch (err) { msgLogin(msgErroAuth(err), "erro"); }
      botao.disabled = false;
    });
    $("#form-nova-senha").addEventListener("submit", async (e) => {
      e.preventDefault(); const s = $("#ns-senha").value, m = $("#ns-msg");
      if (s.length < 6) { m.textContent = "Mínimo de 6 caracteres."; m.className = "acesso__msg acesso__msg--erro"; return; }
      try { await api.novaSenha(s); history.replaceState(null, "", location.pathname); await decidir(); } catch (err) { m.textContent = msgErroAuth(err); m.className = "acesso__msg acesso__msg--erro"; }
    });
    $("#pd-atualizar").addEventListener("click", decidir);
    $("#pd-sair").addEventListener("click", () => api.sair());
    $("#pd-reivindicar").addEventListener("click", async () => {
      try { const r = await api.reivindicar(); if (r === "ok") await decidir(); else { $("#pd-msg").textContent = r === "ja_existe" ? "Este painel já tem administrador. Peça a liberação a ele." : "Não foi possível. Entre de novo."; $("#pd-msg").className = "acesso__msg acesso__msg--erro"; } }
      catch (err) { $("#pd-msg").textContent = msgErroAuth(err); $("#pd-msg").className = "acesso__msg acesso__msg--erro"; }
    });

    if (DEMO) { api = criarApiDemo(); S.acesso = await api.meuAcesso(); await abrirApp(); return; }
    if (!window.supabase || !cfg.url) { tela("tela-login"); msgLogin("Não foi possível carregar o painel. Verifique a conexão e recarregue a página.", "erro"); return; }
    api = criarApiReal();
    api.onAuth((ev) => {
      setTimeout(() => {
        if (ev === "PASSWORD_RECOVERY") tela("tela-nova-senha");
        else if (ev === "SIGNED_OUT") { S.acesso = null; tela("tela-login"); }
        else if (ev === "SIGNED_IN" && $("#app").hidden && $("#tela-pendente").hidden && $("#tela-nova-senha").hidden) decidir();
      }, 0);
    });
    await decidir();
  }

  window.addEventListener("hashchange", () => { if ((location.hash === "#demo") !== DEMO) location.reload(); });
  (document.readyState === "loading" ? (f) => document.addEventListener("DOMContentLoaded", f) : (f) => f())(iniciar);
  window.LangPainel = { S, calc };
})();
