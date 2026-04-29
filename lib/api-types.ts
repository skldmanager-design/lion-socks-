// ─── Types mirrored from Product-Pilot @shared/schema ────────────────

export interface PLVariant {
  id: number
  plProductId: number
  size: string | null
  color: string | null
  sku: string | null
  barcode: string | null
  priceCents: number | null     // null = herda do produto
  stockQuantity: number
  imageUrl: string | null
  active: boolean
}

export interface PLProduct {
  id: number
  brandId: number
  productId: number             // ref para o produto B2B na fábrica (Sockland)
  name: string                  // nome PL (pode ser diferente do B2B)
  slug: string
  descriptionHtml: string | null
  shortDescription: string | null
  priceCents: number            // preço base do produto
  compareAtPriceCents: number | null
  costCents: number | null
  category: string | null       // ex: 'classic', 'sport'
  tags: string[]
  images: string[]              // paths /uploads/... ou URLs
  seoTitle: string | null
  seoDescription: string | null
  status: 'activo' | 'rascunho' | 'arquivado'
  variants: PLVariant[]
  // Flash sale override (opcional, set pelo backend quando aplicável)
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
