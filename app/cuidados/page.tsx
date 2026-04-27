import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Guia de Cuidados',
  description:
    'Como lavar e preservar as suas meias Lion Socks. Instruções por material — do merino ao cashmere.',
}

interface CareEntry {
  slug: string
  family: string
  material: string
  rules: string[]
}

const generalRules = [
  'Lavar a 30°C com detergente suave.',
  'Centrifugação até 800rpm — menos é melhor.',
  'Não usar lixívia. Não passar a ferro.',
  'Dobrar, não pendurar. Guardar em gaveta arejada.',
]

const entries: CareEntry[] = [
  {
    slug: 'ribeira',
    family: 'Ribeira',
    material: 'Merino',
    rules: [
      'Máquina até 40°C em ciclo delicado.',
      'Detergente próprio para lã (sem enzimas).',
      'Não secar em máquina — secar na horizontal.',
      'Anti-odor natural: raramente precisa de lavagem frequente.',
    ],
  },
  {
    slug: 'oficio',
    family: 'Ofício',
    material: 'Fio de Escócia',
    rules: [
      'Máquina 30°C, ciclo normal.',
      'Cores profundas mantêm-se após muitas lavagens.',
      'Resistente a pilling — não forma borbotos.',
      'Ferro a baixa temperatura se necessário (pelo avesso).',
    ],
  },
  {
    slug: 'lello',
    family: 'Lello',
    material: 'Seda',
    rules: [
      'Lavagem à mão em água fria — preferencial.',
      'Ou ciclo frio delicado, dentro de saco de rede.',
      'Centrifugação mínima ou nenhuma.',
      'Secar à sombra, nunca em secador.',
    ],
  },
  {
    slug: 'reserva',
    family: 'Reserva',
    material: 'Cashmere',
    rules: [
      'Lavagem à mão com detergente específico para cashmere.',
      'Ou ciclo frio delicado, sem centrifugação.',
      'Secar na horizontal, afastada de luz directa.',
      'Anti-odor natural — arejar entre usos em vez de lavar.',
    ],
  },
  {
    slug: 'alma',
    family: 'Alma',
    material: 'Algodão Penteado',
    rules: [
      'Máquina 30–40°C, ciclo normal.',
      'A mais resistente da gama — aguenta uso intensivo.',
      'Não encolhe, não deforma.',
      'Ferro a temperatura média se necessário.',
    ],
  },
]

export default function CuidadosPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }} className="pb-20 lg:pb-28">
      {/* Hero */}
      <section style={{ padding: '96px 0 56px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p
            className="font-body uppercase mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 500 }}
          >
            Guia de Cuidados
          </p>
          <h1
            className="font-display mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#F5F3EE', lineHeight: 1.15, fontWeight: 400 }}
          >
            Como preservar um bom par.
          </h1>
          <p className="font-body" style={{ fontSize: '16px', color: '#CCCCCC', lineHeight: 1.7 }}>
            Uma meia bem cuidada dura o dobro. Regras gerais primeiro, detalhes por material a seguir.
          </p>
        </div>
      </section>

      {/* General rules */}
      <section style={{ padding: '0 0 48px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              background: '#0F0F0F',
              border: '1px solid #2A2A2A',
              borderRadius: '6px',
              padding: '32px',
            }}
          >
            <p
              className="font-body uppercase mb-5"
              style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#B8960C', fontWeight: 500 }}
            >
              Regra geral
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-3">
              {generalRules.map((r) => (
                <li
                  key={r}
                  className="font-body flex items-start gap-3"
                  style={{ fontSize: '15px', color: '#E8E5DF', lineHeight: 1.6, fontWeight: 300 }}
                >
                  <span style={{ color: '#B8960C', flexShrink: 0, marginTop: '2px' }}>·</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Per-family */}
      <section>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
          <div className="space-y-3">
            {entries.map((e) => (
              <article
                key={e.slug}
                style={{
                  background: '#0F0F0F',
                  border: '1px solid #2A2A2A',
                  borderRadius: '6px',
                  padding: '32px',
                }}
              >
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-5">
                  <div>
                    <h2 className="font-display" style={{ fontSize: '26px', color: '#F5F3EE', fontWeight: 400, lineHeight: 1.2 }}>
                      {e.family}
                    </h2>
                    <p
                      className="font-body uppercase mt-1"
                      style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#B8960C', fontWeight: 500 }}
                    >
                      {e.material}
                    </p>
                  </div>
                  <Link
                    href={`/colecoes/${e.slug}`}
                    className="font-body"
                    style={{ fontSize: '12px', color: '#B8960C', textDecoration: 'none' }}
                  >
                    Ver colecção →
                  </Link>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-2">
                  {e.rules.map((r) => (
                    <li
                      key={r}
                      className="font-body flex items-start gap-3"
                      style={{ fontSize: '14px', color: '#CCC', lineHeight: 1.6, fontWeight: 300 }}
                    >
                      <span style={{ color: '#B8960C', flexShrink: 0, marginTop: '1px' }}>·</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
