/* ============================================
   CONFIGURAÇÃO DO SITE — Éberson Ávila
   Edite apenas este arquivo para atualizar
   fotos, WhatsApp, redes sociais e a agenda.
   ============================================ */

const SITE_CONFIG = {

  // ---------- WHATSAPP ----------
  // Número no formato internacional, só dígitos (55 + DDD + número)
  whatsapp: {
    numero: "5581900000000",
    mensagemPadrao: "Olá, Éberson! Vi seu site e quero saber sobre valores e disponibilidade para um show."
  },

  // ---------- REDES SOCIAIS (rodapé) ----------
  redesSociais: [
    { nome: "Instagram", url: "https://instagram.com/ebersonavila" },
    { nome: "YouTube", url: "https://youtube.com/@ebersonavila" }
  ],

  // ---------- GOOGLE AGENDA ----------
  // Passo a passo completo no README.md
  googleAgenda: {
    // ID da agenda pública do Google (Configurações da agenda > Integrar agenda > ID da agenda)
    calendarId: "SEU_CALENDAR_ID@group.calendar.google.com",
    // Chave de API do Google Cloud (Calendar API habilitada, chave restrita ao domínio do site)
    apiKey: "SUA_CHAVE_DE_API_AQUI",
    // Etiqueta que o artista usa no título ou na descrição do evento no Google Agenda
    // Só eventos que contêm essa etiqueta aparecem no site
    etiqueta: "#show",
    // Quantos eventos futuros mostrar
    maxEventos: 8
  },

  // ---------- GALERIA DE FOTOS ----------
  // Para adicionar uma foto nova: acrescente um objeto ao array abaixo
  // e coloque o arquivo de imagem correspondente dentro da pasta /img.
  // Não precisa mexer em HTML nem CSS — a galeria é montada automaticamente.
  fotos: [
    // Exemplo (remova o comentário e ajuste depois de subir as fotos reais):
    { src: "img/show-boa-viagem.jpg", legenda: "Show acústico — Recife, jul/2026" },
    // { src: "img/show-corporativo-01.jpg", legenda: "Evento corporativo — Boa Viagem" },
  ]
};
