/* =============================================
   AdaptArqs — comportamiento compartido
   ============================================= */
// .rm la pone el <head> cuando el sistema pide menos movimiento
const REDUCED_MOTION = document.documentElement.classList.contains('rm');

const ICONS = {
  bag:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  plus:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="M12 11.5v5M9.5 14h5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  swatch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8.5" cy="14" r="4.5"/><circle cx="15.5" cy="14" r="4.5"/><circle cx="12" cy="8" r="4.5"/></svg>',
  arrow: '<svg class="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15m-5-5 5 5-5 5"/></svg>'
};

/* ---- Tarjeta de producto (galerías del inicio, catálogo y ficha) ---- */
function productCardHTML(p, { eager = false } = {}) {
  return `
    <article class="product-card" data-id="${p.id}" data-category="${p.category}">
      <div class="plate">
        <img class="plate-plano" src="${p.plano}" alt="" loading="lazy" decoding="async">
        <img class="plate-photo" src="${p.imageSm}" alt="${p.name}: ${p.subtitle}" ${eager ? '' : 'loading="lazy"'} decoding="async">
      </div>
      <span class="card-cat">${categoryName(p.category)}</span>
      <div class="card-body">
        <h3><a href="buy.html?p=${p.id}" data-product-link><em>${p.name}</em></a></h3>
        <p class="card-sub">${p.subtitle}</p>
        <p class="card-price">${formatCOP(p.price)}</p>
        ${p.colors
          ? `<a class="card-add" href="buy.html?p=${p.id}#colorRow" aria-label="Elegir color de ${p.name}" data-tip="Elegir color">${ICONS.swatch}</a>`
          : `<button class="card-add" type="button" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito" data-tip="Agregar al carrito">${ICONS.plus}</button>`}
      </div>
    </article>`;
}

/* ---- Contador del carrito en el encabezado ---- */
function updateCartBadge(bump = false) {
  const n = cartCount();
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = n;
    el.dataset.empty = n === 0;
    if (bump && !REDUCED_MOTION) {
      el.classList.remove('is-bump');
      void el.offsetWidth;
      el.classList.add('is-bump');
    }
  });
  document.querySelectorAll('.cart-link').forEach(a => {
    a.setAttribute('aria-label', n === 1 ? 'Carrito, 1 producto' : `Carrito, ${n} productos`);
  });
}

/* ---- Aviso al agregar ---- */
let toastTimer;
function showAddedToast(product, color) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <img src="${product.imageSm}" alt="">
    <p><strong>Agregado al carrito</strong>${product.name}${color ? ' · ' + color : ''}</p>
    <a href="cart.html">Ver carrito</a>`;
  requestAnimationFrame(() => toast.classList.add('is-visible'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4200);
}

function markDone(btn, doneLabel) {
  if (!btn) return;
  const original = btn.dataset.original || btn.innerHTML;
  btn.dataset.original = original;
  btn.classList.add('is-done');
  btn.innerHTML = doneLabel ? `${ICONS.check}<span>${doneLabel}</span>` : ICONS.check;
  clearTimeout(btn._doneTimer);
  btn._doneTimer = setTimeout(() => {
    btn.classList.remove('is-done');
    btn.innerHTML = original;
  }, 1800);
}

/* Agregar rápido desde cualquier tarjeta: color por defecto = el primero del catálogo */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-add]');
  if (!btn) return;
  e.preventDefault();
  const p = getProduct(btn.dataset.add);
  if (!p) return;
  const color = btn.dataset.color || (p.colors ? p.colors[0].name : null);
  addToCart(p.id, color, 1);
  markDone(btn, btn.dataset.doneLabel);
  showAddedToast(p, color);
});

document.addEventListener('cart:change', () => updateCartBadge(true));
window.addEventListener('storage', e => { if (e.key === CART_KEY) updateCartBadge(); });

/* ---- Encabezado: estado al hacer scroll y menú móvil ---- */
function setupHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = header.querySelector('.menu-toggle');
  const nav    = header.querySelector('.site-nav');
  if (!toggle || !nav) return;

  const setOpen = open => {
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
}

/* ---- Plano → objeto: dibuja el plano y luego construye la foto ---- */
function buildPlate(plate, delay = 0) {
  if (!plate) return;
  plate.classList.remove('is-drawn', 'is-built');
  void plate.offsetWidth;
  setTimeout(() => plate.classList.add('is-drawn'), delay);
  setTimeout(() => plate.classList.add('is-built'), delay + 620);
}

function setupReveals() {
  const reveals = document.querySelectorAll('[data-reveal], .plate[data-build]');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-in', 'is-drawn', 'is-built'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.matches('.plate[data-build]')) {
        if (!el.hasAttribute('data-manual')) buildPlate(el, 80);
      } else {
        el.classList.add('is-in');
      }
      io.unobserve(el);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  reveals.forEach(el => io.observe(el));
}

/* ---- Galería móvil: flechas, progreso y arrastre con mouse ---- */
function setupRail(shell) {
  const rail  = shell.querySelector('.rail');
  const prev  = shell.querySelector('[data-rail-prev]');
  const next  = shell.querySelector('[data-rail-next]');
  const thumb = shell.querySelector('.rail-thumb');
  if (!rail) return;

  const step = () => {
    const card = rail.querySelector('.product-card:not([hidden])');
    const gap  = parseFloat(getComputedStyle(rail).columnGap) || 24;
    return card ? card.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
  };

  const update = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    const ratio = rail.scrollWidth ? rail.clientWidth / rail.scrollWidth : 1;
    if (thumb) {
      const track = thumb.parentElement.clientWidth;
      thumb.style.width = `${Math.max(ratio * 100, 8)}%`;
      const pos = max > 0 ? rail.scrollLeft / max : 0;
      thumb.style.transform = `translateX(${pos * (track - thumb.offsetWidth)}px)`;
    }
    if (prev) prev.disabled = rail.scrollLeft <= 2;
    if (next) next.disabled = rail.scrollLeft >= max - 2;
  };

  const behavior = REDUCED_MOTION ? 'auto' : 'smooth';
  prev && prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior }));
  next && next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior }));
  rail.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', update);
  shell._updateRail = update;
  update();

  // Arrastre con mouse (en táctil el scroll nativo ya funciona)
  let startX = 0, startLeft = 0, moved = false, down = false;
  rail.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    down = true; moved = false; startX = e.clientX; startLeft = rail.scrollLeft;
  });
  window.addEventListener('pointermove', e => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 6) { moved = true; rail.classList.add('is-dragging'); }
    if (moved) rail.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    if (moved) {
      rail.classList.remove('is-dragging');
      const s = step();
      rail.scrollTo({ left: Math.round(rail.scrollLeft / s) * s, behavior });
    }
  });
  rail.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
}

/* ---- Logotipo gigante ajustado al ancho disponible ---- */
function fitWordmark(el) {
  const fit = () => {
    el.style.fontSize = '100px';
    const span = el.querySelector('span') || el;
    const w = span.getBoundingClientRect().width;
    if (w) el.style.fontSize = `${(el.clientWidth / w) * 100 * 0.995}px`;
    const hero = el.closest('.hero');
    if (hero) hero.style.setProperty('--mark-h', el.offsetHeight + 'px');
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  fit();
  new ResizeObserver(fit).observe(el.parentElement);
}

/* ---- Foto compartida entre la tarjeta y la ficha (View Transitions) ---- */
document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="buy.html"]');
  if (!link) return;
  const card = link.closest('.product-card, .hero-stage');
  const img  = card && card.querySelector('.plate-photo');
  if (!img) return;
  card.classList.add('is-opening');
  const plate = img.closest('.plate');
  if (plate) plate.classList.remove('is-leaving');
  document.querySelectorAll('.plate-photo').forEach(i => { i.style.viewTransitionName = ''; });
  img.style.viewTransitionName = 'product-photo';
});

window.addEventListener('pageshow', e => {
  if (!e.persisted) return;
  document.querySelectorAll('.plate-photo').forEach(i => { i.style.viewTransitionName = ''; });
  document.querySelectorAll('.is-opening').forEach(c => c.classList.remove('is-opening'));
});

document.addEventListener('DOMContentLoaded', () => {
  setupHeader();
  updateCartBadge();
  document.querySelectorAll('[data-rail-shell]').forEach(setupRail);
  document.querySelectorAll('[data-fit]').forEach(fitWordmark);
  setupReveals();
  const mark = document.querySelector('.hero-mark');
  if (mark) requestAnimationFrame(() => setTimeout(() => mark.classList.add('is-in'), 120));
});
