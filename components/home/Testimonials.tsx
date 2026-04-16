'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'Comprei o pack The Connoisseur para mim próprio há três meses. Agora não consigo usar outra coisa. O fil d\'Écosse é uma revelação.',
    name: 'Ricardo M.',
    title: 'Lisboa',
  },
  {
    quote:
      'Dei as Silk Essential ao meu marido no Natal. Ele disse que foram o melhor presente que alguma vez recebeu. E ele não é pessoa de dizer essas coisas.',
    name: 'Ana S.',
    title: 'Porto',
  },
  {
    quote:
      'Uso fato todos os dias. As meias eram sempre o elo mais fraco. Com a Lion Socks, esse problema desapareceu. Uso as Merino Executive desde setembro.',
    name: 'João P.',
    title: 'Braga',
  },
]

export default function Testimonials() {
  return (
    <section style={{ background: '#FAF7F2', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <p
            className="font-body uppercase mb-3"
            style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#B8960C' }}
          >
            Quem Usa
          </p>
          <h2
            className="font-display text-gray-900"
            style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400 }}
          >
            Palavras de quem sabe
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
              className="relative"
            >
              {/* Large quote mark */}
              <span
                className="block font-display select-none leading-none mb-4"
                style={{
                  fontSize: '120px',
                  color: '#B8960C',
                  opacity: 0.3,
                  lineHeight: 0.8,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;
              </span>

              <blockquote
                className="font-display italic text-gray-700 mb-6 max-w-sm"
                style={{ fontSize: '18px', fontWeight: 400, lineHeight: 1.6 }}
              >
                {t.quote}
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="h-px w-6" style={{ background: 'rgba(184,150,12,0.5)' }} />
                <div>
                  <p
                    className="font-body uppercase text-gray-900"
                    style={{ fontSize: '12px', letterSpacing: '0.1em', fontWeight: 500 }}
                  >
                    {t.name}
                  </p>
                  <p className="font-body text-gray-400" style={{ fontSize: '12px' }}>
                    {t.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
