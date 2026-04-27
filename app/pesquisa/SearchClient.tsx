'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search as SearchIcon, X } from 'lucide-react'
import type { Product } from '@/lib/mock-data'
import { searchCatalog } from '@/lib/catalog'
import ProductCard from '@/components/product/ProductCard'

export default function SearchClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Product[]>([])
  const [searching, setSearching] = useState(false)

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setSearching(true)
    const timer = setTimeout(async () => {
      const res = await searchCatalog(query)
      setResults(res)
      setSearching(false)
    }, 250)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    const url = params.toString() ? `/pesquisa?${params.toString()}` : '/pesquisa'
    window.history.replaceState({}, '', url)
  }, [query])

  return (
    <div>
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.5} />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por material, cor, padrão..."
            className="w-full bg-white border border-gray-200 pl-12 pr-12 py-4 font-body text-base text-gray-900 focus:outline-none focus:border-gold transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      {query.trim() === '' ? (
        <div className="text-center py-16">
          <p className="font-body text-gray-500 mb-6" style={{ fontSize: '15px' }}>
            Comece a escrever para pesquisar os nossos produtos.
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
            {['Fil d\'Écosse', 'Merino', 'Seda', 'Preto', 'Argyle', 'Pin Dot', 'Executive'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="font-body text-xs uppercase tracking-widest bg-white border border-gray-200 px-4 py-2 hover:border-gold hover:text-gold transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-xl text-gray-900 mb-2">Sem resultados para &ldquo;{query}&rdquo;</p>
          <p className="font-body text-sm text-gray-500">Experimente outros termos.</p>
        </div>
      ) : (
        <div>
          <p className="font-body text-sm text-gray-500 mb-6">
            {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para &ldquo;{query}&rdquo;
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
