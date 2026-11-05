// 🛒 Carrito: líneas, cantidades, código de promoción y totales

// Pedidos guardados con la versión anterior (una sola pieza)
(function migrateLegacy() {
  try {
    const legacy = JSON.parse(localStorage.getItem('adaptarqsProduct'));
    if (legacy && legacy.id && getProduct(legacy.id) && readCart().length === 0) {
      addToCart(legacy.id, legacy.color || null, parseInt(legacy.quantity) || 1);
    }
    ['adaptarqsProduct', 'selectedProduct', 'cartData'].forEach(k => localStorage.removeItem(k));
  } catch (e) {}
})();

const view    = document.getElementById('cartView');
const empty   = document.getElementById('cartEmpty');
const linesEl = document.getElementById('cartLines');
const msgEl   = document.getElementById('promoMsg');

function colorHex(product, name) {
  const c = product.colors && product.colors.find(c => c.name === name);
  return c ? c.hex : null;
}

function lineHTML(l) {
  const p = l.product;
  const hex = colorHex(p, l.color);
  return `
    <li class="line" data-key="${l.key}">
      <a class="line-photo" href="buy.html?p=${p.id}" tabindex="-1" aria-hidden="true"><img src="${p.imageSm}" alt=""></a>
      <div class="line-info">
        <h3><a href="buy.html?p=${p.id}"><em>${p.name}</em></a></h3>
        <p class="line-sub">${p.subtitle}</p>
        ${l.color ? `<p class="line-color"><i style="background:${hex}"></i>Color ${l.color}</p>` : ''}
        <div class="line-actions">
          <div class="qty" role="group" aria-label="Cantidad de ${p.name}">
            <button type="button" data-dec aria-label="Quitar una unidad" ${l.qty <= 1 ? 'disabled' : ''}>−</button>
            <output aria-live="polite">${l.qty}</output>
            <button type="button" data-inc aria-label="Agregar una unidad" ${l.qty >= 20 ? 'disabled' : ''}>+</button>
          </div>
          <button class="line-remove" type="button" data-remove>Eliminar</button>
        </div>
      </div>
      <p class="line-total">${formatCOP(l.total)}${l.qty > 1 ? `<small>${formatCOP(p.price)} c/u</small>` : ''}</p>
    </li>`;
}

function renderTotals() {
  const t = cartTotals();
  document.getElementById('subtotal').textContent = formatCOP(t.subtotal);
  document.getElementById('total').textContent    = formatCOP(t.total);
  document.getElementById('discountRow').hidden   = !t.promo;
  if (t.promo) {
    document.getElementById('promoLabel').textContent = `(${t.promo})`;
    document.getElementById('discount').textContent   = '−' + formatCOP(t.discount);
  }
}

function render() {
  const lines = cartLines();
  view.hidden  = lines.length === 0;
  empty.hidden = lines.length > 0;
  linesEl.innerHTML = lines.map(lineHTML).join('');
  renderTotals();
}

linesEl.addEventListener('click', e => {
  const li = e.target.closest('.line');
  if (!li) return;
  const key  = li.dataset.key;
  const line = readCart().find(i => lineKey(i.id, i.color) === key);
  if (!line) return;

  if (e.target.closest('[data-inc]')) { setLineQty(key, line.qty + 1); render(); }
  if (e.target.closest('[data-dec]')) { setLineQty(key, line.qty - 1); render(); }
  if (e.target.closest('[data-remove]')) {
    li.classList.add('is-removing');
    setTimeout(() => { removeLine(key); render(); }, REDUCED_MOTION ? 0 : 300);
  }
});

const promoInput = document.getElementById('promoCode');
const current = readPromo();
if (current) {
  promoInput.value = current;
  msgEl.textContent = `Código ${current} aplicado: 10% de descuento.`;
  msgEl.classList.add('is-ok');
}

document.getElementById('promoForm').addEventListener('submit', e => {
  e.preventDefault();
  const code = promoInput.value.trim().toUpperCase();
  if (!code) {
    savePromo(null);
    msgEl.textContent = 'Escribe un código para aplicarlo.';
    msgEl.classList.remove('is-ok');
  } else if (PROMOS[code]) {
    savePromo(code);
    msgEl.textContent = `Código ${code} aplicado: ${Math.round(PROMOS[code] * 100)}% de descuento.`;
    msgEl.classList.add('is-ok');
  } else {
    savePromo(null);
    msgEl.textContent = 'Ese código no es válido. Revisa que esté bien escrito.';
    msgEl.classList.remove('is-ok');
  }
  renderTotals();
});

render();
