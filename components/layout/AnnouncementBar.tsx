'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

// Priority: 1) Shipping, 2) Golden Line, 3) Heritage
const MESSAGES = [
  'Portes grátis acima de €49  ·  Entregas em 24h',
  'A linha dourada no punho  ·  Para quem repara nos detalhes',
  'Fabrico artesanal no Porto  ·  Merino, fio de escócia, seda, cashmere',
]

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const dismissed = localStorage.getItem('lion_socks_announcement_dismissed')
    if (dismissed === 'true') setVisible(false)
  }, [])

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % MESSAGES.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [visible])

  const handleClose = () => {
    localStorage.setItem('lion_socks_announcement_dismissed', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="announce-bar relative z-40 overflow-hidden"
      style={{ background: '#0A0A0A', borderBottom: '1px solid #1A1A1A' }}
    >
      <style>{`
        .announce-bar { height: 32px; }
        .announce-bar .announce-inner { height: 32px; padding: 0 40px; }
        .announce-bar .announce-msg { font-size: 11px; letter-spacing: 0.08em; }
        @media (max-width: 639px) {
          .announce-bar { height: 36px; }
          .announce-bar .announce-inner { height: 36px; padding: 0 32px; }
          .announce-bar .announce-msg { font-size: 10px; letter-spacing: 0.05em; text-align: center; }
        }
      `}</style>
      <div className="announce-inner flex items-center justify-center relative">
        <span
          key={idx}
          className="announce-msg font-body uppercase"
          style={{
            color: '#B8960C',
            fontWeight: 500,
            animation: 'fadeIn 500ms ease',
          }}
        >
          {MESSAGES[idx]}
        </span>

        <button
          onClick={handleClose}
          className="absolute p-1"
          style={{
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#F5F3EE',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            transition: 'color 200ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#B8960C')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F3EE')}
          aria-label="Fechar barra de anúncios"
        >
          <X size={11} strokeWidth={1.5} />
        </button>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
