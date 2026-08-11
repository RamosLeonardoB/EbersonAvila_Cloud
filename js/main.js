/* ============================================
   COMPORTAMENTO GERAL DO SITE
   ============================================ */
(function () {

  // ---------- Ano no rodapé ----------
  const anoEl = document.getElementById("anoAtual");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // ---------- Redes sociais no rodapé ----------
  const footerSocial = document.getElementById("footerSocial");
  const redes = (window.SITE_CONFIG && SITE_CONFIG.redesSociais) || [];
  if (footerSocial && redes.length) {
    footerSocial.innerHTML = redes.map(r =>
      `<a href="${r.url}" target="_blank" rel="noopener">${escapeHtml(r.nome)}</a>`
    ).join("");
  }

  // ---------- Link do WhatsApp ----------
  const whatsappLink = document.getElementById("whatsappLink");
  const whatsCfg = (window.SITE_CONFIG && SITE_CONFIG.whatsapp) || {};
  if (whatsappLink && whatsCfg.numero) {
    const texto = encodeURIComponent(whatsCfg.mensagemPadrao || "Olá!");
    whatsappLink.href = `https://wa.me/${whatsCfg.numero}?text=${texto}`;
  }

  // ---------- Nav mobile: destaca a seção ativa ----------
  const navItems = document.querySelectorAll(".nav-item");
  const secoesObservadas = ["topo", "fotos", "agenda", "contato"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if ("IntersectionObserver" in window && secoesObservadas.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navItems.forEach(item => {
          item.classList.toggle("active", item.dataset.target === entry.target.id);
        });
      });
    }, { rootMargin: "-40% 0px -50% 0px" });

    secoesObservadas.forEach(sec => observer.observe(sec));
  }

  // ---------- Scroll reveal ----------
  const revelaveis = document.querySelectorAll("section, .agenda-item, .galeria-item");
  revelaveis.forEach(el => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revelaveis.forEach(el => revealObserver.observe(el));
  } else {
    revelaveis.forEach(el => el.classList.add("is-visible"));
  }

  // ---------- Formulário de contato ----------
  const form = document.getElementById("contatoForm");
  const formNote = document.getElementById("formNote");

  if (form) {
    form.addEventListener("submit", (e) => {
      const acaoConfigurada = form.action && !form.action.includes("SEU-EMAIL");
      if (!acaoConfigurada) {
        e.preventDefault();
        formNote.textContent = "Formulário ainda não configurado — defina o e-mail de destino em index.html (ação do FormSubmit) ou use o WhatsApp ao lado.";
        return;
      }
      formNote.textContent = "Enviando...";
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
})();
