import React from 'react';
import { Player } from '@remotion/player';
import type { VideoSpec } from '../../src/shared/spec';
import { iniciosDasCenas } from '../../src/shared/linhaDoTempo';
import { Video } from '../../src/video/Video';

/** Prévia ao vivo: o mesmo motor do render, rodando no próprio celular. */
export const PlayerVideo: React.FC<{ spec: VideoSpec; maxAltura?: number; autoPlay?: boolean }> = ({ spec, maxAltura = 560, autoPlay }) => {
  const largura = Math.round(maxAltura * (spec.largura / spec.altura));
  // começa mostrando a 1ª cena já montada (melhor que um quadro vazio)
  const inicial = Math.min(spec.duracaoTotal - 1, Math.max(0, (iniciosDasCenas(spec)[0] ?? 0) + (spec.cenas[0]?.marca ?? 0) + 30));
  return (
    <div className="player-caixa" style={{ width: `min(100%, ${largura}px)`, aspectRatio: `${spec.largura} / ${spec.altura}` }}>
      <Player
        component={Video}
        inputProps={{ spec }}
        durationInFrames={Math.max(1, spec.duracaoTotal)}
        fps={spec.fps}
        compositionWidth={spec.largura}
        compositionHeight={spec.altura}
        style={{ width: '100%', height: '100%' }}
        controls
        loop
        autoPlay={autoPlay}
        clickToPlay
        doubleClickToFullscreen
        allowFullscreen
        showVolumeControls
        acknowledgeRemotionLicense
        initialFrame={inicial}
      />
    </div>
  );
};
