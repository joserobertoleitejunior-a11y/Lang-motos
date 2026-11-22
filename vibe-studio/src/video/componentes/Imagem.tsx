import React from 'react';
import { Easing, Img, interpolate, OffthreadVideo, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { AnimImagem, CenaRender } from '../../shared/spec';
import { useVideo } from '../contexto';
import { alfa, src } from '../tema';
import { Mascote } from './Mascote';

/** Entrada + movimento contínuo de um elemento visual. */
export function movimento(anim: AnimImagem, t: number, fps: number, tam: number): { transform: string; opacity: number } {
  const seg = Math.max(0, t) / fps;
  switch (anim) {
    case 'deslizar': {
      const s = spring({ frame: t, fps, config: { damping: 15, stiffness: 110, mass: 0.9 } });
      const flut = Math.sin(seg * Math.PI * 2 * 0.45) * tam * 0.01;
      return { transform: `translateX(${(1 - s) * tam * 1.3}px) translateY(${flut}px) rotate(${(1 - s) * 10}deg)`, opacity: interpolate(s, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' }) };
    }
    case 'zoom': {
      const v = interpolate(t, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.back(1.6)) });
      const lento = 1 + seg * 0.012;
      return { transform: `scale(${(0.35 + v * 0.65) * lento})`, opacity: interpolate(t, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) };
    }
    case 'flutuar': {
      const v = interpolate(t, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
      const flut = Math.sin(seg * Math.PI * 2 * 0.35) * tam * 0.03;
      const rot = Math.sin(seg * Math.PI * 2 * 0.25) * 2.2;
      return { transform: `translateY(${(1 - v) * tam * 0.35 + flut}px) rotate(${rot}deg)`, opacity: v };
    }
    default: {
      // quicar
      const s = spring({ frame: t, fps, config: { damping: 9, stiffness: 150, mass: 0.75 } });
      const bob = Math.sin(seg * Math.PI * 2 * 0.55) * tam * 0.012;
      return { transform: `translateY(${(1 - s) * tam * 0.22 + bob}px) scale(${s})`, opacity: interpolate(s, [0, 0.15], [0, 1], { extrapolateRight: 'clamp' }) };
    }
  }
}

export const ImagemAnimada: React.FC<{
  imagem: CenaRender['imagem'];
  largura: number;
  altura: number;
  inicio: number;
  animacao: AnimImagem;
  raio?: number;
  semMoldura?: boolean;
}> = ({ imagem, largura, altura, inicio, animacao, raio, semMoldura }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { paleta, tema, u, cena } = useVideo();
  if (!imagem) return null;
  const t = frame - inicio;
  const tam = Math.min(largura, altura);
  const mov = movimento(animacao, t, fps, tam);
  const caixa: React.CSSProperties = { width: largura, height: altura, display: 'flex', alignItems: 'center', justifyContent: 'center', transformOrigin: '50% 85%', ...mov };

  if (imagem.tipo === 'mascote') {
    const lado = Math.min(largura, altura / 1.15);
    return (
      <div style={caixa}>
        <Mascote expressao={imagem.expressao} tamanho={lado} cor={paleta.primaria} t={t} id={`m-${cena?.id ?? 'x'}`} />
      </div>
    );
  }
  if (imagem.tipo === 'recorte') {
    return (
      <div style={caixa}>
        <Img src={src(imagem.src)} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: `drop-shadow(0 ${30 * u}px ${36 * u}px rgba(0,0,0,0.22))` }} />
      </div>
    );
  }
  // foto ou vídeo: cartão com cantos arredondados
  const r = raio ?? tam * tema.raio * 2.2;
  const zoomLento = 1.06 - Math.min(1, Math.max(0, t) / (fps * 6)) * 0.06;
  const midia = imagem.tipo === 'video'
    ? <OffthreadVideo src={src(imagem.src)} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    : <Img src={src(imagem.src)} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoomLento})` }} />;
  return (
    <div style={caixa}>
      <div style={{ width: '100%', height: '100%', borderRadius: r, overflow: 'hidden', background: '#ddd', boxShadow: semMoldura ? undefined : `0 ${34 * u}px ${70 * u}px ${alfa('#000000', 0.25)}, 0 0 0 ${10 * u}px #FFFFFF` }}>
        {midia}
      </div>
    </div>
  );
};
