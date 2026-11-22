/** OpenAI: imagens novas, edição de fotos e fundo transparente (recorte). */
import { obterChave } from '../chaves';
import { chamar, ErroApp, tentarDeNovo } from '../util';

const BASE = 'https://api.openai.com/v1';
const MODELOS = [process.env.OPENAI_MODELO_IMAGEM || 'gpt-image-2.6-sunburst', 'gpt-image-2.5-sunburst', 'gpt-image-2'];
// estimativa por imagem (OpenAI cobra por token; valores de referência do gpt-image-2)
const PRECO: Record<'low' | 'medium' | 'high', number> = { low: 0.01, medium: 0.05, high: 0.19 };

function tamanho(proporcao: string, recorte: boolean): string {
  if (recorte || proporcao === '1:1') return '1024x1024';
  return proporcao === '16:9' ? '1536x1024' : '1024x1536';
}

export async function gerarImagem(p: { prompt: string; referencias: { mime: string; dados: Buffer }[]; proporcao: string; recorte: boolean; qualidade: 'low' | 'medium' | 'high' }): Promise<{ imagem: Buffer; mime: string; usd: number; modelo: string }> {
  const chave = obterChave('openai');
  if (!chave) throw new ErroApp('A chave da OpenAI não está configurada.', 400);
  let ultimoErro: unknown;
  for (const modelo of MODELOS) {
    try {
      let r: Response;
      const comum = { model: modelo, prompt: p.prompt, size: tamanho(p.proporcao, p.recorte), quality: p.qualidade, background: p.recorte ? 'transparent' : 'opaque', output_format: 'png', n: 1 };
      if (p.referencias.length) {
        const form = new FormData();
        for (const [k, v] of Object.entries(comum)) form.append(k, String(v));
        const campo = p.referencias.length > 1 ? 'image[]' : 'image';
        p.referencias.slice(0, 16).forEach((ref, i) => form.append(campo, new Blob([new Uint8Array(ref.dados)], { type: ref.mime }), `ref${i + 1}.${ref.mime === 'image/png' ? 'png' : 'jpg'}`));
        r = await tentarDeNovo(() => chamar(`${BASE}/images/edits`, { nome: 'OpenAI (editar imagem)', method: 'POST', headers: { Authorization: `Bearer ${chave}` }, body: form, tempo: 240_000 }), 2);
      } else {
        r = await tentarDeNovo(() => chamar(`${BASE}/images/generations`, { nome: 'OpenAI (imagem)', method: 'POST', headers: { Authorization: `Bearer ${chave}`, 'Content-Type': 'application/json' }, body: JSON.stringify(comum), tempo: 240_000 }), 2);
      }
      const j = (await r.json()) as { data?: { b64_json?: string }[] };
      const b64 = j.data?.[0]?.b64_json;
      if (!b64) throw new ErroApp('A OpenAI não devolveu imagem.', 502);
      return { imagem: Buffer.from(b64, 'base64'), mime: 'image/png', usd: PRECO[p.qualidade], modelo };
    } catch (e) {
      ultimoErro = e;
      // só tenta o próximo modelo se o erro for de modelo indisponível
      const det = e instanceof ErroApp ? `${e.message} ${e.detalhe ?? ''}` : '';
      if (!/model|modelo|not found|does not exist|unsupported/i.test(det)) throw e;
    }
  }
  throw ultimoErro;
}
