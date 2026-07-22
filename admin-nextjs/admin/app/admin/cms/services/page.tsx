'use client'

import { useState } from 'react'
import { useData } from '@/lib/data-context'

export default function ServicesPage() {
  const { getByType, create, remove, isLoading } = useData()
  const services = getByType('services')
  const [form, setForm] = useState({ title: '', description: '', icon: '' })
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await create('services', form)
    setForm({ title: '', description: '', icon: '' })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 mt-1">Manage service offerings displayed on the site</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          {showForm ? 'Cancel' : 'Add Service'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name</label>
              <input type="text" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" placeholder="e.g., heart, book, hospital" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
            {isLoading ? 'Saving...' : 'Save Service'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.length === 0 && !showForm && (
          <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No services added yet</p>
          </div>
        )}
        {services.map(service => (
          <div key={service._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900">{service.title as string}</h3>
            <p className="text-sm text-gray-500 mt-2">{(service.description as string)?.substring(0, 120)}</p>
            <button onClick={() => { if (window.confirm('Delete this service?')) remove(service._id) }} className="text-red-600 hover:text-red-800 text-sm mt-4">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
