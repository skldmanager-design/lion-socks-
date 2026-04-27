'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { NavItem } from '@/lib/navigation'

const SHARED_TRANSITION = { duration: 0.16, ease: 'easeOut' as const }

/**
 * Two-zone backdrop — rendered ONCE at Header level, not inside the panel.
 * That way it persists while the user moves between MEN/WOMAN/BOX items
 * (no exit/re-enter flicker on item switch).
 *
 *   • Top strip (above nav): SOLID #0A0A0A — kills hero showing through transparent header chrome
 *   • Bottom (below nav): semi-transparent dim — image stays visible behind, only darkens
 *
 * Header chrome (logo z:31, announcement z:40, nav z:50) renders on top of both zones.
 */
export function MegaMenuBackdrop({ scrolled }: { scrolled?: boolean }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const topStripH = scrolled ? 48 : 180

  return createPortal(
    <>
      <motion.div
        key="bd-top"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={SHARED_TRANSITION}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `${topStripH}px`,
          background: '#0A0A0A',
          zIndex: 20,
          pointerEvents: 'none',
        }}
        aria-hidden
      />
      <motion.div
        key="bd-bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={SHARED_TRANSITION}
        style={{
          position: 'fixed',
          top: `${topStripH}px`,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.42)',
          zIndex: 20,
          pointerEvents: 'none',
        }}
        aria-hidden
      />
    </>,
    document.body,
  )
}

const MENU_ANIM = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: SHARED_TRANSITION,
}

interface MegaMenuPanelProps {
  item: NavItem
  onLinkClick: () => void
  scrolled?: boolean
}

export default function MegaMenuPanel({ item, onLinkClick, scrolled }: MegaMenuPanelProps) {
  if (!item.dropdown) return null

  // ── Simple dropdown (Destaques) ──────────────────────────────────
  if (item.dropdown.type === 'simple') {
    return (
      <motion.div
        {...MENU_ANIM}
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          background: '#0A0A0A',
          minWidth: '220px',
          padding: '20px 0',
          zIndex: 40,
        }}
      >
        {item.dropdown.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: 'rgba(245,243,238,0.78)',
              textDecoration: 'none',
              display: 'block',
              padding: '9px 32px',
              transition: 'color 140ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#B8960C')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,243,238,0.78)')}
          >
            {link.label}
          </Link>
        ))}
      </motion.div>
    )
  }

  // ── Mega menu — full-width dark panel, editorial ────────────────
  const { columns } = item.dropdown
  const columnCount = columns.length
  const isWide = columnCount >= 5

  // Backdrop is rendered once at Header level (see MegaMenuBackdrop) — persists
  // across item switches so the top-black + bottom-dim never flicker.
  return (
    <motion.div
      {...MENU_ANIM}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#0A0A0A',
        borderTop: '1px solid rgba(245,243,238,0.06)',
        zIndex: 40,
      }}
      >
      <div
        style={{
          maxWidth: isWide ? '1200px' : '1040px',
          margin: '0 auto',
          padding: '32px 48px 36px',
          display: 'grid',
          gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
          gap: isWide ? '40px' : '56px',
        }}
      >
        {columns.map((col) => (
          <div key={col.title}>
            <h4
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#B8960C',
                marginBottom: '14px',
                paddingBottom: '10px',
                borderBottom: '1px solid rgba(184,150,12,0.18)',
              }}
            >
              {col.title}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {col.links.map((link) => (
                <li key={link.href} style={{ padding: '3px 0' }}>
                  <Link
                    href={link.href}
                    onClick={onLinkClick}
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '13px',
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: link.muted ? 'rgba(245,243,238,0.35)' : 'rgba(245,243,238,0.72)',
                      textDecoration: 'none',
                      transition: 'color 140ms ease',
                      display: 'inline-flex',
                      alignItems: 'baseline',
                      gap: '10px',
                      fontStyle: link.muted ? 'italic' : 'normal',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = link.muted ? 'rgba(245,243,238,0.5)' : '#B8960C')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = link.muted ? 'rgba(245,243,238,0.35)' : 'rgba(245,243,238,0.72)')
                    }
                  >
                    {link.label}
                    {link.price && (
                      <span style={{ color: 'rgba(184,150,12,0.7)', fontWeight: 400, fontSize: '12px' }}>
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
    </motion.div>
  )
}
