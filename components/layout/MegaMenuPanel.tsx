'use client'

import Link from 'next/link'
import type { NavItem } from '@/lib/navigation'
import EditorialSlot from './EditorialSlot'

interface MegaMenuPanelProps {
  item: NavItem
  onLinkClick: () => void
}

export default function MegaMenuPanel({ item, onLinkClick }: MegaMenuPanelProps) {
  if (!item.dropdown) return null

  // --- Simple dropdown (Novidades, Sale) ---
  if (item.dropdown.type === 'simple') {
    return (
      <div
        style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          background: '#0A0A0A',
          borderTop: '1px solid #2A2A2A',
          borderBottom: '1px solid #2A2A2A',
          borderRight: '1px solid #2A2A2A',
          borderLeft: '1px solid #2A2A2A',
          minWidth: '240px',
          padding: '20px 0',
          borderRadius: '4px',
          marginTop: '4px',
        }}
      >
        {item.dropdown.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className="block hover:text-gold"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#F5F3EE',
              padding: '10px 28px',
              transition: 'color 200ms ease',
              textDecoration: 'none',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    )
  }

  // --- Mega menu (Homem, Mulher, Packs) ---
  const { columns, editorial } = item.dropdown

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#0A0A0A',
        borderTop: '1px solid #2A2A2A',
        borderBottom: '1px solid #2A2A2A',
        zIndex: 25,
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '60px 40px',
          display: 'flex',
          gap: '60px',
          justifyContent: 'space-between',
        }}
      >
        {/* Columns */}
        <div style={{ display: 'flex', gap: '60px', flex: 1 }}>
          {columns.map((col) => (
            <div key={col.title} style={{ minWidth: '180px' }}>
              <h4
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#B8960C',
                  marginBottom: '20px',
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map((link) => (
                  <li key={link.href} style={{ padding: '8px 0' }}>
                    <Link
                      href={link.href}
                      onClick={onLinkClick}
                      className="hover:text-gold"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#F5F3EE',
                        textDecoration: 'none',
                        transition: 'color 200ms ease',
                        display: 'inline-flex',
                        alignItems: 'baseline',
                        gap: '8px',
                      }}
                    >
                      {link.label}
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
          ))}
        </div>

        {/* Editorial slot */}
        <div onClick={onLinkClick}>
          <EditorialSlot data={editorial} />
        </div>
      </div>
    </div>
  )
}
