'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface WishlistContextValue {
  items: string[]
  has: (productId: string) => boolean
  toggle: (productId: string) => void
  remove: (productId: string) => void
  clear: () => void
  count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lion-socks-wishlist')
      if (stored) setItems(JSON.parse(stored))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem('lion-socks-wishlist', JSON.stringify(items))
  }, [items, hydrated])

  const has = (productId: string) => items.includes(productId)

  const toggle = (productId: string) => {
    setItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const remove = (productId: string) => {
    setItems((prev) => prev.filter((id) => id !== productId))
  }

  const clear = () => setItems([])

  return (
    <WishlistContext.Provider value={{ items, has, toggle, remove, clear, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
