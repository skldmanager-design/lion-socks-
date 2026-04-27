'use client'

import { useState, useMemo } from 'react'
import { Check, ChevronRight, Package, ShoppingBag } from 'lucide-react'
import { products } from '@/lib/mock-data'
import { formatPrice, applyDiscount, cn } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import BoxProductPicker from './BoxProductPicker'
import Button from '@/components/ui/Button'

const boxOptions = [
  {
    id: 'byb-3',
    label: 'Caixa de 3',
    count: 3,
    packaging: 'Caixa de Metal',
    discount: 10,
  },
  {
    id: 'byb-5',
    label: 'Caixa de 5',
    count: 5,
    packaging: 'Caixa de Metal',
    discount: 12,
  },
  {
    id: 'byb-12',
    label: 'Gaveta de 12',
    count: 12,
    packaging: 'Caixa Gaveta',
    discount: 17,
  },
]

type Step = 'choose-size' | 'pick-products' | 'summary'

export default function BuildYourBox() {
  const [step, setStep] = useState<Step>('choose-size')
  const [selectedBox, setSelectedBox] = useState<(typeof boxOptions)[0] | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedSize, setSelectedSize] = useState<string>('42-45')
  const [added, setAdded] = useState(false)
  const { addItem, openCart } = useCart()

  const handleBoxSelect = (box: (typeof boxOptions)[0]) => {
    setSelectedBox(box)
    setSelectedProducts([])
    setStep('pick-products')
  }

  const handleToggleProduct = (id: string) => {
    setSelectedProducts((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id)
      if (prev.length < (selectedBox?.count ?? 0)) return [...prev, id]
      return prev
    })
  }

  const selectedProductObjects = useMemo(
    () => products.filter((p) => selectedProducts.includes(p.id)),
    [selectedProducts]
  )

  const originalTotal = selectedProductObjects.reduce((sum, p) => sum + p.price, 0)
  const discountedTotal = selectedBox
    ? Math.round(applyDiscount(originalTotal, selectedBox.discount) * 100) / 100
    : 0
  const savings = Math.round((originalTotal - discountedTotal) * 100) / 100

  const isComplete = selectedBox && selectedProducts.length === selectedBox.count

  const handleAddToCart = () => {
    if (!selectedBox || !isComplete) return

    selectedProductObjects.forEach((product) => {
      addItem({
        variantId: `byb-${product.id}-${selectedSize}`,
        productHandle: product.handle,
        productTitle: `${product.name} (Pack ${selectedBox.label})`,
        variantTitle: `${selectedSize} / ${product.color}`,
        image: product.images[0] ?? '',
        price: applyDiscount(product.price, selectedBox.discount),
        quantity: 1,
      })
    })

    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      openCart()
    }, 1000)
  }

  const steps: { id: Step; label: string }[] = [
    { id: 'choose-size', label: 'Tamanho da caixa' },
    { id: 'pick-products', label: 'Escolher pares' },
    { id: 'summary', label: 'Resumo' },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === step)

  return (
    <div className="bg-white border border-gray-200">
      {/* Header */}
      <div className="bg-primary px-6 py-5">
        <div className="flex items-center gap-2 mb-1">
          <Package size={16} className="text-gold" />
          <h3 className="font-display text-xl text-white">Monta a Tua Caixa</h3>
        </div>
        <p className="text-cream/60 text-xs font-body">
          Escolhe os teus pares favoritos e recebe numa embalagem premium com desconto.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center px-6 py-4 border-b border-gray-100 overflow-x-auto">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-shrink-0">
            <button
              onClick={() => {
                if (i < currentStepIndex) setStep(s.id)
              }}
              disabled={i > currentStepIndex}
              className={cn(
                'flex items-center gap-2 text-xs font-body transition-colors',
                i === currentStepIndex
                  ? 'text-primary font-medium'
                  : i < currentStepIndex
                  ? 'text-gold cursor-pointer hover:text-gold-dark'
                  : 'text-gray-300 cursor-not-allowed'
              )}
            >
              <span
                className={cn(
                  'h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0',
                  i < currentStepIndex
                    ? 'bg-gold text-primary'
                    : i === currentStepIndex
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-400'
                )}
              >
                {i < currentStepIndex ? <Check size={10} /> : i + 1}
              </span>
              {s.label}
            </button>
            {i < steps.length - 1 && (
              <ChevronRight size={14} className="mx-3 text-gray-300 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="p-6">
        {/* Step 1: Choose box size */}
        {step === 'choose-size' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 font-body mb-5">
              Escolhe o tamanho da tua caixa. Quanto maior, maior o desconto.
            </p>
            {boxOptions.map((box) => (
              <button
                key={box.id}
                onClick={() => handleBoxSelect(box)}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 hover:border-primary transition-all duration-200 group text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-100 group-hover:bg-primary/5 transition-colors flex items-center justify-center flex-shrink-0">
                    <Package size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="font-body font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {box.label}
                    </p>
                    <p className="text-xs text-gray-400 font-body">{box.packaging}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-body font-medium text-gold">
                    -{box.discount}% desconto
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Pick products */}
        {step === 'pick-products' && selectedBox && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm font-body font-medium text-gray-900">
                  Selecciona {selectedBox.count} pares
                </p>
                <p className="text-xs text-gray-400 font-body mt-0.5">
                  {selectedProducts.length}/{selectedBox.count} escolhidos
                </p>
              </div>
              {/* Progress */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: selectedBox.count }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1.5 w-1.5 rounded-full transition-all duration-200',
                      i < selectedProducts.length ? 'bg-primary' : 'bg-gray-200'
                    )}
                  />
                ))}
              </div>
            </div>

            <BoxProductPicker
              products={products}
              selected={selectedProducts}
              maxItems={selectedBox.count}
              onToggle={handleToggleProduct}
            />

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep('choose-size')}
                className="text-xs text-gray-500 font-body hover:text-primary transition-colors"
              >
                ← Voltar
              </button>
              <Button
                variant="cart"
                onClick={() => setStep('summary')}
                disabled={!isComplete}
              >
                Ver Resumo →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 'summary' && selectedBox && (
          <div>
            <p className="text-sm font-body font-medium text-gray-900 mb-4">
              A tua {selectedBox.label}
            </p>

            {/* Products list */}
            <ul className="space-y-2 mb-5">
              {selectedProductObjects.map((p) => (
                <li key={p.id} className="flex items-center gap-3 text-sm font-body">
                  <span
                    className="h-3 w-3 rounded-full border border-gray-200 flex-shrink-0"
                    style={{ backgroundColor: p.colorHex }}
                  />
                  <span className="text-gray-700 flex-1 truncate">{p.name} — {p.color}</span>
                  <span className="text-gray-900 flex-shrink-0">{formatPrice(p.price)}</span>
                </li>
              ))}
            </ul>

            {/* Pricing */}
            <div className="border-t border-gray-100 pt-4 mb-2 space-y-1.5">
              <div className="flex justify-between text-sm font-body">
                <span className="text-gray-500">Preço individual</span>
                <span className="text-gray-400 line-through">{formatPrice(originalTotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-body">
                <span className="text-gray-500">Desconto ({selectedBox.discount}%)</span>
                <span className="text-gold font-medium">-{formatPrice(savings)}</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline border-t border-gray-100 pt-3 mb-5">
              <span className="font-body font-medium text-gray-900">Total da caixa</span>
              <span className="font-display text-2xl text-gray-900">{formatPrice(discountedTotal)}</span>
            </div>

            {/* Size selector */}
            <div className="mb-5">
              <p className="text-xs tracking-widest uppercase font-body text-gray-400 mb-2">
                Tamanho para todos os pares
              </p>
              <div className="flex gap-2">
                {['39-42', '42-45', '45-48'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'flex-1 py-2.5 text-sm font-body font-medium border transition-all',
                      selectedSize === size
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 text-gray-700 hover:border-primary'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 font-body mt-1.5">
                Todos os pares terão o mesmo tamanho. Para tamanhos diferentes, adicione individualmente.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('pick-products')}
                className="text-xs text-gray-500 font-body hover:text-primary transition-colors border border-gray-200 px-4 py-3"
              >
                ← Editar
              </button>
              <Button
                variant="cart"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? (
                  <span className="flex items-center gap-2">
                    <Check size={14} />
                    Adicionado!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShoppingBag size={14} />
                    Adicionar ao Carrinho
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
