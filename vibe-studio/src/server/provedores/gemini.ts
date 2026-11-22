/** Google Gemini: imagens Nano Banana (com fotos de referência) e voz econômica. */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { obterChave } from '../chaves';
import { chamar, ErroApp, ffmpeg, tentarDeNovo } from '../util';

const BASE = 'https://generativelanguage.googleapis.com/v1beta';
export const MODELO_IMAGEM = process.env.GEMINI_MODELO_IMAGEM || 'gemini-nano-banana-2.1';
export const MODELO_VOZ = process.env.GEMINI_MODELO_VOZ || 'gemini-3.8-flash-tts';
export const PRECO_IMAGEM = { '1K': 0.0336, '2K': 0.0504 } as const;

export const VOZES_GEMINI = [
  { vozId: 'Kore', nome: 'Kore', descricao: 'feminina · firme' },
  { vozId: 'Aoede', nome: 'Aoede', descricao: 'feminina · leve' },
  { vozId: 'Leda', nome: 'Leda', descricao: 'feminina · jovem' },
  { vozId: 'Zephyr', nome: 'Zephyr', descricao: 'feminina · brilhante' },
  { vozId: 'Puck', nome: 'Puck', descricao: 'masculina · animada' },
  { vozId: 'Charon', nome: 'Charon', descricao: 'masculina · informativa' },
  { vozId: 'Fenrir', nome: 'Fenrir', descricao: 'masculina · empolgada' },
  { vozId: 'Orus', nome: 'Orus', descricao: 'masculina · firme' },
];

function cab() {
  const k = obterChave('gemini');
  if (!k) throw new ErroApp('A chave do Google Gemini não está configurada.', 400);
  return { 'x-goog-api-key': k, 'Content-Type': 'application/json' };
}

type Parte = { text?: string; inlineData?: { mimeType: string; data: string }; inline_data?: { mime_type: string; data: string } };
type Resposta = { candidates?: { content?: { parts?: Parte[] }; finishReason?: string }[]; promptFeedback?: { blockReason?: string } };

async function gerarConteudo(modelo: string, corpo: unknown, nome: string): Promise<Parte[]> {
  const r = await tentarDeNovo(() => chamar(`${BASE}/models/${modelo}:generateContent`, { nome, method: 'POST', headers: cab(), body: JSON.stringify(corpo), tempo: 180_000 }));
  const j = (await r.json()) as Resposta;
  if (j.promptFeedback?.blockReason) throw new ErroApp(`${nome}: pedido bloqueado pelo filtro do Google (${j.promptFeedback.blockReason}).`, 400);
  return j.candidates?.[0]?.content?.parts ?? [];
}

const proporcaoGemini: Record<string, string> = { '9:16': '9:16', '4:5': '3:4', '1:1': '1:1', '16:9': '16:9' };

export async function gerarImagem(p: { prompt: string; referencias: { mime: string; base64: string }[]; proporcao: string; tamanho: '1K' | '2K' }): Promise<{ imagem: Buffer; mime: string; usd: number }> {
  const parts: unknown[] = [{ text: p.prompt }, ...p.referencias.map((r) => ({ inline_data: { mime_type: r.mime, data: r.base64 } }))];
  const partes = await gerarConteudo(MODELO_IMAGEM, {
    contents: [{ role: 'user', parts }],
    generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: proporcaoGemini[p.proporcao] ?? '1:1', imageSize: p.tamanho } },
  }, 'Gemini (imagem)');
  const img = partes.find((x) => x.inlineData?.data || x.inline_data?.data);
  const data = img?.inlineData?.data ?? img?.inline_data?.data;
  if (!data) throw new ErroApp('O Gemini não devolveu imagem (talvez o pedido tenha sido bloqueado). Tente descrever de outro jeito.', 502);
  return { imagem: Buffer.from(data, 'base64'), mime: img?.inlineData?.mimeType ?? img?.inline_data?.mime_type ?? 'image/png', usd: PRECO_IMAGEM[p.tamanho] };
}

/** Voz do Gemini (sem tempos por palavra: a linha do tempo estima). Devolve MP3. */
export async function narrar(p: { texto: string; vozId: string }): Promise<{ audio: Buffer; usd: number }> {
  const partes = await gerarConteudo(MODELO_VOZ, {
    contents: [{ parts: [{ text: `Em português do Brasil, com voz calorosa e animada de locutor de comercial, diga: ${p.texto}` }] }],
    generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: p.vozId } } } },
  }, 'Gemini (voz)');
  const a = partes.find((x) => x.inlineData?.data || x.inline_data?.data);
  const data = a?.inlineData?.data ?? a?.inline_data?.data;
  const mime = a?.inlineData?.mimeType ?? a?.inline_data?.mime_type ?? '';
  if (!data) throw new ErroApp('O Gemini não devolveu áudio.', 502);
  const bruto = Buffer.from(data, 'base64');
  const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'gemini-voz-'));
  try {
    const saida = path.join(pasta, 'voz.mp3');
    if (/wav/i.test(mime)) {
      fs.writeFileSync(path.join(pasta, 'voz.wav'), bruto);
      await ffmpeg(['-i', path.join(pasta, 'voz.wav'), '-c:a', 'libmp3lame', '-b:a', '128k', saida]);
    } else {
      const taxa = /rate=(\d+)/.exec(mime)?.[1] ?? '24000';
      fs.writeFileSync(path.join(pasta, 'voz.pcm'), bruto);
      await ffmpeg(['-f', 's16le', '-ar', taxa, '-ac', '1', '-i', path.join(pasta, 'voz.pcm'), '-c:a', 'libmp3lame', '-b:a', '128k', saida]);
    }
    const segundos = bruto.length / 2 / 24000;
    // ~25 tokens de áudio por segundo; US$ 9 por milhão (preço até 31/12/2026)
    return { audio: fs.readFileSync(saida), usd: (segundos * 25 * 9) / 1_000_000 + 0.0002 };
  } finally {
    fs.rmSync(pasta, { recursive: true, force: true });
  }
}
