'use client'

import { Truck } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'

export default function CartSummary() {
  const { subtotal, amountToFreeShipping, hasFreeShipping, checkoutUrl, items } = useCart()

  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl
    } else {
      alert('Configure a integração Shopify para activar o checkout.')
    }
  }

  return (
    <div
      className="px-6 py-5 space-y-4"
      style={{ borderTop: '1px solid rgba(197,165,90,0.15)' }}
    >
      {/* Free shipping progress */}
      <div>
        <div
          className="flex items-center gap-2 mb-2 font-body"
          style={{ fontSize: '12px', color: hasFreeShipping ? '#C5A55A' : '#9E9E9E' }}
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
            style={{ width: `${progressPercent}%`, background: '#C5A55A' }}
          />
        </div>
      </div>

      {/* Subtotal */}
      <div
        className="flex items-center justify-between py-3"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <span className="font-body text-gray-700" style={{ fontSize: '14px', fontWeight: 300 }}>
          Subtotal
        </span>
        <span
          className="font-display text-gray-900"
          style={{ fontSize: '20px', fontWeight: 400 }}
        >
          {formatPrice(subtotal)}
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
        onMouseEnter={(e) => { if (items.length > 0) e.currentTarget.style.background = '#C5A55A' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#0a0a0a' }}
      >
        FINALIZAR COMPRA
      </button>
    </div>
  )
}
