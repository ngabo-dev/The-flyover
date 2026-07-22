'use client'

import { useState } from 'react'
import { useData } from '@/lib/data-context'

export default function PartnersPage() {
  const { getByType, create, remove, isLoading } = useData()
  const partners = getByType('partners')
  const [form, setForm] = useState({ name: '', website: '', logoUrl: '', description: '' })
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await create('partners', form)
    setForm({ name: '', website: '', logoUrl: '', description: '' })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partners</h1>
          <p className="text-gray-500 mt-1">Manage partner organizations</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          {showForm ? 'Cancel' : 'Add Partner'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input type="url" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
              <input type="url" value={form.logoUrl} onChange={e => setForm({ ...form, logoUrl: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
            {isLoading ? 'Saving...' : 'Save Partner'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.length === 0 && !showForm && (
          <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No partners added yet</p>
          </div>
        )}
        {partners.map(partner => {
          const logoUrl = partner.logoUrl as string | undefined
          const name = partner.name as string
          const website = partner.website as string | undefined
          return (
          <div key={partner._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center space-x-4">
            {logoUrl && <img src={logoUrl} alt={name} className="h-12 w-12 object-contain" />}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
              {website && <a href={website} className="text-sm text-green-800 hover:text-green-700 truncate block">{website}</a>}
              <button onClick={() => { if (window.confirm('Remove this partner?')) remove(partner._id) }} className="text-red-600 hover:text-red-800 text-sm mt-1">Remove</button>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
