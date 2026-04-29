import type { Metadata } from 'next'
import Link from 'next/link'
import { products } from '@/lib/catalog'
import CollectionGrid from '@/components/collection/CollectionGrid'

export const metadata: Metadata = {
  title: 'Loja',
  description:
    "Explore toda a colecção Lion Socks — meias premium em seda, fil d'Écosse e lã merino. Elegância que se nota nos detalhes.",
}

export default function LojaPage() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Page header — editorial */}
        <div className="text-center mb-12 lg:mb-14">
          <p
            className="font-body uppercase mb-3"
            style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#B8960C', fontWeight: 500 }}
          >
            Toda a Colecção
          </p>
          <h1
            className="font-display text-gray-900 mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 400, lineHeight: 1.1 }}
          >
            Loja
          </h1>
          <div style={{ width: '40px', height: '1px', background: '#B8960C', margin: '18px auto' }} />
          <p
            className="font-body mx-auto"
            style={{ fontSize: '14px', lineHeight: 1.7, color: '#6B6B6B', maxWidth: '480px', fontWeight: 300 }}
          >
            Meias premium para quem valoriza cada detalhe. Fio de Escócia, lã merino e seda — materiais que se sentem.
          </p>
        </div>

        {/* Gender tabs */}
        <div
          className="flex items-center gap-4 mb-10 pb-4"
          style={{ borderBottom: '1px solid rgba(10,10,10,0.1)' }}
        >
          <Link
            href="/loja/homem"
            className="font-body uppercase transition-colors"
            style={{
              fontSize: '13px',
              letterSpacing: '0.14em',
              fontWeight: 500,
              color: '#0A0A0A',
              padding: '10px 22px',
              border: '1px solid #0A0A0A',
              borderRadius: '3px',
              textDecoration: 'none',
            }}
          >
            Homem
          </Link>

          <span
            className="font-body uppercase"
            style={{
              fontSize: '13px',
              letterSpacing: '0.14em',
              fontWeight: 500,
              color: 'rgba(10,10,10,0.35)',
              padding: '10px 22px',
              border: '1px solid rgba(10,10,10,0.15)',
              borderRadius: '3px',
              fontStyle: 'italic',
              cursor: 'not-allowed',
            }}
            title="Colecção feminina em breve"
          >
            Mulher · em breve
          </span>

          <span
            className="hidden sm:inline-block font-body ml-auto"
            style={{ fontSize: '12px', color: '#6B6B6B' }}
          >
            Ou navegue toda a colecção abaixo
          </span>
        </div>

        <CollectionGrid products={products} showFilters />
      </div>
    </div>
  )
}
