import type { Metadata } from 'next'
import { products } from '@/lib/mock-data'
import CollectionGrid from '@/components/collection/CollectionGrid'

export const metadata: Metadata = {
  title: 'Loja',
  description:
    "Explore toda a colecção Lion Socks — meias premium em seda, fil d'Écosse e lã merino. Elegância que se nota nos detalhes.",
}

export default function LojaPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Page header */}
        <div className="mb-12 max-w-xl">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-body mb-3">
            Toda a Colecção
          </p>
          <h1 className="font-display text-4xl lg:text-5xl text-gray-900 mb-4">
            Loja
          </h1>
          <p className="text-gray-400 font-body text-sm leading-relaxed">
            Meias premium para o homem que valoriza cada detalhe.
            Fil d&apos;Écosse, lã merino e seda — materiais que se sentem.
          </p>
        </div>

        <CollectionGrid products={products} showFilters />
      </div>
    </div>
  )
}
