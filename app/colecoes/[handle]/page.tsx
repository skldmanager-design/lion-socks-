import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { collections, getProductsByCollection } from '@/lib/mock-data'
import CollectionGrid from '@/components/collection/CollectionGrid'

interface Props {
  params: Promise<{ handle: string }>
}

export async function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const col = collections.find((c) => c.handle === handle)
  if (!col) return {}

  return {
    title: col.name,
    description: `Descubra a colecção ${col.name} da Lion Socks. ${col.description}`,
  }
}

const collectionImages: Record<string, string> = {
  'fil-d-ecosse':
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1600&h=500&fit=crop&auto=format&q=80',
  'la-merino':
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&h=500&fit=crop&auto=format&q=80',
  seda: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1600&h=500&fit=crop&auto=format&q=80',
  executive:
    'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1600&h=500&fit=crop&auto=format&q=80',
  essentials:
    'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=1600&h=500&fit=crop&auto=format&q=80',
  novidades:
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1600&h=500&fit=crop&auto=format&q=80',
}

export default async function ColecaoPage({ params }: Props) {
  const { handle } = await params
  const col = collections.find((c) => c.handle === handle)

  if (!col) notFound()

  const colProducts = getProductsByCollection(handle)

  if (colProducts.length === 0) notFound()

  const heroImage = collectionImages[handle] ?? collectionImages['novidades']

  return (
    <div className="pb-20 lg:pb-28">
      {/* Hero banner */}
      <div className="relative h-56 lg:h-72 overflow-hidden mb-14 lg:mb-20">
        <Image
          src={heroImage}
          alt={col.name}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-body mb-3">
              Coleção
            </p>
            <h1 className="font-display text-4xl lg:text-5xl text-white mb-3">
              {col.name}
            </h1>
            <p className="text-cream/70 font-body text-sm max-w-md mx-auto">
              {col.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <CollectionGrid products={colProducts} showFilters />
      </div>
    </div>
  )
}
