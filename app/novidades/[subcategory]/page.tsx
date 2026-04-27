import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductsByCollection, products } from '@/lib/mock-data'
import CollectionGrid from '@/components/collection/CollectionGrid'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface Props {
  params: Promise<{ subcategory: string }>
}

const SUBCATEGORY_MAP: Record<string, { name: string; filter: (p: any) => boolean; description: string }> = {
  ultimas: {
    name: 'Últimas Chegadas',
    filter: (p) => p.collections.includes('novidades'),
    description: 'O que há de novo na Lion Socks.',
  },
  'primavera-2026': {
    name: 'Coleção Primavera 2026',
    filter: (p) => p.material === 'fil-d-ecosse' || p.material === 'seda',
    description: 'Leveza e cor para a nova estação.',
  },
  'edicoes-limitadas': {
    name: 'Edições Limitadas',
    filter: (p) => p.badge === 'Edição Limitada',
    description: 'Produção limitada. Exclusividade total.',
  },
  'pre-venda': {
    name: 'Pré-venda',
    filter: (p) => p.badge === 'Destaque',
    description: 'Garanta o seu par antes de esgotar.',
  },
}

export function generateStaticParams() {
  return Object.keys(SUBCATEGORY_MAP).map((subcategory) => ({ subcategory }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params
  const config = SUBCATEGORY_MAP[subcategory]
  if (!config) return {}
  return { title: config.name, description: config.description }
}

export default async function NovidadesSubcategoryPage({ params }: Props) {
  const { subcategory } = await params
  const config = SUBCATEGORY_MAP[subcategory]

  if (!config) notFound()

  const filtered = products.filter(config.filter)

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Breadcrumbs items={[
          { label: 'Início', href: '/' },
          { label: 'Novidades', href: '/novidades' },
          { label: config.name },
        ]} />
        <div className="mb-12 max-w-xl">
          <p className="text-gold text-[12px] tracking-[0.15em] uppercase font-body mb-3">
            Novidades
          </p>
          <h1 className="font-display text-4xl lg:text-5xl text-gray-900 mb-4">
            {config.name}
          </h1>
          <p className="text-gray-400 font-body text-sm leading-relaxed">
            {config.description}
          </p>
        </div>
        <CollectionGrid products={filtered} showFilters />
      </div>
    </div>
  )
}
