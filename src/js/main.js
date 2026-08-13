(() => {
    "use strict";

    const CONTACT = {
        whatsapp: "https://wa.me/543704950311"
    };

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const searchOverlay = document.getElementById("searchOverlay");
    const searchTriggers = document.querySelectorAll(".search-trigger");
    const searchClose = document.getElementById("searchClose");
    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
    const sections = document.querySelectorAll("main section[id]");
    const bookingDialog = document.getElementById("bookingDialog");
    const continueToWhatsapp = document.getElementById("continueToWhatsapp");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let bookingTrigger = null;

    document.querySelectorAll("#currentYear").forEach((year) => {
        year.textContent = new Date().getFullYear();
    });

    const closeMenu = () => {
        if (!mobileMenu || !menuToggle) return;
        mobileMenu.classList.remove("open");
        mobileMenu.setAttribute("aria-hidden", "true");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        document.body.classList.remove("menu-open");
    };

    if (header) {
        const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 12);
        updateHeader();
        window.addEventListener("scroll", updateHeader, { passive: true });
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
            if (isOpen) {
                closeMenu();
                return;
            }
            mobileMenu.classList.add("open");
            mobileMenu.setAttribute("aria-hidden", "false");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Cerrar menú");
            document.body.classList.add("menu-open");
        });
        mobileMenu.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", closeMenu));
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    const closeSearch = () => {
        if (!searchOverlay) return;
        searchOverlay.classList.remove("open");
        searchOverlay.setAttribute("aria-hidden", "true");
        document.body.classList.remove("menu-open");
    };

    if (searchOverlay && searchInput) {
        const openSearch = () => {
            closeMenu();
            searchOverlay.classList.add("open");
            searchOverlay.setAttribute("aria-hidden", "false");
            document.body.classList.add("menu-open");
            window.setTimeout(() => searchInput.focus(), 100);
        };
        searchTriggers.forEach((trigger) => trigger.addEventListener("click", openSearch));
        searchClose?.addEventListener("click", closeSearch);
        searchOverlay.addEventListener("click", (event) => {
            if (event.target === searchOverlay) closeSearch();
        });
    }

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const query = searchInput.value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (!query) return;
            const match = [...document.querySelectorAll("[data-search]")].find((element) => {
                const content = `${element.dataset.search} ${element.textContent}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return content.includes(query);
            });
            closeSearch();
            searchInput.value = "";
            const target = match || document.getElementById("servicios");
            window.setTimeout(() => {
                target?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: match ? "center" : "start" });
                if (match && !prefersReducedMotion) {
                    match.animate([{ transform: "scale(1)" }, { transform: "scale(1.018)" }, { transform: "scale(1)" }], { duration: 650, easing: "ease" });
                }
            }, 100);
        });
    }

    document.querySelectorAll('a[href^="#"]:not([data-whatsapp-cta])').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
        });
    });

    if (sections.length && navLinks.length) {
        const updateActiveNav = () => {
            let activeId = "inicio";
            const position = window.scrollY + 180;
            sections.forEach((section) => {
                if (section.offsetTop <= position) activeId = section.id;
            });
            navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`));
        };
        updateActiveNav();
        window.addEventListener("scroll", updateActiveNav, { passive: true });
    }

    const revealElements = document.querySelectorAll(".reveal");
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("visible"));
    } else {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -45px 0px" });
        revealElements.forEach((element) => observer.observe(element));
    }

    const wellnessCarousel = document.querySelector("[data-wellness-carousel]");
    if (wellnessCarousel) {
        const moveCarousel = (direction) => {
            const card = wellnessCarousel.querySelector(".wellness-card");
            if (!card) return;
            const gap = Number.parseFloat(getComputedStyle(wellnessCarousel).columnGap) || 0;
            wellnessCarousel.scrollBy({
                left: direction * (card.getBoundingClientRect().width + gap),
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        };

        document.querySelector("[data-carousel-prev]")?.addEventListener("click", () => moveCarousel(-1));
        document.querySelector("[data-carousel-next]")?.addEventListener("click", () => moveCarousel(1));
        wellnessCarousel.addEventListener("keydown", (event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            moveCarousel(event.key === "ArrowLeft" ? -1 : 1);
        });
    }

    if (bookingDialog && continueToWhatsapp) {
        const closeBookingDialog = () => bookingDialog.close();

        document.querySelectorAll("[data-whatsapp-cta]").forEach((trigger) => {
            trigger.addEventListener("click", (event) => {
                event.preventDefault();
                bookingTrigger = trigger;
                continueToWhatsapp.href = `${CONTACT.whatsapp}${trigger.dataset.whatsappQuery || ""}`;
                bookingDialog.showModal();
            });
        });

        bookingDialog.querySelectorAll("[data-dialog-close]").forEach((button) => button.addEventListener("click", closeBookingDialog));
        bookingDialog.addEventListener("click", (event) => {
            if (event.target === bookingDialog) closeBookingDialog();
        });
        bookingDialog.addEventListener("close", () => {
            bookingTrigger?.focus();
            bookingTrigger = null;
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeSearch();
            closeMenu();
        }
    });
})();
