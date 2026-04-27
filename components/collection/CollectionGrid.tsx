'use client'

import { useState, useMemo, useEffect } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
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
  sizes: [],
  colors: [],
  priceMax: null,
  sortBy: 'relevance',
}

const COLOR_MATCHES: Record<string, string[]> = {
  'Preto': ['preto'],
  'Azul': ['azul', 'marinho'],
  'Charcoal': ['charcoal'],
  'Castanho': ['castanho', 'bordeaux'],
  'Creme': ['creme', 'beige'],
  'Verde': ['verde'],
  'Cinza': ['cinza'],
}

export default function CollectionGrid({
  products,
  title,
  showFilters = true,
}: CollectionGridProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileFiltersOpen])

  const activeCount =
    filters.materials.length +
    filters.types.length +
    filters.patterns.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceMax !== null ? 1 : 0)

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
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)))
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) => {
        const colorLower = p.color.toLowerCase()
        return filters.colors.some((c) =>
          COLOR_MATCHES[c]?.some((match) => colorLower.includes(match))
        )
      })
    }
    if (filters.priceMax !== null) {
      result = result.filter((p) => p.price <= filters.priceMax!)
    }

    // Sort
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === 'newest') {
      result.sort((a, b) => {
        const aNew = a.collections.includes('novidades') ? 1 : 0
        const bNew = b.collections.includes('novidades') ? 1 : 0
        return bNew - aNew
      })
    } else {
      // Relevance: stock > badge > collections count
      result.sort((a, b) => {
        const scoreA = (a.inStock ? 10 : 0) + (a.badge ? 5 : 0) + a.collections.length
        const scoreB = (b.inStock ? 10 : 0) + (b.badge ? 5 : 0) + b.collections.length
        return scoreB - scoreA
      })
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

      {/* Mobile toolbar — only visible on lg- */}
      {showFilters && (
        <div className="lg:hidden mb-5 flex items-center justify-between gap-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '12px' }}>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 font-body"
            style={{
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '10px 16px',
              border: '1px solid rgba(0,0,0,0.2)',
              borderRadius: '3px',
              background: 'transparent',
              color: '#0A0A0A',
              fontWeight: 500,
              minHeight: '44px',
            }}
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
            Filtros
            {activeCount > 0 && (
              <span
                style={{
                  background: '#B8960C',
                  color: '#0A0A0A',
                  fontSize: '10px',
                  borderRadius: '999px',
                  padding: '1px 7px',
                  fontWeight: 600,
                }}
              >
                {activeCount}
              </span>
            )}
          </button>

          <p className="font-body text-gray-500" style={{ fontSize: '12px' }}>
            {filtered.length} produto{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Desktop sidebar */}
        {showFilters && (
          <div className="hidden lg:block">
            <CollectionFilters
              filters={filters}
              onChange={setFilters}
              productCount={filtered.length}
            />
          </div>
        )}

        {/* Mobile drawer */}
        {showFilters && (
          <>
            <div
              className="lg:hidden fixed inset-0 z-[60] transition-opacity duration-200"
              style={{
                background: 'rgba(0,0,0,0.5)',
                opacity: mobileFiltersOpen ? 1 : 0,
                pointerEvents: mobileFiltersOpen ? 'auto' : 'none',
              }}
              onClick={() => setMobileFiltersOpen(false)}
              aria-hidden
            />
            <div
              role="dialog"
              aria-modal
              aria-label="Filtros"
              className="lg:hidden fixed right-0 top-0 bottom-0 z-[61] flex flex-col transition-transform duration-300 ease-out"
              style={{
                width: 'min(380px, 100vw)',
                background: '#F5F3EE',
                transform: mobileFiltersOpen ? 'translateX(0)' : 'translateX(100%)',
              }}
            >
              <div
                className="flex items-center justify-between px-5"
                style={{ height: '60px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
              >
                <h2 className="font-display text-gray-900" style={{ fontSize: '20px' }}>
                  Filtros
                </h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2"
                  style={{ color: '#0A0A0A', minWidth: '44px', minHeight: '44px' }}
                  aria-label="Fechar filtros"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <CollectionFilters
                  filters={filters}
                  onChange={setFilters}
                  productCount={filtered.length}
                />
              </div>
              <div
                className="px-5 py-4"
                style={{ borderTop: '1px solid rgba(0,0,0,0.08)', background: '#FFFFFF' }}
              >
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full font-body uppercase"
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.15em',
                    background: '#0A0A0A',
                    color: '#F5F3EE',
                    padding: '16px',
                    border: 'none',
                    cursor: 'pointer',
                    minHeight: '48px',
                  }}
                >
                  Ver {filtered.length} produto{filtered.length !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          </>
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
