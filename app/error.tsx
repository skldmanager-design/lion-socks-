'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-24 pb-24 flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <p className="text-gold text-xs uppercase tracking-widest font-body mb-3">Erro</p>
        <h1 className="font-display text-4xl text-gray-900 mb-4">Algo correu mal</h1>
        <p className="font-body text-sm text-gray-500 mb-8 leading-relaxed">
          Peço desculpa pelo inconveniente. Tente novamente ou volte à homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="font-body text-xs uppercase tracking-widest bg-gray-900 text-white px-8 py-4 hover:bg-gold hover:text-gray-900 transition-all"
          >
            Tentar Novamente
          </button>
          <Link
            href="/"
            className="font-body text-xs uppercase tracking-widest border border-gray-900 text-gray-900 px-8 py-4 hover:bg-gray-900 hover:text-white transition-all"
          >
            Voltar à Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
