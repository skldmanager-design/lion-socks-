import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { bundles, getBundleByHandle, products } from '@/lib/catalog'
import { siteConfig } from '@/lib/site-config'
import PackDetailClient from './PackDetailClient'

interface Props {
  params: Promise<{ handle: string }>
}

export function generateStaticParams() {
  return bundles.map((b) => ({ handle: b.handle }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const bundle = await getBundleByHandle(handle)
  if (!bundle) return {}
  return {
    title: bundle.name,
    description: bundle.description.slice(0, 160),
  }
}

export default async function PackDetailPage({ params }: Props) {
  const { handle } = await params
  const bundle = await getBundleByHandle(handle)

  if (!bundle) notFound()

  const bundleProducts = bundle.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: bundle.name,
    description: bundle.description,
    brand: { '@type': 'Brand', name: 'Lion Socks' },
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.url}/packs/${bundle.handle}`,
      priceCurrency: 'EUR',
      price: bundle.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PackDetailClient bundle={bundle} products={bundleProducts} />
    </>
  )
}
