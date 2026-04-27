// Product-Pilot API client
// All endpoints are prefixed with /api/pl/storefront/<brand>

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3002'
const BRAND = process.env.NEXT_PUBLIC_BRAND_SLUG || 'lion-socks'

export const API_URL = `${API_BASE}/api/pl/storefront/${BRAND}`

export class APIError extends Error {
  constructor(public status: number, message: string, public body?: unknown) {
    super(message)
  }
}

interface FetchOptions {
  token?: string
  revalidate?: number | false
  cache?: RequestCache
}

export async function apiGet<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const headers: Record<string, string> = {}
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`

  const next: { revalidate?: number | false } = {}
  if (opts.revalidate !== undefined) next.revalidate = opts.revalidate

  const r = await fetch(`${API_URL}${path}`, {
    headers,
    cache: opts.cache,
    next: Object.keys(next).length ? next : undefined,
  })

  if (!r.ok) {
    let body: unknown
    try { body = await r.json() } catch {}
    throw new APIError(r.status, `${r.status} ${r.statusText}`, body)
  }
  return r.json()
}

export async function apiPost<T>(path: string, body: unknown, opts: FetchOptions = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`

  const r = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  if (!r.ok) {
    let errBody: unknown
    try { errBody = await r.json() } catch {}
    throw new APIError(r.status, `${r.status} ${r.statusText}`, errBody)
  }
  return r.json()
}

export async function apiPatch<T>(path: string, body: unknown, opts: FetchOptions = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`

  const r = await fetch(`${API_URL}${path}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  })

  if (!r.ok) {
    let errBody: unknown
    try { errBody = await r.json() } catch {}
    throw new APIError(r.status, `${r.status} ${r.statusText}`, errBody)
  }
  return r.json()
}

export async function apiDelete<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const headers: Record<string, string> = {}
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`

  const r = await fetch(`${API_URL}${path}`, { method: 'DELETE', headers })
  if (!r.ok) {
    let errBody: unknown
    try { errBody = await r.json() } catch {}
    throw new APIError(r.status, `${r.status} ${r.statusText}`, errBody)
  }
  return r.json()
}

// ─── Safe wrappers: return null on error (useful for graceful degradation) ──

export async function apiGetSafe<T>(path: string, opts: FetchOptions = {}): Promise<T | null> {
  try {
    return await apiGet<T>(path, opts)
  } catch (e) {
    console.warn(`[api] GET ${path} failed:`, e)
    return null
  }
}

// ─── Token storage (client-side) ─────────────────────────────────────────

export const TOKEN_KEY = 'lion-socks-token'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
}

// ─── Price formatting helpers ───────────────────────────────────────────

export function formatCents(cents: number): string {
  return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(cents / 100)
}

export function centsToEuros(cents: number): number {
  return cents / 100
}
