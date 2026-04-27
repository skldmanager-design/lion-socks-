import Link from 'next/link'

export const metadata = {
  title: 'Checkout Cancelado',
}

export default function CheckoutCancelPage() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 flex items-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div
          style={{ width: '80px', height: '80px', background: '#E0E0E0', borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        <h1 className="font-display text-gray-900 mb-4" style={{ fontSize: '32px' }}>
          Checkout Cancelado
        </h1>

        <p className="font-body text-gray-600 leading-relaxed mb-8" style={{ fontSize: '14px' }}>
          O seu pagamento foi cancelado. Não foi cobrado nada.
          O seu carrinho ainda tem os produtos guardados.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/carrinho"
            className="font-body text-xs uppercase tracking-widest bg-gray-900 text-white px-8 py-4 hover:bg-gold hover:text-gray-900 transition-all"
          >
            Voltar ao Carrinho
          </Link>
          <Link
            href="/loja"
            className="font-body text-xs uppercase tracking-widest border border-gray-900 text-gray-900 px-8 py-4 hover:bg-gray-900 hover:text-white transition-all"
          >
            Continuar a Explorar
          </Link>
        </div>
      </div>
    </div>
  )
}
