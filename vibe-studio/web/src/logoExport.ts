import { FONTES_LOGO, svgLogo, type LogoSpec } from '../../src/shared/logos';

const cache = new Map<string, string>();
async function fonteDataUri(arquivo: string): Promise<string> {
  const embutida = window.__VCP_ASSETS?.[`fontes/${arquivo}`];
  if (embutida) return embutida;
  if (cache.has(arquivo)) return cache.get(arquivo)!;
  const blob = await fetch(`/fontes/${arquivo}`).then((r) => r.blob());
  const uri = await new Promise<string>((res) => { const fr = new FileReader(); fr.onload = () => res(String(fr.result)); fr.readAsDataURL(blob); });
  cache.set(arquivo, uri);
  return uri;
}

/** SVG com as fontes embutidas: abre igual em qualquer lugar. */
export async function svgCompleto(spec: LogoSpec): Promise<{ svg: string; largura: number; altura: number }> {
  const { svg, largura, altura } = svgLogo(spec);
  const usadas = new Set<string>([spec.fonte, ...(spec.slogan.trim() ? ['inter'] : [])]);
  let css = '';
  for (const id of usadas) {
    const f = FONTES_LOGO.find((x) => x.id === id)!;
    css += `@font-face{font-family:'${f.familia}';font-weight:${f.peso};src:url(${await fonteDataUri(f.arquivo)}) format('woff2')}`;
  }
  return { svg: svg.replace('>', `><style>${css}</style>`), largura, altura };
}

export const svgParaDataUrl = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

export async function svgParaPng(svg: string, largura: number, altura: number, pxLargura = 1600): Promise<Blob> {
  const img = new Image();
  await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = () => rej(new Error('Falha ao desenhar o logo.')); img.src = svgParaDataUrl(svg); });
  const canvas = document.createElement('canvas');
  canvas.width = pxLargura;
  canvas.height = Math.round((pxLargura * altura) / largura);
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('Falha ao gerar a imagem.'))), 'image/png'));
}

export function baixar(blob: Blob, nome: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = nome; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
