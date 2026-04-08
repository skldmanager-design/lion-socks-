'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)
  const next = () => setActive((i) => (i + 1) % images.length)

  return (
    <div className="flex gap-4">
      {/* Thumbnails — vertical strip */}
      {images.length > 1 && (
        <div className="hidden sm:flex flex-col gap-2 w-16 flex-shrink-0">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="relative overflow-hidden transition-all duration-200"
              style={{
                aspectRatio: '4/5',
                border: active === i ? '2px solid #B8960C' : '2px solid transparent',
                opacity: active === i ? 1 : 0.5,
              }}
              onMouseEnter={(e) => { if (active !== i) e.currentTarget.style.opacity = '0.8' }}
              onMouseLeave={(e) => { if (active !== i) e.currentTarget.style.opacity = '0.5' }}
              aria-label={`Ver imagem ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${productName} — ${i + 1}`}
                fill
                unoptimized
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="flex-1">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: '4/5', background: '#f5f5f5' }}
        >
          <Image
            src={images[active] ?? ''}
            alt={`${productName} — imagem ${active + 1}`}
            fill
            unoptimized
            priority={active === 0}
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 55vw"
          />

          {/* Mobile navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="sm:hidden absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="sm:hidden absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-colors"
                aria-label="Próxima imagem"
              >
                <ChevronRight size={16} />
              </button>

              {/* Mobile dots */}
              <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActive(i) }}
                    className="h-1.5 rounded-full transition-all duration-200"
                    style={{
                      width: active === i ? '16px' : '6px',
                      background: active === i ? '#1a1a1a' : 'rgba(26,26,26,0.3)',
                    }}
                    aria-label={`Ir para imagem ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
