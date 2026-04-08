import type { Metadata } from 'next'
import { getFeaturedBundles } from '@/lib/mock-data'
import PackCard from '@/components/packs/PackCard'
import BuildYourBox from '@/components/packs/BuildYourBox'

export const metadata: Metadata = {
  title: 'Packs',
  description:
    'Packs de meias premium Lion Socks em embalagem exclusiva. Escolha um pack curado ou monte a sua própria caixa com desconto até 19%.',
}

export default function PacksPage() {
  const bundles = getFeaturedBundles()

  return (
    <div>
      {/* Hero */}
      <div
        className="flex items-center justify-center text-center"
        style={{
          background: '#0a0a0a',
          paddingTop: '60px',
          paddingBottom: '80px',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <div className="max-w-2xl">
          <p
            className="font-body uppercase mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#B8960C', fontWeight: 400 }}
          >
            EMBALAGEM PREMIUM
          </p>
          <h1
            className="font-display text-white mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400 }}
          >
            Packs & Coleções
          </h1>
          <p
            className="font-body mx-auto"
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '480px',
              lineHeight: 1.8,
            }}
          >
            A experiência começa antes de abrir a caixa. Packs fixos com curadoria da equipa Lion Socks,
            ou monte a sua própria caixa com os pares que mais gosta — sempre com desconto.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-20 lg:pb-28">
        {/* Fixed packs */}
        <section className="mb-20 lg:mb-28 pt-16 lg:pt-20">
          <div className="flex items-baseline gap-3 mb-8">
            <h2 className="font-display text-gray-900" style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 400 }}>
              Packs Curados
            </h2>
            <p className="font-body text-gray-400" style={{ fontSize: '14px', fontWeight: 300 }}>
              Seleccionados pela equipa
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bundles.map((bundle) => (
              <PackCard key={bundle.id} bundle={bundle} featured />
            ))}
          </div>
        </section>

        {/* What's inside the box */}
        <section
          className="mb-20 lg:mb-28 py-12 lg:py-16 px-6 lg:px-12"
          style={{ background: '#FAF7F2' }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="font-body uppercase mb-3"
              style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#B8960C' }}
            >
              A Embalagem
            </p>
            <h2
              className="font-display text-gray-900 mb-6"
              style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 400 }}
            >
              A experiência começa antes de abrir
            </h2>
            <p
              className="font-body text-gray-600 mb-10 leading-relaxed mx-auto"
              style={{ fontSize: '15px', fontWeight: 300, maxWidth: '560px', lineHeight: 1.8 }}
            >
              Cada pack chega numa embalagem premium desenhada para Lion Socks.
              Os packs de 3 e 5 vêm em caixa de metal com logo embossed.
              A colecção de 12 vem em caixa gaveta de luxo com espuma recortada à medida.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                {
                  title: 'Caixa de Metal',
                  desc: 'Para packs de 3 e 5 pares. Fecho magnético, logo embossed, forro em veludo. Reutilizável.',
                  packs: '3 e 5 pares',
                },
                {
                  title: 'Caixa Gaveta',
                  desc: 'Para a colecção de 12. Caixa de cartão rígido premium com gaveta deslizante e espuma recortada.',
                  packs: '12 pares',
                },
              ].map((item) => (
                <div key={item.title} className="bg-white p-5" style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                  <p
                    className="font-body uppercase mb-1"
                    style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#9E9E9E' }}
                  >
                    {item.packs}
                  </p>
                  <h3 className="font-body text-gray-900 mb-2" style={{ fontSize: '15px', fontWeight: 400 }}>
                    {item.title}
                  </h3>
                  <p
                    className="font-body text-gray-500 leading-relaxed"
                    style={{ fontSize: '13px', fontWeight: 300 }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Build Your Box */}
        <section id="build-your-box">
          <div className="flex items-baseline gap-3 mb-8">
            <h2 className="font-display text-gray-900" style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 400 }}>
              Monta a Tua Caixa
            </h2>
            <p className="font-body text-gray-400" style={{ fontSize: '14px', fontWeight: 300 }}>
              Escolhe os teus pares
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-2">
              <BuildYourBox />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-5">
                <div className="p-5" style={{ background: '#f5f5f5' }}>
                  <p
                    className="font-body uppercase mb-3"
                    style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#9E9E9E' }}
                  >
                    Como funciona
                  </p>
                  <ol className="space-y-3">
                    {[
                      'Escolhe o tamanho da caixa (3, 5 ou 12 pares)',
                      'Selecciona os pares que queres incluir',
                      'Escolhe o teu tamanho',
                      'Adiciona ao carrinho com desconto aplicado',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 font-body text-gray-700" style={{ fontSize: '13px', fontWeight: 300 }}>
                        <span
                          className="flex items-center justify-center flex-shrink-0 rounded-full font-body"
                          style={{
                            height: '20px',
                            width: '20px',
                            background: '#B8960C',
                            color: '#ffffff',
                            fontSize: '10px',
                            fontWeight: 500,
                            marginTop: '2px',
                          }}
                        >
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-5" style={{ background: '#0a0a0a' }}>
                  <p
                    className="font-body uppercase mb-3"
                    style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#B8960C' }}
                  >
                    Descontos disponíveis
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: 'Caixa de 3 pares', discount: '10%' },
                      { label: 'Caixa de 5 pares', discount: '12%' },
                      { label: 'Gaveta de 12 pares', discount: '17%' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="font-body" style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.7)' }}>
                          {item.label}
                        </span>
                        <span className="font-body" style={{ fontSize: '13px', fontWeight: 400, color: '#B8960C' }}>
                          {item.discount} off
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
