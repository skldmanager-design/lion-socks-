'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const materials = [
  {
    id: 'seda',
    number: '01',
    name: 'Seda',
    href: '/materiais/seda',
    description:
      "Utilizada pela realeza há milénios, a seda continua a ser o epítome do luxo. Cada fio é naturalmente termorregulador, hipoalergénico e de uma suavidade incomparável. Um par de meias em seda é uma experiência.",
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=700&h=900&fit=crop&auto=format&q=80',
    priceFrom: '€23',
  },
  {
    id: 'fil-d-ecosse',
    number: '02',
    name: "Fil d'Écosse",
    href: '/materiais/fil-d-ecosse',
    description:
      "Algodão egípcio de fibra longa, mercerizado duas vezes para um brilho subtil e durabilidade excepcional. O nome vem da tradição têxtil escocesa — leveza e refinamento que resiste ao tempo.",
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=700&h=900&fit=crop&auto=format&q=80',
    priceFrom: '€13',
  },
  {
    id: 'la-merino',
    number: '03',
    name: 'Lã Merino',
    href: '/materiais/la-merino',
    description:
      "Proveniente das ovelhas Merino da Austrália e Nova Zelândia, esta lã ultrafina é naturalmente termorreguladora. Com 18,5 microns, abaixo do limiar de picada — suave para as peles mais sensíveis.",
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=900&fit=crop&auto=format&q=80',
    priceFrom: '€19',
  },
]

export default function MaterialsShowcase() {
  return (
    <section style={{ background: '#F5F3EE', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {materials.map((material, index) => {
          const isEven = index % 2 === 1
          return (
            <div key={material.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
                style={{ paddingBottom: index < materials.length - 1 ? '80px' : 0 }}
              >
                {/* Text */}
                <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                  <p
                    className="font-body uppercase mb-4"
                    style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#B8960C' }}
                  >
                    {material.number}
                  </p>
                  <h3
                    className="font-display text-gray-900 mb-6"
                    style={{ fontSize: 'clamp(28px, 3vw, 36px)', fontWeight: 400 }}
                  >
                    {material.name}
                  </h3>
                  <p
                    className="font-body text-gray-700 mb-8"
                    style={{ fontSize: '16px', fontWeight: 300, maxWidth: '480px', lineHeight: 1.8 }}
                  >
                    {material.description}
                  </p>
                  <div className="flex items-center gap-6">
                    <Link
                      href={material.href}
                      className="font-body uppercase transition-colors hover:opacity-70"
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        color: '#B8960C',
                      }}
                    >
                      Explorar Coleção →
                    </Link>
                    <span className="font-body text-gray-400" style={{ fontSize: '13px' }}>
                      A partir de {material.priceFrom}
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div
                  className={`relative overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  style={{ height: '500px' }}
                >
                  <Image
                    src={material.image}
                    alt={material.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              {/* Separator */}
              {index < materials.length - 1 && (
                <div
                  style={{
                    borderTop: '1px solid rgba(0,0,0,0.08)',
                    marginBottom: '80px',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
