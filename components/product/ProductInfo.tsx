'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/mock-data'
import Badge from '@/components/ui/Badge'
import AddToCart from './AddToCart'
import { cn } from '@/lib/utils'

interface ProductInfoProps {
  product: Product
}

const accordionItems = (product: Product) => [
  {
    title: 'Materiais & Composição',
    content: `Este par é fabricado em ${product.materialLabel} — ${
      product.material === 'seda'
        ? 'seda natural, 100% pura. Naturalmente termorreguladora, hipoalergénica e de uma suavidade incomparável.'
        : product.material === 'fil-d-ecosse'
        ? "algodão egípcio de fibra longa, mercerizado duas vezes para conferir brilho subtil e durabilidade excepcional. Composição: 85% algodão, 12% poliamida, 3% elastano."
        : 'lã merino ultrafina de 18,5 microns — abaixo do limiar de picada. Naturalmente termorreguladora. Composição: 80% lã merino, 17% poliamida, 3% elastano.'
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
      'Envio gratuito em compras acima de €45. Para encomendas abaixo, o custo de envio é €3,50. Prazo de entrega: 1–3 dias úteis para Portugal Continental. Devoluções gratuitas no prazo de 30 dias, produto não usado e embalagem original.',
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
        style={{ maxHeight: open ? '200px' : '0' }}
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
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="font-body text-gray-400" aria-label="Breadcrumb" style={{ fontSize: '12px' }}>
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-primary transition-colors">Início</Link></li>
          <li>/</li>
          <li><Link href="/loja" className="hover:text-primary transition-colors">Loja</Link></li>
          <li>/</li>
          <li className="text-gray-700">{product.name}</li>
        </ol>
      </nav>

      {/* Material label */}
      <p
        className="font-body uppercase"
        style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 500 }}
      >
        {product.materialLabel}
      </p>

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap -mt-2">
        <Badge variant="outline">{product.typeLabel}</Badge>
        {product.badge && <Badge variant="gold">{product.badge}</Badge>}
      </div>

      {/* Title */}
      <div>
        <h1
          className="font-display text-gray-900 mb-1"
          style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 400 }}
        >
          {product.name}
        </h1>
        <p className="font-body text-gray-500" style={{ fontSize: '14px' }}>
          {product.color} · {product.patternLabel}
        </p>
      </div>

      {/* Price */}
      <p className="font-body text-gray-900" style={{ fontSize: '24px', fontWeight: 400 }}>
        {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(product.price)}
      </p>

      {/* Color swatch */}
      <div className="flex items-center gap-3">
        <span
          className="font-body uppercase text-gray-400"
          style={{ fontSize: '10px', letterSpacing: '0.15em' }}
        >
          Cor:
        </span>
        <div className="flex items-center gap-2">
          <span
            className="rounded-full"
            style={{
              height: '20px',
              width: '20px',
              backgroundColor: product.colorHex,
              border: '2px solid #1a1a1a',
              outline: '2px solid rgba(26,26,26,0.2)',
              outlineOffset: '1px',
            }}
            aria-label={product.color}
          />
          <span className="font-body text-gray-700" style={{ fontSize: '14px', fontWeight: 300 }}>
            {product.color}
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        className="font-body text-gray-700 pt-5"
        style={{
          fontSize: '15px',
          fontWeight: 300,
          lineHeight: 1.8,
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        {product.description}
      </p>

      {/* Add to cart */}
      <AddToCart product={product} />

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
