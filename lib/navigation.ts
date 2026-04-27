// lib/navigation.ts
// Structure: Men · Woman · Box · Destaques · Sobre Nós

export type MegaColumn = {
  title: string
  links: { label: string; href: string; price?: string; muted?: boolean }[]
}

export type NavItem = {
  label: string
  href: string
  highlight?: boolean
  dropdown?:
    | { type: 'simple'; links: { label: string; href: string }[] }
    | { type: 'mega'; columns: MegaColumn[] }
}

// ── Helpers ──────────────────────────────────────────────────────

const genderColumns = (gender: 'homem' | 'mulher'): MegaColumn[] => {
  const q = (k: string, v: string) => `/loja/${gender}?${k}=${v}`
  const ver = gender === 'homem' ? 'Ver Homem' : 'Ver Mulher'
  return [
    {
      title: 'Por Família',
      links: [
        { label: 'Ribeira · Merino',        href: `/colecoes/ribeira?genero=${gender}` },
        { label: 'Ofício · Fio de Escócia', href: `/colecoes/oficio?genero=${gender}` },
        { label: 'Lello · Seda',            href: `/colecoes/lello?genero=${gender}` },
        { label: 'Reserva · Cashmere',      href: `/colecoes/reserva?genero=${gender}` },
        { label: 'Alma · Algodão Penteado', href: `/colecoes/alma?genero=${gender}` },
        { label: ver,                       href: `/loja/${gender}` },
      ],
    },
    {
      title: 'Por Corte',
      links: [
        { label: 'Mid-Calf',       href: q('corte', 'mid-calf') },
        { label: 'Over-the-Calf',  href: q('corte', 'over-calf') },
        { label: 'No-Show',        href: q('corte', 'no-show') },
        { label: 'Executive',      href: q('corte', 'executive') },
      ],
    },
    {
      title: 'Por Padrão',
      links: [
        { label: 'Liso',          href: q('padrao', 'solid') },
        { label: 'Canelado',      href: q('padrao', 'ribbed') },
        { label: 'Pin Dot',       href: q('padrao', 'pin-dot') },
        { label: 'Riscas Finas',  href: q('padrao', 'riscas') },
        { label: 'Herringbone',   href: q('padrao', 'herringbone') },
        { label: 'Argyle',        href: q('padrao', 'argyle') },
      ],
    },
    {
      title: 'Destaques',
      links: [
        { label: 'Novidades',          href: `/novidades?genero=${gender}` },
        { label: 'Best-sellers',       href: `/loja/${gender}?destaque=bestseller` },
        { label: 'Edições Limitadas',  href: `/novidades/edicoes-limitadas?genero=${gender}` },
        { label: 'Em Saldo',           href: `/sale?genero=${gender}` },
      ],
    },
  ]
}

// ── Nav ──────────────────────────────────────────────────────────

export const navigation: NavItem[] = [
  {
    label: 'Men',
    href: '/loja/homem',
    dropdown: { type: 'mega', columns: genderColumns('homem') },
  },
  {
    label: 'Woman',
    href: '/loja/mulher',
    dropdown: { type: 'mega', columns: genderColumns('mulher') },
  },
  {
    label: 'Box',
    href: '/packs',
    dropdown: {
      type: 'mega',
      columns: [
        {
          title: 'Caixas Curadas',
          links: [
            { label: 'Lion Entry Box',      href: '/packs/lion-entry-box',               price: '€24,90' },
            { label: 'Lion Essentials',     href: '/packs/lion-essentials',              price: '€34,90' },
            { label: 'Lion Connoisseur',    href: '/packs/lion-connoisseur',             price: '€69,90' },
            { label: "Lion Gentleman's",    href: '/packs/lion-gentlemans-collection',   price: '€169' },
            { label: 'Ver Todas as Caixas', href: '/packs' },
          ],
        },
        {
          title: 'Criar a Tua Caixa',
          links: [
            { label: 'Build Your Own', href: '/packs/build-your-own' },
            { label: 'Caixa de 3',     href: '/packs/build-your-box-3' },
            { label: 'Caixa de 5',     href: '/packs/build-your-box-5' },
            { label: 'Caixa de 12',    href: '/packs/build-your-box-12' },
          ],
        },
        {
          title: 'Por Ocasião',
          links: [
            { label: 'Presente',    href: '/packs?ocasiao=presente' },
            { label: 'Casamento',   href: '/packs?ocasiao=casamento' },
            { label: 'Natal',       href: '/packs?ocasiao=natal' },
            { label: 'Corporativo', href: '/packs?ocasiao=corporativo' },
          ],
        },
        {
          title: 'Embalagem',
          links: [
            { label: 'Caixa de Metal',  href: '/packs?embalagem=metal' },
            { label: 'Caixa Gaveta',    href: '/packs?embalagem=gaveta' },
            { label: 'Vale-Presente',   href: '/packs/vale-presente' },
          ],
        },
      ],
    },
  },
  {
    label: 'Destaques',
    href: '/destaques',
    highlight: true,
    dropdown: {
      type: 'mega',
      columns: [
        {
          title: 'Novidades',
          links: [
            { label: 'Toda a Colecção',           href: '/novidades' },
            { label: 'Novidades Homem',           href: '/novidades?genero=homem' },
            { label: 'Novidades Mulher',          href: '/novidades?genero=mulher' },
            { label: 'Edições Limitadas',         href: '/novidades/edicoes-limitadas' },
          ],
        },
        {
          title: 'Em Saldo',
          links: [
            { label: 'Toda a Selecção',   href: '/sale' },
            { label: 'Sale Homem',        href: '/sale?genero=homem' },
            { label: 'Sale Mulher',       href: '/sale?genero=mulher' },
            { label: 'Últimas Unidades',  href: '/sale/ultimas' },
          ],
        },
      ],
    },
  },
  {
    label: 'Sobre Nós',
    href: '/sobre',
  },
]
