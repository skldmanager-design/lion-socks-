'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [zooming, setZooming] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)
  const next = () => setActive((i) => (i + 1) % images.length)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

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
          ref={imgRef}
          className="relative overflow-hidden hidden sm:block"
          style={{ aspectRatio: '4/5', background: 'linear-gradient(160deg, #F5F3EE 0%, #FFFFFF 50%, #EFEBE2 100%)', cursor: zooming ? 'zoom-out' : 'zoom-in' }}
          onMouseEnter={() => setZooming(true)}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={handleMouseMove}
        >
          <Image
            src={images[active] ?? ''}
            alt={`${productName} — imagem ${active + 1}`}
            fill
            unoptimized
            priority={active === 0}
            className="object-cover object-center transition-transform duration-300"
            style={{
              transform: zooming ? `scale(2)` : 'scale(1)',
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            }}
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </div>

        {/* Mobile image (no zoom) */}
        <div
          className="relative overflow-hidden sm:hidden"
          style={{ aspectRatio: '4/5', background: 'linear-gradient(160deg, #F5F3EE 0%, #FFFFFF 50%, #EFEBE2 100%)' }}
        >
          <Image
            src={images[active] ?? ''}
            alt={`${productName} — imagem ${active + 1}`}
            fill
            unoptimized
            priority={active === 0}
            className="object-cover object-center"
            sizes="100vw"
          />

          {/* Mobile navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="sm:hidden absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white transition-colors flex items-center justify-center"
                style={{ width: '44px', height: '44px', borderRadius: '50%' }}
                aria-label="Imagem anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white transition-colors flex items-center justify-center"
                style={{ width: '44px', height: '44px', borderRadius: '50%' }}
                aria-label="Próxima imagem"
              >
                <ChevronRight size={20} />
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
