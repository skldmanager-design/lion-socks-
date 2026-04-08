'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'
import ProductCard from '@/components/product/ProductCard'

/* ─── SVG Icons for Materials ─────────────────────────────────────────── */

function FilEcosseIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" stroke="#B8960C" strokeWidth="1" />
      <path d="M14 14c3-2 6 2 6 6s-3 8-6 6" stroke="#B8960C" strokeWidth="1" fill="none" />
      <path d="M26 14c-3-2-6 2-6 6s3 8 6 6" stroke="#B8960C" strokeWidth="1" fill="none" />
    </svg>
  )
}

function MerinoIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 28c2-4 4-6 6-6s4 2 6 0 4-4 6-4 4 2 6 6" stroke="#B8960C" strokeWidth="1" fill="none" />
      <path d="M8 22c2-4 4-6 6-6s4 2 6 0 4-4 6-4 4 2 6 6" stroke="#B8960C" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M8 16c2-4 4-6 6-6s4 2 6 0 4-4 6-4 4 2 6 6" stroke="#B8960C" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  )
}

function SilkIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 30 Q20 10 30 30" stroke="#B8960C" strokeWidth="1" fill="none" />
      <path d="M12 30 Q20 14 28 30" stroke="#B8960C" strokeWidth="1" fill="none" opacity="0.5" />
      <line x1="20" y1="8" x2="20" y2="14" stroke="#B8960C" strokeWidth="1" />
      <circle cx="20" cy="7" r="1.5" stroke="#B8960C" strokeWidth="1" fill="none" />
    </svg>
  )
}

/* ─── Section 1: MATERIAIS ────────────────────────────────────────────── */

function MateriaisSection() {
  const materials = [
    {
      icon: <FilEcosseIcon />,
      name: "Fil d'Écosse",
      description: 'Algodão egípcio mercerizado. Brilho subtil, leveza incomparável. O favorito do homem clássico.',
      href: '/materiais/fil-d-ecosse',
    },
    {
      icon: <MerinoIcon />,
      name: 'Lã Merino',
      description: 'Fibra natural ultra-fina. Quente no inverno, fresca no verão. Conforto sem compromisso.',
      href: '/materiais/la-merino',
    },
    {
      icon: <SilkIcon />,
      name: 'Seda',
      description: 'O toque mais refinado. Exclusivo, luminoso, inconfundível.',
      href: '/materiais/seda',
    },
  ]

  return (
    <section style={{ background: '#F5F3EE', padding: '80px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#B8960C',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          OS NOSSOS MATERIAIS
        </p>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '36px',
            fontWeight: 500,
            color: '#0A0A0A',
            textAlign: 'center',
            marginBottom: '48px',
            lineHeight: 1.2,
          }}
        >
          A matéria que se sente
        </h2>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '40px' }}
        >
          {materials.map((mat) => (
            <div key={mat.name} className="text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                {mat.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '20px',
                  fontWeight: 500,
                  color: '#0A0A0A',
                  marginBottom: '8px',
                }}
              >
                {mat.name}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '14px',
                  color: '#6B6B6B',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  maxWidth: '320px',
                  margin: '0 auto 16px',
                }}
                className="md:!mx-0"
              >
                {mat.description}
              </p>
              <Link
                href={mat.href}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '13px',
                  color: '#B8960C',
                  textDecoration: 'none',
                  transition: 'all 200ms ease',
                }}
                className="hover:underline inline-block"
              >
                Saber mais →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Section 2: BESTSELLERS ──────────────────────────────────────────── */

function BestsellersSection() {
  // Get products with badge 'Destaque' first, then fill with first products
  const featured = products.filter((p) => p.badge === 'Destaque')
  const fallback = products.filter((p) => !featured.includes(p))
  const bestsellers = [...featured, ...fallback].slice(0, 4)

  return (
    <section style={{ background: '#0A0A0A', padding: '80px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#B8960C',
                marginBottom: '8px',
              }}
            >
              MAIS VENDIDOS
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '36px',
                fontWeight: 500,
                color: '#F5F3EE',
                lineHeight: 1.2,
              }}
            >
              Os escolhidos
            </h2>
          </div>
          <Link
            href="/loja"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '13px',
              color: '#F5F3EE',
              textDecoration: 'none',
              transition: 'all 200ms ease',
              flexShrink: 0,
            }}
            className="hover:text-[#B8960C]"
          >
            Ver todos →
          </Link>
        </div>

        {/* Product grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ gap: '24px' }}
        >
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Section 3: PACKS ────────────────────────────────────────────────── */

function PacksSection() {
  const packs = [
    { name: 'The Essentials', price: '€39', desc: '3 pares · Caixa de Metal' },
    { name: 'The Connoisseur', price: '€75', desc: '5 pares · Caixa de Metal Premium' },
    { name: "The Gentleman's Collection", price: '€175', desc: '12 pares · Caixa Gaveta' },
  ]

  return (
    <>
    <style>{`
      .pack-zoom-inner {
        transition: scale 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        scale: 1;
      }
      .pack-zoom-link:hover .pack-zoom-inner,
      .pack-zoom-inner.pack-zoom-active {
        scale: 1.05;
      }
    `}</style>
    <section style={{ background: '#0A0A0A', padding: '80px 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div className="flex flex-col lg:flex-row" style={{ gap: '48px' }}>
          {/* Left panel — 55% */}
          <div className="lg:w-[55%]">
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#B8960C',
                marginBottom: '12px',
              }}
            >
              EMBALAGEM PREMIUM
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '40px',
                fontWeight: 500,
                color: '#F5F3EE',
                lineHeight: 1.2,
                marginBottom: '12px',
              }}
            >
              Packs & Coleções
            </h2>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '16px',
                color: '#6B6B6B',
                marginBottom: '40px',
                lineHeight: 1.6,
              }}
            >
              A experiência começa antes de abrir a caixa.
            </p>

            {/* Pack lines */}
            <div>
              {packs.map((pack, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: '1px solid #2A2A2A',
                    padding: '16px 0',
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: '18px',
                        fontWeight: 400,
                        color: '#F5F3EE',
                      }}
                    >
                      {pack.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '18px',
                        fontWeight: 500,
                        color: '#B8960C',
                      }}
                    >
                      {pack.price}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '13px',
                      color: '#6B6B6B',
                      padding: '4px 0',
                    }}
                  >
                    {pack.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/packs"
              className="inline-block mt-8"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#B8960C',
                border: '1px solid #B8960C',
                padding: '14px 28px',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#B8960C'
                e.currentTarget.style.color = '#0A0A0A'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#B8960C'
              }}
            >
              Ver todos os Packs →
            </Link>
          </div>

          {/* Right panel — 45% */}
          <Link
            href="/packs"
            className="pack-zoom-link lg:w-[45%] relative overflow-hidden block"
            style={{
              borderRadius: '4px',
              minHeight: '500px',
            }}
            aria-label="Ver todos os packs Lion Socks"
            onMouseEnter={(e) => {
              e.currentTarget.querySelector('.pack-zoom-inner')?.classList.add('pack-zoom-active')
            }}
            onMouseLeave={(e) => {
              e.currentTarget.querySelector('.pack-zoom-inner')?.classList.remove('pack-zoom-active')
            }}
          >
            <div className="pack-zoom-inner" style={{ position: 'absolute', inset: 0 }}>
              <Image
                src="/lion_socks_brand_kit/08_site/pack_editorial_desktop.png.png"
                alt="Lion Socks · Pack Premium com caixa de metal"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
    </>
  )
}

/* ─── Section 4: MANIFESTO ────────────────────────────────────────────── */

function ManifestoSection() {
  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: '100px 0',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Decorative line */}
        <div
          style={{
            width: '1px',
            height: '40px',
            background: '#B8960C',
            margin: '0 auto 32px',
          }}
        />

        {/* Quote */}
        <blockquote
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 'clamp(26px, 5vw, 42px)',
            fontWeight: 400,
            color: '#F5F3EE',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.3,
          }}
        >
          Feitas para quem repara nos detalhes.
        </blockquote>

        {/* Logo */}
        <div className="mt-10 flex justify-center">
          <Image
            src="/lion_socks_brand_kit/01_logo_principal/logo_completo_transparente_1000h.png"
            alt="Lion Socks"
            width={528}
            height={1000}
            className="object-contain"
            style={{ height: '60px', width: 'auto' }}
          />
        </div>
      </div>
    </section>
  )
}

/* ─── Section 5: NEWSLETTER ───────────────────────────────────────────── */

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section
      style={{
        background: '#F5F3EE',
        padding: '72px 0',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#B8960C',
            marginBottom: '12px',
          }}
        >
          COMUNIDADE LION SOCKS
        </p>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '28px',
            fontWeight: 500,
            color: '#0A0A0A',
            marginBottom: '8px',
            lineHeight: 1.3,
          }}
        >
          Novidades, lançamentos, acesso antecipado.
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '14px',
            color: '#6B6B6B',
            marginBottom: '32px',
          }}
        >
          Sem spam. Só o essencial.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
          style={{ maxWidth: '480px', margin: '0 auto' }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="O seu email"
            required
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '14px',
              background: '#ffffff',
              border: '1px solid #E8E5DF',
              padding: '12px 16px',
              borderRadius: '4px',
              flex: 1,
              outline: 'none',
              transition: 'all 200ms ease',
              color: '#0A0A0A',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#B8960C')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#E8E5DF')}
          />
          <button
            type="submit"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              background: submitted ? '#B8960C' : '#0A0A0A',
              color: submitted ? '#0A0A0A' : '#F5F3EE',
              padding: '12px 24px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!submitted) {
                e.currentTarget.style.background = '#B8960C'
                e.currentTarget.style.color = '#0A0A0A'
              }
            }}
            onMouseLeave={(e) => {
              if (!submitted) {
                e.currentTarget.style.background = '#0A0A0A'
                e.currentTarget.style.color = '#F5F3EE'
              }
            }}
          >
            {submitted ? 'Subscrito!' : 'Subscrever'}
          </button>
        </form>

        {/* Privacy note */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '11px',
            color: '#6B6B6B',
            marginTop: '12px',
          }}
        >
          Ao subscrever aceita a nossa política de privacidade.
        </p>
      </div>
    </section>
  )
}

/* ─── Export all sections ─────────────────────────────────────────────── */

export default function HomeSections() {
  return (
    <>
      <MateriaisSection />
      <BestsellersSection />
      <PacksSection />
      <ManifestoSection />
      <NewsletterSection />
    </>
  )
}
