'use client'

export default function ListaPrivadaSection() {
  return (
    <section style={{ background: '#0A0A0A', padding: 'clamp(36px, 8vw, 88px) 0' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)', textAlign: 'center' }}>
        <p
          className="font-body uppercase"
          style={{ fontSize: 'clamp(9px, 1.1vw, 11px)', letterSpacing: '0.18em', color: '#B8960C', fontWeight: 500, marginBottom: 'clamp(8px, 1.5vw, 16px)' }}
        >
          Lista Privada
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(18px, 3.6vw, 32px)',
            color: '#F5F3EE',
            lineHeight: 1.25,
            fontWeight: 400,
            marginBottom: 'clamp(10px, 1.5vw, 16px)',
          }}
        >
          Acesso antecipado, 10% no primeiro par.
        </h2>
        <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 'clamp(11px, 1.4vw, 14px)', color: '#999', lineHeight: 1.7, marginBottom: 'clamp(18px, 3vw, 32px)' }}>
          Sem spam. Só o que importa — lançamentos, edições limitadas, convites.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            const input = e.currentTarget.elements.namedItem('email') as HTMLInputElement | null
            if (!input?.value) return
            fetch('/api/newsletter', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: input.value }),
            }).catch(() => {})
            input.value = ''
          }}
          className="flex flex-col sm:flex-row gap-3"
          style={{ maxWidth: '440px', margin: '0 auto' }}
        >
          <input
            name="email"
            type="email"
            required
            placeholder="O seu email"
            aria-label="Email para lista privada"
            className="lp-email-input"
            style={{
              flex: 1,
              background: 'transparent',
              border: '1px solid rgba(245,243,238,0.25)',
              color: '#F5F3EE',
              padding: 'clamp(8px, 1.4vw, 14px) clamp(10px, 1.5vw, 16px)',
              fontSize: 'clamp(11px, 1.4vw, 14px)',
              fontFamily: "'Inter', system-ui, sans-serif",
              outline: 'none',
              borderRadius: '3px',
              minHeight: 'clamp(36px, 4.5vw, 48px)',
            }}
          />
          <button
            type="submit"
            className="font-body uppercase"
            style={{
              background: '#B8960C',
              color: '#0A0A0A',
              border: 'none',
              padding: 'clamp(8px, 1.4vw, 14px) clamp(14px, 2.5vw, 28px)',
              fontSize: 'clamp(9px, 1.1vw, 11px)',
              letterSpacing: '0.18em',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: '3px',
              minHeight: 'clamp(36px, 4.5vw, 48px)',
              whiteSpace: 'nowrap',
            }}
          >
            Entrar na Lista
          </button>
        </form>
      </div>
    </section>
  )
}
