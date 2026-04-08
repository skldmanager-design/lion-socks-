'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const dismissed = localStorage.getItem('lion_socks_announcement_dismissed')
    if (dismissed === 'true') setVisible(false)
  }, [])

  const handleClose = () => {
    localStorage.setItem('lion_socks_announcement_dismissed', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="relative z-40 overflow-hidden"
      style={{ background: '#0A0A0A', height: '24px' }}
    >
      <div
        className="flex items-center justify-center relative"
        style={{
          height: '24px',
          paddingLeft: '40px',
          paddingRight: '40px',
        }}
      >
        <span
          className="font-body uppercase"
          style={{
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: '#B8960C',
            fontWeight: 500,
          }}
        >
          ENVIO GRATUITO EM COMPRAS ACIMA DE €45
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
    </div>
  )
}
