'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import type { Product } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

interface BoxProductPickerProps {
  products: Product[]
  selected: string[]
  maxItems: number
  onToggle: (id: string) => void
}

export default function BoxProductPicker({
  products,
  selected,
  maxItems,
  onToggle,
}: BoxProductPickerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {products.map((product) => {
        const isSelected = selected.includes(product.id)
        const canSelect = selected.length < maxItems || isSelected

        return (
          <button
            key={product.id}
            onClick={() => canSelect && onToggle(product.id)}
            disabled={!canSelect && !isSelected}
            className={`relative text-left border-2 transition-all duration-200 overflow-hidden group ${
              isSelected
                ? 'border-primary'
                : canSelect
                ? 'border-gray-200 hover:border-gray-400'
                : 'border-gray-100 opacity-40 cursor-not-allowed'
            }`}
            aria-pressed={isSelected}
            aria-label={`${isSelected ? 'Remover' : 'Adicionar'} ${product.name} — ${product.color}`}
          >
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
              <Image
                src={product.images[0] ?? ''}
                alt={product.name}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />

              {/* Selected overlay */}
              {isSelected && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary rounded-full p-1.5">
                    <Check size={14} className="text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-2.5">
              <p className="text-[10px] text-gray-400 font-body truncate">{product.materialLabel}</p>
              <p className="text-xs font-body font-medium text-gray-900 leading-tight mt-0.5 line-clamp-2">
                {product.name}
              </p>
              <p className="text-xs text-gray-500 font-body mt-0.5 truncate">{product.color}</p>
              <p className="font-display text-sm text-gray-900 mt-1">{formatPrice(product.price)}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
