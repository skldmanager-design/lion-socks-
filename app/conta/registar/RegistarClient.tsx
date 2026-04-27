'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function RegistarClient() {
  const router = useRouter()
  const { register } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const res = await register(email, password, firstName, lastName)
    setSubmitting(false)
    if (res.ok) {
      router.push('/conta')
    } else {
      setError(res.error || 'Erro ao criar conta')
    }
  }

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl text-gray-900 mb-2">Criar Conta</h1>
          <p className="font-body text-sm text-gray-500">Junte-se à Lion Socks.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">Nome</label>
              <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-200 px-4 py-3 font-body text-sm bg-white focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">Apelido</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-200 px-4 py-3 font-body text-sm bg-white focus:outline-none focus:border-gold" />
            </div>
          </div>
          <div>
            <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 px-4 py-3 font-body text-sm bg-white focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 px-4 py-3 font-body text-sm bg-white focus:outline-none focus:border-gold" />
            <p className="font-body text-xs text-gray-400 mt-1">Mínimo 6 caracteres.</p>
          </div>
          {error && <p className="font-body text-sm" style={{ color: '#B8960C' }}>{error}</p>}
          <button type="submit" disabled={submitting}
            className="w-full font-body text-xs tracking-widest uppercase bg-gray-900 text-white py-4 hover:bg-gold hover:text-gray-900 transition-all duration-300 disabled:opacity-50">
            {submitting ? 'A criar...' : 'Criar Conta'}
          </button>
        </form>

        <p className="mt-6 text-center font-body text-sm text-gray-500">
          Já tem conta?{' '}
          <Link href="/conta" className="text-gold underline underline-offset-2">Iniciar sessão</Link>
        </p>
      </div>
    </div>
  )
}
