import type { Metadata } from 'next'
import FavoritosClient from './FavoritosClient'

export const metadata: Metadata = {
  title: 'Favoritos',
  description: 'Os seus produtos favoritos Lion Socks.',
}

export default function FavoritosPage() {
  return <FavoritosClient />
}
