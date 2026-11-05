// 🚚 Entrega: resumen del pedido, datos de envío y validación
// Departamentos y ciudades por país
const geoData = {
      "Colombia": {
        "Amazonas":               ["Leticia","Puerto Nariño","La Chorrera"],
        "Antioquia":              ["Medellín","Bello","Itagüí","Envigado","Rionegro","Apartadó","Turbo","Caucasia","Marinilla","Sabaneta"],
        "Arauca":                 ["Arauca","Arauquita","Fortul","Puerto Rondón","Saravena","Tame"],
        "Atlántico":              ["Barranquilla","Soledad","Malambo","Sabanalarga","Baranoa","Galapa","Manatí","Palmar de Varela"],
        "Bogotá D.C.":            ["Bogotá"],
        "Bolívar":                ["Cartagena","Magangué","Turbaco","El Carmen de Bolívar","Mompox","San Juan Nepomuceno","Arjona"],
        "Boyacá":                 ["Tunja","Duitama","Sogamoso","Chiquinquirá","Paipa","Moniquirá","Villa de Leyva","Yopal"],
        "Caldas":                 ["Manizales","La Dorada","Chinchiná","Riosucio","Anserma","Manzanares","Villamaría"],
        "Caquetá":                ["Florencia","San Vicente del Caguán","Puerto Rico","Belén de los Andaquíes","Cartagena del Chairá"],
        "Casanare":               ["Yopal","Aguazul","Villanueva","Tauramena","Orocué","San Luis de Palenque"],
        "Cauca":                  ["Popayán","Santander de Quilichao","Puerto Tejada","Patía","Bolívar","El Tambo","Miranda"],
        "Cesar":                  ["Valledupar","Aguachica","Bosconia","Codazzi","La Paz","El Copey","Chimichagua"],
        "Chocó":                  ["Quibdó","Istmina","Riosucio","Unguía","Nuquí","Bahía Solano","Tadó"],
        "Córdoba":                ["Montería","Lorica","Cereté","Sahagún","Montelíbano","Planeta Rica","Tierralta","Ciénaga de Oro"],
        "Cundinamarca":           ["Soacha","Facatativá","Zipaquirá","Chía","Fusagasugá","Mosquera","Madrid","Funza","Cajicá"],
        "Guainía":                ["Inírida","Barranco Minas","Mapiripana"],
        "Guaviare":               ["San José del Guaviare","El Retorno","Calamar","Miraflores"],
        "Huila":                  ["Neiva","Pitalito","Garzón","La Plata","Campoalegre","Rivera","Palermo"],
        "La Guajira":             ["Riohacha","Maicao","Uribia","Manaure","Fonseca","Barrancas","Albania"],
        "Magdalena":              ["Santa Marta","Ciénaga","Fundación","El Banco","Aracataca","Plato","Pivijay"],
        "Meta":                   ["Villavicencio","Acacías","Granada","Puerto López","San Martín","Cumaral","Puerto Gaitán"],
        "Nariño":                 ["Pasto","Tumaco","Ipiales","Túquerres","La Unión","Samaniego","El Charco"],
        "Norte de Santander":     ["Cúcuta","Ocaña","Pamplona","Villa del Rosario","Los Patios","Tibú","El Zulia"],
        "Putumayo":               ["Mocoa","Puerto Asís","Orito","Valle del Guamuez","Puerto Caicedo","Sibundoy"],
        "Quindío":                ["Armenia","Calarcá","Montenegro","Quimbaya","Circasia","La Tebaida","Filandia"],
        "Risaralda":              ["Pereira","Dosquebradas","Santa Rosa de Cabal","La Virginia","Quinchía","Marsella"],
        "San Andrés y Providencia":["San Andrés","Providencia"],
        "Santander":              ["Bucaramanga","Floridablanca","Girón","Piedecuesta","Barrancabermeja","San Gil","Vélez","Socorro"],
        "Sucre":                  ["Sincelejo","Corozal","Sampués","San Marcos","Tolú","Lorica","Morroa"],
        "Tolima":                 ["Ibagué","Espinal","Melgar","Honda","Chaparral","Líbano","Girardot","Armero"],
        "Valle del Cauca":        ["Cali","Buenaventura","Palmira","Tuluá","Cartago","Buga","Jamundí","Yumbo","Candelaria"],
        "Vaupés":                 ["Mitú","Carurú","Taraira"],
        "Vichada":                ["Puerto Carreño","La Primavera","Cumaribo","Santa Rosalía"],
      },
      "México": {
        "Ciudad de México":  ["Cuauhtémoc","Iztapalapa","Gustavo A. Madero","Coyoacán","Xochimilco"],
        "Jalisco":           ["Guadalajara","Zapopan","Tlaquepaque","Tonalá","Puerto Vallarta"],
        "Nuevo León":        ["Monterrey","San Nicolás","Apodaca","Guadalupe","San Pedro Garza García"],
        "Estado de México":  ["Ecatepec","Nezahualcóyotl","Toluca","Naucalpan","Tlalnepantla"],
        "Puebla":            ["Puebla","Tehuacán","San Martín Texmelucan","Atlixco"],
        "Veracruz":          ["Veracruz","Xalapa","Córdoba","Coatzacoalcos","Poza Rica"],
        "Yucatán":           ["Mérida","Valladolid","Progreso","Tizimín"],
        "Guanajuato":        ["León","Irapuato","Guanajuato","Salamanca","Celaya"],
      },
      "Venezuela": {
        "Distrito Capital":  ["Caracas","Antimano","El Valle"],
        "Miranda":           ["Petare","Guarenas","Guatire","Baruta","Chacao"],
        "Zulia":             ["Maracaibo","Cabimas","Ciudad Ojeda","San Francisco"],
        "Carabobo":          ["Valencia","Puerto Cabello","Guacara","Naguanabo"],
        "Aragua":            ["Maracay","Turmero","La Victoria","Cagua"],
        "Lara":              ["Barquisimeto","Cabudare","El Tocuyo","Quíbor"],
      },
      "Ecuador": {
        "Pichincha":         ["Quito","Cayambe","Mejía","Rumiñahui","Pedro Moncayo"],
        "Guayas":            ["Guayaquil","Samborondón","Milagro","Durán","Daule"],
        "Azuay":             ["Cuenca","Gualaceo","Santa Isabel","Paute"],
        "Manabí":            ["Portoviejo","Manta","Chone","Jipijapa","Bahía de Caráquez"],
        "El Oro":            ["Machala","Santa Rosa","Pasaje","Huaquillas"],
      },
      "Perú": {
        "Lima":              ["Lima","Callao","San Juan de Lurigancho","San Martín de Porres","Ate"],
        "Arequipa":          ["Arequipa","Cayma","Cerro Colorado","Paucarpata","Socabaya"],
        "La Libertad":       ["Trujillo","Víctor Larco","El Porvenir","Florencia de Mora"],
        "Piura":             ["Piura","Castilla","Catacaos","Talara","Paita"],
        "Cusco":             ["Cusco","San Sebastián","Wanchaq","Santiago","Sicuani"],
      },
      "Chile": {
        "Región Metropolitana": ["Santiago","Puente Alto","Maipú","La Florida","Las Condes"],
        "Valparaíso":        ["Valparaíso","Viña del Mar","Quilpué","Villa Alemana","San Antonio"],
        "Biobío":            ["Concepción","Talcahuano","Los Ángeles","Coronel","Chiguayante"],
        "La Araucanía":      ["Temuco","Padre Las Casas","Victoria","Angol","Nueva Imperial"],
      },
      "Argentina": {
        "Buenos Aires":      ["La Plata","Mar del Plata","Quilmes","Lanús","General Pueyrredón"],
        "CABA":              ["Palermo","Belgrano","Recoleta","Caballito","San Telmo"],
        "Córdoba":           ["Córdoba","Villa María","Río Cuarto","San Francisco","Villa Carlos Paz"],
        "Santa Fe":          ["Rosario","Santa Fe","Rafaela","Venado Tuerto","Villa Gobernador Gálvez"],
        "Mendoza":           ["Mendoza","Godoy Cruz","San Rafael","Luján de Cuyo","Maipú"],
      }
    };

// Días de entrega: 15 base, +5 por cada unidad adicional
function deliveryDays(units) {
  return 15 + Math.max(0, units - 1) * 5;
}

const lines = cartLines();
const view  = document.getElementById('checkoutView');
document.getElementById('checkoutEmpty').hidden = lines.length > 0;
view.hidden = lines.length === 0;

// 🧾 Resumen del pedido
document.getElementById('summaryItems').innerHTML = lines.map(l => `
  <li>
    <img src="${l.product.imageSm}" alt="">
    <span><em>${l.product.name}</em><small>${l.qty} × ${formatCOP(l.product.price)}${l.color ? ' · ' + l.color : ''}</small></span>
    <span>${formatCOP(l.total)}</span>
  </li>`).join('');

const totals = cartTotals();
const units  = lines.reduce((n, l) => n + l.qty, 0);
document.getElementById('subtotal').textContent = formatCOP(totals.subtotal);
document.getElementById('total').textContent    = formatCOP(totals.total);
document.getElementById('discountRow').hidden   = !totals.promo;
if (totals.promo) {
  document.getElementById('promoLabel').textContent = `(${totals.promo})`;
  document.getElementById('discount').textContent   = '−' + formatCOP(totals.discount);
}
document.getElementById('deliveryNote').textContent = `Entrega estimada: ${deliveryDays(units)} días.`;

// 🌎 País → departamento → ciudad
const countrySelect = document.getElementById('country');
const deptGroup     = document.getElementById('deptGroup');
const deptSelect    = document.getElementById('department');
const cityGroup     = document.getElementById('cityGroup');
const citySelect    = document.getElementById('city');

function fillSelect(select, values) {
  select.innerHTML = '<option value="">Seleccionar…</option>' +
    values.map(v => `<option value="${v}">${v}</option>`).join('');
}

countrySelect.addEventListener('change', () => {
  const country = countrySelect.value;
  cityGroup.hidden = true;
  fillSelect(citySelect, []);
  if (country && geoData[country]) {
    fillSelect(deptSelect, Object.keys(geoData[country]));
    deptGroup.hidden = false;
  } else {
    deptGroup.hidden = true;
  }
});

deptSelect.addEventListener('change', () => {
  const cities = (geoData[countrySelect.value] || {})[deptSelect.value];
  if (cities) {
    fillSelect(citySelect, cities);
    cityGroup.hidden = false;
  } else {
    cityGroup.hidden = true;
  }
});

// ✅ Validación: al salir de cada campo y al enviar
const form = document.getElementById('shippingForm');
const errorSummary = document.getElementById('errorSummary');

const RULES = {
  fullName:   v => v.trim().split(/\s+/).length >= 2 || 'Escribe tu nombre y apellido.',
  email:      v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Escribe un correo válido, por ejemplo nombre@correo.com.',
  phone:      v => v.replace(/\D/g, '').length >= 7 || 'Escribe un teléfono de al menos 7 dígitos.',
  country:    v => !!v || 'Selecciona el país de entrega.',
  department: v => !!v || 'Selecciona el departamento o estado.',
  city:       v => !!v || 'Selecciona la ciudad.',
  address:    v => v.trim().length >= 6 || 'Escribe la dirección completa, con número y apartamento si aplica.'
};

function validateField(id) {
  const el = document.getElementById(id);
  const group = el.closest('.field');
  if (group.hidden) return true;
  const result = RULES[id](el.value);
  const ok = result === true;
  group.classList.toggle('is-invalid', !ok);
  el.setAttribute('aria-invalid', !ok);
  document.getElementById(id + '-msg').textContent = ok ? '' : result;
  return ok;
}

Object.keys(RULES).forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('blur', () => { if (el.value) validateField(id); });
  el.addEventListener('change', () => { if (el.closest('.field').classList.contains('is-invalid')) validateField(id); });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const invalid = Object.keys(RULES).filter(id => !validateField(id));

  if (invalid.length) {
    errorSummary.hidden = false;
    errorSummary.innerHTML = `Revisa ${invalid.length === 1 ? 'este campo' : 'estos campos'} para continuar: ` +
      invalid.map(id => `<a href="#${id}">${document.querySelector(`label[for="${id}"]`).firstChild.textContent.trim()}</a>`).join(', ') + '.';
    errorSummary.focus();
    return;
  }
  errorSummary.hidden = true;

  const val = id => document.getElementById(id).value.trim();
  const shipping = {
    fullName: val('fullName'), email: val('email'), phone: val('phone'),
    country: val('country'), department: val('department'), city: val('city'),
    address: val('address'), zipCode: val('zipCode')
  };

  const now = new Date();
  const order = {
    number: 'AQ-' + now.getFullYear().toString().slice(2) +
      String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0') + '-' +
      String(Math.floor(1000 + Math.random() * 9000)),
    date: now.toISOString(),
    lines: lines.map(l => ({ id: l.id, name: l.product.name, subtitle: l.product.subtitle, color: l.color, qty: l.qty, price: l.product.price, total: l.total })),
    totals,
    days: deliveryDays(units),
    shipping
  };

  try {
    localStorage.setItem('adaptarqsLastOrder', JSON.stringify(order));
    localStorage.setItem('shippingData', JSON.stringify(shipping));
  } catch (err) {}
  clearCart();
  window.location.href = 'confirm.html';
});
