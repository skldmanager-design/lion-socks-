// lib/navigation.ts

export type MegaMenuColumn = {
  title: string
  links: { label: string; href: string; price?: string }[]
}

export type EditorialSlot = {
  overline: string
  headline: string // palavra italic principal
  sublinha: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export type NavItem = {
  label: string
  href: string
  highlight?: boolean // SALE a dourado
  dropdown?:
    | { type: 'simple'; links: { label: string; href: string }[] }
    | { type: 'mega'; columns: MegaMenuColumn[]; editorial: EditorialSlot }
}

export const navigation: NavItem[] = [
  {
    label: 'Novidades',
    href: '/novidades',
    dropdown: {
      type: 'simple',
      links: [
        { label: 'Últimas Chegadas', href: '/novidades/ultimas' },
        { label: 'Colecção Primavera 2026', href: '/novidades/primavera-2026' },
        { label: 'Edições Limitadas', href: '/novidades/edicoes-limitadas' },
        { label: 'Pré-venda', href: '/novidades/pre-venda' },
      ],
    },
  },
  {
    label: 'Homem',
    href: '/loja/homem',
    dropdown: {
      type: 'mega',
      columns: [
        {
          title: 'Por Colecção',
          links: [
            { label: 'Todas as Meias', href: '/loja/homem' },
            { label: 'Clássica', href: '/loja/homem/classica' },
            { label: 'Executive', href: '/loja/homem/executive' },
            { label: 'Sport & Casual', href: '/loja/homem/sport' },
            { label: 'Edições Limitadas', href: '/loja/homem/edicoes-limitadas' },
          ],
        },
        {
          title: 'Por Material',
          links: [
            { label: "Fil d'Écosse", href: '/loja/homem?material=fil-ecosse' },
            { label: 'Lã Merino', href: '/loja/homem?material=merino' },
            { label: 'Seda', href: '/loja/homem?material=seda' },
            { label: 'Algodão Pima', href: '/loja/homem?material=pima' },
            { label: 'Cashmere', href: '/loja/homem?material=cashmere' },
          ],
        },
        {
          title: 'Por Corte',
          links: [
            { label: 'Mid-Calf', href: '/loja/homem?corte=mid-calf' },
            { label: 'Over-the-Calf', href: '/loja/homem?corte=over-calf' },
            { label: 'Invisível', href: '/loja/homem?corte=invisivel' },
            { label: 'Casa', href: '/loja/homem?corte=casa' },
          ],
        },
      ],
      editorial: {
        overline: 'THE',
        headline: 'Executive',
        sublinha: 'COLLECTION',
        body: 'Meias de gentleman para momentos que exigem presença.',
        ctaLabel: 'Descobrir Homem',
        ctaHref: '/loja/homem/executive',
      },
    },
  },
  {
    label: 'Mulher',
    href: '/loja/mulher',
    dropdown: {
      type: 'mega',
      columns: [
        {
          title: 'Por Colecção',
          links: [
            { label: 'Todas as Meias', href: '/loja/mulher' },
            { label: 'Clássica', href: '/loja/mulher/classica' },
            { label: 'Essentials', href: '/loja/mulher/essentials' },
            { label: 'Edições Limitadas', href: '/loja/mulher/edicoes-limitadas' },
          ],
        },
        {
          title: 'Por Material',
          links: [
            { label: "Fil d'Écosse", href: '/loja/mulher?material=fil-ecosse' },
            { label: 'Lã Merino', href: '/loja/mulher?material=merino' },
            { label: 'Seda', href: '/loja/mulher?material=seda' },
            { label: 'Cashmere', href: '/loja/mulher?material=cashmere' },
          ],
        },
        {
          title: 'Por Estilo',
          links: [
            { label: 'Discreta', href: '/loja/mulher?estilo=discreta' },
            { label: 'Midi', href: '/loja/mulher?estilo=midi' },
            { label: 'Acima do Joelho', href: '/loja/mulher?estilo=joelho' },
            { label: 'Casa', href: '/loja/mulher?estilo=casa' },
            { label: 'Meia-Meia', href: '/loja/mulher?estilo=meia-meia' },
          ],
        },
      ],
      editorial: {
        overline: 'COLECÇÃO',
        headline: 'Mulher',
        sublinha: 'LION SOCKS',
        body: 'Refinamento feminino. Conforto absoluto.',
        ctaLabel: 'Descobrir Mulher',
        ctaHref: '/loja/mulher',
      },
    },
  },
  {
    label: 'Packs',
    href: '/packs',
    dropdown: {
      type: 'mega',
      columns: [
        {
          title: 'Colecções Prontas',
          links: [
            { label: 'Todos os Packs', href: '/packs' },
            { label: 'The Essentials', href: '/packs/essentials', price: '€39' },
            { label: 'The Connoisseur', href: '/packs/connoisseur', price: '€75' },
            { label: "The Gentleman's", href: '/packs/gentlemans', price: '€175' },
          ],
        },
        {
          title: 'Criar Pack',
          links: [
            { label: 'Build Your Own', href: '/packs/build-your-own' },
          ],
        },
      ],
      editorial: {
        overline: 'PACKS &',
        headline: 'Colecções',
        sublinha: 'EMBALAGEM PREMIUM',
        body: 'A experiência começa antes de abrir a caixa.',
        ctaLabel: 'Ver Packs',
        ctaHref: '/packs',
      },
    },
  },
  {
    label: 'Sale',
    href: '/sale',
    highlight: true,
    dropdown: {
      type: 'simple',
      links: [
        { label: 'Tudo em Saldo', href: '/sale' },
        { label: 'Homem em Saldo', href: '/sale/homem' },
        { label: 'Mulher em Saldo', href: '/sale/mulher' },
        { label: 'Últimas Unidades', href: '/sale/ultimas' },
      ],
    },
  },
]
