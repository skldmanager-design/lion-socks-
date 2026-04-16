import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <section
      className="flex flex-col items-center justify-center text-center"
      style={{
        minHeight: '70vh',
        background: '#0A0A0A',
        padding: '80px 24px',
      }}
    >
      <Image
        src="/lion_socks_brand_kit/03_icone_escudo/escudo_512x512.png"
        alt="Lion Socks"
        width={500}
        height={500}
        className="object-contain mb-10"
        style={{ height: '80px', width: 'auto', opacity: 0.3 }}
      />

      <p
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '12px',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: '#B8960C',
          marginBottom: '16px',
        }}
      >
        404
      </p>

      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 500,
          color: '#F5F3EE',
          lineHeight: 1.2,
          marginBottom: '16px',
        }}
      >
        Página não encontrada
      </h1>

      <p
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '15px',
          color: '#6B6B6B',
          maxWidth: '420px',
          lineHeight: 1.6,
          marginBottom: '40px',
        }}
      >
        A página que procura não existe ou foi movida.
        Volte à loja e descubra a nossa coleção.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            background: '#F5F3EE',
            color: '#0A0A0A',
            padding: '16px 32px',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'all 200ms ease',
          }}
        >
          Voltar ao Início
        </Link>
        <Link
          href="/loja"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            border: '1px solid #B8960C',
            color: '#B8960C',
            padding: '16px 32px',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'all 200ms ease',
          }}
        >
          Explorar Loja
        </Link>
      </div>
    </section>
  )
}
