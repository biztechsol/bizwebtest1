/* Biztech Solutions — main.js
   Handles: mobile menu, cert filter+search+modal, FAQ accordion,
            consultation form (WhatsApp fallback), active nav highlight. */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- Lucide icons ---- */
  if (window.lucide) window.lucide.createIcons();

  /* ---- Mobile menu ---- */
  const toggle = document.querySelector("[data-mobile-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  const iconOpen = document.querySelector("[data-icon-open]");
  const iconClose = document.querySelector("[data-icon-close]");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle("hidden", isOpen);
        iconClose.classList.toggle("hidden", !isOpen);
      }
    });
  }

  /* ---- Active nav highlight ---- */
  const pageFile = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll("[data-nav-link]").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (
      href === pageFile ||
      (pageFile === "" && href === "index.html") ||
      (pageFile === "index.html" && href === "./")
    ) {
      a.classList.add("active");
    }
  });

  /* ---- Cert filter + search ---- */
  const filterChips = document.querySelectorAll("[data-cert-filter]");
  const certSearch = document.querySelector("[data-cert-search]");
  const certCards = document.querySelectorAll("[data-cert-card]");
  const noResult = document.querySelector("[data-cert-empty]");
  let activeFilter = "all";

  const applyCertFilter = () => {
    const q = (certSearch?.value || "").trim().toLowerCase();
    let anyVisible = false;
    certCards.forEach((card) => {
      const cat = card.getAttribute("data-category");
      const searchable = (card.getAttribute("data-search") || "").toLowerCase();
      const matchCat = activeFilter === "all" || cat === activeFilter;
      const matchQ = !q || searchable.includes(q);
      const visible = matchCat && matchQ;
      card.style.display = visible ? "" : "none";
      if (visible) anyVisible = true;
    });
    if (noResult) noResult.style.display = anyVisible ? "none" : "block";
  };

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.getAttribute("data-cert-filter");
      applyCertFilter();
    });
  });
  if (certSearch) certSearch.addEventListener("input", applyCertFilter);

  /* ---- Cert modal ---- */
  const modal = document.querySelector("[data-cert-modal]");
  const modalIcon = document.querySelector("[data-modal-icon]");
  const modalCode = document.querySelector("[data-modal-code]");
  const modalCat = document.querySelector("[data-modal-cat]");
  const modalName = document.querySelector("[data-modal-name]");
  const modalDesc = document.querySelector("[data-modal-desc]");
  const modalWho = document.querySelector("[data-modal-who]");
  const modalTags = document.querySelector("[data-modal-tags]");
  const modalWa = document.querySelector("[data-modal-wa]");

  const openModal = (card) => {
    if (!modal) return;
    const data = card.dataset;
    if (modalIcon) modalIcon.innerHTML = card.querySelector(".icon-badge")?.innerHTML || "";
    if (modalCode) modalCode.textContent = data.code || "";
    if (modalCat) modalCat.textContent = data.categoryLabel || "";
    if (modalName) modalName.textContent = data.name || "";
    if (modalDesc) modalDesc.textContent = data.desc || "";
    if (modalWho) modalWho.textContent = data.who || "";
    if (modalTags) {
      modalTags.innerHTML = "";
      (data.tags || "").split("|").filter(Boolean).forEach((t) => {
        const el = document.createElement("span");
        el.className = "chip";
        el.textContent = t;
        modalTags.appendChild(el);
      });
    }
    if (modalWa) {
      const msg = encodeURIComponent(`I'm interested in ${data.code} certification.`);
      modalWa.setAttribute("href", `https://wa.me/918770159684?text=${msg}`);
    }
    // Apply the card's category color to modal
    const catColors = {
      quality: "#1E5AA8",
      safety: "#059669",
      security: "#7C3AED",
      compliance: "#EA580C",
    };
    const color = catColors[data.category] || "#1E5AA8";
    modal.querySelectorAll("[data-modal-accent]").forEach((n) => (n.style.color = color));
    if (modalIcon) {
      modalIcon.style.background = color + "1A";
      modalIcon.style.color = color;
    }
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    if (window.lucide) window.lucide.createIcons();
  };
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };
  certCards.forEach((c) => c.addEventListener("click", () => openModal(c)));
  document.querySelectorAll("[data-modal-close]").forEach((b) =>
    b.addEventListener("click", closeModal)
  );
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());

  /* ---- FAQ accordion ---- */
  document.querySelectorAll("[data-faq-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (!item) return;
      const wasOpen = item.classList.contains("open");
      // Close siblings within the same container
      const container = item.parentElement;
      if (container) {
        container.querySelectorAll(".faq-item.open").forEach((it) => {
          if (it !== item) it.classList.remove("open");
          it.querySelector(".faq-toggle")?.classList.remove("open");
        });
      }
      item.classList.toggle("open", !wasOpen);
      btn.classList.toggle("open", !wasOpen);
    });
  });

  /* ---- Consultation form (WhatsApp fallback since this is static) ---- */
  document.querySelectorAll("[data-consult-form]").forEach((form) => {
    const success = form.querySelector("[data-form-success]");
    const error = form.querySelector("[data-form-error]");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("[name=name]")?.value.trim();
      const phone = form.querySelector("[name=phone]")?.value.trim();
      const email = form.querySelector("[name=email]")?.value.trim();
      const service = form.querySelector("[name=service]")?.value.trim();
      const message = form.querySelector("[name=message]")?.value.trim();
      if (!name || !phone) {
        if (error) {
          error.textContent = "Please enter your name and phone number.";
          error.style.display = "block";
        }
        return;
      }
      if (!/^[0-9+\-\s]{7,15}$/.test(phone)) {
        if (error) {
          error.textContent = "Please enter a valid phone number.";
          error.style.display = "block";
        }
        return;
      }
      if (error) error.style.display = "none";
      const text = [
        `New enquiry via Biztech Solutions website`,
        `Name: ${name}`,
        `Phone: ${phone}`,
        email ? `Email: ${email}` : null,
        service ? `Service: ${service}` : null,
        message ? `Message: ${message}` : null,
      ]
        .filter(Boolean)
        .join("\n");
      const url = `https://wa.me/918770159684?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
      if (success) {
        success.textContent =
          "Thanks! We're taking you to WhatsApp to confirm your details.";
        success.style.display = "block";
      }
      form.reset();
    });
  });

  /* ---- Set current year in footer ---- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
});
