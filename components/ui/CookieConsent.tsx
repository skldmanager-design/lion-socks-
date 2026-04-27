'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const COOKIE_KEY = 'lion-socks-cookie-consent'

type Consent = {
  essential: true
  functional: boolean
  analytics: boolean
  marketing: boolean
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [consent, setConsent] = useState<Consent>({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false,
  })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY)
      if (!stored) setVisible(true)
    } catch {}
  }, [])

  const save = (c: Consent) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...c, timestamp: Date.now() }))
    setVisible(false)
  }

  const acceptAll = () => save({ essential: true, functional: true, analytics: true, marketing: true })
  const rejectAll = () => save({ essential: true, functional: false, analytics: false, marketing: false })
  const savePrefs = () => save(consent)

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Preferências de Cookies"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        maxWidth: '520px',
        zIndex: 60,
        background: '#0A0A0A',
        border: '1px solid #B8960C',
        borderRadius: '4px',
        padding: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        animation: 'slideUp 400ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <p className="text-gold text-[11px] uppercase tracking-widest font-body mb-3">Preferências de Cookies</p>

      {!showSettings ? (
        <>
          <p className="font-body text-sm leading-relaxed mb-5" style={{ color: '#F5F3EE' }}>
            Usamos cookies para melhorar a sua experiência, analisar o tráfego e personalizar conteúdo.
            Pode aceitar todos ou gerir as suas preferências.{' '}
            <Link href="/cookies" className="text-gold underline underline-offset-2">
              Saber mais
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={acceptAll}
              className="flex-1 font-body text-xs uppercase tracking-widest bg-gold text-gray-900 py-3 hover:bg-[#D4AF37] transition-all"
            >
              Aceitar Todos
            </button>
            <button
              onClick={rejectAll}
              className="flex-1 font-body text-xs uppercase tracking-widest border border-gray-700 text-gray-300 py-3 hover:border-gray-500 hover:text-white transition-all"
              style={{ background: 'transparent' }}
            >
              Rejeitar
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="flex-1 font-body text-xs uppercase tracking-widest text-gold py-3 hover:text-white transition-colors"
              style={{ background: 'transparent', border: '1px solid #2A2A2A' }}
            >
              Preferências
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-3 mb-5">
            <ConsentRow
              label="Essenciais"
              description="Necessários para o site funcionar."
              checked
              disabled
              onChange={() => {}}
            />
            <ConsentRow
              label="Funcionais"
              description="Lembram preferências (idioma, favoritos)."
              checked={consent.functional}
              onChange={(v) => setConsent({ ...consent, functional: v })}
            />
            <ConsentRow
              label="Analíticos"
              description="Ajudam-nos a melhorar o site (anónimos)."
              checked={consent.analytics}
              onChange={(v) => setConsent({ ...consent, analytics: v })}
            />
            <ConsentRow
              label="Marketing"
              description="Permitem anúncios personalizados."
              checked={consent.marketing}
              onChange={(v) => setConsent({ ...consent, marketing: v })}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={savePrefs}
              className="flex-1 font-body text-xs uppercase tracking-widest bg-gold text-gray-900 py-3 hover:bg-[#D4AF37] transition-all"
            >
              Guardar Preferências
            </button>
            <button
              onClick={() => setShowSettings(false)}
              className="font-body text-xs uppercase tracking-widest text-gray-400 py-3 px-4 hover:text-white transition-colors"
              style={{ background: 'transparent' }}
            >
              Voltar
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

function ConsentRow({ label, description, checked, disabled, onChange }: {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer" style={{ opacity: disabled ? 0.6 : 1 }}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 accent-[#B8960C]"
        style={{ width: '14px', height: '14px' }}
      />
      <div className="flex-1">
        <p className="font-body text-sm" style={{ color: '#F5F3EE', fontWeight: 500 }}>{label}</p>
        <p className="font-body text-xs" style={{ color: '#999999' }}>{description}</p>
      </div>
    </label>
  )
}
