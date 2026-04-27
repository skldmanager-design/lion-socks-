import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getProductsByGender, products } from '@/lib/mock-data'
import CollectionGrid from '@/components/collection/CollectionGrid'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface Props {
  params: Promise<{ subcategory: string }>
}

const SUBCATEGORY_MAP: Record<string, { name: string; filter: (p: any) => boolean; description: string }> = {
  classica: {
    name: 'Clássica',
    filter: (p) => p.collections.includes('fil-d-ecosse') || p.pattern === 'solid' || p.pattern === 'ribbed',
    description: 'Lisos e canelados atemporais em fil d\'Écosse e lã merino.',
  },
  executive: {
    name: 'Executive',
    filter: (p) => p.type === 'over-the-calf' || p.collections.includes('executive'),
    description: 'Over-the-calf para os dias em que os detalhes importam mais.',
  },
  sport: {
    name: 'Sport & Casual',
    filter: (p) => p.type === 'no-show' || p.pattern === 'ribbed',
    description: 'Conforto e performance para o dia a dia.',
  },
  'edicoes-limitadas': {
    name: 'Edições Limitadas',
    filter: (p) => p.badge === 'Edição Limitada' || p.collections.includes('edicoes-limitadas'),
    description: 'Produção limitada. Peças exclusivas.',
  },
}

export function generateStaticParams() {
  return Object.keys(SUBCATEGORY_MAP).map((subcategory) => ({ subcategory }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params
  const config = SUBCATEGORY_MAP[subcategory]
  if (!config) return {}
  return {
    title: `Homem — ${config.name}`,
    description: config.description,
  }
}

export default async function HomemSubcategoryPage({ params }: Props) {
  const { subcategory } = await params
  const config = SUBCATEGORY_MAP[subcategory]

  if (!config) notFound()

  const filtered = getProductsByGender('homem').filter(config.filter)

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Breadcrumbs items={[
          { label: 'Início', href: '/' },
          { label: 'Homem', href: '/loja/homem' },
          { label: config.name },
        ]} />
        <div className="mb-12 max-w-xl">
          <p className="text-gold text-[12px] tracking-[0.15em] uppercase font-body mb-3">
            Homem · {config.name}
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
