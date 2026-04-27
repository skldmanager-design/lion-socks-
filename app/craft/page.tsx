import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'O Nosso Processo',
  description:
    'Como fazemos as nossas meias. 200 agulhas, fio mercerizado, biqueira hand-linked, controlo par a par. Sem atalhos.',
}

const blocks = [
  {
    eyebrow: 'Máquinas de precisão',
    title: '200 agulhas. Fine-gauge.',
    body: [
      'Tricotamos em máquinas circulares de 200 agulhas — calibre fino, o dobro das máquinas comuns. Mais agulhas por polegada significa malha mais densa, textura mais definida, fio mais fino. Uma meia mais leve que se comporta como uma mais grossa.',
      'É também o que permite padrões intrincados como o pin dot e o herringbone sem ficarem pesados ou distorcidos. O padrão mantém-se nítido; a meia mantém-se subtil.',
    ],
  },
  {
    eyebrow: 'Mercerização',
    title: 'Algodão transformado pela chama.',
    body: [
      'Processo desenvolvido por John Mercer em 1844, em Lancashire. Mergulha-se o fio de algodão egípcio de fibra extra-longa (33mm+) numa solução alcalina sob tensão. A fibra incha, torna-se redonda e a superfície reflecte a luz como um prisma.',
      'Resultado: brilho subtil que não se confunde com sintético, cores mais profundas, fibra 50% mais resistente, zero pilling. A meia envelhece bem em vez de se degradar.',
    ],
  },
  {
    eyebrow: 'Biqueira hand-linked',
    title: 'Costura invisível.',
    body: [
      '90% das meias no mercado usam biqueira Rosso — uma costura industrial que deixa um calombo visível e palpável na ponta do pé. Confortável não é.',
      'Nós fazemos hand-linking: a biqueira é fechada à mão, fio a fio, por um operador especializado. A costura é plana, invisível contra a pele. Demora mais, custa mais, mas é a diferença entre uma meia que sentes nos dedos e uma meia que esqueces.',
    ],
  },
  {
    eyebrow: 'Controlo de qualidade',
    title: 'Par a par.',
    body: [
      'Cada par passa por inspecção individual antes de sair da fábrica: tensão uniforme, consistência de cor, integridade da costura, elasticidade do punho. O que não cumprir é retirado.',
      'Não é automático — é feito por pessoas que sabem o que procuram porque fazem isto há anos. O par que recebes é o par que aprovaram.',
    ],
  },
]

export default function CraftPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }} className="pb-20 lg:pb-28">
      {/* Hero */}
      <section style={{ padding: '120px 0 80px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p
            className="font-body uppercase mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 500 }}
          >
            O Nosso Processo
          </p>
          <h1
            className="font-display mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: '#F5F3EE', lineHeight: 1.1, fontWeight: 400 }}
          >
            Como fazemos as nossas meias.
          </h1>
          <p
            className="font-body italic"
            style={{ fontSize: 'clamp(16px, 1.6vw, 19px)', color: '#E8E5DF', lineHeight: 1.7, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sem atalhos. Sem compromissos.
          </p>
        </div>
      </section>

      {/* Blocks */}
      <section>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          {blocks.map((b, i) => (
            <article
              key={b.title}
              style={{
                padding: '64px 0',
                borderTop: i === 0 ? '1px solid rgba(184,150,12,0.15)' : 'none',
                borderBottom: '1px solid rgba(184,150,12,0.15)',
              }}
            >
              <p
                className="font-body uppercase mb-4"
                style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 500 }}
              >
                {b.eyebrow}
              </p>
              <h2
                className="font-display mb-8"
                style={{ fontSize: 'clamp(28px, 3.2vw, 40px)', color: '#F5F3EE', lineHeight: 1.2, fontWeight: 400 }}
              >
                {b.title}
              </h2>
              <div className="space-y-5">
                {b.body.map((p, j) => (
                  <p
                    key={j}
                    className="font-body"
                    style={{ fontSize: '16px', color: '#CCCCCC', lineHeight: 1.8, fontWeight: 300 }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0 0' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2
            className="font-display mb-6"
            style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: '#F5F3EE', lineHeight: 1.3, fontWeight: 400 }}
          >
            Toda meia Lion Socks passa por estes quatro passos.
          </h2>
          <p className="font-body mb-8" style={{ fontSize: '14px', color: '#999', lineHeight: 1.8 }}>
            É por isto que o preço é o que é. É por isto que o par dura.
          </p>
          <Link
            href="/loja"
            className="inline-block font-body uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.15em',
              color: '#B8960C',
              border: '1px solid #B8960C',
              padding: '16px 36px',
              borderRadius: '4px',
            }}
          >
            Descobrir a colecção →
          </Link>
        </div>
      </section>
    </div>
  )
}
