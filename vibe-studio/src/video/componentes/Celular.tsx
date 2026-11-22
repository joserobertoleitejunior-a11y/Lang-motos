import React from 'react';
import { Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { useVideo } from '../contexto';
import { alfa, misturar, pilhaFonte, src } from '../tema';
import { Icone } from './Icones';

/** Celular com a tela do cliente (imagem enviada) ou um site de exemplo animado. */
export const Celular: React.FC<{ altura: number; inicio: number; imagem: string | null; clique?: number }> = ({ altura, inicio, imagem, clique }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const { paleta, spec, tema } = useVideo();
  const t = frame - inicio;
  const largura = altura * 0.47;
  const borda = largura * 0.035;
  const s = spring({ frame: t, fps, config: { damping: 14, stiffness: 100, mass: 0.9 } });
  const flut = Math.sin((Math.max(0, t) / fps) * Math.PI * 2 * 0.4) * altura * 0.008;
  const inclinacao = interpolate(s, [0, 1], [-14, -4]) + Math.sin((Math.max(0, t) / fps) * 1.4) * 1;
  const telaL = largura - borda * 2;
  const telaA = altura - borda * 2;
  const tc = clique !== undefined ? frame - clique : -999;
  const toque = tc >= 0 && tc < 20 ? tc / 20 : -1;
  const aperto = tc >= 0 && tc < 8 ? 1 - Math.sin((tc / 8) * Math.PI) * 0.06 : 1;
  const rolagem = interpolate(frame, [inicio + fps * 0.8, durationInFrames], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad) });

  return (
    <div style={{ width: largura, height: altura, transform: `translateY(${(1 - s) * altura * 0.7 + flut}px) rotate(${inclinacao}deg)`, opacity: interpolate(s, [0, 0.15], [0, 1], { extrapolateRight: 'clamp' }) }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: largura * 0.16, background: 'linear-gradient(145deg, #2B303B, #0B0D12 60%)', padding: borda, boxShadow: `0 ${altura * 0.05}px ${altura * 0.09}px ${alfa('#000000', 0.32)}, 0 0 ${altura * 0.12}px ${alfa(paleta.primaria, 0.25)}, inset 0 0 0 ${largura * 0.006}px rgba(255,255,255,0.18)` }}>
        {/* botões laterais */}
        <div style={{ position: 'absolute', left: -largura * 0.012, top: altura * 0.2, width: largura * 0.014, height: altura * 0.07, borderRadius: 4, background: '#1A1D24' }} />
        <div style={{ position: 'absolute', right: -largura * 0.012, top: altura * 0.26, width: largura * 0.014, height: altura * 0.11, borderRadius: 4, background: '#1A1D24' }} />
        <div style={{ position: 'relative', width: telaL, height: telaA, borderRadius: largura * 0.13, overflow: 'hidden', background: '#FFFFFF' }}>
          {imagem ? (
            <Img src={src(imagem)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: `50% ${rolagem}%` }} />
          ) : (
            <SiteExemplo largura={telaL} altura={telaA} t={t} nome={spec.marca.nome ?? 'Seu negócio'} primaria={paleta.primaria} destaque={paleta.destaque} fonte={tema.fonteTitulo} aperto={aperto} />
          )}
          {/* ilha dinâmica */}
          <div style={{ position: 'absolute', top: telaA * 0.018, left: '50%', width: telaL * 0.3, height: telaL * 0.085, marginLeft: -telaL * 0.15, borderRadius: 999, background: '#000' }} />
          {toque >= 0 && (
            <div style={{ position: 'absolute', left: telaL / 2 - telaL * 0.12, top: telaA * 0.86 - telaL * 0.12, width: telaL * 0.24, height: telaL * 0.24, borderRadius: '50%', border: `${telaL * 0.012}px solid rgba(255,255,255,0.95)`, background: 'rgba(255,255,255,0.35)', transform: `scale(${0.4 + toque * 1.4})`, opacity: 1 - toque }} />
          )}
        </div>
      </div>
    </div>
  );
};

/** Um "site de comércio" desenhado em CSS para o modo demonstração. */
const SiteExemplo: React.FC<{ largura: number; altura: number; t: number; nome: string; primaria: string; destaque: string; fonte: string; aperto: number }> = ({ largura: L, altura: A, t, nome, primaria, destaque, fonte, aperto }) => {
  const { fps } = useVideoConfig();
  const entra = (i: number) => spring({ frame: t - 6 - i * 4, fps, config: { damping: 14, stiffness: 120 } });
  const card = (i: number, cor: string) => {
    const e = entra(i + 2);
    return (
      <div key={i} style={{ display: 'flex', gap: L * 0.04, alignItems: 'center', background: '#FFFFFF', borderRadius: L * 0.05, padding: L * 0.035, boxShadow: '0 6px 18px rgba(20,22,31,0.08)', transform: `translateY(${(1 - e) * 40}px)`, opacity: e }}>
        <div style={{ width: L * 0.2, height: L * 0.2, borderRadius: L * 0.04, background: `linear-gradient(135deg, ${misturar(cor, '#FFFFFF', 0.35)}, ${cor})` }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: L * 0.022 }}>
          <div style={{ height: L * 0.034, width: '80%', borderRadius: 99, background: '#D9DDE6' }} />
          <div style={{ height: L * 0.03, width: '55%', borderRadius: 99, background: '#E8EBF1' }} />
          <div style={{ height: L * 0.04, width: '35%', borderRadius: 99, background: alfa(primaria, 0.85) }} />
        </div>
      </div>
    );
  };
  const e0 = entra(0);
  return (
    <div style={{ width: L, height: A, background: '#F4F6FA', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: A * 0.34, background: `linear-gradient(160deg, ${misturar(primaria, '#FFFFFF', 0.12)}, ${misturar(primaria, '#000000', 0.18)})`, padding: `${A * 0.075}px ${L * 0.07}px ${L * 0.06}px`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: L * 0.03 }}>
        <div style={{ color: '#FFFFFF', fontFamily: pilhaFonte(fonte), fontWeight: 800, fontSize: L * 0.095, lineHeight: 1.02, opacity: e0, transform: `translateY(${(1 - e0) * 20}px)` }}>{nome}</div>
        <div style={{ height: L * 0.03, width: L * 0.4, borderRadius: 99, background: 'rgba(255,255,255,0.35)' }} />
      </div>
      <div style={{ flex: 1, padding: L * 0.06, display: 'flex', flexDirection: 'column', gap: L * 0.04, marginTop: -L * 0.05 }}>
        {card(0, destaque)}
        {card(1, primaria)}
        {card(2, misturar(destaque, primaria, 0.5))}
      </div>
      <div style={{ position: 'absolute', left: L * 0.08, right: L * 0.08, top: A * 0.86 - L * 0.07, height: L * 0.14, borderRadius: 999, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: L * 0.03, color: '#FFFFFF', fontFamily: pilhaFonte('Inter'), fontWeight: 800, fontSize: L * 0.055, boxShadow: '0 10px 24px rgba(37,211,102,0.4)', transform: `scale(${aperto})` }}>
        <Icone nome="whatsapp" tamanho={L * 0.075} cor="#FFFFFF" traco={2.2} /> Pedir no WhatsApp
      </div>
    </div>
  );
};
