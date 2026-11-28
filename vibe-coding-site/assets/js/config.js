/**
 * Dados de contato da Vibe Coding Process: troque aqui e o site inteiro atualiza.
 * whatsapp: só números, com 55 + DDD. instagram: só o @, sem a arroba.
 */
export const CONTATO = {
  whatsapp: '5515996688070',
  whatsappVisivel: '(15) 99668-8070',
  instagram: '',
  cidade: 'Itapetininga · SP',
  responsavel: 'Jose Roberto',
};

export function linkWhatsApp(texto = '') {
  if (!CONTATO.whatsapp) return null;
  return `https://wa.me/${CONTATO.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;
}

export function linkInstagram() {
  return CONTATO.instagram ? `https://instagram.com/${CONTATO.instagram}` : null;
}
