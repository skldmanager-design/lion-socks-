'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ArrowLeft } from 'lucide-react'

const benefits = [
  {
    title: 'Curadoria exclusiva',
    desc: 'Cada selecção é escolhida pela equipa Lion Socks — nunca repetida, sempre surpreendente.',
  },
  {
    title: 'Acesso antecipado',
    desc: 'Novos modelos e cores exclusivas antes de chegarem à loja. Primeiro a saber, primeiro a escolher.',
  },
  {
    title: 'Embalagem premium',
    desc: 'Cada entrega chega numa caixa de metal com logo embossed. Uma experiência, não apenas um pacote.',
  },
  {
    title: 'Total flexibilidade',
    desc: 'Pausa, cancela ou ajusta a frequência a qualquer momento. Sem compromissos, sem letras pequenas.',
  },
]

const WAITLIST_COUNT = 847

export default function LionsCircleClient() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { setError('Por favor introduza o seu email.'); return }
    if (!email.includes('@')) { setError('Email inválido.'); return }

    setLoading(true)
    setError('')
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20" style={{ background: '#0a0a0a' }}>
      {/* Back link */}
      <div className="absolute left-4 sm:left-8 z-10" style={{ top: '284px' }}>
        <Link
          href="/"
          className="flex items-center gap-1.5 font-body transition-colors hover:text-white"
          style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}
        >
          <ArrowLeft size={12} strokeWidth={1.5} />
          Início
        </Link>
      </div>

      <div className="w-full max-w-lg text-center">
        {!submitted ? (
          <>
            {/* Pre-headline */}
            <p
              className="font-body uppercase mb-6"
              style={{ fontSize: '14px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 400 }}
            >
              Em Breve
            </p>

            {/* Headline */}
            <h1
              className="font-display text-white mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, lineHeight: 1.1 }}
            >
              The Lion&apos;s Circle
            </h1>

            <p
              className="font-body mx-auto mb-12"
              style={{
                fontSize: '15px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '540px',
                lineHeight: 1.8,
              }}
            >
              Uma selecção curada de meias premium, entregue à sua porta.
              Trimestral ou mensal — para quem quer o melhor sem esforço.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-12 text-left max-w-md mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '1px solid rgba(184,150,12,0.4)',
                      marginTop: '2px',
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B8960C', display: 'block' }} />
                  </div>
                  <div>
                    <p
                      className="font-body text-white"
                      style={{ fontSize: '14px', fontWeight: 400 }}
                    >
                      {b.title}
                    </p>
                    <p
                      className="font-body"
                      style={{ fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginTop: '2px' }}
                    >
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
              <div>
                <div
                  className="flex items-center"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.3)' }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    placeholder="O seu email"
                    required
                    className="flex-1 bg-transparent font-body focus:outline-none"
                    style={{
                      fontSize: '15px',
                      fontWeight: 300,
                      color: 'rgba(255,255,255,0.9)',
                      padding: '12px 0',
                    }}
                    aria-label="Email"
                  />
                </div>
                {error && (
                  <p className="font-body mt-2" style={{ fontSize: '12px', color: '#ff6b6b' }}>
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full font-body uppercase transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{
                  border: '1px solid #B8960C',
                  color: '#B8960C',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  padding: '16px',
                  fontWeight: 400,
                  background: 'transparent',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = '#B8960C'; e.currentTarget.style.color = '#0a0a0a' } }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#B8960C' }}
              >
                {loading ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border border-gold border-t-transparent" />
                    A processar…
                  </>
                ) : (
                  'ENTRAR NA LISTA'
                )}
              </button>
            </form>

            {/* Counter */}
            <p
              className="font-body mt-6"
              style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}
            >
              Já{' '}
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                {WAITLIST_COUNT} pessoas
              </span>{' '}
              na lista de espera
            </p>
          </>
        ) : (
          /* Success state */
          <div>
            <div
              className="inline-flex h-16 w-16 items-center justify-center rounded-full mb-8"
              style={{ border: '1px solid rgba(184,150,12,0.4)' }}
            >
              <Check size={28} className="text-gold" strokeWidth={1.5} />
            </div>

            <h2
              className="font-display text-white mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400 }}
            >
              Está na lista.
            </h2>
            <p
              className="font-body mb-3"
              style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}
            >
              Recebemos o seu email. Quando The Lion&apos;s Circle abrir,
              será um dos primeiros a saber.
            </p>
            <p
              className="font-body mb-10"
              style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}
            >
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>{WAITLIST_COUNT + 1} pessoas</span> já estão na lista.
            </p>

            <div className="space-y-3 max-w-sm mx-auto">
              <Link
                href="/loja"
                className="block w-full font-body uppercase text-center transition-all duration-300"
                style={{
                  border: '1px solid rgba(184,150,12,0.4)',
                  color: '#B8960C',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  padding: '16px',
                  fontWeight: 400,
                }}
              >
                EXPLORAR A LOJA
              </Link>
              <Link
                href="/packs"
                className="block w-full font-body uppercase text-center transition-all duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  padding: '12px',
                  fontWeight: 400,
                }}
              >
                VER PACKS
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
