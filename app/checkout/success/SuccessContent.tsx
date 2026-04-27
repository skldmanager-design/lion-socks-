'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const orderId = searchParams.get('order') || searchParams.get('order_number')
  const { clearCart } = useCart()

  // Clear cart on successful checkout
  useEffect(() => {
    if (sessionId || orderId) {
      clearCart()
    }
  }, [sessionId, orderId, clearCart])

  return (
    <p className="font-body text-gold mb-6" style={{ fontSize: '14px', letterSpacing: '0.1em' }}>
      {orderId ? (
        <>Nº da encomenda: <strong>{orderId}</strong></>
      ) : sessionId ? (
        <>Sessão: <strong>{sessionId.slice(0, 14)}...</strong></>
      ) : (
        <>Pagamento concluído</>
      )}
    </p>
  )
}
