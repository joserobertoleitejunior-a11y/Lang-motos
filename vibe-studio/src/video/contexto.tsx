import React, { createContext, useContext } from 'react';
import type { CenaRender, Formato, Paleta, VideoSpec } from '../shared/spec';
import { coresDoFundo, TEMAS, type CoresFundo, type Tema } from './tema';

/** Margens seguras por formato: onde a interface do Reels/TikTok/YouTube não cobre. */
export type Area = { topo: number; base: number; esquerda: number; direita: number; legendaY: number };

const AREAS: Record<Formato, { normal: Area; comLegenda: Area }> = {
  '9:16': {
    normal: { topo: 210, base: 400, esquerda: 80, direita: 110, legendaY: 1400 },
    comLegenda: { topo: 200, base: 640, esquerda: 80, direita: 110, legendaY: 1400 },
  },
  '4:5': {
    normal: { topo: 80, base: 90, esquerda: 70, direita: 70, legendaY: 1170 },
    comLegenda: { topo: 70, base: 280, esquerda: 70, direita: 70, legendaY: 1170 },
  },
  '1:1': {
    normal: { topo: 70, base: 70, esquerda: 70, direita: 70, legendaY: 925 },
    comLegenda: { topo: 60, base: 230, esquerda: 70, direita: 70, legendaY: 925 },
  },
  '16:9': {
    normal: { topo: 70, base: 80, esquerda: 120, direita: 120, legendaY: 930 },
    comLegenda: { topo: 60, base: 220, esquerda: 120, direita: 120, legendaY: 930 },
  },
};

export type Contexto = {
  spec: VideoSpec;
  tema: Tema;
  paleta: Paleta;
  formato: Formato;
  largura: number;
  altura: number;
  u: number; // unidade: 1 = 1080 px na menor dimensão
  horizontal: boolean;
  area: Area;
  cena: CenaRender | null;
  cores: CoresFundo;
};

const Ctx = createContext<Contexto | null>(null);

export const ProvedorVideo: React.FC<{ spec: VideoSpec; children: React.ReactNode }> = ({ spec, children }) => {
  const u = Math.min(spec.largura, spec.altura) / 1080;
  const area0 = AREAS[spec.formato][spec.legendas ? 'comLegenda' : 'normal'];
  const area: Area = {
    topo: area0.topo * u, base: area0.base * u, esquerda: area0.esquerda * u, direita: area0.direita * u, legendaY: area0.legendaY * u,
  };
  const valor: Contexto = {
    spec, tema: TEMAS[spec.estilo], paleta: spec.paleta, formato: spec.formato,
    largura: spec.largura, altura: spec.altura, u, horizontal: spec.largura > spec.altura,
    area, cena: null, cores: coresDoFundo('claro', spec.paleta),
  };
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
};

export const ProvedorCena: React.FC<{ cena: CenaRender; children: React.ReactNode }> = ({ cena, children }) => {
  const pai = useVideo();
  const valor: Contexto = { ...pai, cena, cores: coresDoFundo(cena.fundo, pai.paleta) };
  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
};

export function useVideo(): Contexto {
  const c = useContext(Ctx);
  if (!c) throw new Error('useVideo fora do ProvedorVideo');
  return c;
}
