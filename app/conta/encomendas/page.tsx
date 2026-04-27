import type { Metadata } from 'next'
import EncomendasClient from './EncomendasClient'

export const metadata: Metadata = {
  title: 'As Minhas Encomendas',
}

export default function EncomendasPage() {
  return <EncomendasClient />
}
