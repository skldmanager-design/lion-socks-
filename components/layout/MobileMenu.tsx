'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navigation, type NavItem } from '@/lib/navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

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

  const toggle = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label))
  }

  const closeAll = () => {
    setExpanded(null)
    onClose()
  }

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
          width: 'min(340px, 100vw)',
          background: '#0A0A0A',
          borderRight: '1px solid #2A2A2A',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6"
          style={{ height: '72px', borderBottom: '1px solid #2A2A2A' }}
        >
          <Link
            href="/"
            onClick={closeAll}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '18px',
              fontWeight: 500,
              color: '#F5F3EE',
              letterSpacing: '0.08em',
              textDecoration: 'none',
            }}
          >
            LION SOCKS
          </Link>
          <button
            onClick={onClose}
            className="p-1 hover:text-gold"
            style={{ color: '#F5F3EE', transition: 'color 200ms ease' }}
            aria-label="Fechar menu"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav list */}
        <nav className="flex-1 overflow-y-auto">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navigation.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                isExpanded={expanded === item.label}
                onToggle={() => toggle(item.label)}
                onLinkClick={closeAll}
              />
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: '20px 24px',
            borderTop: '1px solid #2A2A2A',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '11px',
              color: '#6B6B6B',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Envio gratuito acima de €45
          </p>
        </div>
      </div>
    </>
  )
}

/* ─── Sub-component: single nav item with optional accordion ─── */

interface MobileNavItemProps {
  item: NavItem
  isExpanded: boolean
  onToggle: () => void
  onLinkClick: () => void
}

function MobileNavItem({ item, isExpanded, onToggle, onLinkClick }: MobileNavItemProps) {
  const hasDropdown = !!item.dropdown

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: '13px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: item.highlight ? '#B8960C' : '#F5F3EE',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 24px',
    background: 'none',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    transition: 'color 200ms ease',
  }

  if (!hasDropdown) {
    return (
      <li style={{ borderBottom: '1px solid #2A2A2A' }}>
        <Link href={item.href} onClick={onLinkClick} style={labelStyle}>
          {item.label.toUpperCase()}
        </Link>
      </li>
    )
  }

  return (
    <li style={{ borderBottom: '1px solid #2A2A2A' }}>
      <button onClick={onToggle} style={labelStyle} aria-expanded={isExpanded}>
        <span>{item.label.toUpperCase()}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          style={{
            transition: 'transform 200ms ease',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {isExpanded && item.dropdown && (
        <div style={{ padding: '0 24px 20px 24px' }}>
          {item.dropdown.type === 'simple' ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {item.dropdown.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onLinkClick}
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '14px',
                      color: '#F5F3EE',
                      textDecoration: 'none',
                      display: 'block',
                      padding: '10px 0',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            item.dropdown.columns.map((col) => (
              <div key={col.title} style={{ marginBottom: '20px' }}>
                <h4
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '11px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#B8960C',
                    marginBottom: '10px',
                  }}
                >
                  {col.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onLinkClick}
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: '14px',
                          color: '#F5F3EE',
                          textDecoration: 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '8px 0',
                        }}
                      >
                        <span>{link.label}</span>
                        {link.price && (
                          <span style={{ color: '#B8960C', fontWeight: 500 }}>
                            {link.price}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </li>
  )
}
