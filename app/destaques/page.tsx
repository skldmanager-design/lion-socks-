import type { Metadata } from 'next'
import Link from 'next/link'
import { products } from '@/lib/catalog'
import CollectionGrid from '@/components/collection/CollectionGrid'

export const metadata: Metadata = {
  title: 'Destaques',
  description: 'Novidades, edições limitadas e promoções Lion Socks.',
}

export default function DestaquesPage() {
  // Featured: products in 'novidades' collection + badge 'Destaque'
  const featured = products.filter(
    (p) => p.collections.includes('novidades') || p.badge === 'Destaque' || p.badge === 'Edição Limitada'
  )

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-12 max-w-xl">
          <p className="text-gold text-[12px] tracking-[0.15em] uppercase font-body mb-3">
            Destaques
          </p>
          <h1 className="font-display text-4xl lg:text-5xl text-gray-900 mb-4">
            O que está a acontecer.
          </h1>
          <p className="text-gray-500 font-body text-sm leading-relaxed">
            Últimas chegadas, edições limitadas e promoções.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { href: '/novidades', label: 'Últimas Chegadas' },
            { href: '/novidades/edicoes-limitadas', label: 'Edições Limitadas' },
            { href: '/sale', label: 'Em Saldo' },
            { href: '/sale/ultimas', label: 'Últimas Unidades' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-xs uppercase tracking-widest border border-gray-300 text-gray-700 px-5 py-2.5 hover:border-gold hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <CollectionGrid products={featured} showFilters />
      </div>
    </div>
  )
}
