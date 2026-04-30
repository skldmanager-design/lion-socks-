import Link from 'next/link'
import Image from 'next/image'

/**
 * Hero — single editorial frame (sem carrossel).
 * h1 a clamp(40px, 7.5vw, 92px) Playfair 400 com italic dourado em "repara".
 * Subtitle narrativa (desktop) e curta (mobile).
 */

const HERO = {
  image: '/home/hero-homem.jpg',
  imageAlt: 'Manufactura Lion Socks no Porto — meias premium em fio de escócia',
  label: 'Colecção Homem',
  // Subtitle longa para desktop
  subtitleDesktop:
    'Tecidas no Porto, em fio de escócia, lã merino e seda. A linha dourada no punho é a única coisa que pedimos que repare.',
  // Subtitle curta para mobile (8 palavras)
  subtitleMobile: 'Manufactura no Porto. Linha dourada no punho.',
  href: '/loja',
  cta: 'Descobrir a colecção',
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden hero-section">
      <style>{`
        .hero-section {
          margin-top: calc(var(--header-h, 148px) * -1);
          height: 100vh;
          min-height: 640px;
        }
        @supports (height: 100svh) {
          .hero-section { height: 100svh; }
        }
        @media (max-width: 1023px) {
          .hero-section {
            margin-top: calc(var(--header-h, 64px) * -1);
            height: auto;
            aspect-ratio: 4 / 3;
            min-height: 0;
          }
          /* Tipografia mobile — escala generosa, subtitle visível */
          .hero-eyebrow { font-size: 10px !important; margin-bottom: 14px !important; letter-spacing: 0.22em !important; }
          .hero-title   { font-size: clamp(26px, 7vw, 36px) !important; line-height: 1.1 !important; margin-bottom: 14px !important; letter-spacing: -0.005em !important; }
          .hero-subtitle-desktop { display: none !important; }
          .hero-subtitle-mobile  { display: block !important; }
          .hero-cta     { font-size: 11px !important; padding: 14px 24px !important; min-height: 44px !important; letter-spacing: 0.18em !important; }
          .hero-content-wrap { padding: 0 24px !important; }
        }
        @media (min-width: 1024px) {
          .hero-subtitle-mobile  { display: none; }
          .hero-subtitle-desktop { display: block; }
        }
        @keyframes scrollLine {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.4; }
        }
      `}</style>

      <div className="absolute inset-0">
        <Image
          src={HERO.image}
          alt={HERO.imageAlt}
          fill
          priority
          sizes="100vw"
          className="hero-img"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Overlay — gradient lateral */}
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
          <div
            className="text-right"
            style={{ maxWidth: '720px', width: '100%', marginLeft: 'auto' }}
          >
            <p
              className="hero-eyebrow"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '11px',
                letterSpacing: '0.32em',
                color: '#B8960C',
                fontWeight: 500,
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              {HERO.label}
            </p>

            <h1
              className="hero-title"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(32px, 5.2vw, 64px)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: '#F5F3EE',
                marginBottom: '28px',
                textShadow: '0 2px 24px rgba(0,0,0,0.55)',
                overflowWrap: 'break-word',
                textWrap: 'balance' as const,
              }}
            >
              Para quem{' '}
              <em style={{ color: '#B8960C', fontStyle: 'italic', fontWeight: 400 }}>
                repara
              </em>
              <br />
              nos detalhes.
            </h1>

            <p
              className="hero-subtitle-desktop"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '15px',
                fontWeight: 400,
                color: 'rgba(245,243,238,0.92)',
                maxWidth: '520px',
                marginLeft: 'auto',
                lineHeight: 1.6,
                marginBottom: '36px',
                textShadow: '0 1px 8px rgba(0,0,0,0.5)',
                overflowWrap: 'break-word',
                textWrap: 'pretty' as const,
              }}
            >
              {HERO.subtitleDesktop}
            </p>

            <p
              className="hero-subtitle-mobile"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '12px',
                fontWeight: 400,
                color: 'rgba(245,243,238,0.85)',
                maxWidth: '24ch',
                marginLeft: 'auto',
                lineHeight: 1.5,
                marginBottom: '20px',
                textShadow: '0 1px 8px rgba(0,0,0,0.5)',
              }}
            >
              {HERO.subtitleMobile}
            </p>

            <Link
              href={HERO.href}
              className="inline-block hero-cta"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.18em',
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
            >
              {HERO.cta}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator — apenas linha dourada animada, sem texto (CD #2.2) */}
      <div
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center"
        style={{ zIndex: 4 }}
      >
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, rgba(184,150,12,0.8), rgba(184,150,12,0))',
            animation: 'scrollLine 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
