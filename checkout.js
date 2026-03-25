// 🚚 Checkout — datos de envío
const cartData   = JSON.parse(localStorage.getItem('cartData'));
const legacyData = JSON.parse(localStorage.getItem('adaptarteProduct'));

// Usar cualquiera de los dos storages (compatibilidad)
const product = cartData || legacyData;

const img      = document.getElementById('productImage');
const colorRow = document.getElementById('colorRow');

if (product) {
  document.getElementById('productName').textContent = product.name || 'Silla AdaptArte';

  const qty   = product.qty   || product.quantity || 1;
  const total = product.total || (product.price * qty);

  document.getElementById('productQuantity').textContent =
    qty + (qty == 1 ? ' unidad' : ' unidades');
  document.getElementById('productTotal').textContent =
    '$' + parseFloat(total).toFixed(2).replace('.', ',');

  // Imagen o video
  if (product.type === 'image') {
    img.src = product.source || `./Productos/Silla_${product.color || 'beige'}.jpg`;
    document.getElementById('productColor').textContent =
      (product.color || 'beige').charAt(0).toUpperCase() +
      (product.color || 'beige').slice(1);
  } else if (product.type === 'video') {
    img.style.display = 'none';
    if (colorRow) colorRow.style.display = 'none';
    const video = document.createElement('video');
    video.src      = product.source;
    video.autoplay = true;
    video.loop     = true;
    video.muted    = true;
    video.style.cssText = 'width:180px; border-radius:15px; margin-bottom:15px;';
    document.getElementById('mediaContainer').appendChild(video);
  }
}

// 📦 Enviar formulario de envío → ir a confirm.html
document.getElementById('shippingForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const shippingData = {
    fullName:   document.getElementById('fullName').value,
    email:      document.getElementById('email').value,
    country:    document.getElementById('country').value,
    department: document.getElementById('department').value,
    city:       document.getElementById('city').value,
    address:    document.getElementById('address').value,
    zipCode:    document.getElementById('zipCode').value,
    phone:      document.getElementById('phone').value
  };

  localStorage.setItem('shippingData', JSON.stringify(shippingData));

  // Si venía por el flujo legacy (buy.js directo), migrar datos
  if (!cartData && legacyData) {
    const qty   = parseInt(legacyData.quantity) || 1;
    const total = legacyData.price * qty;
    localStorage.setItem('cartData', JSON.stringify({
      name:  legacyData.name,
      type:  legacyData.type,
      source: legacyData.source,
      color: legacyData.color,
      price: legacyData.price,
      qty,
      total
    }));
  }

  window.location.href = 'confirm.html';
});
