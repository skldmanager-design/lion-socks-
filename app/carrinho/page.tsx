import type { Metadata } from 'next'
import CartPageClient from './CartPageClient'

export const metadata: Metadata = {
  title: 'Carrinho',
  description: 'O seu carrinho de compras Lion Socks.',
  robots: { index: false, follow: false },
}

export default function CarrinhoPage() {
  return <CartPageClient />
}
