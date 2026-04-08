'use client'

import { useState } from 'react'

export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <p className="font-body" style={{ fontSize: '13px', color: '#B8960C' }}>
        Obrigado! Irá receber as nossas novidades em breve.
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
          className="font-body transition-colors hover:text-gold flex-shrink-0"
          style={{
            fontSize: '18px',
            color: '#B8960C',
            padding: '4px 0 4px 12px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label="Subscrever newsletter"
        >
          →
        </button>
      </div>
    </form>
  )
}
