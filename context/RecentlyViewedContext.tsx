'use client'

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react'

const MAX_RECENT = 8

interface RecentlyViewedContextValue {
  items: string[]
  add: (productId: string) => void
  clear: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null)

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lion-socks-recently-viewed')
      if (stored) setItems(JSON.parse(stored))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem('lion-socks-recently-viewed', JSON.stringify(items))
  }, [items, hydrated])

  const add = useCallback((productId: string) => {
    setItems((prev) => {
      const filtered = prev.filter((id) => id !== productId)
      return [productId, ...filtered].slice(0, MAX_RECENT)
    })
  }, [])

  const clear = useCallback(() => setItems([]), [])

  return (
    <RecentlyViewedContext.Provider value={{ items, add, clear }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext)
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider')
  return ctx
}
