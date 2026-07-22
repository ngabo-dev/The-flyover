'use client'

import { useState } from 'react'
import { useData } from '@/lib/data-context'

export default function TestimonialsPage() {
  const { getByType, create, remove, isLoading } = useData()
  const testimonials = getByType('testimonials')
  const [form, setForm] = useState({ name: '', title: '', content: '', rating: 5 })
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await create('testimonials', form)
    setForm({ name: '', title: '', content: '', rating: 5 })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage testimonials and reviews</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          {showForm ? 'Cancel' : 'Add Testimonial'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title / Role</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Content</label>
              <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={3} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
              <input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) || 5 })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
            {isLoading ? 'Saving...' : 'Save Testimonial'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.length === 0 && !showForm && (
          <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No testimonials yet</p>
          </div>
        )}
        {testimonials.map(t => (
          <div key={t._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-2">
              <span className="text-yellow-400">{'★'.repeat(t.rating as number || 5)}</span>
              <span className="text-gray-300">{'★'.repeat(5 - (t.rating as number || 5))}</span>
            </div>
            <p className="text-gray-700 italic mb-4">&ldquo;{(t.content as string)?.substring(0, 200)}&rdquo;</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{t.name as string}</p>
                {(t.title as string) && <p className="text-sm text-gray-500">{t.title as string}</p>}
              </div>
              <button onClick={() => { if (window.confirm('Delete this testimonial?')) remove(t._id) }} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
