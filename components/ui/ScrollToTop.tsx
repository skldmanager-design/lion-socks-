'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Voltar ao topo"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: '#0A0A0A',
        color: '#B8960C',
        border: '1px solid #B8960C',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'all 400ms cubic-bezier(0.22, 1, 0.36, 1)',
        zIndex: 40,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#B8960C'
        e.currentTarget.style.color = '#0A0A0A'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#0A0A0A'
        e.currentTarget.style.color = '#B8960C'
      }}
    >
      <ArrowUp size={18} strokeWidth={1.5} />
    </button>
  )
}
