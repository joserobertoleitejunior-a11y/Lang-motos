import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import type { Expressao } from '../../shared/spec';
import { misturar } from '../tema';

/**
 * Mascote vetorial "fofo 3D" (gradientes simulando volume). Funciona sem
 * nenhuma IA de imagem: é o personagem padrão do modo demonstração.
 */
export const Mascote: React.FC<{ expressao: Expressao; tamanho: number; cor: string; corFolha?: string; t: number; id: string }> = ({ expressao, tamanho, cor, corFolha = '#3DBE6E', t, id }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const seg = Math.max(0, t) / fps;
  const clara = misturar(cor, '#FFFFFF', 0.5);
  const escura = misturar(cor, '#000000', 0.38);

  // piscar a cada ~2,7 s (6 frames)
  const ciclo = (frame + 40) % Math.round(fps * 2.7);
  const piscar = ciclo < 6 ? 1 - Math.sin((ciclo / 6) * Math.PI) * 0.92 : 1;
  const respirar = 1 + Math.sin(seg * Math.PI * 2 * 0.5) * 0.018;
  const folha = Math.sin(seg * Math.PI * 2 * 0.7) * 9;
  const acenar = expressao === 'feliz' || expressao === 'apaixonado' || expressao === 'piscando';
  const bracoD = acenar ? -28 + Math.sin(seg * Math.PI * 2 * 1.6) * 22 : 18 + Math.sin(seg * Math.PI * 2 * 0.5) * 4;
  const bracoE = -18 - Math.sin(seg * Math.PI * 2 * 0.5) * 4;
  const olharX = Math.sin(seg * 1.3) * 3;
  const pulsoCoracao = 1 + Math.max(0, Math.sin(seg * Math.PI * 2 * 1.4)) * 0.14;

  const g = (s: string) => `${id}-${s}`;
  const olhoAberto = (cx: number, cy: number) => (
    <g transform={`translate(${cx} ${cy}) scale(1 ${piscar}) translate(${-cx} ${-cy})`}>
      <ellipse cx={cx} cy={cy} rx={37} ry={43} fill={`url(#${g('esclera')})`} />
      <circle cx={cx + 4 + olharX} cy={cy + 7} r={23} fill={`url(#${g('pupila')})`} />
      <circle cx={cx + 13 + olharX} cy={cy - 4} r={9} fill="#FFFFFF" />
      <circle cx={cx - 4 + olharX} cy={cy + 17} r={4} fill="#FFFFFF" opacity={0.85} />
    </g>
  );
  const olhoFechado = (cx: number, cy: number) => <path d={`M${cx - 30} ${cy + 4} Q${cx} ${cy + 24} ${cx + 30} ${cy + 4}`} stroke="#2A1D2B" strokeWidth={10} fill="none" strokeLinecap="round" />;
  const coracao = (cx: number, cy: number) => (
    <path transform={`translate(${cx} ${cy}) scale(${1.25 * pulsoCoracao}) translate(-25 -24)`} d="M25 44 C 10 33, 0 24, 0 13 C 0 5, 6 0, 13 0 C 18 0, 22 3, 25 7 C 28 3, 32 0, 37 0 C 44 0, 50 5, 50 13 C 50 24, 40 33, 25 44 Z" fill="#FF4D6D" />
  );

  let olhos: React.ReactNode;
  let boca: React.ReactNode;
  let sobrancelhas: React.ReactNode = null;
  let extra: React.ReactNode = null;
  const bocaAberta = (
    <g>
      <clipPath id={g('boca')}><path d="M156 296 C 168 346, 232 346, 244 296 C 216 308, 184 308, 156 296 Z" /></clipPath>
      <path d="M156 296 C 168 346, 232 346, 244 296 C 216 308, 184 308, 156 296 Z" fill="#3A1D2A" />
      <ellipse cx={200} cy={338} rx={26} ry={14} fill="#FF7D8E" clipPath={`url(#${g('boca')})`} />
    </g>
  );
  switch (expressao) {
    case 'surpreso':
      olhos = <>{olhoAberto(150, 232)}{olhoAberto(250, 232)}</>;
      boca = <ellipse cx={200} cy={318} rx={19} ry={25} fill="#3A1D2A" />;
      sobrancelhas = <><path d="M118 172 Q148 152 176 168" stroke="#2A1D2B" strokeWidth={9} fill="none" strokeLinecap="round" /><path d="M224 168 Q252 152 282 172" stroke="#2A1D2B" strokeWidth={9} fill="none" strokeLinecap="round" /></>;
      break;
    case 'piscando':
      olhos = <>{olhoFechado(150, 232)}{olhoAberto(250, 232)}</>;
      boca = <path d="M163 300 Q200 334 237 300" stroke="#2A1D2B" strokeWidth={10} fill="none" strokeLinecap="round" />;
      break;
    case 'preocupado':
      olhos = <>{olhoAberto(150, 236)}{olhoAberto(250, 236)}</>;
      boca = <path d="M164 322 Q182 306 200 318 Q218 330 236 314" stroke="#2A1D2B" strokeWidth={9} fill="none" strokeLinecap="round" />;
      sobrancelhas = <><path d="M120 186 L176 172" stroke="#2A1D2B" strokeWidth={9} strokeLinecap="round" /><path d="M224 172 L280 186" stroke="#2A1D2B" strokeWidth={9} strokeLinecap="round" /></>;
      extra = <path d="M318 132 C 328 150, 338 160, 338 172 C 338 184, 328 190, 318 190 C 308 190, 298 184, 298 172 C 298 160, 308 150, 318 132 Z" fill="#7CC8FF" opacity={0.9} transform={`translate(0 ${Math.sin(seg * 4) * 4})`} />;
      break;
    case 'apaixonado':
      olhos = <>{coracao(150, 232)}{coracao(250, 232)}</>;
      boca = bocaAberta;
      break;
    case 'bravo':
      olhos = <>{olhoAberto(150, 238)}{olhoAberto(250, 238)}</>;
      boca = <path d="M168 322 Q200 302 232 322" stroke="#2A1D2B" strokeWidth={10} fill="none" strokeLinecap="round" />;
      sobrancelhas = <><path d="M116 176 L178 198" stroke="#2A1D2B" strokeWidth={12} strokeLinecap="round" /><path d="M222 198 L284 176" stroke="#2A1D2B" strokeWidth={12} strokeLinecap="round" /></>;
      break;
    default:
      olhos = <>{olhoAberto(150, 232)}{olhoAberto(250, 232)}</>;
      boca = bocaAberta;
  }

  return (
    <svg width={tamanho} height={tamanho * 1.15} viewBox="0 0 400 460" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={g('corpo')} cx="34%" cy="26%" r="82%">
          <stop offset="0" stopColor={clara} />
          <stop offset="0.55" stopColor={cor} />
          <stop offset="1" stopColor={escura} />
        </radialGradient>
        <radialGradient id={g('esclera')} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E3E8F0" />
        </radialGradient>
        <radialGradient id={g('pupila')} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#3A4256" />
          <stop offset="1" stopColor="#0E1118" />
        </radialGradient>
        <filter id={g('desfoque')} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
        <filter id={g('desfoque2')} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      {/* sombra no chão */}
      <ellipse cx={200} cy={446} rx={128 / respirar} ry={15} fill="#000000" opacity={0.16} filter={`url(#${g('desfoque')})`} />
      <g transform={`translate(200 420) scale(${2 - respirar} ${respirar}) translate(-200 -420)`}>
        {/* braços */}
        <ellipse cx={46} cy={292} rx={24} ry={44} fill={`url(#${g('corpo')})`} transform={`rotate(${bracoE + 40} 70 270)`} />
        <ellipse cx={354} cy={292} rx={24} ry={44} fill={`url(#${g('corpo')})`} transform={`rotate(${bracoD - 40} 330 270)`} />
        {/* broto */}
        <g transform={`rotate(${folha} 200 66)`}>
          <path d="M200 66 C 198 44, 203 30, 213 18" stroke={misturar(corFolha, '#000000', 0.25)} strokeWidth={9} fill="none" strokeLinecap="round" />
          <path d="M211 20 C 230 -2, 266 2, 276 20 C 254 36, 226 36, 211 20 Z" fill={corFolha} />
          <path d="M213 20 C 236 14, 254 16, 270 21" stroke={misturar(corFolha, '#FFFFFF', 0.35)} strokeWidth={4} fill="none" strokeLinecap="round" />
        </g>
        {/* corpo */}
        <path d="M200 60 C 300 60 362 150 366 262 C 370 362 300 420 200 420 C 100 420 30 362 34 262 C 38 150 100 60 200 60 Z" fill={`url(#${g('corpo')})`} />
        <ellipse cx={140} cy={128} rx={46} ry={26} fill="#FFFFFF" opacity={0.35} transform="rotate(-28 140 128)" filter={`url(#${g('desfoque2')})`} />
        {/* bochechas */}
        <ellipse cx={112} cy={290} rx={25} ry={15} fill="#FF8FA3" opacity={0.55} filter={`url(#${g('desfoque2')})`} />
        <ellipse cx={288} cy={290} rx={25} ry={15} fill="#FF8FA3" opacity={0.55} filter={`url(#${g('desfoque2')})`} />
        {sobrancelhas}
        {olhos}
        {boca}
        {extra}
      </g>
    </svg>
  );
};
