'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import Drawer from '@/components/ui/Drawer'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

export default function CartDrawer() {
  const { isOpen, closeCart, items, totalItems } = useCart()

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeCart}
      title={`Carrinho ${totalItems > 0 ? `(${totalItems})` : ''}`}
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full px-6 py-16 text-center">
          <ShoppingBag size={40} className="text-gray-200 mb-4" />
          <h3 className="font-display text-lg text-gray-900 mb-2">O seu carrinho está vazio</h3>
          <p className="text-sm text-gray-400 font-body mb-8">
            Descubra a nossa coleção de meias premium.
          </p>
          <Link
            href="/loja"
            onClick={closeCart}
            className="inline-flex items-center border border-primary text-primary text-xs tracking-widest uppercase font-body font-medium px-6 py-3 hover:bg-primary hover:text-white transition-all duration-300"
          >
            Explorar a Loja
          </Link>
        </div>
      ) : (
        <>
          {/* Items list */}
          <div className="px-6 flex-1">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <CartSummary />
        </>
      )}
    </Drawer>
  )
}
