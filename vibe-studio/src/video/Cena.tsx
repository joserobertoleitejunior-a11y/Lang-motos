import React from 'react';
import { AbsoluteFill, Audio, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CenaRender } from '../shared/spec';
import { ProvedorCena, useVideo } from './contexto';
import { Fundo } from './componentes/Fundo';
import { Legendas } from './componentes/Legendas';
import { LAYOUT_COMPONENTES } from './layouts';
import { src } from './tema';

/** Uma cena: fundo + layout (com leve movimento de câmera) + voz + efeitos + legendas. */
export const Cena: React.FC<{ cena: CenaRender }> = ({ cena }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { spec } = useVideo();
  const Layout = LAYOUT_COMPONENTES[cena.layout];
  const camera = interpolate(frame, [0, durationInFrames], [1, 1.04]);
  return (
    <ProvedorCena cena={cena}>
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Fundo cena={cena} />
        <AbsoluteFill style={{ transform: `scale(${camera})` }}>
          <Layout cena={cena} />
        </AbsoluteFill>
        {spec.legendas && cena.palavras.length > 0 && <Legendas palavras={cena.palavras} />}
        {cena.narracao?.src && (
          <Sequence from={cena.narracao.inicio} layout="none" name="Voz">
            <Audio src={src(cena.narracao.src)} />
          </Sequence>
        )}
        {cena.sons.map((s, i) => (
          <Sequence key={i} from={s.em} layout="none" name={`Efeito ${s.nome}`}>
            <Audio src={src(s.src)} volume={s.volume} />
          </Sequence>
        ))}
      </AbsoluteFill>
    </ProvedorCena>
  );
};
