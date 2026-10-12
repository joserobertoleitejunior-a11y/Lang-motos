/**
 * Configuração central do site Lang Motos.
 * Único lugar a editar quando WhatsApp, telefone, horário ou links mudarem.
 * Tudo que é dado do negócio mora aqui — HTML e JS só leem.
 */
window.LANG_CONFIG = {
  // Fonte: bio do Instagram @lang_motos (wa.me/5515998106057) + letreiro
  // da fachada. Telefone fixo confirmado no letreiro, no Guia Mais
  // Prático e em diretórios (Apontador, SoluTudo).
  whatsappNumero: "5515998106057",
  whatsappExibicao: "(15) 99810-6057",
  telefoneFixo: "(15) 3271-9398",
  telefoneLink: "tel:+551532719398",
  whatsappMensagemPadrao:
    "Olá! Vim pelo site da Lang Motos e gostaria de um atendimento.",

  enderecoCompleto:
    "Av. Cinco de Novembro, 825 — Vila Nastri, Itapetininga - SP, 18207-320",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Lang+Motos+Av.+Cinco+de+Novembro+825+Vila+Nastri+Itapetininga+SP",
  wazeLink:
    "https://waze.com/ul?q=Av.%20Cinco%20de%20Novembro%20825%20Itapetininga%20SP&navigate=yes",
  instagram: "https://www.instagram.com/lang_motos/",

  // Horário de atendimento — usado no selo "Aberto agora / Fechado" e na
  // tabela da página de Localização. Chave = dia da semana (0 = domingo).
  // ATENÇÃO: seg–sex 9h–18h veio do Apontador; sábado ainda NÃO foi
  // confirmado com o cliente. Confirmar antes de publicar em produção.
  horario: {
    0: null,
    1: ["09:00", "18:00"],
    2: ["09:00", "18:00"],
    3: ["09:00", "18:00"],
    4: ["09:00", "18:00"],
    5: ["09:00", "18:00"],
    6: null,
  },
  horarioObservacao: "Sábado: consulte pelo WhatsApp.",

  // Banco da Lang Motos (Supabase, projeto exclusivo). A chave "anon" é PÚBLICA por
  // desenho: a segurança está nas regras de linha (RLS) do banco, que só permitem ao
  // visitante ENVIAR um lead/evento e nunca ler nada. Nunca colocar aqui a service_role.
  supabase: {
    url: "https://uuguxeijrbpwxcvgiakq.supabase.co",
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1Z3V4ZWlqcmJwd3hjdmdpYWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4MjI1MzEsImV4cCI6MjEwNzM5ODUzMX0.ZNuOsaTZSOcV_YWZ-hZC54J9i6155FWsLaZ3_nz0rrk",
  },
  fusoHorario: "America/Sao_Paulo",
};
