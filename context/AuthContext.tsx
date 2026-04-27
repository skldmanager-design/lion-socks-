'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { apiPost, apiGet, getToken, setToken, clearToken } from '@/lib/api'
import type { PLCustomer, PLAuthResponse } from '@/lib/api-types'

export type User = PLCustomer

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<{ ok: boolean; error?: string }>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // On mount: try to restore session from stored token
  useEffect(() => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }
    apiGet<PLCustomer>('/customer/me', { token })
      .then((me) => setUser(me))
      .catch(() => {
        // Invalid/expired token
        clearToken()
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const res = await apiPost<PLAuthResponse>('/auth/login', { email, password })
      setToken(res.token)
      setUser(res.customer)
      return { ok: true }
    } catch (e) {
      const msg = e instanceof Error && e.message.includes('Failed to fetch')
        ? 'Serviço de autenticação indisponível. Tente mais tarde.'
        : e instanceof Error ? e.message : 'Erro ao iniciar sessão'
      return { ok: false, error: msg }
    }
  }

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const res = await apiPost<PLAuthResponse>('/auth/register', {
        email, password, firstName, lastName, acceptsMarketing: false,
      })
      setToken(res.token)
      setUser(res.customer)
      return { ok: true }
    } catch (e) {
      const msg = e instanceof Error && e.message.includes('Failed to fetch')
        ? 'Serviço de registo indisponível. Tente mais tarde.'
        : e instanceof Error ? e.message : 'Erro ao criar conta'
      return { ok: false, error: msg }
    }
  }

  const logout = () => {
    setUser(null)
    clearToken()
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
