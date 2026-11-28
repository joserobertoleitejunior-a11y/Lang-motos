/**
 * Portfólio da Vibe Coding Process.
 * url: null = o projeto aparece com "link em breve" até alguém colocar o endereço.
 * mostrar: false = some do site (use enquanto o cliente não autorizar).
 */
export const PROJETOS = [
  {
    id: 'pizza-em-dobro', nome: 'Pizza em Dobro', segmento: 'Alimentação', cidade: 'Itapetininga',
    resumo: 'Pizzaria com pedido pelo site, cardápio, caixa e painel da equipe.',
    feito: ['Site', 'Pedidos', 'Caixa', 'Painel'],
    url: 'https://pizzaria-pizza-em-dobro.com.br/', imagem: 'pizza-em-dobro', grupo: 'alimentacao', mostrar: true,
  },
  {
    id: 'rafael-cabeleireiros', nome: 'Rafael Cabeleireiros', segmento: 'Beleza', cidade: 'Itapetininga',
    resumo: 'Barbearia e salão com agendamento por profissional, caixa e galeria.',
    feito: ['Site', 'Agenda online', 'Caixa'],
    url: 'https://joserobertoleitejunior-a11y.github.io/rafael-cabeleireiros-/', imagem: 'rafael-cabeleireiros', grupo: 'beleza', mostrar: true,
  },
  {
    id: 'imperio-do-eps', nome: 'Império do EPS', segmento: 'Indústria', cidade: 'Itapetininga',
    resumo: 'Fábrica do Blocão com calculadora de obra, peça em 3D e orçamento no WhatsApp.',
    feito: ['Site', 'Calculadora', '3D', 'Vídeos'],
    url: 'https://humberto-imperio-dos-eps.netlify.app/', imagem: 'imperio-do-eps', grupo: 'industria', mostrar: true,
  },
  {
    id: 'nova-era', nome: 'Nova Era', segmento: 'Indústria', cidade: 'Itapetininga',
    resumo: 'Pré-moldados e concreto, com app de conferência de carga para a expedição.',
    feito: ['Site', 'App interno', 'Rastreio'],
    url: 'https://joserobertoleitejunior-a11y.github.io/NOVA-ERA-/', imagem: 'nova-era', grupo: 'industria', mostrar: true,
  },
  {
    id: 'auto-posto-miquira', nome: 'Auto Posto Miquira III', segmento: 'Serviços', cidade: 'Itapetininga',
    resumo: 'Posto com assistente de IA que tira dúvidas e agenda troca de óleo.',
    feito: ['Site', 'Assistente IA', 'Agenda'],
    url: null, imagem: 'auto-posto-miquira', grupo: 'servicos', mostrar: true,
  },
  {
    id: 'comercial-av5', nome: 'Comercial Av 5', segmento: 'Comércio', cidade: 'Itapetininga',
    resumo: 'Materiais de construção com vitrine de produtos e orçamento direto no WhatsApp.',
    feito: ['Site', 'Orçamento', 'Métricas'],
    url: null, imagem: 'comercial-av5', grupo: 'comercio', mostrar: true,
  },
  {
    id: 'san-comercio', nome: 'San Comércio', segmento: 'Comércio', cidade: 'Itapetininga',
    resumo: 'Mangueiras e conexões com catálogo de quase 9 mil itens e pedido rápido.',
    feito: ['Site', 'Catálogo', 'Mapa'],
    url: 'https://joserobertoleitejunior-a11y.github.io/San-comercio/', imagem: 'san-comercio', grupo: 'comercio', mostrar: true,
  },
  {
    id: 'remop', nome: 'Remop Retífica', segmento: 'Serviços', cidade: 'Itapetininga',
    resumo: 'Retífica de motores com serviços, orçamento e atendimento guiado.',
    feito: ['Site', 'Orçamento'],
    url: 'https://joserobertoleitejunior-a11y.github.io/remop-retifica/', imagem: 'remop-retifica', grupo: 'servicos', mostrar: true,
  },
  {
    id: 'lang-motos', nome: 'Lang Motos', segmento: 'Serviços', cidade: 'Itapetininga',
    resumo: 'Oficina e loja de motos desde 1997, com serviços, peças e contato rápido.',
    feito: ['Site', 'Mapa', 'WhatsApp'],
    url: 'https://joserobertoleitejunior-a11y.github.io/lang-motos/', imagem: 'lang-motos', grupo: 'servicos', mostrar: true,
  },
  {
    id: 'matriz', nome: 'Matriz', segmento: 'Plataforma VCP', cidade: 'Itapetininga',
    resumo: 'Um app só para agendar, pedir delivery e chamar profissionais da cidade.',
    feito: ['Plataforma', 'Agenda', 'Delivery', 'IA'],
    url: 'https://vb-espaco.joserobertoleitejunior.workers.dev/', imagem: 'matriz', grupo: 'plataforma', mostrar: true,
  },
  {
    id: 'confere-ai', nome: 'Confere Aí', segmento: 'Plataforma VCP', cidade: 'Em desenvolvimento',
    resumo: 'Sistema de gestão para comércio: PDV, estoque, financeiro e delivery num lugar só.',
    feito: ['PDV', 'Estoque', 'Financeiro'],
    url: null, imagem: 'confere-ai', grupo: 'plataforma', mostrar: true,
  },
];

export const GRUPOS = [
  { id: 'todos', nome: 'Todos' },
  { id: 'comercio', nome: 'Comércio' },
  { id: 'alimentacao', nome: 'Alimentação' },
  { id: 'beleza', nome: 'Beleza' },
  { id: 'servicos', nome: 'Serviços' },
  { id: 'industria', nome: 'Indústria' },
  { id: 'plataforma', nome: 'Plataformas VCP' },
];
