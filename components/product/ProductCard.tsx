'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import type { Product } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import { useWishlist } from '@/context/WishlistContext'
import { useToast } from '@/context/ToastContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const { has, toggle } = useWishlist()
  const { show } = useToast()
  const isFavorite = has(product.id)

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const willBeFavorite = !isFavorite
    toggle(product.id)
    show(willBeFavorite ? 'Adicionado aos favoritos' : 'Removido dos favoritos')
  }

  const hasRealImage = Boolean(product.images?.[0])

  return (
    <Link
      href={`/loja/${product.handle}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: 'all 320ms cubic-bezier(0.22, 1, 0.36, 1)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        background: '#FFFFFF',
        border: hovered ? '1px solid rgba(184,150,12,0.5)' : '1px solid rgba(0,0,0,0.08)',
        boxShadow: hovered ? '0 14px 40px rgba(10,10,10,0.08)' : '0 1px 2px rgba(10,10,10,0.02)',
        textDecoration: 'none',
      }}
    >
      {/* Image area — soft cream gradient */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #F5F3EE 0%, #FFFFFF 50%, #EFEBE2 100%)',
          aspectRatio: '1 / 1',
        }}
      >
        {/* Wishlist heart */}
        <button
          onClick={handleFavorite}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(0,0,0,0.06)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 200ms ease',
            zIndex: 3,
            backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#FFFFFF' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)' }}
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            fill={isFavorite ? '#B8960C' : 'none'}
            color={isFavorite ? '#B8960C' : '#0A0A0A'}
          />
        </button>

        {/* Material chip — top-left */}
        <span
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#B8960C',
            background: 'rgba(255,255,255,0.85)',
            padding: '5px 10px',
            borderRadius: '999px',
            border: '1px solid rgba(184,150,12,0.18)',
            backdropFilter: 'blur(4px)',
            zIndex: 2,
          }}
        >
          {product.materialLabel}
        </span>

        {hasRealImage ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill

            className="object-contain"
            style={{ padding: '32px', transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" style={{ opacity: 0.18 }} aria-hidden>
              <path d="M60 10 L102 22 L102 60 Q102 90 60 110 Q18 90 18 60 L18 22 Z" stroke="#B8960C" strokeWidth="1.5" fill="none" />
              <text x="60" y="74" textAnchor="middle" fontSize="46" fontFamily="Playfair Display, Georgia, serif" fontStyle="italic" fontWeight="500" fill="#B8960C">L</text>
            </svg>
          </div>
        )}

        {/* Hover CTA — slim gold line + label */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            padding: '20px',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#0A0A0A',
              background: '#F5F3EE',
              padding: '8px 18px',
              borderBottom: '2px solid #B8960C',
            }}
          >
            Ver detalhes
          </span>
        </div>
      </div>

      {/* Info block — light */}
      <div style={{ background: '#FFFFFF', padding: '16px 18px 18px' }}>
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '17px',
              fontWeight: 400,
              color: '#0A0A0A',
              lineHeight: 1.25,
            }}
          >
            {product.name}
          </p>
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#0A0A0A',
              flexShrink: 0,
              marginTop: '2px',
            }}
          >
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            style={{
              height: '10px',
              width: '10px',
              borderRadius: '50%',
              backgroundColor: product.colorHex,
              border: '1px solid rgba(0,0,0,0.12)',
              flexShrink: 0,
              display: 'inline-block',
            }}
            title={product.color}
          />
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '12px',
              color: '#6B6B6B',
            }}
          >
            {product.color}
            <span style={{ color: 'rgba(0,0,0,0.25)', margin: '0 6px' }}>·</span>
            {product.typeLabel}
          </span>
        </div>
      </div>
    </Link>
  )
}
