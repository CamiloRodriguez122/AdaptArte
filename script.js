/* =============================================
   🌀 PAGE TRANSITION — overlay al entrar/salir
   ============================================= */
(function setupPageTransition() {
  // Crear overlay — arranca visible para el fade-in de entrada
  const overlay = document.createElement('div');
  overlay.className = 'page-overlay fade-in';
  document.body.appendChild(overlay);

  // Quitar overlay al cargar la página (fade de entrada)
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.classList.remove('fade-in');
        overlay.classList.add('fade-out');
      });
    });
  });

  // Interceptar links internos
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      link.target === '_blank'
    ) return;

    e.preventDefault();
    overlay.classList.remove('fade-out');
    overlay.classList.add('fade-in');
    setTimeout(() => { window.location.href = href; }, 580);
  });

  // Back/forward del browser
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      overlay.classList.add('fade-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.classList.remove('fade-in');
          overlay.classList.add('fade-out');
        });
      });
    }
  });
})();



/* =============================================
   🏔️ PARALLAX SUAVE en el fondo
   ============================================= */
(function setupParallax() {
  // Solo aplica si el fondo está en scroll (no fixed en mobile)
  // Usamos transform en un pseudo-layer para no romper el background:fixed
  let ticking = false;

  function applyParallax() {
    const scrollY = window.scrollY;
    // Movemos el background-position para simular profundidad
    // 0.25 = factor de parallax (más bajo = más sutil)
    const offset = scrollY * 0.25;
    document.body.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  });
})();


/* =============================================
   📝 SPLIT TEXT REVEAL en h1 y h2
   ============================================= */
(function setupSplitText() {
  const targets = document.querySelectorAll(
    '.hero-content h1, .home-title-row h1, .about-text h2, ' +
    '.services-container h2, .mission-vision-container h2, ' +
    '.products-container h2, .closing-container h1, .contact-info h1'
  );

  targets.forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(word =>
      `<span class="split-word"><span>${word}</span></span>`
    ).join(' ');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        el.querySelectorAll('.split-word').forEach((ws, i) => {
          setTimeout(() => ws.classList.add('revealed'), i * 80);
        });
        observer.unobserve(el);
      });
    }, { threshold: 0.2 });

    observer.observe(el);
  });
})();


/* =============================================
   🏠 HERO SCROLL — reduce padding al bajar
   ============================================= */
const heroEl = document.querySelector('.hero');
if (heroEl) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) heroEl.classList.add('scrolled');
    else heroEl.classList.remove('scrolled');
  });
}


/* =============================================
   ✨ REVEAL ON SCROLL — cards y contenedores
   ============================================= */
const revealOnScroll = () => {
  const elements = document.querySelectorAll('.hero-content, .subtext, .about-container');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add('visible');
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


/* =============================================
   🍔 HAMBURGER MENU
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  const navbar   = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  if (!navbar || !navLinks) return;

  let hamburger = navbar.querySelector('.hamburger');
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Menú');
    hamburger.innerHTML = `<span></span><span></span><span></span>`;
    navbar.appendChild(hamburger);
  }

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
});
