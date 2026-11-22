/** Reduz fotos no próprio celular antes de enviar (economiza dados e acelera). */
export async function prepararFoto(arquivo: File, max = 2048): Promise<Blob> {
  const url = URL.createObjectURL(arquivo);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error('Não consegui abrir esta imagem.'));
      i.src = url;
    });
    const escala = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.round(img.naturalWidth * escala);
    const h = Math.round(img.naturalHeight * escala);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, w, h);
    const png = arquivo.type === 'image/png';
    return await new Promise<Blob>((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('Falha ao preparar a foto.'))), png ? 'image/png' : 'image/jpeg', 0.88));
  } finally {
    URL.revokeObjectURL(url);
  }
}
