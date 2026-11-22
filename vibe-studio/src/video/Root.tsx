import React from 'react';
import { Composition } from 'remotion';
import type { VideoSpec } from '../shared/spec';
import { specDemo } from '../shared/demo';
import { Video } from './Video';

type Props = { spec: VideoSpec };

export const Root: React.FC = () => (
  <Composition
    id="Video"
    component={Video as React.FC<Props>}
    durationInFrames={specDemo.duracaoTotal}
    fps={specDemo.fps}
    width={specDemo.largura}
    height={specDemo.altura}
    defaultProps={{ spec: specDemo } as Props}
    calculateMetadata={({ props }) => ({
      durationInFrames: props.spec.duracaoTotal,
      fps: props.spec.fps,
      width: props.spec.largura,
      height: props.spec.altura,
    })}
  />
);
