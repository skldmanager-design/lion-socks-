import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from './NewsletterForm'

const footerLinks = {
  loja: [
    { label: 'Loja', href: '/loja' },
    { label: 'Packs', href: '/packs' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contacto', href: '/contacto' },
    { label: "The Lion's Circle", href: '/lions-circle' },
  ],
  materiais: [
    { label: 'Seda', href: '/materiais/seda' },
    { label: "Fil d'Écosse", href: '/materiais/fil-d-ecosse' },
    { label: 'Lã Merino', href: '/materiais/la-merino' },
  ],
  apoio: [
    { label: 'Envios & Devoluções', href: '/envios' },
    { label: 'Guia de Tamanhos', href: '/guia-tamanhos' },
    { label: 'Política de Privacidade', href: '/privacidade' },
    { label: 'FAQ', href: '/faq' },
  ],
}

const colHeadStyle = {
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  fontWeight: 500,
  color: '#C4A652',
  marginBottom: '16px',
  display: 'block',
}

const linkStyle = {
  fontSize: '14px',
  color: 'rgba(255,255,255,0.6)',
}

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(197,165,90,0.15)' }}>
      {/* Main footer */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12"
        style={{ paddingTop: '80px', paddingBottom: '40px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.png"
                alt="Lion Socks"
                width={300}
                height={540}
                className="h-[48px] w-auto brightness-0 invert"
              />
            </Link>
            <p
              className="font-body leading-relaxed max-w-xs"
              style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}
            >
              Meias premium em seda, fil d&apos;Écosse e lã merino.
              Elegância que se nota nos detalhes.
            </p>

            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-gold" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="Pinterest" className="transition-colors hover:text-gold" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.27-1.95 3.27-4.76 0-2.49-1.79-4.23-4.34-4.23-2.96 0-4.7 2.22-4.7 4.51 0 .89.34 1.85.77 2.37.08.1.09.19.07.29-.08.32-.25 1.04-.28 1.18-.04.19-.14.23-.32.14-1.25-.58-2.03-2.42-2.03-3.89 0-3.15 2.29-6.05 6.61-6.05 3.47 0 6.16 2.47 6.16 5.77 0 3.44-2.17 6.21-5.18 6.21-1.01 0-1.97-.53-2.3-1.15l-.62 2.33c-.23.87-.84 1.96-1.25 2.62.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Loja links */}
          <div>
            <span className="font-body" style={colHeadStyle}>Loja</span>
            <ul className="space-y-3">
              {footerLinks.loja.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body transition-colors hover:text-white"
                    style={linkStyle}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Materiais + Apoio links */}
          <div>
            <span className="font-body" style={colHeadStyle}>Materiais</span>
            <ul className="space-y-3 mb-8">
              {footerLinks.materiais.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body transition-colors hover:text-white"
                    style={linkStyle}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <span className="font-body" style={colHeadStyle}>Apoio</span>
            <ul className="space-y-3">
              {footerLinks.apoio.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body transition-colors hover:text-white"
                    style={linkStyle}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <span className="font-body" style={colHeadStyle}>Newsletter</span>
            <p
              className="font-body mb-5 leading-relaxed"
              style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}
            >
              Novidades, lançamentos e acesso antecipado.
            </p>
            <NewsletterForm dark />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="font-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Lion Socks. Todos os direitos reservados.
          </p>
          <p className="font-body" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
            Made in Portugal
          </p>
        </div>
      </div>
    </footer>
  )
}
