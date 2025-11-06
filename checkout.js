// 🪑 Recuperar producto guardado
const productData = JSON.parse(localStorage.getItem('adaptarteProduct'));
const mediaContainer = document.getElementById('mediaContainer');
const img = document.getElementById('productImage');
const colorRow = document.getElementById('colorRow');

if (productData) {
  document.getElementById('productName').textContent = productData.name;
  document.getElementById('productDimensions').textContent = `${productData.height} cm alto × ${productData.width} cm ancho`;
  document.getElementById('productQuantity').textContent = `${productData.quantity} ${productData.quantity == 1 ? 'unidad' : 'unidades'}`;

  const total = productData.price * productData.quantity;
  document.getElementById('productTotal').textContent = `$${total.toLocaleString('es-CO')} COP`;

  // Mostrar imagen o video según el tipo
  if (productData.type === "image") {
    img.src = `silla_${productData.color}.jpg`;
    document.getElementById('productColor').textContent = productData.color.charAt(0).toUpperCase() + productData.color.slice(1);
  } else if (productData.type === "video") {
    // Crear video dinámicamente
    img.remove();
    colorRow.style.display = "none";

    const video = document.createElement('video');
    video.src = productData.source;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.style.width = "100%";
    video.style.borderRadius = "15px";
    video.controls = false;
    mediaContainer.appendChild(video);
  }
}

// 💰 Procesar pago
document.getElementById('paymentForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = document.querySelector('.btn.pay');
  btn.disabled = true;
  btn.textContent = 'Procesando...';

  setTimeout(() => {
    alert('✅ Pago procesado con éxito. ¡Gracias por confiar en AdaptArte!');
    localStorage.removeItem('adaptarteProduct');
    window.location.href = 'index.html';
  }, 2500);
});
