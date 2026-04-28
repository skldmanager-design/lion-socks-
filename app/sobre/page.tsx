'use client'

import Image from 'next/image'
import Link from 'next/link'
import PortugalFlag from '@/components/ui/PortugalFlag'
import GuideTeaser from '@/components/home/GuideTeaser'

const families = [
  { slug: 'ribeira', materialHandle: 'la-merino',         icon: '/icons/materiais/ovelha.png',  iconSize: 96,  name: 'Ribeira',  material: 'Merino',           tagline: 'A fibra que se adapta.' },
  { slug: 'oficio',  materialHandle: 'fil-d-ecosse',      icon: '/icons/materiais/algodao.png', iconSize: 96,  name: 'Ofício',   material: 'Fio de Escócia',   tagline: 'Algodão transformado pelo fogo.' },
  { slug: 'lello',   materialHandle: 'seda',              icon: '/icons/materiais/seda.png',    iconSize: 128, name: 'Lello',    material: 'Seda',             tagline: 'O toque que desliza.' },
  { slug: 'reserva', materialHandle: 'cashmere',          icon: '/icons/materiais/ovelha.png',  iconSize: 96,  name: 'Reserva',  material: 'Cashmere',         tagline: 'A fibra mais fina do mundo.' },
  { slug: 'alma',    materialHandle: 'algodao-penteado',  icon: '/icons/materiais/algodao.png', iconSize: 96,  name: 'Alma',     material: 'Algodão Penteado', tagline: 'A base honesta.' },
]

export default function SobrePage() {
  return (
    <>
      {/* ─── Bloco 1: Manifesto (hero) ─────────────────────────────────── */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(56px, 10vw, 120px) 0 clamp(48px, 8vw, 96px)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#B8960C',
              marginBottom: '40px',
            }}
          >
            A NOSSA HISTÓRIA
          </p>

          <blockquote
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 400,
              color: '#F5F3EE',
              lineHeight: 1.3,
              marginBottom: '48px',
            }}
          >
            Não fazemos meias para impressionar.
            Fazemos meias para quem sabe a diferença.
          </blockquote>

          <div
            style={{
              width: '60px',
              height: '1px',
              background: '#B8960C',
              margin: '0 auto 48px',
            }}
          />

          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '16px',
              fontWeight: 300,
              color: '#E8E5DF',
              lineHeight: 1.9,
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            A Lion Socks nasce numa fábrica no Porto — a mesma fábrica, as mesmas máquinas,
            os mesmos mestres que servem marcas que nunca saberás o nome.
            A diferença é que agora, o que fazemos melhor tem a nossa assinatura.
            Uma linha dourada no punho. Fabrico português. Materiais sem compromisso.
            <strong style={{ color: '#F5F3EE', fontWeight: 500 }}> Para quem repara nos detalhes.</strong>
          </p>
        </div>
      </section>

      {/* ─── Bloco 2: A Fábrica ────────────────────────────────────────── */}
      <section style={{ background: '#F5F3EE', padding: 'clamp(48px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — factory image */}
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: '16 / 10',
                borderRadius: '4px',
              }}
            >
              {/* TODO pré-launch: substituir por fotografia real fábrica Sockland Porto */}
              <Image
                src="/home/colecao-classica.jpg"
                alt="Fábrica de meias no Porto — máquinas de 200 agulhas em produção"
                fill

                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle gradient for caption legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0.1) 0%, transparent 40%, rgba(10,10,10,0.55) 100%)',
                }}
              />
              <span
                className="absolute bottom-4 left-4 font-body uppercase"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  color: 'rgba(245,243,238,0.85)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                  fontWeight: 500,
                }}
              >
                Sockland · Porto, Portugal
              </span>
            </div>

            {/* Right — text */}
            <div>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: '#B8960C',
                  marginBottom: '20px',
                }}
              >
                A FÁBRICA
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  fontWeight: 400,
                  color: '#0A0A0A',
                  lineHeight: 1.2,
                  marginBottom: '24px',
                }}
              >
                Uma fábrica no Porto.
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '15px',
                  fontWeight: 300,
                  color: '#424242',
                  lineHeight: 1.9,
                }}
              >
                Máquinas de 200 agulhas. Biqueira hand-linked — sem costura onde mais importa.
                Algodão egípcio mercerizado por chama. Merino australiano extra-fino.
                Cada par passa pelas mãos dos mesmos mestres que há décadas servem as maiores
                marcas europeias. A diferença é que agora, o melhor que sai daqui tem a nossa assinatura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bloco 3: Os Materiais ─────────────────────────────────────── */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(48px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: '#B8960C',
                marginBottom: '20px',
              }}
            >
              OS MATERIAIS
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 400,
                color: '#F5F3EE',
                lineHeight: 1.2,
              }}
            >
              Cinco fibras. Uma exigência.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {families.map((f) => (
              <Link
                key={f.slug}
                href={`/materiais/${f.materialHandle}`}
                className="group block"
                style={{
                  background: '#141414',
                  border: '1px solid #2A2A2A',
                  borderRadius: '4px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#B8960C'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2A2A2A'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div
                  className="flex items-center justify-center mx-auto"
                  style={{ width: '110px', height: '110px', marginBottom: '16px' }}
                >
                  <Image
                    src={f.icon}
                    alt={`${f.name} — ${f.material}`}
                    width={f.iconSize * 2}
                    height={f.iconSize * 2}

                    style={{
                      width: `${f.iconSize}px`,
                      height: `${f.iconSize}px`,
                      filter: 'saturate(1.3) brightness(0.9)',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '22px',
                    fontWeight: 500,
                    color: '#F5F3EE',
                    marginBottom: '4px',
                    transition: 'color 200ms ease',
                  }}
                  className="group-hover:text-[#B8960C]"
                >
                  {f.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: '#B8960C',
                    fontWeight: 500,
                    marginBottom: '14px',
                  }}
                >
                  {f.material}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '13px',
                    fontStyle: 'italic',
                    color: '#999999',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  {f.tagline}
                </p>
                <span
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#B8960C',
                    fontWeight: 500,
                  }}
                >
                  Saber mais →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bloco 4: A Linha Dourada ──────────────────────────────────── */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(48px, 8vw, 96px) 0', borderTop: '1px solid #1A1A1A' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          {/* Decorative golden line */}
          <div
            style={{
              width: '120px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #B8960C 30%, #D4AF37 50%, #B8960C 70%, transparent 100%)',
              margin: '0 auto 32px',
            }}
          />
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#B8960C',
              marginBottom: '20px',
            }}
          >
            A ASSINATURA
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 400,
              color: '#F5F3EE',
              lineHeight: 1.2,
              marginBottom: '32px',
            }}
          >
            A Linha Dourada
          </h2>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '16px',
              fontWeight: 300,
              color: '#E8E5DF',
              lineHeight: 1.9,
              maxWidth: '680px',
              margin: '0 auto 48px',
            }}
          >
            Cada par Lion Socks carrega uma linha dourada no punho. Não é decoração — é assinatura.
            O detalhe que se vê quando a calça sobe, quando cruzas as pernas, quando alguém repara.
            <strong style={{ color: '#F5F3EE', fontWeight: 500 }}> Discreto para quem veste. Inconfundível para quem conhece.</strong>
          </p>

          {/* The signature itself — single decorative gold line */}
          <div
            className="mx-auto"
            style={{
              maxWidth: '420px',
              marginTop: '48px',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent 0%, #B8960C 20%, #D4AF37 50%, #B8960C 80%, transparent 100%)',
            }}
          />
        </div>
      </section>

      {/* ─── Bloco 5.5: Guia Rápido das 5 famílias ────────────────── */}
      <GuideTeaser />

      {/* ─── Bloco 6: Carta do Fundador ──────────────────────────────── */}
      <section style={{ background: '#0A0A0A', padding: 'clamp(48px, 8vw, 96px) 0', borderTop: '1px solid #1A1A1A' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          <p
            className="font-body uppercase mb-6 text-center"
            style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#B8960C', fontWeight: 500 }}
          >
            Uma Nota Pessoal
          </p>

          <blockquote
            className="text-center"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 2vw, 22px)',
              color: '#E8E5DF',
              lineHeight: 1.7,
              fontWeight: 400,
              marginBottom: '28px',
            }}
          >
            A Lion Socks nasce de uma obsessão simples: fazer a melhor meia possível,
            no sítio que já sabe fazê-la há décadas, e pô-la nas mãos de quem repara
            nos detalhes. Não nascemos para competir em preço. Nascemos para durar
            no roupeiro de quem não aceita mediocridade no que toca a pele, ao sapato,
            ao dia inteiro.
          </blockquote>

          <div className="text-center">
            <div
              style={{
                width: '40px',
                height: '1px',
                background: '#B8960C',
                margin: '0 auto 14px',
              }}
            />
            <p
              className="font-body uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#B8960C', fontWeight: 500 }}
            >
              Pedro Gonçalves · Fundador
            </p>
            <p className="font-body" style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
              Porto, Portugal
            </p>
          </div>
        </div>
      </section>

      {/* ─── Bloco 7: Compromisso Feito em Portugal ───────────────────── */}
      <section style={{ background: '#F5F3EE', padding: 'clamp(48px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px' }}>
          <div className="text-center mb-14">
            <p
              className="font-body uppercase mb-4"
              style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#B8960C', fontWeight: 500 }}
            >
              Compromisso
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(28px, 3.6vw, 40px)',
                color: '#0A0A0A',
                lineHeight: 1.2,
                fontWeight: 500,
              }}
            >
              100% Feito em Portugal. Sem excepções.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '40px' }}>
            {[
              {
                title: 'Sem outsourcing',
                body: 'Do fio à caixa, tudo acontece em território nacional. A fábrica fica a poucos quilómetros do Douro. Os materiais chegam directos aos mestres que os trabalham.',
              },
              {
                title: 'Cadeia curta',
                body: 'Zero intermediários entre o fio mercerizado e a sua gaveta. Menos transporte, menos marketing, menos inflação — mais qualidade ao preço certo.',
              },
              {
                title: 'Rastreabilidade',
                body: 'Sabemos o nome de quem cose cada biqueira. Sabemos de onde vem cada novelo. Se há um problema, resolvemo-lo por telefone — não por ticket support.',
              },
            ].map((pillar) => (
              <div key={pillar.title}>
                <div
                  style={{
                    width: '32px',
                    height: '1px',
                    background: '#B8960C',
                    marginBottom: '16px',
                  }}
                />
                <h3
                  className="font-display mb-3"
                  style={{ fontSize: '22px', color: '#0A0A0A', lineHeight: 1.3, fontWeight: 500 }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="font-body"
                  style={{ fontSize: '14px', color: '#424242', lineHeight: 1.8, fontWeight: 300 }}
                >
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bloco FINAL: Made in Portugal ─────────────────────────────── */}
      <section style={{ background: '#F5F3EE', padding: 'clamp(48px, 8vw, 96px) 0' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div
            className="mx-auto mb-8 flex items-center justify-center"
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              border: '1.5px solid #B8960C',
              background: '#FFFFFF',
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <PortugalFlag width={32} height={22} />
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '8px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#B8960C',
                }}
              >
                Made in PT
              </span>
            </div>
          </div>

          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#B8960C',
              marginBottom: '20px',
            }}
          >
            Origem
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              fontWeight: 400,
              color: '#0A0A0A',
              lineHeight: 1.2,
              marginBottom: '28px',
            }}
          >
            Porto, Portugal.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '16px',
              fontWeight: 300,
              color: '#424242',
              lineHeight: 1.9,
            }}
          >
            Portugal é um dos maiores centros de manufactura têxtil da Europa — ao lado de Itália.
            O Porto é onde essa tradição vive nas mãos de quem a pratica todos os dias.
            Cada par Lion Socks é concebido, produzido e acabado aqui.
            <strong style={{ color: '#0A0A0A', fontWeight: 500 }}> Do fio ao punho dourado — tudo é nosso.</strong>
          </p>

          <div style={{ marginTop: '48px' }}>
            <Link
              href="/loja"
              style={{
                display: 'inline-block',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
                border: '1px solid #0A0A0A',
                padding: '16px 40px',
                textDecoration: 'none',
                transition: 'all 250ms ease',
              }}
            >
              Explorar a Colecção
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
