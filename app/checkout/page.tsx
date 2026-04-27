import type { Metadata } from 'next'
import CheckoutClient from './CheckoutClient'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Finalize a sua compra Lion Socks.',
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
