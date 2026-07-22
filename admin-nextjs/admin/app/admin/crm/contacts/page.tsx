'use client'

import { useData } from '@/lib/data-context'

export default function ContactsPage() {
  const { getByType, remove } = useData()
  const contacts = getByType('contacts')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-500 mt-1">Form submissions and inquiries from the site</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contacts.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No contact submissions yet</td></tr>
            )}
            {contacts.map(contact => (
              <tr key={contact._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{contact.name as string}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{contact.email as string}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{contact.subject as string || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm">
                  <button onClick={() => { if (window.confirm('Delete this contact?')) remove(contact._id) }} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
