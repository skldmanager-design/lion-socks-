'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Search, User, Menu } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import MobileMenu from './MobileMenu'
import MegaMenuPanel from './MegaMenuPanel'
import { navigation } from '@/lib/navigation'

const NAV_LINK_STYLE: React.CSSProperties = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '13px',
  letterSpacing: '0.08em',
  fontWeight: 500,
  textTransform: 'uppercase',
  color: '#F5F3EE',
  textDecoration: 'none',
  padding: '6px 0',
  display: 'inline-block',
  position: 'relative',
  transition: 'color 200ms ease',
}

const UTILITY_LINK_STYLE: React.CSSProperties = {
  fontFamily: "'Inter', system-ui, sans-serif",
  fontSize: '11px',
  letterSpacing: '0.08em',
  fontWeight: 500,
  textTransform: 'uppercase',
  color: '#F5F3EE',
  textDecoration: 'none',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'color 200ms ease',
}

export default function Header() {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { totalItems, openCart } = useCart()

  // Scroll behavior: hide upper rows, keep nav sticky
  useEffect(() => {
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    openTimeoutRef.current = setTimeout(() => setOpenItem(label), 150)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }
    closeTimeoutRef.current = setTimeout(() => setOpenItem(null), 200)
  }, [])

  const closeMenu = useCallback(() => setOpenItem(null), [])

  return (
    <>
      <style jsx global>{`
        .nav-link-underline::after {
          content: '';
          position: absolute;
          left: 50%;
          right: 50%;
          bottom: 0;
          height: 1px;
          background: #B8960C;
          transition: left 300ms ease, right 300ms ease;
        }
        .nav-link-underline:hover::after,
        .nav-link-underline[data-open='true']::after {
          left: 0;
          right: 0;
        }
        .nav-link-underline:hover {
          color: #B8960C !important;
        }
      `}</style>

      {/* ─── Header: utility + logo (collapses on scroll) ─── */}
      <header
        style={{
          backgroundColor: '#0A0A0A',
          overflow: 'hidden',
          maxHeight: scrolled ? '0px' : '136px',
          opacity: scrolled ? 0 : 1,
          transition: 'max-height 300ms ease, opacity 250ms ease',
        }}
      >
        {/* Utility row — 36px per DESIGN.md */}
        <div
          className="hidden lg:flex items-center justify-between"
          style={{ height: '36px', padding: '0 40px' }}
        >
          <button
            className="hover:text-gold"
            style={UTILITY_LINK_STYLE}
            aria-label="Iniciar sessão"
          >
            <User size={13} strokeWidth={1.5} />
            <span>Iniciar Sessão</span>
          </button>

          <button
            onClick={openCart}
            className="relative hover:text-gold"
            style={UTILITY_LINK_STYLE}
            aria-label={`Carrinho — ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
          >
            <ShoppingBag size={13} strokeWidth={1.5} />
            <span>Carrinho</span>
            {totalItems > 0 && (
              <span
                className="absolute rounded-full"
                style={{
                  width: '6px',
                  height: '6px',
                  background: '#B8960C',
                  top: '-2px',
                  right: '-8px',
                }}
              />
            )}
          </button>
        </div>

        {/* Logo row — 100px per DESIGN.md, logo 90px */}
        <div
          className="flex items-center justify-center"
          style={{ height: '100px', padding: '0 40px' }}
        >
          <Link href="/" aria-label="Lion Socks — Homepage">
            <Image
              src="/lion_socks_brand_kit/01_logo_principal/logo_completo_transparente_1000h.png"
              alt="Lion Socks"
              width={528}
              height={1000}
              priority
              className="w-auto object-contain"
              style={{ height: '90px' }}
            />
          </Link>
        </div>
      </header>

      {/* ─── Nav row · STICKY · Always visible ─── */}
      <div
        className="flex items-center"
        style={{
          height: '56px',
          padding: '0 40px',
          position: 'sticky',
          top: 0,
          background: '#0A0A0A',
          zIndex: 30,
          borderBottom: '1px solid #2A2A2A',
        }}
      >
        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-1"
          style={{ color: '#F5F3EE' }}
          aria-label="Abrir menu"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>

        {/* Mobile cart */}
        <button
          onClick={openCart}
          className="lg:hidden absolute right-4 p-1"
          style={{ color: '#F5F3EE' }}
          aria-label={`Carrinho — ${totalItems}`}
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
          {totalItems > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 rounded-full"
              style={{ width: '8px', height: '8px', background: '#B8960C' }}
            />
          )}
        </button>

        {/* Desktop: Centered nav */}
        <nav
          className="hidden lg:flex items-center"
          style={{ gap: '44px', margin: '0 auto' }}
        >
          {navigation.map((item) => {
            const hasDropdown = !!item.dropdown
            const isOpen = openItem === item.label
            const style = item.highlight
              ? { ...NAV_LINK_STYLE, color: '#B8960C' }
              : NAV_LINK_STYLE

            return (
              <div
                key={item.label}
                onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="nav-link-underline"
                  style={style}
                  data-open={isOpen ? 'true' : 'false'}
                >
                  {item.label.toUpperCase()}
                </Link>

                {isOpen && hasDropdown && (
                  <MegaMenuPanel item={item} onLinkClick={closeMenu} />
                )}
              </div>
            )
          })}
        </nav>

        {/* Desktop: Search icon absolute right */}
        <button
          aria-label="Pesquisar"
          className="hidden lg:block absolute hover:text-gold transition-colors duration-200"
          style={{
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#F5F3EE',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <Search size={20} strokeWidth={1.5} />
        </button>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
