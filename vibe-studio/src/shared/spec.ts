/**
 * Contrato do vídeo.
 *
 * Duas camadas:
 *  - RoteiroIA: o que o "Diretor" (Claude) escreve. Alto nível, poucas escolhas
 *    e todas com nome em português, para a IA errar pouco.
 *  - VideoSpec: o roteiro já resolvido para o render (tempos em frames, arquivos
 *    de imagem/voz/música, efeitos sonoros posicionados). Quem monta é a
 *    linha do tempo (linhaDoTempo.ts); quem desenha é o Remotion (src/video).
 */
import * as z from 'zod/v4';

/* ------------------------------------------------------------------ catálogos */

export const LAYOUTS = [
  'abertura', 'texto', 'texto-imagem', 'personagem', 'numero', 'celular',
  'lista', 'produto', 'comparacao', 'impacto', 'foto', 'cta', 'ascii',
] as const;
export type Layout = (typeof LAYOUTS)[number];

/** Explicação de cada layout — vai no prompt do Diretor. */
export const DESCRICAO_LAYOUT: Record<Layout, string> = {
  abertura: 'Gancho do início: título curto e forte, entra com impacto. Pode ter uma imagem pequena.',
  texto: 'Só texto: título (e subtítulo opcional) no centro.',
  'texto-imagem': 'Título no alto e uma imagem/personagem grande embaixo (no horizontal fica lado a lado).',
  personagem: 'Personagem ou objeto no centro, com uma frase curta (título) acima, como um balão.',
  numero: 'Número grande que conta até o valor (preço, economia, quantidade). Use o campo numero; o título vira o rótulo.',
  celular: 'Um celular mostrando uma imagem/tela, com título acima. Bom para app, Instagram, WhatsApp, cardápio.',
  lista: 'Título + 2 a 4 itens curtos que entram um por um com um check.',
  produto: 'Foto do produto em destaque, com nome (título) e preço (numero) ou selo.',
  comparacao: 'Antes x depois: itens[0] = antes, itens[1] = depois. Use imagem para o "depois" se quiser.',
  impacto: 'Tela inteira na cor da marca com 1 a 3 palavras gigantes. Para viradas e frases de efeito.',
  foto: 'Foto ou arte em tela cheia, com movimento de câmera e o título por cima.',
  cta: 'Encerramento: logo, chamada (título) e contato. Sempre a última cena.',
  ascii: 'Estilo "código virando imagem": a foto vira arte de caracteres animada, com o código aparecendo embaixo. Exige imagem (foto ou recorte). O título vira a linha de dados no topo. Ótimo para tecnologia, marca da agência e abertura diferente.',
};

export const ESTILOS = ['fofo-3d', 'moderno', 'impacto', 'elegante', 'minimalista', 'codigo'] as const;
export type Estilo = (typeof ESTILOS)[number];

export const CLIMAS = ['alegre', 'tranquilo', 'energetico', 'elegante', 'nenhuma'] as const;
export type Clima = (typeof CLIMAS)[number];

export const FUNDOS = ['claro', 'escuro', 'marca', 'destaque', 'foto'] as const;
export const ANIM_TEXTO = ['pop', 'subir', 'palavras', 'digitar', 'destaque'] as const;
export const ANIM_IMAGEM = ['quicar', 'deslizar', 'zoom', 'flutuar'] as const;
export const TRANSICOES = ['corte', 'fade', 'deslizar', 'empurrar', 'limpar', 'zoom'] as const;
export const EFEITOS = ['auto', 'nenhum', 'pop', 'whoosh', 'ding', 'impacto', 'brilho', 'sucesso', 'digitar', 'clique', 'subida'] as const;
export const EXPRESSOES = ['feliz', 'surpreso', 'piscando', 'preocupado', 'apaixonado', 'bravo'] as const;

export type Fundo = (typeof FUNDOS)[number];
export type AnimTexto = (typeof ANIM_TEXTO)[number];
export type AnimImagem = (typeof ANIM_IMAGEM)[number];
export type Transicao = (typeof TRANSICOES)[number];
export type Efeito = (typeof EFEITOS)[number];
export type Expressao = (typeof EXPRESSOES)[number];

export const FORMATOS = {
  '9:16': { largura: 1080, altura: 1920, nome: 'Vertical (Reels, TikTok, Shorts, Status)' },
  '4:5': { largura: 1080, altura: 1350, nome: 'Retrato (feed do Instagram)' },
  '1:1': { largura: 1080, altura: 1080, nome: 'Quadrado' },
  '16:9': { largura: 1920, altura: 1080, nome: 'Horizontal (YouTube, TV)' },
} as const;
export type Formato = keyof typeof FORMATOS;

/* ------------------------------------------------------------------ RoteiroIA (saída do Diretor) */

export const ImagemIA = z.object({
  fonte: z.enum(['referencia', 'editar', 'gerar', 'mascote', 'nenhuma'])
    .describe('referencia = usar uma foto enviada como está; editar = usar uma foto enviada e alterá-la com IA conforme a descricao (trocar fundo, cenário, luz); gerar = criar uma imagem nova com IA; mascote = usar o mascote desenhado do app; nenhuma = sem imagem'),
  referencia: z.string().nullable().describe('id da foto enviada (ref1, ref2...) quando fonte = referencia ou editar; senão null'),
  descricao: z.string().nullable().describe('quando fonte = gerar: descrição visual completa da imagem; quando fonte = editar: o que mudar na foto. Em português, sem texto escrito dentro da imagem. Senão null'),
  personagem: z.string().nullable().describe('id de um personagem da lista "personagens" quando a imagem mostra esse personagem; senão null'),
  recorte: z.boolean().describe('true = objeto ou personagem recortado, sem fundo (PNG); false = foto/cena com fundo'),
  expressao: z.enum(EXPRESSOES).nullable().describe('expressão do personagem ou do mascote; null se não se aplica'),
  animar: z.boolean().describe('true = transformar esta imagem num clipe de vídeo curto com IA de vídeo (caro: use só nas cenas mais importantes e só se permitido no pedido)'),
  movimento: z.string().nullable().describe('quando animar = true: o movimento do clipe em português (ex.: "a câmera se aproxima devagar enquanto o vapor sobe do café"); senão null'),
});
export type ImagemIA = z.infer<typeof ImagemIA>;

export const NumeroIA = z.object({
  de: z.number().describe('valor inicial da contagem (normalmente 0)'),
  ate: z.number().describe('valor final'),
  prefixo: z.string().describe('ex.: "R$ " ou ""'),
  sufixo: z.string().describe('ex.: "%", " mil", "kg" ou ""'),
  casas: z.number().int().describe('casas decimais (0 a 2)'),
});

export const CenaIA = z.object({
  layout: z.enum(LAYOUTS),
  narracao: z.string().describe('O que a voz fala nesta cena, em português do Brasil, natural e falado. Frases curtas. String vazia se a cena não tem fala.'),
  voz: z.enum(['principal', 'secundaria']).describe('Quem fala: principal ou secundaria (use secundaria só em diálogo).'),
  titulo: z.string().nullable().describe('Texto principal na tela. Curto: no máximo ~7 palavras. Não repita a narração inteira.'),
  destaques: z.array(z.string()).describe('Palavras do título que ganham a cor de destaque (copie exatamente como no título). Pode ser vazio.'),
  subtitulo: z.string().nullable().describe('Linha de apoio curta, ou null.'),
  numero: NumeroIA.nullable().describe('Só para layouts numero/produto; senão null.'),
  itens: z.array(z.string()).nullable().describe('Itens para lista (2 a 4, curtos) ou comparacao (antes, depois); senão null.'),
  selo: z.string().nullable().describe('Etiqueta curta (ex.: "Novo", "-20%", "Grátis"), ou null.'),
  imagem: ImagemIA,
  fundo: z.enum(FUNDOS).describe('claro, escuro, marca (cor primária), destaque, ou foto (a imagem vira o fundo)'),
  animacaoTexto: z.enum(ANIM_TEXTO),
  animacaoImagem: z.enum(ANIM_IMAGEM),
  transicao: z.enum(TRANSICOES).describe('Como esta cena entra (a primeira cena ignora).'),
  efeito: z.enum(EFEITOS).describe('Efeito sonoro principal. auto = o app escolhe.'),
  sincronizarCom: z.string().nullable().describe('Palavra exata da narração em que o elemento principal (número, imagem ou destaque) deve aparecer; null = logo no começo.'),
  duracaoMinima: z.number().nullable().describe('Segundos mínimos na tela quando não há narração; null = automático.'),
});
export type CenaIA = z.infer<typeof CenaIA>;

export const RoteiroIA = z.object({
  titulo: z.string().describe('Nome interno do vídeo'),
  ideia: z.string().describe('A ideia central em uma frase'),
  estilo: z.enum(ESTILOS),
  paleta: z.object({
    fundo: z.string().describe('cor de fundo clara em hex, ex.: #F6F7FB'),
    texto: z.string().describe('cor do texto em hex, ex.: #14161F'),
    primaria: z.string().describe('cor principal da marca em hex'),
    destaque: z.string().describe('cor de destaque em hex (contrasta com a primária)'),
  }),
  musica: z.object({
    clima: z.enum(CLIMAS),
    descricao: z.string().describe('descrição da trilha ideal (gênero, instrumentos, ritmo) para uma IA de música'),
  }),
  legendas: z.boolean().describe('true para mostrar legendas palavra por palavra da narração'),
  personagens: z.array(z.object({
    id: z.string(),
    nome: z.string(),
    descricao: z.string().describe('aparência fixa do personagem para manter igual em todas as imagens'),
  })),
  cenas: z.array(CenaIA),
  legendaPost: z.string().describe('Legenda pronta para o post no Instagram/TikTok (português, com chamada para ação)'),
  hashtags: z.array(z.string()),
});
export type RoteiroIA = z.infer<typeof RoteiroIA>;

/* ------------------------------------------------------------------ Pedido (o que o usuário envia) */

export type VozConfig = {
  provedor: 'elevenlabs' | 'gemini';
  vozId: string;
  nome: string;
};

export type Referencia = {
  id: string; // ref1, ref2...
  arquivo: string; // nome do arquivo dentro da pasta do projeto
  descricao?: string;
};

export type Qualidade = 'economico' | 'padrao' | 'cinema';
export const ORCAMENTO: Record<Qualidade, { imagens: number; clipes: number; nome: string; descricao: string }> = {
  economico: { imagens: 0, clipes: 0, nome: 'Econômico', descricao: 'Usa só as suas fotos e o mascote. Quase sem custo de imagem.' },
  padrao: { imagens: 4, clipes: 0, nome: 'Padrão', descricao: 'Até 4 imagens criadas por IA.' },
  cinema: { imagens: 6, clipes: 2, nome: 'Cinema', descricao: 'Até 6 imagens por IA e 2 cenas viram vídeo animado.' },
};

export type Pedido = {
  briefing: string;
  formato: Formato;
  duracao: number; // segundos (alvo)
  estilo: Estilo | 'auto';
  musica: Clima | 'auto';
  legendas: 'auto' | 'sim' | 'nao';
  narracao: 'sim' | 'nao';
  vozPrincipal: VozConfig | null;
  vozSecundaria: VozConfig | null;
  marcaId: string | null;
  qualidade: Qualidade;
  revisar: boolean;
};

/* ------------------------------------------------------------------ VideoSpec (entrada do render) */

export type Paleta = { fundo: string; texto: string; primaria: string; destaque: string };

export type Palavra = { texto: string; inicio: number; fim: number }; // frames relativos à cena

export type SomPosicionado = { nome: string; src: string; em: number; volume: number };

export type CenaRender = {
  id: string;
  layout: Layout;
  titulo: string | null;
  destaques: string[];
  subtitulo: string | null;
  numero: z.infer<typeof NumeroIA> | null;
  itens: string[] | null;
  selo: string | null;
  fundo: Fundo;
  animacaoTexto: AnimTexto;
  animacaoImagem: AnimImagem;
  transicao: Transicao;
  /** frames de sobreposição com a cena anterior (0 = corte seco) */
  transicaoFrames: number;
  duracao: number; // frames
  imagem: { src: string; tipo: 'recorte' | 'foto' | 'video' } | { tipo: 'mascote'; expressao: Expressao } | null;
  narracao: { src: string | null; inicio: number; duracao: number; texto: string } | null;
  palavras: Palavra[];
  /** frame (relativo à cena) em que o elemento principal aparece */
  marca: number;
  sons: SomPosicionado[];
};

export type VideoSpec = {
  versao: 1;
  titulo: string;
  formato: Formato;
  largura: number;
  altura: number;
  fps: number;
  duracaoTotal: number; // frames
  estilo: Estilo;
  paleta: Paleta;
  legendas: boolean;
  marca: {
    nome: string | null;
    logo: string | null;
    contato: { whatsapp?: string; instagram?: string; site?: string; endereco?: string };
  };
  cenas: CenaRender[];
  musica: { src: string; volume: number; volumeComVoz: number } | null;
};
