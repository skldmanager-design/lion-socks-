'use client'

import { useState, useEffect } from 'react'
import type { Product } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

interface Props {
  product: Product
}

export default function StickyMobileCart({ product }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToCart = () => {
    document.querySelector('button[aria-label="Tamanho 39-42"], button[aria-label="Tamanho 42-45"]')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid #E8E5DF',
        padding: '12px 16px',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-body truncate" style={{ fontSize: '13px', fontWeight: 500, color: '#0A0A0A' }}>
            {product.name}
          </p>
          <p className="font-body" style={{ fontSize: '14px', color: '#0A0A0A' }}>
            {formatPrice(product.price)}
          </p>
        </div>
        <button
          onClick={scrollToCart}
          className="font-body text-xs uppercase tracking-widest bg-gray-900 text-white px-6 py-3 flex-shrink-0"
        >
          Adicionar
        </button>
      </div>
    </div>
  )
}
