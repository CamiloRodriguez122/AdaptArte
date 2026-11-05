/* =============================================
   🪑 CATÁLOGO ADAPTARQS — fuente única de productos
   ============================================= */
const CATALOG_COLORS = [
  { name: 'Azul',    hex: '#3f74b2' },
  { name: 'Naranja', hex: '#ff751f' },
  { name: 'Crema',   hex: '#f9ecb8' },
  { name: 'Café',    hex: '#8f3a00' }
];

const AJUSTE_ESTANDAR = 'Intensidad regulable; brazo ajustable para orientar la luz';

const PRODUCTS = [
  {
    id: 'velora',
    category: 'sala',
    name: 'VELORA',
    subtitle: 'Sillón con superficie de trabajo integrada',
    description: 'Prioriza la ergonomía, el confort y la funcionalidad, reuniendo asiento y espacio de apoyo en una sola pieza.',
    style: 'Minimalismo moderno',
    material: 'MDF enchapado en roble',
    delivery: '15 días',
    adjust: AJUSTE_ESTANDAR,
    colors: CATALOG_COLORS,
    price: 1000000,
    image: './Productos/catalogo/velora.jpg'
  },
  {
    id: 'seren',
    category: 'escritorios',
    name: 'SÉRÉN',
    subtitle: 'Escritorio plegable de pared',
    description: 'Escritorio plegable de pared con almacenamiento integrado, ideal para optimizar espacios reducidos.',
    style: 'Minimalismo moderno',
    material: 'MDF enchapado en roble',
    delivery: '15 días',
    adjust: AJUSTE_ESTANDAR,
    colors: CATALOG_COLORS,
    price: 800000,
    image: './Productos/catalogo/seren.jpg'
  },
  {
    id: 'nova',
    category: 'escritorios',
    name: 'NOVA',
    subtitle: 'Escritorio ergonómico',
    description: 'Estación de trabajo con silla integrada, diseño ergonómico y almacenamiento incorporado.',
    style: 'Minimalismo moderno',
    material: 'MDF enchapado en roble',
    delivery: '15 días',
    adjust: AJUSTE_ESTANDAR,
    colors: CATALOG_COLORS,
    price: 1400000,
    image: './Productos/catalogo/nova.jpg'
  },
  {
    id: 'orbe',
    category: 'comedores',
    name: 'ORBE',
    subtitle: 'Comedor plegable',
    description: 'Comedor plegable con estantería integrada, diseñado para optimizar el espacio y combinar funcionalidad con calideznatural.',
    style: 'Minimalismo moderno',
    material: 'MDF enchapado en roble',
    delivery: '15 días',
    adjust: AJUSTE_ESTANDAR,
    colors: CATALOG_COLORS,
    price: 1800000,
    image: './Productos/catalogo/orbe.jpg'
  },
  {
    id: 'altea',
    category: 'sala',
    name: 'ALTEA',
    subtitle: 'Sofá multifuncional',
    description: 'combina comodidad, almacenamiento inferior y diseño contemporáneo en madera.',
    style: 'Minimalismo moderno',
    material: 'MDF enchapado en roble',
    delivery: '15 días',
    adjust: AJUSTE_ESTANDAR,
    colors: CATALOG_COLORS,
    price: 1000000,
    image: './Productos/catalogo/altea.jpg'
  },
  {
    id: 'lumina',
    category: 'sala',
    name: 'LÚMINA',
    subtitle: 'Ligereza visual y elegancia.',
    description: 'Conjunto de mobiliario que combina ligereza visual, confort y elegancia contemporánea.',
    style: 'Minimalismo moderno',
    material: 'Metal de alta calidad y MDF enchapado en roble',
    delivery: '15 días',
    adjust: AJUSTE_ESTANDAR,
    colors: CATALOG_COLORS,
    price: 900000,
    image: './Productos/catalogo/lumina.jpg'
  },
  {
    id: 'arce',
    category: 'comedores',
    name: 'ARCÉ',
    subtitle: 'Comedor multifuncional extensible..',
    description: 'Comedor multifuncional que combina elegancia, versatilidad y almacenamiento integrado.',
    style: 'Minimalismo moderno',
    material: 'MDF enchapado en roble',
    delivery: '15 días',
    adjust: AJUSTE_ESTANDAR,
    colors: CATALOG_COLORS,
    price: 1800000,
    image: './Productos/catalogo/arce.jpg'
  },
  {
    id: 'noria',
    category: 'dormitorio',
    name: 'NÓRIA',
    subtitle: 'Cama con biblioteca integrada',
    description: 'Transmite elegancia, equilibrio y calidez mediante la integración de la cama con el almacenamiento y las estanterías laterales.',
    style: 'Minimalismo moderno',
    material: 'Contrachapado de madera',
    delivery: '15 días',
    adjust: AJUSTE_ESTANDAR,
    colors: null,
    price: 2500000,
    image: './Productos/catalogo/noria.jpg'
  },
  {
    id: 'ergon',
    category: 'comedores',
    name: 'ÉRGÓN',
    subtitle: 'Comedor circular integrado',
    description: 'Representa la geometría circular, la armonía espacial y la conexión entre las personas a través de una composición envolvente.',
    style: 'Minimalismo moderno',
    material: 'MDF enchapado en roble',
    delivery: '15 días',
    adjust: AJUSTE_ESTANDAR,
    colors: null,
    price: 3000000,
    image: './Productos/catalogo/ergon.jpg'
  },
  {
    id: 'elan',
    category: 'almacenamiento',
    name: 'ÉLAN',
    subtitle: 'Aparador',
    description: 'Expresa exclusividad y sofisticación a través de la combinación de tonos naturales, superficies limpias y detalles sutiles.',
    descAlign: 'left',
    style: 'Minimalismo moderno',
    material: 'MDF lacado verde oliva',
    delivery: '15 días',
    adjust: AJUSTE_ESTANDAR,
    colors: null,
    price: 1000000,
    image: './Productos/catalogo/elan.jpg'
  }
];

const CATEGORIES = [
  { id: 'sala',           name: 'Sala y asientos' },
  { id: 'escritorios',    name: 'Escritorios' },
  { id: 'comedores',      name: 'Comedores' },
  { id: 'dormitorio',     name: 'Dormitorio' },
  { id: 'almacenamiento', name: 'Almacenamiento' }
];

// Versiones derivadas de cada foto: liviana para galerías y "plano" (dibujo de línea)
PRODUCTS.forEach(p => {
  p.imageSm = p.image.replace('.jpg', '-sm.jpg');
  p.plano   = p.image.replace('.jpg', '-plano.png');
});

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

function categoryName(id) {
  const c = CATEGORIES.find(c => c.id === id);
  return c ? c.name : '';
}

// $1.000.000 — formato de pesos colombianos, como en el catálogo
function formatCOP(n) {
  return '$' + Math.round(Number(n) || 0).toLocaleString('es-CO');
}

/* =============================================
   🛒 CARRITO — varias piezas, guardado en el navegador
   ============================================= */
const CART_KEY  = 'adaptarqsCart';
const PROMO_KEY = 'adaptarqsPromo';
const PROMOS    = { ADAPTARQS10: 0.10 };

function readCart() {
  try {
    const items = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(items) ? items.filter(i => getProduct(i.id)) : [];
  } catch (e) {
    return [];
  }
}

function writeCart(items) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
  document.dispatchEvent(new CustomEvent('cart:change', { detail: items }));
}

function lineKey(id, color) {
  return color ? `${id}:${color}` : id;
}

function addToCart(id, color = null, qty = 1) {
  const items = readCart();
  const key   = lineKey(id, color);
  const line  = items.find(i => lineKey(i.id, i.color) === key);
  if (line) line.qty = Math.min(20, line.qty + qty);
  else items.push({ id, color, qty });
  writeCart(items);
  return items;
}

function setLineQty(key, qty) {
  const items = readCart()
    .map(i => lineKey(i.id, i.color) === key ? { ...i, qty: Math.max(1, Math.min(20, qty)) } : i);
  writeCart(items);
}

function removeLine(key) {
  writeCart(readCart().filter(i => lineKey(i.id, i.color) !== key));
}

function clearCart() {
  writeCart([]);
  try { localStorage.removeItem(PROMO_KEY); } catch (e) {}
}

function cartLines() {
  return readCart().map(i => {
    const p = getProduct(i.id);
    return { ...i, key: lineKey(i.id, i.color), product: p, total: p.price * i.qty };
  });
}

function cartCount() {
  return readCart().reduce((n, i) => n + i.qty, 0);
}

function readPromo() {
  try {
    const code = localStorage.getItem(PROMO_KEY);
    return code && PROMOS[code] ? code : null;
  } catch (e) {
    return null;
  }
}

function savePromo(code) {
  try {
    if (code) localStorage.setItem(PROMO_KEY, code);
    else localStorage.removeItem(PROMO_KEY);
  } catch (e) {}
}

function cartTotals() {
  const subtotal = cartLines().reduce((s, l) => s + l.total, 0);
  const promo    = readPromo();
  const discount = promo ? Math.round(subtotal * PROMOS[promo]) : 0;
  return { subtotal, promo, discount, total: subtotal - discount };
}
