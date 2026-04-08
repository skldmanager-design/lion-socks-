'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const links = [
  { label: 'Loja', href: '/loja' },
  { label: 'Packs', href: '/packs' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'The Lion\'s Circle', href: '/lions-circle', accent: true },
]

const materialLinks = [
  { label: 'Seda', href: '/materiais/seda' },
  { label: "Fil d'Écosse", href: '/materiais/fil-d-ecosse' },
  { label: 'Lã Merino', href: '/materiais/la-merino' },
]

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-primary/50 z-40 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal
        aria-label="Menu de navegação"
        className={cn(
          'fixed left-0 top-0 h-full w-80 bg-white z-50 flex flex-col transition-transform duration-300 ease-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link
            href="/"
            onClick={onClose}
            className="font-display text-xl text-primary tracking-wider"
          >
            LION SOCKS
          </Link>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-primary transition-colors"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center justify-between py-3 text-sm tracking-widest uppercase font-body font-medium border-b border-gray-100 transition-colors',
                    link.accent
                      ? 'text-gold hover:text-gold-dark'
                      : 'text-gray-900 hover:text-primary'
                  )}
                >
                  {link.label}
                  <ChevronRight size={14} className="text-gray-400" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="text-xs tracking-widest uppercase text-gray-400 font-body mb-3">
              Materiais
            </p>
            <ul className="space-y-1">
              {materialLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-2.5 text-sm tracking-wide font-body text-gray-700 hover:text-primary transition-colors"
                  >
                    {link.label}
                    <ChevronRight size={12} className="text-gray-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100">
          <p className="text-xs text-gray-400 font-body">
            Envio gratuito acima de €45
          </p>
        </div>
      </div>
    </>
  )
}
