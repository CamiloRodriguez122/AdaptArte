// ✅ Cargar el producto seleccionado (?p=id, o el último elegido en la galería)
const params  = new URLSearchParams(window.location.search);
const stored  = JSON.parse(localStorage.getItem('selectedProduct') || 'null');
const product = getProduct(params.get('p')) || getProduct(stored && stored.id) || PRODUCTS[0];

let selectedColor = product.colors ? product.colors[0].name : null;

document.title = `AdaptArqs | ${product.name.charAt(0)}${product.name.slice(1).toLowerCase()}`;

const img = document.getElementById('sheetImage');
img.src = product.image;
img.alt = `${product.name}: ${product.subtitle}`;

document.getElementById('sheetName').textContent     = product.name + ':';
document.getElementById('sheetSubtitle').textContent = product.subtitle;

const desc = document.getElementById('sheetDesc');
desc.textContent = product.description;
if (product.descAlign === 'left') desc.classList.add('align-left');

document.getElementById('specStyle').textContent    = product.style;
document.getElementById('specMaterial').textContent = product.material;
document.getElementById('specDelivery').textContent = product.delivery;
document.getElementById('specAdjust').textContent   = product.adjust;
document.getElementById('specPrice').textContent    = formatCOP(product.price);

// 🎨 Colores (solo los productos que los tienen en el catálogo)
const colorRow = document.getElementById('colorRow');
const swatches = document.getElementById('swatches');

if (product.colors) {
  product.colors.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'swatch' + (i === 0 ? ' selected' : '');
    btn.style.backgroundColor = c.hex;
    btn.title = c.name;
    btn.setAttribute('aria-label', 'Color ' + c.name);
    btn.addEventListener('click', () => {
      swatches.querySelectorAll('.swatch').forEach(s => s.classList.remove('selected'));
      btn.classList.add('selected');
      selectedColor = c.name;
    });
    swatches.appendChild(btn);
  });
} else {
  colorRow.style.display = 'none';
}

// 🛒 Agregar al carrito (guardar datos y redirigir)
document.getElementById('addToCartBtn').addEventListener('click', () => {
  const item = {
    id:       product.id,
    name:     product.name,
    subtitle: product.subtitle,
    type:     'image',
    source:   product.image,
    price:    product.price,
    quantity: 1,
    color:    selectedColor
  };

  localStorage.setItem('adaptarqsProduct', JSON.stringify(item));
  window.location.href = 'cart.html';
});
