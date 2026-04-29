import type { Metadata } from 'next'
import CartPageClient from './CartPageClient'
import { getFeaturedBundles } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Carrinho',
  description: 'O seu carrinho de compras Lion Socks.',
  robots: { index: false, follow: false },
}

export default async function CarrinhoPage() {
  const featuredBundles = (await getFeaturedBundles()).slice(0, 2)
  return <CartPageClient featuredBundles={featuredBundles} />
}
