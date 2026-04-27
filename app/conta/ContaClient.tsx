'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function ContaClient() {
  const router = useRouter()
  const { user, login, logout, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) {
    return <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-24 pb-24" />
  }

  if (user) {
    return (
      <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mb-10">
            <p className="text-gold text-xs uppercase tracking-widest font-body mb-2">A Minha Conta</p>
            <h1 className="font-display text-4xl text-gray-900 mb-2">Olá, {user.firstName}</h1>
            <p className="font-body text-sm text-gray-500">{user.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AccountCard title="Encomendas" description="Ver histórico e estado" href="/conta/encomendas" />
            <AccountCard title="Morada" description="Gerir moradas de envio" href="/conta/morada" />
            <AccountCard title="Favoritos" description="Produtos guardados" href="/favoritos" />
          </div>

          <button
            onClick={() => { logout(); router.push('/') }}
            className="mt-10 font-body text-xs uppercase tracking-widest text-gray-500 border-b border-gray-300 pb-1 hover:text-gold hover:border-gold transition-colors"
          >
            Terminar Sessão
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const res = await login(email, password)
    setSubmitting(false)
    if (res.ok) {
      router.push('/conta')
    } else {
      setError(res.error || 'Erro ao iniciar sessão')
    }
  }

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl text-gray-900 mb-2">Iniciar Sessão</h1>
          <p className="font-body text-sm text-gray-500">Aceda à sua conta Lion Socks.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 px-4 py-3 font-body text-sm text-gray-900 bg-white focus:outline-none focus:border-gold"
              placeholder="o.seu@email.com"
            />
          </div>
          <div>
            <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 px-4 py-3 font-body text-sm text-gray-900 bg-white focus:outline-none focus:border-gold"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="font-body text-sm" style={{ color: '#B8960C' }}>{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full font-body text-xs tracking-widest uppercase bg-gray-900 text-white py-4 hover:bg-gold hover:text-gray-900 transition-all duration-300 disabled:opacity-50"
          >
            {submitting ? 'A entrar...' : 'Entrar'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="font-body text-sm text-gray-500">
            Não tem conta?{' '}
            <Link href="/conta/registar" className="text-gold underline underline-offset-2">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function AccountCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="block bg-white p-6 hover:shadow-lg transition-shadow"
      style={{ borderRadius: '4px', border: '1px solid #E8E5DF' }}
    >
      <h3 className="font-display text-lg text-gray-900 mb-1">{title}</h3>
      <p className="font-body text-sm text-gray-500">{description}</p>
    </Link>
  )
}
