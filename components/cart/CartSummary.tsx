'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Truck, Tag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'

// ⚠ DEV-ONLY: codes for local UI testing.
// Production discounts live in Product-Pilot → Shopify cart-level discountCodes.
// This map will be removed once PL endpoint is wired (see /api/checkout proxy).
const DISCOUNT_CODES: Record<string, { percent: number; label: string }> =
  process.env.NODE_ENV === 'production'
    ? {}
    : {
        DEMO10: { percent: 10, label: '10% off (demo)' },
      }

export default function CartSummary() {
  const router = useRouter()
  const { show } = useToast()
  const { subtotal, amountToFreeShipping, hasFreeShipping, items, closeCart } = useCart()
  const [discountCode, setDiscountCode] = useState('')
  type DiscountState =
    | { kind: 'collapsed' }
    | { kind: 'editing' }
    | { kind: 'applied'; code: string; percent: number }
  const [discountState, setDiscountState] = useState<DiscountState>({ kind: 'collapsed' })

  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  const appliedPercent = discountState.kind === 'applied' ? discountState.percent : 0
  const discountAmount = (subtotal * appliedPercent) / 100
  const finalSubtotal = subtotal - discountAmount

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase()
    const found = DISCOUNT_CODES[code]
    if (found) {
      setDiscountState({ kind: 'applied', code, percent: found.percent })
      show(`Código aplicado: ${found.label}`)
      setDiscountCode('')
    } else {
      show('Código inválido', 'error')
    }
  }

  const handleCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  return (
    <div
      className="px-6 py-5 space-y-4"
      style={{ borderTop: '1px solid rgba(184,150,12,0.15)' }}
    >
      {/* Free shipping progress */}
      <div>
        <div
          className="flex items-center gap-2 mb-2 font-body"
          style={{ fontSize: '12px', color: hasFreeShipping ? '#B8960C' : '#9E9E9E' }}
        >
          <Truck size={13} strokeWidth={1.5} />
          {hasFreeShipping ? (
            <span>Envio gratuito incluído</span>
          ) : (
            <span>
              Faltam <strong style={{ color: '#1a1a1a' }}>{formatPrice(amountToFreeShipping)}</strong> para envio gratuito
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="overflow-hidden" style={{ height: '3px', background: 'rgba(0,0,0,0.06)' }}>
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%`, background: '#B8960C' }}
          />
        </div>
      </div>

      {/* Discount code */}
      <div>
        {discountState.kind === 'collapsed' && (
          <button
            onClick={() => setDiscountState({ kind: 'editing' })}
            className="flex items-center gap-1.5 font-body hover:text-gold transition-colors"
            style={{ fontSize: '12px', color: '#6B6B6B' }}
          >
            <Tag size={12} strokeWidth={1.5} />
            Tenho código de desconto
          </button>
        )}

        {discountState.kind === 'applied' && (
          <div className="flex items-center justify-between py-2 px-3 rounded" style={{ background: 'rgba(184,150,12,0.1)' }}>
            <span className="font-body flex items-center gap-1.5" style={{ fontSize: '12px', color: '#B8960C' }}>
              <Tag size={12} strokeWidth={1.5} />
              <strong>{discountState.code}</strong> · -{discountState.percent}%
            </span>
            <button
              onClick={() => setDiscountState({ kind: 'collapsed' })}
              className="font-body text-gray-500 hover:text-gray-900"
              style={{ fontSize: '12px', minHeight: '44px', padding: '8px 12px' }}
            >
              Remover
            </button>
          </div>
        )}

        {discountState.kind === 'editing' && (
          <div className="flex gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleApplyDiscount() }}
              placeholder="Código de desconto"
              className="flex-1 border border-gray-200 px-3 py-2 font-body text-sm focus:outline-none focus:border-gold"
              autoFocus
            />
            <button
              onClick={handleApplyDiscount}
              className="font-body uppercase tracking-widest bg-gray-900 text-white hover:bg-gold hover:text-gray-900 transition-all"
              style={{ minHeight: '44px', padding: '12px 18px', fontSize: '11px' }}
            >
              Aplicar
            </button>
          </div>
        )}
      </div>

      {/* Subtotal */}
      <div
        className="flex items-center justify-between py-3"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <span className="font-body text-gray-700" style={{ fontSize: '14px', fontWeight: 300 }}>
          Subtotal
        </span>
        <span className="font-body text-gray-900" style={{ fontSize: '14px', fontWeight: 400 }}>
          {formatPrice(subtotal)}
        </span>
      </div>

      {discountState.kind === 'applied' && (
        <div className="flex items-center justify-between" style={{ marginTop: '-8px' }}>
          <span className="font-body text-gold" style={{ fontSize: '13px' }}>
            Desconto ({discountState.code})
          </span>
          <span className="font-body text-gold" style={{ fontSize: '13px' }}>
            −{formatPrice(discountAmount)}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <span className="font-body text-gray-900 uppercase tracking-widest" style={{ fontSize: '11px', fontWeight: 500 }}>
          Total
        </span>
        <span className="font-display text-gray-900" style={{ fontSize: '22px', fontWeight: 400 }}>
          {formatPrice(finalSubtotal)}
        </span>
      </div>

      <p className="font-body text-gray-400" style={{ fontSize: '12px', fontWeight: 300 }}>
        Envio calculado no checkout.
      </p>

      {/* Checkout button */}
      <button
        onClick={handleCheckout}
        disabled={items.length === 0}
        className="w-full font-body uppercase transition-all duration-300 disabled:opacity-40"
        style={{
          background: '#0a0a0a',
          color: '#ffffff',
          fontSize: '12px',
          letterSpacing: '0.15em',
          padding: '16px',
          fontWeight: 400,
          border: 'none',
          cursor: items.length === 0 ? 'not-allowed' : 'pointer',
        }}
        onMouseEnter={(e) => { if (items.length > 0) e.currentTarget.style.background = '#B8960C' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#0a0a0a' }}
      >
        FINALIZAR COMPRA
      </button>
    </div>
  )
}
