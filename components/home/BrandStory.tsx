'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function BrandStory() {
  return (
    <section style={{ background: '#ffffff', padding: '120px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20 items-center">

          {/* Image — 60% */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-3 relative"
          >
            <div className="relative overflow-hidden" style={{ height: '520px' }}>
              <Image
                src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=900&h=1000&fit=crop&auto=format&q=80"
                alt="A história da Lion Socks"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
            <div
              className="absolute -bottom-4 -right-4 w-28 h-28 hidden lg:block"
              style={{ border: '1px solid rgba(184,150,12,0.25)' }}
            />
          </motion.div>

          {/* Text — 40% */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <p
              className="font-body uppercase mb-4"
              style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#B8960C' }}
            >
              A NOSSA HISTÓRIA
            </p>
            <h2
              className="font-display text-gray-900 mb-6"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, lineHeight: 1.2 }}
            >
              O leão não precisa de rugir
            </h2>

            <div className="space-y-4 mb-8">
              <p
                className="font-body text-gray-700"
                style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.8 }}
              >
                A Lion Socks nasceu de uma convicção simples: os melhores detalhes são aqueles que só você conhece.
                Um par de meias em seda ou fil d&apos;Écosse não é visível ao mundo — é apenas seu.
              </p>
              <p
                className="font-body text-gray-700"
                style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.8 }}
              >
                Cada par é fabricado com os materiais mais nobres da tradição têxtil europeia —
                algodão egípcio, lã merino ultrafina, seda pura — e pensado para o homem que
                valoriza qualidade sem precisar de a anunciar.
              </p>
            </div>

            {/* Values */}
            <div
              className="grid grid-cols-3 gap-4 mb-10 py-8"
              style={{ borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
            >
              {[
                { value: '100%', label: 'Materiais naturais' },
                { value: '21+', label: 'Modelos exclusivos' },
                { value: 'PT', label: 'Made in Portugal' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="font-display text-gray-900 mb-1" style={{ fontSize: '24px', fontWeight: 400 }}>
                    {item.value}
                  </p>
                  <p
                    className="font-body text-gray-400"
                    style={{ fontSize: '11px', letterSpacing: '0.05em' }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/sobre"
              className="font-body uppercase transition-colors hover:text-gold"
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: '#1a1a1a',
                borderBottom: '1px solid rgba(0,0,0,0.2)',
                paddingBottom: '2px',
              }}
            >
              Conhecer a marca →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
