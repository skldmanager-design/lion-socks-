/**
 * Configuração central do site Lion Socks.
 * Single source of truth para URLs, contactos, redes sociais e textos legais.
 */

export const siteConfig = {
  /** Nome comercial */
  name: 'Lion Socks',
  /** Razão social (legal) */
  legalName: 'Valsport, Lda',
  /** URL canónico em produção */
  url: 'https://lionsocks.pt',
  /** Tagline curta usada em metadata */
  description:
    'Meias premium fabricadas no Porto. Fio de Escócia, lã merino, seda e cashmere com linha dourada no punho.',

  /** Contactos */
  email: {
    general: 'info@lionsocks.pt',
    privacy: 'privacidade@lionsocks.pt',
    returns: 'devolucoes@lionsocks.pt',
  },

  /** Redes sociais */
  social: {
    instagram: 'https://instagram.com/lionsocks',
    instagramHandle: '@lionsocks',
  },

  /** Comércio */
  freeShippingThreshold: 49,
  shippingFee: 3.5,
  returnDays: 30,

  /** OpenGraph */
  ogImage: '/og-image.jpg',

  /** Cidade / país (Schema.org) */
  location: {
    city: 'Porto',
    country: 'PT',
  },
} as const

export type SiteConfig = typeof siteConfig
