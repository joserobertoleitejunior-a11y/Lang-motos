/**
 * Versão de testes que roda 100% no navegador (sem servidor): faz o papel da API.
 * Gera o roteiro simples, monta o vídeo e deixa o Remotion Player tocar a prévia.
 */
import { ErroApi, type Ajustes, type Estado, type Marca, type Projeto, type ResumoProjeto, type Etapa, type Vozes } from './tipos';
export * from './tipos';
import { specDemo, cena as _c } from '../../src/shared/demo';
import { montarVideo, estimarDuracaoFala, estimarPalavras, type AudioCena, type ImagemCena } from '../../src/shared/linhaDoTempo';
import { roteiroLocal } from '../../src/server/provedores/roteiroLocal';
import type { Pedido, Referencia } from '../../src/shared/spec';

void _c;
const ETAPAS: { id: string; nome: string }[] = [
  { id: 'roteiro', nome: 'Roteiro' }, { id: 'voz', nome: 'Narração' }, { id: 'imagens', nome: 'Imagens' }, { id: 'clipes', nome: 'Cenas animadas' },
  { id: 'musica', nome: 'Música' }, { id: 'montagem', nome: 'Montagem' }, { id: 'revisao', nome: 'Revisão de qualidade' }, { id: 'render', nome: 'Vídeo final (MP4)' },
];
const DETALHES: Record<string, string> = {
  roteiro: 'modo demonstração', voz: 'sem chave de voz', imagens: 'fotos enviadas', clipes: 'sem chave da fal.ai', musica: 'biblioteca do app', montagem: 'pronto', revisao: 'precisa da chave do Claude', render: 'MP4 no app publicado',
};
const PULADAS = new Set(['voz', 'clipes', 'revisao', 'render']);

const ajustes: Ajustes = { provedorImagem: 'auto', provedorVoz: 'auto', modeloVozElevenlabs: 'eleven_multilingual_v2', qualidadeImagem: 'medium', musicaIA: false, vozPadrao: null };
const marcas: Marca[] = [];
type Guardado = { projeto: Omit<Projeto, 'etapas' | 'status' | 'resumo'>; criadoEm: number };
const projetos = new Map<string, Guardado>();
const novoId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-3);

const lerDataUrl = (b: Blob) => new Promise<string>((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.onerror = () => rej(new Error('Falha ao ler a imagem.')); r.readAsDataURL(b); });
async function temAlfa(b: Blob): Promise<boolean> {
  if (b.type !== 'image/png') return false;
  const x = new Uint8Array(await b.slice(0, 32).arrayBuffer());
  return x[25] === 6 || x[25] === 4;
}

const PRONTO_EM = 4200;
function etapasEm(g: Guardado): { etapas: Etapa[]; pronto: boolean } {
  const dt = Date.now() - g.criadoEm;
  const pronto = dt >= PRONTO_EM;
  const etapas = ETAPAS.map((e, i): Etapa => {
    const ini = i * 500;
    if (pronto || dt >= ini + 500) return { ...e, status: PULADAS.has(e.id) ? 'pulada' : 'ok', detalhe: DETALHES[e.id] };
    if (dt >= ini) return { ...e, status: 'rodando' };
    return { ...e, status: 'aguardando' };
  });
  return { etapas, pronto };
}

function montar(id: string): Projeto {
  const g = projetos.get(id);
  if (!g) throw new ErroApi('Projeto não encontrado', 404);
  const { etapas, pronto } = etapasEm(g);
  const base = g.projeto;
  const v = base.versoes[0];
  const resumo: ResumoProjeto = { id, titulo: base.titulo, status: pronto ? 'pronto' : 'gerando', criadoEm: base.versoes[0].criadaEm, formato: base.pedido.formato, versao: 1, versoes: 1, capa: null, segundos: pronto && v.spec ? Math.round(v.spec.duracaoTotal / v.spec.fps) : null, custo: 0, erro: null };
  return { ...base, status: resumo.status, etapas, resumo, versoes: [{ ...v, spec: pronto ? v.spec : null }] };
}

async function criarProjeto(form: FormData): Promise<{ id: string }> {
  const pedido = JSON.parse(String(form.get('pedido'))) as Pedido;
  if (pedido.briefing.trim().length < 8) throw new ErroApi('Conte em pelo menos uma frase o que você quer no vídeo.', 400);
  const descricoes = JSON.parse(String(form.get('descricoes') ?? '[]')) as string[];
  const fotos = form.getAll('fotos') as Blob[];
  const referencias: (Referencia & { url: string; alfa: boolean })[] = [];
  for (const [i, f] of fotos.entries()) {
    referencias.push({ id: `ref${i + 1}`, arquivo: `ref${i + 1}`, descricao: descricoes[i] || undefined, url: await lerDataUrl(f), alfa: await temAlfa(f) });
  }
  const marca = marcas.find((m) => m.id === pedido.marcaId) ?? null;
  const roteiro = roteiroLocal({ ...pedido, narracao: 'nao' }, marca as never, referencias);
  if (pedido.estilo !== 'auto') roteiro.estilo = pedido.estilo;
  if (pedido.musica !== 'auto') roteiro.musica.clima = pedido.musica;
  if (marca?.cores[0]) roteiro.paleta.primaria = marca.cores[0];
  if (marca?.cores[1]) roteiro.paleta.destaque = marca.cores[1];
  const comVoz = pedido.narracao === 'sim';
  roteiro.legendas = comVoz && pedido.legendas !== 'nao';
  if (comVoz) roteiro.cenas.forEach((c, i) => { c.narracao = c.narracao || roteiro.cenas[i].titulo || ''; });
  const audios: (AudioCena | null)[] = roteiro.cenas.map((c) => {
    if (!comVoz || !c.narracao.trim()) return null;
    const d = estimarDuracaoFala(c.narracao);
    return { src: null, duracao: d, palavras: estimarPalavras(c.narracao, d) };
  });
  const imagens: ImagemCena[] = roteiro.cenas.map((c) => {
    const r = c.imagem.referencia ? referencias.find((x) => x.id === c.imagem.referencia) : undefined;
    return c.imagem.fonte === 'referencia' && r ? { src: r.url, tipo: r.alfa ? 'recorte' : 'foto' } : null;
  });
  const spec = montarVideo({
    roteiro, formato: pedido.formato, audios, imagens, musicaSrc: roteiro.musica.clima === 'nenhuma' ? null : `musica/${roteiro.musica.clima}.mp3`,
    logoSrc: marca?.logo ?? null, sfxBase: 'sfx/', marca: { nome: marca?.nome, contato: marca?.contato },
  });
  const id = novoId();
  const agora = new Date().toISOString();
  projetos.set(id, {
    criadoEm: Date.now(),
    projeto: {
      id, titulo: roteiro.titulo, pedido, erro: null,
      mensagens: [{ de: 'voce', texto: pedido.briefing, em: agora }, { de: 'diretor', texto: 'Montei o vídeo em modo demonstração, com as suas fotos, música e efeitos. Com a chave do Claude, o roteiro fica bem mais esperto e eu aceito pedidos de alteração.', em: agora }],
      referencias: referencias.map((r) => ({ id: r.id, arquivo: r.arquivo, descricao: r.descricao, url: r.url })),
      versoes: [{ n: 1, criadaEm: agora, origem: 'criacao', roteiro, spec, render: null, custos: [], video: null, capa: null }],
      versaoAtual: 1,
    },
  });
  return { id };
}

const NAO = (m: string) => { throw new ErroApi(m, 400); };

async function rotear(metodo: string, url: string, corpo?: unknown): Promise<unknown> {
  const [caminho] = url.split('?');
  const p = caminho.replace(/^\/api\//, '').split('/');
  const m = metodo.toUpperCase();
  const json = (corpo ?? {}) as Record<string, unknown>;

  if (p[0] === 'sessao') return { logado: true, senhaDefinida: true };
  if (p[0] === 'login' || p[0] === 'logout') return { ok: true };
  if (p[0] === 'demo') return { spec: specDemo };
  if (p[0] === 'estado') {
    const e: Estado = {
      provedores: [['anthropic', 'Claude (Anthropic)', 'Roteiro, edição por chat e revisão'], ['elevenlabs', 'ElevenLabs', 'Vozes, clonagem e música'], ['openai', 'OpenAI', 'Imagens (com fundo transparente) e edição de fotos'], ['gemini', 'Google Gemini', 'Imagens Nano Banana e voz econômica'], ['fal', 'fal.ai', 'Clipes de vídeo (Kling) e recorte de fundo']]
        .map(([provedor, nome, funcao]) => ({ provedor, nome, funcao, configurada: false, origem: null, final: null })),
      cofre: false, ajustes, custoMes: { total: 0, porProvedor: {} }, limites: { video: 3, mes: 60 }, modeloClaude: 'claude-opus-5-5', avisos: [],
    };
    return e;
  }
  if (p[0] === 'ajustes') { Object.assign(ajustes, json); return ajustes; }
  if (p[0] === 'chaves') return NAO('As chaves só podem ser conectadas no app publicado. Aqui é a versão de testes.');
  if (p[0] === 'vozes') {
    if (m === 'GET') return { salvas: [], elevenlabs: null, gemini: null, erro: null } satisfies Vozes;
    return NAO('Vozes e clonagem precisam da chave da ElevenLabs, no app publicado.');
  }
  if (p[0] === 'marcas') {
    const id = p[1];
    if (!id) {
      if (m === 'GET') return marcas;
      const nova: Marca = { id: novoId(), nome: String(json.nome ?? '').trim(), segmento: String(json.segmento ?? ''), descricao: String(json.descricao ?? ''), cores: (json.cores as string[]) ?? [], logo: null, contato: (json.contato as Marca['contato']) ?? {}, personagens: [] };
      if (!nova.nome) NAO('Dê um nome para a marca.');
      marcas.push(nova);
      return nova;
    }
    const marca = marcas.find((x) => x.id === id);
    if (!marca) throw new ErroApi('Marca não encontrada', 404);
    if (p[2] === 'logo') { marca.logo = await lerDataUrl((corpo as FormData).get('logo') as Blob); return marca; }
    if (p[2] === 'personagens') {
      if (m === 'DELETE') { marca.personagens = marca.personagens.filter((x) => x.id !== p[3]); return marca; }
      const f = corpo as FormData;
      const img = f.get('imagem') as Blob | null;
      marca.personagens.push({ id: `p${novoId().slice(0, 5)}`, nome: String(f.get('nome')), descricao: String(f.get('descricao')), imagem: img ? await lerDataUrl(img) : null });
      return marca;
    }
    if (m === 'DELETE') { marcas.splice(marcas.indexOf(marca), 1); return { ok: true }; }
    Object.assign(marca, { nome: String(json.nome ?? marca.nome), segmento: String(json.segmento ?? ''), descricao: String(json.descricao ?? ''), cores: (json.cores as string[]) ?? marca.cores, contato: { ...marca.contato, ...((json.contato as object) ?? {}) } });
    return marca;
  }
  if (p[0] === 'projetos') {
    const id = p[1];
    if (!id) {
      if (m === 'GET') return [...projetos.keys()].reverse().map((k) => montar(k).resumo);
      return criarProjeto(corpo as FormData);
    }
    if (m === 'DELETE') { projetos.delete(id); return { ok: true }; }
    if (p[2] === 'mensagens') return NAO('O chat com o Diretor usa o Claude e funciona no app publicado, com a chave conectada. Por enquanto, me peça as alterações no chat do Claude Code.');
    if (p[2] === 'renderizar' || p[2] === 'retomar') return NAO('O arquivo MP4 é gerado no app publicado. Por enquanto, peça no chat do Claude Code que eu gero e entrego aqui.');
    if (p[2] === 'versoes') return montar(id).resumo;
    return montar(id);
  }
  throw new ErroApi('Recurso indisponível na versão de testes.', 404);
}

export const api = {
  get: <T>(url: string) => rotear('GET', url) as Promise<T>,
  enviar: <T>(url: string, corpo?: unknown, metodo = 'POST') => rotear(metodo, url, corpo) as Promise<T>,
  formulario: <T>(url: string, form: FormData) => rotear('POST', url, form) as Promise<T>,
  apagar: <T>(url: string) => rotear('DELETE', url) as Promise<T>,
  audio: async (_url: string, _corpo: unknown): Promise<Blob> => NAO('A prévia de voz precisa da chave da ElevenLabs, no app publicado.'),
};
