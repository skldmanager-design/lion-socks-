import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Devoluções',
  description: 'Política de devoluções Lion Socks — 30 dias para devoluções gratuitas.',
}

export default function DevolucoesPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="font-body uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 500 }}>
            Garantia
          </p>
          <h1 className="font-display text-4xl mb-4" style={{ color: '#F5F3EE' }}>Política de Devoluções</h1>
          <p className="font-body text-sm" style={{ color: '#999' }}>30 dias para mudar de ideias.</p>
        </div>

        <div className="space-y-10 font-body text-sm leading-relaxed" style={{ color: '#CCCCCC' }}>
          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#F5F3EE' }}>Prazo</h2>
            <p>Aceitamos devoluções até 30 dias após a entrega da encomenda. O prazo começa a contar na data em que a transportadora confirma a entrega.</p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#F5F3EE' }}>Condições</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>O produto deve estar <strong style={{ color: '#F5F3EE' }}>não usado</strong>, com todas as etiquetas originais.</li>
              <li>A embalagem original deve estar intacta.</li>
              <li>Por razões de higiene, meias fora da embalagem não são aceites para devolução.</li>
              <li>Produtos personalizados não são devolvíveis.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#F5F3EE' }}>Como devolver</h2>
            <ol className="space-y-2 list-decimal pl-5">
              <li>Envie um email para <a href="mailto:devolucoes@lionsocks.pt" style={{ color: '#B8960C' }} className="underline underline-offset-2">devolucoes@lionsocks.pt</a> com o número da encomenda.</li>
              <li>Receberá uma etiqueta de devolução pré-paga por email em 24h úteis.</li>
              <li>Embale os produtos na embalagem original.</li>
              <li>Entregue nos CTT com a etiqueta colada.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#F5F3EE' }}>Reembolso</h2>
            <p>O reembolso é processado no prazo de 5 dias úteis após a receção e inspeção do produto. O valor é creditado no método de pagamento original. Portugal Continental: sem custo. Ilhas e internacional: €5 de portes.</p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#F5F3EE' }}>Trocas</h2>
            <p>Para trocar por outro tamanho ou cor, o processo é o mesmo: envia o email, indicas o que queres receber em troca. Não cobramos portes adicionais em trocas.</p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3" style={{ color: '#F5F3EE' }}>Defeito de fabrico</h2>
            <p>Se receber um produto com defeito, contacte-nos imediatamente em <a href="mailto:info@lionsocks.pt" style={{ color: '#B8960C' }} className="underline underline-offset-2">info@lionsocks.pt</a>. Substituímos sem custos adicionais.</p>
          </section>
        </div>

        <div className="mt-16 p-6 rounded" style={{ border: '1px solid #2A2A2A', background: '#0F0F0F' }}>
          <p className="font-body text-sm mb-3" style={{ color: '#CCCCCC' }}>
            <strong style={{ color: '#F5F3EE' }}>Livro de Reclamações:</strong> Está disponível em formato físico nos nossos escritórios e em formato electrónico em{' '}
            <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" style={{ color: '#B8960C' }} className="underline underline-offset-2">
              livroreclamacoes.pt
            </a>.
          </p>
          <p className="font-body text-xs" style={{ color: '#999' }}>
            Em caso de litígio, pode recorrer ao Centro Nacional de Informação e Arbitragem de Conflitos de Consumo (CNIACC) ou à plataforma europeia ODR: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" style={{ color: '#B8960C' }} className="underline underline-offset-2">ec.europa.eu/consumers/odr</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
