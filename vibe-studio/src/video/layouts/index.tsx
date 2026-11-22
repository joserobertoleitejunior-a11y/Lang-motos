import React from 'react';
import { AbsoluteFill, Easing, Img, interpolate, random, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import type { CenaRender, Layout } from '../../shared/spec';
import { contraste } from '../../shared/linhaDoTempo';
import { useVideo } from '../contexto';
import { Pilula, TextoAnimado } from '../componentes/Texto';
import { ImagemAnimada } from '../componentes/Imagem';
import { Contador } from '../componentes/Contador';
import { Celular } from '../componentes/Celular';
import { Selo } from '../componentes/Selo';
import { Icone, type NomeIcone } from '../componentes/Icones';
import { alfa, misturar, pilhaFonte, src } from '../tema';

type P = { cena: CenaRender };

/* ------------------------------------------------------------------ utilidades */

function useCaixa() {
  const v = useVideo();
  const x0 = v.area.esquerda;
  const y0 = v.area.topo;
  const cw = v.largura - v.area.esquerda - v.area.direita;
  const ch = v.altura - v.area.topo - v.area.base;
  return { ...v, x0, y0, cw, ch };
}

const Caixa: React.FC<{ children: React.ReactNode; direcao?: 'column' | 'row'; gap?: number; justificar?: React.CSSProperties['justifyContent']; alinhar?: React.CSSProperties['alignItems'] }> = ({ children, direcao = 'column', gap = 0, justificar = 'center', alinhar = 'center' }) => {
  const { x0, y0, cw, ch } = useCaixa();
  return (
    <div style={{ position: 'absolute', left: x0, top: y0, width: cw, height: ch, display: 'flex', flexDirection: direcao, justifyContent: justificar, alignItems: alinhar, gap }}>
      {children}
    </div>
  );
};

const inicioTexto = (c: CenaRender) => c.transicaoFrames + 2;

/** Título + subtítulo da cena. */
const BlocoTexto: React.FC<{ cena: CenaRender; largura: number; maxLinhas: number; maxFonte: number; inicio?: number; alinhamento?: 'center' | 'left'; cor?: string; corDestaque?: string; sombra?: boolean; maxFonteSub?: number; semSubtitulo?: boolean }> = (p) => {
  const { u, cores } = useVideo();
  const ini = p.inicio ?? inicioTexto(p.cena);
  if (!p.cena.titulo && !p.cena.subtitulo) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: p.alinhamento === 'left' ? 'flex-start' : 'center', gap: 22 * u }}>
      {p.cena.titulo && (
        <TextoAnimado texto={p.cena.titulo} inicio={ini} animacao={p.cena.animacaoTexto} largura={p.largura} maxLinhas={p.maxLinhas} maxFonte={p.maxFonte} destaques={p.cena.destaques} alinhamento={p.alinhamento} cor={p.cor} corDestaque={p.corDestaque} sombra={p.sombra} />
      )}
      {p.cena.subtitulo && !p.semSubtitulo && (
        <TextoAnimado papel="texto" texto={p.cena.subtitulo} inicio={ini + 8} animacao="subir" largura={p.largura * 0.92} maxLinhas={2} maxFonte={p.maxFonteSub ?? 48 * u} alinhamento={p.alinhamento} cor={p.sombra ? 'rgba(255,255,255,0.92)' : cores.suave} sombra={p.sombra} />
      )}
    </div>
  );
};

/** Imagem da cena com o selo no canto. */
const BlocoImagem: React.FC<{ cena: CenaRender; largura: number; altura: number; inicio?: number }> = ({ cena, largura, altura, inicio }) => {
  const { paleta, u } = useVideo();
  const ini = inicio ?? cena.marca;
  if (!cena.imagem) return null;
  const tamSelo = Math.min(largura, altura) * 0.36;
  return (
    <div style={{ position: 'relative', width: largura, height: altura, flexShrink: 0 }}>
      <ImagemAnimada imagem={cena.imagem} largura={largura} altura={altura} inicio={ini} animacao={cena.animacaoImagem} />
      {cena.selo && (
        <div style={{ position: 'absolute', right: -tamSelo * 0.12, top: -tamSelo * 0.1 + 10 * u }}>
          <Selo texto={cena.selo} tamanho={tamSelo} inicio={ini + 14} cor={paleta.destaque} corTexto={contraste(paleta.destaque, '#FFFFFF') >= 2.6 ? '#FFFFFF' : '#14161F'} />
        </div>
      )}
    </div>
  );
};

const SeloSolto: React.FC<{ cena: CenaRender; inicio: number }> = ({ cena, inicio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { paleta, u } = useVideo();
  if (!cena.selo) return null;
  const s = spring({ frame: frame - inicio, fps, config: { damping: 10, stiffness: 180 } });
  return (
    <div style={{ transform: `scale(${s}) rotate(${interpolate(s, [0, 1], [-8, -2])}deg)` }}>
      <Pilula texto={cena.selo} fundo={paleta.destaque} cor={contraste(paleta.destaque, '#FFFFFF') >= 2.6 ? '#FFFFFF' : '#14161F'} tamanho={38 * u} />
    </div>
  );
};

/* ------------------------------------------------------------------ layouts */

const Abertura: React.FC<P> = ({ cena }) => {
  const { cw, ch, horizontal, u } = useCaixa();
  const temImg = !!cena.imagem;
  const t0 = inicioTexto(cena);
  if (horizontal) {
    return (
      <Caixa direcao="row" gap={70 * u}>
        {temImg && <BlocoImagem cena={cena} largura={cw * 0.36} altura={ch * 0.85} />}
        <BlocoTexto cena={cena} largura={temImg ? cw * 0.56 : cw * 0.9} maxLinhas={3} maxFonte={140 * u} alinhamento={temImg ? 'left' : 'center'} inicio={t0} />
      </Caixa>
    );
  }
  return (
    <Caixa gap={46 * u}>
      {temImg && <BlocoImagem cena={cena} largura={cw * 0.8} altura={ch * 0.42} />}
      {!temImg && <SeloSolto cena={cena} inicio={t0} />}
      <BlocoTexto cena={cena} largura={cw} maxLinhas={temImg ? 3 : 4} maxFonte={(temImg ? 124 : 150) * u} inicio={t0} />
    </Caixa>
  );
};

const BarraAcento: React.FC<{ inicio: number; cor: string }> = ({ inicio, cor }) => {
  const frame = useCurrentFrame();
  const { u } = useVideo();
  const v = interpolate(frame - inicio, [0, 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  return <div style={{ width: 130 * u * v, height: 16 * u, borderRadius: 99, background: cor }} />;
};

const Texto: React.FC<P> = ({ cena }) => {
  const { cw, u, cores, horizontal } = useCaixa();
  const t0 = inicioTexto(cena);
  return (
    <Caixa gap={40 * u}>
      <SeloSolto cena={cena} inicio={t0} />
      <BarraAcento inicio={t0} cor={cores.destaque} />
      <BlocoTexto cena={cena} largura={cw * (horizontal ? 0.8 : 0.98)} maxLinhas={5} maxFonte={(horizontal ? 120 : 132) * u} inicio={t0 + 3} maxFonteSub={52 * u} />
    </Caixa>
  );
};

const TextoImagem: React.FC<P> = ({ cena }) => {
  const { cw, ch, horizontal, u } = useCaixa();
  if (!cena.imagem) return <Texto cena={cena} />;
  if (horizontal) {
    return (
      <Caixa direcao="row" gap={70 * u}>
        <BlocoTexto cena={cena} largura={cw * 0.5} maxLinhas={4} maxFonte={112 * u} alinhamento="left" />
        <BlocoImagem cena={cena} largura={cw * 0.42} altura={ch * 0.85} />
      </Caixa>
    );
  }
  return (
    <Caixa gap={50 * u}>
      <BlocoTexto cena={cena} largura={cw} maxLinhas={3} maxFonte={108 * u} />
      <BlocoImagem cena={cena} largura={cw * 0.9} altura={ch * 0.52} />
    </Caixa>
  );
};

const Balao: React.FC<{ cena: CenaRender; largura: number; inicio: number; cauda: 'baixo' | 'esquerda' }> = ({ cena, largura, inicio, cauda }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, cores, tema, largura: W } = useVideo();
  const s = spring({ frame: frame - inicio, fps, config: { damping: 11, stiffness: 170, mass: 0.7 } });
  const fundoBalao = cores.escuro ? '#FFFFFF' : '#FFFFFF';
  const corTexto = '#14161F';
  const corDest = contraste(cores.destaque, '#FFFFFF') >= 2.4 ? cores.destaque : '#14161F';
  const r = W * tema.raio * 1.6;
  const caudaTam = 46 * u;
  return (
    <div style={{ position: 'relative', transform: `scale(${s})`, transformOrigin: cauda === 'baixo' ? '50% 100%' : '0% 50%', opacity: interpolate(s, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' }) }}>
      <div style={{ background: fundoBalao, borderRadius: r, padding: `${40 * u}px ${46 * u}px`, boxShadow: `0 ${20 * u}px ${50 * u}px ${alfa('#000000', 0.16)}` }}>
        {cena.titulo && <TextoAnimado texto={cena.titulo} inicio={inicio + 4} animacao={cena.animacaoTexto === 'pop' ? 'palavras' : cena.animacaoTexto} largura={largura - 92 * u} maxLinhas={4} maxFonte={88 * u} destaques={cena.destaques} cor={corTexto} corDestaque={corDest} />}
      </div>
      <div style={{ position: 'absolute', width: caudaTam, height: caudaTam, background: fundoBalao, transform: 'rotate(45deg)', borderRadius: 6 * u, ...(cauda === 'baixo' ? { left: '50%', marginLeft: -caudaTam / 2, bottom: -caudaTam / 2.4 } : { top: '50%', marginTop: -caudaTam / 2, left: -caudaTam / 2.4 }) }} />
    </div>
  );
};

const Personagem: React.FC<P> = ({ cena }) => {
  const { cw, ch, horizontal, u } = useCaixa();
  const t0 = inicioTexto(cena);
  const tBalao = Math.max(cena.marca, t0 + 8);
  if (!cena.imagem) return <Texto cena={cena} />;
  const c2 = cena;
  if (horizontal) {
    return (
      <Caixa direcao="row" gap={60 * u}>
        <BlocoImagem cena={c2} largura={cw * 0.36} altura={ch * 0.92} inicio={t0} />
        <Balao cena={cena} largura={cw * 0.52} inicio={tBalao} cauda="esquerda" />
      </Caixa>
    );
  }
  return (
    <Caixa gap={70 * u}>
      <Balao cena={cena} largura={cw * 0.92} inicio={tBalao} cauda="baixo" />
      <BlocoImagem cena={c2} largura={cw * 0.85} altura={ch * 0.55} inicio={t0} />
    </Caixa>
  );
};

const Numero: React.FC<P> = ({ cena }) => {
  const { cw, ch, horizontal, u, cores } = useCaixa();
  if (!cena.numero) return <Texto cena={cena} />;
  const t0 = inicioTexto(cena);
  return (
    <Caixa gap={30 * u}>
      {cena.imagem && <BlocoImagem cena={cena} largura={cw * 0.5} altura={ch * 0.24} inicio={t0} />}
      {!cena.imagem && <SeloSolto cena={cena} inicio={t0} />}
      <Contador numero={cena.numero} inicio={cena.marca} largura={cw * (horizontal ? 0.7 : 0.94)} maxFonte={(horizontal ? 340 : 420) * u} cor={cores.destaque} corAcessorio={cores.texto} />
      <BlocoTexto cena={cena} largura={cw * (horizontal ? 0.7 : 0.96)} maxLinhas={3} maxFonte={84 * u} inicio={t0 + 4} corDestaque={cores.destaque} />
    </Caixa>
  );
};

const CelularLayout: React.FC<P> = ({ cena }) => {
  const { cw, ch, horizontal, u, fps } = { ...useCaixa(), fps: useVideoConfig().fps };
  const imagem = cena.imagem && 'src' in cena.imagem && cena.imagem.tipo !== 'video' ? cena.imagem.src : null;
  const clique = cena.marca + Math.round(fps * 0.9);
  if (horizontal) {
    return (
      <Caixa direcao="row" gap={90 * u}>
        <BlocoTexto cena={cena} largura={cw * 0.5} maxLinhas={4} maxFonte={110 * u} alinhamento="left" />
        <Celular altura={ch * 0.98} inicio={cena.marca} imagem={imagem} clique={clique} />
      </Caixa>
    );
  }
  return (
    <Caixa gap={56 * u} justificar="space-between">
      <BlocoTexto cena={cena} largura={cw} maxLinhas={3} maxFonte={100 * u} />
      <Celular altura={ch * 0.66} inicio={cena.marca} imagem={imagem} clique={clique} />
    </Caixa>
  );
};

const ItemLista: React.FC<{ texto: string; inicio: number; largura: number; indice: number }> = ({ texto, inicio, largura, indice }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, cores, paleta, tema, largura: W } = useVideo();
  const s = spring({ frame: frame - inicio, fps, config: { damping: 14, stiffness: 150 } });
  const check = interpolate(frame - inicio - 5, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fundoItem = cores.escuro ? 'rgba(255,255,255,0.08)' : '#FFFFFF';
  const corCirculo = cores.base === paleta.primaria ? cores.destaque : paleta.primaria;
  const icone = contraste(corCirculo, '#FFFFFF') >= 2.2 ? '#FFFFFF' : '#14161F';
  const d = 88 * u;
  return (
    <div style={{ width: largura, display: 'flex', alignItems: 'center', gap: 30 * u, padding: `${24 * u}px ${30 * u}px`, borderRadius: W * tema.raio * 1.3, background: fundoItem, boxShadow: cores.escuro ? 'none' : `0 ${12 * u}px ${32 * u}px ${alfa('#14161F', 0.08)}`, transform: `translateX(${(1 - s) * -largura * 0.35}px) rotate(${(1 - s) * -3}deg)`, opacity: interpolate(s, [0, 0.25], [0, 1], { extrapolateRight: 'clamp' }) }}>
      <div style={{ width: d, height: d, borderRadius: '50%', background: corCirculo, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: `scale(${0.6 + 0.4 * check})` }}>
        <Icone nome="check" tamanho={d * 0.62} cor={icone} traco={3.2} progresso={check} />
      </div>
      <TextoAnimado papel="texto" texto={texto} inicio={-999} animacao="subir" largura={largura - d - 90 * u} maxLinhas={2} maxFonte={60 * u} alinhamento="left" cor={cores.escuro ? '#FFFFFF' : cores.texto} estiloExtra={{ fontWeight: 800 }} key={indice} />
    </div>
  );
};

const Lista: React.FC<P> = ({ cena }) => {
  const { cw, ch, horizontal, u } = useCaixa();
  const { fps } = useVideoConfig();
  const itens = cena.itens ?? [];
  const passo = Math.round(fps * 0.35);
  const larguraItem = cw * (horizontal ? 0.55 : 0.96);
  const lista = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 * u }}>
      {itens.map((it, i) => <ItemLista key={i} indice={i} texto={it} inicio={cena.marca + passo * (i + 1)} largura={larguraItem} />)}
    </div>
  );
  if (horizontal) {
    return (
      <Caixa direcao="row" gap={70 * u}>
        <BlocoTexto cena={cena} largura={cw * 0.36} maxLinhas={4} maxFonte={100 * u} alinhamento="left" />
        {lista}
      </Caixa>
    );
  }
  return (
    <Caixa gap={54 * u}>
      <BlocoTexto cena={cena} largura={cw} maxLinhas={2} maxFonte={104 * u} />
      {lista}
      {cena.imagem && itens.length <= 2 && <BlocoImagem cena={cena} largura={cw * 0.6} altura={ch * 0.3} />}
    </Caixa>
  );
};

const Produto: React.FC<P> = ({ cena }) => {
  const { cw, ch, horizontal, u, cores } = useCaixa();
  const t0 = inicioTexto(cena);
  const preco = cena.numero ? <Contador numero={cena.numero} inicio={cena.marca + 6} largura={cw * (horizontal ? 0.45 : 0.7)} maxFonte={(horizontal ? 170 : 190) * u} cor={cores.destaque} corAcessorio={cores.texto} duracao={cena.numero.de === cena.numero.ate ? 0.01 : 1} /> : null;
  if (horizontal) {
    return (
      <Caixa direcao="row" gap={80 * u}>
        <BlocoImagem cena={cena} largura={cw * 0.42} altura={ch * 0.9} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 26 * u }}>
          <BlocoTexto cena={cena} largura={cw * 0.48} maxLinhas={3} maxFonte={110 * u} alinhamento="left" inicio={t0} />
          {preco}
        </div>
      </Caixa>
    );
  }
  return (
    <Caixa gap={34 * u}>
      <BlocoImagem cena={cena} largura={cw * 0.86} altura={ch * (preco ? 0.5 : 0.56)} />
      <BlocoTexto cena={cena} largura={cw} maxLinhas={2} maxFonte={100 * u} inicio={t0} />
      {preco}
    </Caixa>
  );
};

const CartaoComparacao: React.FC<{ rotulo: string; texto: string; inicio: number; largura: number; depois: boolean }> = ({ rotulo, texto, inicio, largura, depois }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, cores, paleta, tema, largura: W } = useVideo();
  const s = spring({ frame: frame - inicio, fps, config: { damping: depois ? 10 : 15, stiffness: depois ? 150 : 120 } });
  const fundoCartao = depois ? paleta.primaria : cores.escuro ? 'rgba(255,255,255,0.07)' : alfa(cores.texto, 0.06);
  const corTexto = depois ? (contraste(paleta.primaria, '#FFFFFF') >= 3 ? '#FFFFFF' : '#14161F') : cores.suave;
  const corIcone = depois ? paleta.destaque : '#E5484D';
  const d = 80 * u;
  return (
    <div style={{ width: largura, padding: `${34 * u}px ${36 * u}px`, borderRadius: W * tema.raio * 1.5, background: fundoCartao, display: 'flex', flexDirection: 'column', gap: 22 * u, boxShadow: depois ? `0 ${24 * u}px ${60 * u}px ${alfa(paleta.primaria, 0.35)}` : 'none', transform: `scale(${interpolate(s, [0, 1], [0.7, depois ? 1.02 : 1])})`, opacity: interpolate(s, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' }) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 * u }}>
        <div style={{ width: d, height: d, borderRadius: '50%', background: depois ? '#FFFFFF' : alfa('#E5484D', 0.14), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icone nome={depois ? 'check' : 'x'} tamanho={d * 0.6} cor={depois ? paleta.primaria : corIcone} traco={3.4} />
        </div>
        <span style={{ fontFamily: pilhaFonte(tema.fonteTexto), fontWeight: 800, fontSize: 34 * u, letterSpacing: '0.08em', textTransform: 'uppercase', color: corTexto, opacity: 0.9 }}>{rotulo}</span>
      </div>
      <TextoAnimado papel="titulo" texto={texto} inicio={-999} animacao="subir" largura={largura - 72 * u} maxLinhas={3} maxFonte={66 * u} alinhamento="left" cor={corTexto} estiloExtra={depois ? undefined : { textDecoration: 'none' }} />
    </div>
  );
};

const Comparacao: React.FC<P> = ({ cena }) => {
  const { cw, ch, horizontal, u, cores } = useCaixa();
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const [antes, depois] = [cena.itens?.[0] ?? 'Antes', cena.itens?.[1] ?? 'Depois'];
  const tDepois = cena.marca + Math.round(fps * 0.6);
  const seta = interpolate(frame - tDepois + 6, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const larg = horizontal ? cw * 0.4 : cw * 0.94;
  const cartoes = (
    <div style={{ display: 'flex', flexDirection: horizontal ? 'row' : 'column', alignItems: 'center', gap: 22 * u }}>
      <CartaoComparacao rotulo="Antes" texto={antes} inicio={cena.marca} largura={larg} depois={false} />
      <div style={{ transform: `rotate(${horizontal ? 0 : 90}deg) scale(${seta})`, opacity: seta }}>
        <Icone nome="seta" tamanho={70 * u} cor={cores.destaque} traco={3.2} />
      </div>
      <CartaoComparacao rotulo="Depois" texto={depois} inicio={tDepois} largura={larg} depois />
    </div>
  );
  return (
    <Caixa gap={50 * u}>
      <BlocoTexto cena={cena} largura={cw} maxLinhas={2} maxFonte={96 * u} semSubtitulo />
      {cena.imagem && !horizontal && <BlocoImagem cena={cena} largura={cw * 0.5} altura={ch * 0.2} />}
      {cartoes}
    </Caixa>
  );
};

const Impacto: React.FC<P> = ({ cena }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { cw, u, cores, horizontal, largura, altura } = useCaixa();
  const t = frame - cena.marca;
  const v = interpolate(t, [0, 7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.exp) });
  const tremor = t > 6 && t < 22 ? (1 - (t - 6) / 16) * 14 * u : 0;
  const tx = tremor ? (random(`tx${frame}`) - 0.5) * tremor : 0;
  const ty = tremor ? (random(`ty${frame}`) - 0.5) * tremor : 0;
  const flash = interpolate(t, [5, 12], [0.45, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const giro = frame * 0.4;
  const raio = Math.hypot(largura, altura);
  return (
    <>
      <AbsoluteFill style={{ opacity: 0.13 * v, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: raio, height: raio, flexShrink: 0, borderRadius: '50%', background: `repeating-conic-gradient(from ${giro}deg, ${cores.texto} 0deg 7deg, transparent 7deg 22.5deg)` }} />
      </AbsoluteFill>
      <Caixa>
        <div style={{ transform: `translate(${tx}px, ${ty}px) scale(${interpolate(v, [0, 1], [1.9, 1])})`, opacity: interpolate(t, [0, 3], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          {cena.titulo && <TextoAnimado texto={cena.titulo} inicio={-999} animacao="subir" largura={cw} maxLinhas={3} maxFonte={(horizontal ? 230 : 270) * u} destaques={cena.destaques} />}
        </div>
      </Caixa>
      <AbsoluteFill style={{ background: '#FFFFFF', opacity: flash, pointerEvents: 'none' }} />
    </>
  );
};

const Foto: React.FC<P> = ({ cena }) => {
  const { cw, u, cores } = useCaixa();
  if (cena.fundo !== 'foto') return <TextoImagem cena={cena} />;
  const t0 = inicioTexto(cena);
  return (
    <Caixa justificar="flex-end" gap={24 * u}>
      <SeloSolto cena={cena} inicio={t0} />
      <BlocoTexto cena={cena} largura={cw} maxLinhas={3} maxFonte={112 * u} cor="#FFFFFF" corDestaque={cores.destaque} sombra inicio={t0 + 4} />
    </Caixa>
  );
};

function formatarWhats(n: string): string {
  const d = n.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return n;
}

const Cta: React.FC<P> = ({ cena }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { cw, ch, u, cores, paleta, spec, tema, horizontal } = useCaixa();
  const t0 = inicioTexto(cena);
  const contato = spec.marca.contato ?? {};
  const linhas: { icone: NomeIcone; texto: string }[] = [];
  if (contato.whatsapp) linhas.push({ icone: 'whatsapp', texto: formatarWhats(contato.whatsapp) });
  if (contato.instagram) linhas.push({ icone: 'instagram', texto: contato.instagram.startsWith('@') ? contato.instagram : `@${contato.instagram}` });
  if (contato.site) linhas.push({ icone: 'globo', texto: contato.site.replace(/^https?:\/\//, '').replace(/\/$/, '') });
  if (contato.endereco) linhas.push({ icone: 'pin', texto: contato.endereco });
  const sLogo = spring({ frame: frame - t0, fps, config: { damping: 10, stiffness: 140 } });
  const tamLogo = Math.min(ch * 0.2, 300 * u);
  const nome = spec.marca.nome;
  const botaoTexto = contato.whatsapp ? 'Chame no WhatsApp' : contato.instagram ? 'Siga no Instagram' : 'Fale com a gente';
  const corBotao = contato.whatsapp ? '#1FAF5A' : cores.base === paleta.primaria ? cores.destaque : paleta.primaria;
  const tBotao = cena.marca + 6 + linhas.length * 5;
  const sBotao = spring({ frame: frame - tBotao, fps, config: { damping: 11, stiffness: 150 } });
  const pulso = 1 + Math.sin((Math.max(0, frame - tBotao) / fps) * Math.PI * 2 * 1.1) * 0.035 * Math.min(1, Math.max(0, frame - tBotao - 10) / 10);
  const anel = ((frame - tBotao) % Math.round(fps * 1.1)) / (fps * 1.1);

  return (
    <Caixa gap={(horizontal ? 26 : 38) * u}>
      {spec.marca.logo ? (
        <div style={{ width: tamLogo, height: tamLogo, borderRadius: tamLogo * 0.26, background: '#FFFFFF', boxShadow: `0 ${20 * u}px ${50 * u}px ${alfa('#000000', 0.18)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transform: `scale(${sLogo}) rotate(${interpolate(sLogo, [0, 1], [-12, 0])}deg)` }}>
          <Img src={src(spec.marca.logo)} style={{ width: '82%', height: '82%', objectFit: 'contain' }} />
        </div>
      ) : cena.imagem ? (
        <BlocoImagem cena={cena} largura={cw * (horizontal ? 0.3 : 0.62)} altura={ch * (horizontal ? 0.34 : 0.3)} inicio={t0} />
      ) : null}
      {!spec.marca.logo && nome && (
        <div style={{ transform: `scale(${sLogo})`, padding: `${20 * u}px ${38 * u}px`, borderRadius: 999, border: `${5 * u}px solid ${cores.destaque}`, color: cores.texto, fontFamily: pilhaFonte(tema.fonteTexto), fontWeight: 900, fontSize: 46 * u, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{nome}</div>
      )}
      <BlocoTexto cena={cena} largura={cw * (horizontal ? 0.8 : 1)} maxLinhas={3} maxFonte={(horizontal ? 104 : 126) * u} inicio={t0 + 6} />
      {linhas.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 * u, alignItems: 'flex-start' }}>
          {linhas.map((l, i) => {
            const s = spring({ frame: frame - (cena.marca + 4 + i * 5), fps, config: { damping: 14, stiffness: 160 } });
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18 * u, transform: `translateY(${(1 - s) * 30 * u}px)`, opacity: s }}>
                <div style={{ width: 74 * u, height: 74 * u, borderRadius: '50%', background: alfa(cores.destaque, 0.16), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icone nome={l.icone} tamanho={46 * u} cor={cores.destaque} />
                </div>
                <span style={{ fontFamily: pilhaFonte(tema.fonteTexto), fontWeight: 700, fontSize: 50 * u, color: cores.texto, maxWidth: cw * 0.8 }}>{l.texto}</span>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ position: 'relative', marginTop: 10 * u, transform: `scale(${sBotao * pulso})`, opacity: interpolate(sBotao, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' }) }}>
        {frame > tBotao + 10 && <div style={{ position: 'absolute', inset: 0, borderRadius: 999, border: `${4 * u}px solid ${corBotao}`, transform: `scale(${1 + anel * 0.35})`, opacity: 1 - anel }} />}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 * u, padding: `${32 * u}px ${62 * u}px`, borderRadius: 999, background: corBotao, color: contraste(corBotao, '#FFFFFF') >= 2.2 ? '#FFFFFF' : '#14161F', fontFamily: pilhaFonte(tema.fonteTexto), fontWeight: 800, fontSize: 54 * u, boxShadow: `0 ${16 * u}px ${40 * u}px ${alfa(corBotao, 0.45)}`, whiteSpace: 'nowrap' }}>
          {contato.whatsapp && <Icone nome="whatsapp" tamanho={50 * u} cor="#FFFFFF" traco={2.2} />}
          {botaoTexto}
        </div>
      </div>
    </Caixa>
  );
};

export const LAYOUT_COMPONENTES: Record<Layout, React.FC<P>> = {
  abertura: Abertura,
  texto: Texto,
  'texto-imagem': TextoImagem,
  personagem: Personagem,
  numero: Numero,
  celular: CelularLayout,
  lista: Lista,
  produto: Produto,
  comparacao: Comparacao,
  impacto: Impacto,
  foto: Foto,
  cta: Cta,
};

export { misturar };
