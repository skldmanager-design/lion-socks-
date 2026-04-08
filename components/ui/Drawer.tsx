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
          'fixed inset-0 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'fixed top-0 z-50 h-full bg-white flex flex-col transition-transform duration-300 ease-out',
          side === 'right' ? 'right-0' : 'left-0',
          side === 'right'
            ? isOpen ? 'translate-x-0' : 'translate-x-full'
            : isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
        style={{ width: 'min(420px, 100vw)' }}
      >
        {/* Header */}
        {title && (
          <div
            className="flex items-center justify-between px-6 py-5"
            style={{ borderBottom: '1px solid rgba(197,165,90,0.15)' }}
          >
            <h2
              className="font-display text-gray-900"
              style={{ fontSize: '24px', fontWeight: 400 }}
            >
              {title.replace(/\s*\(\d+\)$/, '')}
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-primary transition-colors"
              aria-label="Fechar"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  )
}
