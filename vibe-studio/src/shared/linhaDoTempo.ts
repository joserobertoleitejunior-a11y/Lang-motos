/**
 * Linha do tempo: transforma o RoteiroIA + arquivos gerados (voz, imagens,
 * música) no VideoSpec que o Remotion desenha. Função pura: mesma entrada,
 * mesmo vídeo. Usada pelo servidor e pelos testes.
 */
import {
  FORMATOS, type CenaIA, type CenaRender, type Formato, type Layout, type Paleta,
  type Palavra, type RoteiroIA, type SomPosicionado, type Transicao, type VideoSpec,
} from './spec';

export type PalavraSeg = { texto: string; inicio: number; fim: number }; // segundos

export type AudioCena = {
  src: string | null; // null = sem arquivo (modo demonstração: só o tempo estimado)
  duracao: number; // segundos
  palavras: PalavraSeg[]; // segundos, relativos ao início da fala
};

export type ImagemCena = { src: string; tipo: 'recorte' | 'foto' | 'video' } | null;

export type EntradaLinhaDoTempo = {
  roteiro: RoteiroIA;
  formato: Formato;
  fps?: number;
  audios: (AudioCena | null)[]; // um por cena
  imagens: ImagemCena[]; // um por cena
  musicaSrc: string | null;
  logoSrc: string | null;
  sfxBase: string; // ex.: "sfx/" (staticFile) ou "http://.../sfx/"
  marca: { nome?: string; contato?: VideoSpec['marca']['contato'] };
};

const DURACAO_PADRAO: Record<Layout, number> = {
  abertura: 2.4, texto: 2.6, 'texto-imagem': 3, personagem: 3, numero: 3.2, celular: 3.4,
  lista: 3.8, produto: 3.4, comparacao: 3.6, impacto: 1.8, foto: 3, cta: 3.8, ascii: 4.4,
};

const FRAMES_TRANSICAO: Record<Transicao, number> = {
  corte: 0, fade: 10, deslizar: 12, empurrar: 12, limpar: 14, zoom: 12,
};

/* ------------------------------------------------------------------ utilidades de texto */

export function limparPalavra(p: string): string {
  return p.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9%$]/g, '');
}

/** Estima o tempo de cada palavra quando o provedor de voz não devolve tempos. */
export function estimarPalavras(texto: string, duracao: number): PalavraSeg[] {
  const tokens = texto.split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  // peso = letras + pausa extra depois de pontuação
  const pesos = tokens.map((t) => Math.max(2, t.replace(/[^\p{L}\p{N}]/gu, '').length) + (/[.!?]$/.test(t) ? 4 : /[,;:]$/.test(t) ? 2 : 0));
  const total = pesos.reduce((a, b) => a + b, 0);
  const util = Math.max(0.2, duracao - 0.15);
  let t = 0.05;
  return tokens.map((tok, i) => {
    const d = (pesos[i] / total) * util;
    const p = { texto: tok, inicio: t, fim: t + d * 0.92 };
    t += d;
    return p;
  });
}

/** Duração aproximada da fala em pt-BR (~2,6 palavras por segundo). */
export function estimarDuracaoFala(texto: string): number {
  const palavras = texto.split(/\s+/).filter(Boolean).length;
  const pausas = (texto.match(/[.!?]/g) || []).length * 0.25 + (texto.match(/[,;:]/g) || []).length * 0.12;
  return palavras === 0 ? 0 : Math.max(0.8, palavras / 2.6 + pausas);
}

/** Converte o alinhamento por caractere (ElevenLabs) em palavras. */
export function caracteresParaPalavras(chars: string[], inicios: number[], fins: number[]): PalavraSeg[] {
  const palavras: PalavraSeg[] = [];
  let atual = '';
  let ini = 0;
  let fim = 0;
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (/\s/.test(c)) {
      if (atual) palavras.push({ texto: atual, inicio: ini, fim });
      atual = '';
      continue;
    }
    if (!atual) ini = inicios[i];
    atual += c;
    fim = fins[i];
  }
  if (atual) palavras.push({ texto: atual, inicio: ini, fim });
  return palavras;
}

export function normalizarHex(cor: string | undefined, padrao: string): string {
  if (!cor) return padrao;
  let c = cor.trim();
  if (!c.startsWith('#')) c = '#' + c;
  if (/^#[0-9a-fA-F]{3}$/.test(c)) c = '#' + c.slice(1).split('').map((x) => x + x).join('');
  return /^#[0-9a-fA-F]{6}$/.test(c) ? c.toUpperCase() : padrao;
}

function luminancia(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contraste(a: string, b: string): number {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

export function corLegivelSobre(fundo: string): string {
  return luminancia(fundo) > 0.45 ? '#14161F' : '#FFFFFF';
}

function paletaSegura(p: RoteiroIA['paleta']): Paleta {
  const fundo = normalizarHex(p.fundo, '#F6F7FB');
  let texto = normalizarHex(p.texto, '#14161F');
  if (contraste(fundo, texto) < 4.5) texto = corLegivelSobre(fundo);
  const primaria = normalizarHex(p.primaria, '#2F6BFF');
  const destaque = normalizarHex(p.destaque, '#FF5A36');
  return { fundo, texto, primaria, destaque };
}

/* ------------------------------------------------------------------ efeitos sonoros automáticos */

function sonsDaCena(c: CenaIA, marca: number, fps: number, entrada: number, sfxBase: string): SomPosicionado[] {
  const s = (nome: string, em: number, volume = 0.6): SomPosicionado => ({ nome, src: `${sfxBase}${nome}.wav`, em: Math.max(0, Math.round(em)), volume });
  const sons: SomPosicionado[] = [];
  if (c.transicao === 'deslizar' || c.transicao === 'empurrar' || c.transicao === 'zoom' || c.transicao === 'limpar') {
    sons.push(s('transicao', 0, 0.32));
  }
  if (c.efeito === 'nenhum') return sons;
  if (c.efeito !== 'auto') {
    sons.push(s(c.efeito, marca, c.efeito === 'impacto' ? 0.7 : 0.6));
    return sons;
  }
  switch (c.layout) {
    case 'abertura': sons.push(s('whoosh', entrada, 0.45), s('pop', marca + 4, 0.5)); break;
    case 'texto': sons.push(s('pop', marca, 0.4)); break;
    case 'texto-imagem': case 'personagem': case 'produto': sons.push(s('pop', marca, 0.6)); if (c.selo) sons.push(s('brilho', marca + fps * 0.6, 0.35)); break;
    case 'numero': sons.push(s('digitar', marca, 0.25), s('ding', marca + Math.round(fps * 1.0), 0.55)); break;
    case 'celular': sons.push(s('subida', marca, 0.45), s('clique', marca + Math.round(fps * 0.9), 0.5)); break;
    case 'lista': (c.itens ?? []).slice(0, 4).forEach((_, i) => sons.push(s('pop', marca + Math.round(fps * 0.35) * (i + 1), 0.35))); break;
    case 'comparacao': sons.push(s('whoosh', marca, 0.4), s('pop', marca + Math.round(fps * 0.6), 0.5)); break;
    case 'impacto': sons.push(s('impacto', marca, 0.7)); break;
    case 'foto': sons.push(s('whoosh', entrada, 0.35)); break;
    case 'cta': sons.push(s('sucesso', marca, 0.55)); break;
    case 'ascii': sons.push(s('digitar', entrada, 0.3), s('brilho', marca + Math.round(fps * 1.4), 0.35)); break;
  }
  return sons;
}

/* ------------------------------------------------------------------ montagem */

export function montarVideo(e: EntradaLinhaDoTempo): VideoSpec {
  const fps = e.fps ?? 30;
  const { largura, altura } = FORMATOS[e.formato];
  const cenasIA = e.roteiro.cenas;
  const cenas: CenaRender[] = [];

  cenasIA.forEach((c, i) => {
    const transicao: Transicao = i === 0 ? 'corte' : c.transicao;
    const entrada = FRAMES_TRANSICAO[transicao];
    const proxima = cenasIA[i + 1];
    const saida = proxima ? FRAMES_TRANSICAO[proxima.transicao] : 0;
    const audio = e.audios[i];
    const temFala = !!(audio && audio.duracao > 0 && c.narracao.trim());
    const atrasoFala = entrada + 3; // a voz começa quando a transição termina
    const minimo = Math.round((c.duracaoMinima ?? DURACAO_PADRAO[c.layout]) * fps);
    const comFala = temFala ? atrasoFala + Math.round(audio!.duracao * fps) + Math.round(0.35 * fps) : 0;
    const extraFinal = !proxima ? Math.round(0.8 * fps) : 0; // respiro no fim do vídeo
    const duracao = Math.max(minimo + entrada, comFala) + saida + extraFinal;

    const palavras: Palavra[] = temFala
      ? audio!.palavras.map((p) => ({ texto: p.texto, inicio: atrasoFala + Math.round(p.inicio * fps), fim: atrasoFala + Math.round(p.fim * fps) }))
      : [];

    // momento do elemento principal: palavra sincronizada ou logo após a entrada
    let marca = entrada + 5;
    if (c.sincronizarCom && palavras.length) {
      const alvo = limparPalavra(c.sincronizarCom.split(/\s+/)[0] ?? '');
      const achada = palavras.find((p) => limparPalavra(p.texto) === alvo) ?? palavras.find((p) => alvo && limparPalavra(p.texto).startsWith(alvo));
      if (achada) marca = Math.max(entrada + 2, achada.inicio - 2);
    }
    marca = Math.min(marca, Math.max(entrada + 2, duracao - saida - Math.round(fps * 1.2)));

    const img = e.imagens[i];
    let imagem: CenaRender['imagem'] = null;
    if (img) imagem = img;
    else if (c.imagem.fonte === 'mascote') {
      imagem = { tipo: 'mascote', expressao: c.imagem.expressao ?? 'feliz' };
    }

    cenas.push({
      id: `cena-${i + 1}`,
      layout: c.layout,
      titulo: c.titulo?.trim() || null,
      destaques: c.destaques ?? [],
      subtitulo: c.subtitulo?.trim() || null,
      numero: c.numero,
      itens: c.itens?.filter(Boolean).slice(0, 4) ?? null,
      selo: c.selo?.trim() || null,
      fundo: c.fundo === 'foto' && !(img && (img.tipo === 'foto' || img.tipo === 'video')) ? 'claro' : c.fundo,
      animacaoTexto: c.animacaoTexto,
      animacaoImagem: c.animacaoImagem,
      transicao,
      transicaoFrames: entrada,
      duracao,
      imagem,
      narracao: temFala ? { src: audio!.src, inicio: atrasoFala, duracao: Math.round(audio!.duracao * fps), texto: c.narracao } : null,
      palavras,
      marca,
      sons: sonsDaCena(c, marca, fps, entrada, e.sfxBase),
    });
  });

  const duracaoTotal = cenas.reduce((acc, c, i) => acc + c.duracao - (i > 0 ? c.transicaoFrames : 0), 0);
  const clima = e.roteiro.musica.clima;

  return {
    versao: 1,
    titulo: e.roteiro.titulo,
    formato: e.formato,
    largura,
    altura,
    fps,
    duracaoTotal,
    estilo: e.roteiro.estilo,
    paleta: paletaSegura(e.roteiro.paleta),
    legendas: e.roteiro.legendas,
    marca: { nome: e.marca.nome ?? null, logo: e.logoSrc, contato: e.marca.contato ?? {} },
    cenas,
    musica: clima === 'nenhuma' || !e.musicaSrc ? null : { src: e.musicaSrc, volume: 0.32, volumeComVoz: 0.11 },
  };
}

/** Início absoluto (frame) de cada cena, considerando as transições sobrepostas. */
export function iniciosDasCenas(spec: VideoSpec): number[] {
  const inicios: number[] = [];
  let t = 0;
  spec.cenas.forEach((c, i) => {
    if (i > 0) t -= c.transicaoFrames;
    inicios.push(t);
    t += c.duracao;
  });
  return inicios;
}

/** Intervalos absolutos com voz (para abaixar a música). */
export function intervalosDeVoz(spec: VideoSpec): [number, number][] {
  const inicios = iniciosDasCenas(spec);
  return spec.cenas
    .map((c, i) => (c.narracao ? [inicios[i] + c.narracao.inicio, inicios[i] + c.narracao.inicio + c.narracao.duracao] as [number, number] : null))
    .filter((x): x is [number, number] => !!x);
}
