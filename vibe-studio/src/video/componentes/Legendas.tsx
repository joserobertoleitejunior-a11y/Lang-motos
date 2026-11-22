import React, { useMemo } from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { Palavra } from '../../shared/spec';
import { contraste } from '../../shared/linhaDoTempo';
import { useVideo } from '../contexto';
import { pilhaFonte } from '../tema';
import { ajustar } from './Texto';

type Bloco = { palavras: Palavra[]; inicio: number; fim: number };

/** Agrupa as palavras faladas em blocos curtos (até 3 palavras / ~16 letras). */
export function blocosDeLegenda(palavras: Palavra[], fps: number): Bloco[] {
  const blocos: Bloco[] = [];
  let atual: Palavra[] = [];
  const fechar = () => {
    if (!atual.length) return;
    blocos.push({ palavras: atual, inicio: atual[0].inicio, fim: atual[atual.length - 1].fim });
    atual = [];
  };
  palavras.forEach((p) => {
    const letras = atual.reduce((a, w) => a + w.texto.length + 1, 0) + p.texto.length;
    if (atual.length >= 3 || (atual.length && letras > 16)) fechar();
    atual.push(p);
    if (/[.!?,;:]$/.test(p.texto)) fechar();
  });
  fechar();
  // cada bloco fica na tela até o próximo começar (ou um pouco depois da última palavra)
  return blocos.map((b, i) => ({ ...b, fim: i < blocos.length - 1 ? blocos[i + 1].inicio : b.fim + Math.round(fps * 0.35) }));
}

export const Legendas: React.FC<{ palavras: Palavra[] }> = ({ palavras }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { spec, area, largura, paleta, horizontal, u } = useVideo();
  const blocos = useMemo(() => blocosDeLegenda(palavras, fps), [palavras, fps]);
  const bloco = blocos.find((b) => frame >= b.inicio && frame < b.fim);
  const estilo = spec.estilo;
  const fonte = estilo === 'impacto' ? 'Anton' : estilo === 'fofo-3d' ? 'Nunito' : estilo === 'moderno' ? 'Bricolage Grotesque' : 'Inter';
  const peso = estilo === 'impacto' ? 400 : estilo === 'fofo-3d' ? 900 : 800;
  const caixaAlta = estilo !== 'elegante';
  const texto = bloco ? bloco.palavras.map((p) => p.texto).join(' ') : '';
  const maxL = largura - area.esquerda - area.direita - 40 * u;
  const aj = useMemo(() => (texto ? ajustar(texto, { largura: maxL, maxLinhas: 2, maxFonte: (horizontal ? 64 : 80) * u, minFonte: 40 * u, fonte, peso, espacamento: '0', caixaAlta }) : null), [texto, maxL, fonte, peso, caixaAlta, horizontal, u]);
  if (!bloco || !aj) return null;
  const corAtiva = contraste(paleta.destaque, '#000000') >= 5 ? paleta.destaque : contraste(paleta.primaria, '#000000') >= 5 ? paleta.primaria : '#FFD84D';
  const s = spring({ frame: frame - bloco.inicio, fps, config: { damping: 14, stiffness: 260, mass: 0.5 } });
  const tam = aj.fonte;
  const contorno = tam * 0.16;
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: area.legendaY - tam * 0.75, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      <div style={{ transform: `scale(${interpolate(s, [0, 1], [0.82, 1])})`, opacity: interpolate(s, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }), textAlign: 'center', fontFamily: pilhaFonte(fonte), fontWeight: peso, fontSize: tam, lineHeight: 1.12, textTransform: caixaAlta ? 'uppercase' : 'none' }}>
        {aj.linhas.map((linha, li) => (
          <div key={li} style={{ whiteSpace: 'nowrap' }}>
            {linha.map((wi, j) => {
              const p = bloco.palavras[wi];
              const ativa = frame >= p.inicio && frame < (bloco.palavras[wi + 1]?.inicio ?? bloco.fim);
              const sp = spring({ frame: frame - p.inicio, fps, config: { damping: 12, stiffness: 300, mass: 0.4 } });
              return (
                <span key={wi} style={{ position: 'relative', display: 'inline-block', marginLeft: j ? '0.3em' : 0, transform: ativa ? `scale(${1 + 0.06 * sp})` : undefined }}>
                  {/* camada de contorno atrás + camada de cor na frente = contorno só por fora */}
                  <span aria-hidden style={{ position: 'absolute', left: 0, top: 0, color: '#000000', WebkitTextStroke: `${contorno}px #000000`, textShadow: `0 ${tam * 0.08}px 0 rgba(0,0,0,0.6)` }}>{p.texto}</span>
                  <span style={{ position: 'relative', color: ativa ? corAtiva : '#FFFFFF' }}>{p.texto}</span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
