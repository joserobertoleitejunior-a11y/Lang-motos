import React, { useMemo } from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { measureText } from '@remotion/layout-utils';
import type { CenaRender } from '../../shared/spec';
import { useVideo } from '../contexto';
import { pilhaFonte } from '../tema';

type Numero = NonNullable<CenaRender['numero']>;

export function formatarNumero(v: number, casas: number): string {
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }).format(v);
}

/** Número que conta até o valor final e dá um "pulo" quando chega. */
export const Contador: React.FC<{ numero: Numero; inicio: number; largura: number; maxFonte: number; cor: string; corAcessorio?: string; duracao?: number }> = ({ numero, inicio, largura, maxFonte, cor, corAcessorio, duracao = 1.1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { tema } = useVideo();
  const casas = Math.max(0, Math.min(2, Math.round(numero.casas ?? 0)));
  const t = frame - inicio;
  const dur = Math.max(1, Math.round((numero.de === numero.ate ? 0.2 : duracao) * fps));
  const p = interpolate(t, [0, dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const valor = numero.de + (numero.ate - numero.de) * p;
  const textoFinal = formatarNumero(numero.ate, casas);
  const fonte = useMemo(() => {
    const base = { fontFamily: pilhaFonte(tema.fonteTitulo), fontWeight: tema.pesoTitulo, letterSpacing: tema.espacamento, fontSize: 100 };
    const wNum = measureText({ ...base, text: textoFinal }).width;
    const wPre = numero.prefixo ? measureText({ ...base, text: numero.prefixo }).width * 0.5 : 0;
    const wSuf = numero.sufixo ? measureText({ ...base, text: numero.sufixo }).width * 0.5 : 0;
    return Math.min(maxFonte, (largura / ((wNum + wPre + wSuf) * 1.04)) * 100);
  }, [textoFinal, numero.prefixo, numero.sufixo, largura, maxFonte, tema]);
  const entrada = spring({ frame: t, fps, config: { damping: 12, stiffness: 140 } });
  const pulo = spring({ frame: t - dur, fps, config: { damping: 7, stiffness: 260, mass: 0.5 } });
  const escala = interpolate(entrada, [0, 1], [0.6, 1]) * (1 + Math.sin(Math.min(1, pulo) * Math.PI) * 0.09);
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', fontFamily: pilhaFonte(tema.fonteTitulo), fontWeight: tema.pesoTitulo, letterSpacing: tema.espacamento, color: cor, fontSize: fonte, lineHeight: 1, transform: `scale(${escala})`, opacity: interpolate(entrada, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' }), whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
      {numero.prefixo && <span style={{ fontSize: '0.5em', marginRight: /\s$/.test(numero.prefixo) ? '0.22em' : '0.06em', color: corAcessorio ?? cor }}>{numero.prefixo.trim()}</span>}
      <span>{formatarNumero(valor, casas)}</span>
      {numero.sufixo && <span style={{ fontSize: '0.5em', marginLeft: '0.04em', color: corAcessorio ?? cor }}>{numero.sufixo.trim()}</span>}
    </div>
  );
};
