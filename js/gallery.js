/* ============================================
   GALERIA DE FOTOS
   Lê o array SITE_CONFIG.fotos (config.js) e
   monta a grade + o lightbox automaticamente.
   ============================================ */
(function () {
  const grid = document.getElementById("galeriaGrid");
  const fotos = (window.SITE_CONFIG && SITE_CONFIG.fotos) || [];

  if (!grid) return;

  if (fotos.length === 0) {
    grid.innerHTML = `
      <div class="galeria-empty">
        Nenhuma foto publicada ainda.<br>
        Para adicionar, edite o array <code>fotos</code> em <code>js/config.js</code>.
      </div>`;
    return;
  }

  grid.innerHTML = fotos.map((foto, i) => `
    <button type="button" class="galeria-item" data-index="${i}" aria-label="Ampliar foto: ${escapeHtml(foto.legenda || "foto do show")}">
      <img src="${foto.src}" alt="${escapeHtml(foto.legenda || "Foto de show de Éberson Ávila")}" loading="lazy">
    </button>
  `).join("");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-index]");
    if (!btn) return;
    const foto = fotos[Number(btn.dataset.index)];
    lightboxImg.src = foto.src;
    lightboxImg.alt = foto.legenda || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  });

  function fecharLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", fecharLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) fecharLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharLightbox(); });

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
})();
