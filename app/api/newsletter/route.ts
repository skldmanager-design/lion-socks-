import { NextResponse } from 'next/server'

/**
 * Newsletter endpoint — temporary local fallback.
 *
 * Lion Socks emails go through Product-Pilot → Shopify (Klaviyo on Shopify side).
 * This route exists only as a dev-time stub so the form on the site doesn't 500.
 * When PL endpoint is live, this should proxy to it (set NEXT_PUBLIC_PL_API_URL
 * and the proxy below activates).
 */

const subscribers = new Set<string>()
const PL_URL = process.env.NEXT_PUBLIC_PL_API_URL

export async function POST(req: Request) {
  let email: unknown
  try {
    ;({ email } = await req.json())
  } catch {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  if (typeof email !== 'string') {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const normalized = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  // When PL is configured, proxy to it. Otherwise local dev stub.
  if (PL_URL) {
    try {
      const res = await fetch(`${PL_URL}/storefront/lion-socks/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalized, source: 'lion-socks-site' }),
      })
      if (!res.ok) throw new Error(`PL ${res.status}`)
      return NextResponse.json({ ok: true, message: 'Obrigado! Verifique o seu email.' })
    } catch (err) {
      console.error('[newsletter] PL proxy failed:', err)
      // Fall through to local stub so the user doesn't see an error.
    }
  }

  // Local dev stub — resets on restart, never sends email.
  if (subscribers.has(normalized)) {
    return NextResponse.json({ ok: true, message: 'Já está subscrito.' })
  }
  subscribers.add(normalized)
  return NextResponse.json({ ok: true, message: 'Obrigado! Verifique o seu email.' })
}
