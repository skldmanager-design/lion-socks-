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

export default function PackCard({ bundle }: PackCardProps) {
  const bundleProducts = bundle.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <div
      id={bundle.handle}
      className="relative flex flex-col overflow-hidden group"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.08)',
        transition: 'all 320ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 14px 40px rgba(10,10,10,0.08)'
        e.currentTarget.style.borderColor = 'rgba(184,150,12,0.4)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Image area — soft cream gradient */}
      <div
        className="relative overflow-hidden"
        style={{
          height: '240px',
          background: 'linear-gradient(165deg, #F5F3EE 0%, #FFFFFF 50%, #EFEBE2 100%)',
        }}
      >
        <Image
          src={bundle.image}
          alt={bundle.name}
          fill
          unoptimized
          className="object-contain"
          style={{ padding: '28px', transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Pair count — gold pill */}
        <span
          className="absolute top-4 right-4 font-body uppercase"
          style={{
            background: 'rgba(255,255,255,0.9)',
            color: '#B8960C',
            fontSize: '10px',
            letterSpacing: '0.16em',
            padding: '5px 12px',
            fontWeight: 600,
            borderRadius: '999px',
            border: '1px solid rgba(184,150,12,0.2)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {bundle.pairCount} pares
        </span>

        {/* Packaging label */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <Package size={11} strokeWidth={1.5} style={{ color: '#B8960C' }} />
          <span
            className="font-body uppercase"
            style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#6B6B6B', fontWeight: 500 }}
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

        {/* CTA — premium black slab with gold rule on hover */}
        <div className="mt-auto">
          <Link
            href={`/packs/${bundle.handle}`}
            className="w-full flex items-center justify-center gap-2 font-body uppercase"
            style={{
              background: '#0A0A0A',
              color: '#F5F3EE',
              fontSize: '11px',
              letterSpacing: '0.18em',
              padding: '18px',
              fontWeight: 500,
              border: '1px solid #0A0A0A',
              borderBottom: '2px solid #0A0A0A',
              textDecoration: 'none',
              transition: 'all 280ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottom = '2px solid #B8960C'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottom = '2px solid #0A0A0A'
            }}
          >
            Ver Pack <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  )
}
