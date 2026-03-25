// Efecto de reducción de márgenes al hacer scroll
const heroEl = document.querySelector('.hero');
if (heroEl) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) heroEl.classList.add('scrolled');
    else heroEl.classList.remove('scrolled');
  });
}

// Animaciones de aparición al hacer scroll
const revealOnScroll = () => {
  const elements = document.querySelectorAll('.hero-content, .subtext, .about-container');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add('visible');
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// =============================================
// 🍔 HAMBURGER MENU — funciona en todas las páginas
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  const navbar   = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  if (!navbar || !navLinks) return;

  // Crear botón hamburguesa si no existe
  let hamburger = navbar.querySelector('.hamburger');
  if (!hamburger) {
    hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Menú');
    hamburger.innerHTML = `<span></span><span></span><span></span>`;
    navbar.appendChild(hamburger);
  }

  // Toggle menú
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Cerrar al hacer clic en un enlace
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
});
