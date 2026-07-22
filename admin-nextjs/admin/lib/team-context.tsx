'use client'

import { useEffect, useState, createContext, useContext, useCallback } from 'react'

export type TeamMember = {
  _id: string
  name: string
  role: string
  email?: string
  phone?: string
  image?: string
  bio?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    facebook?: string
  }
  featured?: boolean
  createdAt: number
  updatedAt: number
}

type CreateMemberInput = Omit<TeamMember, '_id' | 'createdAt' | 'updatedAt'>

interface TeamContextType {
  members: TeamMember[]
  member: TeamMember | null
  isLoading: boolean
  error: string | null
  createMember: (data: CreateMemberInput) => Promise<void>
  updateMember: (id: string, updates: Partial<TeamMember>) => Promise<void>
  deleteMember: (id: string) => Promise<void>
  fetchMember: (id: string) => Promise<void>
}

const TeamContext = createContext<TeamContextType | undefined>(undefined)

// In-memory store used when Convex is not yet connected
let memoryStore: TeamMember[] = []
let memoryCounter = 0

function generateId(): string {
  memoryCounter++
  return `mem_${Date.now()}_${memoryCounter}`
}

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<TeamMember[]>(memoryStore)
  const [member, setMember] = useState<TeamMember | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createMember = useCallback(async (data: CreateMemberInput) => {
    setIsLoading(true)
    setError(null)
    try {
      const now = Date.now()
      const newMember: TeamMember = {
        _id: generateId(),
        ...data,
        featured: data.featured ?? false,
        createdAt: now,
        updatedAt: now,
      }
      memoryStore = [...memoryStore, newMember]
      setMembers(memoryStore)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to create member'
      setError(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateMember = useCallback(async (id: string, updates: Partial<TeamMember>) => {
    setIsLoading(true)
    setError(null)
    try {
      memoryStore = memoryStore.map(m =>
        m._id === id ? { ...m, ...updates, updatedAt: Date.now() } : m
      )
      setMembers(memoryStore)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update member'
      setError(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteMember = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      memoryStore = memoryStore.filter(m => m._id !== id)
      setMembers(memoryStore)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete member'
      setError(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchMember = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const found = memoryStore.find(m => m._id === id) || null
      setMember(found)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch member'
      setError(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <TeamContext.Provider value={{
      members,
      member,
      isLoading,
      error,
      createMember,
      updateMember,
      deleteMember,
      fetchMember,
    }}>
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  const context = useContext(TeamContext)
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider')
  }
  return context
}
