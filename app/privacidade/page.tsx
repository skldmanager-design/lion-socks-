import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade da Lion Socks.',
}

export default function PrivacidadePage() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl text-gray-900 mb-4">Política de Privacidade</h1>
          <p className="font-body text-xs text-gray-400">Última atualização: Abril 2026</p>
        </div>

        <div className="font-body text-sm text-gray-600 leading-relaxed space-y-6">
          <section>
            <h2 className="font-display text-lg text-gray-900 mb-3">Recolha de Dados</h2>
            <p>Recolhemos apenas os dados necessários para processar as suas encomendas: nome, email, morada de entrega e dados de pagamento. Os dados de pagamento são processados de forma segura através do nosso parceiro de pagamentos e nunca são armazenados nos nossos servidores.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-gray-900 mb-3">Utilização dos Dados</h2>
            <p>Os seus dados são utilizados exclusivamente para: processar encomendas, comunicar o estado da entrega, e — caso tenha subscrito — enviar a nossa newsletter. Não partilhamos dados com terceiros para fins de marketing.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-gray-900 mb-3">Cookies</h2>
            <p>Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para compreender como os visitantes utilizam o site. Pode gerir as suas preferências de cookies a qualquer momento.</p>
          </section>

          <section>
            <h2 className="font-display text-lg text-gray-900 mb-3">Os Seus Direitos</h2>
            <p>Tem o direito de aceder, corrigir ou eliminar os seus dados pessoais a qualquer momento. Para exercer estes direitos, contacte-nos através de info@lionsocks.pt.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
