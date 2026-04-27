'use client'

const quotes = [
  {
    quote: 'Comprei o pack The Connoisseur para mim próprio. Agora não consigo usar outra coisa. O fio de escócia é uma revelação.',
    name: 'Ricardo M.',
    context: 'Lisboa',
  },
  {
    quote: 'Dei o Lello Essential ao meu marido no Natal. Disse que foi o melhor presente que alguma vez recebeu.',
    name: 'Ana S.',
    context: 'Porto',
  },
  {
    quote: 'Uso fato todos os dias. As meias eram sempre o elo mais fraco. Com a Lion Socks, esse problema desapareceu.',
    name: 'João P.',
    context: 'Braga',
  },
]

export default function Testimonials() {
  return (
    <section style={{ background: '#0A0A0A', padding: 'clamp(48px, 7vw, 80px) 0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <p
          className="text-center font-body uppercase mb-14"
          style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            color: '#B8960C',
            fontWeight: 500,
          }}
        >
          Em voz de quem as usa
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '48px' }}>
          {quotes.map((q) => (
            <figure key={q.name} className="text-center">
              {/* Opening mark */}
              <div
                aria-hidden
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '56px',
                  lineHeight: 0.4,
                  color: '#B8960C',
                  marginBottom: '16px',
                  fontStyle: 'italic',
                  opacity: 0.6,
                }}
              >
                “
              </div>

              <blockquote
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(16px, 1.5vw, 18px)',
                  color: '#E8E5DF',
                  lineHeight: 1.65,
                  marginBottom: '20px',
                  fontWeight: 400,
                }}
              >
                {q.quote}
              </blockquote>

              <figcaption
                className="font-body uppercase"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  color: 'rgba(245,243,238,0.55)',
                  fontWeight: 500,
                }}
              >
                {q.name} · {q.context}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
