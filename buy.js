// ✅ Cargar datos del producto seleccionado
const productData = JSON.parse(localStorage.getItem("selectedProduct"));

const img = document.querySelector('.image-section img');
const videoContainer = document.createElement('video');
const colorGroup = document.getElementById("colorGroup");
let selectedColor = 'verde';

// Si hay un producto en localStorage, configúralo
if (productData) {
  const nameElem = document.createElement('h2');
  nameElem.textContent = productData.name;
  document.querySelector('.config-section').prepend(nameElem);

  // Mostrar imagen o video según el tipo
  if (productData.type === "image") {
    img.src = productData.source;
    img.style.display = "block";
  } else if (productData.type === "video") {
    videoContainer.src = productData.source;
    videoContainer.autoplay = true;
    videoContainer.loop = true;
    videoContainer.muted = true;
    videoContainer.style.borderRadius = "20px";
    videoContainer.style.width = "100%";
    videoContainer.style.display = "block";
    img.style.display = "none";
    document.querySelector('.image-section').appendChild(videoContainer);
    // Ocultar selector de colores si es un video
    if (colorGroup) colorGroup.style.display = "none";
  }
}

// 🎨 Selección de color (solo si existe el grupo de colores)
const colors = document.querySelectorAll('.color');
if (colors.length > 0) {
  colors.forEach(c => {
    c.addEventListener('click', () => {
      colors.forEach(cc => cc.classList.remove('selected'));
      c.classList.add('selected');
      selectedColor = c.dataset.color;
      img.src = `silla_${selectedColor}.jpg`;
    });
  });
}

// 📏 Redimensionar imagen según altura/ancho (solo aplica si es imagen)
document.getElementById('height').addEventListener('input', resizeImage);
document.getElementById('width').addEventListener('input', resizeImage);

function resizeImage() {
  if (productData && productData.type === "image") {
    const h = Math.max(30, document.getElementById('height').value);
    const w = Math.max(30, document.getElementById('width').value);
    img.style.width = `${w * 2.5}px`;
    img.style.height = `${h * 2.5}px`;
    img.classList.add('animate');
    setTimeout(() => img.classList.remove('animate'), 400);
  }
}

// 🛒 Agregar al carrito (guardar datos y redirigir)
document.getElementById('addToCartBtn').addEventListener('click', () => {
  const product = {
    name: productData?.name || "Silla Plegable AdaptArte",
    type: productData?.type || "image",
    source: productData?.source || img.src,
    price: productData?.price || 100,
    height: document.getElementById('height').value,
    width: document.getElementById('width').value,
    quantity: document.getElementById('quantity').value,
    color: selectedColor
  };

  // Guardar en localStorage para checkout
  localStorage.setItem('adaptarteProduct', JSON.stringify(product));
  window.location.href = 'checkout.html';
});
