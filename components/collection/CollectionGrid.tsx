'use client'

import { useState, useMemo } from 'react'
import type { Product } from '@/lib/mock-data'
import ProductCard from '@/components/product/ProductCard'
import CollectionFilters, { type FilterState } from './CollectionFilters'

interface CollectionGridProps {
  products: Product[]
  title?: string
  showFilters?: boolean
}

const defaultFilters: FilterState = {
  materials: [],
  types: [],
  patterns: [],
  sortBy: 'relevance',
}

export default function CollectionGrid({
  products,
  title,
  showFilters = true,
}: CollectionGridProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)

  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.materials.length > 0) {
      result = result.filter((p) => filters.materials.includes(p.material))
    }
    if (filters.types.length > 0) {
      result = result.filter((p) => filters.types.includes(p.type))
    }
    if (filters.patterns.length > 0) {
      result = result.filter((p) => filters.patterns.includes(p.pattern))
    }

    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, filters])

  return (
    <div>
      {title && (
        <div className="mb-10">
          <h1 className="font-display text-3xl lg:text-4xl text-gray-900">{title}</h1>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {showFilters && (
          <CollectionFilters
            filters={filters}
            onChange={setFilters}
            productCount={filtered.length}
          />
        )}

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-display text-xl text-gray-400 mb-2">Sem resultados</p>
              <p className="text-sm text-gray-400 font-body mb-6">
                Tente ajustar os filtros para ver mais produtos.
              </p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="text-xs tracking-widest uppercase font-body text-primary border-b border-primary pb-0.5 hover:text-gold hover:border-gold transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
