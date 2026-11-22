/**
 * Renderiza os roteiros de demonstração.
 *   npx tsx scripts/renderizar.ts quadros demo 9:16     -> PNGs de cada cena
 *   npx tsx scripts/renderizar.ts video demo 9:16 saida.mp4
 */
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';
import { montarDemo, roteiroDemo, roteiroTeste } from '../src/shared/demo';
import { iniciosDasCenas } from '../src/shared/linhaDoTempo';
import type { Formato } from '../src/shared/spec';
import { normalizarVolume } from '../src/server/posProducao';

const [modo = 'quadros', qual = 'demo', formato = '9:16', saida] = process.argv.slice(2);
const navegador = process.env.CHROME_PATH || '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const roteiro = qual === 'teste' ? roteiroTeste : roteiroDemo;
const spec = montarDemo(roteiro, formato as Formato, qual === 'teste' ? { nome: 'Padaria Pão Dourado', contato: { whatsapp: '11987654321', instagram: 'paodourado' } } : { nome: 'VIBE CODING PROCESS' });

const t0 = Date.now();
const serveUrl = await bundle({ entryPoint: path.resolve('src/video/index.ts'), publicDir: path.resolve('public') });
console.log(`bundle: ${Date.now() - t0} ms — ${spec.cenas.length} cenas, ${(spec.duracaoTotal / spec.fps).toFixed(1)} s`);
const inputProps = { spec };
const composition = await selectComposition({ serveUrl, id: 'Video', inputProps, browserExecutable: navegador });

if (modo === 'quadros') {
  const pasta = path.resolve('out/quadros');
  fs.mkdirSync(pasta, { recursive: true });
  const inicios = iniciosDasCenas(spec);
  const extra = (process.env.EXTRA ?? '').split(',').filter(Boolean).map(Number);
  for (let i = 0; i < spec.cenas.length; i++) {
    const c = spec.cenas[i];
    const quadro = Math.min(inicios[i] + c.duracao - (spec.cenas[i + 1]?.transicaoFrames ?? 0) - 4, inicios[i] + c.marca + 45 + extra.length);
    const arquivo = path.join(pasta, `${qual}-${formato.replace(':', 'x')}-${i + 1}-${c.layout}.png`);
    await renderStill({ composition, serveUrl, output: arquivo, frame: quadro, inputProps, browserExecutable: navegador, scale: 0.5 });
    console.log('quadro', arquivo, quadro);
  }
  for (const f of extra) {
    const arquivo = path.join(pasta, `${qual}-${formato.replace(':', 'x')}-f${f}.png`);
    await renderStill({ composition, serveUrl, output: arquivo, frame: f, inputProps, browserExecutable: navegador, scale: 0.5 });
    console.log('quadro', arquivo);
  }
} else {
  const arquivo = path.resolve(saida ?? `out/${qual}-${formato.replace(':', 'x')}.mp4`);
  fs.mkdirSync(path.dirname(arquivo), { recursive: true });
  let ultimo = -1;
  await renderMedia({
    composition, serveUrl, codec: 'h264', outputLocation: arquivo, inputProps, browserExecutable: navegador, crf: 20,
    onProgress: ({ progress }) => { const p = Math.floor(progress * 10); if (p !== ultimo) { ultimo = p; console.log(`render ${p * 10}%`); } },
  });
  const final = arquivo.replace(/\.mp4$/, '') + '-final.mp4';
  const vol = await normalizarVolume(arquivo, final);
  fs.renameSync(final, arquivo);
  console.log('volume:', vol.antes?.toFixed(1), 'LUFS ->', vol.depois, 'LUFS');
  console.log('vídeo:', arquivo, `${Date.now() - t0} ms`);
}
