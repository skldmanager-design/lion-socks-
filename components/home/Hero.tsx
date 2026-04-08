'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const slides = [
  {
    desktopImg: '/lion_socks_brand_kit/05_hero_banner/hero_meias_desktop_clean.jpg',
    mobileImg: '/lion_socks_brand_kit/05_hero_banner/hero_meias_mobile.jpg',
    label: 'COLEÇÃO HOMEM',
    title: 'Feitas para quem repara\nnos detalhes',
    subtitle: "Seda, fil d'Écosse e lã merino. Conforto que se sente. Elegância que se nota.",
    href: '/loja/homem',
    bgPosition: 'center',
  },
  {
    desktopImg: '/lion_socks_brand_kit/05_hero_banner/hero-mulher-desktop.jpg',
    mobileImg: '/lion_socks_brand_kit/05_hero_banner/hero-mulher-mobile.jpg',
    label: 'COLEÇÃO MULHER',
    title: 'Elegância em\ncada detalhe',
    subtitle: 'Conforto que se veste. Classe que se sente.',
    href: '/loja/mulher',
    bgPosition: 'left center',
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (isPaused) return
    timerRef.current = setTimeout(() => {
      setActive((s) => (s + 1) % slides.length)
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
      className="relative overflow-hidden"
      style={{ height: '640px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`hero-slide-${i} absolute inset-0`}
          style={{
            backgroundImage: `url(${slide.desktopImg})`,
            backgroundSize: 'cover',
            backgroundPosition: slide.bgPosition,
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: i === active ? 1 : 0,
          }}
        />
      ))}
      <style>{`
        @media (max-width: 639px) {
          .hero-slide-0 { background-image: url(/lion_socks_brand_kit/05_hero_banner/hero_meias_mobile.jpg) !important; }
          .hero-slide-1 { background-image: url(/lion_socks_brand_kit/05_hero_banner/hero-mulher-mobile.jpg) !important; }
        }
      `}</style>

      {/* Overlay — stronger right-side darkening (desktop) */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.85) 100%)',
          zIndex: 2,
        }}
      />

      {/* Overlay — uniform mobile */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{ background: 'rgba(0,0,0,0.6)', zIndex: 2 }}
      />

      {/* Content */}
      <div
        className="relative h-full"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 40px',
          zIndex: 3,
        }}
      >
        <div className="h-full flex items-center justify-start sm:justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-left sm:text-right"
              style={{ maxWidth: '520px' }}
            >
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  color: '#B8960C',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                {slides[active].label}
              </p>

              <h1
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: '#F5F3EE',
                  marginBottom: '24px',
                  whiteSpace: 'pre-line',
                  textShadow: '0 2px 20px rgba(0,0,0,0.7)',
                }}
              >
                {slides[active].title}
              </h1>

              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'rgba(245,243,238,0.95)',
                  maxWidth: '440px',
                  lineHeight: 1.6,
                  marginBottom: '36px',
                  marginLeft: 'auto',
                  textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                }}
              >
                {slides[active].subtitle}
              </p>

              <Link
                href={slides[active].href}
                className="inline-block"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  border: '1.5px solid #B8960C',
                  color: '#F5F3EE',
                  padding: '18px 42px',
                  textDecoration: 'none',
                  transition: 'all 250ms ease',
                  background: 'rgba(10,10,10,0.55)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#B8960C'
                  e.currentTarget.style.color = '#0A0A0A'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(10,10,10,0.55)'
                  e.currentTarget.style.color = '#F5F3EE'
                }}
              >
                Descobrir Coleção
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-2"
        style={{ zIndex: 4, opacity: 0.5, transition: 'opacity 200ms ease' }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
      >
        <ChevronLeft size={32} color="#F5F3EE" strokeWidth={1} />
      </button>

      <button
        onClick={next}
        aria-label="Próximo slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-2"
        style={{ zIndex: 4, opacity: 0.5, transition: 'opacity 200ms ease' }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
      >
        <ChevronRight size={32} color="#F5F3EE" strokeWidth={1} />
      </button>

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
              width: i === active ? '32px' : '6px',
              height: '4px',
              borderRadius: '2px',
              background: i === active ? '#B8960C' : 'rgba(245,243,238,0.4)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 350ms ease',
            }}
          />
        ))}
      </div>
    </section>
  )
}
