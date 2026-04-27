'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function EncomendasClient() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-24 pb-24 text-center">
        <p className="font-body text-sm text-gray-500 mb-6">Precisa de iniciar sessão.</p>
        <Link href="/conta" className="font-body text-xs uppercase tracking-widest bg-gray-900 text-white px-8 py-4">
          Iniciar Sessão
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <nav className="font-body text-xs text-gray-400 mb-6">
          <Link href="/conta" className="hover:text-gold">Conta</Link> / Encomendas
        </nav>
        <h1 className="font-display text-3xl text-gray-900 mb-8">As Minhas Encomendas</h1>

        <div className="bg-white p-10 text-center" style={{ border: '1px solid #E8E5DF', borderRadius: '4px' }}>
          <p className="font-body text-sm text-gray-500 mb-6">
            Ainda não fez nenhuma encomenda.
          </p>
          <Link href="/loja" className="font-body text-xs uppercase tracking-widest bg-gray-900 text-white px-8 py-4 hover:bg-gold hover:text-gray-900 transition-all">
            Fazer Primeira Encomenda
          </Link>
        </div>
      </div>
    </div>
  )
}
