import React, { useMemo } from 'react';
import { AbsoluteFill, Audio, Easing, interpolate } from 'remotion';
import { linearTiming, TransitionSeries } from '@remotion/transitions';
import type { TransitionPresentation, TransitionPresentationComponentProps } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import type { Transicao, VideoSpec } from '../shared/spec';
import { intervalosDeVoz } from '../shared/linhaDoTempo';
import { Fontes } from './Fontes';
import { ProvedorVideo } from './contexto';
import { Cena } from './Cena';
import { src } from './tema';

type SemProps = Record<string, unknown>;

const ZoomTransicao: React.FC<TransitionPresentationComponentProps<SemProps>> = ({ presentationProgress: p, presentationDirection, children }) => {
  const entrando = presentationDirection === 'entering';
  const estilo: React.CSSProperties = entrando
    ? { transform: `scale(${interpolate(p, [0, 1], [1.25, 1])})`, opacity: interpolate(p, [0, 0.6], [0, 1], { extrapolateRight: 'clamp' }) }
    : { transform: `scale(${interpolate(p, [0, 1], [1, 0.86])})`, opacity: interpolate(p, [0.35, 1], [1, 0], { extrapolateLeft: 'clamp' }) };
  return <AbsoluteFill style={estilo}>{children}</AbsoluteFill>;
};
const zoom = (): TransitionPresentation<SemProps> => ({ component: ZoomTransicao, props: {} });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function apresentacao(t: Transicao): TransitionPresentation<any> {
  switch (t) {
    case 'deslizar': return slide({ direction: 'from-right' });
    case 'empurrar': return slide({ direction: 'from-bottom' });
    case 'limpar': return wipe({ direction: 'from-left' });
    case 'zoom': return zoom();
    default: return fade();
  }
}

/** Trilha com "ducking": abaixa quando alguém está falando e some no final. */
const Musica: React.FC<{ spec: VideoSpec }> = ({ spec }) => {
  const vozes = useMemo(() => intervalosDeVoz(spec), [spec]);
  if (!spec.musica) return null;
  const m = spec.musica;
  const total = spec.duracaoTotal;
  const volume = (f: number) => {
    let abaixar = 0;
    for (const [a, b] of vozes) {
      const v = interpolate(f, [a - 8, a, b, b + 12], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
      if (v > abaixar) abaixar = v;
    }
    const base = m.volume + (m.volumeComVoz - m.volume) * abaixar;
    const entrada = interpolate(f, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const saida = interpolate(f, [total - 45, total - 2], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return base * entrada * saida;
  };
  return <Audio src={src(m.src)} loop loopVolumeCurveBehavior="extend" volume={volume} name="Música" />;
};

export const Video: React.FC<{ spec: VideoSpec }> = ({ spec }) => {
  const filhos: React.ReactNode[] = [];
  spec.cenas.forEach((c, i) => {
    if (i > 0 && c.transicaoFrames > 0) {
      filhos.push(
        <TransitionSeries.Transition key={`t-${c.id}`} presentation={apresentacao(c.transicao)} timing={linearTiming({ durationInFrames: c.transicaoFrames, easing: Easing.inOut(Easing.cubic) })} />,
      );
    }
    filhos.push(
      <TransitionSeries.Sequence key={c.id} durationInFrames={c.duracao} name={`${i + 1}. ${c.layout}`}>
        <Cena cena={c} />
      </TransitionSeries.Sequence>,
    );
  });
  return (
    <AbsoluteFill style={{ background: spec.paleta.fundo }}>
      <Fontes>
        <ProvedorVideo spec={spec}>
          <TransitionSeries>{filhos}</TransitionSeries>
          <Musica spec={spec} />
        </ProvedorVideo>
      </Fontes>
    </AbsoluteFill>
  );
};
