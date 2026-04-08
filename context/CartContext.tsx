'use client'

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string           // unique key: variantId + productHandle
  variantId: string
  productHandle: string
  productTitle: string
  variantTitle: string  // ex: "39-42 / Preto"
  image: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  shopifyCartId: string | null
  checkoutUrl: string | null
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'SET_SHOPIFY_CART'; payload: { cartId: string; checkoutUrl: string } }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<CartState> }

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  shopifyCartId: string | null
  checkoutUrl: string | null
  totalItems: number
  subtotal: number
  amountToFreeShipping: number
  hasFreeShipping: boolean
  addItem: (item: Omit<CartItem, 'id'> & { id?: string }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

// ─── Reducer ─────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) }
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      }
    case 'CLEAR_CART':
      return { ...state, items: [], shopifyCartId: null, checkoutUrl: null }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    case 'SET_SHOPIFY_CART':
      return {
        ...state,
        shopifyCartId: action.payload.cartId,
        checkoutUrl: action.payload.checkoutUrl,
      }
    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'lion-socks-cart'

const initialState: CartState = {
  items: [],
  isOpen: false,
  shopifyCartId: null,
  checkoutUrl: null,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<CartState>
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: { ...parsed, isOpen: false } })
      }
    } catch {
      // Ignore parse errors
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items: state.items,
          shopifyCartId: state.shopifyCartId,
          checkoutUrl: state.checkoutUrl,
        })
      )
    } catch {
      // Ignore storage errors
    }
  }, [state.items, state.shopifyCartId, state.checkoutUrl])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD

  const addItem = useCallback((item: Omit<CartItem, 'id'> & { id?: string }) => {
    const id = item.id ?? `${item.variantId}-${item.productHandle}`
    dispatch({ type: 'ADD_ITEM', payload: { ...item, id } })
    dispatch({ type: 'OPEN_CART' })
  }, [])

  const removeItem = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' })
  }, [])

  const openCart = useCallback(() => {
    dispatch({ type: 'OPEN_CART' })
  }, [])

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' })
  }, [])

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        isOpen: state.isOpen,
        shopifyCartId: state.shopifyCartId,
        checkoutUrl: state.checkoutUrl,
        totalItems,
        subtotal,
        amountToFreeShipping,
        hasFreeShipping,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
