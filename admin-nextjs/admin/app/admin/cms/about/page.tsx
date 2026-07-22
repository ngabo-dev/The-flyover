'use client'

import { useState } from 'react'
import { useData } from '@/lib/data-context'

export default function AboutPage() {
  const { getByType, create, update, isLoading } = useData()
  const items = getByType('about-content')
  const existing = items[0]
  const [form, setForm] = useState({ title: '', subtitle: '', content: '', mission: '', vision: '', imageUrl: '' })
  const [showForm, setShowForm] = useState(!existing)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (existing) {
      await update(existing._id, form)
    } else {
      await create('about-content', form)
    }
    setShowForm(false)
  }

  const handleEdit = () => {
    if (existing) {
      setForm({
        title: existing.title as string || '',
        subtitle: existing.subtitle as string || '',
        content: existing.content as string || '',
        mission: existing.mission as string || '',
        vision: existing.vision as string || '',
        imageUrl: existing.imageUrl as string || '',
      })
    }
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
          <p className="text-gray-500 mt-1">Manage the About page content</p>
        </div>
        {existing && !showForm && (
          <button onClick={handleEdit} className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Edit Content</button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
              <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input type="text" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Content</label>
              <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Our Mission</label>
              <textarea value={form.mission} onChange={e => setForm({ ...form, mission: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Our Vision</label>
              <textarea value={form.vision} onChange={e => setForm({ ...form, vision: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input type="url" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
            {isLoading ? 'Saving...' : existing ? 'Update Content' : 'Save Content'}
          </button>
        </form>
      )}

      {existing && !showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-2">{existing.title as string}</h2>
          <p className="text-gray-500 mb-4">{existing.subtitle as string}</p>
          <p className="text-gray-700 whitespace-pre-wrap mb-4">{existing.content as string}</p>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div><h3 className="font-semibold text-gray-900">Mission</h3><p className="text-gray-600 mt-1">{existing.mission as string || 'Not set'}</p></div>
            <div><h3 className="font-semibold text-gray-900">Vision</h3><p className="text-gray-600 mt-1">{existing.vision as string || 'Not set'}</p></div>
          </div>
        </div>
      )}

      {!existing && !showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No about content yet. Click "Add Content" to get started.</p>
        </div>
      )}
    </div>
  )
}
