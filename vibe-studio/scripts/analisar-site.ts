/**
 * Engenharia reversa de sites estáticos da agência.
 *   npx tsx scripts/analisar-site.ts <pasta1> <pasta2> ... > src/shared/modelos.json
 * Lê HTML/CSS/JS e extrai: páginas, seções (marcadores "===== NOME"), módulos de JS,
 * recursos detectados, identidade visual (:root) e dados de configuração.
 */
import fs from 'node:fs';
import path from 'node:path';

const ler = (f: string) => (fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '');
const linhas = (s: string) => (s ? s.split('\n').length : 0);

const RECURSOS: { id: string; nome: string; teste: (c: Ctx) => boolean }[] = [
  { id: 'whatsapp-flutuante', nome: 'Botão flutuante do WhatsApp', teste: (c) => /class="[^"]*flutuantes?/.test(c.html) || /wa-flutuante|whatsapp-float/i.test(c.html) },
  { id: 'lista-orcamento', nome: 'Lista de orçamento (gaveta)', teste: (c) => c.js.has('lista-orcamento.js') || /GAVETA: LISTA/.test(c.html) },
  { id: 'assistente', nome: 'Assistente de pré-atendimento', teste: (c) => c.js.has('assistente.js') },
  { id: 'painel-admin', nome: 'Painel administrativo', teste: (c) => ['admin.html', 'painel.html'].some((p) => c.paginas.includes(p)) },
  { id: 'supabase', nome: 'Banco de dados Supabase (leads e analytics)', teste: (c) => c.js.has('supabase-init.js') || /supabase\s*:\s*\{/.test(c.config) },
  { id: 'analytics', nome: 'Métricas de visitas', teste: (c) => c.js.has('analytics.js') },
  { id: 'tour', nome: 'Tour guiado', teste: (c) => c.js.has('tour.js') },
  { id: 'chat-widget', nome: 'Chat flutuante', teste: (c) => c.js.has('chat-widget.js') },
  { id: 'galeria', nome: 'Galeria de fotos', teste: (c) => c.js.has('galeria.js') || /===== GALERIA/.test(c.html) },
  { id: 'revelar-rolagem', nome: 'Animações ao rolar', teste: (c) => c.js.has('scroll-reveal.js') || c.js.has('animacoes.js') || c.js.has('movimento.js') },
  { id: 'aberto-agora', nome: 'Selo "Aberto agora"', teste: (c) => /aberto agora/i.test(c.jsTexto) },
  { id: 'contadores', nome: 'Números que contam', teste: (c) => /data-contador/.test(c.html) },
  { id: 'filtro-catalogo', nome: 'Catálogo com filtros e busca', teste: (c) => /data-filtro/.test(c.html) },
  { id: 'faixa-rolante', nome: 'Faixa de palavras que corre', teste: (c) => /FAIXA DE CATEGORIAS|letreiro/i.test(c.html) },
  { id: 'splash', nome: 'Tela de abertura (splash)', teste: (c) => /splash/i.test(c.html) },
  { id: 'login-whatsapp', nome: 'Identificação por WhatsApp', teste: (c) => c.js.has('identificacao.js') },
  { id: 'sem-zoom', nome: 'Trava de zoom no celular', teste: (c) => c.js.has('sem-zoom.js') || c.js.has('zoom.js') },
  { id: 'faq', nome: 'Perguntas frequentes', teste: (c) => /===== FAQ/.test(c.html) },
  { id: 'json-ld', nome: 'SEO: dados estruturados (JSON-LD)', teste: (c) => /application\/ld\+json/.test(c.html) },
  { id: 'open-graph', nome: 'SEO: Open Graph (prévia em redes)', teste: (c) => /og:title/.test(c.html) },
  { id: 'sitemap', nome: 'SEO: sitemap e robots', teste: (c) => c.arquivos.includes('sitemap.xml') && c.arquivos.includes('robots.txt') },
  { id: 'lgpd', nome: 'Página de privacidade (LGPD)', teste: (c) => c.paginas.includes('privacidade.html') },
  { id: 'netlify', nome: 'Deploy no Netlify', teste: (c) => c.arquivos.includes('netlify.toml') },
];

type Ctx = { html: string; config: string; jsTexto: string; js: Set<string>; paginas: string[]; arquivos: string[] };

function analisar(pasta: string) {
  const raiz = path.resolve(pasta);
  const arquivos = fs.readdirSync(raiz);
  const paginas = arquivos.filter((f) => f.endsWith('.html')).sort();
  const jsDir = path.join(raiz, 'assets/js');
  const cssDir = path.join(raiz, 'assets/css');
  const jsArqs = fs.existsSync(jsDir) ? fs.readdirSync(jsDir).filter((f) => f.endsWith('.js')).sort() : [];
  const cssArqs = fs.existsSync(cssDir) ? fs.readdirSync(cssDir).filter((f) => f.endsWith('.css')).sort() : [];
  const html = paginas.map((p) => ler(path.join(raiz, p))).join('\n');
  const jsTexto = jsArqs.map((f) => ler(path.join(jsDir, f))).join('\n');
  const config = ler(path.join(jsDir, 'config.js'));
  const ctx: Ctx = { html, config, jsTexto, js: new Set(jsArqs), paginas, arquivos };

  const secoes: Record<string, string[]> = {};
  for (const p of paginas) {
    const nomes = [...ler(path.join(raiz, p)).matchAll(/<!--\s*={3,}\s*([^=<>]+?)\s*={0,}\s*-->/g)].map((m) => m[1].trim());
    secoes[p] = [...new Set(nomes)];
  }

  const css = ler(path.join(cssDir, 'style.css'));
  const root = /:root\s*\{([^}]*)\}/.exec(css)?.[1] ?? '';
  const variaveis = Object.fromEntries([...root.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
  const cores = Object.entries(variaveis).filter(([, v]) => /^#[0-9a-f]{3,8}$/i.test(v)).map(([k, v]) => ({ nome: k, valor: v }));
  const fontes = [...new Set([...html.matchAll(/family=([A-Za-z+]+)/g)].map((m) => m[1].replace(/\+/g, ' ')))];
  const camposConfig = [...config.matchAll(/^\s{2}(\w+)\s*:/gm)].map((m) => m[1]);
  const marcadoresMapa = fs.existsSync(path.join(raiz, 'MAPA-DO-SITE.md'));

  const tamanho = {
    paginasHtml: paginas.length,
    linhasHtml: linhas(html),
    linhasCss: cssArqs.reduce((a, f) => a + linhas(ler(path.join(cssDir, f))), 0),
    linhasJs: jsArqs.reduce((a, f) => a + linhas(ler(path.join(jsDir, f))), 0),
    imagens: fs.existsSync(path.join(raiz, 'assets/img')) ? fs.readdirSync(path.join(raiz, 'assets/img')).length : 0,
  };

  return {
    projeto: path.basename(raiz),
    paginas,
    secoes,
    modulosJs: jsArqs,
    css: cssArqs,
    camposConfig,
    identidade: { cores, fontes, variaveis: Object.keys(variaveis).length },
    recursos: RECURSOS.filter((r) => r.teste(ctx)).map((r) => r.id),
    tamanho,
    documentos: arquivos.filter((f) => f.endsWith('.md')),
    temMapa: marcadoresMapa,
  };
}

const pastas = process.argv.slice(2);
const modelos = pastas.map(analisar);
const todos = Object.fromEntries(RECURSOS.map((r) => [r.id, r.nome]));
console.log(JSON.stringify({ geradoEm: new Date().toISOString().slice(0, 10), catalogoRecursos: todos, projetos: modelos }, null, 2));
