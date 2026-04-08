import { shopifyFetch } from './client'
import type { ShopifyProduct, ShopifyCollection, ShopifyCart } from './types'

// ─── Fragments ───────────────────────────────────────────────────────────

const IMAGE_FRAGMENT = `
  fragment ImageFragment on Image {
    url
    altText
    width
    height
  }
`

const MONEY_FRAGMENT = `
  fragment MoneyFragment on MoneyV2 {
    amount
    currencyCode
  }
`

const PRODUCT_VARIANT_FRAGMENT = `
  fragment VariantFragment on ProductVariant {
    id
    title
    availableForSale
    selectedOptions { name value }
    price { ...MoneyFragment }
    compareAtPrice { ...MoneyFragment }
  }
`

const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    descriptionHtml
    priceRange {
      minVariantPrice { ...MoneyFragment }
      maxVariantPrice { ...MoneyFragment }
    }
    images(first: 4) {
      edges { node { ...ImageFragment } }
    }
    variants(first: 10) {
      edges { node { ...VariantFragment } }
    }
    collections(first: 5) {
      edges { node { handle title } }
    }
    tags
  }
`

// ─── Products ─────────────────────────────────────────────────────────────

const GET_PRODUCTS_QUERY = `
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  query GetProducts($first: Int!, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node { ...ProductFragment }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

const GET_PRODUCT_BY_HANDLE_QUERY = `
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) { ...ProductFragment }
  }
`

const GET_COLLECTIONS_QUERY = `
  ${IMAGE_FRAGMENT}
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id handle title description
          image { ...ImageFragment }
        }
      }
    }
  }
`

const GET_COLLECTION_BY_HANDLE_QUERY = `
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  query GetCollectionByHandle($handle: String!, $first: Int!, $after: String) {
    collectionByHandle(handle: $handle) {
      id handle title description
      image { ...ImageFragment }
      products(first: $first, after: $after) {
        edges {
          node { ...ProductFragment }
          cursor
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`

const GET_CART_QUERY = `
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  fragment CartLineFragment on CartLine {
    id
    quantity
    merchandise {
      ... on ProductVariant {
        id title
        selectedOptions { name value }
        product {
          id handle title
          images(first: 1) { edges { node { ...ImageFragment } } }
        }
      }
    }
    cost {
      totalAmount { ...MoneyFragment }
      amountPerQuantity { ...MoneyFragment }
    }
  }
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id checkoutUrl totalQuantity
      cost {
        subtotalAmount { ...MoneyFragment }
        totalAmount { ...MoneyFragment }
        totalTaxAmount { ...MoneyFragment }
      }
      lines(first: 100) {
        edges { node { ...CartLineFragment } }
      }
    }
  }
`

// ─── Exported functions ───────────────────────────────────────────────────

export async function getProducts(variables?: {
  first?: number
  after?: string
  sortKey?: string
  reverse?: boolean
}) {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct; cursor: string }[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } }
  }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first: 24, ...variables },
    cache: 'no-store',
  })
  return data.products
}

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [`product-${handle}`],
  })
  return data.productByHandle
}

export async function getCollections() {
  const data = await shopifyFetch<{
    collections: { edges: { node: ShopifyCollection }[] }
  }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first: 20 },
  })
  return data.collections.edges.map((e) => e.node)
}

export async function getCollectionByHandle(handle: string, first = 24, after?: string) {
  const data = await shopifyFetch<{ collectionByHandle: ShopifyCollection | null }>({
    query: GET_COLLECTION_BY_HANDLE_QUERY,
    variables: { handle, first, after },
    tags: [`collection-${handle}`],
  })
  return data.collectionByHandle
}

export async function getCart(cartId: string) {
  const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: 'no-store',
  })
  return data.cart
}
