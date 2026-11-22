import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { useVideo } from '../contexto';
import { pilhaFonte } from '../tema';

/** Etiqueta de oferta (ex.: "-20%", "Novo", "Grátis"): faixa reta, levemente inclinada. */
export const Selo: React.FC<{ texto: string; tamanho: number; inicio: number; cor: string; corTexto: string }> = ({ texto, tamanho, inicio, cor, corTexto }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { tema } = useVideo();
  const t = frame - inicio;
  const s = spring({ frame: t, fps, config: { damping: 12, stiffness: 200, mass: 0.6 } });
  const fonte = tamanho * 0.22;
  return (
    <div style={{ transform: `translateX(${(1 - s) * tamanho}px) rotate(-4deg)`, opacity: interpolate(s, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' }), background: cor, color: corTexto, padding: `${fonte * 0.45}px ${fonte * 0.9}px`, borderRadius: fonte * 0.18, fontFamily: pilhaFonte(tema.fonteTitulo), fontWeight: Math.max(700, tema.pesoTitulo), fontSize: fonte, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.03em', whiteSpace: 'nowrap', boxShadow: `0 ${fonte * 0.25}px ${fonte * 0.7}px rgba(0,0,0,0.28)` }}>
      {texto}
    </div>
  );
};
