'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Bundle, Product } from '@/lib/mock-data'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

interface Props {
  bundle: Bundle
  products: Product[]
}

const SIZES: Array<'39-42' | '42-45' | '45-48'> = ['39-42', '42-45', '45-48']

export default function PackDetailClient({ bundle, products }: Props) {
  const { addItem } = useCart()
  const [size, setSize] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = async () => {
    if (!size) return
    setLoading(true)

    await new Promise((r) => setTimeout(r, 400))

    addItem({
      variantId: `bundle-${bundle.id}-${size}`,
      productHandle: bundle.handle,
      productTitle: bundle.name,
      variantTitle: `${bundle.pairCount} pares · Tamanho ${size}`,
      price: bundle.price,
      image: bundle.image,
      quantity: 1,
    })

    setLoading(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <nav className="font-body text-gray-400 mb-6" style={{ fontSize: '12px' }}>
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-primary">Início</Link></li>
            <li>/</li>
            <li><Link href="/packs" className="hover:text-primary">Packs</Link></li>
            <li>/</li>
            <li className="text-gray-700">{bundle.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 mb-20">
          {/* Image */}
          <div
            style={{
              background: '#FFFFFF',
              aspectRatio: '4/5',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Image
              src={bundle.image}
              alt={bundle.name}
              fill

              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>

          {/* Info */}
          <div className="space-y-5">
            <p className="text-gold uppercase font-body" style={{ fontSize: '11px', letterSpacing: '0.15em', fontWeight: 500 }}>
              Pack Premium
            </p>

            <div>
              <h1 className="font-display text-gray-900 mb-2" style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 400 }}>
                {bundle.name}
              </h1>
              <p className="font-body text-gray-500" style={{ fontSize: '14px' }}>
                {bundle.tagline}
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <p className="font-body text-gray-900" style={{ fontSize: '24px', fontWeight: 400 }}>
                {formatPrice(bundle.price)}
              </p>
              {bundle.originalPrice > bundle.price && (
                <>
                  <p className="font-body text-gray-400 line-through" style={{ fontSize: '16px' }}>
                    {formatPrice(bundle.originalPrice)}
                  </p>
                  <span className="text-gold font-body" style={{ fontSize: '12px', fontWeight: 500 }}>
                    Poupa {bundle.discountPercent}%
                  </span>
                </>
              )}
            </div>

            <p className="font-body text-gray-700 leading-relaxed" style={{ fontSize: '14px', fontWeight: 300 }}>
              {bundle.description}
            </p>

            {/* Size selector */}
            <div className="pt-2">
              <p className="font-body uppercase text-gray-500 mb-3" style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 500 }}>
                Tamanho
              </p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="font-body transition-all"
                    style={{
                      fontSize: '13px',
                      padding: '10px 20px',
                      border: size === s ? '1px solid #0A0A0A' : '1px solid #E0E0E0',
                      background: size === s ? '#0A0A0A' : '#FFFFFF',
                      color: size === s ? '#FFFFFF' : '#0A0A0A',
                      cursor: 'pointer',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!size || loading}
              className="w-full font-body text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                padding: '16px',
                background: added ? '#B8960C' : !size ? '#999999' : '#0A0A0A',
                color: '#FFFFFF',
                border: 'none',
                cursor: !size || loading ? 'not-allowed' : 'pointer',
                fontWeight: 500,
                letterSpacing: '0.12em',
              }}
            >
              {loading ? 'A adicionar...' : added ? 'Adicionado ✓' : !size ? 'Escolhe um tamanho' : `Adicionar ao Carrinho — ${formatPrice(bundle.price)}`}
            </button>

            {/* Trust */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3" style={{ fontSize: '12px', color: '#6B6B6B' }}>
              <span>📦 Envio grátis +€49</span>
              <span>↩️ Devoluções 30 dias</span>
              <span>🛡️ Garantia</span>
            </div>
          </div>
        </div>

        {/* What's inside */}
        {products.length > 0 && (
          <div>
            <h2 className="font-display text-gray-900 mb-2" style={{ fontSize: '28px', fontWeight: 400 }}>
              O que inclui
            </h2>
            <p className="font-body text-gray-500 mb-8" style={{ fontSize: '14px' }}>
              {bundle.pairCount} pares cuidadosamente selecionados.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/loja/${p.handle}`}
                  className="group block"
                  style={{ background: '#FFFFFF', padding: '16px', borderRadius: '4px' }}
                >
                  <div style={{ aspectRatio: '1/1', background: '#F5F3EE', marginBottom: '12px', position: 'relative' }}>
                    <Image src={p.images[0]} alt={p.name} fill className="object-contain p-4" />
                  </div>
                  <p className="font-body text-gold uppercase mb-1" style={{ fontSize: '10px', letterSpacing: '0.12em', fontWeight: 500 }}>
                    {p.materialLabel}
                  </p>
                  <p className="font-body text-gray-900" style={{ fontSize: '13px', fontWeight: 400 }}>
                    {p.name}
                  </p>
                  <p className="font-body text-gray-500" style={{ fontSize: '12px' }}>
                    {p.color}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
