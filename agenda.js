/* ============================================
   AGENDA DE SHOWS — sincronizada com Google Agenda
   Busca eventos públicos via Google Calendar API e
   mostra apenas os que contêm a etiqueta configurada
   (título ou descrição) em js/config.js.
   Passo a passo de configuração: veja o README.md.
   ============================================ */
(function () {
  const lista = document.getElementById("agendaLista");
  const status = document.getElementById("agendaStatus");
  const cfg = (window.SITE_CONFIG && SITE_CONFIG.googleAgenda) || {};

  if (!lista) return;

  const MESES = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];

  const configuracaoPendente =
    !cfg.calendarId || cfg.calendarId.includes("SEU_CALENDAR_ID") ||
    !cfg.apiKey || cfg.apiKey.includes("SUA_CHAVE");

  if (configuracaoPendente) {
    mostrarSetupPendente();
    return;
  }

  buscarEventos();

  async function buscarEventos() {
    status.textContent = "Carregando agenda…";

    const agora = new Date().toISOString();
    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(cfg.calendarId)}/events`);
    url.searchParams.set("key", cfg.apiKey);
    url.searchParams.set("timeMin", agora);
    url.searchParams.set("singleEvents", "true");
    url.searchParams.set("orderBy", "startTime");
    url.searchParams.set("maxResults", "50");

    try {
      const resp = await fetch(url.toString());
      if (!resp.ok) throw new Error(`Erro ${resp.status} ao consultar o Google Agenda`);
      const data = await resp.json();

      const etiqueta = (cfg.etiqueta || "#show").toLowerCase();
      const eventos = (data.items || [])
        .filter((ev) => {
          const texto = `${ev.summary || ""} ${ev.description || ""}`.toLowerCase();
          return texto.includes(etiqueta);
        })
        .slice(0, cfg.maxEventos || 8);

      if (eventos.length === 0) {
        status.textContent = "";
        lista.innerHTML = `<li class="agenda-vazia">Nenhum show marcado no momento. Volte em breve ou confira o WhatsApp para novidades.</li>`;
        return;
      }

      status.textContent = `${eventos.length} show${eventos.length > 1 ? "s" : ""} confirmado${eventos.length > 1 ? "s" : ""}`;
      lista.innerHTML = eventos.map(renderEvento).join("");
    } catch (err) {
      console.error("Falha ao buscar a agenda do Google:", err);
      status.textContent = "";
      lista.innerHTML = `<li class="agenda-erro">Não foi possível carregar a agenda agora. Tente novamente mais tarde ou fale direto pelo WhatsApp.</li>`;
    }
  }

  function renderEvento(ev) {
    const inicio = ev.start.dateTime || ev.start.date;
    const data = new Date(inicio);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = MESES[data.getMonth()];

    const horario = ev.start.dateTime
      ? data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      : "Dia todo";

    const local = ev.location ? escapeHtml(ev.location) : "Local a confirmar";
    const titulo = escapeHtml(limparEtiqueta(ev.summary || "Show"));

    return `
      <li class="agenda-item">
        <div class="agenda-data"><span class="dia">${dia}</span><span class="mes">${mes}</span></div>
        <div class="agenda-detalhes">
          <h3>${titulo}</h3>
          <p class="agenda-meta">${horario} · ${local}</p>
        </div>
      </li>`;
  }

  function limparEtiqueta(texto) {
    const etq = cfg.etiqueta || "#show";
    return texto.replace(new RegExp(etq, "gi"), "").replace(/\s{2,}/g, " ").trim();
  }

  function mostrarSetupPendente() {
    status.textContent = "";
    lista.innerHTML = `
      <li class="agenda-vazia">
        A agenda ainda não está conectada ao Google Agenda.<br>
        Configure <code>calendarId</code> e <code>apiKey</code> em <code>js/config.js</code>
        (passo a passo no README.md do projeto).
      </li>`;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
})();
