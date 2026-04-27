import type { Metadata } from 'next'
import RegistarClient from './RegistarClient'

export const metadata: Metadata = {
  title: 'Criar Conta',
  description: 'Crie a sua conta Lion Socks.',
}

export default function RegistarPage() {
  return <RegistarClient />
}
