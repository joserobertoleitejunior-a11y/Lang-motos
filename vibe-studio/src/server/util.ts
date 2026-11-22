import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

export const novoId = (prefixo = '') => prefixo + crypto.randomBytes(6).toString('base64url').replace(/[-_]/g, '').slice(0, 8).toLowerCase() + Date.now().toString(36).slice(-4);
export const hash = (...partes: unknown[]) => crypto.createHash('sha256').update(JSON.stringify(partes)).digest('hex').slice(0, 24);
export const agora = () => new Date().toISOString();

export function lerJson<T>(arquivo: string, padrao: T): T {
  try {
    return JSON.parse(fs.readFileSync(arquivo, 'utf8')) as T;
  } catch {
    return padrao;
  }
}

/** Escrita atômica (arquivo temporário + rename) para não corromper JSON. */
export function gravarJson(arquivo: string, dados: unknown) {
  fs.mkdirSync(path.dirname(arquivo), { recursive: true });
  const tmp = `${arquivo}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(dados, null, 2));
  fs.renameSync(tmp, arquivo);
}

export class ErroApp extends Error {
  constructor(message: string, public status = 400, public detalhe?: string) {
    super(message);
  }
}

/** fetch com tempo limite e mensagens de erro legíveis. */
export async function chamar(url: string, init: RequestInit & { tempo?: number; nome: string }): Promise<Response> {
  const { tempo = 120_000, nome, ...resto } = init;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), tempo);
  try {
    const r = await fetch(url, { ...resto, signal: ctrl.signal });
    if (!r.ok) {
      let corpo = '';
      try { corpo = (await r.text()).slice(0, 600); } catch { /* */ }
      const dica = r.status === 401 || r.status === 403 ? ' (chave inválida ou sem permissão)' : r.status === 429 ? ' (limite de uso atingido; tente de novo em instantes)' : r.status === 402 ? ' (sem créditos na conta)' : '';
      throw new ErroApp(`${nome}: erro ${r.status}${dica}`, r.status >= 500 ? 502 : 400, corpo);
    }
    return r;
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw new ErroApp(`${nome}: demorou demais para responder`, 504);
    throw e;
  } finally {
    clearTimeout(t);
  }
}

export async function tentarDeNovo<T>(fn: () => Promise<T>, tentativas = 3, espera = 1500): Promise<T> {
  let ultimo: unknown;
  for (let i = 0; i < tentativas; i++) {
    try {
      return await fn();
    } catch (e) {
      ultimo = e;
      const st = e instanceof ErroApp ? e.status : 0;
      if (st === 400 && !(e as ErroApp).message.includes('429')) break; // erro do pedido: não adianta repetir
      await new Promise((r) => setTimeout(r, espera * (i + 1)));
    }
  }
  throw ultimo;
}

export function ffmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const p = spawn(process.env.FFMPEG_PATH || 'ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => { err += d.toString(); });
    p.on('error', reject);
    p.on('close', (c) => (c === 0 ? resolve() : reject(new Error('ffmpeg: ' + err.slice(-300)))));
  });
}

export function duracaoMidia(arquivo: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const p = spawn(process.env.FFPROBE_PATH || 'ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', arquivo]);
    let out = '';
    p.stdout.on('data', (d) => { out += d.toString(); });
    p.on('error', reject);
    p.on('close', () => { const n = parseFloat(out); n > 0 ? resolve(n) : reject(new Error('não foi possível ler a duração')); });
  });
}

export const tipoImagem = (b: Buffer): 'image/png' | 'image/jpeg' | 'image/webp' | null =>
  b[0] === 0x89 && b[1] === 0x50 ? 'image/png' : b[0] === 0xff && b[1] === 0xd8 ? 'image/jpeg' : b.slice(8, 12).toString() === 'WEBP' ? 'image/webp' : null;

export const extensao = (mime: string) => (mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg');
