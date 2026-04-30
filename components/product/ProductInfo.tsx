'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, RotateCcw } from 'lucide-react'
import type { Product } from '@/lib/catalog'
import { products as allProducts } from '@/lib/catalog'
import Badge from '@/components/ui/Badge'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AddToCart from './AddToCart'
import { ReviewsSummary } from './ProductReviews'
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
  activeColor?: string
  onColorChange?: (color: string) => void
}

const accordionItems = (product: Product) => [
  {
    title: 'Detalhes',
    content: [
      `**Composição.** ${MATERIAL_COMPOSITION[product.material] ?? MATERIAL_COMPOSITION['algodao-penteado']}`,
      `**Cuidados.** Lavar à mão ou programa delicado a 30°C. Não usar lixívia, não torcer. Secar na horizontal.`,
      `**Envio.** Gratuito acima de €${FREE_SHIPPING_THRESHOLD}; €3,50 abaixo. Entrega 1–3 dias úteis em Portugal Continental.`,
      `**Devoluções.** 30 dias, produto não usado, embalagem original.`,
    ].join('\n\n'),
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
        <div className="font-body text-gray-600 pb-4 space-y-3" style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.8 }}>
          {content.split('\n\n').map((para, i) => (
            <p key={i}>
              {para.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
                chunk.startsWith('**') && chunk.endsWith('**')
                  ? <strong key={j} className="font-medium text-gray-900">{chunk.slice(2, -2)}</strong>
                  : <span key={j}>{chunk}</span>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProductInfo({ product, activeColor, onColorChange }: ProductInfoProps) {
  // 1) Se o produto tem variants do backend (colorOptions), usa-as.
  // 2) Caso contrário (mock-data legacy), procura siblings por nome+material+pattern.
  const colorOptions = product.colorOptions ?? []
  const siblings = colorOptions.length === 0
    ? allProducts.filter(
        (p) =>
          p.name === product.name &&
          p.material === product.material &&
          p.pattern === product.pattern &&
          p.type === product.type,
      )
    : []
  const currentColor = activeColor ?? colorOptions[0]?.color ?? product.color

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

      <ReviewsSummary slug={product.handle} />

      {/* Color picker */}
      {(colorOptions.length > 0 || siblings.length > 1) && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-body uppercase text-gray-400" style={{ fontSize: '10px', letterSpacing: '0.15em' }}>Cor:</span>
            <span className="font-body text-gray-700" style={{ fontSize: '13px', fontWeight: 500 }}>{currentColor}</span>
            <span className="font-body text-gray-400" style={{ fontSize: '11px' }}>· {colorOptions.length || siblings.length} {(colorOptions.length || siblings.length) === 1 ? 'cor' : 'cores'}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {colorOptions.length > 0 ? (
              colorOptions.map((opt) => {
                const active = opt.color === currentColor
                return (
                  <button
                    key={opt.color}
                    type="button"
                    onClick={() => onColorChange?.(opt.color)}
                    aria-label={opt.color}
                    title={opt.color}
                    aria-pressed={active}
                    style={{
                      display: 'inline-block',
                      height: '16px',
                      width: '16px',
                      borderRadius: '50%',
                      backgroundColor: opt.colorHex,
                      border: active ? '1.5px solid #B8960C' : '1px solid rgba(0,0,0,0.18)',
                      boxShadow: active ? '0 0 0 2px rgba(184,150,12,0.20)' : 'none',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 160ms ease',
                    }}
                  />
                )
              })
            ) : (
              siblings.map((s) => {
                const active = s.id === product.id
                return (
                  <Link
                    key={s.id}
                    href={`/loja/${s.handle}`}
                    aria-label={s.color}
                    title={s.color}
                    style={{
                      display: 'inline-block',
                      height: '16px',
                      width: '16px',
                      borderRadius: '50%',
                      backgroundColor: s.colorHex,
                      border: active ? '1.5px solid #B8960C' : '1px solid rgba(0,0,0,0.18)',
                      boxShadow: active ? '0 0 0 2px rgba(184,150,12,0.20)' : 'none',
                      transition: 'all 160ms ease',
                    }}
                  />
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Add to cart — BEFORE description (build desire, then justify) */}
      <div className="pt-2">
        <AddToCart product={product} activeColor={currentColor} />
      </div>

      {/* Trust badges — immediately after CTA */}
      <div
        className="flex flex-wrap gap-x-6 gap-y-2 pt-3 pb-1"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '16px' }}
      >
        {[
          { Icon: Package, text: `Envio grátis acima de €${FREE_SHIPPING_THRESHOLD}` },
          { Icon: RotateCcw, text: 'Devolução em 30 dias' },
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
