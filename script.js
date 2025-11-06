// Efecto de reducción de márgenes al hacer scroll
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (window.scrollY > 80) {
    hero.classList.add('scrolled');
  } else {
    hero.classList.remove('scrolled');
  }
});

// Animaciones de aparición al hacer scroll
const revealOnScroll = () => {
  const elements = document.querySelectorAll('.hero-content, .subtext, .about-container');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 150) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// --- CARRUSEL DE PRODUCTOS ---
const track = document.querySelector('.carousel-track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (track && nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: 300, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -300, behavior: 'smooth' });
  });
}
