import Link from 'next/link'
import { products } from '@/lib/mock-data'
import ProductCard from '@/components/product/ProductCard'

export default function NotFound() {
  const popular = products.filter((p) => p.badge === 'Destaque').slice(0, 4)

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }} className="pt-20 lg:pt-28 pb-20">
      <section className="text-center px-6 max-w-2xl mx-auto mb-20">
        <p
          className="font-body uppercase mb-6"
          style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: '#B8960C',
            fontWeight: 500,
          }}
        >
          Erro 404
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 400,
            color: '#F5F3EE',
            lineHeight: 1,
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}
        >
          404
        </h1>

        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2vw, 22px)',
            color: '#E8E5DF',
            lineHeight: 1.5,
            marginBottom: '20px',
            fontWeight: 400,
          }}
        >
          Esta página não existe.
        </p>

        <div
          aria-hidden
          style={{ width: '40px', height: '1px', background: '#B8960C', margin: '0 auto 24px' }}
        />

        <p
          className="font-body mx-auto mb-10"
          style={{
            fontSize: '14px',
            color: '#999',
            lineHeight: 1.8,
            maxWidth: '440px',
            fontWeight: 300,
          }}
        >
          Pode ter sido movida, removida, ou — mais provavelmente — nunca existiu.
          Volte ao início ou explore uma das colecções.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
          <Link
            href="/"
            className="font-body uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.18em',
              fontWeight: 500,
              padding: '18px 32px',
              background: '#B8960C',
              color: '#0A0A0A',
              border: '1px solid #B8960C',
              borderBottom: '2px solid #B8960C',
              textDecoration: 'none',
            }}
          >
            Voltar ao Início
          </Link>
          <Link
            href="/loja"
            className="font-body uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.18em',
              fontWeight: 500,
              padding: '18px 32px',
              background: 'transparent',
              color: '#F5F3EE',
              border: '1px solid rgba(245,243,238,0.3)',
              textDecoration: 'none',
            }}
          >
            Explorar a Loja
          </Link>
        </div>

        {/* Family quick-links */}
        <p
          className="font-body uppercase mb-4"
          style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(245,243,238,0.5)', fontWeight: 500 }}
        >
          Ou descubra uma família
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {[
            { href: '/materiais/la-merino',         label: 'Ribeira' },
            { href: '/materiais/fil-d-ecosse',      label: 'Ofício' },
            { href: '/materiais/seda',              label: 'Lello' },
            { href: '/materiais/cashmere',          label: 'Reserva' },
            { href: '/materiais/algodao-penteado',  label: 'Alma' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body uppercase"
              style={{
                fontSize: '12px',
                letterSpacing: '0.14em',
                color: '#E8E5DF',
                textDecoration: 'none',
                transition: 'color 200ms ease',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      {popular.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10">
            <p
              className="font-body uppercase mb-3"
              style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#B8960C', fontWeight: 500 }}
            >
              Talvez goste destes
            </p>
            <h2
              className="font-display"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 400,
                color: '#F5F3EE',
              }}
            >
              Mais Populares
            </h2>
            <div style={{ width: '40px', height: '1px', background: '#B8960C', margin: '20px auto 0' }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
