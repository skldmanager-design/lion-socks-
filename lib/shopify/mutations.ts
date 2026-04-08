import { shopifyFetch } from './client'
import type { ShopifyCart } from './types'

const MONEY_FRAGMENT = `
  fragment MoneyFragment on MoneyV2 { amount currencyCode }
`

const IMAGE_FRAGMENT = `
  fragment ImageFragment on Image { url altText width height }
`

const CART_FRAGMENT = `
  ${MONEY_FRAGMENT}
  ${IMAGE_FRAGMENT}
  fragment CartFragment on Cart {
    id checkoutUrl totalQuantity
    cost {
      subtotalAmount { ...MoneyFragment }
      totalAmount { ...MoneyFragment }
      totalTaxAmount { ...MoneyFragment }
    }
    lines(first: 100) {
      edges {
        node {
          id quantity
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
      }
    }
  }
`

const CREATE_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation CreateCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
`

const ADD_TO_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
`

const UPDATE_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
`

const REMOVE_FROM_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
`

export async function createCart(
  lines?: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
  }>({
    query: CREATE_CART_MUTATION,
    variables: { lines: lines ?? [] },
    cache: 'no-store',
  })
  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join('\n'))
  }
  return data.cartCreate.cart
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
  }>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  })
  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join('\n'))
  }
  return data.cartLinesAdd.cart
}

export async function updateCartItem(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
  }>({
    query: UPDATE_CART_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store',
  })
  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join('\n'))
  }
  return data.cartLinesUpdate.cart
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart; userErrors: { field: string; message: string }[] }
  }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { cartId, lineIds },
    cache: 'no-store',
  })
  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join('\n'))
  }
  return data.cartLinesRemove.cart
}
