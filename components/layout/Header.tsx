'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Search, User, Menu, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import MobileMenu from './MobileMenu'

const materialLinks = [
  { label: 'Seda', href: '/materiais/seda', desc: 'Luxo absoluto' },
  { label: "Fil d'Écosse", href: '/materiais/fil-d-ecosse', desc: 'Brilho e leveza' },
  { label: 'Lã Merino', href: '/materiais/la-merino', desc: 'Conforto termorregulador' },
]

const NAV_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  letterSpacing: '4px',
  fontWeight: 500,
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.9)',
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [materiaisOpen, setMateriaisOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { totalItems, openCart } = useCart()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMateriaisOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      <header
        className="fixed left-0 right-0 z-30 transition-[background-color,backdrop-filter] duration-300"
        style={{
          top: 'var(--announcement-height, 36px)',
          backgroundColor: (!isHome || scrolled) ? '#0A0A0A' : 'transparent',
          backdropFilter: (!isHome || scrolled) ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: (!isHome || scrolled) ? 'blur(10px)' : 'none',
        }}
      >
        <div style={{ paddingLeft: '40px', paddingRight: '40px' }}>
          <div className="flex items-center justify-between" style={{ height: '90px' }}>

            {/* Left: nav (desktop) + hamburger (mobile) */}
            <div className="flex items-center" style={{ gap: '36px', flex: '1' }}>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-1"
                style={{ color: 'rgba(255,255,255,0.9)' }}
                aria-label="Abrir menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>

              <nav className="hidden lg:flex items-center" style={{ gap: '36px' }}>
                <Link href="/loja" className="hover:text-gold transition-colors" style={NAV_STYLE}>
                  Loja
                </Link>

                <Link href="/packs" className="hover:text-gold transition-colors" style={NAV_STYLE}>
                  Packs
                </Link>

                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setMateriaisOpen(v => !v)}
                    className="flex items-center gap-1.5 hover:text-gold transition-colors"
                    style={{ ...NAV_STYLE, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    aria-expanded={materiaisOpen}
                    aria-haspopup="true"
                  >
                    Materiais
                    <ChevronDown
                      size={13}
                      strokeWidth={1.5}
                      className={cn('transition-transform duration-200', materiaisOpen && 'rotate-180')}
                    />
                  </button>

                  {materiaisOpen && (
                    <div className="absolute top-full left-0 mt-3 w-52 bg-white border border-gray-100 shadow-lg py-2">
                      {materialLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMateriaisOpen(false)}
                          className="block px-5 py-3 group hover:bg-gray-50 transition-colors"
                        >
                          <span
                            className="block group-hover:text-gold transition-colors"
                            style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 400, color: '#1a1a1a' }}
                          >
                            {link.label}
                          </span>
                          <span className="block text-xs text-gray-400 font-body mt-0.5">
                            {link.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/sobre" className="hover:text-gold transition-colors" style={NAV_STYLE}>
                  Sobre
                </Link>
              </nav>
            </div>

            {/* Center: Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2"
              aria-label="Lion Socks — Homepage"
            >
              <Image
                src="/logo.png"
                alt="Lion Socks"
                width={300}
                height={540}
                priority
                className="w-auto object-contain brightness-0 invert"
                style={{ height: '90px' }}
              />
            </Link>

            {/* Right: icons */}
            <div className="flex items-center gap-4" style={{ flex: '1', justifyContent: 'flex-end' }}>
              <button
                aria-label="Pesquisar"
                className="p-1 transition-colors hidden sm:block hover:text-gold"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                <Search size={24} strokeWidth={1.5} />
              </button>

              <button
                aria-label="Conta"
                className="p-1 transition-colors hidden sm:block hover:text-gold"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                <User size={24} strokeWidth={1.5} />
              </button>

              <button
                onClick={openCart}
                aria-label={`Carrinho — ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
                className="relative p-1 transition-colors hover:text-gold"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                <ShoppingBag size={24} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 rounded-full"
                    style={{ width: '8px', height: '8px', background: '#C4A652' }}
                  />
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Gold separator — only visible when scrolled */}
        <div
          className="h-px transition-opacity duration-300"
          style={{ background: 'rgba(197,165,90,0.2)', opacity: scrolled ? 1 : 0 }}
        />
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
