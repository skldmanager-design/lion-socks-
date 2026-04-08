'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import type { Product, Size } from '@/lib/mock-data'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import SizeGuide from './SizeGuide'

interface AddToCartProps {
  product: Product
}

export default function AddToCart({ product }: AddToCartProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState(false)
  const { addItem } = useCart()

  const handleAdd = () => {
    if (!selectedSize) {
      setError(true)
      setTimeout(() => setError(false), 2000)
      return
    }

    addItem({
      variantId: `mock-${product.id}-${selectedSize}`,
      productHandle: product.handle,
      productTitle: product.name,
      variantTitle: `${selectedSize} / ${product.color}`,
      image: product.images[0] ?? '',
      price: product.price,
      quantity: 1,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-5">
      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label
            className="font-body uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.15em', fontWeight: 500, color: '#424242' }}
          >
            Tamanho
            {selectedSize && (
              <span className="ml-2 normal-case tracking-normal" style={{ color: '#B8960C', fontWeight: 300 }}>
                — {selectedSize}
              </span>
            )}
          </label>
          <SizeGuide />
        </div>

        <div className="flex gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => { setSelectedSize(size); setError(false) }}
              className="flex-1 font-body transition-all duration-200"
              style={{
                padding: '11px 0',
                fontSize: '13px',
                fontWeight: 400,
                border: selectedSize === size
                  ? '1px solid #0a0a0a'
                  : error
                  ? '1px solid rgba(0,0,0,0.2)'
                  : '1px solid rgba(0,0,0,0.12)',
                background: selectedSize === size ? '#0a0a0a' : 'transparent',
                color: selectedSize === size ? '#ffffff' : '#424242',
                cursor: 'pointer',
              }}
              aria-pressed={selectedSize === size}
              aria-label={`Tamanho ${size}`}
            >
              {size}
            </button>
          ))}
        </div>

        {error && (
          <p className="font-body mt-2" style={{ fontSize: '12px', color: '#cc3333', fontWeight: 300 }}>
            Por favor seleccione um tamanho.
          </p>
        )}
      </div>

      {/* Add button */}
      <button
        onClick={handleAdd}
        disabled={added}
        className="w-full font-body uppercase transition-all duration-300 flex items-center justify-center gap-2"
        style={{
          background: added ? '#B8960C' : '#0a0a0a',
          color: '#ffffff',
          fontSize: '12px',
          letterSpacing: '0.15em',
          padding: '18px',
          fontWeight: 400,
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => { if (!added) e.currentTarget.style.background = '#B8960C' }}
        onMouseLeave={(e) => { if (!added) e.currentTarget.style.background = '#0a0a0a' }}
      >
        {added ? (
          <span className="flex items-center gap-2">
            <Check size={16} strokeWidth={1.5} />
            Adicionado ao Carrinho
          </span>
        ) : (
          'Adicionar ao Carrinho'
        )}
      </button>

      {/* Stock + shipping note */}
      <div className="space-y-1.5" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '16px' }}>
        {product.inStock ? (
          <p className="font-body flex items-center gap-1.5" style={{ fontSize: '12px', color: '#424242', fontWeight: 300 }}>
            <span
              className="rounded-full flex-shrink-0"
              style={{ height: '6px', width: '6px', background: '#B8960C' }}
            />
            Em stock — envio em 1–2 dias úteis
          </p>
        ) : (
          <p className="font-body" style={{ fontSize: '12px', color: '#9E9E9E', fontWeight: 300 }}>
            Temporariamente sem stock
          </p>
        )}
        <p className="font-body" style={{ fontSize: '12px', color: '#9E9E9E', fontWeight: 300 }}>
          Envio gratuito em compras acima de €45
        </p>
      </div>
    </div>
  )
}
