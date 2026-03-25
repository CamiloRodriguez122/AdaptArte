// 🛒 Cargar producto desde localStorage
const productData = JSON.parse(localStorage.getItem('adaptarteProduct'))
                 || JSON.parse(localStorage.getItem('selectedProduct'));

const nameEl      = document.getElementById('cartProductName');
const origPriceEl = document.getElementById('cartOriginalPrice');
const currPriceEl = document.getElementById('cartCurrentPrice');
const subtotalEl  = document.getElementById('itemSubtotal');
const totalEl     = document.getElementById('cartTotal');
const qtyDisplay  = document.getElementById('qty-display');
const promoMsgEl  = document.getElementById('promoMsg');

let basePrice    = productData ? productData.price : 100;
let qty          = 1;
let discount     = 0;  // porcentaje de descuento (0‑1)
const PROMO_CODE = 'ADAPTARTE10';

function fmt(n) {
  return '$' + n.toFixed(2).replace('.', ',');
}

function updateDisplay() {
  const discounted = basePrice * (1 - discount);
  const subtotal   = discounted * qty;

  qtyDisplay.textContent    = qty;
  origPriceEl.textContent   = fmt(basePrice);
  currPriceEl.textContent   = discount > 0 ? fmt(discounted) : fmt(basePrice);
  subtotalEl.textContent    = fmt(subtotal);
  totalEl.textContent       = fmt(subtotal);

  // Mostrar tachado solo si hay descuento
  origPriceEl.style.display = discount > 0 ? 'inline' : 'none';
}

// Nombre del producto
if (productData) {
  nameEl.textContent = productData.name.toUpperCase();
}

// Botones de cantidad
document.getElementById('qtyMinus').addEventListener('click', () => {
  if (qty > 1) { qty--; updateDisplay(); }
});

document.getElementById('qtyPlus').addEventListener('click', () => {
  qty++;
  updateDisplay();
});

// Código de promoción
document.getElementById('applyPromo').addEventListener('click', () => {
  const code = document.getElementById('promoCode').value.trim().toUpperCase();
  if (code === PROMO_CODE) {
    discount = 0.10;
    promoMsgEl.textContent = '✅ Código aplicado: 10% de descuento';
    promoMsgEl.style.color = '#4a7c3d';
  } else {
    discount = 0;
    promoMsgEl.textContent = '❌ Código inválido';
    promoMsgEl.style.color = '#8b3a2b';
  }
  updateDisplay();
});

// Guardar estado del carrito antes de ir al pago
document.getElementById('goToPayment').addEventListener('click', (e) => {
  e.preventDefault();
  const discounted = basePrice * (1 - discount);
  const totalFinal = discounted * qty;

  const cartData = {
    name:     productData?.name || 'Silla AdaptArte',
    type:     productData?.type || 'image',
    source:   productData?.source || '',
    color:    productData?.color || 'beige',
    price:    basePrice,
    discount: discount,
    qty:      qty,
    total:    totalFinal
  };

  localStorage.setItem('cartData', JSON.stringify(cartData));
  window.location.href = 'checkout.html';
});

// Inicializar display
updateDisplay();
