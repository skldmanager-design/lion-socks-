'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const collections = [
  {
    handle: 'fil-d-ecosse',
    name: "Fil d'Écosse",
    subtitle: 'Leveza & Brilho',
    description: 'Algodão egípcio mercerizado. A escolha do dia-a-dia para quem não quer compromissos.',
    href: '/colecoes/fil-d-ecosse',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=1100&fit=crop&auto=format&q=80',
    heightStyle: { height: '520px' },
  },
  {
    handle: 'la-merino',
    name: 'Lã Merino',
    subtitle: 'Conforto & Calor',
    description: 'Ultrafina, termorreguladora. Para todas as estações, sem compromisso com o estilo.',
    href: '/colecoes/la-merino',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1100&fit=crop&auto=format&q=80',
    heightStyle: { height: '640px' },
  },
  {
    handle: 'seda',
    name: 'Seda',
    subtitle: 'Luxo & Distinção',
    description: 'O epítome do luxo em meias. Para as ocasiões que merecem o melhor.',
    href: '/colecoes/seda',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&h=1100&fit=crop&auto=format&q=80',
    heightStyle: { height: '520px' },
  },
]

function CollectionCard({ col, index }: { col: (typeof collections)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
    >
      <Link
        href={col.href}
        className="group block relative overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative overflow-hidden" style={col.heightStyle}>
          <Image
            src={col.image}
            alt={col.name}
            fill
            className="object-cover object-center"
            style={{
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.6s ease-out',
            }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
              opacity: hovered ? 1 : 0.85,
            }}
          />

          {/* Content */}
          <div
            className="absolute bottom-0 left-0 right-0 p-6 lg:p-8"
            style={{ transform: hovered ? 'translateY(-4px)' : 'translateY(0)', transition: 'transform 0.3s' }}
          >
            <p
              className="font-body uppercase mb-2"
              style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#B8960C' }}
            >
              {col.subtitle}
            </p>
            <h3
              className="font-display text-white mb-3"
              style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 400 }}
            >
              {col.name}
            </h3>
            <p
              className="font-body text-white/70 leading-relaxed mb-4 overflow-hidden transition-all duration-300"
              style={{
                fontSize: '13px',
                maxHeight: hovered ? '80px' : '0',
                opacity: hovered ? 1 : 0,
              }}
            >
              {col.description}
            </p>
            <span
              className="font-body uppercase transition-all duration-300"
              style={{
                fontSize: '11px',
                letterSpacing: '0.1em',
                color: '#B8960C',
                opacity: hovered ? 1 : 0.6,
              }}
            >
              Descobrir →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function FeaturedCollections() {
  return (
    <section style={{ background: '#ffffff', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <p
            className="font-body uppercase mb-4"
            style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#B8960C' }}
          >
            AS NOSSAS COLEÇÕES
          </p>
          <h2
            className="font-display text-gray-900"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400 }}
          >
            Materiais que fazem a diferença
          </h2>
        </motion.div>

        {/* Asymmetric grid — items aligned to bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 items-end">
          {collections.map((col, i) => (
            <CollectionCard key={col.handle} col={col} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/loja"
            className="font-body uppercase transition-colors hover:text-gold"
            style={{
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: '#424242',
              borderBottom: '1px solid rgba(0,0,0,0.2)',
              paddingBottom: '2px',
            }}
          >
            Ver todos os produtos →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
