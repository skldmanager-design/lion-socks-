import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { bundles, getBundleByHandle, products } from '@/lib/mock-data'
import PackDetailClient from './PackDetailClient'

interface Props {
  params: Promise<{ handle: string }>
}

export function generateStaticParams() {
  return bundles.map((b) => ({ handle: b.handle }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const bundle = getBundleByHandle(handle)
  if (!bundle) return {}
  return {
    title: bundle.name,
    description: bundle.description.slice(0, 160),
  }
}

export default async function PackDetailPage({ params }: Props) {
  const { handle } = await params
  const bundle = getBundleByHandle(handle)

  if (!bundle) notFound()

  const bundleProducts = bundle.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p)

  return <PackDetailClient bundle={bundle} products={bundleProducts} />
}
