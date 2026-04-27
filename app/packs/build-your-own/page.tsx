import type { Metadata } from 'next'
import BuildYourBox from '@/components/packs/BuildYourBox'

export const metadata: Metadata = {
  title: 'Build Your Own Box',
  description: 'Monte o seu pack personalizado de meias Lion Socks e poupe até 17%.',
}

export default function BuildYourOwnPage() {
  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10">
          <p className="text-gold text-[12px] tracking-[0.15em] uppercase font-body mb-3">
            Personalizado
          </p>
          <h1 className="font-display text-4xl lg:text-5xl text-gray-900 mb-4">
            Build Your Own Box
          </h1>
          <p className="text-gray-500 font-body text-sm leading-relaxed max-w-xl mx-auto">
            Escolha os seus pares favoritos e receba numa embalagem premium.
            Quanto mais pares, maior o desconto.
          </p>
        </div>
        <BuildYourBox />
      </div>
    </div>
  )
}
