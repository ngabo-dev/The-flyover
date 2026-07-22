'use client'

import { useState } from 'react'
import { useData } from '@/lib/data-context'

export default function NavigationPage() {
  const { getByType, create, update, remove, isLoading } = useData()
  const links = getByType('navigation-links')
  const [form, setForm] = useState({ label: '', href: '', order: links.length + 1 })
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await update(editingId, form)
      setEditingId(null)
    } else {
      await create('navigation-links', form)
    }
    setForm({ label: '', href: '', order: links.length + 1 })
    setShowForm(false)
  }

  const handleEdit = (link: any) => {
    setForm({ label: link.label as string, href: link.href as string, order: link.order as number })
    setEditingId(link._id)
    setShowForm(true)
  }

  const sortedLinks = [...links].sort((a: any, b: any) => (a.order || 0) - (b.order || 0))

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Navigation</h1>
          <p className="text-gray-500 mt-1">Manage site navigation menu links</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ label: '', href: '', order: links.length + 1 }) }} className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          {showForm ? 'Cancel' : 'Add Link'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
              <input type="text" value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
              <input type="text" value={form.href} onChange={e => setForm({ ...form, href: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" placeholder="/page-name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input type="number" value={form.order} onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
            {isLoading ? 'Saving...' : editingId ? 'Update Link' : 'Add Link'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Label</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedLinks.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">No navigation links yet</td></tr>
            )}
            {sortedLinks.map(link => (
              <tr key={link._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">{link.order as number}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{link.label as string}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{link.href as string}</td>
                <td className="px-6 py-4 text-sm space-x-3">
                  <button onClick={() => handleEdit(link)} className="text-green-800 hover:text-green-700">Edit</button>
                  <button onClick={() => { if (window.confirm('Delete this link?')) remove(link._id) }} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
