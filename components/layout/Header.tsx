'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Search, User, Menu, Heart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import MobileMenu from './MobileMenu'
import MegaMenuPanel, { MegaMenuBackdrop } from './MegaMenuPanel'
import QuickSearch from './QuickSearch'
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
  const [searchOpen, setSearchOpen] = useState(false)
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { totalItems, openCart } = useCart()
  const { count: wishlistCount } = useWishlist()
  const pathname = usePathname()

  // Close any open dropdown / mobile menu on route change.
  useEffect(() => {
    setOpenItem(null)
    setMobileOpen(false)
    setSearchOpen(false)
  }, [pathname])

  // Scroll behavior: hysteresis to prevent flicker near threshold.
  // Desktop: collapse at 200px, expand back below 80px.
  // Mobile: instant — preto assim que o hero começa a deslizar (header é só 64px alto).
  useEffect(() => {
    let state = false
    const onScroll = () => {
      const isMobile = window.matchMedia('(max-width: 1023px)').matches
      const downThreshold = isMobile ? 20 : 200
      const upThreshold = isMobile ? 5 : 80
      const y = window.scrollY
      if (!state && y > downThreshold) { state = true; setScrolled(true) }
      else if (state && y < upThreshold) { state = false; setScrolled(false) }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keyboard shortcut: Ctrl+K / Cmd+K opens search (industry standard)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    // If a dropdown is already open, switch immediately (crossfade feel).
    // Otherwise wait 120ms so accidental brushes don't trigger.
    const delay = openItem ? 0 : 120
    openTimeoutRef.current = setTimeout(() => setOpenItem(label), delay)
  }, [openItem])

  const handleMouseLeave = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = null
    }
    closeTimeoutRef.current = setTimeout(() => setOpenItem(null), 220)
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
          bottom: -2px;
          height: 1px;
          background: #B8960C;
          transition: left 320ms cubic-bezier(0.22, 1, 0.36, 1), right 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link-underline:hover::after,
        .nav-link-underline[data-open='true']::after {
          left: 0;
          right: 0;
        }
      `}</style>

      {/* ─── Header: logo centered, transparent over hero — smooth fade ── */}
      <header
        style={{
          backgroundColor: 'transparent',
          overflow: 'hidden',
          maxHeight: scrolled ? '0px' : '100px',
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? 'translateY(-30px) scale(0.92)' : 'translateY(0) scale(1)',
          transformOrigin: 'top center',
          transition: 'max-height 800ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
          position: 'relative',
          zIndex: 31,
          willChange: 'max-height, opacity, transform',
        }}
      >
        <div
          className="hidden lg:flex items-center justify-center"
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
              style={{ height: '80px' }}
            />
          </Link>
        </div>
      </header>

      {/* ─── Nav row · STICKY — transparent when at top, solid on scroll ─── */}
      <div
        className="hidden lg:grid items-center"
        style={{
          gridTemplateColumns: '1fr auto 1fr',
          height: '48px',
          padding: '0 40px',
          position: 'sticky',
          top: 0,
          background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
          zIndex: 50,
          borderBottom: scrolled ? '1px solid #2A2A2A' : '1px solid transparent',
          transition: 'background 300ms ease, border-color 300ms ease',
        }}
      >
        {/* Left spacer (mirrors right icons width for true centering) */}
        <div />

        {/* Center — Nav */}
        <nav
          className="flex items-center justify-center"
          style={{ gap: '40px' }}
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
                style={{ position: item.dropdown?.type === 'simple' ? 'relative' : 'static' }}
                onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className="nav-link-underline"
                  style={style}
                  data-open={isOpen ? 'true' : 'false'}
                  onClick={closeMenu}
                >
                  {item.label.toUpperCase()}
                </Link>

                <AnimatePresence mode="wait">
                  {isOpen && hasDropdown && (
                    <MegaMenuPanel
                      key={item.label}
                      item={item}
                      onLinkClick={closeMenu}
                      scrolled={scrolled}
                    />
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        {/* Right — Search + Cart + Account */}
        <div className="flex items-center gap-5 flex-shrink-0 justify-self-end">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Pesquisar"
            className="hover:text-gold transition-colors duration-200"
            style={{ color: '#F5F3EE', padding: '2px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Search size={18} strokeWidth={1.5} />
          </button>

          <Link
            href="/favoritos"
            aria-label={`Favoritos — ${wishlistCount}`}
            className="relative hover:text-gold transition-colors duration-200"
            style={{ color: '#F5F3EE', padding: '2px' }}
          >
            <Heart size={18} strokeWidth={1.5} fill={wishlistCount > 0 ? '#B8960C' : 'none'} color={wishlistCount > 0 ? '#B8960C' : '#F5F3EE'} />
            {wishlistCount > 0 && (
              <span
                className="absolute rounded-full flex items-center justify-center"
                style={{ width: '14px', height: '14px', background: '#B8960C', color: '#0A0A0A', fontSize: '9px', top: '-4px', right: '-6px', fontWeight: 600 }}
              >
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={openCart}
            className="relative hover:text-gold transition-colors duration-200"
            style={{ color: '#F5F3EE', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
            aria-label={`Carrinho — ${totalItems}`}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span
                className="absolute rounded-full"
                style={{ width: '6px', height: '6px', background: '#B8960C', top: '-2px', right: '-4px' }}
              />
            )}
          </button>

          <Link
            href="/conta"
            className="hover:text-gold transition-colors duration-200"
            style={{ color: '#F5F3EE', padding: '2px' }}
            aria-label="Conta"
          >
            <User size={18} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* ─── Mobile header — transparente sobre o hero, preto sólido ao scrollar ─── */}
      <div
        className="grid items-center lg:hidden"
        style={{
          gridTemplateColumns: '1fr auto 1fr',
          height: '64px',
          padding: '0 12px',
          position: 'sticky',
          top: 0,
          background: scrolled ? '#0A0A0A' : 'transparent',
          zIndex: 50,
          borderBottom: scrolled ? '1px solid #2A2A2A' : '1px solid transparent',
          transition: 'background 300ms ease, border-color 300ms ease',
        }}
      >
        <div className="justify-self-start">
          <button
            onClick={() => setMobileOpen(true)}
            className="tap-target"
            style={{ color: '#F5F3EE', background: 'transparent', border: 'none', cursor: 'pointer' }}
            aria-label="Abrir menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>

        <Link href="/" aria-label="Lion Socks" className="justify-self-center">
          <Image
            src="/lion_socks_brand_kit/01_logo_principal/logo_completo_transparente_1000h.png"
            alt="Lion Socks"
            width={528}
            height={1000}
            priority
            className="w-auto object-contain"
            style={{ height: '44px' }}
          />
        </Link>

        <div className="flex items-center justify-self-end" style={{ gap: '2px' }}>
          <button
            onClick={() => setSearchOpen(true)}
            style={{ color: '#F5F3EE', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '40px', minWidth: '40px' }}
            aria-label="Pesquisar"
          >
            <Search size={17} strokeWidth={1.5} />
          </button>
          <button
            onClick={openCart}
            style={{ color: '#F5F3EE', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '40px', minWidth: '40px', position: 'relative' }}
            aria-label={`Carrinho — ${totalItems}`}
          >
            <ShoppingBag size={17} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span
                className="absolute rounded-full"
                style={{ width: '7px', height: '7px', background: '#B8960C', top: '8px', right: '8px' }}
              />
            )}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <QuickSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Backdrop persists while ANY dropdown is open — no flicker on item switch */}
      <AnimatePresence>
        {openItem && <MegaMenuBackdrop key="mm-bd" scrolled={scrolled} />}
      </AnimatePresence>
    </>
  )
}
