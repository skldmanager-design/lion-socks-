---
name: component-patterns
description: Standard patterns for creating React components in the Lion Socks project. Use when building new UI components, product cards, page layouts, or any React/Next.js component.
---

# Lion Socks — Component Patterns

## Estrutura de um Componente

Todos os componentes seguem este padrão:

```tsx
// 1. Imports
import { type FC } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// 2. Types
interface ProductCardProps {
  product: Product
  className?: string
}

// 3. Component (named export para pages, default para componentes reutilizáveis)
const ProductCard: FC<ProductCardProps> = ({ product, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('group relative', className)}
    >
      {/* content */}
    </motion.div>
  )
}

export default ProductCard
```

## Animações Padrão (Framer Motion)

```tsx
// Fade in suave (para secções ao entrar no viewport)
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

// Stagger children (para grids de produtos)
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

// Hover de imagem (zoom subtil)
const imageHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.4, ease: 'easeOut' }
}

// NUNCA usar:
// - bounce, spring com alta stiffness
// - rotate, skew
// - durações > 0.8s
// - delays > 0.3s entre siblings
```

## Botões

```tsx
// Botão primário (preto, hover dourado)
<button className="bg-black text-white px-8 py-3 text-sm tracking-wider uppercase
  transition-colors duration-300 hover:bg-gold">
  Adicionar ao Carrinho
</button>

// Botão secundário (outline)
<button className="border border-black text-black px-8 py-3 text-sm tracking-wider uppercase
  transition-colors duration-300 hover:border-gold hover:text-gold">
  Ver Mais
</button>
```

## Product Card

```tsx
// Padrão: imagem + nome + material badge + preço
// Hover: segunda imagem (se disponível) + overlay subtil
<div className="group cursor-pointer">
  <div className="relative aspect-square overflow-hidden bg-gray-100">
    <Image
      src={product.images[0]}
      alt={product.name}
      fill
      className="object-cover transition-opacity duration-500 group-hover:opacity-0"
    />
    {product.images[1] && (
      <Image
        src={product.images[1]}
        alt={product.name}
        fill
        className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    )}
    <span className="absolute top-3 left-3 bg-white/90 px-2 py-1 text-xs tracking-wider">
      {product.material}
    </span>
  </div>
  <div className="mt-3">
    <h3 className="text-sm font-medium">{product.name}</h3>
    <p className="text-sm text-gray-500 mt-1">{formatPrice(product.price)}</p>
  </div>
</div>
```

## Layout de Página

```tsx
// Todas as páginas seguem esta estrutura:
<main className="min-h-screen">
  {/* Hero ou header da página */}
  <section className="pt-24 pb-16"> {/* pt-24 para compensar header fixo */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* conteúdo */}
    </div>
  </section>

  {/* Secções alternadas com fundo */}
  <section className="py-16 bg-cream">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* conteúdo */}
    </div>
  </section>
</main>
```

## Responsive Grid

```tsx
// Grid de produtos
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map(p => <ProductCard key={p.id} product={p} />)}
</div>

// Grid de coleções (assimétrico)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="lg:col-span-2 lg:row-span-2"> {/* Card grande */} </div>
  <div> {/* Card pequeno */} </div>
  <div> {/* Card pequeno */} </div>
</div>
```

## Utility: cn() helper

```tsx
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `€${price % 1 === 0 ? price : price.toFixed(2)}`
}
```
