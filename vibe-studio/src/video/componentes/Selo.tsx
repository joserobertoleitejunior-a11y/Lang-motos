import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { useVideo } from '../contexto';
import { pilhaFonte } from '../tema';

/** Selo em forma de estrela (ex.: "-20%", "Novo", "Grátis"). */
export const Selo: React.FC<{ texto: string; tamanho: number; inicio: number; cor: string; corTexto: string }> = ({ texto, tamanho, inicio, cor, corTexto }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { tema } = useVideo();
  const t = frame - inicio;
  const s = spring({ frame: t, fps, config: { damping: 8, stiffness: 170, mass: 0.6 } });
  const pontas = 18;
  const pts = new Array(pontas * 2).fill(0).map((_, i) => {
    const r = i % 2 === 0 ? 50 : 43;
    const a = (Math.PI * i) / pontas;
    return `${(Math.sin(a) * r).toFixed(2)},${(-Math.cos(a) * r).toFixed(2)}`;
  });
  const letras = texto.length;
  const fonte = tamanho * (letras <= 3 ? 0.36 : letras <= 5 ? 0.27 : letras <= 8 ? 0.2 : 0.15);
  const giro = Math.sin((Math.max(0, t) / fps) * 2) * 4;
  return (
    <div style={{ position: 'relative', width: tamanho, height: tamanho, transform: `scale(${s}) rotate(${interpolate(s, [0, 1], [-40, -10]) + giro}deg)`, opacity: interpolate(s, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' }) }}>
      <svg viewBox="-52 -52 104 104" width={tamanho} height={tamanho} style={{ position: 'absolute', inset: 0, filter: `drop-shadow(0 ${tamanho * 0.05}px ${tamanho * 0.08}px rgba(0,0,0,0.25))` }}>
        <polygon points={pts.join(' ')} fill={cor} />
        <circle r={37} fill="none" stroke={corTexto} strokeOpacity={0.35} strokeWidth={1.5} strokeDasharray="3 3" />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: tamanho * 0.16, color: corTexto, fontFamily: pilhaFonte(tema.fonteTitulo), fontWeight: Math.max(700, tema.pesoTitulo), fontSize: fonte, lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
        {texto}
      </div>
    </div>
  );
};
