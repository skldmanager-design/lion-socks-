---
name: shopify-integration
description: Shopify Storefront API integration patterns for Lion Socks. Use when writing GraphQL queries, mutations, cart logic, or any Shopify-related code.
---

# Lion Socks — Shopify Integration

## Setup

```tsx
// lib/shopify/client.ts
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string
  variables?: Record<string, unknown>
}): Promise<T> {
  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`)
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? 'Unknown Shopify error')
  }

  return json.data as T
}
```

## Queries Essenciais

```graphql
# Todos os produtos
query GetProducts($first: Int = 20) {
  products(first: $first) {
    edges {
      node {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        images(first: 4) {
          edges { node { url altText width height } }
        }
        variants(first: 10) {
          edges { node { id title availableForSale price { amount currencyCode } } }
        }
        tags
        productType
      }
    }
  }
}

# Produto por handle
query GetProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    id handle title description descriptionHtml
    priceRange { minVariantPrice { amount currencyCode } }
    images(first: 10) { edges { node { url altText width height } } }
    variants(first: 20) {
      edges { node { id title availableForSale price { amount currencyCode } selectedOptions { name value } } }
    }
    tags productType
  }
}

# Coleção por handle
query GetCollectionByHandle($handle: String!, $first: Int = 20) {
  collectionByHandle(handle: $handle) {
    id handle title description
    products(first: $first) {
      edges { node { ...ProductFields } }
    }
  }
}
```

## Cart Mutations

```graphql
mutation CreateCart {
  cartCreate { cart { id checkoutUrl lines(first: 10) { edges { node { id quantity merchandise { ... on ProductVariant { id title price { amount } product { title handle images(first: 1) { edges { node { url } } } } } } } } } } }

mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) { cart { id checkoutUrl lines(first: 50) { edges { node { id quantity merchandise { ... on ProductVariant { id title price { amount } product { title handle images(first: 1) { edges { node { url } } } } } } } } } } }

mutation UpdateCartLine($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
}

mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ...CartFields } }
}
```

## Cart Context Pattern

```tsx
// context/CartContext.tsx
// - Guardar cartId em cookie (não localStorage — SSR friendly)
// - Funções: addToCart, removeFromCart, updateQuantity
// - Estado: items, totalQuantity, totalPrice, isOpen (drawer)
// - Barra de progresso: calcular distância até €45 para envio gratuito
// - Checkout: redirecionar para cart.checkoutUrl (Shopify hosted checkout)
```

## Mock Data (enquanto Shopify não está ligado)

```tsx
// lib/mock-data.ts
// Exportar: products, collections, bundles
// Cada produto segue a mesma shape que a resposta Shopify
// Isto permite trocar facilmente de mock para API real
// Usar flag: const USE_MOCK = !process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

export function getProducts() {
  if (USE_MOCK) return mockProducts
  return shopifyFetch<ProductsResponse>({ query: GET_PRODUCTS })
}
```

## .env.local.example

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=lion-socks.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
```
