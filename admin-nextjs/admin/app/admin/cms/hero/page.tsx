'use client'

import { useState } from 'react'
import { useData } from '@/lib/data-context'

export default function HeroBannerPage() {
  const { getByType, create, remove, isLoading } = useData()
  const slides = getByType('hero-slides')
  const [form, setForm] = useState({ title: '', subtitle: '', buttonText: '', buttonLink: '', imageUrl: '' })
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await create('hero-slides', form)
    setForm({ title: '', subtitle: '', buttonText: '', buttonLink: '', imageUrl: '' })
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hero Banner</h1>
          <p className="text-gray-500 mt-1">Manage hero banner slides</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Slide'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input type="text" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input type="text" value={form.buttonText} onChange={e => setForm({ ...form, buttonText: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
              <input type="text" value={form.buttonLink} onChange={e => setForm({ ...form, buttonLink: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
              <input type="url" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" placeholder="https://example.com/image.jpg" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
            {isLoading ? 'Saving...' : 'Save Slide'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subtitle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Button</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {slides.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">No hero slides yet</td></tr>
            )}
            {slides.map(slide => (
              <tr key={slide._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{slide.title as string}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{(slide.subtitle as string)?.substring(0, 60) || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{slide.buttonText as string || '-'}</td>
                <td className="px-6 py-4 text-sm">
                  <button onClick={() => { if (window.confirm('Delete this slide?')) remove(slide._id) }} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
