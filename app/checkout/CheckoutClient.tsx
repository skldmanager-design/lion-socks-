'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice } from '@/lib/utils'

export default function CheckoutClient() {
  const router = useRouter()
  const { show } = useToast()
  const { items, subtotal, hasFreeShipping, clearCart } = useCart()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'PT',
    discountCode: '',
    notes: '',
  })

  const shippingCost = hasFreeShipping ? 0 : 3.5
  const total = subtotal + shippingCost

  if (items.length === 0) {
    return (
      <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-24 pb-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-gray-900 mb-4">O carrinho está vazio</h1>
          <Link href="/loja" className="font-body text-sm uppercase tracking-widest text-gold border-b border-gold pb-1">
            Explorar Loja
          </Link>
        </div>
      </div>
    )
  }

  const validate = (): string | null => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Email inválido.'
    if (!form.firstName.trim() || !form.lastName.trim()) return 'Nome e apelido obrigatórios.'
    if (form.phone.replace(/\D/g, '').length < 9) return 'Telemóvel inválido.'
    if (!form.address.trim()) return 'Morada obrigatória.'
    if (!form.city.trim()) return 'Cidade obrigatória.'
    if (!/^\d{4}-?\d{3}$/.test(form.postalCode.trim()) && form.country === 'PT') {
      return 'Código postal inválido (formato 0000-000).'
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setProcessing(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            variantId: i.variantId,
            productTitle: i.productTitle,
            variantTitle: i.variantTitle,
            price: i.price,
            quantity: i.quantity,
          })),
          customerEmail: form.email,
          shippingName: `${form.firstName} ${form.lastName}`.trim(),
          shippingAddress: form.address,
          shippingCity: form.city,
          shippingPostalCode: form.postalCode,
          shippingCountry: form.country,
          discountCode: form.discountCode || undefined,
          notes: form.notes || undefined,
          subtotal,
          shippingCost,
          total,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Erro ${res.status}`)
      }

      const { orderNumber } = await res.json() as { orderNumber: string }

      show('Encomenda registada')
      clearCart()
      router.push(`/checkout/success?order=${encodeURIComponent(orderNumber)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar encomenda.')
      setProcessing(false)
    }
  }

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="font-display text-2xl text-gray-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '0.02em' }}
          >
            Lion Socks
          </Link>
          <div
            style={{
              width: '40px',
              height: '1px',
              background: '#B8960C',
              margin: '14px auto',
            }}
          />
          <p
            className="font-body uppercase"
            style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#B8960C', fontWeight: 500 }}
          >
            Checkout Seguro
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12">
          {/* Left — Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <section>
              <h2
                className="font-display text-gray-900 mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 400, lineHeight: 1.2 }}
              >
                Informações de Contacto
              </h2>
              <div className="space-y-4">
                <Field label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nome" required value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
                  <Field label="Apelido" required value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
                </div>
                <Field label="Telemóvel" type="tel" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              </div>
            </section>

            <section>
              <h2
                className="font-display text-gray-900 mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 400, lineHeight: 1.2 }}
              >
                Morada de Envio
              </h2>
              <div className="space-y-4">
                <Field label="Morada" required value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Cidade" required value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
                  <Field label="Código Postal" required value={form.postalCode} onChange={(v) => setForm({ ...form, postalCode: v })} />
                </div>
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">País</label>
                  <select
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm bg-white focus:outline-none focus:border-gold"
                  >
                    <option value="PT">Portugal</option>
                    <option value="ES">Espanha</option>
                    <option value="FR">França</option>
                    <option value="DE">Alemanha</option>
                    <option value="IT">Itália</option>
                    <option value="NL">Holanda</option>
                    <option value="BE">Bélgica</option>
                    <option value="UK">Reino Unido</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h2
                className="font-display text-gray-900 mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 400, lineHeight: 1.2 }}
              >
                Notas & Desconto
              </h2>
              <div className="space-y-4">
                <Field label="Código de desconto (opcional)" value={form.discountCode} onChange={(v) => setForm({ ...form, discountCode: v })} />
                <div>
                  <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">Notas de encomenda (opcional)</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full border border-gray-200 px-4 py-3 font-body text-sm bg-white resize-none focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
            </section>

            {error && (
              <div
                className="p-4 text-sm font-body"
                style={{
                  border: '1px solid rgba(184,150,12,0.4)',
                  background: '#FBF7EC',
                  color: '#0A0A0A',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="w-full font-body uppercase disabled:opacity-50"
              style={{
                background: '#0A0A0A',
                color: '#F5F3EE',
                fontSize: '12px',
                letterSpacing: '0.18em',
                fontWeight: 500,
                padding: '20px',
                border: '1px solid #0A0A0A',
                borderBottom: '2px solid #0A0A0A',
                cursor: processing ? 'wait' : 'pointer',
                transition: 'all 280ms cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={(e) => {
                if (processing) return
                e.currentTarget.style.borderBottom = '2px solid #B8960C'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottom = '2px solid #0A0A0A'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {processing ? 'A processar…' : `Concluir encomenda · ${formatPrice(total)}`}
            </button>

            <p className="text-center font-body text-xs text-gray-500">
              Confirmação por email. Contactamo-lo para acertar pagamento e envio.
            </p>
          </form>

          {/* Right — Order summary */}
          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '4px', alignSelf: 'start' }}>
            <h3 className="font-display text-lg text-gray-900 mb-4">Resumo</h3>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative flex-shrink-0" style={{ width: '56px', height: '56px', background: '#F5F3EE', borderRadius: '4px', overflow: 'hidden' }}>
                    <Image src={item.image} alt={item.productTitle} fill className="object-contain p-2" />
                    <span className="absolute -top-1 -right-1 rounded-full flex items-center justify-center" style={{ width: '18px', height: '18px', background: '#0A0A0A', color: '#FFFFFF', fontSize: '10px' }}>
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body truncate" style={{ fontSize: '13px', fontWeight: 400, color: '#0A0A0A' }}>
                      {item.productTitle}
                    </p>
                    <p className="font-body text-gray-500" style={{ fontSize: '11px' }}>
                      {item.variantTitle}
                    </p>
                  </div>
                  <p className="font-body flex-shrink-0" style={{ fontSize: '13px', fontWeight: 500, color: '#0A0A0A' }}>
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4" style={{ borderTop: '1px solid #E8E5DF', borderBottom: '1px solid #E8E5DF' }}>
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Envio" value={hasFreeShipping ? 'Grátis' : formatPrice(shippingCost)} />
            </div>
            <div className="flex items-center justify-between pt-4">
              <span className="font-body uppercase tracking-widest text-gray-500" style={{ fontSize: '12px' }}>
                Total
              </span>
              <span className="font-display" style={{ fontSize: '22px', color: '#0A0A0A' }}>
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, type = 'text', placeholder, required, value, onChange }: { label: string; type?: string; placeholder?: string; required?: boolean; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block font-body text-xs uppercase tracking-widest text-gray-500 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 px-4 py-3 font-body text-sm text-gray-900 bg-white focus:outline-none focus:border-gold"
      />
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between font-body" style={{ fontSize: '13px' }}>
      <span className="text-gray-600">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  )
}
