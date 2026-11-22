/**
 * Diretor "offline": monta um roteiro simples a partir do texto do pedido,
 * sem IA. Serve para testar o app antes de configurar a chave do Claude.
 */
import type { CenaIA, Layout, Pedido, Referencia, RoteiroIA } from '../../shared/spec';
import { normalizarHex } from '../../shared/linhaDoTempo';
import { cena, SEM_IMAGEM } from '../../shared/demo';
import type { Marca } from '../armazenamento';

function titulo(frase: string): string {
  const limpa = frase.replace(/[.!?;:]+$/, '').trim();
  const palavras = limpa.split(/\s+/);
  if (palavras.length <= 8) return limpa;
  const virgula = limpa.indexOf(',');
  if (virgula > 0 && limpa.slice(0, virgula).split(/\s+/).length <= 8) return limpa.slice(0, virgula);
  return palavras.slice(0, 7).join(' ');
}

function destaque(t: string): string[] {
  const p = t.split(/\s+/).filter((w) => w.replace(/[^\p{L}]/gu, '').length >= 5);
  if (!p.length) return [];
  return [p.reduce((a, b) => (b.length > a.length ? b : a))];
}

export function roteiroLocal(pedido: Pedido, marca: Marca | null, refs: Referencia[]): RoteiroIA {
  const frases = pedido.briefing.replace(/\r/g, '').split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter((s) => s.length > 3).slice(0, 7);
  if (!frases.length) frases.push(marca ? `Conheça a ${marca.nome}` : 'Conheça o nosso negócio');
  const comVoz = pedido.narracao === 'sim';
  const fila = [...refs];
  const proximaRef = () => fila.shift() ?? null;
  const preco = /R\$\s?(\d{1,5}(?:[.,]\d{2})?)/i.exec(pedido.briefing);
  const cenas: CenaIA[] = [];

  const r1 = proximaRef();
  cenas.push(cena({
    layout: 'abertura', titulo: titulo(frases[0]), destaques: destaque(titulo(frases[0])), narracao: comVoz ? frases[0] : '',
    imagem: r1 ? { ...SEM_IMAGEM, fonte: 'referencia', referencia: r1.id } : SEM_IMAGEM,
    duracaoMinima: comVoz ? null : 2.6,
  }));

  const ciclo: Layout[] = ['texto-imagem', 'texto', 'foto', 'impacto'];
  frases.slice(1, 5).forEach((f, i) => {
    let layout = ciclo[i % ciclo.length];
    const t = titulo(f);
    let imagem: CenaIA['imagem'] = SEM_IMAGEM;
    if (layout === 'texto-imagem' || layout === 'foto') {
      const r = proximaRef();
      if (r) imagem = { ...SEM_IMAGEM, fonte: 'referencia', referencia: r.id };
      else layout = 'texto';
    }
    if (layout === 'impacto' && t.split(/\s+/).length > 4) layout = 'texto';
    cenas.push(cena({
      layout, titulo: t, destaques: destaque(t), narracao: comVoz ? f : '', imagem,
      fundo: layout === 'foto' ? 'foto' : layout === 'impacto' ? 'marca' : i % 2 ? 'escuro' : 'claro',
      transicao: (['deslizar', 'fade', 'empurrar', 'zoom'] as const)[i % 4],
      animacaoTexto: (['palavras', 'subir', 'destaque', 'pop'] as const)[i % 4],
      duracaoMinima: comVoz ? null : 2.8,
    }));
  });

  if (preco) {
    const valor = Number(preco[1].replace('.', '').replace(',', '.'));
    const r = proximaRef();
    cenas.push(cena({
      layout: 'produto', titulo: 'Por apenas', narracao: comVoz ? `Por apenas ${preco[0]}.` : '',
      numero: { de: valor, ate: valor, prefixo: 'R$ ', sufixo: '', casas: preco[1].includes(',') || preco[1].includes('.') ? 2 : 0 },
      imagem: r ? { ...SEM_IMAGEM, fonte: 'referencia', referencia: r.id } : SEM_IMAGEM,
      transicao: 'deslizar', duracaoMinima: comVoz ? null : 3,
    }));
  }

  const zap = marca?.contato.whatsapp;
  cenas.push(cena({
    layout: 'cta', titulo: zap ? 'Chame no WhatsApp' : 'Venha conhecer', destaques: [zap ? 'WhatsApp' : 'conhecer'],
    narracao: comVoz ? (zap ? 'Chame a gente no WhatsApp!' : 'Venha conhecer!') : '', transicao: 'limpar', duracaoMinima: comVoz ? null : 3.6,
  }));

  const cores = marca?.cores ?? [];
  return {
    titulo: marca ? `${marca.nome} — vídeo` : titulo(frases[0]),
    ideia: frases[0],
    estilo: pedido.estilo === 'auto' ? 'moderno' : pedido.estilo,
    paleta: { fundo: '#F7F7FB', texto: '#16161D', primaria: normalizarHex(cores[0], '#5B3DF5'), destaque: normalizarHex(cores[1], '#FF7A2F') },
    musica: { clima: pedido.musica === 'auto' ? 'alegre' : pedido.musica, descricao: 'trilha alegre e leve' },
    legendas: comVoz && pedido.legendas !== 'nao',
    personagens: [],
    cenas,
    legendaPost: `${frases[0]}${marca ? ` — ${marca.nome}` : ''}`,
    hashtags: ['#comerciolocal'],
  };
}
