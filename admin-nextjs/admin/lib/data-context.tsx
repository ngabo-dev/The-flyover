'use client'

import { useState, createContext, useContext, useCallback, ReactNode } from 'react'

export type EntityType =
  | 'hero-slides'
  | 'about-content'
  | 'services'
  | 'testimonials'
  | 'events'
  | 'partners'
  | 'contacts'
  | 'subscribers'
  | 'donations'
  | 'site-settings'
  | 'navigation-links'

export type DataEntity = {
  _id: string
  type: EntityType
  [key: string]: unknown
  createdAt: number
  updatedAt: number
}

interface DataContextType {
  items: DataEntity[]
  isLoading: boolean
  error: string | null
  getByType: (type: EntityType) => DataEntity[]
  getById: (id: string) => DataEntity | undefined
  create: (type: EntityType, data: Record<string, unknown>) => Promise<DataEntity>
  update: (id: string, updates: Record<string, unknown>) => Promise<void>
  remove: (id: string) => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

let memoryStore: DataEntity[] = []
let memoryCounter = 0

function generateId(): string {
  memoryCounter++
  return `data_${Date.now()}_${memoryCounter}`
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<DataEntity[]>(memoryStore)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getByType = useCallback((type: EntityType) => {
    return items.filter(i => i.type === type)
  }, [items])

  const getById = useCallback((id: string) => {
    return items.find(i => i._id === id)
  }, [items])

  const create = useCallback(async (type: EntityType, data: Record<string, unknown>) => {
    setIsLoading(true)
    setError(null)
    try {
      const now = Date.now()
      const entity: DataEntity = {
        _id: generateId(),
        type,
        ...data,
        createdAt: now,
        updatedAt: now,
      } as DataEntity
      memoryStore = [...memoryStore, entity]
      setItems(memoryStore)
      return entity
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to create'
      setError(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const update = useCallback(async (id: string, updates: Record<string, unknown>) => {
    setIsLoading(true)
    setError(null)
    try {
      memoryStore = memoryStore.map(e =>
        e._id === id ? { ...e, ...updates, updatedAt: Date.now() } as DataEntity : e
      )
      setItems(memoryStore)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update'
      setError(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const remove = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      memoryStore = memoryStore.filter(e => e._id !== id)
      setItems(memoryStore)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete'
      setError(msg)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <DataContext.Provider value={{ items, isLoading, error, getByType, getById, create, update, remove }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within a DataProvider')
  return context
}
