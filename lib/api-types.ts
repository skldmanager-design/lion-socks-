// ─── Types mirrored from Product-Pilot @shared/schema ────────────────

export interface PLVariant {
  id: number
  productId: number
  sku: string
  title: string               // e.g. "Preto / 42-45"
  optionValues: Record<string, string> // e.g. { Cor: "Preto", Tamanho: "42-45" }
  priceCents: number
  compareAtPriceCents?: number | null
  inventoryQuantity: number
  available: boolean
  imageUrl?: string | null
}

export interface PLProduct {
  id: number
  slug: string
  title: string
  description: string | null
  images: string[]
  tags: string[]
  material?: string | null
  active: boolean
  variants: PLVariant[]
  // Flash sale override
  flashSale?: {
    endsAt: string
    discountPercent: number
  } | null
}

export interface PLBundle {
  id: number
  slug: string
  title: string
  description: string | null
  image: string
  priceCents: number
  compareAtPriceCents: number
  discountPercent: number
  pairCount: number
  items: Array<{ productId: number; quantity: number }>
}

export interface PLOrder {
  id: number
  orderNumber: string
  totalCents: number
  status: 'pendente' | 'pago' | 'enviado' | 'entregue' | 'cancelado'
  createdAt: string
  items: Array<{
    variantId: number
    quantity: number
    priceCents: number
    title: string
    imageUrl?: string
  }>
  shippingName?: string
  shippingAddress?: string
  shippingCity?: string
  shippingPostalCode?: string
  shippingCountry?: string
}

export interface PLCustomer {
  id: number
  email: string
  firstName: string
  lastName: string
  phone?: string | null
  acceptsMarketing: boolean
}

export interface PLAuthResponse {
  customer: PLCustomer
  token: string
}

export interface PLCheckoutResponse {
  order: PLOrder
  items: PLOrder['items']
  checkoutUrl: string
  stripeSessionId: string
}

export interface PLShippingRate {
  cents: number
  freeShippingAt: number
  zone: string
}

export interface PLTaxRate {
  ratePercent: number
  name: string
  regime: string
}

export interface PLDiscountValidation {
  valid: boolean
  type?: 'percent' | 'fixed'
  value?: number
  discountCents?: number
  reason?: string
}
