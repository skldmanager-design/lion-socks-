import Link from 'next/link'
import { Suspense } from 'react'
import SuccessContent from './SuccessContent'

export default function SuccessPage() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 flex items-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div
          style={{ width: '80px', height: '80px', background: '#B8960C', borderRadius: '50%', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-display text-gray-900 mb-4" style={{ fontSize: '32px' }}>
          Encomenda Confirmada
        </h1>

        <Suspense fallback={<p className="font-body text-gray-500">A carregar...</p>}>
          <SuccessContent />
        </Suspense>

        <p className="font-body text-gray-600 leading-relaxed mb-8" style={{ fontSize: '14px' }}>
          Obrigado pela sua encomenda. Enviamos um email com os detalhes da compra
          e irá receber a confirmação de envio nos próximos dias úteis.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/loja"
            className="font-body text-xs uppercase tracking-widest bg-gray-900 text-white px-8 py-4 hover:bg-gold hover:text-gray-900 transition-all"
          >
            Continuar a Explorar
          </Link>
          <Link
            href="/"
            className="font-body text-xs uppercase tracking-widest border border-gray-900 text-gray-900 px-8 py-4 hover:bg-gray-900 hover:text-white transition-all"
          >
            Voltar à Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
