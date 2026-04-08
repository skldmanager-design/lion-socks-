'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { getFeaturedBundles } from '@/lib/mock-data'
import { formatPrice } from '@/lib/utils'

export default function PacksTeaser() {
  const bundles = getFeaturedBundles()

  return (
    <section style={{ background: '#0a0a0a', padding: '120px 0' }}>
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
            style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#C5A55A' }}
          >
            EMBALAGEM PREMIUM
          </p>
          <h2
            className="font-display text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400 }}
          >
            A experiência começa na caixa
          </h2>
        </motion.div>

        {/* Packs grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {bundles.map((bundle, index) => {
            const savings = bundle.originalPrice - bundle.price
            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              >
                <Link
                  href={`/packs#${bundle.handle}`}
                  className="group block overflow-hidden transition-all duration-300"
                  style={{
                    background: '#141414',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(197,165,90,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  }}
                >
                  {/* Discount badge */}
                  <div className="p-6 pb-0 flex justify-between items-start">
                    <span
                      className="font-body uppercase"
                      style={{
                        fontSize: '9px',
                        letterSpacing: '0.15em',
                        color: '#C5A55A',
                        border: '1px solid rgba(197,165,90,0.3)',
                        padding: '3px 8px',
                      }}
                    >
                      -{bundle.discountPercent}%
                    </span>
                    <span
                      className="font-body"
                      style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}
                    >
                      {bundle.packagingLabel} · {bundle.pairCount} pares
                    </span>
                  </div>

                  <div className="p-6">
                    <h3
                      className="font-display text-white mb-2"
                      style={{ fontSize: '22px', fontWeight: 400 }}
                    >
                      {bundle.name}
                    </h3>
                    <p
                      className="font-body mb-5 leading-relaxed"
                      style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineClamp: 2 }}
                    >
                      {bundle.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <span
                        className="font-display text-white"
                        style={{ fontSize: '22px' }}
                      >
                        {formatPrice(bundle.price)}
                      </span>
                      <span
                        className="font-body line-through"
                        style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}
                      >
                        {formatPrice(bundle.originalPrice)}
                      </span>
                      <span
                        className="font-body ml-auto"
                        style={{ fontSize: '11px', color: '#C5A55A', letterSpacing: '0.05em' }}
                      >
                        Poupa {formatPrice(savings)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/packs"
            className="font-body uppercase inline-block transition-all duration-300 hover:bg-gold hover:text-primary hover:border-gold"
            style={{
              border: '1px solid rgba(197,165,90,0.5)',
              color: '#C5A55A',
              fontSize: '11px',
              letterSpacing: '0.15em',
              padding: '16px 40px',
              fontWeight: 400,
            }}
          >
            VER TODOS OS PACKS
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
