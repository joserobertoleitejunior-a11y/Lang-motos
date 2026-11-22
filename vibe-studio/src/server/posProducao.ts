/**
 * Pós-produção com ffmpeg: deixa o volume no padrão das redes sociais
 * (-14 LUFS, pico -1,5 dB) sem mexer na imagem (cópia do vídeo, sem perda).
 */
import { spawn } from 'node:child_process';

function rodar(args: string[]): Promise<{ codigo: number; saida: string }> {
  return new Promise((resolve, reject) => {
    const p = spawn(process.env.FFMPEG_PATH || 'ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let saida = '';
    p.stderr.on('data', (d) => { saida += d.toString(); if (saida.length > 200_000) saida = saida.slice(-100_000); });
    p.on('error', reject);
    p.on('close', (codigo) => resolve({ codigo: codigo ?? 1, saida }));
  });
}

export async function normalizarVolume(entrada: string, saida: string, alvo = -14): Promise<{ antes: number | null; depois: number }> {
  // 1ª passada: medir
  const medir = await rodar(['-hide_banner', '-nostats', '-i', entrada, '-af', `loudnorm=I=${alvo}:TP=-1.5:LRA=11:print_format=json`, '-f', 'null', '-']);
  const json = medir.saida.slice(medir.saida.lastIndexOf('{'), medir.saida.lastIndexOf('}') + 1);
  let filtro = `loudnorm=I=${alvo}:TP=-1.5:LRA=11`;
  let antes: number | null = null;
  try {
    const m = JSON.parse(json) as Record<string, string>;
    antes = Number(m.input_i);
    if (Number.isFinite(antes) && antes > -70) {
      filtro += `:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}:measured_thresh=${m.input_thresh}:offset=${m.target_offset}:linear=true`;
    } else {
      // vídeo sem som: só copia
      const c = await rodar(['-hide_banner', '-y', '-i', entrada, '-c', 'copy', saida]);
      if (c.codigo !== 0) throw new Error('ffmpeg falhou ao copiar o vídeo');
      return { antes: null, depois: alvo };
    }
  } catch {
    /* sem medição: usa passada única */
  }
  // 2ª passada: aplicar
  const r = await rodar(['-hide_banner', '-y', '-i', entrada, '-c:v', 'copy', '-af', filtro, '-ar', '48000', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', saida]);
  if (r.codigo !== 0) throw new Error('ffmpeg falhou na normalização: ' + r.saida.slice(-400));
  return { antes, depois: alvo };
}
