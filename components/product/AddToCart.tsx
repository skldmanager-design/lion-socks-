'use client'

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import type { Product, Size } from '@/lib/catalog'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'
import SizeGuide from './SizeGuide'

interface AddToCartProps {
  product: Product
}

// Prefix makes these IDs trivially identifiable when migrating to real Shopify gid://
// — checkout rejects them and we can purge any leaked cart.
const mockVariantId = (productId: string, size: Size) => `lsmock:${productId}:${size}`

export default function AddToCart({ product }: AddToCartProps) {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { addItem } = useCart()
  const { show } = useToast()

  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const addedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
    if (addedTimerRef.current) clearTimeout(addedTimerRef.current)
  }, [])

  const handleAdd = async () => {
    if (!product.inStock) {
      show('Produto temporariamente sem stock', 'error')
      return
    }
    if (!selectedSize) {
      setError(true)
      errorTimerRef.current = setTimeout(() => setError(false), 2000)
      return
    }

    setLoading(true)

    // Simulate slight network delay for visual feedback (drop once Shopify wired)
    await new Promise((r) => setTimeout(r, 400))

    addItem({
      variantId: mockVariantId(product.id, selectedSize),
      productHandle: product.handle,
      productTitle: product.name,
      variantTitle: `${selectedSize} / ${product.color}`,
      image: product.images[0] ?? '',
      price: product.price,
      quantity,
    })

    setLoading(false)
    setAdded(true)
    show(`${product.name} adicionado ao carrinho`)
    addedTimerRef.current = setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-5">
      {/* Size selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label
            className="font-body uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.15em', fontWeight: 500, color: '#424242' }}
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
          <p className="font-body mt-2" style={{ fontSize: '12px', color: '#B8960C', fontWeight: 300 }}>
            Por favor seleccione um tamanho.
          </p>
        )}
      </div>

      {/* Quantity stepper */}
      <div>
        <label
          className="font-body uppercase block mb-3"
          style={{ fontSize: '11px', letterSpacing: '0.15em', fontWeight: 500, color: '#424242' }}
        >
          Quantidade
        </label>
        <div
          className="flex items-center"
          style={{
            border: '1px solid rgba(0,0,0,0.16)',
            width: 'fit-content',
            borderRadius: '2px',
          }}
        >
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="font-body disabled:opacity-25 transition-colors"
            style={{ width: '44px', height: '44px', fontSize: '18px', color: '#424242', background: 'transparent', border: 'none' }}
            onMouseEnter={(e) => { if (quantity > 1) e.currentTarget.style.color = '#B8960C' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#424242' }}
            aria-label="Diminuir quantidade"
          >
            −
          </button>
          <span
            className="font-body text-center"
            style={{
              minWidth: '40px',
              height: '44px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '15px',
              fontWeight: 500,
              color: '#0A0A0A',
              borderLeft: '1px solid rgba(0,0,0,0.08)',
              borderRight: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            disabled={quantity >= 10}
            className="font-body disabled:opacity-25 transition-colors"
            style={{ width: '44px', height: '44px', fontSize: '18px', color: '#424242', background: 'transparent', border: 'none' }}
            onMouseEnter={(e) => { if (quantity < 10) e.currentTarget.style.color = '#B8960C' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#424242' }}
            aria-label="Aumentar quantidade"
          >
            +
          </button>
        </div>
      </div>

      {/* Add button — premium black slab with gold rule on hover */}
      <button
        onClick={handleAdd}
        disabled={added || loading || !product.inStock}
        className="w-full font-body uppercase flex items-center justify-center gap-2"
        style={{
          background: added ? '#B8960C' : '#0a0a0a',
          color: added ? '#0a0a0a' : '#F5F3EE',
          fontSize: '12px',
          letterSpacing: '0.18em',
          padding: '20px',
          fontWeight: 500,
          border: '1px solid #0a0a0a',
          borderBottom: '2px solid #0a0a0a',
          cursor: loading ? 'wait' : 'pointer',
          opacity: loading ? 0.85 : 1,
          transition: 'all 280ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onMouseEnter={(e) => {
          if (added || loading || !product.inStock) return
          e.currentTarget.style.borderBottom = '2px solid #B8960C'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          if (added || loading) return
          e.currentTarget.style.borderBottom = '2px solid #0a0a0a'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span
              className="inline-block rounded-full border-2 border-white/30 border-t-white animate-spin"
              style={{ width: '16px', height: '16px' }}
            />
            A adicionar...
          </span>
        ) : added ? (
          <span className="flex items-center gap-2">
            <Check size={16} strokeWidth={1.5} />
            Adicionado ao Carrinho
          </span>
        ) : !product.inStock ? (
          'Esgotado'
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
          Envio gratuito em compras acima de {formatPrice(FREE_SHIPPING_THRESHOLD)}
        </p>
      </div>
    </div>
  )
}
