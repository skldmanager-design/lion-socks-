'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, RotateCcw, Shield } from 'lucide-react'
import type { Product } from '@/lib/catalog'
import { products as allProducts } from '@/lib/catalog'
import Badge from '@/components/ui/Badge'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AddToCart from './AddToCart'
import { cn, formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'

// Material → composition copy. Lookup beats a 3-deep ternary.
const MATERIAL_COMPOSITION: Record<string, string> = {
  'seda':
    'seda natural, 100% pura. Naturalmente termorreguladora, hipoalergénica e de uma suavidade incomparável.',
  'fil-d-ecosse':
    'algodão egípcio de fibra longa, mercerizado duas vezes para conferir brilho subtil e durabilidade excepcional. Composição: 85% algodão, 12% poliamida, 3% elastano.',
  'la-merino':
    'lã merino ultrafina de 18,5 microns — abaixo do limiar de picada. Naturalmente termorreguladora. Composição: 80% lã merino, 17% poliamida, 3% elastano.',
  'cashmere':
    'cashmere puro da Mongólia. Subpêlo recolhido à mão, oito vezes mais isolante que lã comum. Suavidade incomparável.',
  'algodao-penteado':
    'algodão de fibra longa, penteado para remover imperfeições. Macio, durável, sem encolher nem deformar.',
}

interface ProductInfoProps {
  product: Product
}

const accordionItems = (product: Product) => [
  {
    title: 'Materiais & Composição',
    content: `Este par é fabricado em ${product.materialLabel} — ${
      MATERIAL_COMPOSITION[product.material] ?? MATERIAL_COMPOSITION['algodao-penteado']
    }`,
  },
  {
    title: 'Cuidados & Lavagem',
    content:
      'Lavar à mão ou em programa delicados a 30°C. Não usar lixívia. Não torcer. Secar na horizontal. Não secar em máquina. Para meias de seda, recomendamos sempre lavagem à mão.',
  },
  {
    title: 'Envios & Devoluções',
    content:
      `Envio gratuito em compras acima de €${FREE_SHIPPING_THRESHOLD}. Para encomendas abaixo, o custo de envio é €3,50. Prazo de entrega: 1–3 dias úteis para Portugal Continental. Devoluções gratuitas no prazo de 30 dias, produto não usado e embalagem original.`,
  },
]

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-body text-gray-900" style={{ fontSize: '14px', fontWeight: 400 }}>
          {title}
        </span>
        <span
          className="text-gray-400 flex-shrink-0 transition-transform duration-300"
          style={{
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            fontSize: '20px',
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '600px' : '0' }}
      >
        <p
          className="font-body text-gray-600 pb-4"
          style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.8 }}
        >
          {content}
        </p>
      </div>
    </div>
  )
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const siblings = allProducts.filter(
    (p) =>
      p.name === product.name &&
      p.material === product.material &&
      p.pattern === product.pattern &&
      p.type === product.type,
  )

  return (
    <div className="space-y-5">
      <Breadcrumbs
        items={[
          { label: 'Início', href: '/' },
          { label: 'Loja', href: '/loja' },
          { label: product.name },
        ]}
      />

      {/* Material label */}
      <p
        className="font-body uppercase"
        style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 500 }}
      >
        {product.materialLabel}
      </p>

      {/* Title + Badges inline */}
      <div>
        <h1
          className="font-display text-gray-900 mb-2"
          style={{ fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 400 }}
        >
          {product.name}
        </h1>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline">{product.typeLabel}</Badge>
          {product.badge && <Badge variant="gold">{product.badge}</Badge>}
        </div>
      </div>

      <p className="font-body text-gray-900" style={{ fontSize: '22px', fontWeight: 400 }}>
        {formatPrice(product.price)}
      </p>

      {/* Color picker — siblings (same name + material + pattern, different color) */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="font-body uppercase text-gray-400"
            style={{ fontSize: '10px', letterSpacing: '0.15em' }}
          >
            Cor:
          </span>
          <span className="font-body text-gray-700" style={{ fontSize: '13px', fontWeight: 400 }}>
            {product.color}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {siblings.map((s) => {
                const active = s.id === product.id
                return (
                  <Link
                    key={s.id}
                    href={`/loja/${s.handle}`}
                    aria-label={s.color}
                    title={s.color}
                    style={{
                      display: 'inline-block',
                      height: '44px',
                      width: '44px',
                      borderRadius: '50%',
                      backgroundColor: s.colorHex,
                      border: active ? '2px solid #B8960C' : '1px solid rgba(0,0,0,0.15)',
                      outline: active ? '1px solid #B8960C' : 'none',
                      outlineOffset: '2px',
                      transition: 'all 200ms ease',
                    }}
                  />
                )
              })}
        </div>
      </div>

      {/* Add to cart — BEFORE description (build desire, then justify) */}
      <div className="pt-2">
        <AddToCart product={product} />
      </div>

      {/* Trust badges — immediately after CTA */}
      <div
        className="flex flex-wrap gap-x-6 gap-y-2 pt-3 pb-1"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '16px' }}
      >
        {[
          { Icon: Package, text: `Envio grátis +€${FREE_SHIPPING_THRESHOLD}` },
          { Icon: RotateCcw, text: 'Devoluções 30 dias' },
          { Icon: Shield, text: 'Garantia de qualidade' },
        ].map(({ Icon, text }) => (
          <div key={text} className="flex items-center gap-1.5">
            <Icon size={13} strokeWidth={1.5} style={{ color: '#B8960C' }} />
            <span className="font-body text-gray-500" style={{ fontSize: '12px' }}>
              {text}
            </span>
          </div>
        ))}
      </div>

      {/* Description — AFTER the CTA (justifies the purchase decision) */}
      <p
        className="font-body text-gray-700"
        style={{
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: 1.8,
        }}
      >
        {product.description}
      </p>

      {/* Accordion */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '8px' }}>
        {accordionItems(product).map((item) => (
          <AccordionItem key={item.title} title={item.title} content={item.content} />
        ))}
      </div>

      {/* Material link */}
      <div className="pt-2">
        <Link
          href={`/materiais/${product.material}`}
          className="font-body transition-colors hover:opacity-70"
          style={{ fontSize: '12px', color: '#B8960C', textDecoration: 'underline', textUnderlineOffset: '2px' }}
        >
          Saber mais sobre {product.materialLabel} →
        </Link>
      </div>
    </div>
  )
}
