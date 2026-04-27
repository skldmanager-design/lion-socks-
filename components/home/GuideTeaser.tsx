const families = [
  { family: 'Ribeira',  material: 'Merino',            scores: [4, 3, 3, 4] },
  { family: 'Ofício',   material: 'Fio de Escócia',    scores: [2, 5, 2, 4] },
  { family: 'Lello',    material: 'Seda',              scores: [1, 2, 1, 5] },
  { family: 'Reserva',  material: 'Cashmere',          scores: [5, 2, 3, 5] },
  { family: 'Alma',     material: 'Algodão Penteado',  scores: [2, 4, 2, 3] },
]
const criteria = ['Calor', 'Durabilidade', 'Espessura', 'Toque']

export default function GuideTeaser() {
  return (
    <section style={{ background: '#F5F3EE', padding: 'clamp(48px, 7vw, 80px) 0' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 24px' }}>
        <div className="text-center mb-10">
          <p
            className="font-body uppercase mb-3"
            style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#B8960C', fontWeight: 500 }}
          >
            Guia Rápido
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(24px, 3.6vw, 34px)',
              color: '#0A0A0A',
              lineHeight: 1.2,
              fontWeight: 500,
              marginBottom: '10px',
            }}
          >
            Qual é a tua?
          </h2>
          <p className="font-body" style={{ fontSize: '14px', color: '#6B6B6B', lineHeight: 1.7 }}>
            Cinco famílias, quatro critérios. Um vistinho e escolhes certo.
          </p>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E8E5DF', borderRadius: '6px', overflow: 'hidden' }}>
          <div
            className="hidden md:grid"
            style={{
              gridTemplateColumns: '1.6fr repeat(4, 1fr)',
              padding: '16px 24px',
              background: '#F0EDE8',
              borderBottom: '1px solid #E8E5DF',
            }}
          >
            <span className="font-body uppercase" style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#6B6B6B', fontWeight: 500 }}>
              Família
            </span>
            {criteria.map((c) => (
              <span key={c} className="font-body uppercase text-center" style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#6B6B6B', fontWeight: 500 }}>
                {c}
              </span>
            ))}
          </div>

          {families.map((f, i) => (
            <div
              key={f.family}
              className="grid grid-cols-1 md:grid-cols-[1.6fr_repeat(4,1fr)] gap-3 md:gap-0 items-center"
              style={{ padding: '16px 24px', borderBottom: i < families.length - 1 ? '1px solid #E8E5DF' : 'none' }}
            >
              <div>
                <p className="font-display" style={{ fontSize: '18px', color: '#0A0A0A', lineHeight: 1.2, fontWeight: 500 }}>
                  {f.family}
                </p>
                <p className="font-body uppercase" style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#B8960C', fontWeight: 500, marginTop: '2px' }}>
                  {f.material}
                </p>
              </div>
              {f.scores.map((s, j) => (
                <div key={j} className="flex md:justify-center items-center gap-1.5">
                  <span className="md:hidden font-body uppercase" style={{ fontSize: '10px', color: '#6B6B6B', minWidth: '100px' }}>
                    {criteria[j]}
                  </span>
                  <span className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: n <= s ? '#B8960C' : 'rgba(184,150,12,0.18)',
                          display: 'inline-block',
                        }}
                      />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
