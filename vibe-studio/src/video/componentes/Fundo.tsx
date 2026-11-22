import React from 'react';
import { AbsoluteFill, Img, interpolate, OffthreadVideo, random, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CenaRender } from '../../shared/spec';
import { useVideo } from '../contexto';
import { alfa, misturar, src } from '../tema';

export const Fundo: React.FC<{ cena: CenaRender }> = ({ cena }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { cores, paleta, tema, largura, altura, u } = useVideo();

  if (cena.fundo === 'foto' && cena.imagem && (cena.imagem.tipo === 'foto' || cena.imagem.tipo === 'video')) {
    const p = frame / Math.max(1, durationInFrames);
    const escala = interpolate(p, [0, 1], [1.12, 1.0]);
    const dx = interpolate(p, [0, 1], [-1.5, 1.5]);
    return (
      <AbsoluteFill style={{ background: '#000' }}>
        <AbsoluteFill style={{ transform: `scale(${escala}) translateX(${dx}%)` }}>
          {cena.imagem.tipo === 'video'
            ? <OffthreadVideo src={src(cena.imagem.src)} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <Img src={src(cena.imagem.src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </AbsoluteFill>
        <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 32%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.72) 100%)' }} />
      </AbsoluteFill>
    );
  }

  const base = cores.base;
  const brilho1 = cores.escuro ? alfa(misturar(paleta.primaria, '#FFFFFF', 0.3), 0.26) : alfa(paleta.primaria, 0.13);
  const brilho2 = cores.escuro ? alfa(misturar(paleta.destaque, '#FFFFFF', 0.25), 0.13) : alfa(paleta.destaque, 0.11);
  const deriva = Math.sin((frame / fps) * 0.6) * 3;
  const gradiente = cena.fundo === 'marca' || cena.fundo === 'destaque'
    ? `radial-gradient(120% 80% at 50% 0%, ${misturar(base, '#FFFFFF', 0.16)} 0%, ${base} 55%, ${misturar(base, '#000000', 0.14)} 100%)`
    : `radial-gradient(60% 45% at ${80 + deriva}% ${8 + deriva}%, ${brilho1} 0%, transparent 70%), radial-gradient(55% 40% at ${10 - deriva}% ${92 - deriva}%, ${brilho2} 0%, transparent 70%), ${base}`;

  return (
    <AbsoluteFill style={{ background: gradiente }}>
      {tema.bolhas && <Bolhas id={cena.id} />}
      {!tema.bolhas && tema.fonteTitulo === 'Bricolage Grotesque' && <Geometria />}
      {cena.layout !== 'impacto' && !tema.bolhas && tema.fonteTitulo === 'Anton' && (
        <AbsoluteFill style={{ backgroundImage: `repeating-linear-gradient(-45deg, ${alfa(cores.texto, 0.045)} 0 ${18 * u}px, transparent ${18 * u}px ${54 * u}px)` }} />
      )}
      {tema.fonteTitulo === 'Playfair Display' && (
        <AbsoluteFill style={{ inset: 38 * u, border: `${2 * u}px solid ${alfa(cores.texto, 0.18)}`, borderRadius: 6 * u, width: largura - 76 * u, height: altura - 76 * u }} />
      )}
    </AbsoluteFill>
  );
};

/** Formas flutuando ao fundo (estilos fofo-3d e moderno). */
const Bolhas: React.FC<{ id: string }> = ({ id }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { largura, altura, paleta, cores, u } = useVideo();
  const n = 7;
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {new Array(n).fill(0).map((_, i) => {
        const r = (k: string) => random(`${id}-${i}-${k}`);
        const tipo = i % 2; // 0 círculo, 1 anel
        const tam = (tipo === 2 ? 40 + r('t') * 40 : 70 + r('t') * 190) * u;
        // distribui nas bordas, longe do centro
        const lado = i % 4;
        const x = lado === 0 ? r('x') * largura * 0.28 : lado === 1 ? largura * (0.72 + r('x') * 0.28) : r('x') * largura;
        const y = lado < 2 ? r('y') * altura : lado === 2 ? r('y') * altura * 0.16 : altura * (0.84 + r('y') * 0.16);
        const sorteio = r('c') > 0.5 ? paleta.primaria : paleta.destaque;
        // no escuro, cor translúcida vira "marrom": círculos cheios ficam brancos bem suaves
        const cor = cores.escuro && tipo === 0 ? '#FFFFFF' : cores.escuro ? misturar(sorteio, '#FFFFFF', 0.2) : sorteio;
        const ent = spring({ frame: frame - 2 - i * 2, fps, config: { damping: 12, stiffness: 90 } });
        const fy = Math.sin((frame / fps) * (0.5 + r('v') * 0.6) * Math.PI * 2 * 0.5 + r('f') * 6) * 16 * u;
        const rot = frame * (r('r') - 0.5) * 0.8;
        const opac = cores.escuro ? (tipo === 0 ? 0.05 : 0.42) : 0.16;
        const estilo: React.CSSProperties = { position: 'absolute', left: x - tam / 2, top: y - tam / 2 + fy, width: tam, height: tam, transform: `scale(${ent}) rotate(${rot}deg)` };
        if (tipo === 0) return <div key={i} style={{ ...estilo, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, ${alfa(misturar(cor, '#FFFFFF', 0.5), opac + 0.1)}, ${alfa(cor, opac)})` }} />;
        if (tipo === 1) return <div key={i} style={{ ...estilo, borderRadius: '50%', border: `${Math.max(6, tam * 0.08)}px solid ${alfa(cor, opac + 0.04)}` }} />;
        return (
          <svg key={i} viewBox="-10 -10 20 20" style={estilo}>
            <path d="M0 -10 C 1 -2, 2 -1, 10 0 C 2 1, 1 2, 0 10 C -1 2, -2 1, -10 0 C -2 -1, -1 -2, 0 -10 Z" fill={alfa(cor, opac + 0.25)} />
          </svg>
        );
      })}
    </AbsoluteFill>
  );
};

/** Grade de pontos + faixa diagonal: visual de anúncio, sem enfeites fofos. */
const Geometria: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { largura, altura, paleta, cores, u } = useVideo();
  const p = Math.min(1, frame / (fps * 0.6));
  const ponto = cores.escuro ? 'rgba(255,255,255,0.10)' : alfa(cores.texto, 0.09);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(${ponto} ${2.2 * u}px, transparent ${2.4 * u}px)`, backgroundSize: `${46 * u}px ${46 * u}px`, WebkitMaskImage: 'linear-gradient(180deg, #000 0%, transparent 38%, transparent 70%, #000 100%)', maskImage: 'linear-gradient(180deg, #000 0%, transparent 38%, transparent 70%, #000 100%)' }} />
      <div style={{ position: 'absolute', left: -largura * 0.2, top: altura * 0.04, width: largura * 1.5, height: 26 * u, background: alfa(paleta.primaria, cores.escuro ? 0.55 : 0.9), transform: `rotate(-12deg) scaleX(${p})`, transformOrigin: 'left center' }} />
      <div style={{ position: 'absolute', left: -largura * 0.2, bottom: altura * 0.05, width: largura * 1.5, height: 12 * u, background: alfa(paleta.destaque, 0.9), transform: `rotate(-12deg) scaleX(${p})`, transformOrigin: 'right center' }} />
    </AbsoluteFill>
  );
};
