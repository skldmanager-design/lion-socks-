'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navigation, type NavItem } from '@/lib/navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const closeAll = () => onClose()

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 transition-opacity duration-200 lg:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal
        aria-label="Menu de navegação"
        className={cn(
          'fixed left-0 top-0 h-full z-50 flex flex-col transition-transform duration-200 ease-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{
          width: 'min(280px, 65vw)',
          background: '#0A0A0A',
          borderRight: '1px solid #2A2A2A',
        }}
      >
        {/* Top — Account link with user icon (no LION SOCKS text) */}
        <div
          className="flex items-center justify-between"
          style={{ padding: '14px 18px', borderBottom: '1px solid #2A2A2A' }}
        >
          <Link
            href="/conta"
            onClick={closeAll}
            className="flex items-center"
            style={{
              gap: '10px',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#F5F3EE',
              textDecoration: 'none',
            }}
          >
            <User size={14} strokeWidth={1.5} />
            <span style={{ fontSize: '11px' }}>Iniciar sessão</span>
          </Link>
          <button
            onClick={onClose}
            className="hover:text-gold"
            style={{ color: '#F5F3EE', transition: 'color 200ms ease', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            aria-label="Fechar menu"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav list */}
        <nav className="flex-1 overflow-y-auto">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ borderBottom: '1px solid #2A2A2A' }}>
              <Link
                href="/"
                onClick={closeAll}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#F5F3EE',
                  textDecoration: 'none',
                  display: 'block',
                  padding: '14px 18px',
                }}
              >
                Página inicial
              </Link>
            </li>
            {navigation.map((item) => (
              <MobileNavItem key={item.label} item={item} onLinkClick={closeAll} />
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}

/* ─── Sub-component: single nav item with optional accordion ─── */

interface MobileNavItemProps {
  item: NavItem
  onLinkClick: () => void
}

function MobileNavItem({ item, onLinkClick }: MobileNavItemProps) {
  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: item.highlight ? '#B8960C' : '#F5F3EE',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    background: 'none',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    transition: 'color 200ms ease',
  }

  // Mobile: cada tópico vai directamente para a sua página, sem accordion.
  return (
    <li style={{ borderBottom: '1px solid #2A2A2A' }}>
      <Link href={item.href} onClick={onLinkClick} style={labelStyle}>
        {item.label.toUpperCase()}
      </Link>
    </li>
  )
}
