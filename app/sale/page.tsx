import type { Metadata } from 'next'
import { products } from '@/lib/mock-data'
import CollectionGrid from '@/components/collection/CollectionGrid'

export const metadata: Metadata = {
  title: 'Sale',
  description: 'Promoções Lion Socks — meias premium a preços especiais.',
}

export default function SalePage() {
  // For now, show all products — will be filtered when sale prices are added
  const saleProducts = products.slice(0, 8)

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-12 max-w-xl">
          <p className="text-gold text-[12px] tracking-[0.15em] uppercase font-body mb-3">
            Promoções
          </p>
          <h1 className="font-display text-4xl lg:text-5xl text-gray-900 mb-4">
            Sale
          </h1>
          <p className="text-gray-400 font-body text-sm leading-relaxed">
            Meias premium a preços especiais. Disponibilidade limitada.
          </p>
        </div>
        <CollectionGrid products={saleProducts} showFilters />
      </div>
    </div>
  )
}
