import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guia de Materiais',
  description:
    'Cinco materiais, quatro critérios. Compara Ribeira, Ofício, Lello, Reserva e Alma por calor, durabilidade, espessura e toque.',
}

type Criterion = 'calor' | 'durabilidade' | 'espessura' | 'toque'

interface FamilyRow {
  slug: string
  family: string
  material: string
  scores: Record<Criterion, number>
  tagline: string
}

const rows: FamilyRow[] = [
  { slug: 'ribeira', family: 'Ribeira', material: 'Merino',          scores: { calor: 4, durabilidade: 3, espessura: 3, toque: 4 }, tagline: 'A fibra que se adapta.' },
  { slug: 'oficio',  family: 'Ofício',  material: 'Fio de Escócia',  scores: { calor: 2, durabilidade: 5, espessura: 2, toque: 4 }, tagline: 'Algodão transformado pelo fogo.' },
  { slug: 'lello',   family: 'Lello',   material: 'Seda',            scores: { calor: 1, durabilidade: 2, espessura: 1, toque: 5 }, tagline: 'O toque que desliza.' },
  { slug: 'reserva', family: 'Reserva', material: 'Cashmere',        scores: { calor: 5, durabilidade: 2, espessura: 3, toque: 5 }, tagline: 'A fibra mais fina do mundo.' },
  { slug: 'alma',    family: 'Alma',    material: 'Algodão Penteado',scores: { calor: 2, durabilidade: 4, espessura: 2, toque: 3 }, tagline: 'A base honesta.' },
]

const criteria: { key: Criterion; label: string }[] = [
  { key: 'calor',        label: 'Calor' },
  { key: 'durabilidade', label: 'Durabilidade' },
  { key: 'espessura',    label: 'Espessura' },
  { key: 'toque',        label: 'Toque' },
]

const recommendations = [
  { context: 'Escritório',       pick: 'Ofício',  reason: 'Fresco, durável, brilho discreto para o fato.' },
  { context: 'Dias de frio',     pick: 'Ribeira', reason: 'Termorreguladora. Quente sem ser grossa.' },
  { context: 'Ocasião especial', pick: 'Lello',   reason: 'Seda. Para os momentos que merecem.' },
  { context: 'Dia-a-dia',        pick: 'Alma',    reason: 'Honesta, resistente, sem dramas.' },
  { context: 'Para oferecer',    pick: 'Reserva', reason: 'Cashmere. Sente-se à primeira.' },
]

function Dots({ score }: { score: number }) {
  return (
    <div className="flex gap-1" aria-label={`${score} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: i <= score ? '#B8960C' : 'rgba(184,150,12,0.18)',
            display: 'inline-block',
          }}
        />
      ))}
    </div>
  )
}

export default function GuidePage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }} className="pb-20 lg:pb-28">
      {/* Hero */}
      <section style={{ padding: '96px 0 56px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p
            className="font-body uppercase mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 500 }}
          >
            Guia de Materiais
          </p>
          <h1
            className="font-display mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#F5F3EE', lineHeight: 1.15, fontWeight: 400 }}
          >
            Cinco materiais. Uma escolha.
          </h1>
          <p className="font-body" style={{ fontSize: '16px', color: '#CCCCCC', lineHeight: 1.7 }}>
            Compara as cinco famílias por calor, durabilidade, espessura e toque. Encontra o par certo para o uso certo.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              border: '1px solid #2A2A2A',
              borderRadius: '6px',
              overflow: 'hidden',
              background: '#0F0F0F',
            }}
          >
            {/* Header row */}
            <div
              className="hidden md:grid"
              style={{
                gridTemplateColumns: '1.6fr repeat(4, 1fr)',
                padding: '20px 24px',
                borderBottom: '1px solid #2A2A2A',
                background: '#121212',
              }}
            >
              <span
                className="font-body uppercase"
                style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#B8960C', fontWeight: 500 }}
              >
                Família
              </span>
              {criteria.map((c) => (
                <span
                  key={c.key}
                  className="font-body uppercase"
                  style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#B8960C', fontWeight: 500 }}
                >
                  {c.label}
                </span>
              ))}
            </div>

            {/* Data rows */}
            {rows.map((r) => (
              <Link
                key={r.slug}
                href={`/colecoes/${r.slug}`}
                className="block"
                style={{ borderBottom: '1px solid #2A2A2A', textDecoration: 'none' }}
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-[1.6fr_repeat(4,1fr)] gap-4 md:gap-0 items-center"
                  style={{ padding: '22px 24px', transition: 'background 200ms ease' }}
                >
                  <div>
                    <p
                      className="font-display"
                      style={{ fontSize: '20px', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.2 }}
                    >
                      {r.family}
                    </p>
                    <p
                      className="font-body uppercase mt-1"
                      style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#B8960C', fontWeight: 500 }}
                    >
                      {r.material}
                    </p>
                    <p
                      className="font-body mt-2"
                      style={{ fontSize: '13px', color: '#999', lineHeight: 1.6, fontWeight: 300 }}
                    >
                      {r.tagline}
                    </p>
                  </div>
                  {criteria.map((c) => (
                    <div key={c.key} className="flex md:block items-center justify-between">
                      <span
                        className="md:hidden font-body uppercase"
                        style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#999', fontWeight: 500 }}
                      >
                        {c.label}
                      </span>
                      <Dots score={r.scores[c.key]} />
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section style={{ padding: '80px 0 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div className="text-center mb-10">
            <p
              className="font-body uppercase mb-3"
              style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 500 }}
            >
              Recomendações
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(26px, 3vw, 34px)', color: '#F5F3EE', fontWeight: 400 }}>
              Para cada contexto, uma escolha.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '12px' }}>
            {recommendations.map((rec) => (
              <div
                key={rec.context}
                style={{
                  padding: '24px',
                  background: '#0F0F0F',
                  border: '1px solid #2A2A2A',
                  borderRadius: '4px',
                }}
              >
                <p
                  className="font-body uppercase mb-2"
                  style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#999', fontWeight: 500 }}
                >
                  {rec.context}
                </p>
                <p className="font-display mb-2" style={{ fontSize: '22px', color: '#B8960C', fontWeight: 400 }}>
                  {rec.pick}
                </p>
                <p className="font-body" style={{ fontSize: '13px', color: '#CCC', lineHeight: 1.6, fontWeight: 300 }}>
                  {rec.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
