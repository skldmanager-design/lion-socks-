'use client'

import { useState } from 'react'

export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Obrigado!')
      } else {
        setStatus('error')
        setMessage(data.error || 'Erro')
      }
    } catch {
      setStatus('error')
      setMessage('Erro de ligação. Tente novamente.')
    }
  }

  if (status === 'success') {
    return (
      <p className="font-body" style={{ fontSize: '13px', color: '#B8960C' }}>
        {message}
      </p>
    )
  }

  return (
    <form className="space-y-0" onSubmit={handleSubmit}>
      <div className="flex items-center" style={{ borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'}` }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="O seu email"
          required
          className="flex-1 bg-transparent font-body focus:outline-none"
          style={{
            fontSize: '14px',
            fontWeight: 300,
            color: dark ? 'rgba(255,255,255,0.8)' : '#1a1a1a',
            padding: '8px 0',
          }}
          aria-label="Email para newsletter"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="font-body transition-colors hover:text-gold flex-shrink-0 disabled:opacity-50"
          style={{
            fontSize: '18px',
            color: '#B8960C',
            padding: '4px 0 4px 12px',
            background: 'none',
            border: 'none',
            cursor: status === 'loading' ? 'wait' : 'pointer',
          }}
          aria-label="Subscrever newsletter"
        >
          {status === 'loading' ? '...' : '→'}
        </button>
      </div>
      {status === 'error' && (
        <p className="font-body mt-2" style={{ fontSize: '12px', color: '#B8960C' }}>
          {message}
        </p>
      )}
    </form>
  )
}
