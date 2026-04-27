export type Material = 'fil-d-ecosse' | 'la-merino' | 'seda'
export type SockType = 'mid-calf' | 'over-the-calf' | 'no-show'
export type Pattern = 'solid' | 'ribbed' | 'pin-dot' | 'riscas' | 'herringbone' | 'argyle'
export type Size = '39-42' | '42-45' | '45-48'

export type Gender = 'homem' | 'mulher' | 'unisex'

export interface Product {
  id: string
  handle: string
  name: string
  description: string
  price: number
  material: Material
  materialLabel: string
  type: SockType
  typeLabel: string
  color: string
  colorHex: string
  pattern: Pattern
  patternLabel: string
  images: string[]
  sizes: Size[]
  inStock: boolean
  collections: string[]
  badge?: string
  gender: Gender
  editorNote?: string
}

export interface Bundle {
  id: string
  handle: string
  name: string
  tagline: string
  description: string
  packaging: 'metal-box' | 'drawer-box'
  packagingLabel: string
  pairCount: number
  productIds: string[]
  originalPrice: number
  price: number
  discountPercent: number
  image: string
  featured?: boolean
}

// Helper to get local SVG image paths
const img = (handle: string) => [`/products/${handle}.svg`, `/products/${handle}.svg`]

export const products: Product[] = [
  // ─── Linha Fil d'Écosse ───────────────────────────────────────────────

  {
    id: 'fde-001',
    handle: 'fil-ecosse-classic-preto',
    name: "Ofício Classic",
    description:
      "O par essencial de qualquer roupeiro bem cuidado. Tecido em algodão egípcio mercerizado, o Fil d'Écosse Classic oferece um brilho subtil e uma leveza incomparável. Ideal para uso diário com oxford ou derby.",
    price: 15,
    material: 'fil-d-ecosse',
    materialLabel: "Fil d'Écosse",
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Preto',
    colorHex: '#1A1A1A',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('fil-ecosse-classic-preto'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['fil-d-ecosse', 'essentials', 'novidades', 'familia:oficio'],
    gender: 'homem' as const,
  },
  {
    id: 'fde-002',
    handle: 'fil-ecosse-classic-marinho',
    name: "Ofício Classic",
    description:
      "O azul marinho é a cor mais versátil de um guarda-roupa masculino. Em Fil d'Écosse, ganha uma dimensão extra com o brilho natural do algodão mercerizado. Combina com charcoal, castanho e azul marinho.",
    price: 15,
    material: 'fil-d-ecosse',
    materialLabel: "Fil d'Écosse",
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Azul Marinho',
    colorHex: '#1B2A4A',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('fil-ecosse-classic-marinho'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['fil-d-ecosse', 'essentials', 'novidades', 'familia:oficio'],
    gender: 'homem' as const,
  },
  {
    id: 'fde-003',
    handle: 'fil-ecosse-classic-charcoal',
    name: "Ofício Classic",
    description:
      "O charcoal é a alternativa sofisticada ao preto — mais rico, mais interessante. Em Fil d'Écosse, apresenta uma leveza que surpreende ao toque. A escolha certa para quem quer distinção sem esforço.",
    price: 15,
    material: 'fil-d-ecosse',
    materialLabel: "Fil d'Écosse",
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Charcoal',
    colorHex: '#3D3D3D',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('fil-ecosse-classic-charcoal'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['fil-d-ecosse', 'essentials', 'novidades', 'familia:oficio'],
    gender: 'homem' as const,
  },
  {
    id: 'fde-004',
    handle: 'fil-ecosse-ribbed-preto',
    name: "Ofício Canelado",
    description:
      "A textura canelada acrescenta profundidade visual sem comprometer a elegância. O padrão ribbed em Fil d'Écosse preto é uma escolha refinada que funciona igualmente bem no escritório ou num jantar.",
    price: 16,
    material: 'fil-d-ecosse',
    materialLabel: "Fil d'Écosse",
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Preto',
    colorHex: '#1A1A1A',
    pattern: 'ribbed',
    patternLabel: 'Texturado',
    images: img('fil-ecosse-ribbed-preto'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['fil-d-ecosse', 'novidades', 'familia:oficio'],
    gender: 'homem' as const,
  },
  {
    id: 'fde-005',
    handle: 'fil-ecosse-ribbed-marinho',
    name: "Ofício Canelado",
    description:
      "Em azul marinho, o padrão canelado cria um jogo de luz subtil que distingue este par de qualquer outra meia. A textura acrescenta interesse sem quebrar a linha — elegância com detalhe.",
    price: 16,
    material: 'fil-d-ecosse',
    materialLabel: "Fil d'Écosse",
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Azul Marinho',
    colorHex: '#1B2A4A',
    pattern: 'ribbed',
    patternLabel: 'Texturado',
    images: img('fil-ecosse-ribbed-marinho'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['fil-d-ecosse', 'novidades', 'familia:oficio'],
    gender: 'homem' as const,
  },
  {
    id: 'fde-006',
    handle: 'fil-ecosse-pin-dot-marinho-creme',
    name: "Ofício Pin Dot",
    description:
      "O pin dot é o padrão que separa quem veste bem de quem simplesmente está bem vestido. Fundo azul marinho com pontos creme minúsculos — um detalhe que só se descobre ao olhar de perto.",
    price: 17,
    material: 'fil-d-ecosse',
    materialLabel: "Fil d'Écosse",
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Azul Marinho / Creme',
    colorHex: '#1B2A4A',
    pattern: 'pin-dot',
    patternLabel: 'Pin Dot',
    images: img('fil-ecosse-pin-dot-marinho-creme'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['fil-d-ecosse', 'novidades', 'familia:oficio'],
    badge: 'Destaque', gender: 'homem' as const,
  },
  {
    id: 'fde-007',
    handle: 'fil-ecosse-riscas-charcoal-bordeaux',
    name: "Ofício Riscas Finas",
    description:
      "Riscas finas charcoal sobre bordeaux — uma combinação clássica da tradição sartorial britânica. O bordeaux oferece calor sem ostentação; as riscas mantêm a sobriedade. Para os dias em que se quer personalidade.",
    price: 17,
    material: 'fil-d-ecosse',
    materialLabel: "Fil d'Écosse",
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Charcoal / Bordeaux',
    colorHex: '#3D3D3D',
    pattern: 'riscas',
    patternLabel: 'Riscas Finas',
    images: img('fil-ecosse-riscas-charcoal-bordeaux'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['fil-d-ecosse', 'novidades', 'familia:oficio'],
    gender: 'homem' as const,
  },
  {
    id: 'fde-008',
    handle: 'fil-ecosse-executive-preto',
    name: "Ofício Executive",
    description:
      "Over-the-calf para os dias em que os detalhes importam mais. Corte alto que garante que a meia nunca desce, nunca enruga — presença discreta mas inequívoca. Em Fil d'Écosse preto, para o fato mais exigente.",
    price: 18,
    material: 'fil-d-ecosse',
    materialLabel: "Fil d'Écosse",
    type: 'over-the-calf',
    typeLabel: 'Over-the-calf',
    color: 'Preto',
    colorHex: '#1A1A1A',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('fil-ecosse-executive-preto'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['fil-d-ecosse', 'executive', 'novidades', 'familia:oficio'],
    badge: 'Executive', gender: 'homem' as const,
  },
  {
    id: 'fde-009',
    handle: 'fil-ecosse-executive-marinho',
    name: "Ofício Executive",
    description:
      "O mesmo corte impecável do Executive, em azul marinho. Para o fato navy ou o blazer sport com calças de flanela. Uma meia que sobe sem baixar — na qualidade e na posição.",
    price: 18,
    material: 'fil-d-ecosse',
    materialLabel: "Fil d'Écosse",
    type: 'over-the-calf',
    typeLabel: 'Over-the-calf',
    color: 'Azul Marinho',
    colorHex: '#1B2A4A',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('fil-ecosse-executive-marinho'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['fil-d-ecosse', 'executive', 'novidades', 'familia:oficio'],
    badge: 'Executive', gender: 'homem' as const,
  },
  {
    id: 'fde-010',
    handle: 'fil-ecosse-invisible-no-show',
    name: "Ofício Invisible",
    description:
      "A discrição absoluta. Corte no-show em Fil d'Écosse — tão leve que nem se sente, mas presente onde importa. Ideal para sapatilha, loafer ou mocassim sem meia aparente. Disponível em preto e creme.",
    price: 13,
    material: 'fil-d-ecosse',
    materialLabel: "Fil d'Écosse",
    type: 'no-show',
    typeLabel: 'No-show',
    color: 'Preto / Creme',
    colorHex: '#1A1A1A',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('fil-ecosse-invisible-no-show'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['fil-d-ecosse', 'novidades', 'familia:oficio'],
    gender: 'homem' as const,
  },

  // ─── Linha Lã Merino ─────────────────────────────────────────────────

  {
    id: 'mer-011',
    handle: 'merino-classic-charcoal',
    name: 'Ribeira Classic',
    description:
      'Lã merino ultrafina de 18,5 microns — abaixo do limiar de picada. O charcoal em merino tem uma profundidade que o algodão não consegue replicar: quente no inverno, mais fresco do que parece. Para usar o ano inteiro.',
    price: 19,
    material: 'la-merino',
    materialLabel: 'Lã Merino',
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Charcoal',
    colorHex: '#3D3D3D',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('merino-classic-charcoal'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['la-merino', 'essentials', 'novidades', 'familia:ribeira'],
    gender: 'homem' as const,
  },
  {
    id: 'mer-012',
    handle: 'merino-classic-camel',
    name: 'Ribeira Classic',
    description:
      'O camel é a cor da temporada que nunca envelhece. Em lã merino, apresenta uma riqueza tonal que muda com a luz — quase vivo. Combina naturalmente com charcoal, navy e bordeaux.',
    price: 19,
    material: 'la-merino',
    materialLabel: 'Lã Merino',
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Camel',
    colorHex: '#C19A6B',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('merino-classic-camel'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['la-merino', 'essentials', 'novidades', 'familia:ribeira'],
    badge: 'Favorito', gender: 'homem' as const,
  },
  {
    id: 'mer-013',
    handle: 'merino-classic-verde-garrafa',
    name: 'Ribeira Classic',
    description:
      'Verde garrafa — a cor que se atribui aos britânicos mas que é universal na elegância. Em merino, tem uma saturação rica e maturidade. Para quem não tem medo de cor, mas a usa com medida.',
    price: 19,
    material: 'la-merino',
    materialLabel: 'Lã Merino',
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Verde Garrafa',
    colorHex: '#2D5016',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('merino-classic-verde-garrafa'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['la-merino', 'essentials', 'novidades', 'familia:ribeira'],
    gender: 'homem' as const,
  },
  {
    id: 'mer-014',
    handle: 'merino-herringbone-bordeaux',
    name: 'Ribeira Herringbone',
    description:
      'O padrão espinha de peixe em lã merino bordeaux — textura e cor que se complementam numa combinação de inverno sofisticada. Visível ao olhar de perto; discreto à distância. Assim deve ser.',
    price: 21,
    material: 'la-merino',
    materialLabel: 'Lã Merino',
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Bordeaux',
    colorHex: '#722F37',
    pattern: 'herringbone',
    patternLabel: 'Herringbone',
    images: img('merino-herringbone-bordeaux'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['la-merino', 'novidades', 'familia:ribeira'],
    badge: 'Destaque', gender: 'homem' as const,
  },
  {
    id: 'mer-015',
    handle: 'merino-herringbone-marinho',
    name: 'Ribeira Herringbone',
    description:
      'Espinha de peixe em azul marinho merino — clássico sem ser banal. A estrutura do padrão cria uma tridimensionalidade que o liso não tem. Para quem quer textura com contenção.',
    price: 21,
    material: 'la-merino',
    materialLabel: 'Lã Merino',
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Azul Marinho',
    colorHex: '#1B2A4A',
    pattern: 'herringbone',
    patternLabel: 'Herringbone',
    images: img('merino-herringbone-marinho'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['la-merino', 'novidades', 'familia:ribeira'],
    gender: 'homem' as const,
  },
  {
    id: 'mer-016',
    handle: 'merino-argyle-charcoal-camel',
    name: 'Ribeira Argyle',
    description:
      'O argyle é o padrão mais carregado de história na mearia clássica. Charcoal com losangos camel — uma combinação de outono que funciona do campo à cidade. Para os que conhecem os seus clássicos.',
    price: 22,
    material: 'la-merino',
    materialLabel: 'Lã Merino',
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Charcoal / Camel',
    colorHex: '#3D3D3D',
    pattern: 'argyle',
    patternLabel: 'Argyle',
    images: img('merino-argyle-charcoal-camel'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['la-merino', 'novidades', 'familia:ribeira'],
    badge: 'Clássico', gender: 'homem' as const,
  },
  {
    id: 'mer-017',
    handle: 'merino-executive-charcoal',
    name: 'Ribeira Executive',
    description:
      'Over-the-calf em lã merino charcoal — o máximo da funcionalidade e do conforto. Permanece no lugar ao longo do dia, regula a temperatura e não pica. Para o fato mais exigente nos dias mais longos.',
    price: 22,
    material: 'la-merino',
    materialLabel: 'Lã Merino',
    type: 'over-the-calf',
    typeLabel: 'Over-the-calf',
    color: 'Charcoal',
    colorHex: '#3D3D3D',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('merino-executive-charcoal'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['la-merino', 'executive', 'novidades', 'familia:ribeira'],
    badge: 'Executive', gender: 'homem' as const,
  },

  // ─── Linha Seda ──────────────────────────────────────────────────────

  {
    id: 'sed-018',
    handle: 'silk-essential-preto',
    name: 'Lello Essential',
    description:
      'Seda pura para os que sabem. Uma leveza e suavidade que nenhuma fibra sintética consegue imitar — apenas a natureza produz algo assim. O preto em seda tem uma profundidade especial, quase líquida.',
    price: 23,
    material: 'seda',
    materialLabel: 'Seda',
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Preto',
    colorHex: '#1A1A1A',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('silk-essential-preto'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['seda', 'essentials', 'novidades', 'familia:lello'],
    badge: 'Premium', gender: 'homem' as const,
  },
  {
    id: 'sed-019',
    handle: 'silk-essential-marinho',
    name: 'Lello Essential',
    description:
      'Azul marinho em seda — um par que transforma qualquer fato. A seda tem um brilho subtil que capta a luz de forma que o algodão não consegue. Reserve para as grandes ocasiões, ou para todos os dias se quiser.',
    price: 23,
    material: 'seda',
    materialLabel: 'Seda',
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Azul Marinho',
    colorHex: '#1B2A4A',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('silk-essential-marinho'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['seda', 'essentials', 'novidades', 'familia:lello'],
    badge: 'Premium', gender: 'homem' as const,
  },
  {
    id: 'sed-020',
    handle: 'silk-riscas-finas-preto-dourado',
    name: 'Lello Riscas Finas',
    description:
      'Riscas douradas sobre seda preta — um par de cerimónia. Para o fato de gala, o casamento ou qualquer ocasião em que se quer ser o único a saber que está a usar algo verdadeiramente especial.',
    price: 25,
    material: 'seda',
    materialLabel: 'Seda',
    type: 'mid-calf',
    typeLabel: 'Mid-calf',
    color: 'Preto / Dourado',
    colorHex: '#1A1A1A',
    pattern: 'riscas',
    patternLabel: 'Riscas Finas',
    images: img('silk-riscas-finas-preto-dourado'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['seda', 'novidades', 'familia:lello'],
    badge: 'Edição Limitada', gender: 'homem' as const,
  },
  {
    id: 'sed-021',
    handle: 'silk-executive-preto',
    name: 'Lello Executive',
    description:
      'O pináculo. Seda pura, corte over-the-calf, preto — uma declaração de intenções para quem veste como se cada detalhe importasse. Porque importa.',
    price: 25,
    material: 'seda',
    materialLabel: 'Seda',
    type: 'over-the-calf',
    typeLabel: 'Over-the-calf',
    color: 'Preto',
    colorHex: '#1A1A1A',
    pattern: 'solid',
    patternLabel: 'Liso',
    images: img('silk-executive-preto'),
    sizes: ['39-42', '42-45', '45-48'],
    inStock: true,
    collections: ['seda', 'executive', 'novidades', 'familia:lello'],
    badge: 'Premium', gender: 'homem' as const,
  },
]

// ─── Bundles / Packs ─────────────────────────────────────────────────────

export const bundles: Bundle[] = [
  {
    id: 'pack-000',
    handle: 'lion-entry-box',
    name: 'Lion Entry Box',
    tagline: '2 pares | Caixa de metal',
    description:
      'O primeiro par. Dois essenciais em Ofício — preto e marinho — numa caixa de metal com logo embossed. O ponto de entrada no universo Lion Socks.',
    packaging: 'metal-box',
    packagingLabel: 'Caixa de Metal',
    pairCount: 2,
    productIds: ['fde-001', 'fde-002'],
    originalPrice: 30,
    price: 24.9,
    discountPercent: 17,
    image: '/products/lion-entry-box.svg',
    featured: true,
  },
  {
    id: 'pack-001',
    handle: 'lion-essentials',
    name: 'Lion Essentials',
    tagline: '3 pares | Caixa de metal',
    description:
      "A trindade perfeita. Preto, marinho e charcoal em Fil d'Écosse — os três essenciais que resolvem qualquer combinação. Em caixa de metal com logo embossed. O ponto de partida.",
    packaging: 'metal-box',
    packagingLabel: 'Caixa de Metal',
    pairCount: 3,
    productIds: ['fde-001', 'fde-002', 'fde-003'],
    originalPrice: 45,
    price: 34.9,
    discountPercent: 22,
    image: '/products/the-essentials.svg',
    featured: true,
  },
  {
    id: 'pack-002',
    handle: 'lion-connoisseur',
    name: 'Lion Connoisseur',
    tagline: '5 pares | Caixa de metal',
    description:
      "Para o conhecedor. Cinco pares curados que cobrem o espectro — liso, texturado, padrão — em Fil d'Écosse e Lã Merino. Em caixa de metal premium. Uma introdução completa ao universo Lion Socks.",
    packaging: 'metal-box',
    packagingLabel: 'Caixa de Metal',
    pairCount: 5,
    productIds: ['fde-001', 'fde-005', 'mer-011', 'fde-006', 'mer-014'],
    originalPrice: 88,
    price: 69.9,
    discountPercent: 21,
    image: '/products/the-connoisseur.svg',
    featured: true,
  },
  {
    id: 'pack-003',
    handle: 'lion-gentlemans-collection',
    name: "Lion Gentleman's Collection",
    tagline: '12 pares | Caixa gaveta',
    description:
      'A colecção completa. Doze pares que cobrem cada ocasião, cada estação, cada humor — do Fil d\'Écosse diário à seda de cerimónia. Em caixa gaveta de luxo com espuma recortada. O melhor presente para si ou para quem merece.',
    packaging: 'drawer-box',
    packagingLabel: 'Caixa Gaveta',
    pairCount: 12,
    productIds: [
      'fde-001', 'fde-002', 'fde-003',
      'fde-004', 'fde-005',
      'mer-011', 'mer-012',
      'fde-006', 'fde-007',
      'mer-014',
      'mer-016',
      'sed-018',
    ],
    originalPrice: 215,
    price: 169,
    discountPercent: 21,
    image: '/products/the-gentlemans-collection.svg',
    featured: true,
  },
  {
    id: 'byb-3',
    handle: 'build-your-box-3',
    name: 'Monta a Tua Caixa de 3',
    tagline: '3 pares à tua escolha | Caixa de metal',
    description: 'Escolhe 3 pares de qualquer linha e recebe numa caixa de metal com 10% de desconto.',
    packaging: 'metal-box',
    packagingLabel: 'Caixa de Metal',
    pairCount: 3,
    productIds: [],
    originalPrice: 0,
    price: 0,
    discountPercent: 10,
    image: '/products/build-your-box-3.svg',
  },
  {
    id: 'byb-5',
    handle: 'build-your-box-5',
    name: 'Monta a Tua Caixa de 5',
    tagline: '5 pares à tua escolha | Caixa de metal',
    description: 'Escolhe 5 pares de qualquer linha e recebe numa caixa de metal com 12% de desconto.',
    packaging: 'metal-box',
    packagingLabel: 'Caixa de Metal',
    pairCount: 5,
    productIds: [],
    originalPrice: 0,
    price: 0,
    discountPercent: 12,
    image: '/products/build-your-box-5.svg',
  },
  {
    id: 'byb-12',
    handle: 'build-your-box-12',
    name: 'Monta a Tua Gaveta de 12',
    tagline: '12 pares à tua escolha | Caixa gaveta',
    description: 'Escolhe 12 pares de qualquer linha e recebe em caixa gaveta de luxo com 17% de desconto.',
    packaging: 'drawer-box',
    packagingLabel: 'Caixa Gaveta',
    pairCount: 12,
    productIds: [],
    originalPrice: 0,
    price: 0,
    discountPercent: 17,
    image: '/products/build-your-box-12.svg',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────

export function getProductsByCollection(collectionHandle: string): Product[] {
  // Support family slugs (ribeira, oficio, etc) via familia:<slug> tag
  const familyTag = `familia:${collectionHandle}`
  return products.filter(
    (p) => p.collections.includes(collectionHandle) || p.collections.includes(familyTag)
  )
}

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle)
}

export function getFeaturedBundles(): Bundle[] {
  return bundles.filter((b) => b.featured)
}

export function getBundleByHandle(handle: string): Bundle | undefined {
  return bundles.find((b) => b.handle === handle)
}

export const collections = [
  { handle: 'fil-d-ecosse', name: "Fil d'Écosse", description: 'Algodão egípcio mercerizado — leveza e brilho subtil.' },
  { handle: 'la-merino', name: 'Lã Merino', description: 'Lã ultrafina termorreguladora — conforto em todas as estações.' },
  { handle: 'seda', name: 'Seda', description: 'Seda pura — o epítome do luxo em meias.' },
  { handle: 'executive', name: 'Executive', description: 'Corte over-the-calf — permanece no lugar, sempre.' },
  { handle: 'essentials', name: 'Essentials', description: 'Os imprescindíveis — lisos, versáteis, perfeitos.' },
  { handle: 'novidades', name: 'Novidades', description: 'As últimas chegadas à Lion Socks.' },
  { handle: 'homem', name: 'Homem', description: 'Meias premium para homem — elegância em cada detalhe.' },
  { handle: 'mulher', name: 'Mulher', description: 'Meias premium para mulher — conforto refinado.' },
  { handle: 'classica', name: 'Coleção Clássica', description: 'O essencial, reinventado. Lisos e canelados atemporais.' },
  { handle: 'edicoes-limitadas', name: 'Edições Limitadas', description: 'Exclusivo, por definição. Produção limitada.' },
  { handle: 'atlantico', name: 'Atlântico', description: 'A costa que nos define. Azul profundo, areia molhada, verde de algas. O oceano, traduzido em fio.' },
  { handle: 'granito', name: 'Granito', description: 'A pedra que construiu o Porto. Cinza denso, bordeaux de Vinho do Porto, madeira de barricas. O Porto no inverno.' },
  // Famílias de material (espelham famílias em lib/families.ts)
  { handle: 'ribeira', name: 'Ribeira', description: 'A fibra que se adapta. Lã merino extra-fina — termorreguladora, anti-odor, não pica.' },
  { handle: 'oficio', name: 'Ofício', description: 'Algodão transformado pelo fogo. Fio de escócia mercerizado — brilho subtil, zero pilling.' },
  { handle: 'lello', name: 'Lello', description: 'O toque que desliza. Seda natural, leveza imperceptível.' },
  { handle: 'reserva', name: 'Reserva', description: 'A fibra mais fina do mundo. Cashmere da Mongólia, 8× mais isolante que lã.' },
  { handle: 'alma', name: 'Alma', description: 'A base honesta. Algodão de fibra longa, penteado — sem dramas, sem compromissos.' },
]

export function getProductsByGender(gender: Gender): Product[] {
  return products.filter((p) => p.gender === gender || p.gender === 'unisex')
}
