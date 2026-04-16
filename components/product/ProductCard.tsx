'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)

  const showBadge = product.badge === 'Destaque' || product.badge === 'Executive'
    || product.badge === 'Premium' || product.badge === 'Edição Limitada'
    || product.badge === 'Favorito' || product.badge === 'Clássico'

  return (
    <Link
      href={`/loja/${product.handle}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: 'all 200ms ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        border: hovered ? '1px solid #B8960C' : '1px solid transparent',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      {/* Zona superior — navy */}
      <div
        className="relative flex flex-col items-center justify-center"
        style={{
          background: '#0D1B2A',
          aspectRatio: '4 / 3.25',
          padding: '24px 16px 16px',
        }}
      >
        {/* Badge top-left */}
        {showBadge && product.badge && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: '#B8960C',
              color: '#0A0A0A',
              fontSize: '11px',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Product name — serif, gold, centered */}
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '16px',
            fontWeight: 500,
            color: '#B8960C',
            textAlign: 'center',
            lineHeight: 1.3,
            marginBottom: '6px',
          }}
        >
          {product.name}
        </h3>

        {/* Sub-line: color / pattern */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '12px',
            color: '#6B6B6B',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {product.color} · {product.patternLabel}
        </p>

        {/* LION SOCKS branding at bottom */}
        <span
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '9px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#6B6B6B',
            opacity: 0.4,
          }}
        >
          LION SOCKS
        </span>
      </div>

      {/* Zona inferior — off-white */}
      <div
        style={{
          background: '#F5F3EE',
          padding: '16px',
        }}
      >
        {/* Badges: material + type */}
        <div className="flex items-center gap-2 mb-2">
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#B8960C',
            }}
          >
            {product.materialLabel}
          </span>
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#6B6B6B',
            }}
          >
            {product.typeLabel}
          </span>
        </div>

        {/* Name + Price row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#0A0A0A',
              lineHeight: 1.4,
            }}
          >
            {product.name}
          </p>
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              color: '#0A0A0A',
              flexShrink: 0,
            }}
          >
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Color text */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '13px',
            color: '#6B6B6B',
            marginBottom: '8px',
          }}
        >
          {product.color}
        </p>

        {/* Color swatch */}
        <div className="flex items-center gap-1.5">
          <span
            className="relative group/swatch"
            style={{
              height: '10px',
              width: '10px',
              borderRadius: '50%',
              backgroundColor: product.colorHex,
              border: '1px solid rgba(0,0,0,0.1)',
              flexShrink: 0,
              display: 'inline-block',
            }}
            title={product.color}
          />
        </div>
      </div>
    </Link>
  )
}
