import Link from 'next/link'
import Image from 'next/image'
import { Lock, Truck, RotateCcw, Shield } from 'lucide-react'
import NewsletterForm from './NewsletterForm'
import PortugalFlag from '@/components/ui/PortugalFlag'
import { FREE_SHIPPING_THRESHOLD } from '@/lib/utils'

const footerLinks = {
  colecoes: [
    { label: 'Ribeira · Merino', href: '/colecoes/ribeira' },
    { label: 'Ofício · Fio de Escócia', href: '/colecoes/oficio' },
    { label: 'Lello · Seda', href: '/colecoes/lello' },
    { label: 'Reserva · Cashmere', href: '/colecoes/reserva' },
    { label: 'Alma · Algodão Penteado', href: '/colecoes/alma' },
    { label: 'Packs', href: '/packs' },
  ],
  informacao: [
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'O Nosso Processo', href: '/craft' },
    { label: 'Guia de Materiais', href: '/guide' },
    { label: 'Guia de Cuidados', href: '/cuidados' },
    { label: 'Guia de Tamanhos', href: '/guia-tamanhos' },
    { label: 'Envios & Devoluções', href: '/envios' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Política de Privacidade', href: '/privacidade' },
    { label: 'Política de Cookies', href: '/cookies' },
    { label: 'Termos & Condições', href: '/termos' },
    { label: 'Livro de Reclamações', href: 'https://www.livroreclamacoes.pt', external: true },
  ],
}

const colHeadStyle = {
  fontSize: 'clamp(9px, 1vw, 11px)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  fontWeight: 500,
  color: '#B8960C',
  marginBottom: 'clamp(8px, 1.5vw, 16px)',
  display: 'block',
}

const linkStyle = {
  fontSize: 'clamp(11px, 1.4vw, 14px)',
  color: '#5A5A5A',
}

export default function Footer() {
  return (
    <footer style={{ background: '#F5F3EE', borderTop: '1px solid rgba(184,150,12,0.18)' }}>
      {/* Main footer */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 footer-main"
        style={{ paddingTop: 'clamp(28px, 5vw, 80px)', paddingBottom: 'clamp(20px, 3vw, 40px)' }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-12 footer-grid" style={{ gap: 'clamp(16px, 3vw, 40px)' }}>

          {/* Brand column — full-width compact em mobile */}
          <div className="col-span-2 lg:col-span-3 footer-brand">
            <Link
              href="/"
              className="inline-block footer-brand-name"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(15px, 1.8vw, 20px)',
                fontWeight: 500,
                color: '#0A0A0A',
                textDecoration: 'none',
                letterSpacing: '0.02em',
              }}
            >
              Lion Socks
            </Link>
            <p
              className="font-body footer-brand-tagline"
              style={{ fontSize: 'clamp(11px, 1.3vw, 13px)', color: '#6B6B6B', lineHeight: 1.5, maxWidth: '260px' }}
            >
              Feitas no Porto. Para quem repara nos detalhes.
            </p>
          </div>

          {/* Colecções */}
          <div className="lg:col-span-3">
            <span className="font-body" style={colHeadStyle}>Colecções</span>
            <ul className="footer-link-list">
              {footerLinks.colecoes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body transition-colors hover:text-gold gold-underline"
                    style={linkStyle}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informação */}
          <div className="lg:col-span-3">
            <span className="font-body" style={colHeadStyle}>Informação</span>
            <ul className="footer-link-list footer-link-list-mb">
              {footerLinks.informacao.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body transition-colors hover:text-gold gold-underline"
                    style={linkStyle}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <span className="font-body" style={colHeadStyle}>Legal</span>
            <ul className="footer-link-list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body transition-colors hover:text-gold gold-underline"
                      style={linkStyle}
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-body transition-colors hover:text-gold gold-underline"
                      style={linkStyle}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto + Newsletter + Pledge — full-width em mobile */}
          <div className="col-span-2 lg:col-span-3 footer-last-col">
            <div className="footer-last-grid">
              <div className="footer-contacto">
                <span className="font-body" style={colHeadStyle}>Contacto</span>
                <ul className="footer-link-list">
                  <li>
                    <a
                      href="mailto:info@lionsocks.pt"
                      className="font-body transition-colors hover:text-gold gold-underline"
                      style={linkStyle}
                    >
                      info@lionsocks.pt
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/lionsocks"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body transition-colors hover:text-gold gold-underline"
                      style={linkStyle}
                    >
                      @lionsocks
                    </a>
                  </li>
                </ul>
              </div>

              <div className="footer-newsletter-head">
                <span className="font-body" style={colHeadStyle}>Newsletter</span>
                <p
                  className="font-body leading-relaxed"
                  style={{ fontSize: 'clamp(11px, 1.3vw, 13px)', fontWeight: 300, color: '#6B6B6B', marginBottom: 'clamp(6px, 1.5vw, 16px)' }}
                >
                  Novidades e acesso antecipado.
                </p>
              </div>
            </div>

            <div className="footer-newsletter-form">
              <NewsletterForm />
            </div>

            <p
              className="font-body italic footer-pledge"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(11px, 1.3vw, 13px)',
                color: '#B8960C',
                lineHeight: 1.5,
                borderTop: '1px solid rgba(184,150,12,0.2)',
                paddingTop: 'clamp(10px, 1.5vw, 16px)',
                marginTop: 'clamp(10px, 2vw, 24px)',
              }}
            >
              Nunca fazemos saldos. O nosso preço é o preço justo, todo o ano.
            </p>
          </div>
        </div>
      </div>

      {/* Payment methods + trust */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12" style={{ paddingTop: 'clamp(14px, 2vw, 24px)', paddingBottom: 'clamp(14px, 2vw, 24px)' }}>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 mb-4">
            {[
              // Card-style art (each SVG already includes its own colored background, ratio ~5:3)
              { name: 'Visa',        src: '/payment-icons/visa.svg',         card: true },
              { name: 'Mastercard',  src: '/payment-icons/mastercard.svg',   card: true },
              { name: 'PayPal',      src: '/payment-icons/paypal.svg',       card: true },
              // Icon-only — placed inside a white chip for visual parity with the cards
              { name: 'Multibanco',  src: '/payment-icons/multibanco.svg',   card: false },
              { name: 'MB WAY',      src: '/payment-icons/mbway.svg',        card: false },
              { name: 'Apple Pay',   src: '/payment-icons/applepay.svg',     card: false },
              { name: 'Google Pay',  src: '/payment-icons/googlepay.svg',    card: false },
            ].map((m) =>
              m.card ? (
                <Image
                  key={m.name}
                  src={m.src}
                  alt={m.name}
                  width={50}
                  height={32}
                  style={{
                    height: '32px',
                    width: '50px',
                    borderRadius: '5px',
                    border: '1px solid rgba(10,10,10,0.08)',
                    boxShadow: '0 1px 2px rgba(10,10,10,0.04)',
                  }}

                />
              ) : (
                <span
                  key={m.name}
                  aria-label={m.name}
                  style={{
                    height: '32px',
                    width: '50px',
                    padding: '6px 10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FFFFFF',
                    borderRadius: '5px',
                    border: '1px solid rgba(10,10,10,0.08)',
                    boxShadow: '0 1px 2px rgba(10,10,10,0.04)',
                  }}
                >
                  <Image
                    src={m.src}
                    alt={m.name}
                    width={40}
                    height={20}
                    style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}

                  />
                </span>
              ),
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-body" style={{ color: '#6B6B6B' }}>
            {[
              { Icon: Lock, text: 'Pagamento seguro SSL' },
              { Icon: Truck, text: `Envio grátis +€${FREE_SHIPPING_THRESHOLD}` },
              { Icon: RotateCcw, text: 'Devolução em 30 dias' },
              { Icon: Shield, text: 'Garantia de qualidade' },
            ].map(({ Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon size={12} strokeWidth={1.5} style={{ color: '#B8960C' }} />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12" style={{ paddingTop: 'clamp(12px, 2vw, 24px)', paddingBottom: 'clamp(12px, 2vw, 24px)' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 mb-2">
            <p className="font-body" style={{ fontSize: 'clamp(10px, 1.2vw, 12px)', color: '#6B6B6B' }}>
              © {new Date().getFullYear()} Lion Socks. Todos os direitos reservados.
            </p>
            <p className="font-body flex items-center gap-2" style={{ fontSize: 'clamp(10px, 1.2vw, 12px)', color: '#B8960C' }}>
              <PortugalFlag width={18} height={12} />
              Feitas em Portugal
            </p>
          </div>
          <p className="font-body text-center" style={{ fontSize: 'clamp(9px, 1vw, 10px)', color: 'rgba(10,10,10,0.4)' }}>
            Lion Socks é uma marca operada por Valsport, Lda. · Porto, Portugal
          </p>
        </div>
      </div>
    </footer>
  )
}

