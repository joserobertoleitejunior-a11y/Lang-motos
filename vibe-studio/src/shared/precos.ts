/**
 * Precificação de sites: horas por item × valor da hora + margem + custos de terceiros.
 * Os números abaixo são PONTOS DE PARTIDA estimados (horas por item, valor da hora,
 * margem e mensalidade). Ajuste-os à sua realidade: a conta é sempre transparente.
 */
export type ItemPreco = { id: string; nome: string; horas: number; grupo: 'base' | 'recurso' | 'extra'; dica?: string };

export const ITENS_PRECO: ItemPreco[] = [
  { id: 'briefing', nome: 'Conversa e briefing com o cliente', horas: 3, grupo: 'base' },
  { id: 'identidade', nome: 'Identidade visual aplicada (cores e fontes)', horas: 4, grupo: 'base' },
  { id: 'home', nome: 'Página inicial (hero, seções e chamadas)', horas: 10, grupo: 'base' },
  { id: 'institucional', nome: 'Página institucional', horas: 4, grupo: 'base' },
  { id: 'localizacao', nome: 'Página de localização e contatos', horas: 3, grupo: 'base' },
  { id: 'seo', nome: 'SEO: Google, sitemap e prévia no WhatsApp', horas: 4, grupo: 'base' },
  { id: 'publicacao', nome: 'Publicação e configuração do domínio', horas: 3, grupo: 'base' },
  { id: 'fotos', nome: 'Tratamento de até 10 fotos', horas: 2, grupo: 'base' },
  { id: 'abertoAgora', nome: 'Selo "Aberto agora"', horas: 2, grupo: 'recurso' },
  { id: 'faixa', nome: 'Faixa de palavras que corre', horas: 2, grupo: 'recurso' },
  { id: 'numeros', nome: 'Números que contam', horas: 3, grupo: 'recurso' },
  { id: 'faq', nome: 'Perguntas frequentes', horas: 2, grupo: 'recurso' },
  { id: 'galeria', nome: 'Galeria de fotos', horas: 3, grupo: 'recurso' },
  { id: 'splash', nome: 'Tela de abertura animada', horas: 3, grupo: 'recurso' },
  { id: 'privacidade', nome: 'Página de privacidade (LGPD)', horas: 2, grupo: 'recurso' },
  { id: 'catalogo', nome: 'Catálogo com filtros e busca', horas: 8, grupo: 'recurso' },
  { id: 'orcamento', nome: 'Lista de orçamento pelo WhatsApp', horas: 8, grupo: 'recurso' },
  { id: 'assistente', nome: 'Assistente de pré-atendimento', horas: 10, grupo: 'recurso' },
  { id: 'analytics', nome: 'Métricas de visitas', horas: 6, grupo: 'recurso' },
  { id: 'painel', nome: 'Painel administrativo com banco de dados (Supabase)', horas: 30, grupo: 'recurso', dica: 'Leads, orçamentos, gráficos e login.' },
  { id: 'tour', nome: 'Tour guiado', horas: 8, grupo: 'recurso' },
  { id: 'chat', nome: 'Chat flutuante', horas: 10, grupo: 'recurso' },
  { id: 'loginZap', nome: 'Identificação do cliente por WhatsApp', horas: 8, grupo: 'recurso' },
  { id: 'logo', nome: 'Criação de logotipo', horas: 6, grupo: 'extra' },
  { id: 'video', nome: 'Vídeo promocional de lançamento', horas: 4, grupo: 'extra' },
  { id: 'treinamento', nome: 'Treinamento do cliente (1 hora)', horas: 2, grupo: 'extra' },
];

export const BASE_IDS = ITENS_PRECO.filter((i) => i.grupo === 'base').map((i) => i.id);

export const PACOTES: { id: string; nome: string; descricao: string; itens: string[] }[] = [
  { id: 'essencial', nome: 'Essencial', descricao: 'Presença profissional: o cliente te acha e chama no WhatsApp.', itens: [...BASE_IDS, 'abertoAgora', 'faq'] },
  { id: 'profissional', nome: 'Profissional', descricao: 'Vitrine completa com catálogo e lista de orçamento.', itens: [...BASE_IDS, 'abertoAgora', 'faixa', 'numeros', 'faq', 'galeria', 'privacidade', 'catalogo', 'orcamento', 'splash'] },
  { id: 'completo', nome: 'Completo', descricao: 'Tudo do Profissional, com painel, métricas e atendimento guiado.', itens: [...BASE_IDS, 'abertoAgora', 'faixa', 'numeros', 'faq', 'galeria', 'privacidade', 'catalogo', 'orcamento', 'splash', 'analytics', 'assistente', 'painel', 'treinamento'] },
];

export type ParamPreco = { valorHora: number; margemPct: number; dominioAno: number; hospedagemMes: number; manutencaoMes: number; entradaPct: number; horasPorDia: number };
export const PARAM_PADRAO: ParamPreco = { valorHora: 80, margemPct: 25, dominioAno: 40, hospedagemMes: 0, manutencaoMes: 120, entradaPct: 50, horasPorDia: 5 };

export type Calculo = {
  itens: ItemPreco[]; horas: number; trabalho: number; margem: number; terceiros: number; total: number;
  entrada: number; restante: number; prazoDias: number; mensal: number;
};

export function calcular(ids: string[], p: ParamPreco, horasExtras = 0): Calculo {
  const itens = ids.map((id) => ITENS_PRECO.find((i) => i.id === id)).filter((x): x is ItemPreco => !!x);
  const horas = itens.reduce((a, i) => a + i.horas, 0) + horasExtras;
  const trabalho = horas * p.valorHora;
  const margem = trabalho * (p.margemPct / 100);
  const terceiros = p.dominioAno;
  const total = Math.round((trabalho + margem + terceiros) / 10) * 10;
  const entrada = Math.round((total * p.entradaPct) / 100 / 10) * 10;
  return { itens, horas, trabalho, margem, terceiros, total, entrada, restante: total - entrada, prazoDias: Math.max(1, Math.ceil(horas / Math.max(1, p.horasPorDia))), mensal: p.manutencaoMes + p.hospedagemMes };
}

export const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

/** Mapeia os recursos detectados na engenharia reversa para os itens do orçamento. */
export const RECURSO_PARA_ITEM: Record<string, string> = {
  'lista-orcamento': 'orcamento', assistente: 'assistente', 'painel-admin': 'painel', analytics: 'analytics', tour: 'tour', 'chat-widget': 'chat',
  galeria: 'galeria', 'aberto-agora': 'abertoAgora', contadores: 'numeros', 'filtro-catalogo': 'catalogo', 'faixa-rolante': 'faixa', splash: 'splash',
  'login-whatsapp': 'loginZap', faq: 'faq', lgpd: 'privacidade',
};

export function itensDeProjeto(recursos: string[]): string[] {
  const ids = new Set<string>(BASE_IDS);
  for (const r of recursos) if (RECURSO_PARA_ITEM[r]) ids.add(RECURSO_PARA_ITEM[r]);
  return [...ids];
}

/** Itens do orçamento correspondentes aos recursos ligados no criador de sites. */
export function itensDoSite(recursos: Record<string, boolean>, temItens: boolean): string[] {
  const ids = new Set<string>(BASE_IDS);
  for (const [k, v] of Object.entries(recursos)) if (v && ITENS_PRECO.some((i) => i.id === k) && (k !== 'catalogo' || temItens)) ids.add(k);
  return [...ids];
}

export function proposta(p: { cliente: string; calculo: Calculo; param: ParamPreco; nomePacote?: string; responsavel?: string }): string {
  const { calculo: c, param } = p;
  const linhas = [
    `PROPOSTA — SITE${p.cliente ? ` PARA ${p.cliente.toUpperCase()}` : ''}`,
    p.nomePacote ? `Pacote: ${p.nomePacote}` : '',
    '',
    'O que está incluso:',
    ...c.itens.map((i) => `• ${i.nome}`),
    '',
    `Prazo estimado: ${c.prazoDias} dias úteis após o briefing e o envio do material.`,
    `Investimento: ${brl(c.total)}`,
    `Forma de pagamento: ${param.entradaPct}% de entrada (${brl(c.entrada)}) e o restante (${brl(c.restante)}) na entrega.`,
    c.mensal > 0 ? `Manutenção mensal (opcional): ${brl(c.mensal)}/mês, com pequenos ajustes de texto e foto.` : '',
    `Custos do domínio (${brl(param.dominioAno)}/ano) já estão incluídos no primeiro ano.`,
    '',
    `${p.responsavel || 'José Roberto'} · VIBE CODING PROCESS`,
  ];
  return linhas.filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n');
}
