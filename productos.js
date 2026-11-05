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

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

// $1.000.000 — formato de pesos colombianos, como en el catálogo
function formatCOP(n) {
  return '$' + Math.round(Number(n) || 0).toLocaleString('es-CO');
}
