import type { Metadata } from 'next'
import MoradaClient from './MoradaClient'

export const metadata: Metadata = {
  title: 'Morada',
}

export default function MoradaPage() {
  return <MoradaClient />
}
