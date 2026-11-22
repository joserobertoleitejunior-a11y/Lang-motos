/**
 * Roteiros de demonstração: funcionam sem nenhuma chave de API.
 * - roteiroDemo: propaganda da VIBE CODING PROCESS (música + efeitos, sem voz).
 * - roteiroTeste: passa por todos os layouts, com fala estimada e legendas.
 */
import type { CenaIA, Formato, RoteiroIA } from './spec';
import { estimarDuracaoFala, estimarPalavras, montarVideo, type AudioCena, type ImagemCena } from './linhaDoTempo';

export const SEM_IMAGEM: CenaIA['imagem'] = { fonte: 'nenhuma', referencia: null, descricao: null, personagem: null, recorte: false, expressao: null, animar: false, movimento: null };

export function cena(c: Partial<CenaIA> & Pick<CenaIA, 'layout'>): CenaIA {
  return {
    narracao: '', voz: 'principal', titulo: null, destaques: [], subtitulo: null, numero: null, itens: null, selo: null,
    imagem: SEM_IMAGEM, fundo: 'claro', animacaoTexto: 'pop', animacaoImagem: 'quicar', transicao: 'fade', efeito: 'auto',
    sincronizarCom: null, duracaoMinima: null, ...c,
  };
}


export const roteiroDemo: RoteiroIA = {
  titulo: 'VIBE CODING PROCESS — site para o comércio local',
  ideia: 'Mostrar ao dono de comércio que um site profissional traz clientes todos os dias.',
  estilo: 'moderno',
  paleta: { fundo: '#EEF1F6', texto: '#0B1020', primaria: '#1747FF', destaque: '#FF6A00' },
  musica: { clima: 'energetico', descricao: 'batida forte e moderna, 124 bpm' },
  legendas: false,
  personagens: [],
  cenas: [
    cena({ layout: 'impacto', titulo: 'Seu concorrente já tem site.', destaques: ['site.'], fundo: 'escuro', animacaoTexto: 'subir', duracaoMinima: 2.2 }),
    cena({ layout: 'texto', titulo: 'E você, ainda depende de indicação?', destaques: ['indicação?'], transicao: 'empurrar', animacaoTexto: 'destaque', duracaoMinima: 2.6 }),
    cena({ layout: 'numero', titulo: 'seu site trabalha, vende e atende', destaques: ['vende'], numero: { de: 0, ate: 24, prefixo: '', sufixo: 'h', casas: 0 }, fundo: 'marca', transicao: 'zoom', animacaoTexto: 'subir', duracaoMinima: 3 }),
    cena({ layout: 'celular', titulo: 'Cardápio, catálogo e WhatsApp num toque', destaques: ['WhatsApp'], transicao: 'deslizar', animacaoTexto: 'palavras', duracaoMinima: 3.6 }),
    cena({ layout: 'lista', titulo: 'O que vem no seu site', destaques: ['site'], itens: ['Visual profissional', 'Botão direto do WhatsApp', 'Aparece no Google', 'Painel fácil de usar'], fundo: 'escuro', transicao: 'empurrar', animacaoTexto: 'subir', duracaoMinima: 3.8 }),
    cena({ layout: 'comparacao', titulo: 'Faz toda a diferença', destaques: ['diferença'], itens: ['O cliente procura e não te encontra', 'O cliente te acha e chama no WhatsApp'], transicao: 'limpar', animacaoTexto: 'subir', duracaoMinima: 3.6 }),
    cena({ layout: 'impacto', titulo: 'Mais clientes. Menos esforço.', destaques: ['clientes.'], fundo: 'marca', transicao: 'zoom', duracaoMinima: 1.9 }),
    cena({ layout: 'cta', titulo: 'Peça já o seu site', destaques: ['site'], subtitulo: 'Sites para comércio local', fundo: 'escuro', transicao: 'deslizar', duracaoMinima: 3.8 }),
  ],
  legendaPost: 'Seu comércio merece um site que trabalha por você 24 horas por dia. Fale com a VIBE CODING PROCESS!',
  hashtags: ['#comerciolocal', '#site', '#empreendedorismo', '#vibecoding'],
};

export const roteiroTeste: RoteiroIA = {
  titulo: 'Teste de todos os layouts',
  ideia: 'Padaria de bairro mostrando o cupcake novo.',
  estilo: 'moderno',
  paleta: { fundo: '#FFF8F1', texto: '#22140C', primaria: '#D9480F', destaque: '#2F9E44' },
  musica: { clima: 'tranquilo', descricao: 'lo-fi acústico' },
  legendas: true,
  personagens: [],
  cenas: [
    cena({ layout: 'texto', narracao: 'Sabe aquele cheirinho de pão quentinho?', titulo: 'Cheirinho de pão quentinho', destaques: ['quentinho'], selo: 'Desde 1998', animacaoTexto: 'destaque' }),
    cena({ layout: 'foto', narracao: 'Aqui na esquina, todo dia, desde cedo.', titulo: 'Todo dia, desde cedo', destaques: ['cedo'], fundo: 'foto', imagem: { ...SEM_IMAGEM, fonte: 'referencia', referencia: 'ref1' }, transicao: 'fade' }),
    cena({ layout: 'produto', narracao: 'E agora chegou o cupcake de morango, por só oito e noventa!', titulo: 'Cupcake de morango', destaques: ['morango'], numero: { de: 8.9, ate: 8.9, prefixo: 'R$ ', sufixo: '', casas: 2 }, selo: 'Novo', imagem: { ...SEM_IMAGEM, fonte: 'referencia', referencia: 'ref2', recorte: true }, transicao: 'deslizar', sincronizarCom: 'cupcake' }),
    cena({ layout: 'texto-imagem', narracao: 'Feito com fruta de verdade.', titulo: 'Feito com fruta de verdade', destaques: ['verdade'], imagem: { ...SEM_IMAGEM, fonte: 'referencia', referencia: 'ref2', recorte: true }, animacaoImagem: 'flutuar', transicao: 'empurrar', animacaoTexto: 'palavras' }),
    cena({ layout: 'numero', narracao: 'Já são mais de doze mil vendidos.', titulo: 'cupcakes vendidos', numero: { de: 0, ate: 12000, prefixo: '+', sufixo: '', casas: 0 }, fundo: 'escuro', transicao: 'zoom', sincronizarCom: 'doze' }),
    cena({ layout: 'cta', narracao: 'Peça o seu pelo WhatsApp!', titulo: 'Peça o seu agora', destaques: ['agora'], transicao: 'limpar', animacaoTexto: 'digitar' }),
  ],
  legendaPost: 'Cupcake de morango chegou!',
  hashtags: ['#padaria'],
};

const IMAGENS_TESTE: Record<string, { src: string; tipo: 'foto' | 'recorte' }> = {
  ref1: { src: 'demo/foto-loja.jpg', tipo: 'foto' },
  ref2: { src: 'demo/cupcake.png', tipo: 'recorte' },
};

/** Monta o VideoSpec sem nenhuma IA: fala com tempo estimado (sem áudio) e imagens locais. */
export function montarDemo(roteiro: RoteiroIA, formato: Formato, marca: { nome?: string; contato?: Record<string, string> } = {}) {
  const audios: (AudioCena | null)[] = roteiro.cenas.map((c) => {
    if (!c.narracao.trim()) return null;
    const duracao = estimarDuracaoFala(c.narracao);
    return { src: null, duracao, palavras: estimarPalavras(c.narracao, duracao) };
  });
  const imagens: ImagemCena[] = roteiro.cenas.map((c) => (c.imagem.fonte === 'referencia' && c.imagem.referencia ? IMAGENS_TESTE[c.imagem.referencia] ?? null : null));
  return montarVideo({
    roteiro, formato, audios, imagens,
    musicaSrc: roteiro.musica.clima === 'nenhuma' ? null : `musica/${roteiro.musica.clima}.mp3`,
    logoSrc: null, sfxBase: 'sfx/', marca,
  });
}

export const specDemo = montarDemo(roteiroDemo, '9:16', { nome: 'VIBE CODING PROCESS' });
