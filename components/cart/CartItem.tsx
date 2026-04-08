'use client'

import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'
import { useCart, type CartItem as CartItemType } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div
      className="flex gap-4 py-5"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
    >
      {/* Image */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{ width: '80px', height: '100px', background: '#f5f5f5' }}
      >
        <Image
          src={item.image}
          alt={item.productTitle}
          fill
          unoptimized
          className="object-cover object-center"
          sizes="80px"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4
              className="font-body text-gray-900 leading-tight"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              {item.productTitle}
            </h4>
            <p
              className="font-body text-gray-500 mt-0.5"
              style={{ fontSize: '12px', fontWeight: 300 }}
            >
              {item.variantTitle}
            </p>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="flex-shrink-0 p-0.5 text-gray-300 hover:text-gray-700 transition-colors"
            aria-label={`Remover ${item.productTitle}`}
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Price + Quantity */}
        <div className="flex items-center justify-between mt-3">
          {/* Quantity */}
          <div
            className="flex items-center"
            style={{ border: '1px solid rgba(0,0,0,0.1)' }}
          >
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
              style={{ width: '28px', height: '28px' }}
              aria-label="Diminuir quantidade"
            >
              <Minus size={11} strokeWidth={1.5} />
            </button>
            <span
              className="text-center font-body text-gray-900"
              style={{ width: '32px', fontSize: '13px' }}
            >
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
              style={{ width: '28px', height: '28px' }}
              aria-label="Aumentar quantidade"
            >
              <Plus size={11} strokeWidth={1.5} />
            </button>
          </div>

          {/* Price */}
          <span
            className="font-body text-gray-900"
            style={{ fontSize: '14px', fontWeight: 400 }}
          >
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}
