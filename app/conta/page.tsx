import type { Metadata } from 'next'
import ContaClient from './ContaClient'

export const metadata: Metadata = {
  title: 'A Minha Conta',
  description: 'Aceda à sua conta Lion Socks.',
}

export default function ContaPage() {
  return <ContaClient />
}
