/**
 * Servidor do Vibe Studio: API + app web + mídias. Um usuário (senha única).
 *   npm run servidor     (desenvolvimento)
 *   npm start            (produção)
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import cookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import estatico from '@fastify/static';
import { FORMATOS, ORCAMENTO, ESTILOS, CLIMAS, type Pedido, type Referencia, type VozConfig } from '../shared/spec';
import { specDemo } from '../shared/demo';
import { CONFIG, validarConfig } from './config';
import { cofreDisponivel, obterChave, PROVEDORES, removerChave, salvarChave, statusChaves, temChave, type Provedor } from './chaves';
import * as armaz from './armazenamento';
import * as eleven from './provedores/elevenlabs';
import * as gemini from './provedores/gemini';
import * as pipeline from './pipeline';
import { prepararRender, tokenMidia } from './render';
import { chamar, ErroApp, extensao, ffmpeg, novoId, tipoImagem } from './util';

const segredo = CONFIG.segredoSessao;
const COOKIE = 'vs_sessao';
const DIAS_SESSAO = 30;

const app = Fastify({ logger: { level: CONFIG.producao ? 'info' : 'warn' }, trustProxy: true, bodyLimit: 2 * 1024 * 1024 });

/* ------------------------------------------------------------------ sessão */

const assinar = (txt: string) => crypto.createHmac('sha256', segredo).update(txt).digest('base64url');
const novaSessao = () => { const exp = Date.now() + DIAS_SESSAO * 86400_000; return `${exp}.${assinar(`sessao:${exp}`)}`; };
function sessaoValida(v: string | undefined): boolean {
  if (!v) return false;
  const [exp, sig] = v.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const esperado = Buffer.from(assinar(`sessao:${exp}`));
  const recebido = Buffer.from(sig);
  return esperado.length === recebido.length && crypto.timingSafeEqual(esperado, recebido);
}
function senhaConfere(s: string): boolean {
  if (!CONFIG.senha) return false;
  const a = crypto.createHash('sha256').update(s).digest();
  const b = crypto.createHash('sha256').update(CONFIG.senha).digest();
  return crypto.timingSafeEqual(a, b);
}

const tentativas = new Map<string, { n: number; ate: number }>();
function limitarLogin(ip: string) {
  const agora = Date.now();
  const t = tentativas.get(ip);
  if (t && t.ate > agora && t.n >= 8) throw new ErroApp('Muitas tentativas. Espere 10 minutos.', 429);
  if (!t || t.ate < agora) tentativas.set(ip, { n: 1, ate: agora + 10 * 60_000 });
  else t.n++;
}

/* ------------------------------------------------------------------ plugins e segurança */

await app.register(cookie);
await app.register(multipart, { limits: { fileSize: 25 * 1024 * 1024, files: 12, fields: 40 } });

app.addHook('onSend', async (_req, reply, carga) => {
  reply.header('X-Content-Type-Options', 'nosniff');
  reply.header('Referrer-Policy', 'same-origin');
  reply.header('X-Frame-Options', 'DENY');
  reply.header('Permissions-Policy', 'camera=(self), microphone=(self), geolocation=()');
  return carga;
});

app.addHook('onRequest', async (req, reply) => {
  const url = req.url.split('?')[0];
  const publica = url === '/api/login' || url === '/api/sessao' || url === '/api/saude';
  if (url.startsWith('/midia/')) {
    const m = /^\/midia\/([pm])\/([a-z0-9]+)\//.exec(url);
    const t = (req.query as Record<string, string>)?.t;
    if (m && t && t === tokenMidia(`${m[1]}/${m[2]}`)) return;
    if (!sessaoValida(req.cookies[COOKIE])) return reply.code(401).send({ erro: 'Faça login.' });
    return;
  }
  if (url.startsWith('/api/') && !publica && !sessaoValida(req.cookies[COOKIE])) return reply.code(401).send({ erro: 'Faça login.' });
});

app.setErrorHandler((erro, req, reply) => {
  if (erro instanceof ErroApp) return reply.code(erro.status).send({ erro: erro.message });
  const e = erro as { statusCode?: number; code?: string; message?: string };
  if (e.code === 'FST_REQ_FILE_TOO_LARGE') return reply.code(413).send({ erro: 'Arquivo grande demais (máximo 25 MB).' });
  if (e.statusCode && e.statusCode < 500) return reply.code(e.statusCode).send({ erro: e.message ?? 'Pedido inválido.' });
  req.log.error(erro);
  return reply.code(500).send({ erro: 'Erro interno. Tente de novo.' });
});

/* ------------------------------------------------------------------ utilidades de upload */

type Arquivo = { campo: string; nome: string; tipo: string; dados: Buffer };
async function lerMultipart(req: FastifyRequest): Promise<{ campos: Record<string, string>; arquivos: Arquivo[] }> {
  const campos: Record<string, string> = {};
  const arquivos: Arquivo[] = [];
  for await (const parte of req.parts()) {
    if (parte.type === 'file') arquivos.push({ campo: parte.fieldname, nome: parte.filename, tipo: parte.mimetype, dados: await parte.toBuffer() });
    else campos[parte.fieldname] = String(parte.value ?? '');
  }
  return { campos, arquivos };
}

function json<T>(txt: string | undefined, padrao: T): T {
  try { return txt ? (JSON.parse(txt) as T) : padrao; } catch { return padrao; }
}

const corpo = (req: FastifyRequest) => (req.body ?? {}) as Record<string, unknown>;
const texto = (v: unknown, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const param = (req: FastifyRequest, k: string) => armaz.seguro(String((req.params as Record<string, string>)[k] ?? ''));

/** Guarda fotos enviadas (já reduzidas pelo app) como ref1, ref2... */
function guardarReferencias(projetoId: string, arquivos: Arquivo[], descricoes: string[], existentes: Referencia[]): Referencia[] {
  const pasta = path.join(armaz.caminhos.projeto(projetoId), 'refs');
  fs.mkdirSync(pasta, { recursive: true });
  const novas: Referencia[] = [];
  let n = existentes.length;
  for (const [i, a] of arquivos.entries()) {
    const mime = tipoImagem(a.dados);
    if (!mime) continue;
    if (n >= 12) break;
    n++;
    const id = `ref${n}`;
    const arquivo = `${id}.${extensao(mime)}`;
    fs.writeFileSync(path.join(pasta, arquivo), a.dados);
    novas.push({ id, arquivo, descricao: texto(descricoes[i], 200) || undefined });
  }
  return novas;
}

/* ------------------------------------------------------------------ sessão / estado */

app.get('/api/saude', async () => ({ ok: true }));

app.get('/api/sessao', async (req) => ({ logado: sessaoValida(req.cookies[COOKIE]), senhaDefinida: !!CONFIG.senha }));

app.post('/api/login', async (req, reply) => {
  limitarLogin(req.ip);
  if (!CONFIG.senha) throw new ErroApp('Defina a variável SENHA_APP na hospedagem para poder entrar.', 400);
  if (!senhaConfere(texto(corpo(req).senha, 200))) throw new ErroApp('Senha incorreta.', 401);
  tentativas.delete(req.ip);
  reply.setCookie(COOKIE, novaSessao(), { path: '/', httpOnly: true, sameSite: 'lax', secure: CONFIG.producao, maxAge: DIAS_SESSAO * 86400 });
  return { ok: true };
});

app.post('/api/logout', async (_req, reply) => {
  reply.clearCookie(COOKIE, { path: '/' });
  return { ok: true };
});

app.get('/api/estado', async () => ({
  provedores: statusChaves(),
  cofre: cofreDisponivel(),
  ajustes: armaz.lerAjustes(),
  custoMes: armaz.custoDoMes(),
  limites: { video: CONFIG.limiteCustoVideo, mes: CONFIG.limiteCustoMes },
  modeloClaude: CONFIG.modeloClaude,
  avisos: validarConfig(),
  opcoes: { formatos: FORMATOS, orcamento: ORCAMENTO, estilos: ESTILOS, climas: CLIMAS },
}));

app.put('/api/ajustes', async (req) => {
  const b = corpo(req);
  const a: Partial<armaz.Ajustes> = {};
  if (['auto', 'openai', 'gemini', 'nenhum'].includes(String(b.provedorImagem))) a.provedorImagem = b.provedorImagem as armaz.Ajustes['provedorImagem'];
  if (['auto', 'elevenlabs', 'gemini', 'nenhum'].includes(String(b.provedorVoz))) a.provedorVoz = b.provedorVoz as armaz.Ajustes['provedorVoz'];
  if (['eleven_multilingual_v2', 'eleven_v3', 'eleven_v4', 'eleven_flash_v2_5'].includes(String(b.modeloVozElevenlabs))) a.modeloVozElevenlabs = String(b.modeloVozElevenlabs);
  if (['low', 'medium', 'high'].includes(String(b.qualidadeImagem))) a.qualidadeImagem = b.qualidadeImagem as armaz.Ajustes['qualidadeImagem'];
  if (typeof b.musicaIA === 'boolean') a.musicaIA = b.musicaIA;
  if (b.vozPadrao === null || typeof b.vozPadrao === 'string') a.vozPadrao = (b.vozPadrao as string | null) || null;
  return armaz.salvarAjustes(a);
});

/* ------------------------------------------------------------------ chaves */

const provedorValido = (p: string): Provedor => {
  if (!(p in PROVEDORES)) throw new ErroApp('Serviço desconhecido.', 404);
  return p as Provedor;
};

app.put('/api/chaves/:provedor', async (req) => {
  const p = provedorValido(String((req.params as Record<string, string>).provedor));
  salvarChave(p, texto(corpo(req).valor, 500));
  return { ok: true, provedores: statusChaves() };
});

app.delete('/api/chaves/:provedor', async (req) => {
  removerChave(provedorValido(String((req.params as Record<string, string>).provedor)));
  return { ok: true, provedores: statusChaves() };
});

/** Testa a chave com uma chamada barata (não gera nada). */
app.post('/api/chaves/:provedor/testar', async (req) => {
  const p = provedorValido(String((req.params as Record<string, string>).provedor));
  const k = obterChave(p);
  if (!k) throw new ErroApp('Chave não configurada.', 400);
  const urls: Record<Provedor, [string, Record<string, string>]> = {
    anthropic: ['https://api.anthropic.com/v1/models?limit=1', { 'x-api-key': k, 'anthropic-version': '2023-06-01' }],
    elevenlabs: ['https://api.elevenlabs.io/v1/voices', { 'xi-api-key': k }],
    openai: ['https://api.openai.com/v1/models', { Authorization: `Bearer ${k}` }],
    gemini: ['https://generativelanguage.googleapis.com/v1beta/models?pageSize=1', { 'x-goog-api-key': k }],
    fal: ['https://queue.fal.run/fal-ai/bria/background/remove/requests/teste/status', { Authorization: `Key ${k}` }],
  };
  const [url, headers] = urls[p];
  try {
    await chamar(url, { nome: PROVEDORES[p].nome, headers, tempo: 20_000 });
    return { ok: true, mensagem: 'Chave funcionando.' };
  } catch (e) {
    const err = e as ErroApp;
    // fal: um pedido inexistente responde 404/400 quando a chave é válida; 401/403 quando não é
    if (p === 'fal' && err.detalhe !== undefined && !/40[13]/.test(err.message)) return { ok: true, mensagem: 'Chave aceita pela fal.ai.' };
    return { ok: false, mensagem: err.message };
  }
});

/* ------------------------------------------------------------------ marcas (clientes) */

app.get('/api/marcas', async () => armaz.listarMarcas());

app.post('/api/marcas', async (req) => {
  const b = corpo(req);
  if (!texto(b.nome)) throw new ErroApp('Dê um nome para a marca.');
  return armaz.salvarMarca({
    nome: texto(b.nome, 80), segmento: texto(b.segmento, 80), descricao: texto(b.descricao, 600),
    cores: Array.isArray(b.cores) ? (b.cores as unknown[]).map((c) => String(c)) : [],
    contato: (typeof b.contato === 'object' && b.contato ? b.contato : {}) as armaz.Marca['contato'],
  });
});

app.put('/api/marcas/:id', async (req) => {
  const id = param(req, 'id');
  const b = corpo(req);
  if (!armaz.obterMarca(id)) throw new ErroApp('Marca não encontrada.', 404);
  return armaz.salvarMarca({
    id, nome: texto(b.nome, 80) || armaz.obterMarca(id)!.nome, segmento: texto(b.segmento, 80), descricao: texto(b.descricao, 600),
    cores: Array.isArray(b.cores) ? (b.cores as unknown[]).map((c) => String(c)) : undefined,
    contato: (typeof b.contato === 'object' && b.contato ? b.contato : {}) as armaz.Marca['contato'],
  });
});

app.delete('/api/marcas/:id', async (req) => {
  armaz.removerMarca(param(req, 'id'));
  return { ok: true };
});

app.post('/api/marcas/:id/logo', async (req) => {
  const id = param(req, 'id');
  const { arquivos } = await lerMultipart(req);
  const a = arquivos[0];
  const mime = a ? tipoImagem(a.dados) : null;
  if (!a || !mime) throw new ErroApp('Envie uma imagem PNG, JPG ou WebP.');
  const pasta = armaz.caminhos.marca(id);
  fs.mkdirSync(pasta, { recursive: true });
  const nome = `logo-${Date.now().toString(36)}.${extensao(mime)}`;
  fs.writeFileSync(path.join(pasta, nome), a.dados);
  return armaz.atualizarMarca(id, (m) => {
    if (m.logo) fs.rmSync(path.join(pasta, path.basename(m.logo)), { force: true });
    m.logo = nome;
  });
});

app.post('/api/marcas/:id/personagens', async (req) => {
  const id = param(req, 'id');
  const { campos, arquivos } = await lerMultipart(req);
  if (!texto(campos.nome) || !texto(campos.descricao)) throw new ErroApp('Informe nome e aparência do personagem.');
  let imagem: string | null = null;
  const a = arquivos[0];
  if (a) {
    const mime = tipoImagem(a.dados);
    if (!mime) throw new ErroApp('Imagem inválida.');
    const pasta = armaz.caminhos.marca(id);
    fs.mkdirSync(pasta, { recursive: true });
    imagem = `pers-${novoId()}.${extensao(mime)}`;
    fs.writeFileSync(path.join(pasta, imagem), a.dados);
  }
  return armaz.atualizarMarca(id, (m) => {
    m.personagens.push({ id: `p${novoId().slice(0, 6)}`, nome: texto(campos.nome, 60), descricao: texto(campos.descricao, 500), imagem });
  });
});

app.delete('/api/marcas/:id/personagens/:pid', async (req) => {
  const id = param(req, 'id');
  const pid = String((req.params as Record<string, string>).pid);
  return armaz.atualizarMarca(id, (m) => {
    const p = m.personagens.find((x) => x.id === pid);
    if (p?.imagem) fs.rmSync(path.join(armaz.caminhos.marca(id), path.basename(p.imagem)), { force: true });
    m.personagens = m.personagens.filter((x) => x.id !== pid);
  });
});

/* ------------------------------------------------------------------ vozes */

let cacheVozes: { em: number; lista: eleven.VozBiblioteca[] } | null = null;

app.get('/api/vozes', async () => {
  let biblioteca: eleven.VozBiblioteca[] | null = null;
  let erro: string | null = null;
  if (temChave('elevenlabs')) {
    try {
      if (!cacheVozes || Date.now() - cacheVozes.em > 10 * 60_000) cacheVozes = { em: Date.now(), lista: await eleven.listarVozes() };
      biblioteca = cacheVozes.lista;
    } catch (e) {
      erro = (e as Error).message;
    }
  }
  return { salvas: armaz.listarVozes(), elevenlabs: biblioteca, gemini: temChave('gemini') ? gemini.VOZES_GEMINI : null, erro };
});

app.post('/api/vozes', async (req) => {
  const b = corpo(req);
  const provedor = b.provedor === 'gemini' ? 'gemini' : 'elevenlabs';
  if (!texto(b.vozId) || !texto(b.nome)) throw new ErroApp('Escolha uma voz.');
  return armaz.salvarVoz({ nome: texto(b.nome, 60), provedor, vozId: texto(b.vozId, 80), tipo: 'biblioteca' });
});

app.post('/api/vozes/clonar', async (req) => {
  const { campos, arquivos } = await lerMultipart(req);
  if (campos.consentimento !== 'sim') throw new ErroApp('É preciso confirmar que a voz é sua ou que a pessoa autorizou.');
  const nome = texto(campos.nome, 60);
  const declarante = texto(campos.declarante, 80);
  if (!nome || !declarante) throw new ErroApp('Informe o nome da voz e quem autorizou.');
  const audios = arquivos.filter((a) => /^audio\/|video\/webm|video\/mp4|application\/octet-stream/.test(a.tipo) && a.dados.length > 20_000);
  if (!audios.length) throw new ErroApp('Grave ou envie pelo menos 30 segundos de áudio falando.');
  // converte qualquer gravação do celular (webm, m4a...) para MP3 mono antes de enviar
  const convertidos: { nome: string; tipo: string; dados: Buffer }[] = [];
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'clone-'));
  try {
    for (const [i, a] of audios.entries()) {
      const ent = path.join(tmp, `in-${i}`);
      const sai = path.join(tmp, `amostra-${i + 1}.mp3`);
      fs.writeFileSync(ent, a.dados);
      await ffmpeg(['-i', ent, '-vn', '-ac', '1', '-ar', '44100', '-c:a', 'libmp3lame', '-b:a', '128k', sai]);
      convertidos.push({ nome: `amostra-${i + 1}.mp3`, tipo: 'audio/mpeg', dados: fs.readFileSync(sai) });
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  const r = await eleven.clonarVoz({ nome, arquivos: convertidos, descricao: `Voz clonada com autorização de ${declarante} (Vibe Studio)` });
  cacheVozes = null;
  const voz = armaz.salvarVoz({ nome, provedor: 'elevenlabs', vozId: r.vozId, tipo: 'clone', consentimento: { declarante, data: new Date().toISOString() } });
  return { voz, precisaVerificar: r.precisaVerificar };
});

app.delete('/api/vozes/:id', async (req) => {
  const v = armaz.removerVoz(String((req.params as Record<string, string>).id));
  if (v?.tipo === 'clone' && (req.query as Record<string, string>).remoto === '1') await eleven.apagarVoz(v.vozId);
  return { ok: true };
});

app.post('/api/vozes/testar', async (req, reply) => {
  const b = corpo(req);
  const frase = texto(b.texto, 200) || 'Olá! Esta é a minha voz no Vibe Studio. Bora vender mais com vídeos incríveis?';
  const vozId = texto(b.vozId, 80);
  if (!vozId) throw new ErroApp('Escolha uma voz.');
  if (b.provedor === 'gemini') {
    const r = await gemini.narrar({ texto: frase, vozId });
    return reply.type('audio/mpeg').send(r.audio);
  }
  const r = await eleven.narrar({ texto: frase, vozId, modelo: armaz.lerAjustes().modeloVozElevenlabs });
  return reply.type('audio/mpeg').send(r.audio);
});

/* ------------------------------------------------------------------ projetos */

function resumoProjeto(p: armaz.Projeto) {
  const v = p.versoes.find((x) => x.n === p.versaoAtual);
  return {
    id: p.id, titulo: p.titulo, status: p.status, criadoEm: p.criadoEm, atualizadoEm: p.atualizadoEm,
    formato: p.pedido.formato, versao: p.versaoAtual, versoes: p.versoes.length,
    capa: v?.render ? pipeline.urlProjeto(p.id, v.render.capa) : null,
    segundos: v?.spec ? Math.round(v.spec.duracaoTotal / v.spec.fps) : null,
    custo: p.versoes.reduce((a, x) => a + x.custos.reduce((b, c) => b + c.usd, 0), 0),
    erro: p.erro,
  };
}

app.get('/api/projetos', async () => armaz.listarProjetos().map(resumoProjeto));

app.get('/api/projetos/:id', async (req) => {
  const p = armaz.obterProjeto(param(req, 'id'));
  return {
    ...p,
    resumo: resumoProjeto(p),
    referencias: p.referencias.map((r) => ({ ...r, url: pipeline.urlProjeto(p.id, `refs/${r.arquivo}`) })),
    versoes: p.versoes.map((v) => ({ ...v, video: v.render ? pipeline.urlProjeto(p.id, v.render.arquivo) : null, capa: v.render ? pipeline.urlProjeto(p.id, v.render.capa) : null })),
  };
});

function lerPedido(campos: Record<string, string>): Pedido {
  const b = json<Record<string, unknown>>(campos.pedido, {});
  const briefing = texto(b.briefing, 4000);
  if (briefing.length < 8) throw new ErroApp('Conte em pelo menos uma frase o que você quer no vídeo.');
  const formato = (Object.keys(FORMATOS).includes(String(b.formato)) ? b.formato : '9:16') as Pedido['formato'];
  const voz = (v: unknown): VozConfig | null => {
    const o = v as VozConfig | null;
    return o && (o.provedor === 'elevenlabs' || o.provedor === 'gemini') && typeof o.vozId === 'string' ? { provedor: o.provedor, vozId: o.vozId.slice(0, 80), nome: String(o.nome ?? '').slice(0, 60) } : null;
  };
  const marcaId = typeof b.marcaId === 'string' && armaz.obterMarca(b.marcaId) ? b.marcaId : null;
  return {
    briefing, formato,
    duracao: Math.min(90, Math.max(8, Number(b.duracao) || 20)),
    estilo: ([...ESTILOS, 'auto'] as string[]).includes(String(b.estilo)) ? (b.estilo as Pedido['estilo']) : 'auto',
    musica: ([...CLIMAS, 'auto'] as string[]).includes(String(b.musica)) ? (b.musica as Pedido['musica']) : 'auto',
    legendas: ['auto', 'sim', 'nao'].includes(String(b.legendas)) ? (b.legendas as Pedido['legendas']) : 'auto',
    narracao: b.narracao === 'nao' ? 'nao' : 'sim',
    vozPrincipal: voz(b.vozPrincipal), vozSecundaria: voz(b.vozSecundaria),
    marcaId,
    qualidade: (Object.keys(ORCAMENTO) as string[]).includes(String(b.qualidade)) ? (b.qualidade as Pedido['qualidade']) : 'padrao',
    revisar: b.revisar !== false,
  };
}

app.post('/api/projetos', async (req) => {
  const { campos, arquivos } = await lerMultipart(req);
  const pedido = lerPedido(campos);
  const id = novoId();
  const refs = guardarReferencias(id, arquivos.filter((a) => a.campo === 'fotos'), json<string[]>(campos.descricoes, []), []);
  pipeline.novoProjeto(pedido, refs, id);
  pipeline.criar(id);
  return { id };
});

app.delete('/api/projetos/:id', async (req) => {
  armaz.removerProjeto(param(req, 'id'));
  return { ok: true };
});

app.post('/api/projetos/:id/mensagens', async (req) => {
  const id = param(req, 'id');
  const { campos, arquivos } = await lerMultipart(req);
  const msg = texto(campos.texto, 2000);
  if (msg.length < 2) throw new ErroApp('Escreva o que você quer mudar.');
  const p = armaz.obterProjeto(id);
  if (p.status === 'gerando') throw new ErroApp('Espere terminar a versão atual antes de pedir outra alteração.', 409);
  const novas = guardarReferencias(id, arquivos.filter((a) => a.campo === 'fotos'), [], p.referencias);
  if (novas.length) armaz.mexerProjeto(id, (pp) => { pp.referencias.push(...novas); });
  pipeline.editarPorChat(id, msg, novas.map((r) => r.id));
  return { ok: true };
});

app.post('/api/projetos/:id/versoes/:n/ativar', async (req) => {
  const id = param(req, 'id');
  const n = Number((req.params as Record<string, string>).n);
  return resumoProjeto(armaz.mexerProjeto(id, (p) => {
    const v = p.versoes.find((x) => x.n === n);
    if (!v?.spec) throw new ErroApp('Versão indisponível.', 400);
    p.versaoAtual = n;
  }));
});

app.post('/api/projetos/:id/renderizar', async (req) => {
  const id = param(req, 'id');
  const p = armaz.obterProjeto(id);
  if (p.status === 'gerando' || p.status === 'renderizando') throw new ErroApp('Já estou trabalhando neste vídeo.', 409);
  pipeline.renderizar(id, p.versaoAtual);
  return { ok: true };
});

app.post('/api/projetos/:id/retomar', async (req) => {
  const id = param(req, 'id');
  const p = armaz.obterProjeto(id);
  if (p.status !== 'erro') throw new ErroApp('Este projeto não está com erro.', 409);
  pipeline.retomar(id);
  return { ok: true };
});

app.get('/api/demo', async () => ({ spec: specDemo }));

/* ------------------------------------------------------------------ mídias */

async function enviarMidia(req: FastifyRequest, reply: FastifyReply, base: string, rel: string, permitidas?: string[]) {
  const limpo = path.posix.normalize(rel).replace(/^(\.\.(\/|$))+/, '');
  if (limpo.includes('..') || (permitidas && !permitidas.some((p) => limpo.startsWith(p)))) return reply.code(404).send({ erro: 'Arquivo não encontrado.' });
  const completo = path.join(base, limpo);
  if (!completo.startsWith(base + path.sep) || !fs.existsSync(completo)) return reply.code(404).send({ erro: 'Arquivo não encontrado.' });
  if ((req.query as Record<string, string>).baixar === '1') reply.header('Content-Disposition', `attachment; filename="vibe-studio-${path.basename(limpo)}"`);
  reply.header('Cache-Control', 'private, max-age=86400');
  return reply.sendFile(limpo, base);
}

app.get('/midia/p/:id/*', async (req, reply) => {
  const id = param(req, 'id');
  return enviarMidia(req, reply, armaz.caminhos.projeto(id), String((req.params as Record<string, string>)['*'] ?? ''), ['cache/', 'refs/', 'renders/']);
});

app.get('/midia/m/:id/*', async (req, reply) => {
  const id = param(req, 'id');
  return enviarMidia(req, reply, armaz.caminhos.marca(id), String((req.params as Record<string, string>)['*'] ?? ''));
});

/* ------------------------------------------------------------------ app web + arquivos públicos */

const raizes = [CONFIG.web, CONFIG.publico].filter((r) => fs.existsSync(r));
await app.register(estatico, { root: raizes, prefix: '/', wildcard: true, index: ['index.html'], cacheControl: true, maxAge: '1h' });

app.setNotFoundHandler((req, reply) => {
  if (req.method === 'GET' && !req.url.startsWith('/api/') && !req.url.startsWith('/midia/') && fs.existsSync(path.join(CONFIG.web, 'index.html'))) {
    return reply.type('text/html').sendFile('index.html', CONFIG.web);
  }
  return reply.code(404).send({ erro: 'Não encontrado.' });
});

/* ------------------------------------------------------------------ início */

fs.mkdirSync(CONFIG.dados, { recursive: true });
for (const aviso of validarConfig()) app.log.warn(aviso);
pipeline.recuperarInterrompidos();
await app.listen({ port: CONFIG.porta, host: CONFIG.host });
console.log(`Vibe Studio no ar: http://localhost:${CONFIG.porta}`);
prepararRender().then(() => console.log('Motor de vídeo pronto.')).catch((e) => console.error('Falha ao preparar o motor de vídeo:', e));
