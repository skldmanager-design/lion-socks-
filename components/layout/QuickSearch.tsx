'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search as SearchIcon, X } from 'lucide-react'
import { products } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

interface QuickSearchProps {
  open: boolean
  onClose: () => void
}

export default function QuickSearch({ open, onClose }: QuickSearchProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
    else setQuery('')
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase()
        return (
          p.name.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.materialLabel.toLowerCase().includes(q) ||
          p.patternLabel.toLowerCase().includes(q)
        )
      }).slice(0, 6)
    : []

  if (!open) return null

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10,10,10,0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 45,
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: '#FFFFFF',
          zIndex: 50,
          padding: '24px 40px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          animation: 'slideDown 250ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 pb-4" style={{ borderBottom: '1px solid #E8E5DF' }}>
            <SearchIcon size={20} strokeWidth={1.5} className="text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar produtos..."
              className="flex-1 bg-transparent font-body text-lg text-gray-900 focus:outline-none"
            />
            <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {query.trim() === '' ? (
            <div className="py-6">
              <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-3">Sugestões</p>
              <div className="flex flex-wrap gap-2">
                {['Fil d\'Écosse', 'Merino', 'Seda', 'Executive', 'Pin Dot'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="font-body text-xs uppercase tracking-widest border border-gray-200 px-4 py-2 hover:border-gold hover:text-gold transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-6 text-center">
              <p className="font-body text-sm text-gray-500">Sem resultados para &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div className="py-4 space-y-2 max-h-[60vh] overflow-y-auto">
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={`/loja/${p.handle}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-2 hover:bg-gray-50 transition-colors rounded"
                >
                  <div className="relative flex-shrink-0" style={{ width: '56px', height: '56px', background: '#F5F3EE', borderRadius: '4px' }}>
                    <Image src={p.images[0]} alt={p.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs text-gold uppercase tracking-widest">{p.materialLabel}</p>
                    <p className="font-body text-sm text-gray-900 truncate">{p.name}</p>
                    <p className="font-body text-xs text-gray-500">{p.color}</p>
                  </div>
                  <p className="font-body text-sm text-gray-900 flex-shrink-0">{formatPrice(p.price)}</p>
                </Link>
              ))}
              <Link
                href={`/pesquisa?q=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="block text-center font-body text-xs uppercase tracking-widest text-gold border-t border-gray-100 pt-4 mt-2 hover:text-gray-900"
              >
                Ver todos os resultados →
              </Link>
            </div>
          )}
        </div>
        <style>{`
          @keyframes slideDown {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
    </>
  )
}
