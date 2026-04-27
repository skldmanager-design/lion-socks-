'use client'

import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  side?: 'left' | 'right'
  className?: string
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  className,
}: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKey)
    }
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ backdropFilter: 'blur(4px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'fixed top-0 z-50 h-full flex flex-col transition-transform duration-300 ease-out',
          side === 'right' ? 'right-0' : 'left-0',
          side === 'right'
            ? isOpen ? 'translate-x-0' : 'translate-x-full'
            : isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
        style={{ width: 'min(420px, 100vw)', background: '#F5F3EE' }}
      >
        {/* Header */}
        {title && (
          <div
            className="flex items-center justify-between border-b border-border"
            style={{ padding: '14px 16px 14px 24px' }}
          >
            <h2
              className="font-display text-black"
              style={{ fontSize: '22px', fontWeight: 400 }}
            >
              {title.replace(/\s*\(\d+\)$/, '')}
            </h2>
            <button
              onClick={onClose}
              className="flex items-center gap-2 transition-colors"
              style={{
                minWidth: '44px',
                minHeight: '44px',
                padding: '10px 14px',
                borderRadius: '4px',
                background: 'rgba(10,10,10,0.04)',
                border: '1px solid rgba(10,10,10,0.1)',
                color: '#0A0A0A',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 500,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#0A0A0A'; e.currentTarget.style.color = '#F5F3EE' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(10,10,10,0.04)'; e.currentTarget.style.color = '#0A0A0A' }}
              aria-label="Fechar"
            >
              <X size={16} strokeWidth={1.8} />
              <span>Fechar</span>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  )
}
