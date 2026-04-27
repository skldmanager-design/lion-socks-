import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos & Condições',
  description: 'Termos e condições de utilização Lion Socks.',
}

export default function TermosPage() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl text-gray-900 mb-4">Termos & Condições</h1>
          <p className="font-body text-xs text-gray-400">Última atualização: Abril 2026</p>
        </div>

        <div className="space-y-8 font-body text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-display text-xl text-gray-900 mb-3">1. Aceitação</h2>
            <p>Ao aceder e utilizar o site lionsocks.com, aceita os presentes Termos e Condições. Se não concordar, pedimos que não utilize o site.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-gray-900 mb-3">2. Encomendas e Pagamento</h2>
            <p>Todas as encomendas estão sujeitas a disponibilidade. Os preços incluem IVA à taxa legal em vigor. O pagamento é processado de forma segura através do Stripe. A Lion Socks reserva-se o direito de recusar qualquer encomenda em caso de suspeita de fraude.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-gray-900 mb-3">3. Envio</h2>
            <p>Os prazos de envio são indicativos e contam-se a partir da confirmação de pagamento. Portes grátis para encomendas acima de €49 em Portugal Continental. Para outros destinos consulte a <a href="/envios" className="text-gold underline underline-offset-2">política de envios</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-gray-900 mb-3">4. Devoluções</h2>
            <p>Aceitamos devoluções no prazo de 30 dias desde a receção. Ver <a href="/devolucoes" className="text-gold underline underline-offset-2">política de devoluções</a> para condições detalhadas.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-gray-900 mb-3">5. Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site — textos, imagens, logótipo, marca Lion Socks — é propriedade exclusiva da Valsport, Lda e está protegido por direitos de autor.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-gray-900 mb-3">6. Resolução de Litígios</h2>
            <p>Em caso de litígio, o cliente pode recorrer ao Centro Nacional de Informação e Arbitragem de Conflitos de Consumo (CNIACC) ou à plataforma europeia ODR em <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2">ec.europa.eu/consumers/odr</a>. Livro de Reclamações disponível em <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-2">livroreclamacoes.pt</a>.</p>
          </section>

          <section>
            <h2 className="font-display text-xl text-gray-900 mb-3">7. Contacto</h2>
            {/* TODO pré-launch: substituir NIF placeholder e morada pelos dados reais Valsport, Lda */}
            <p>Valsport, Lda · NIF [POR PREENCHER] · [Morada por preencher] · <a href="mailto:info@lionsocks.com" className="text-gold underline underline-offset-2">info@lionsocks.com</a></p>
          </section>
        </div>
      </div>
    </div>
  )
}
