// ✅ Cargar el producto seleccionado (?p=id)
const params  = new URLSearchParams(window.location.search);
const product = getProduct(params.get('p')) || PRODUCTS[0];

let selectedColor = product.colors ? product.colors[0].name : null;

document.title = `${product.name} · ${product.subtitle} | AdaptArqs`;

const plate = document.querySelector('.sheet-photo');
const img   = document.getElementById('sheetImage');
img.src = product.image;
img.alt = `${product.name}: ${product.subtitle}`;
document.getElementById('sheetPlano').src = product.plano;

document.getElementById('sheetName').textContent     = product.name + ':';
document.getElementById('sheetSubtitle').textContent = product.subtitle;
document.getElementById('crumbName').textContent     = product.name;

const crumbCat = document.getElementById('crumbCat');
crumbCat.textContent = categoryName(product.category);
crumbCat.href = `products.html?c=${product.category}`;

const desc = document.getElementById('sheetDesc');
desc.textContent = product.description;
if (product.descAlign === 'left') desc.classList.add('align-left');

document.getElementById('specStyle').textContent    = product.style;
document.getElementById('specMaterial').textContent = product.material;
document.getElementById('specDelivery').textContent = product.delivery;
document.getElementById('specAdjust').textContent   = product.adjust;
document.getElementById('specPrice').textContent    = formatCOP(product.price);

document.getElementById('barName').textContent  = product.name;
document.getElementById('barPrice').textContent = formatCOP(product.price);

// 🎨 Colores (solo los productos que los tienen en el catálogo)
const colorRow  = document.getElementById('colorRow');
const swatches  = document.getElementById('swatches');
const colorName = document.getElementById('colorName');

if (product.colors) {
  colorName.textContent = '· ' + selectedColor;
  product.colors.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'swatch' + (i === 0 ? ' selected' : '');
    btn.style.backgroundColor = c.hex;
    btn.title = c.name;
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', i === 0);
    btn.setAttribute('aria-label', c.name);
    btn.addEventListener('click', () => {
      swatches.querySelectorAll('.swatch').forEach(s => {
        s.classList.remove('selected');
        s.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('selected');
      btn.setAttribute('aria-checked', 'true');
      selectedColor = c.name;
      colorName.textContent = '· ' + c.name;
    });
    swatches.appendChild(btn);
  });
  // Llegó desde "Elegir color": enfocar el selector
  if (location.hash === '#colorRow') {
    requestAnimationFrame(() => swatches.querySelector('.swatch.selected').focus({ preventScroll: true }));
  }
} else {
  colorRow.style.display = 'none';
}

// 🛒 Agregar al carrito
const addBtn = document.getElementById('addToCartBtn');

function addCurrent(btn) {
  addToCart(product.id, selectedColor, 1);
  markDone(btn, btn === addBtn ? 'Agregado al carrito' : 'Agregado');
  showAddedToast(product, selectedColor);
}

addBtn.addEventListener('click', () => addCurrent(addBtn));
document.getElementById('barAdd').addEventListener('click', e => addCurrent(e.currentTarget));

// 📱 Barra fija en el celular cuando el botón principal sale de la vista
const bar = document.getElementById('buyBar');
let barShown = false, barTicking = false;
function updateBar() {
  barTicking = false;
  const show = addBtn.getBoundingClientRect().bottom < 0;
  if (show === barShown) return;
  barShown = show;
  bar.classList.toggle('is-visible', show);
  bar.setAttribute('aria-hidden', !show);
  document.getElementById('barAdd').tabIndex = show ? 0 : -1;
}
window.addEventListener('scroll', () => {
  if (!barTicking) { barTicking = true; requestAnimationFrame(updateBar); }
}, { passive: true });

// Piezas relacionadas: misma categoría primero
document.getElementById('relatedRail').innerHTML = PRODUCTS
  .filter(p => p.id !== product.id)
  .sort((a, b) => (b.category === product.category) - (a.category === product.category))
  .map(p => productCardHTML(p))
  .join('');

// Plano → foto al abrir la ficha; si llegó con la foto compartida, ya está construida
let revealed = false;
function reveal(withTransition) {
  if (revealed) return;
  revealed = true;
  if (withTransition) plate.classList.add('is-drawn', 'is-built');
  else buildPlate(plate, 180);
}
window.addEventListener('pagereveal', e => reveal(Boolean(e.viewTransition)));
setTimeout(() => reveal(false), 350);
