'use client'

import { useEffect } from 'react'
import { useRecentlyViewed } from '@/context/RecentlyViewedContext'
import { products } from '@/lib/catalog'
import ProductCard from './ProductCard'

interface Props {
  currentProductId?: string
  registerOnMount?: boolean
}

export default function RecentlyViewed({ currentProductId, registerOnMount }: Props) {
  const { items, add } = useRecentlyViewed()

  useEffect(() => {
    if (registerOnMount && currentProductId) {
      add(currentProductId)
    }
  }, [registerOnMount, currentProductId, add])

  const filtered = items.filter((id) => id !== currentProductId).slice(0, 4)
  const recentProducts = filtered
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)

  if (recentProducts.length === 0) return null

  return (
    <section className="mt-20 lg:mt-28">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-body mb-1">
            Continuar a Explorar
          </p>
          <h2 className="font-display text-2xl lg:text-3xl text-gray-900">
            Vistos recentemente
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {recentProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
