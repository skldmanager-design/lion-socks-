'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag, CheckCircle2, Truck, ArrowRight, Package } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'
import { getFeaturedBundles } from '@/lib/mock-data'
import Button from '@/components/ui/Button'

function FreeShippingBar({
  subtotal,
  hasFreeShipping,
  amountToFreeShipping,
}: {
  subtotal: number
  hasFreeShipping: boolean
  amountToFreeShipping: number
}) {
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <div className="bg-gray-100 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {hasFreeShipping ? (
          <div className="flex items-center gap-2 text-green-600 text-sm font-body">
            <CheckCircle2 size={16} />
            <span>Parabéns! Tem <strong>envio gratuito</strong>.</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-600 text-sm font-body">
            <Truck size={16} />
            <span>
              Faltam <strong className="text-gray-900">{formatPrice(amountToFreeShipping)}</strong> para envio gratuito
            </span>
          </div>
        )}
        <div className="mt-2 h-1.5 bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-gold transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function CartPageClient() {
  const {
    items,
    subtotal,
    hasFreeShipping,
    amountToFreeShipping,
    totalItems,
    updateQuantity,
    removeItem,
    checkoutUrl,
  } = useCart()

  const featuredBundles = getFeaturedBundles().slice(0, 2)

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl
    } else {
      alert('Configure a integração Shopify para activar o checkout.')
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 lg:pt-40 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center py-20">
          <ShoppingBag size={48} className="text-gray-200 mx-auto mb-6" />
          <h1 className="font-display text-3xl text-gray-900 mb-3">O seu carrinho está vazio</h1>
          <p className="text-gray-400 font-body text-sm mb-10">
            Descubra a nossa colecção de meias premium e encontre o par perfeito.
          </p>
          <Link
            href="/loja"
            className="inline-flex items-center gap-2 border border-primary text-primary text-xs tracking-widest uppercase font-body font-medium px-8 py-4 hover:bg-primary hover:text-white transition-all duration-300"
          >
            Explorar a Loja <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 lg:pt-36 pb-20 lg:pb-28 min-h-screen">
      {/* Free shipping bar */}
      <FreeShippingBar
        subtotal={subtotal}
        hasFreeShipping={hasFreeShipping}
        amountToFreeShipping={amountToFreeShipping}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mt-10">
        <h1 className="font-display text-3xl lg:text-4xl text-gray-900 mb-10">
          Carrinho{' '}
          <span className="font-body text-lg text-gray-400 font-normal">
            ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Items */}
          <div className="lg:col-span-2">
            {/* Header row */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 pb-3 border-b border-gray-200 text-[10px] tracking-widest uppercase font-body text-gray-400">
              <span>Produto</span>
              <span className="text-center">Quantidade</span>
              <span className="text-right">Total</span>
            </div>

            {/* Items list */}
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id} className="py-6 grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto_auto] gap-4 sm:gap-6 items-start">
                  {/* Image */}
                  <Link href={`/loja/${item.productHandle}`} className="block flex-shrink-0">
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 bg-gray-100 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.productTitle}
                        fill
                        className="object-cover object-center hover:scale-105 transition-transform duration-300"
                        sizes="96px"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="min-w-0">
                    <Link
                      href={`/loja/${item.productHandle}`}
                      className="font-body text-sm font-medium text-gray-900 hover:text-primary transition-colors"
                    >
                      {item.productTitle}
                    </Link>
                    <p className="text-xs text-gray-400 font-body mt-0.5">{item.variantTitle}</p>
                    <p className="font-display text-base text-gray-900 mt-1">
                      {formatPrice(item.price)}
                    </p>

                    {/* Mobile: quantity + remove */}
                    <div className="flex items-center gap-4 mt-3 sm:hidden">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-body">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-gray-700 transition-colors p-1"
                        aria-label="Remover item"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop: Quantity */}
                  <div className="hidden sm:flex items-center border border-gray-200 self-start mt-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-9 text-center text-sm font-body text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Desktop: Total + remove */}
                  <div className="hidden sm:flex flex-col items-end gap-2 self-start mt-1">
                    <span className="font-display text-base text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-gray-700 transition-colors p-0.5"
                      aria-label={`Remover ${item.productTitle}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Continue shopping */}
            <div className="mt-6">
              <Link
                href="/loja"
                className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase font-body text-gray-500 hover:text-primary transition-colors border-b border-gray-200 hover:border-primary pb-0.5"
              >
                ← Continuar a comprar
              </Link>
            </div>

            {/* Pack upsell */}
            {subtotal < 45 && (
              <div className="mt-10 p-6 bg-cream border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Package size={16} className="text-gold" />
                  <p className="text-sm font-body font-medium text-gray-900">
                    Poupe com um pack — e chegue ao envio gratuito
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredBundles.map((bundle) => (
                    <Link
                      key={bundle.id}
                      href={`/packs#${bundle.handle}`}
                      className="flex items-center gap-3 p-3 bg-white border border-gray-100 hover:border-gold transition-colors group"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden">
                        <Image
                          src={bundle.image}
                          alt={bundle.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-body font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                          {bundle.name}
                        </p>
                        <p className="text-xs text-gray-400 font-body">
                          {bundle.pairCount} pares · Poupa {bundle.discountPercent}%
                        </p>
                      </div>
                      <ArrowRight size={12} className="text-gray-300 group-hover:text-gold flex-shrink-0 ml-auto" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 p-6 sticky top-32">
              <h2 className="font-display text-xl text-gray-900 mb-6">Resumo</h2>

              {/* Line items summary */}
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm font-body">
                    <span className="text-gray-600 truncate mr-4">
                      {item.productTitle}
                      <span className="text-gray-400"> ×{item.quantity}</span>
                    </span>
                    <span className="text-gray-900 flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-gray-600">Envio</span>
                  <span className={hasFreeShipping ? 'text-green-600 font-medium' : 'text-gray-900'}>
                    {hasFreeShipping ? 'Gratuito' : '€3,50'}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-body font-medium text-gray-900">Total estimado</span>
                  <span className="font-display text-2xl text-gray-900">
                    {formatPrice(hasFreeShipping ? subtotal : subtotal + 3.5)}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-body mt-1">
                  Impostos incluídos. Envio final calculado no checkout.
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full mb-3"
                onClick={handleCheckout}
              >
                Finalizar Compra
              </Button>

              {/* Security notes */}
              <div className="flex flex-col gap-1.5 mt-4">
                {[
                  'Checkout seguro via Shopify',
                  'Devolução gratuita em 30 dias',
                  'Pagamento com cartão, MB Way ou PayPal',
                ].map((note) => (
                  <p key={note} className="text-[10px] text-gray-400 font-body flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-gold flex-shrink-0" />
                    {note}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
