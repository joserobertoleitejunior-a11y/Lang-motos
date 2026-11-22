/** fal.ai: clipes de vídeo a partir de imagem (Kling) e recorte de fundo (Bria). */
import { obterChave } from '../chaves';
import { chamar, ErroApp } from '../util';

export const MODELO_VIDEO = process.env.FAL_MODELO_VIDEO || 'fal-ai/kling-video/v2.6/pro/image-to-video';
export const PRECO_SEGUNDO_VIDEO = 0.07; // Kling 2.6 Pro sem áudio (estimativa)
const MODELO_RECORTE = 'fal-ai/bria/background/remove';

function cab() {
  const k = obterChave('fal');
  if (!k) throw new ErroApp('A chave da fal.ai não está configurada.', 400);
  return { Authorization: `Key ${k}`, 'Content-Type': 'application/json' };
}

type Fila = { request_id: string; status_url: string; response_url: string };

async function rodarNaFila<T>(modelo: string, entrada: unknown, nome: string, limiteMs: number): Promise<T> {
  const r = await chamar(`https://queue.fal.run/${modelo}`, { nome, method: 'POST', headers: cab(), body: JSON.stringify(entrada), tempo: 60_000 });
  const fila = (await r.json()) as Fila;
  const fim = Date.now() + limiteMs;
  while (Date.now() < fim) {
    await new Promise((res) => setTimeout(res, 4000));
    const s = await chamar(fila.status_url, { nome, headers: cab(), tempo: 30_000 });
    const st = (await s.json()) as { status: string; error?: string };
    if (st.status === 'COMPLETED') {
      const res = await chamar(fila.response_url, { nome, headers: cab(), tempo: 60_000 });
      return (await res.json()) as T;
    }
    if (st.status === 'FAILED' || st.status === 'ERROR' || st.error) throw new ErroApp(`${nome}: a geração falhou${st.error ? ` (${String(st.error).slice(0, 200)})` : ''}.`, 502);
  }
  throw new ErroApp(`${nome}: demorou mais que o esperado.`, 504);
}

async function baixar(url: string, nome: string): Promise<Buffer> {
  const r = await chamar(url, { nome, tempo: 180_000 });
  return Buffer.from(await r.arrayBuffer());
}

export async function animarImagem(p: { imagem: { mime: string; dados: Buffer }; movimento: string; segundos: 5 | 10 }): Promise<{ video: Buffer; usd: number }> {
  const dataUri = `data:${p.imagem.mime};base64,${p.imagem.dados.toString('base64')}`;
  const r = await rodarNaFila<{ video?: { url?: string } }>(MODELO_VIDEO, {
    prompt: p.movimento,
    // Kling usa start_image_url; os outros modelos de imagem->vídeo da fal usam image_url
    ...(/kling/.test(MODELO_VIDEO) ? { start_image_url: dataUri } : { image_url: dataUri }),
    duration: String(p.segundos),
    generate_audio: false,
    negative_prompt: 'texto, letras, legendas, marca d\'água, distorção, deformação',
  }, 'fal.ai (vídeo)', 12 * 60_000);
  if (!r.video?.url) throw new ErroApp('A fal.ai não devolveu o vídeo.', 502);
  return { video: await baixar(r.video.url, 'fal.ai (baixar vídeo)'), usd: p.segundos * PRECO_SEGUNDO_VIDEO };
}

export async function removerFundo(imagem: { mime: string; dados: Buffer }): Promise<{ imagem: Buffer; usd: number }> {
  const r = await rodarNaFila<{ image?: { url?: string } }>(MODELO_RECORTE, { image_url: `data:${imagem.mime};base64,${imagem.dados.toString('base64')}` }, 'fal.ai (recorte)', 3 * 60_000);
  if (!r.image?.url) throw new ErroApp('A fal.ai não devolveu a imagem recortada.', 502);
  return { imagem: await baixar(r.image.url, 'fal.ai (baixar recorte)'), usd: 0.018 };
}
