'use client'

import { useState, createContext, useContext, useCallback, ReactNode } from 'react'

const HARDCODED_EMAIL = 'admin@flyoverbridge.org'
const HARDCODED_PASSWORD = 'admin123'
const SESSION_KEY = 'flyover_admin_session'

type User = { email: string; name: string }

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isReady: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function loadSession(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveSession(user: User) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } catch { /* ignore */ }
}

function clearSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch { /* ignore */ }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      return loadSession()
    }
    return null
  })
  const [isReady] = useState(true)

  const login = useCallback(async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 300))
    if (email.toLowerCase().trim() !== HARDCODED_EMAIL.toLowerCase()) {
      return { success: false, error: 'Invalid email address' }
    }
    if (password !== HARDCODED_PASSWORD) {
      return { success: false, error: 'Invalid password' }
    }
    const u: User = { email: HARDCODED_EMAIL, name: 'Admin' }
    setUser(u)
    saveSession(u)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    clearSession()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
