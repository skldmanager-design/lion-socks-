import { notFound } from 'next/navigation'
import Link from 'next/link'
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

// TODO pré-launch: substituir por fotografia editorial específica de cada colecção
// Por agora reusamos as 4 hero images locais (já comprimidas em /public/home/)
const collectionImages: Record<string, string> = {
  'fil-d-ecosse': '/home/colecao-classica.jpg',
  'la-merino': '/home/hero-homem.jpg',
  seda: '/home/seda-elegancia.jpg',
  executive: '/home/edicoes-limitadas.jpg',
  essentials: '/home/colecao-classica.jpg',
  novidades: '/home/edicoes-limitadas.jpg',
  ribeira: '/home/hero-homem.jpg',
  oficio: '/home/colecao-classica.jpg',
  lello: '/home/seda-elegancia.jpg',
  reserva: '/home/edicoes-limitadas.jpg',
  alma: '/home/colecao-classica.jpg',
}

export default async function ColecaoPage({ params }: Props) {
  const { handle } = await params
  const col = collections.find((c) => c.handle === handle)

  if (!col) notFound()

  const colProducts = getProductsByCollection(handle)
  const heroImage = collectionImages[handle] ?? collectionImages['novidades']

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pb-20 lg:pb-28">
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
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.6) 100%)',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-body mb-3">
              Colecção
            </p>
            <h1 className="font-display text-4xl lg:text-5xl text-white mb-3">
              {col.name}
            </h1>
            <p
              className="text-cream/70 font-body mx-auto"
              style={{ fontSize: '14px', lineHeight: 1.6, maxWidth: '560px', overflowWrap: 'break-word' }}
            >
              {col.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {colProducts.length > 0 ? (
          <CollectionGrid products={colProducts} showFilters />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p
              className="font-body uppercase mb-3"
              style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#B8960C' }}
            >
              Colecção em preparação
            </p>
            <h2 className="font-display text-gray-900 mb-4" style={{ fontSize: '28px' }}>
              A chegar brevemente.
            </h2>
            <p className="font-body text-gray-600 max-w-md mb-8" style={{ fontSize: '14px', lineHeight: 1.7 }}>
              Esta colecção está a ser preparada. Subscreva a newsletter para ser dos primeiros a conhecer os modelos.
            </p>
            <Link
              href="/loja"
              className="font-body uppercase"
              style={{
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: '#B8960C',
                border: '1px solid #B8960C',
                padding: '14px 28px',
                borderRadius: '4px',
              }}
            >
              Explorar a Loja →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
