'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Package, ArrowRight } from 'lucide-react'
import type { Bundle } from '@/lib/mock-data'
import { products } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

interface PackCardProps {
  bundle: Bundle
  featured?: boolean
}

export default function PackCard({ bundle, featured = false }: PackCardProps) {
  const savings = bundle.originalPrice - bundle.price
  const bundleProducts = bundle.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <div
      id={bundle.handle}
      className="relative flex flex-col overflow-hidden transition-all duration-300 group"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.08)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <Image
          src={bundle.image}
          alt={bundle.name}
          fill
          unoptimized
          className="object-cover object-center"
          style={{ transition: 'transform 0.5s', transform: 'scale(1)' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}
        />

        {/* Discount badge */}
        <div
          className="absolute top-4 right-4 font-body uppercase"
          style={{
            background: '#0a0a0a',
            color: '#B8960C',
            fontSize: '10px',
            letterSpacing: '0.1em',
            padding: '4px 10px',
            fontWeight: 400,
          }}
        >
          Poupa {bundle.discountPercent}%
        </div>

        {/* Packaging label */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <Package size={12} className="text-gold" strokeWidth={1.5} />
          <span
            className="font-body uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)' }}
          >
            {bundle.packagingLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 lg:p-7">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3
              className="font-display text-gray-900"
              style={{ fontSize: '22px', fontWeight: 400 }}
            >
              {bundle.name}
            </h3>
            <p
              className="font-body text-gray-400 mt-1"
              style={{ fontSize: '12px', fontWeight: 300 }}
            >
              {bundle.pairCount} pares · {bundle.packagingLabel}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p
              className="font-display text-gray-900"
              style={{ fontSize: '22px', fontWeight: 400 }}
            >
              {formatPrice(bundle.price)}
            </p>
            <p
              className="font-body line-through"
              style={{ fontSize: '12px', color: '#9E9E9E', fontWeight: 300 }}
            >
              {formatPrice(bundle.originalPrice)}
            </p>
          </div>
        </div>

        <p
          className="font-body text-gray-600 leading-relaxed mb-5"
          style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7 }}
        >
          {bundle.description}
        </p>

        {/* Products included */}
        {bundleProducts.length > 0 && (
          <div className="mb-5">
            <p
              className="font-body uppercase mb-2"
              style={{ fontSize: '10px', letterSpacing: '0.1em', color: '#9E9E9E' }}
            >
              Inclui
            </p>
            <ul className="space-y-1.5">
              {bundleProducts.map((p) => p && (
                <li key={p.id} className="flex items-center gap-2 font-body text-gray-700" style={{ fontSize: '12px', fontWeight: 300 }}>
                  <span
                    className="rounded-full flex-shrink-0"
                    style={{
                      height: '10px',
                      width: '10px',
                      backgroundColor: p.colorHex,
                      border: '1px solid rgba(0,0,0,0.1)',
                    }}
                  />
                  {p.name} — {p.color}
                  <span style={{ color: '#9E9E9E' }}>({p.materialLabel})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Savings */}
        <div
          className="mb-5 p-3 flex items-center"
          style={{ background: 'rgba(184,150,12,0.06)', border: '1px solid rgba(184,150,12,0.15)' }}
        >
          <span
            className="font-body"
            style={{ fontSize: '12px', fontWeight: 400, color: '#A8893E' }}
          >
            Poupa {formatPrice(savings)} em relação ao preço unitário
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Link
            href="/loja"
            className="w-full flex items-center justify-center gap-2 font-body uppercase transition-all duration-300"
            style={{
              background: '#0a0a0a',
              color: '#ffffff',
              fontSize: '11px',
              letterSpacing: '0.15em',
              padding: '16px',
              fontWeight: 400,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#B8960C' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#0a0a0a' }}
          >
            Escolher Tamanho e Comprar <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  )
}
