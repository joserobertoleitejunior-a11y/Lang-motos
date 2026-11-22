/** ElevenLabs: narração com tempo de cada palavra, clonagem de voz e música. */
import { caracteresParaPalavras, type PalavraSeg } from '../../shared/linhaDoTempo';
import { obterChave } from '../chaves';
import { chamar, ErroApp, tentarDeNovo } from '../util';

const BASE = 'https://api.elevenlabs.io';
// US$ por 1.000 caracteres (preço de API; nos planos mensais vira "créditos")
export const PRECO_MIL_CARACTERES: Record<string, number> = { eleven_flash_v2_5: 0.05, padrao: 0.1 };

function cab(extra: Record<string, string> = {}) {
  const k = obterChave('elevenlabs');
  if (!k) throw new ErroApp('A chave da ElevenLabs não está configurada.', 400);
  return { 'xi-api-key': k, ...extra };
}

export async function narrar(p: { texto: string; vozId: string; modelo: string; anterior?: string; proximo?: string }): Promise<{ audio: Buffer; palavras: PalavraSeg[]; caracteres: number; usd: number }> {
  const r = await tentarDeNovo(() => chamar(`${BASE}/v1/text-to-speech/${encodeURIComponent(p.vozId)}/with-timestamps?output_format=mp3_44100_128`, {
    nome: 'ElevenLabs (voz)',
    method: 'POST',
    headers: cab({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      text: p.texto,
      model_id: p.modelo,
      voice_settings: { stability: 0.5, similarity_boost: 0.8 },
      ...(p.anterior ? { previous_text: p.anterior } : {}),
      ...(p.proximo ? { next_text: p.proximo } : {}),
    }),
  }));
  const j = (await r.json()) as {
    audio_base64?: string;
    alignment?: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] } | null;
    normalized_alignment?: { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] } | null;
  };
  if (!j.audio_base64) throw new ErroApp('ElevenLabs não devolveu áudio.', 502);
  const al = j.alignment ?? j.normalized_alignment;
  const palavras = al ? caracteresParaPalavras(al.characters, al.character_start_times_seconds, al.character_end_times_seconds) : [];
  const preco = PRECO_MIL_CARACTERES[p.modelo] ?? PRECO_MIL_CARACTERES.padrao;
  return { audio: Buffer.from(j.audio_base64, 'base64'), palavras, caracteres: p.texto.length, usd: (p.texto.length / 1000) * preco };
}

export type VozBiblioteca = { vozId: string; nome: string; categoria: string; descricao: string; previa: string | null };

export async function listarVozes(): Promise<VozBiblioteca[]> {
  const r = await chamar(`${BASE}/v1/voices`, { nome: 'ElevenLabs (vozes)', headers: cab(), tempo: 30_000 });
  const j = (await r.json()) as { voices?: { voice_id: string; name: string; category?: string; labels?: Record<string, string>; preview_url?: string; description?: string }[] };
  return (j.voices ?? []).map((v) => ({
    vozId: v.voice_id,
    nome: v.name,
    categoria: v.category ?? '',
    descricao: [v.labels?.gender, v.labels?.accent, v.labels?.age, v.labels?.use_case ?? v.labels?.['use case'], v.description].filter(Boolean).join(' · '),
    previa: v.preview_url ?? null,
  }));
}

/** Clonagem instantânea (IVC). Exige consentimento de quem é dono da voz. */
export async function clonarVoz(p: { nome: string; arquivos: { nome: string; tipo: string; dados: Buffer }[]; descricao?: string }): Promise<{ vozId: string; precisaVerificar: boolean }> {
  const form = new FormData();
  form.append('name', p.nome);
  form.append('remove_background_noise', 'true');
  if (p.descricao) form.append('description', p.descricao);
  for (const a of p.arquivos) form.append('files', new Blob([new Uint8Array(a.dados)], { type: a.tipo || 'audio/mpeg' }), a.nome);
  const r = await chamar(`${BASE}/v1/voices/add`, { nome: 'ElevenLabs (clonar voz)', method: 'POST', headers: cab(), body: form, tempo: 180_000 });
  const j = (await r.json()) as { voice_id?: string; requires_verification?: boolean };
  if (!j.voice_id) throw new ErroApp('A ElevenLabs não devolveu a voz clonada.', 502);
  return { vozId: j.voice_id, precisaVerificar: !!j.requires_verification };
}

export async function apagarVoz(vozId: string) {
  await chamar(`${BASE}/v1/voices/${encodeURIComponent(vozId)}`, { nome: 'ElevenLabs (apagar voz)', method: 'DELETE', headers: cab(), tempo: 30_000 });
}

/** Trilha instrumental sob medida (planos pagos permitem uso comercial em redes sociais). */
export async function compor(p: { descricao: string; segundos: number }): Promise<Buffer> {
  const r = await chamar(`${BASE}/v1/music`, {
    nome: 'ElevenLabs (música)',
    method: 'POST',
    headers: cab({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ prompt: p.descricao, music_length_ms: Math.round(Math.min(300, Math.max(10, p.segundos)) * 1000), force_instrumental: true }),
    tempo: 300_000,
  });
  return Buffer.from(await r.arrayBuffer());
}
