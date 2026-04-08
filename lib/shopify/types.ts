// Shopify Storefront API Types

export interface ShopifyImage {
  url: string
  altText: string | null
  width: number
  height: number
}

export interface ShopifyMoneyV2 {
  amount: string
  currencyCode: string
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: { name: string; value: string }[]
  price: ShopifyMoneyV2
  compareAtPrice: ShopifyMoneyV2 | null
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  priceRange: {
    minVariantPrice: ShopifyMoneyV2
    maxVariantPrice: ShopifyMoneyV2
  }
  images: {
    edges: { node: ShopifyImage }[]
  }
  variants: {
    edges: { node: ShopifyProductVariant }[]
  }
  collections: {
    edges: { node: { handle: string; title: string } }[]
  }
  tags: string[]
  metafields?: { key: string; value: string }[]
}

export interface ShopifyCollection {
  id: string
  handle: string
  title: string
  description: string
  image: ShopifyImage | null
  products: {
    edges: { node: ShopifyProduct }[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    selectedOptions: { name: string; value: string }[]
    product: {
      id: string
      handle: string
      title: string
      images: { edges: { node: ShopifyImage }[] }
    }
  }
  cost: {
    totalAmount: ShopifyMoneyV2
    amountPerQuantity: ShopifyMoneyV2
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: ShopifyMoneyV2
    totalAmount: ShopifyMoneyV2
    totalTaxAmount: ShopifyMoneyV2 | null
  }
  lines: {
    edges: { node: ShopifyCartLine }[]
  }
}

// Cart item para uso interno na app (formato simplificado)
export interface CartItem {
  id: string          // Shopify line ID
  variantId: string
  productHandle: string
  productTitle: string
  variantTitle: string
  image: string
  price: number
  quantity: number
}

export interface Cart {
  id: string
  checkoutUrl: string
  items: CartItem[]
  totalQuantity: number
  subtotal: number
}
