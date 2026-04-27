'use client'

import { useState } from 'react'
import { useToast } from '@/context/ToastContext'

export default function ContactoClient() {
  const { show } = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: 'Encomendas', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Nome obrigatório'
    if (!form.email.trim()) errs.email = 'Email obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email inválido'
    if (!form.message.trim() || form.message.length < 10) errs.message = 'Mensagem muito curta'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      show('Corrija os campos assinalados', 'error')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Erro ${res.status}`)
      }
      setSubmitted(true)
      show('Mensagem enviada. Responderemos em breve.')
    } catch (err) {
      show(err instanceof Error ? err.message : 'Erro ao enviar mensagem', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-20 pb-24 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div style={{ width: '60px', height: '60px', background: '#B8960C', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-display text-3xl text-gray-900 mb-3">Mensagem enviada</h1>
          <p className="font-body text-sm text-gray-500 mb-6">
            Obrigado, {form.name}. Responderemos em breve para <strong>{form.email}</strong>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: 'Encomendas', message: '' }) }}
            className="font-body text-xs uppercase tracking-widest text-gold border-b border-gold pb-1 hover:text-gray-900 hover:border-gray-900 transition-all"
          >
            Enviar outra mensagem
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#F5F3EE', minHeight: '100vh' }} className="pt-12 lg:pt-16 pb-20 lg:pb-28">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-gold text-[12px] tracking-[0.15em] uppercase font-body mb-3">Fale Connosco</p>
          <h1 className="font-display text-4xl lg:text-5xl text-gray-900 mb-4">Contacto</h1>
          <p className="text-gray-500 font-body text-sm">Resposta em 24 horas úteis.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <Field label="Nome" value={form.name} error={errors.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="Email" type="email" value={form.email} error={errors.email} onChange={(v) => setForm({ ...form, email: v })} />
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-gray-500 mb-2">Assunto</label>
            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full border border-gray-200 px-4 py-3 font-body text-sm text-gray-900 focus:outline-none focus:border-gold focus-visible:ring-2 focus-visible:ring-gold bg-white"
            >
              <option>Encomendas</option>
              <option>Devoluções</option>
              <option>Tamanhos</option>
              <option>Parcerias</option>
              <option>Outro</option>
            </select>
          </div>
          <div>
            <label className="block font-body text-xs tracking-widest uppercase text-gray-500 mb-2">Mensagem</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`w-full border px-4 py-3 font-body text-sm text-gray-900 bg-white resize-none focus:outline-none focus:border-gold ${errors.message ? 'border-[#B8960C]' : 'border-gray-200'}`}
              placeholder="Como podemos ajudar?"
            />
            {errors.message && <p className="font-body text-xs text-[#B8960C] mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full font-body text-xs tracking-widest uppercase bg-gray-900 text-white py-4 hover:bg-gold hover:text-gray-900 transition-all disabled:opacity-50"
          >
            {submitting ? 'A enviar...' : 'Enviar Mensagem'}
          </button>
        </form>

        <div className="mt-16 text-center">
          <p className="font-body text-sm text-gray-500">
            Ou envie diretamente para{' '}
            <a href="mailto:info@lionsocks.pt" className="text-gold underline underline-offset-2">
              info@lionsocks.pt
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, type = 'text', value, error, onChange }: { label: string; type?: string; value: string; error?: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block font-body text-xs tracking-widest uppercase text-gray-500 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border px-4 py-3 font-body text-sm text-gray-900 bg-white focus:outline-none focus:border-gold ${error ? 'border-[#B8960C]' : 'border-gray-200'}`}
      />
      {error && <p className="font-body text-xs text-[#B8960C] mt-1">{error}</p>}
    </div>
  )
}
