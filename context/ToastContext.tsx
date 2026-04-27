'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface ToastContextValue {
  toasts: Toast[]
  show: (message: string, type?: Toast['type']) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, show }}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              background: t.type === 'error' ? '#DC2626' : t.type === 'info' ? '#0A0A0A' : '#B8960C',
              color: '#FFFFFF',
              padding: '14px 20px',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              animation: 'toastIn 300ms cubic-bezier(0.22, 1, 0.36, 1)',
              minWidth: '240px',
              pointerEvents: 'auto',
            }}
          >
            {t.message}
          </div>
        ))}
        <style>{`
          @keyframes toastIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
