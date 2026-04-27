import { Suspense } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import SuccessContent from './SuccessContent'

export const metadata = {
  title: 'Encomenda Confirmada',
  description: 'Obrigado pela sua compra.',
}

export default function CheckoutSuccessPage() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-20 lg:pt-28 pb-24 flex items-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <p
          className="font-body uppercase mb-6"
          style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: '#B8960C',
            fontWeight: 500,
          }}
        >
          Confirmação
        </p>

        {/* Gold ring with check — restrained */}
        <div
          className="mx-auto flex items-center justify-center mb-8"
          style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            border: '1.5px solid #B8960C',
            background: 'transparent',
          }}
        >
          <Check size={32} strokeWidth={1.5} style={{ color: '#B8960C' }} />
        </div>

        {/* Headline — Playfair italic */}
        <h1
          className="font-display mb-5"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(32px, 4.5vw, 44px)',
            fontWeight: 400,
            color: '#0A0A0A',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}
        >
          Obrigado.
        </h1>

        {/* Italic subhead */}
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '18px',
            color: '#424242',
            lineHeight: 1.6,
            marginBottom: '24px',
            fontWeight: 400,
          }}
        >
          A sua encomenda foi registada.
        </p>

        {/* Gold rule */}
        <div
          aria-hidden
          style={{ width: '40px', height: '1px', background: '#B8960C', margin: '0 auto 24px' }}
        />

        {/* Order details (Suspense) */}
        <Suspense fallback={<p className="font-body" style={{ fontSize: '13px', color: '#6B6B6B' }}>A carregar…</p>}>
          <SuccessContent />
        </Suspense>

        {/* Body copy */}
        <p
          className="font-body mb-10"
          style={{
            fontSize: '14px',
            color: '#6B6B6B',
            lineHeight: 1.8,
            maxWidth: '440px',
            margin: '0 auto 40px',
            fontWeight: 300,
          }}
        >
          Enviámos a confirmação por email. Vai receber a notificação de envio quando o seu par sair do Porto —
          tipicamente dentro de 1–2 dias úteis.
        </p>

        {/* CTAs — same hairline-gold treatment as PDP/checkout */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/conta/encomendas"
            className="font-body uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.18em',
              fontWeight: 500,
              padding: '18px 32px',
              background: '#0A0A0A',
              color: '#F5F3EE',
              border: '1px solid #0A0A0A',
              borderBottom: '2px solid #0A0A0A',
              textDecoration: 'none',
              transition: 'all 280ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            Ver as minhas encomendas
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
              color: '#0A0A0A',
              border: '1px solid #0A0A0A',
              textDecoration: 'none',
              transition: 'all 280ms ease',
            }}
          >
            Continuar a explorar
          </Link>
        </div>

        {/* Italic flourish at bottom */}
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '13px',
            color: 'rgba(10,10,10,0.45)',
            marginTop: '56px',
            letterSpacing: '0.01em',
          }}
        >
          Feitas no Porto. Para quem repara nos detalhes.
        </p>
      </div>
    </div>
  )
}
