'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const slides = [
  {
    desktopImg: '/hero-desktop.jpg',
    mobileImg: '/hero-mobile.jpg',
    label: 'COLEÇÃO HOMEM',
    title: 'Feitas para quem repara\nnos detalhes',
    subtitle: 'Seda, fil d\'Écosse e lã merino. Conforto que se sente. Elegância que se nota.',
    href: '/loja',
  },
  {
    desktopImg: '/lion_socks_brand_kit/05_hero_banner/hero-mulher-desktop.jpg',
    mobileImg: '/lion_socks_brand_kit/05_hero_banner/hero-mulher-mobile.jpg',
    label: 'COLEÇÃO MULHER',
    title: 'Elegância em\ncada detalhe',
    subtitle: 'Conforto que se veste. Classe que se sente.',
    href: '/colecoes/mulher',
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-advance: resets every time `active` changes or pause state changes
  useEffect(() => {
    if (isPaused) return
    timerRef.current = setTimeout(() => {
      setActive(s => (s + 1) % slides.length)
    }, 6000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [active, isPaused])

  const goTo = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setActive(i)
  }

  const prev = () => goTo((active - 1 + slides.length) % slides.length)
  const next = () => goTo((active + 1) % slides.length)

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide backgrounds — stacked, faded between with opacity */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`hero-slide-${i} absolute inset-0`}
          style={{
            backgroundImage: `url(${slide.desktopImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: i === active ? 1 : 0,
          }}
        />
      ))}
      <style>{`
        @media (max-width: 639px) {
          .hero-slide-0 { background-image: url(/hero-mobile.jpg) !important; }
          .hero-slide-1 { background-image: url(/lion_socks_brand_kit/05_hero_banner/hero-mulher-mobile.jpg) !important; }
        }
      `}</style>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.18) 100%)',
          zIndex: 2,
        }}
      />

      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative text-center px-6 max-w-4xl mx-auto"
          style={{ zIndex: 3 }}
        >
          {/* Label */}
          <p
            className="font-body uppercase mb-6"
            style={{ fontSize: '13px', letterSpacing: '5px', color: '#C4A652', fontWeight: 400 }}
          >
            {slides[active].label}
          </p>

          {/* Headline */}
          <h1
            className="font-display text-white"
            style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: 300,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
              whiteSpace: 'pre-line',
            }}
          >
            {slides[active].title}
          </h1>

          {/* Subtitle */}
          <p
            className="font-body mx-auto"
            style={{
              fontSize: '16px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '480px',
              lineHeight: 1.8,
              marginBottom: '48px',
            }}
          >
            {slides[active].subtitle}
          </p>

          {/* CTA */}
          <Link
            href={slides[active].href}
            className="inline-block font-body uppercase transition-all duration-300 hover:bg-gold hover:text-primary hover:border-gold"
            style={{
              border: '2px solid #C4A652',
              color: '#C4A652',
              fontSize: '11px',
              letterSpacing: '3px',
              padding: '16px 40px',
              fontWeight: 400,
              background: 'rgba(0,0,0,0.3)',
            }}
          >
            DESCOBRIR COLEÇÃO
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Arrow — left */}
      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-2 opacity-50 hover:opacity-100 transition-opacity"
        style={{ zIndex: 4 }}
      >
        <ChevronLeft size={28} color="white" strokeWidth={1.2} />
      </button>

      {/* Arrow — right */}
      <button
        onClick={next}
        aria-label="Próximo slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-2 opacity-50 hover:opacity-100 transition-opacity"
        style={{ zIndex: 4 }}
      >
        <ChevronRight size={28} color="white" strokeWidth={1.2} />
      </button>

      {/* Dots */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{ zIndex: 4 }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            style={{
              width: i === active ? '28px' : '6px',
              height: '4px',
              borderRadius: '2px',
              background: i === active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>
    </section>
  )
}
