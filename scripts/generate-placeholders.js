const fs = require('fs');
const path = require('path');

// Product handles must match exactly what's in lib/mock-data.ts
const products = [
  { handle: 'fil-ecosse-classic-preto', name: 'Classic Solid', subtitle: 'Preto', color: '#1a1a1a' },
  { handle: 'fil-ecosse-classic-marinho', name: 'Classic Solid', subtitle: 'Azul Marinho', color: '#1a1a2e' },
  { handle: 'fil-ecosse-classic-charcoal', name: 'Classic Solid', subtitle: 'Charcoal', color: '#2c2c2c' },
  { handle: 'fil-ecosse-ribbed-preto', name: 'Ribbed', subtitle: 'Preto', color: '#1a1a1a' },
  { handle: 'fil-ecosse-ribbed-marinho', name: 'Ribbed', subtitle: 'Azul Marinho', color: '#1a1a2e' },
  { handle: 'fil-ecosse-pin-dot-marinho-creme', name: 'Pin Dot', subtitle: 'Azul Marinho / Creme', color: '#1a1a2e' },
  { handle: 'fil-ecosse-riscas-charcoal-bordeaux', name: 'Riscas Finas', subtitle: 'Charcoal / Bordeaux', color: '#2c2c2c' },
  { handle: 'fil-ecosse-executive-preto', name: 'Executive', subtitle: 'Preto', color: '#0a0a0a' },
  { handle: 'fil-ecosse-executive-marinho', name: 'Executive', subtitle: 'Azul Marinho', color: '#0a0a1e' },
  { handle: 'fil-ecosse-invisible-no-show', name: 'Invisible', subtitle: 'Preto / Creme', color: '#1a1a1a' },
  { handle: 'merino-classic-charcoal', name: 'Merino Classic', subtitle: 'Charcoal', color: '#2c2c2c' },
  { handle: 'merino-classic-camel', name: 'Merino Classic', subtitle: 'Camel', color: '#2e2a1a' },
  { handle: 'merino-classic-verde-garrafa', name: 'Merino Classic', subtitle: 'Verde Garrafa', color: '#1a2e1a' },
  { handle: 'merino-herringbone-bordeaux', name: 'Herringbone', subtitle: 'Bordeaux', color: '#2e1a1a' },
  { handle: 'merino-herringbone-marinho', name: 'Herringbone', subtitle: 'Azul Marinho', color: '#1a1a2e' },
  { handle: 'merino-argyle-charcoal-camel', name: 'Argyle', subtitle: 'Charcoal / Camel', color: '#2c2c2c' },
  { handle: 'merino-executive-charcoal', name: 'Merino Executive', subtitle: 'Charcoal', color: '#1e1e1e' },
  { handle: 'silk-essential-preto', name: 'Silk Essential', subtitle: 'Preto', color: '#0a0a0a' },
  { handle: 'silk-essential-marinho', name: 'Silk Essential', subtitle: 'Azul Marinho', color: '#0a0a1e' },
  { handle: 'silk-riscas-finas-preto-dourado', name: 'Silk Riscas', subtitle: 'Preto / Dourado', color: '#0a0a0a' },
  { handle: 'silk-executive-preto', name: 'Silk Executive', subtitle: 'Preto', color: '#050505' },
];

const dir = path.join(__dirname, '..', 'public', 'products');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

products.forEach(p => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="${p.color}"/>
  <text x="400" y="440" text-anchor="middle" font-family="Georgia, serif" font-size="44" fill="#C5A55A" opacity="0.85">${p.name}</text>
  <text x="400" y="490" text-anchor="middle" font-family="Helvetica, sans-serif" font-size="16" fill="#C5A55A" opacity="0.45">${p.subtitle}</text>
  <line x1="340" y1="520" x2="460" y2="520" stroke="#C5A55A" stroke-width="0.5" opacity="0.25"/>
  <text x="400" y="560" text-anchor="middle" font-family="Helvetica, sans-serif" font-size="11" fill="#ffffff" opacity="0.2" letter-spacing="4">LION SOCKS</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${p.handle}.svg`), svg);
});

const bundles = [
  { handle: 'the-essentials', name: 'The Essentials', subtitle: '3 PARES · CAIXA DE METAL' },
  { handle: 'the-connoisseur', name: 'The Connoisseur', subtitle: '5 PARES · CAIXA DE METAL' },
  { handle: 'the-gentlemans-collection', name: "The Gentleman's", subtitle: '12 PARES · CAIXA GAVETA' },
  { handle: 'build-your-box-3', name: 'Caixa de 3', subtitle: '3 PARES À TUA ESCOLHA' },
  { handle: 'build-your-box-5', name: 'Caixa de 5', subtitle: '5 PARES À TUA ESCOLHA' },
  { handle: 'build-your-box-12', name: 'Gaveta de 12', subtitle: '12 PARES À TUA ESCOLHA' },
];

bundles.forEach(p => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#0a0a0a"/>
  <text x="400" y="260" text-anchor="middle" font-family="Georgia, serif" font-size="38" fill="#C5A55A">${p.name}</text>
  <text x="400" y="310" text-anchor="middle" font-family="Helvetica, sans-serif" font-size="12" fill="#C5A55A" opacity="0.5" letter-spacing="3">${p.subtitle}</text>
  <line x1="340" y1="340" x2="460" y2="340" stroke="#C5A55A" stroke-width="0.5" opacity="0.25"/>
  <text x="400" y="375" text-anchor="middle" font-family="Helvetica, sans-serif" font-size="11" fill="#ffffff" opacity="0.2" letter-spacing="4">LION SOCKS</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${p.handle}.svg`), svg);
});

console.log('Done:', products.length + bundles.length, 'images generated in public/products/');
