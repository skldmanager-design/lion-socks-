'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const slides = [
  {
    desktopImg: '/home/hero-homem.jpg',
    mobileImg: '/home/hero-homem.jpg',
    label: 'COLECÇÃO HOMEM',
    title: 'Para quem repara\nnos detalhes.',
    subtitle: 'Meias de manufactura portuguesa. Do fio de escócia à seda. Acabamento artesanal. Linha dourada.',
    href: '/loja',
    bgPosition: 'center',
    cta: 'Descobrir a colecção',
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
      className="relative overflow-hidden hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        .hero-section {
          margin-top: calc(var(--header-h, 148px) * -1);
          height: 100vh;
          min-height: 640px;
        }
        @supports (height: 100svh) {
          .hero-section { height: 100svh; }
        }
        /* Mobile: layout idêntico ao desktop em escala — landscape compacto.
           Header continua a sobrepor-se (marginTop negativo).
           Aspect-ratio 16:10 em vez de full-screen vertical. */
        @media (max-width: 1023px) {
          .hero-section {
            /* Header transparente em cima sobrepõe o hero (igual desktop) */
            margin-top: calc(var(--header-h, 64px) * -1);
            height: auto;
            aspect-ratio: 4 / 3;
            min-height: 0;
          }
          /* Tipografia escalada — clean e proporcional ao hero compacto */
          .hero-eyebrow { font-size: 9px !important; margin-bottom: 10px !important; letter-spacing: 0.18em !important; }
          .hero-title   { font-size: 22px !important; margin-bottom: 12px !important; line-height: 1.15 !important; }
          .hero-subtitle{ display: none !important; }
          .hero-cta     { font-size: 10px !important; padding: 12px 20px !important; min-height: 40px !important; letter-spacing: 0.16em !important; }
          .hero-content-wrap { padding: 0 20px !important; }
        }
      `}</style>
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: i === active ? 1 : 0,
          }}
        >
          <Image
            src={slide.desktopImg}
            alt={slide.label}
            fill
            priority={i === 0}
            sizes="100vw"
            className="hero-img"
            style={{ objectFit: 'cover', objectPosition: slide.bgPosition }}
          />
        </div>
      ))}

      {/* Overlay — gradient lateral (igual em todos os tamanhos) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.85) 100%)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        className="relative h-full hero-content-wrap"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(24px, 6vw, 80px)',
          zIndex: 3,
        }}
      >
        <div className="h-full flex items-center justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-right"
              style={{ maxWidth: '460px', width: '100%', marginLeft: 'auto' }}
            >
              <p
                className="hero-eyebrow"
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
                className="hero-title"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(28px, 4.2vw, 48px)',
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: '#F5F3EE',
                  marginBottom: '24px',
                  whiteSpace: 'pre-line',
                  textShadow: '0 2px 20px rgba(0,0,0,0.7)',
                  overflowWrap: 'break-word',
                }}
              >
                {slides[active].title}
              </h1>

              <p
                className="hero-subtitle"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'rgba(245,243,238,0.95)',
                  maxWidth: '100%',
                  lineHeight: 1.6,
                  marginBottom: '36px',
                  textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                  overflowWrap: 'break-word',
                }}
              >
                {slides[active].subtitle}
              </p>

              <Link
                href={slides[active].href}
                className="inline-block hero-cta"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  border: '1.5px solid #B8960C',
                  color: '#F5F3EE',
                  padding: '18px clamp(20px, 8vw, 42px)',
                  minHeight: '52px',
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
                {slides[active].cta}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {slides.length > 1 && <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-2"
        style={{ zIndex: 4, opacity: 0.5, transition: 'opacity 200ms ease' }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
      >
        <ChevronLeft size={32} color="#F5F3EE" strokeWidth={1} />
      </button>}

      {slides.length > 1 && <button
        onClick={next}
        aria-label="Próximo slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-2"
        style={{ zIndex: 4, opacity: 0.5, transition: 'opacity 200ms ease' }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
      >
        <ChevronRight size={32} color="#F5F3EE" strokeWidth={1} />
      </button>}

      {/* Slide indicators */}
      {slides.length > 1 && <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2"
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
      </div>}

      {/* Scroll indicator — minimal vertical line + label */}
      <div
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        style={{ zIndex: 4 }}
      >
        <span
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(245,243,238,0.7)',
            fontWeight: 500,
          }}
        >
          Descobrir
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(184,150,12,0.8), rgba(184,150,12,0))',
            animation: 'scrollLine 2s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes scrollLine {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(8px); opacity: 0.4; }
          }
        `}</style>
      </div>
    </section>
  )
}
