import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getProductsByCollection } from '@/lib/mock-data'
import ProductCard from '@/components/product/ProductCard'

interface Props {
  params: Promise<{ handle: string }>
}

// ─── Material data ────────────────────────────────────────────────────────

const materialData = {
  seda: {
    name: 'Seda',
    article: 'a',
    tagline: 'O epítome do luxo em meias',
    heroImage: 'https://placehold.co/1920x900/1a0e1a/B8960C?text=Seda&font=playfair-display',
    textureImage: 'https://placehold.co/900x700/1a0e1a/B8960C?text=Textura+Seda&font=playfair-display',
    color: '#8B7355',
    history: [
      'Utilizada pela realeza há mais de quatro mil anos, a seda continua a ser o epítome do luxo. Originária da China, onde o processo de sericultura era guardado como segredo de estado durante séculos, a seda chegou à Europa pela Rota da Seda e conquistou os ateliês dos maiores alfaiates do mundo.',
      'Cada fio de seda é produzido por um único bicho-da-seda que tece um casulo contínuo de até 900 metros. A fibra resultante é naturalmente termorreguladora, hipoalergénica e possui um brilho característico que nenhuma fibra sintética consegue imitar — porque esse brilho vem da estrutura triangular da própria fibra, que refracta a luz como um prisma.',
      'As nossas meias de seda são tecidas em teares de alta precisão, com uma contagem de fios que garante uma leveza quase impossível de sentir no pé. Ao mesmo tempo, a seda é surpreendentemente resistente — mais forte do que o aço pela mesma espessura. Um par para usar nos momentos que merecem o melhor, ou todos os dias, se assim o decidir.',
    ],
    properties: [
      { label: 'Termorreguladora', desc: 'Fresca no calor, quente no frio' },
      { label: 'Hipoalergénica', desc: 'Ideal para pele sensível' },
      { label: 'Brilho natural', desc: 'Reflexo único da luz' },
      { label: 'Ultra-resistente', desc: 'Mais forte que o aço à mesma espessura' },
      { label: 'Suavidade absoluta', desc: 'A fibra mais macia que existe' },
      { label: 'Antibacteriana', desc: 'Inibe o crescimento de bactérias naturalmente' },
    ],
    collection: 'seda',
    packHref: '/packs',
  },
  'fil-d-ecosse': {
    name: "Fil d'Écosse",
    article: 'o',
    tagline: 'Tradição têxtil. Leveza e brilho subtil.',
    heroImage: 'https://placehold.co/1920x900/1a2e1a/B8960C?text=Fil+d%27Ecosse&font=playfair-display',
    textureImage: 'https://placehold.co/900x700/1a2e1a/B8960C?text=Textura+Fil+d%27Ecosse&font=playfair-display',
    color: '#4A6741',
    history: [
      "Algodão egípcio de fibra longa, mercerizado duas vezes num processo que lhe confere um brilho subtil e uma durabilidade excepcional. O nome vem da tradição têxtil escocesa — \"fil\" significa fio em francês, e as manufaturas escocesas do século XIX eram famosas pela qualidade do seu trabalho com algodão de longa fibra.",
      'O algodão egípcio cresce exclusivamente ao longo do Nilo, onde a combinação única de solo, humidade e temperatura produz uma fibra de comprimento excepcional. Essa fibra longa é fundamental: cria um fio mais suave, mais resistente e com menos pelugens, que mantém a sua forma lavagem após lavagem.',
      'O processo de mercerização — uma das maiores inovações da história têxtil, desenvolvida por John Mercer em 1844 — consiste em tratar a fibra com hidróxido de sódio sob tensão. O resultado é uma fibra que incha, tornando-se mais redonda e reflectindo melhor a luz: daí o brilho característico do Fil d\'Écosse. As nossas meias são mercerizadas duas vezes para um acabamento ainda mais refinado.',
    ],
    properties: [
      { label: 'Leve & respirável', desc: 'Confortável em qualquer estação' },
      { label: 'Durável', desc: 'Mantém a forma após muitas lavagens' },
      { label: 'Brilho mercerizado', desc: 'Acabamento subtil e elegante' },
      { label: 'Macio ao toque', desc: 'Fibra longa sem pelugens' },
      { label: 'Lavagem fácil', desc: 'Máquina a 30°C sem problemas' },
      { label: 'Anti-alérgico', desc: 'Algodão natural puro' },
    ],
    collection: 'fil-d-ecosse',
    packHref: '/packs',
  },
  'la-merino': {
    name: 'Lã Merino',
    article: 'a',
    tagline: 'Conforto termorregulador. Para todas as estações.',
    heroImage: 'https://placehold.co/1920x900/2e2a1a/B8960C?text=La+Merino&font=playfair-display',
    textureImage: 'https://placehold.co/900x700/2e2a1a/B8960C?text=Textura+La+Merino&font=playfair-display',
    color: '#6B5B45',
    history: [
      'Proveniente das ovelhas Merino da Austrália e Nova Zelândia, esta lã ultrafina é naturalmente termorreguladora — fresca no verão, quente no inverno. Com 18,5 microns de diâmetro, está abaixo do limiar de picada humana (tipicamente 22 microns), o que a torna suave ao toque mesmo para as peles mais sensíveis.',
      'As ovelhas Merino são tosquiadas uma vez por ano, cada uma produzindo até 5 kg de lã. A fibra passa por um processo rigoroso de selecção e lavagem antes de ser fiada em fio. A nossa lã merino é certificada com os mais altos padrões de bem-estar animal — as ovelhas vivem livres nos campos da Austrália e Nova Zelândia, onde o clima produz a fibra de melhor qualidade.',
      'A lã merino tem uma propriedade única: as fibras são cobertas por escamas microscópicas que se movem para regular a temperatura e a humidade. Quando está frio, as fibras fecham e retêm o calor; quando está quente, abrem e permitem a circulação de ar. É por isso que as meias de merino funcionam em todas as estações — e por isso que as usamos em pares para o ano inteiro.',
    ],
    properties: [
      { label: 'Termorreguladora', desc: 'Fresca no verão, quente no inverno' },
      { label: 'Não pica', desc: '18,5 microns — abaixo do limiar de irritação' },
      { label: '4 estações', desc: 'Um único par para todo o ano' },
      { label: 'Absorve humidade', desc: 'Mantém o pé seco e confortável' },
      { label: 'Odor-resistente', desc: 'Propriedades antibacterianas naturais' },
      { label: 'Durável', desc: 'Fibra elástica que não perde a forma' },
    ],
    collection: 'la-merino',
    packHref: '/packs',
  },
} as const

type MaterialHandle = keyof typeof materialData

export async function generateStaticParams() {
  return Object.keys(materialData).map((handle) => ({ handle }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params
  const data = materialData[handle as MaterialHandle]
  if (!data) return {}

  return {
    title: data.name,
    description: `${data.tagline} Descubra a história e as propriedades do ${data.name} nas meias Lion Socks.`,
  }
}

// ─── Property card ─────────────────────────────────────────────────────────

function PropertyCard({ label, desc }: { label: string; desc: string }) {
  return (
    <div
      className="p-5 transition-colors duration-200"
      style={{ borderLeft: '2px solid #B8960C', background: '#fafafa' }}
    >
      <p
        className="font-body uppercase mb-2"
        style={{ fontSize: '11px', letterSpacing: '0.12em', fontWeight: 500, color: '#1a1a1a' }}
      >
        {label}
      </p>
      <p
        className="font-body text-gray-500 leading-relaxed"
        style={{ fontSize: '13px', fontWeight: 300 }}
      >
        {desc}
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default async function MaterialPage({ params }: Props) {
  const { handle } = await params
  const data = materialData[handle as MaterialHandle]

  if (!data) notFound()

  const materialProducts = getProductsByCollection(data.collection)

  return (
    <article>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative flex items-end overflow-hidden" style={{ height: '50vh', minHeight: '400px' }}>
        <Image
          src={data.heroImage}
          alt={data.name}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-14 lg:pb-20 w-full">
          <p className="text-gold text-[10px] tracking-[0.45em] uppercase font-body mb-4">
            Os Nossos Materiais
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-4 leading-tight">
            {data.name}
          </h1>
          <p className="text-cream/70 font-body text-base sm:text-lg max-w-lg leading-relaxed">
            {data.tagline}
          </p>
        </div>
      </section>

      {/* ── A História ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">

          {/* Text */}
          <div>
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-body mb-4">
              A História
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-gray-900 mb-8 leading-snug">
              De onde vem a excelência
            </h2>

            <div className="space-y-5">
              {data.history.map((paragraph, i) => (
                <p key={i} className="text-gray-700 font-body text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Texture image */}
          <div className="relative">
            <div className="relative h-80 lg:h-[480px] overflow-hidden">
              <Image
                src={data.textureImage}
                alt={`Textura ${data.name}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative corner */}
            <div className="absolute -bottom-3 -right-3 w-20 h-20 border border-gold opacity-30 hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ── Propriedades ────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-body mb-3">
              Características
            </p>
            <h2 className="font-display text-3xl lg:text-4xl text-gray-900">
              Porque é que {data.article === 'o' ? 'o' : 'a'} {data.name} é especial
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
            {data.properties.map((prop) => (
              <PropertyCard key={prop.label} label={prop.label} desc={prop.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Produtos ────────────────────────────────────────────── */}
      {materialProducts.length > 0 && (
        <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-body mb-2">
                A Coleção
              </p>
              <h2 className="font-display text-3xl lg:text-4xl text-gray-900">
                Meias em {data.name}
              </h2>
            </div>
            <Link
              href={`/colecoes/${data.collection}`}
              className="hidden sm:flex items-center gap-1.5 text-xs tracking-widest uppercase font-body text-gray-500 hover:text-primary border-b border-gray-300 hover:border-primary pb-0.5 transition-all"
            >
              Ver todos <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {materialProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link
              href={`/colecoes/${data.collection}`}
              className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase font-body text-gray-500 hover:text-primary border-b border-gray-300 hover:border-primary pb-0.5 transition-all"
            >
              Ver todos os produtos em {data.name} <ArrowRight size={12} />
            </Link>
          </div>
        </section>
      )}

      {/* ── CTA final ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-body mb-4">
            Começar
          </p>
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-6">
            Experimente {data.article} {data.name}
          </h2>
          <p className="text-cream/60 font-body text-sm leading-relaxed mb-10">
            Packs curados com desconto até 19%, ou monte a sua própria caixa com os pares que mais lhe convêm.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={data.packHref}
              className="inline-flex items-center gap-2 border border-gold/60 text-gold text-xs tracking-widest uppercase font-body font-medium px-8 py-4 hover:border-gold hover:bg-gold/10 transition-all duration-300"
            >
              Ver Packs <ArrowRight size={12} />
            </Link>
            <Link
              href="/loja"
              className="inline-flex items-center gap-2 border border-white/30 text-white text-xs tracking-widest uppercase font-body font-medium px-8 py-4 hover:border-white hover:bg-white/5 transition-all duration-300"
            >
              Ir para a Loja
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
