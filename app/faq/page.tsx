'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Qual é o prazo de entrega?',
    a: '1–3 dias úteis para Portugal Continental. 3–5 dias para Ilhas. 5–7 dias para Europa.',
  },
  {
    q: 'Posso devolver se não gostar?',
    a: 'Sim. Devoluções gratuitas no prazo de 30 dias. O produto deve estar não usado e na embalagem original.',
  },
  {
    q: 'Como escolho o tamanho certo?',
    a: 'Consulte o nosso Guia de Tamanhos. Se estiver entre dois tamanhos, recomendamos o maior.',
  },
  {
    q: 'Os materiais são sustentáveis?',
    a: 'Utilizamos fibras naturais de alta qualidade — algodão egípcio, lã merino e seda. A produção é 100% portuguesa, reduzindo a pegada de transporte.',
  },
  {
    q: 'Como devo lavar as meias?',
    a: 'Lavagem a 30°C em programa delicado. Não usar lixívia. Secar na horizontal. Para meias de seda, recomendamos lavagem à mão.',
  },
  {
    q: 'Fazem preços para empresas ou eventos?',
    a: 'Sim! Contacte-nos em info@lionsocks.pt para encomendas corporativas, presentes de empresa ou eventos.',
  },
  {
    q: 'Os packs podem ser personalizados?',
    a: 'Os packs pré-definidos têm composição fixa. Em breve, lançaremos a opção Build Your Own para criar o seu pack personalizado.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid #2A2A2A' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-body pr-4" style={{ fontSize: '15px', fontWeight: 400, color: '#F5F3EE' }}>
          {q}
        </span>
        <span
          className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', fontSize: '20px', color: '#B8960C' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0' }}
      >
        <p className="font-body pb-5" style={{ fontSize: '14px', lineHeight: 1.7, color: '#CCCCCC' }}>
          {a}
        </p>
      </div>
    </div>
  )
}

export default function FaqPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="font-body uppercase mb-3" style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 500 }}>
            Suporte
          </p>
          <h1 className="font-display text-4xl mb-4" style={{ color: '#F5F3EE' }}>Perguntas Frequentes</h1>
        </div>

        <div>
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </div>
  )
}
