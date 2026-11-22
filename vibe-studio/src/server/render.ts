/** Render no servidor (Remotion + Chrome sem tela) e quadros para o Revisor. */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import type { VideoSpec } from '../shared/spec';
import { CONFIG } from './config';
import { normalizarVolume } from './posProducao';

let pacote: Promise<string> | null = null;

/** Empacota o motor de vídeo uma vez (alguns segundos) e reaproveita. */
export function prepararRender(): Promise<string> {
  if (!pacote) {
    pacote = bundle({ entryPoint: path.resolve('src/video/index.ts'), publicDir: CONFIG.publico }).catch((e) => {
      pacote = null;
      throw e;
    });
  }
  return pacote;
}

export const tokenMidia = (escopo: string) => crypto.createHmac('sha256', CONFIG.segredoSessao || 'dev').update(`midia:${escopo}`).digest('base64url').slice(0, 32);

/** Troca "/midia/..." por URL absoluta local com token, para o Chrome do render baixar. */
export function specParaRender(spec: VideoSpec): VideoSpec {
  const base = `http://127.0.0.1:${CONFIG.porta}`;
  const trocar = (s: string) => {
    const m = /^\/midia\/([pm])\/([a-z0-9]+)\//.exec(s);
    return m ? `${base}${s}?t=${tokenMidia(`${m[1]}/${m[2]}`)}` : s;
  };
  const json = JSON.stringify(spec, (_k, v) => (typeof v === 'string' && v.startsWith('/midia/') ? trocar(v) : v));
  return JSON.parse(json) as VideoSpec;
}

export async function renderizarVideo(spec: VideoSpec, saida: string, progresso?: (p: number) => void): Promise<{ antes: number | null }> {
  const serveUrl = await prepararRender();
  const inputProps = { spec: specParaRender(spec) };
  const composition = await selectComposition({ serveUrl, id: 'Video', inputProps, browserExecutable: CONFIG.chrome });
  const bruto = saida.replace(/\.mp4$/, '') + '.bruto.mp4';
  fs.mkdirSync(path.dirname(saida), { recursive: true });
  await renderMedia({
    composition, serveUrl, inputProps, codec: 'h264', crf: 20, outputLocation: bruto,
    browserExecutable: CONFIG.chrome,
    concurrency: process.env.RENDER_CONCORRENCIA ? Number(process.env.RENDER_CONCORRENCIA) : null,
    timeoutInMilliseconds: 120_000,
    onProgress: ({ progress }) => progresso?.(progress),
  });
  const vol = await normalizarVolume(bruto, saida);
  fs.rmSync(bruto, { force: true });
  return { antes: vol.antes };
}

/** Um JPEG (meia resolução) por quadro pedido. */
export async function renderizarQuadros(spec: VideoSpec, quadros: number[]): Promise<Buffer[]> {
  const serveUrl = await prepararRender();
  const inputProps = { spec: specParaRender(spec) };
  const composition = await selectComposition({ serveUrl, id: 'Video', inputProps, browserExecutable: CONFIG.chrome });
  const saida: Buffer[] = [];
  for (const frame of quadros) {
    const r = await renderStill({ composition, serveUrl, inputProps, frame, output: null, imageFormat: 'jpeg', jpegQuality: 82, scale: 0.5, browserExecutable: CONFIG.chrome });
    if (r.buffer) saida.push(r.buffer);
  }
  return saida;
}
