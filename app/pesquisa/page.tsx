import { Suspense } from 'react'
import type { Metadata } from 'next'
import SearchClient from './SearchClient'

export const metadata: Metadata = {
  title: 'Pesquisar',
  description: 'Pesquise a coleção Lion Socks.',
}

export default function PesquisaPage() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Suspense fallback={<p>A carregar...</p>}>
          <SearchClient />
        </Suspense>
      </div>
    </div>
  )
}
