/**
 * Criador de sites da VIBE CODING PROCESS.
 * Gera um site estático completo (HTML + CSS + JS puro, sem build) no mesmo padrão
 * dos projetos Lang Motos, San Comércio e Remop, descoberto por engenharia reversa
 * (scripts/analisar-site.ts → src/shared/modelos.json).
 *
 * Regras herdadas dos projetos:
 *  - tudo que é dado do negócio mora em assets/js/config.js (um único lugar);
 *  - o site nunca inventa fatos: seção sem conteúdo informado simplesmente não aparece;
 *  - o atendimento sempre termina no WhatsApp de uma pessoa;
 *  - SEO, sitemap, robots e deploy no Netlify já vêm prontos.
 */

export type RecursoId =
  | 'faixa' | 'numeros' | 'catalogo' | 'orcamento' | 'faq' | 'abertoAgora' | 'splash' | 'privacidade' | 'seo' | 'galeria';

export const RECURSOS_SITE: { id: RecursoId; nome: string; dica: string }[] = [
  { id: 'abertoAgora', nome: 'Selo "Aberto agora"', dica: 'Mostra se a loja está aberta, pelo horário informado.' },
  { id: 'faixa', nome: 'Faixa de palavras que corre', dica: 'Letreiro com as categorias, logo abaixo do topo.' },
  { id: 'numeros', nome: 'Números que contam', dica: 'Ex.: anos de história, itens em estoque, clientes atendidos.' },
  { id: 'catalogo', nome: 'Catálogo com filtros e busca', dica: 'Cards dos produtos ou serviços, com busca e categorias.' },
  { id: 'orcamento', nome: 'Lista de orçamento', dica: 'O cliente monta a lista e envia pronta pelo WhatsApp.' },
  { id: 'faq', nome: 'Perguntas frequentes', dica: 'Respostas rápidas que poupam atendimento.' },
  { id: 'galeria', nome: 'Galeria de fotos', dica: 'Espaços para as fotos da loja (você troca depois).' },
  { id: 'splash', nome: 'Tela de abertura', dica: 'Animação curta com o nome ao abrir o site.' },
  { id: 'privacidade', nome: 'Página de privacidade (LGPD)', dica: 'Modelo básico. Peça revisão de um profissional antes de publicar.' },
  { id: 'seo', nome: 'SEO completo', dica: 'Dados para o Google, prévia no WhatsApp e sitemap.' },
];

export type ModeloBase = 'oficina' | 'catalogo' | 'servicos';
export const MODELOS_BASE: Record<ModeloBase, { nome: string; origem: string; descricao: string; recursos: RecursoId[]; fontes: FontePar; tema: 'claro' | 'escuro'; cores: { primaria: string; acento: string }; rotuloItens: string; rotuloItem: string }> = {
  oficina: {
    nome: 'Oficina e peças', origem: 'Lang Motos', descricao: 'Visual escuro e técnico, atendimento rápido por WhatsApp e agendamento.',
    recursos: ['abertoAgora', 'faixa', 'faq', 'splash', 'privacidade', 'seo'], fontes: 'industrial', tema: 'escuro', cores: { primaria: '#E5322D', acento: '#F2B705' }, rotuloItens: 'Serviços', rotuloItem: 'serviço',
  },
  catalogo: {
    nome: 'Loja com catálogo', origem: 'San Comércio', descricao: 'Catálogo com filtros, lista de orçamento e números que contam.',
    recursos: ['abertoAgora', 'faixa', 'numeros', 'catalogo', 'orcamento', 'faq', 'galeria', 'seo'], fontes: 'moderna', tema: 'claro', cores: { primaria: '#0E32B8', acento: '#FF7A1A' }, rotuloItens: 'Produtos', rotuloItem: 'produto',
  },
  servicos: {
    nome: 'Serviços técnicos', origem: 'Remop Retífica', descricao: 'Serviços em destaque, galeria da oficina e contato direto.',
    recursos: ['abertoAgora', 'numeros', 'catalogo', 'galeria', 'faq', 'seo'], fontes: 'tecnica', tema: 'claro', cores: { primaria: '#1E2E63', acento: '#F6C945' }, rotuloItens: 'Serviços', rotuloItem: 'serviço',
  },
};

export type FontePar = 'industrial' | 'moderna' | 'tecnica';
export const FONTES_SITE: Record<FontePar, { nome: string; titulo: string; texto: string; google: string }> = {
  industrial: { nome: 'Industrial (Saira)', titulo: 'Saira', texto: 'Saira', google: 'family=Saira:wght@400;500;600;700;800&family=Saira+Condensed:wght@600;700' },
  moderna: { nome: 'Moderna (Archivo)', titulo: 'Archivo', texto: 'Hanken Grotesk', google: 'family=Archivo:wght@600;700;800&family=Hanken+Grotesk:wght@400;500;600;700' },
  tecnica: { nome: 'Técnica (Barlow)', titulo: 'Barlow Condensed', texto: 'Inter', google: 'family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;500;600;700' },
};

export type SiteSpec = {
  modelo: ModeloBase;
  nome: string;
  slogan: string;
  segmento: string;
  cidade: string;
  descricao: string;
  historia: string;
  cores: { primaria: string; acento: string };
  tema: 'claro' | 'escuro';
  fontes: FontePar;
  contato: { whatsapp: string; telefone: string; email: string; instagram: string; endereco: string };
  horario: { semana: string; sabado: string; domingo: string };
  itens: { titulo: string; descricao: string; categoria: string }[];
  diferenciais: string[];
  passos: string[];
  faq: { p: string; r: string }[];
  numeros: { valor: number; sufixo: string; rotulo: string }[];
  recursos: Record<RecursoId, boolean>;
  dominio: string;
};

export function siteVazio(modelo: ModeloBase = 'catalogo'): SiteSpec {
  const m = MODELOS_BASE[modelo];
  return {
    modelo, nome: '', slogan: '', segmento: '', cidade: '', descricao: '', historia: '',
    cores: { ...m.cores }, tema: m.tema, fontes: m.fontes,
    contato: { whatsapp: '', telefone: '', email: '', instagram: '', endereco: '' },
    horario: { semana: '09:00-18:00', sabado: '', domingo: '' },
    itens: [], diferenciais: [], passos: [], faq: [], numeros: [],
    recursos: Object.fromEntries(RECURSOS_SITE.map((r) => [r.id, m.recursos.includes(r.id)])) as Record<RecursoId, boolean>,
    dominio: '',
  };
}

/** Exemplo claramente fictício, só para testar o criador. */
export function siteExemplo(modelo: ModeloBase = 'catalogo'): SiteSpec {
  const s = siteVazio(modelo);
  return {
    ...s,
    nome: 'Mecânica Exemplo', slogan: 'Seu carro em boas mãos', segmento: 'Oficina mecânica', cidade: 'Sua Cidade - UF',
    descricao: 'Oficina mecânica de bairro. Revisão, freios, suspensão e troca de óleo, com orçamento sem compromisso.',
    historia: 'Texto de exemplo. Aqui entra a história real do negócio, escrita com o dono: quando começou, quem atende e o que o cliente pode esperar.',
    contato: { whatsapp: '5511900000000', telefone: '(11) 3000-0000', email: 'contato@exemplo.com.br', instagram: 'mecanicaexemplo', endereco: 'Rua Exemplo, 123 - Centro' },
    horario: { semana: '08:00-18:00', sabado: '08:00-12:00', domingo: '' },
    itens: [
      { titulo: 'Revisão completa', descricao: 'Checagem de itens de segurança com laudo.', categoria: 'Revisão' },
      { titulo: 'Freios', descricao: 'Pastilhas, discos e fluido.', categoria: 'Segurança' },
      { titulo: 'Suspensão', descricao: 'Amortecedores, buchas e alinhamento.', categoria: 'Segurança' },
      { titulo: 'Troca de óleo', descricao: 'Óleo e filtro, conforme o manual.', categoria: 'Revisão' },
    ],
    diferenciais: ['Orçamento antes de começar', 'Peças com garantia', 'Acompanhe o serviço pelo WhatsApp'],
    passos: ['Mande a placa e o problema pelo WhatsApp', 'Receba o orçamento', 'Aprove e agende', 'Retire o carro pronto'],
    faq: [{ p: 'Preciso agendar?', r: 'Atendemos por ordem de chegada, mas o agendamento pelo WhatsApp garante o horário.' }, { p: 'Vocês dão garantia?', r: 'Sim, informamos o prazo de garantia de cada serviço no orçamento.' }],
    numeros: [{ valor: 15, sufixo: ' anos', rotulo: 'de experiência' }, { valor: 2000, sufixo: '+', rotulo: 'carros atendidos' }],
  };
}

/* ------------------------------------------------------------------ utilidades */

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const soDigitos = (s: string) => s.replace(/\D/g, '');
const slug = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'item';

function hexOk(c: string, padrao: string) { return /^#[0-9a-f]{6}$/i.test(c) ? c : padrao; }
function lum(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const legivel = (fundo: string) => (lum(fundo) > 0.42 ? '#111111' : '#FFFFFF');

export function formatarTelefone(n: string): string {
  const d = soDigitos(n).replace(/^55(?=\d{10,11}$)/, '');
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return n;
}
const zapNumero = (n: string) => { const d = soDigitos(n); return d.length >= 10 && !d.startsWith('55') ? `55${d}` : d; };

const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'] as const;

export type Aviso = { nivel: 'erro' | 'aviso'; texto: string };
export function validarSite(s: SiteSpec): Aviso[] {
  const a: Aviso[] = [];
  if (!s.nome.trim()) a.push({ nivel: 'erro', texto: 'Informe o nome do negócio.' });
  if (soDigitos(s.contato.whatsapp).length < 10) a.push({ nivel: 'erro', texto: 'Informe o WhatsApp com DDD (o site inteiro leva o cliente até ele).' });
  if (!s.descricao.trim()) a.push({ nivel: 'aviso', texto: 'Sem descrição: o Google mostra pouco texto do site.' });
  if (!s.contato.endereco.trim()) a.push({ nivel: 'aviso', texto: 'Sem endereço: a página de localização fica só com contatos.' });
  if (s.recursos.catalogo && s.itens.length === 0) a.push({ nivel: 'aviso', texto: 'Catálogo ligado, mas sem itens: a seção não aparece.' });
  if (s.recursos.numeros && s.numeros.length === 0) a.push({ nivel: 'aviso', texto: 'Números ligados, mas sem números informados: a seção não aparece.' });
  if (s.recursos.faq && s.faq.length === 0) a.push({ nivel: 'aviso', texto: 'Perguntas frequentes ligadas, mas sem perguntas: a seção não aparece.' });
  if (s.recursos.seo && !s.dominio.trim()) a.push({ nivel: 'aviso', texto: 'Sem domínio: o sitemap usa um endereço de exemplo. Troque ao publicar.' });
  return a;
}

/* ------------------------------------------------------------------ CSS */

function css(s: SiteSpec): string {
  const p = hexOk(s.cores.primaria, '#0E32B8');
  const ac = hexOk(s.cores.acento, '#FF7A1A');
  const escuro = s.tema === 'escuro';
  const f = FONTES_SITE[s.fontes];
  const fundo = escuro ? '#0E0F12' : '#F6F7FA';
  const texto = escuro ? '#F2F2F4' : '#14161C';
  const card = escuro ? '#17191F' : '#FFFFFF';
  const suave = escuro ? '#A8ADB8' : '#555C6B';
  const linha = escuro ? '#2A2D36' : '#DDE1EA';
  return `/* ${s.nome} — gerado pelo Criador de Sites da VIBE CODING PROCESS.
   Cores, fontes e espaçamentos: mude só o :root. */
:root{
  --cor-primaria:${p};--cor-texto-primaria:${legivel(p)};
  --cor-acento:${ac};--cor-texto-acento:${legivel(ac)};
  --fundo:${fundo};--texto:${texto};--card:${card};--suave:${suave};--linha:${linha};
  --fonte-titulo:'${f.titulo}',system-ui,sans-serif;--fonte-texto:'${f.texto}',system-ui,sans-serif;
  --raio:14px;--sombra:0 10px 30px rgba(0,0,0,${escuro ? '.45' : '.10'});--larg:1120px;--topo:68px;
}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:calc(var(--topo) + 8px)}
body{margin:0;background:var(--fundo);color:var(--texto);font:400 17px/1.55 var(--fonte-texto);-webkit-font-smoothing:antialiased;overflow-x:hidden}
img,svg{max-width:100%;display:block}a{color:inherit}
h1,h2,h3{font-family:var(--fonte-titulo);line-height:1.08;letter-spacing:-.01em;margin:0;text-wrap:balance}
h1{font-size:clamp(34px,8vw,64px);font-weight:800}h2{font-size:clamp(26px,5vw,40px);font-weight:800}h3{font-size:20px;font-weight:700}
p{margin:0}.contenedor{width:min(100% - 32px,var(--larg));margin-inline:auto}
.secao{padding-block:clamp(44px,8vw,84px)}.secao__topo{display:grid;gap:10px;margin-bottom:28px;max-width:640px}
.sobrelinha{font:700 13px var(--fonte-texto);letter-spacing:.14em;text-transform:uppercase;color:var(--cor-acento)}
.suave{color:var(--suave)}
.botao{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:0 24px;border-radius:999px;border:0;font:700 16px var(--fonte-texto);text-decoration:none;cursor:pointer;transition:transform .12s,filter .15s}
.botao:active{transform:scale(.97)}.botao:focus-visible,a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid var(--cor-acento);outline-offset:2px}
.botao--zap{background:#1FAF5A;color:#fff}.botao--primario{background:var(--cor-acento);color:var(--cor-texto-acento)}
.botao--contorno{background:transparent;color:inherit;box-shadow:inset 0 0 0 2px currentColor}
/* topo */
.topo{position:sticky;top:0;z-index:40;background:color-mix(in srgb,var(--cor-primaria) 94%,#000);color:var(--cor-texto-primaria);box-shadow:0 2px 14px rgba(0,0,0,.2)}
.topo__linha{height:var(--topo);display:flex;align-items:center;gap:14px}
.marca{font:800 22px var(--fonte-titulo);text-decoration:none;letter-spacing:-.01em;margin-right:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nav{display:none}.nav a{text-decoration:none;font-weight:600;padding:8px 12px;border-radius:8px}.nav a:hover{background:rgba(255,255,255,.14)}
.topo .botao{min-height:42px;padding:0 16px;font-size:15px}
.menu-btn{width:44px;height:44px;border:0;border-radius:10px;background:rgba(255,255,255,.14);color:inherit;display:grid;place-items:center;cursor:pointer}
.menu{display:none;background:color-mix(in srgb,var(--cor-primaria) 94%,#000);padding:8px 16px 16px}.menu.aberto{display:grid;gap:4px}
.menu a{padding:13px 8px;text-decoration:none;font-weight:600;border-bottom:1px solid rgba(255,255,255,.14)}
@media(min-width:860px){.nav{display:flex}.menu-btn,.menu{display:none!important}}
/* hero */
.hero{position:relative;color:var(--cor-texto-primaria);background:radial-gradient(90% 70% at 85% 0%,color-mix(in srgb,var(--cor-acento) 38%,transparent),transparent 60%),linear-gradient(160deg,color-mix(in srgb,var(--cor-primaria) 100%,#fff 8%),color-mix(in srgb,var(--cor-primaria) 70%,#000))}
.hero__dentro{display:grid;gap:22px;padding-block:clamp(40px,9vw,96px);max-width:760px}
.hero p{font-size:clamp(17px,3.4vw,21px);opacity:.92;max-width:560px}.hero__acoes{display:flex;flex-wrap:wrap;gap:12px;margin-top:6px}
.selo-aberto{display:inline-flex;justify-self:start;width:fit-content;gap:8px;align-items:center;padding:7px 14px;border-radius:999px;background:rgba(0,0,0,.28);font-weight:700;font-size:14px}
.selo-aberto i{width:9px;height:9px;border-radius:50%;background:#9aa0a6}.selo-aberto.on i{background:#34d399;box-shadow:0 0 0 4px rgba(52,211,153,.25)}.selo-aberto.off i{background:#f87171}
/* faixa */
.faixa{background:var(--cor-acento);color:var(--cor-texto-acento);overflow:hidden;white-space:nowrap}
.faixa__trilho{display:inline-flex;gap:38px;padding:14px 0;animation:corre 28s linear infinite;font:800 18px var(--fonte-titulo);text-transform:uppercase;letter-spacing:.04em}
@keyframes corre{to{transform:translateX(-50%)}}
/* números */
.numeros{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px}
.numero{background:var(--card);border:1px solid var(--linha);border-radius:var(--raio);padding:20px}
.numero b{display:block;font:800 clamp(34px,7vw,52px) var(--fonte-titulo);color:var(--cor-acento);line-height:1}
/* catálogo */
.filtros{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.filtro{min-height:42px;padding:0 16px;border-radius:999px;border:1.5px solid var(--linha);background:var(--card);color:inherit;font:600 15px var(--fonte-texto);cursor:pointer}
.filtro.ativo{background:var(--cor-primaria);color:var(--cor-texto-primaria);border-color:var(--cor-primaria)}
.busca{width:100%;min-height:50px;border-radius:14px;border:1.5px solid var(--linha);background:var(--card);color:inherit;padding:0 16px;font:16px var(--fonte-texto);margin-bottom:12px}
.grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}
.cartao{background:var(--card);border:1px solid var(--linha);border-radius:var(--raio);padding:20px;display:flex;flex-direction:column;gap:10px;box-shadow:var(--sombra)}
.cartao[hidden]{display:none}.cartao .tag{font:700 12px var(--fonte-texto);letter-spacing:.1em;text-transform:uppercase;color:var(--cor-acento)}
.cartao .botao{margin-top:auto;min-height:44px;font-size:15px}
.vazio{padding:20px;text-align:center;color:var(--suave)}
/* passos / diferenciais */
.passos{counter-reset:p;display:grid;gap:12px;padding:0;margin:0;list-style:none}
.passos li{counter-increment:p;display:flex;gap:14px;align-items:flex-start;background:var(--card);border:1px solid var(--linha);border-radius:var(--raio);padding:16px}
.passos li::before{content:counter(p);flex:0 0 36px;height:36px;border-radius:50%;background:var(--cor-primaria);color:var(--cor-texto-primaria);display:grid;place-items:center;font:800 17px var(--fonte-titulo)}
.dif{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;padding:0;margin:0;list-style:none}
.dif li{padding:18px 18px 18px 50px;position:relative;background:var(--card);border:1px solid var(--linha);border-radius:var(--raio);font-weight:600}
.dif li::before{content:"";position:absolute;left:18px;top:21px;width:18px;height:10px;border-left:4px solid var(--cor-acento);border-bottom:4px solid var(--cor-acento);transform:rotate(-45deg)}
/* faq */
details{background:var(--card);border:1px solid var(--linha);border-radius:var(--raio);padding:0 18px}
details+details{margin-top:10px}summary{cursor:pointer;font-weight:700;padding:16px 0;list-style:none;display:flex;justify-content:space-between;gap:12px}
summary::-webkit-details-marker{display:none}summary::after{content:"+";font-size:24px;line-height:1;color:var(--cor-acento)}details[open] summary::after{content:"–"}details p{padding:0 0 16px;color:var(--suave)}
/* galeria */
.galeria{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}
.galeria div{aspect-ratio:4/3;border-radius:var(--raio);background:repeating-linear-gradient(45deg,var(--card),var(--card) 12px,var(--linha) 12px,var(--linha) 24px);display:grid;place-items:center;color:var(--suave);font-size:14px;text-align:center;padding:8px}
/* cta e rodapé */
.cta{background:var(--cor-primaria);color:var(--cor-texto-primaria);text-align:center}.cta .contenedor{display:grid;gap:16px;justify-items:center;max-width:680px}
.rodape{background:#0b0c10;color:#c9ccd4;padding:36px 0 96px;font-size:15px}.rodape .contenedor{display:grid;gap:18px}
.rodape a{color:#fff}.rodape__links{display:flex;flex-wrap:wrap;gap:6px 18px}
.assinatura{opacity:.7;font-size:13px}
/* localização */
.contatos{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}
.tabela-horas{width:100%;border-collapse:collapse}.tabela-horas td{padding:11px 0;border-bottom:1px solid var(--linha)}.tabela-horas td:last-child{text-align:right;font-weight:700}
.hoje td{color:var(--cor-acento)}
/* flutuantes */
.flutuantes{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:50;display:flex;flex-direction:column;gap:10px;align-items:flex-end}
.fab{width:60px;height:60px;border-radius:50%;border:0;background:#1FAF5A;color:#fff;display:grid;place-items:center;box-shadow:0 10px 26px rgba(0,0,0,.35);cursor:pointer;text-decoration:none;position:relative}
.fab--lista{background:var(--cor-acento);color:var(--cor-texto-acento)}.fab b[hidden]{display:none}.fab b{position:absolute;top:-4px;right:-4px;min-width:22px;height:22px;border-radius:11px;background:#111;color:#fff;font:700 12px var(--fonte-texto);display:grid;place-items:center;padding:0 5px}
.gaveta{position:fixed;inset:0;z-index:70;display:none}.gaveta.aberta{display:block}.gaveta__fundo{position:absolute;inset:0;background:rgba(0,0,0,.55)}
.gaveta__painel{position:absolute;right:0;top:0;bottom:0;width:min(420px,100%);background:var(--card);padding:20px;display:flex;flex-direction:column;gap:14px;overflow:auto;box-shadow:var(--sombra)}
.gaveta ul{list-style:none;padding:0;margin:0;display:grid;gap:8px}.gaveta li{display:flex;gap:10px;align-items:center;justify-content:space-between;border:1px solid var(--linha);border-radius:12px;padding:10px 12px}
.gaveta li button{border:0;background:transparent;color:var(--suave);font-size:22px;cursor:pointer}
.toast{position:fixed;left:50%;bottom:92px;transform:translateX(-50%);background:#111;color:#fff;padding:12px 18px;border-radius:12px;z-index:90;font-weight:600;max-width:calc(100% - 32px)}
.splash{position:fixed;inset:0;z-index:100;background:var(--cor-primaria);color:var(--cor-texto-primaria);display:grid;place-items:center;font:800 clamp(30px,8vw,64px) var(--fonte-titulo);text-align:center;padding:24px;transition:transform .7s cubic-bezier(.7,0,.2,1)}
.splash.sai{transform:translateY(-100%)}
.js .revelar{opacity:0;transform:translateY(18px);transition:opacity .6s,transform .6s}.js .revelar.vis{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}.revelar{opacity:1;transform:none}}
`;
}

/* ------------------------------------------------------------------ JS */

const JS_ZAP_SVG = '<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>';

function mainJs(s: SiteSpec): string {
  return `/* Comportamento do site. Os dados do negócio vêm de config.js. */
(function () {
  var C = window.SITE_CONFIG;
  var $ = function (q, r) { return (r || document).querySelector(q); };
  var $$ = function (q, r) { return Array.prototype.slice.call((r || document).querySelectorAll(q)); };
  function toast(msg) { var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2800); }
  function zap(msg) { return 'https://wa.me/' + C.whatsappNumero + '?text=' + encodeURIComponent(msg || C.mensagemPadrao); }

  /* links do WhatsApp, telefone e e-mail a partir do config.js */
  $$('[data-whatsapp]').forEach(function (a) { a.href = zap(a.getAttribute('data-whatsapp')); a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-tel]').forEach(function (a) { a.href = 'tel:+55' + C.telefone.replace(/\\D/g, ''); });
  $$('[data-texto-whatsapp]').forEach(function (e) { e.textContent = C.whatsappExibicao; });

  /* menu do celular */
  var btn = $('.menu-btn'), menu = $('.menu');
  if (btn && menu) btn.addEventListener('click', function () { var a = menu.classList.toggle('aberto'); btn.setAttribute('aria-expanded', a); });

  /* selo "aberto agora" + tabela de horários */
  function minutos(h) { var p = h.split(':'); return +p[0] * 60 + +p[1]; }
  function agoraSP() { var f = new Intl.DateTimeFormat('pt-BR', { timeZone: C.fusoHorario, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date()); var o = {}; f.forEach(function (x) { o[x.type] = x.value; }); var dias = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.']; return { dia: dias.indexOf(o.weekday.toLowerCase()), min: +o.hour * 60 + +o.minute }; }
  var ag = agoraSP();
  $$('.selo-aberto').forEach(function (el) {
    var faixa = C.horario[ag.dia]; var aberto = faixa && ag.min >= minutos(faixa[0]) && ag.min < minutos(faixa[1]);
    el.classList.add(aberto ? 'on' : 'off'); el.querySelector('span').textContent = aberto ? 'Aberto agora até ' + faixa[1].replace(':00', 'h') : 'Fechado agora';
  });
  $$('[data-dia]').forEach(function (tr) { if (+tr.getAttribute('data-dia') === ag.dia || (tr.getAttribute('data-dia') === 'semana' && ag.dia >= 1 && ag.dia <= 5)) tr.classList.add('hoje'); });

  /* animações ao rolar */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } }); }, { threshold: .12 });
    $$('.revelar').forEach(function (e) { io.observe(e); });
  } else $$('.revelar').forEach(function (e) { e.classList.add('vis'); });

  /* números que contam */
  $$('[data-contador]').forEach(function (el) {
    var alvo = +el.getAttribute('data-contador'), suf = el.getAttribute('data-sufixo') || '', t0 = null;
    function passo(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1200); var v = Math.round(alvo * (1 - Math.pow(1 - p, 3))); el.textContent = v.toLocaleString('pt-BR') + suf; if (p < 1) requestAnimationFrame(passo); }
    if ('IntersectionObserver' in window) { var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { requestAnimationFrame(passo); o.disconnect(); } }); o.observe(el); } else el.textContent = alvo.toLocaleString('pt-BR') + suf;
  });

  /* catálogo: filtro + busca */
  var cards = $$('.cartao[data-cat]');
  if (cards.length) {
    var filtroAtual = 'todos', busca = $('.busca'), vazio = $('.vazio');
    function aplicar() {
      var q = busca ? busca.value.trim().toLowerCase() : '', n = 0;
      cards.forEach(function (c) { var ok = (filtroAtual === 'todos' || c.getAttribute('data-cat') === filtroAtual) && (!q || c.textContent.toLowerCase().indexOf(q) > -1); c.hidden = !ok; if (ok) n++; });
      if (vazio) vazio.hidden = n > 0;
    }
    $$('.filtro').forEach(function (b) { b.addEventListener('click', function () { $$('.filtro').forEach(function (x) { x.classList.remove('ativo'); }); b.classList.add('ativo'); filtroAtual = b.getAttribute('data-filtro'); aplicar(); }); });
    if (busca) busca.addEventListener('input', aplicar);
  }

  /* lista de orçamento (fica salva no aparelho) */
  var gaveta = $('.gaveta');
  if (gaveta) {
    var chave = 'lista-orcamento-' + C.nome, lista = [];
    try { lista = JSON.parse(localStorage.getItem(chave) || '[]'); } catch (e) {}
    var ul = $('ul', gaveta), contagem = $('.fab--lista b'), enviar = $('[data-enviar-lista]');
    function salvar() { try { localStorage.setItem(chave, JSON.stringify(lista)); } catch (e) {} desenhar(); }
    function desenhar() {
      ul.innerHTML = ''; lista.forEach(function (it, i) { var li = document.createElement('li'); var sp = document.createElement('span'); sp.textContent = it; var rm = document.createElement('button'); rm.setAttribute('aria-label', 'Remover'); rm.textContent = '×'; rm.onclick = function () { lista.splice(i, 1); salvar(); }; li.appendChild(sp); li.appendChild(rm); ul.appendChild(li); });
      contagem.textContent = lista.length; contagem.hidden = !lista.length;
      enviar.href = zap('Olá! Gostaria de um orçamento destes itens:\\n' + lista.map(function (x) { return '• ' + x; }).join('\\n')); enviar.style.display = lista.length ? '' : 'none';
      $('.gaveta__vazia', gaveta).hidden = !!lista.length;
    }
    $$('[data-orcar]').forEach(function (b) { b.addEventListener('click', function () { var n = b.getAttribute('data-orcar'); if (lista.indexOf(n) < 0) lista.push(n); salvar(); toast('Adicionado à lista de orçamento'); }); });
    $('.fab--lista').addEventListener('click', function () { gaveta.classList.add('aberta'); });
    $$('[data-fechar-gaveta]', gaveta).forEach(function (e) { e.addEventListener('click', function () { gaveta.classList.remove('aberta'); }); });
    desenhar();
  }

  /* tela de abertura */
  var sp = $('.splash');
  if (sp) { var visto = false; try { visto = sessionStorage.getItem('splash'); sessionStorage.setItem('splash', '1'); } catch (e) {} if (visto) sp.remove(); else setTimeout(function () { sp.classList.add('sai'); setTimeout(function () { sp.remove(); }, 800); }, 1100); }
})();
`;
}

/* ------------------------------------------------------------------ HTML */

function horariosConfig(s: SiteSpec): string {
  const faixa = (t: string) => { const m = /^(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})$/.exec(t.trim()); return m ? `["${m[1].padStart(5, '0')}","${m[2].padStart(5, '0')}"]` : 'null'; };
  return `{ 0: ${faixa(s.horario.domingo)}, 1: ${faixa(s.horario.semana)}, 2: ${faixa(s.horario.semana)}, 3: ${faixa(s.horario.semana)}, 4: ${faixa(s.horario.semana)}, 5: ${faixa(s.horario.semana)}, 6: ${faixa(s.horario.sabado)} }`;
}

function configJs(s: SiteSpec): string {
  const c = s.contato;
  return `/**
 * Configuração central do site ${s.nome}.
 * Único lugar a editar quando WhatsApp, telefone, horário ou links mudarem.
 * O HTML e o JS só leem daqui.
 */
window.SITE_CONFIG = {
  nome: ${JSON.stringify(s.nome)},
  whatsappNumero: ${JSON.stringify(zapNumero(c.whatsapp))},
  whatsappExibicao: ${JSON.stringify(formatarTelefone(c.whatsapp))},
  telefone: ${JSON.stringify(c.telefone)},
  email: ${JSON.stringify(c.email)},
  instagram: ${JSON.stringify(c.instagram.replace(/^@/, ''))},
  endereco: ${JSON.stringify(c.endereco)},
  mensagemPadrao: ${JSON.stringify(`Olá! Vim pelo site da ${s.nome} e gostaria de um atendimento.`)},
  // Chave = dia da semana (0 = domingo). null = fechado. Formato ["HH:MM","HH:MM"].
  horario: ${horariosConfig(s)},
  fusoHorario: "America/Sao_Paulo"
};
`;
}

function cabecalho(s: SiteSpec, pagina: string): string {
  const link = (href: string, t: string) => `<a href="${href}"${pagina === href ? ' aria-current="page"' : ''}>${t}</a>`;
  const nav = [link('index.html', 'Início'), link('institucional.html', 'Sobre'), link('localizacao.html', 'Localização')].join('');
  return `<header class="topo">
  <div class="contenedor topo__linha">
    <a class="marca" href="index.html">${esc(s.nome)}</a>
    <nav class="nav" aria-label="Principal">${nav}</nav>
    <a class="botao botao--zap" data-whatsapp="" href="#">WhatsApp</a>
    <button class="menu-btn" aria-label="Abrir menu" aria-expanded="false"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  </div>
  <div class="menu">${nav}</div>
</header>`;
}

function rodape(s: SiteSpec): string {
  const c = s.contato;
  return `<footer class="rodape">
  <div class="contenedor">
    <strong style="color:#fff;font-size:20px">${esc(s.nome)}</strong>
    ${s.slogan ? `<p>${esc(s.slogan)}</p>` : ''}
    <div class="rodape__links">
      <a data-whatsapp="" href="#">WhatsApp <span data-texto-whatsapp>${esc(formatarTelefone(c.whatsapp))}</span></a>
      ${c.telefone ? `<a data-tel href="#">${esc(c.telefone)}</a>` : ''}
      ${c.instagram ? `<a href="https://instagram.com/${esc(c.instagram.replace(/^@/, ''))}" target="_blank" rel="noopener">Instagram</a>` : ''}
      ${s.recursos.privacidade ? '<a href="privacidade.html">Privacidade</a>' : ''}
    </div>
    ${c.endereco ? `<p>${esc(c.endereco)}</p>` : ''}
    <p class="assinatura">Site criado pela VIBE CODING PROCESS.</p>
  </div>
</footer>`;
}

function flutuantes(s: SiteSpec): string {
  const lista = s.recursos.orcamento && s.itens.length;
  return `<div class="flutuantes">
  ${lista ? '<button class="fab fab--lista" aria-label="Abrir lista de orçamento"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></svg><b hidden>0</b></button>' : ''}
  <a class="fab" data-whatsapp="" href="#" aria-label="Chamar no WhatsApp">${JS_ZAP_SVG}</a>
</div>
${lista ? `<div class="gaveta" role="dialog" aria-label="Lista de orçamento"><div class="gaveta__fundo" data-fechar-gaveta></div><div class="gaveta__painel"><h2 style="font-size:24px">Sua lista de orçamento</h2><p class="suave gaveta__vazia">Toque em "Pedir orçamento" nos itens para montar a lista.</p><ul></ul><a class="botao botao--zap" data-enviar-lista href="#" target="_blank" rel="noopener">Enviar pelo WhatsApp</a><button class="botao botao--contorno" data-fechar-gaveta>Fechar</button></div></div>` : ''}`;
}

function jsonLd(s: SiteSpec, url: string): string {
  const c = s.contato;
  const dias = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const specs: object[] = [];
  const add = (txt: string, ds: number[]) => { const m = /^(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})$/.exec(txt.trim()); if (m) specs.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: ds.map((d) => dias[d]), opens: m[1].padStart(5, '0'), closes: m[2].padStart(5, '0') }); };
  add(s.horario.semana, [1, 2, 3, 4, 5]); add(s.horario.sabado, [6]); add(s.horario.domingo, [0]);
  const o: Record<string, unknown> = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: s.nome, description: s.descricao || undefined, url, telephone: c.telefone || formatarTelefone(c.whatsapp), address: c.endereco ? { '@type': 'PostalAddress', streetAddress: c.endereco, addressLocality: s.cidade || undefined, addressCountry: 'BR' } : undefined, openingHoursSpecification: specs.length ? specs : undefined, sameAs: c.instagram ? [`https://instagram.com/${c.instagram.replace(/^@/, '')}`] : undefined };
  return JSON.stringify(o, (_k, v) => (v === undefined ? undefined : v));
}

function head(s: SiteSpec, titulo: string, desc: string, arquivo: string): string {
  const f = FONTES_SITE[s.fontes];
  const url = s.dominio ? `https://${s.dominio.replace(/^https?:\/\//, '').replace(/\/$/, '')}` : 'https://www.seusite.com.br';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc.slice(0, 160))}">
<meta name="theme-color" content="${hexOk(s.cores.primaria, '#0E32B8')}">
<script>document.documentElement.classList.add('js')</script>
${s.recursos.seo ? `<link rel="canonical" href="${url}/${arquivo === 'index.html' ? '' : arquivo}">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}"><meta property="og:description" content="${esc(desc.slice(0, 200))}"><meta property="og:url" content="${url}/${arquivo === 'index.html' ? '' : arquivo}">
${arquivo === 'index.html' ? `<script type="application/ld+json">${jsonLd(s, url).replace(/</g, '\\u003c')}</script>` : ''}` : ''}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${f.google}&display=swap">
<link rel="stylesheet" href="assets/css/style.css?v=1">
</head>`;
}

function fimPagina(s: SiteSpec): string {
  return `${flutuantes(s)}
<script src="assets/js/config.js?v=1"></script>
<script src="assets/js/main.js?v=1" defer></script>
</body>
</html>
`;
}

function secaoTopo(sobre: string, titulo: string, texto?: string) {
  return `<div class="secao__topo"><span class="sobrelinha">${esc(sobre)}</span><h2>${esc(titulo)}</h2>${texto ? `<p class="suave">${esc(texto)}</p>` : ''}</div>`;
}

function paginaIndex(s: SiteSpec): string {
  const m = MODELOS_BASE[s.modelo];
  const itens = s.itens.filter((i) => i.titulo.trim());
  const cats = [...new Set(itens.map((i) => i.categoria.trim()).filter(Boolean))];
  const temCat = s.recursos.catalogo && itens.length > 0;
  const partes: string[] = [];

  partes.push(`<section class="hero"><div class="contenedor hero__dentro">
  ${s.recursos.abertoAgora ? '<span class="selo-aberto"><i></i><span>Verificando horário…</span></span>' : ''}
  <h1>${esc(s.nome)}${s.slogan ? `<br><span style="color:var(--cor-acento)">${esc(s.slogan)}</span>` : ''}</h1>
  ${s.descricao ? `<p>${esc(s.descricao)}</p>` : ''}
  <div class="hero__acoes"><a class="botao botao--zap" data-whatsapp="" href="#">Chamar no WhatsApp</a>${temCat || itens.length ? `<a class="botao botao--contorno" href="#${slug(m.rotuloItens)}">Ver ${esc(m.rotuloItens.toLowerCase())}</a>` : '<a class="botao botao--contorno" href="localizacao.html">Como chegar</a>'}</div>
</div></section>`);

  if (s.recursos.faixa && cats.length + itens.length > 0) {
    const palavras = (cats.length ? cats : itens.map((i) => i.titulo)).slice(0, 12);
    const trilho = [...palavras, ...palavras].map((p) => `<span>${esc(p)}</span>`).join('');
    partes.push(`<div class="faixa" aria-hidden="true"><div class="faixa__trilho">${trilho}${trilho}</div></div>`);
  }

  const nums = s.numeros.filter((n) => n.rotulo.trim());
  if (s.recursos.numeros && nums.length) {
    partes.push(`<section class="secao"><div class="contenedor"><div class="numeros revelar">${nums.map((n) => `<div class="numero"><b data-contador="${n.valor}" data-sufixo="${esc(n.sufixo)}">${n.valor.toLocaleString('pt-BR')}${esc(n.sufixo)}</b><span class="suave">${esc(n.rotulo)}</span></div>`).join('')}</div></div></section>`);
  }

  if (itens.length) {
    const lista = s.recursos.orcamento;
    const cards = itens.map((i) => `<article class="cartao revelar"${temCat ? ` data-cat="${esc(i.categoria.trim() || 'Outros')}"` : ''}>${i.categoria ? `<span class="tag">${esc(i.categoria)}</span>` : ''}<h3>${esc(i.titulo)}</h3>${i.descricao ? `<p class="suave">${esc(i.descricao)}</p>` : ''}${lista ? `<button class="botao botao--primario" data-orcar="${esc(i.titulo)}">Pedir orçamento</button>` : `<a class="botao botao--primario" data-whatsapp="${esc(`Olá! Quero saber mais sobre: ${i.titulo}`)}" href="#">Falar no WhatsApp</a>`}</article>`).join('');
    const filtros = temCat && cats.length > 1 ? `<div class="filtros"><button class="filtro ativo" data-filtro="todos">Todos</button>${cats.map((c) => `<button class="filtro" data-filtro="${esc(c)}">${esc(c)}</button>`).join('')}</div>` : '';
    partes.push(`<section class="secao" id="${slug(m.rotuloItens)}"><div class="contenedor">${secaoTopo(m.rotuloItens, `${m.rotuloItens} que a gente oferece`)}${temCat ? '<input class="busca" type="search" placeholder="Buscar…" aria-label="Buscar">' : ''}${filtros}<div class="grade">${cards}</div>${temCat ? '<p class="vazio" hidden>Nada encontrado. Chame no WhatsApp e a gente ajuda.</p>' : ''}</div></section>`);
  }

  const passos = s.passos.filter((x) => x.trim());
  if (passos.length) partes.push(`<section class="secao"><div class="contenedor">${secaoTopo('Como funciona', 'Simples do começo ao fim')}<ol class="passos">${passos.map((x) => `<li class="revelar">${esc(x)}</li>`).join('')}</ol></div></section>`);

  const difs = s.diferenciais.filter((x) => x.trim());
  if (difs.length) partes.push(`<section class="secao"><div class="contenedor">${secaoTopo('Por que escolher', `Por que a ${s.nome}`)}<ul class="dif">${difs.map((x) => `<li class="revelar">${esc(x)}</li>`).join('')}</ul></div></section>`);

  if (s.recursos.galeria) partes.push(`<section class="secao"><div class="contenedor">${secaoTopo('Galeria', 'Conheça o espaço')}<div class="galeria">${[1, 2, 3, 4, 5, 6].map((n) => `<div>Foto ${n}<br>(coloque em assets/img)</div>`).join('')}</div></div></section>`);

  const faq = s.faq.filter((f) => f.p.trim() && f.r.trim());
  if (s.recursos.faq && faq.length) partes.push(`<section class="secao"><div class="contenedor">${secaoTopo('Dúvidas', 'Perguntas frequentes')}${faq.map((f) => `<details><summary>${esc(f.p)}</summary><p>${esc(f.r)}</p></details>`).join('')}</div></section>`);

  partes.push(`<section class="secao cta"><div class="contenedor"><h2>Vamos conversar?</h2><p>Chame a ${esc(s.nome)} no WhatsApp. Atendimento feito por gente, sem robô no meio.</p><a class="botao botao--zap" data-whatsapp="" href="#">Chamar no WhatsApp</a></div></section>`);

  const titulo = `${s.nome}${s.segmento ? ` — ${s.segmento}` : ''}${s.cidade ? ` em ${s.cidade}` : ''}`;
  return `${head(s, titulo, s.descricao || `${s.nome}${s.cidade ? ` em ${s.cidade}` : ''}. Atendimento pelo WhatsApp.`, 'index.html')}
<body>
${s.recursos.splash ? `<div class="splash">${esc(s.nome)}</div>` : ''}
${cabecalho(s, 'index.html')}
<main>
${partes.join('\n')}
</main>
${rodape(s)}
${fimPagina(s)}`;
}

function paginaInstitucional(s: SiteSpec): string {
  const difs = s.diferenciais.filter((x) => x.trim());
  const faq = s.faq.filter((f) => f.p.trim() && f.r.trim());
  const corpo = `<section class="secao"><div class="contenedor">${secaoTopo('Sobre nós', `Conheça a ${s.nome}`)}${s.historia ? `<p style="max-width:680px;white-space:pre-line">${esc(s.historia)}</p>` : `<p class="suave">Conte aqui a história do negócio (edite em institucional.html).</p>`}</div></section>
${difs.length ? `<section class="secao"><div class="contenedor">${secaoTopo('Diferenciais', 'O que nos faz diferentes')}<ul class="dif">${difs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div></section>` : ''}
${s.recursos.faq && faq.length ? `<section class="secao"><div class="contenedor">${secaoTopo('Dúvidas', 'Perguntas frequentes')}${faq.map((f) => `<details><summary>${esc(f.p)}</summary><p>${esc(f.r)}</p></details>`).join('')}</div></section>` : ''}
<section class="secao cta"><div class="contenedor"><h2>Fale com a gente</h2><a class="botao botao--zap" data-whatsapp="" href="#">Chamar no WhatsApp</a></div></section>`;
  return `${head(s, `Sobre — ${s.nome}`, s.historia || s.descricao || `Conheça a ${s.nome}.`, 'institucional.html')}
<body>
${cabecalho(s, 'institucional.html')}
<main>
${corpo}
</main>
${rodape(s)}
${fimPagina(s)}`;
}

function paginaLocalizacao(s: SiteSpec): string {
  const c = s.contato;
  const q = encodeURIComponent(`${s.nome} ${c.endereco} ${s.cidade}`.trim());
  const linhaHora = (dia: string, t: string, id: string) => `<tr data-dia="${id}"><td>${dia}</td><td>${t.trim() ? esc(t.replace('-', ' às ').replace(/:00/g, 'h')) : 'Fechado'}</td></tr>`;
  const corpo = `<section class="secao"><div class="contenedor">${secaoTopo('Localização', 'Como chegar e falar com a gente')}
<div class="contatos">
  <div class="cartao"><h3>Endereço</h3><p>${c.endereco ? esc(c.endereco) : 'Informe o endereço em config.js.'}${s.cidade ? `<br>${esc(s.cidade)}` : ''}</p>${c.endereco ? `<a class="botao botao--primario" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">Abrir no Google Maps</a><a class="botao botao--contorno" href="https://waze.com/ul?q=${q}&navigate=yes" target="_blank" rel="noopener">Abrir no Waze</a>` : ''}</div>
  <div class="cartao"><h3>Contato</h3><a class="botao botao--zap" data-whatsapp="" href="#">WhatsApp <span data-texto-whatsapp>${esc(formatarTelefone(c.whatsapp))}</span></a>${c.telefone ? `<a class="botao botao--contorno" data-tel href="#">Ligar ${esc(c.telefone)}</a>` : ''}${c.email ? `<p class="suave">${esc(c.email)}</p>` : ''}</div>
  <div class="cartao"><h3>Horário</h3><table class="tabela-horas"><tbody>${linhaHora('Segunda a sexta', s.horario.semana, 'semana')}${linhaHora('Sábado', s.horario.sabado, '6')}${linhaHora('Domingo', s.horario.domingo, '0')}</tbody></table></div>
</div></div></section>`;
  return `${head(s, `Localização e contato — ${s.nome}`, `Endereço, horário e contatos da ${s.nome}${s.cidade ? ` em ${s.cidade}` : ''}.`, 'localizacao.html')}
<body>
${cabecalho(s, 'localizacao.html')}
<main>
${corpo}
</main>
${rodape(s)}
${fimPagina(s)}`;
}

function paginaPrivacidade(s: SiteSpec): string {
  const corpo = `<section class="secao"><div class="contenedor" style="max-width:760px">${secaoTopo('Privacidade', 'Política de privacidade')}
<p class="suave" style="margin-bottom:14px"><strong>Modelo básico.</strong> Revise com um profissional antes de publicar.</p>
<h3 style="margin:18px 0 6px">Quais dados coletamos</h3><p>Este site não exige cadastro. Quando você fala conosco pelo WhatsApp, usamos o seu número e a sua mensagem apenas para atendê-lo.</p>
<h3 style="margin:18px 0 6px">Armazenamento no seu aparelho</h3><p>Guardamos no seu navegador, e só nele, a sua lista de orçamento e a informação de que você já viu a tela de abertura.</p>
<h3 style="margin:18px 0 6px">Seus direitos</h3><p>Você pode pedir informações ou a exclusão dos seus dados pelo WhatsApp ${esc(formatarTelefone(s.contato.whatsapp))}${s.contato.email ? ` ou pelo e-mail ${esc(s.contato.email)}` : ''}.</p>
<h3 style="margin:18px 0 6px">Responsável</h3><p>${esc(s.nome)}${s.contato.endereco ? `, ${esc(s.contato.endereco)}` : ''}.</p></div></section>`;
  return `${head(s, `Privacidade — ${s.nome}`, `Política de privacidade do site da ${s.nome}.`, 'privacidade.html')}
<body>
${cabecalho(s, 'privacidade.html')}
<main>
${corpo}
</main>
${rodape(s)}
${fimPagina(s)}`;
}

/* ------------------------------------------------------------------ documentos */

function mapaDoSite(s: SiteSpec): string {
  return `# MAPA DO SITE — ${s.nome}
> Onde está cada coisa, para qualquer alteração futura (humana ou IA). Gerado pelo Criador de Sites da VIBE CODING PROCESS.

| Quero mudar... | Arquivo | Onde |
|---|---|---|
| WhatsApp, telefone, e-mail, Instagram, endereço, horário | \`assets/js/config.js\` | objeto \`SITE_CONFIG\` (o site inteiro lê daqui) |
| Cores, fontes, arredondamento, sombras | \`assets/css/style.css\` | bloco \`:root\` no topo |
| Texto e botões do topo da home | \`index.html\` | \`<section class="hero">\` |
| ${MODELOS_BASE[s.modelo].rotuloItens} (cards) | \`index.html\` | seção com \`id="${slug(MODELOS_BASE[s.modelo].rotuloItens)}"\`, um \`<article class="cartao">\` por item |
| Fotos da galeria | \`assets/img/\` + seção "Galeria" | troque os quadros listrados por \`<img>\` |
| História, diferenciais, perguntas | \`institucional.html\` | seções com o mesmo nome |
| Horário na tabela | \`localizacao.html\` e \`config.js\` | a tabela é só texto; o selo "Aberto agora" usa o \`config.js\` |
| Título e descrição para o Google | \`<head>\` de cada página | \`<title>\` e \`<meta name="description">\` |
| Domínio no sitemap | \`sitemap.xml\` e \`robots.txt\` | troque \`${s.dominio || 'www.seusite.com.br'}\` pelo domínio real |

## Blocos repetidos nas páginas (mudar em todas)
Site estático sem build: o cabeçalho, o rodapé, os botões flutuantes e a lista de scripts são iguais em cada \`.html\`.
Depois de cada alteração em CSS ou JS, troque \`?v=1\` por um número novo nos links, para o cliente não ver a versão antiga.

## Recursos ligados neste site
${RECURSOS_SITE.map((r) => `- [${s.recursos[r.id] ? 'x' : ' '}] ${r.nome}`).join('\n')}
`;
}

function leiame(s: SiteSpec): string {
  return `# ${s.nome}
Site estático (HTML, CSS e JavaScript puro), criado pelo Criador de Sites da **VIBE CODING PROCESS**.

## Como publicar (Netlify, pelo celular)
1. Entre em **app.netlify.com**, toque em **Add new site → Deploy manually** e envie esta pasta (ou o ZIP).
2. Em **Domain management**, conecte o seu domínio.
3. Edite \`assets/js/config.js\` com os dados reais e envie de novo.

## Antes de publicar, confira
- [ ] WhatsApp, telefone e horário em \`assets/js/config.js\`
- [ ] Textos de exemplo trocados pelos reais (nada de "texto de exemplo")
- [ ] Fotos em \`assets/img\`
- [ ] Domínio no \`sitemap.xml\` e no \`robots.txt\`
- [ ] Página de privacidade revisada por um profissional
- [ ] Teste no celular: menu, botão do WhatsApp e lista de orçamento

Leia também o \`MAPA-DO-SITE.md\`.
`;
}

function briefing(s: SiteSpec): string {
  return `# BRIEFING — ${s.nome}
- **Segmento:** ${s.segmento || '—'}
- **Cidade:** ${s.cidade || '—'}
- **Slogan:** ${s.slogan || '—'}
- **Modelo base:** ${MODELOS_BASE[s.modelo].nome} (${MODELOS_BASE[s.modelo].origem})
- **Cores:** primária ${s.cores.primaria}, acento ${s.cores.acento} · tema ${s.tema}
- **Contatos:** WhatsApp ${formatarTelefone(s.contato.whatsapp)} · ${s.contato.telefone || 'sem fixo'} · ${s.contato.email || 'sem e-mail'} · @${s.contato.instagram.replace(/^@/, '') || '—'}
- **Endereço:** ${s.contato.endereco || '—'}
- **Horário:** semana ${s.horario.semana || 'fechado'} · sábado ${s.horario.sabado || 'fechado'} · domingo ${s.horario.domingo || 'fechado'}
- **Itens:** ${s.itens.length} · **Diferenciais:** ${s.diferenciais.length} · **Perguntas:** ${s.faq.length}
`;
}

function sitemap(s: SiteSpec): string {
  const dom = s.dominio ? s.dominio.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'www.seusite.com.br';
  const paginas = ['', 'institucional.html', 'localizacao.html', ...(s.recursos.privacidade ? ['privacidade.html'] : [])];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paginas.map((p) => `  <url><loc>https://${dom}/${p}</loc></url>`).join('\n')}\n</urlset>\n`;
}

function netlifyToml(): string {
  return `[build]\n  publish = "."\n\n[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Content-Type-Options = "nosniff"\n    Referrer-Policy = "strict-origin-when-cross-origin"\n    X-Frame-Options = "SAMEORIGIN"\n\n[[headers]]\n  for = "/assets/*"\n  [headers.values]\n    Cache-Control = "public, max-age=604800"\n`;
}

/* ------------------------------------------------------------------ API */

export type ArquivosSite = Record<string, string>;

export function gerarSite(spec: SiteSpec): ArquivosSite {
  const s: SiteSpec = JSON.parse(JSON.stringify(spec));
  s.cores.primaria = hexOk(s.cores.primaria, '#0E32B8');
  s.cores.acento = hexOk(s.cores.acento, '#FF7A1A');
  const a: ArquivosSite = {
    'index.html': paginaIndex(s),
    'institucional.html': paginaInstitucional(s),
    'localizacao.html': paginaLocalizacao(s),
    'assets/css/style.css': css(s),
    'assets/js/config.js': configJs(s),
    'assets/js/main.js': mainJs(s),
    'README.md': leiame(s),
    'MAPA-DO-SITE.md': mapaDoSite(s),
    'BRIEFING.md': briefing(s),
    'netlify.toml': netlifyToml(),
  };
  if (s.recursos.privacidade) a['privacidade.html'] = paginaPrivacidade(s);
  if (s.recursos.seo) {
    a['sitemap.xml'] = sitemap(s);
    a['robots.txt'] = `User-agent: *\nAllow: /\nSitemap: https://${s.dominio ? s.dominio.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'www.seusite.com.br'}/sitemap.xml\n`;
  }
  a['assets/img/LEIAME.txt'] = 'Coloque aqui as fotos do negócio (jpg ou webp, até 300 KB cada).\n';
  return a;
}

/** Junta CSS e JS dentro do HTML para mostrar a prévia num iframe (srcdoc). */
export function paginaParaPrevia(arquivos: ArquivosSite, pagina: string): string {
  let html = arquivos[pagina] ?? '';
  html = html.replace(/<link rel="stylesheet" href="assets\/css\/style\.css[^"]*">/, () => `<style>${arquivos['assets/css/style.css']}</style>`);
  html = html.replace(/<script src="assets\/js\/config\.js[^"]*"><\/script>/, () => `<script>${arquivos['assets/js/config.js']}<\/script>`);
  html = html.replace(/<script src="assets\/js\/main\.js[^"]*" defer><\/script>/, () => `<script>${arquivos['assets/js/main.js'].replace(/<\/script/g, '<\\/script')}<\/script>`);
  // links entre páginas: a prévia fica na mesma página (o app troca de aba)
  html = html.replace(/href="(index|institucional|localizacao|privacidade)\.html"/g, (_m, p) => `href="#" data-pagina="${p}.html"`);
  html = html.replace('</body>', `<script>document.addEventListener('click',function(e){var a=e.target.closest('a[data-pagina]');if(a){e.preventDefault();parent.postMessage({pagina:a.getAttribute('data-pagina')},'*');}});<\/script></body>`);
  return html;
}
