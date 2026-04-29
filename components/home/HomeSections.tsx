'use client'

import Image from 'next/image'
import Link from 'next/link'
import { products } from '@/lib/catalog'
import ProductCard from '@/components/product/ProductCard'
import PortugalFlag from '@/components/ui/PortugalFlag'
import ListaPrivadaSection from './ListaPrivadaSection'


/* ─── Section wrapper (was animated; now a no-op div) ───────────────── */
function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

/* ─── SVG Icons for Materials ─────────────────────────────────────────── */

/* ─── Material Icons (PNG images) ────────────────────────────────────── */

function MaterialIcon({ src, alt, imgSize = 150 }: { src: string; alt: string; imgSize?: number }) {
  return (
    <div style={{ width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        src={src}
        alt={alt}
        width={imgSize * 2}
        height={imgSize * 2}
        className="object-contain"
        style={{ width: `${imgSize}px`, height: `${imgSize}px`, filter: 'saturate(1.3) brightness(0.9)' }}

      />
    </div>
  )
}

/* ─── Section 1: MATERIAIS ────────────────────────────────────────────── */

function MateriaisSection() {
  // "Saber mais" → storytelling page (/materiais/<handle>). Each story has its own CTA to the products.
  const materials = [
    { icon: <MaterialIcon src="/icons/materiais/ovelha.png"  alt="Ribeira — Merino"           imgSize={125} />, family: 'Ribeira', material: 'Merino',           description: 'Fibra que se adapta. Quente no inverno, fresca no verão — por estrutura, não por marketing.', href: '/materiais/la-merino' },
    { icon: <MaterialIcon src="/icons/materiais/algodao.png" alt="Ofício — Fio de Escócia"    imgSize={125} />, family: 'Ofício',  material: 'Fio de Escócia',   description: 'Algodão egípcio mercerizado. Brilho subtil, cor profunda, zero pilling.',                          href: '/materiais/fil-d-ecosse' },
    { icon: <MaterialIcon src="/icons/materiais/seda.png"    alt="Lello — Seda"               imgSize={190} />, family: 'Lello',   material: 'Seda',             description: 'O toque que desliza. Para os dias que importam.',                                                  href: '/materiais/seda' },
    { icon: <MaterialIcon src="/icons/materiais/ovelha.png"  alt="Reserva — Cashmere"         imgSize={125} />, family: 'Reserva', material: 'Cashmere',         description: 'A fibra mais fina do mundo. Oito vezes mais isolante que a lã.',                                   href: '/materiais/cashmere' },
    { icon: <MaterialIcon src="/icons/materiais/algodao.png" alt="Alma — Algodão Penteado"    imgSize={125} />, family: 'Alma',    material: 'Algodão Penteado', description: 'A base honesta. Macio, durável, sem dramas.',                                                       href: '/materiais/algodao-penteado' },
  ]

  return (
    <section style={{ background: '#F5F3EE', padding: 'clamp(24px, 6vw, 56px) 0' }}>
      <AnimatedSection>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(12px, 3vw, 24px)' }}>
          <p
            className="text-center"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(9px, 1.1vw, 11px)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#B8960C',
              marginBottom: 'clamp(6px, 1vw, 12px)',
            }}
          >
            Os Nossos Materiais
          </p>

          <h2
            className="text-center"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(20px, 4vw, 40px)',
              fontWeight: 400,
              color: '#0A0A0A',
              marginBottom: 'clamp(10px, 1.7vw, 20px)',
              lineHeight: 1.15,
            }}
          >
            O que não se vê é o que importa.
          </h2>

          <div style={{ width: '40px', height: '1px', background: '#B8960C', margin: '0 auto clamp(14px, 2.5vw, 28px)' }} />

          <p
            className="text-center mx-auto"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(11px, 1.4vw, 14px)',
              color: '#6B6B6B',
              maxWidth: '560px',
              marginBottom: 'clamp(20px, 4vw, 48px)',
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            Cinco materiais. Uma exigência. Do algodão penteado ao cashmere puro, cada fio é escolhido pelo que faz — não pelo que parece.
          </p>

          {/* Cards grid — 2-col mobile (5º centrado), 5-col desktop */}
          <div
            className="grid grid-cols-2 lg:grid-cols-5 materials-grid"
            style={{ gap: 'clamp(10px, 2vw, 20px)' }}
          >
            {materials.map((mat) => (
              <div key={mat.family} className="h-full">
                <Link
                  href={mat.href}
                  className="group block h-full"
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '8px',
                    padding: 'clamp(10px, 5vw, 40px) clamp(6px, 4vw, 32px)',
                    border: '1px solid #E8E5DF',
                    textDecoration: 'none',
                    transition: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'
                    e.currentTarget.style.borderColor = '#B8960C'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = '#E8E5DF'
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      marginBottom: 'clamp(10px, 2vw, 24px)',
                      transition: 'transform 300ms ease',
                    }}
                    className="group-hover:scale-110 material-icon-wrap"
                  >
                    {mat.icon}
                  </div>

                  {/* Family name + material label */}
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(15px, 2.5vw, 24px)',
                      fontWeight: 500,
                      color: '#0A0A0A',
                      marginBottom: '4px',
                      transition: 'color 200ms ease',
                    }}
                    className="group-hover:text-[#B8960C]"
                  >
                    {mat.family}
                  </h3>
                  <p
                    className="material-label"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 'clamp(9px, 1.1vw, 11px)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: '#B8960C',
                      fontWeight: 500,
                      marginBottom: 'clamp(8px, 1.5vw, 16px)',
                    }}
                  >
                    {mat.material}
                  </p>

                  {/* Description */}
                  <p
                    className="material-desc"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 'clamp(11px, 1.4vw, 14px)',
                      color: '#6B6B6B',
                      lineHeight: 1.7,
                      marginBottom: 'clamp(10px, 1.8vw, 20px)',
                      maxWidth: '320px',
                    }}
                  >
                    {mat.description}
                  </p>

                  {/* Arrow link — pushed to bottom */}
                  <span
                    className="material-arrow group-hover:gap-3"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 'clamp(10px, 1.3vw, 13px)',
                      color: '#B8960C',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'gap 200ms ease',
                      marginTop: 'auto',
                      alignSelf: 'flex-start',
                    }}
                  >
                    Saber mais
                    <span style={{ transition: 'transform 200ms ease' }} className="group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}

/* ─── SIGNATURE DETAIL: A Linha Dourada ───────────────────────────────── */

function SignatureSection() {
  return (
    <section style={{ background: '#F5F3EE', padding: 'clamp(36px, 8vw, 88px) 0' }}>
      <AnimatedSection>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)', textAlign: 'center' }}>
          <div
            style={{
              width: 'clamp(70px, 10vw, 120px)',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #B8960C 20%, #D4AF37 50%, #B8960C 80%, transparent 100%)',
              margin: '0 auto clamp(16px, 3vw, 32px)',
            }}
          />
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(9px, 1.1vw, 11px)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#B8960C',
              marginBottom: 'clamp(8px, 1.5vw, 16px)',
            }}
          >
            A Assinatura
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(17px, 4vw, 40px)',
              fontWeight: 400,
              color: '#0A0A0A',
              lineHeight: 1.2,
              marginBottom: 'clamp(10px, 2vw, 24px)',
            }}
          >
            A Linha Dourada
          </h2>
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(13px, 1.6vw, 19px)',
              fontStyle: 'italic',
              color: '#424242',
              lineHeight: 1.7,
              marginBottom: '12px',
              fontWeight: 400,
            }}
          >
            Cada par Lion Socks carrega uma linha dourada no punho. Não é decoração — é assinatura.
          </p>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(11px, 1.4vw, 14px)',
              color: '#6B6B6B',
              lineHeight: 1.8,
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            O detalhe que se vê quando a calça sobe, quando cruzas as pernas, quando alguém repara.
            Discreto para quem veste. Inconfundível para quem conhece.
          </p>
        </div>
      </AnimatedSection>
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
    <section style={{ background: '#0A0A0A', padding: 'clamp(28px, 6vw, 56px) 0' }}>
      <AnimatedSection>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        {/* Header — editorial */}
        <div className="text-center" style={{ marginBottom: 'clamp(20px, 3vw, 56px)' }}>
          <p
            className="font-body uppercase"
            style={{ fontSize: 'clamp(9px, 1vw, 11px)', letterSpacing: '0.18em', color: '#B8960C', fontWeight: 500, marginBottom: 'clamp(6px, 1vw, 12px)' }}
          >
            Selecção da Casa
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(20px, 4vw, 40px)',
              fontWeight: 400,
              color: '#F5F3EE',
              lineHeight: 1.15,
            }}
          >
            Mais vendidos
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#B8960C', margin: 'clamp(12px, 1.5vw, 20px) auto 0' }} />
        </div>

        {/* Product grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: 'clamp(10px, 1.6vw, 24px)' }}
        >
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      </AnimatedSection>
    </section>
  )
}

/* ─── Section 3: PACKS ────────────────────────────────────────────────── */

function PacksSection() {
  const packs = [
    { name: 'Lion Entry Box', price: '€24,90', desc: '2 pares · Caixa de Metal', href: '/packs/lion-entry-box' },
    { name: 'Lion Essentials', price: '€34,90', desc: '3 pares · Caixa de Metal', href: '/packs/lion-essentials' },
    { name: 'Lion Connoisseur', price: '€69,90', desc: '5 pares · Caixa de Metal Premium', href: '/packs/lion-connoisseur' },
    { name: "Lion Gentleman's Collection", price: '€169', desc: '12 pares · Caixa Gaveta', href: '/packs/lion-gentlemans-collection' },
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
    <section style={{ background: '#0A0A0A', padding: 'clamp(28px, 6vw, 56px) 0' }}>
      <AnimatedSection>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
        <div className="flex flex-col items-center" style={{ gap: 'clamp(20px, 3vw, 40px)' }}>
        <div className="flex flex-col lg:flex-row lg:items-center w-full" style={{ gap: 'clamp(16px, 4vw, 48px)' }}>
          {/* Left panel — full mobile / 55% desktop */}
          <div className="w-full lg:w-[55%]">
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 'clamp(9px, 1.1vw, 11px)',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#B8960C',
                marginBottom: 'clamp(6px, 1vw, 12px)',
              }}
            >
              Embalagem Premium
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(20px, 4.5vw, 44px)',
                fontWeight: 400,
                color: '#F5F3EE',
                lineHeight: 1.15,
                marginBottom: 'clamp(8px, 1.5vw, 16px)',
              }}
            >
              Lion Box
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#B8960C', marginBottom: 'clamp(12px, 2vw, 20px)' }} />
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 'clamp(9px, 1.5vw, 16px)',
                color: '#999999',
                marginBottom: 'clamp(10px, 3.5vw, 40px)',
                lineHeight: 1.5,
              }}
            >
              A experiência começa antes de abrir a caixa.
            </p>

            {/* Pack lines */}
            <div>
              {packs.map((pack, i) => (
                <Link
                  key={i}
                  href={pack.href}
                  className="block group"
                  style={{
                    borderBottom: '1px solid #2A2A2A',
                    padding: 'clamp(6px, 1.5vw, 16px) 0',
                    textDecoration: 'none',
                    transition: 'all 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.paddingLeft = '8px'
                    e.currentTarget.style.borderColor = '#B8960C'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.paddingLeft = '0'
                    e.currentTarget.style.borderColor = '#2A2A2A'
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(14px, 1.8vw, 18px)',
                        fontWeight: 400,
                        color: '#F5F3EE',
                        transition: 'color 200ms ease',
                        lineHeight: 1.2,
                      }}
                      className="group-hover:text-[#B8960C]"
                    >
                      {pack.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: 'clamp(14px, 1.8vw, 18px)',
                        fontWeight: 500,
                        color: '#B8960C',
                        whiteSpace: 'nowrap',
                        marginLeft: '8px',
                      }}
                    >
                      {pack.price}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 'clamp(11px, 1.3vw, 13px)',
                      color: '#999999',
                      padding: '2px 0',
                      lineHeight: 1.3,
                    }}
                  >
                    {pack.desc}
                  </p>
                </Link>
              ))}
            </div>

          </div>

          {/* Image — full mobile / 45% desktop */}
          <Link
            href="/packs"
            className="pack-zoom-link w-full lg:w-[45%] relative overflow-hidden block lion-box-img"
            style={{ borderRadius: '4px' }}
            aria-label="Ver todos os packs Lion Socks"
          >
            <div className="pack-zoom-inner" style={{ position: 'absolute', inset: 0 }}>
              <Image
                src="/lion_socks_brand_kit/08_site/pack_editorial_desktop.png"
                alt="Lion Socks · Pack Premium com caixa de metal"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Link>

          </div>

          {/* CTA — centrada no fundo da secção (mobile + desktop) */}
          <Link
            href="/packs"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(11px, 1.2vw, 12px)',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#B8960C',
              border: '1px solid #B8960C',
              padding: 'clamp(10px, 1.5vw, 14px) clamp(22px, 3vw, 28px)',
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
            Ver todas as Caixas →
          </Link>
        </div>
      </div>
      </AnimatedSection>
    </section>
    </>
  )
}

/* ─── EDITORIAL / CATEGORIES ─────────────────────────────────────────── */

function EditorialCategories() {
  const categories = [
    {
      title: 'Everyday',
      subtitle: 'Os que vestes sem pensar.',
      href: '/colecoes/oficio',
      img: '/home/colecao-classica.jpg',
      span: 'lg:col-span-1 lg:row-span-2',
      tall: true,
    },
    {
      title: 'Evening',
      subtitle: 'Quando os detalhes falam.',
      href: '/colecoes/lello',
      img: '/home/seda-elegancia.jpg',
      span: 'lg:col-span-1',
      tall: false,
    },
    {
      title: 'Signature',
      subtitle: 'Raro. Por definição.',
      href: '/colecoes/reserva',
      img: '/home/edicoes-limitadas.jpg',
      span: 'lg:col-span-1',
      tall: false,
    },
  ]

  return (
    <section className="hs-edit" style={{ background: '#0A0A0A' }}>
      <style>{`
        /* Mobile = desktop em escala — 2 cols × 2 rows, tall à esquerda */
        .hs-edit { padding: 32px 0; }
        .hs-edit .hs-grid { min-height: 0; }
        .hs-edit .hs-tall { min-height: 312px; }
        .hs-edit .hs-short { min-height: 150px; }
        @media (min-width: 1024px) {
          .hs-edit { padding: 60px 0; }
          .hs-edit .hs-grid { min-height: 640px; }
          .hs-edit .hs-tall { min-height: 500px; }
          .hs-edit .hs-short { min-height: 310px; }
        }
      `}</style>
      <AnimatedSection>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div className="hs-grid grid grid-cols-2 grid-rows-2" style={{ gap: '10px' }}>
          {/* Left — Coleção Clássica (tall, spans 2 rows) */}
          <div className="row-span-2">
            <Link
              href={categories[0].href}
              className="group relative block overflow-hidden h-full hs-tall"
              style={{ borderRadius: '4px' }}
            >
              <Image
                src={categories[0].img}
                alt={categories[0].title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.1) 80%, transparent 100%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: 'clamp(14px, 2.5vw, 32px)', left: 'clamp(14px, 2.5vw, 32px)', right: 'clamp(14px, 2.5vw, 32px)', zIndex: 2 }}>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(9px, 1.2vw, 11px)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#B8960C',
                  marginBottom: 'clamp(4px, 0.8vw, 8px)',
                }}>
                  {categories[0].subtitle}
                </p>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(18px, 3vw, 28px)',
                  fontWeight: 400,
                  color: '#F5F3EE',
                  lineHeight: 1.2,
                  marginBottom: 'clamp(8px, 1.5vw, 16px)',
                }}>
                  {categories[0].title}
                </h3>
                <span style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(9px, 1.3vw, 12px)',
                  color: '#B8960C',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  transition: 'letter-spacing 300ms ease',
                }}
                className="group-hover:tracking-widest"
                >
                  Descobrir →
                </span>
              </div>
            </Link>
          </div>

          {/* Right top — Seda */}
          <div>
            <Link
              href={categories[1].href}
              className="group relative block overflow-hidden h-full hs-short"
              style={{ borderRadius: '4px' }}
            >
              <Image
                src={categories[1].img}
                alt={categories[1].title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.1) 80%, transparent 100%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: 'clamp(10px, 2vw, 24px)', left: 'clamp(10px, 2vw, 24px)', right: 'clamp(10px, 2vw, 24px)', zIndex: 2 }}>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(8px, 1.1vw, 10px)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#B8960C',
                  marginBottom: 'clamp(3px, 0.6vw, 6px)',
                }}>
                  {categories[1].subtitle}
                </p>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(13px, 2.4vw, 22px)',
                  fontWeight: 400,
                  color: '#F5F3EE',
                  lineHeight: 1.2,
                }}>
                  {categories[1].title}
                </h3>
              </div>
            </Link>
          </div>

          {/* Right bottom — Edições Limitadas */}
          <div>
            <Link
              href={categories[2].href}
              className="group relative block overflow-hidden h-full hs-short"
              style={{ borderRadius: '4px' }}
            >
              <Image
                src={categories[2].img}
                alt={categories[2].title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0.1) 80%, transparent 100%)',
                }}
              />
              <div style={{ position: 'absolute', bottom: 'clamp(10px, 2vw, 24px)', left: 'clamp(10px, 2vw, 24px)', right: 'clamp(10px, 2vw, 24px)', zIndex: 2 }}>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(8px, 1.1vw, 10px)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#B8960C',
                  marginBottom: 'clamp(3px, 0.6vw, 6px)',
                }}>
                  {categories[2].subtitle}
                </p>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(13px, 2.4vw, 22px)',
                  fontWeight: 400,
                  color: '#F5F3EE',
                  lineHeight: 1.2,
                }}>
                  {categories[2].title}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
      </AnimatedSection>
    </section>
  )
}

/* ─── Export all sections ─────────────────────────────────────────────── */

export default function HomeSections() {
  return (
    <>
      <BestsellersSection />
      <EditorialCategories />
      <PacksSection />
      <MateriaisSection />
      <ListaPrivadaSection />
      <SignatureSection />
      <MadeInPortugalBar />
    </>
  )
}

/* ─── Made in Portugal — short minimal bar ──────────────────────────────── */

function MadeInPortugalBar() {
  return (
    <section style={{ background: '#F5F3EE', padding: '32px 0', borderTop: '1px solid rgba(184,150,12,0.18)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: '#B8960C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
          }}
        >
          <PortugalFlag width={22} height={15} />
          Feitas em Portugal
        </p>
      </div>
    </section>
  )
}
