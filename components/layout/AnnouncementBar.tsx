'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true)

  const handleClose = () => {
    document.documentElement.style.setProperty('--announcement-height', '0px')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed left-0 right-0 top-0 z-40 flex items-center justify-center px-10 overflow-hidden"
      style={{ background: '#0A0A0A', height: '36px' }}
    >
      <span
        className="font-body uppercase"
        style={{ fontSize: '11px', letterSpacing: '3px', color: '#C4A652', fontWeight: 400 }}
      >
        ENVIO GRATUITO EM COMPRAS ACIMA DE €45
      </span>

      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 transition-colors"
        style={{ color: 'rgba(197,165,90,0.4)' }}
        aria-label="Fechar barra de anúncios"
      >
        <X size={12} />
      </button>
    </div>
  )
}
