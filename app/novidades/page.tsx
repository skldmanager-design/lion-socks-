import type { Metadata } from 'next'
import { getProductsByCollection } from '@/lib/mock-data'
import CollectionGrid from '@/components/collection/CollectionGrid'

export const metadata: Metadata = {
  title: 'Novidades',
  description: 'As últimas chegadas à Lion Socks — descubra as novidades da coleção.',
}

export default function NovidadesPage() {
  const products = getProductsByCollection('novidades')

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-12 max-w-xl">
          <p className="text-gold text-[12px] tracking-[0.15em] uppercase font-body mb-3">
            Novidades
          </p>
          <h1 className="font-display text-4xl lg:text-5xl text-gray-900 mb-4">
            Últimas Chegadas
          </h1>
          <p className="text-gray-400 font-body text-sm leading-relaxed">
            O que há de novo na Lion Socks.
          </p>
        </div>
        <CollectionGrid products={products} showFilters />
      </div>
    </div>
  )
}
