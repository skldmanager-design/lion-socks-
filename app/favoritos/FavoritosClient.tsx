'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'
import { products } from '@/lib/catalog'
import ProductCard from '@/components/product/ProductCard'

export default function FavoritosClient() {
  const { items } = useWishlist()
  const favorites = products.filter((p) => items.includes(p.id))

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-12 text-center">
          <Heart size={32} strokeWidth={1} className="mx-auto mb-4 text-gold" />
          <h1 className="font-display text-4xl lg:text-5xl text-gray-900 mb-4">Favoritos</h1>
          <p className="text-gray-500 font-body text-sm">
            {favorites.length === 0
              ? 'Ainda não adicionou produtos aos favoritos.'
              : `${favorites.length} ${favorites.length === 1 ? 'produto guardado' : 'produtos guardados'}`}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Link
              href="/loja"
              className="font-body text-xs uppercase tracking-widest bg-gray-900 text-white px-8 py-4 hover:bg-gold hover:text-gray-900 transition-all"
            >
              Explorar a Loja
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {favorites.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
