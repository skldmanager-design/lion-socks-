import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Envios & Devoluções',
  description: 'Informações sobre envios e devoluções Lion Socks.',
}

export default function EnviosPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="font-body uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 500 }}>
            Informação
          </p>
          <h1 className="font-display text-4xl mb-4" style={{ color: '#F5F3EE' }}>Envios & Devoluções</h1>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="font-display text-xl mb-4" style={{ color: '#F5F3EE' }}>Envios</h2>
            <div className="font-body text-sm leading-relaxed space-y-3" style={{ color: '#CCCCCC' }}>
              <p>Envio gratuito em compras acima de €49 para Portugal Continental.</p>
              <p>Para encomendas abaixo de €49, o custo de envio é de €3,50.</p>
              <p>Prazo de entrega: 1–3 dias úteis para Portugal Continental.</p>
              <p>Ilhas (Açores e Madeira): 3–5 dias úteis, custo de envio de €5,00.</p>
              <p>Europa: 5–7 dias úteis, custo calculado no checkout.</p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4" style={{ color: '#F5F3EE' }}>Devoluções</h2>
            <div className="font-body text-sm leading-relaxed space-y-3" style={{ color: '#CCCCCC' }}>
              <p>Devoluções gratuitas no prazo de 30 dias a contar da data de entrega.</p>
              <p>O produto deve estar não usado, na embalagem original e com todas as etiquetas.</p>
              <p>Para iniciar uma devolução, contacte-nos através do email info@lionsocks.pt.</p>
              <p>O reembolso é processado no prazo de 5 dias úteis após receção do produto.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
