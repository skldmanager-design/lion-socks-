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
          <ShoppingBag size={48} className="text-gray-200 mb-6" strokeWidth={1} />
          <h3 className="font-display text-xl text-gray-900 mb-2">O carrinho está vazio</h3>
          <p className="text-sm text-gray-500 font-body mb-8 max-w-xs leading-relaxed">
            Adicione produtos para ver aqui.
            Aproveite para explorar a nossa coleção.
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Link
              href="/loja"
              onClick={closeCart}
              className="font-body text-xs uppercase tracking-widest bg-gray-900 text-white px-6 py-3.5 hover:bg-gold hover:text-gray-900 transition-all"
            >
              Explorar a Loja
            </Link>
            <Link
              href="/packs"
              onClick={closeCart}
              className="font-body text-xs uppercase tracking-widest border border-gray-900 text-gray-900 px-6 py-3.5 hover:bg-gray-900 hover:text-white transition-all"
            >
              Ver Packs
            </Link>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-100 w-full max-w-xs">
            <p className="text-xs text-gold font-body uppercase tracking-widest mb-2">Oferta de Boas-Vindas</p>
            <p className="text-xs text-gray-600 font-body">
              Use o código <strong className="text-gold">BEMVINDO10</strong> e poupe 10%.
            </p>
          </div>
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
