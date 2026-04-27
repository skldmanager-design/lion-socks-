'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

interface Address {
  street: string
  city: string
  postalCode: string
  country: string
}

export default function MoradaClient() {
  const { user } = useAuth()
  const [address, setAddress] = useState<Address>({ street: '', city: '', postalCode: '', country: 'Portugal' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lion-socks-address')
      if (stored) setAddress(JSON.parse(stored))
    } catch {}
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('lion-socks-address', JSON.stringify(address))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <nav className="font-body text-xs text-gray-400 mb-6">
          <Link href="/conta" className="hover:text-gold">Conta</Link> / Morada
        </nav>
        <h1 className="font-display text-3xl text-gray-900 mb-8">Morada de Envio</h1>

        <form onSubmit={handleSave} className="space-y-5 bg-white p-8" style={{ border: '1px solid #E8E5DF', borderRadius: '4px' }}>
          <div>
            <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">Morada</label>
            <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })}
              className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-gold" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">Cidade</label>
              <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">Código Postal</label>
              <input type="text" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-gold" />
            </div>
          </div>
          <div>
            <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">País</label>
            <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })}
              className="w-full border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-gold" />
          </div>
          <button type="submit"
            className="w-full font-body text-xs tracking-widest uppercase bg-gray-900 text-white py-4 hover:bg-gold hover:text-gray-900 transition-all">
            {saved ? 'Guardado ✓' : 'Guardar Morada'}
          </button>
        </form>
      </div>
    </div>
  )
}
