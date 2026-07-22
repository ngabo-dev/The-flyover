'use client'

import { useData } from '@/lib/data-context'

export default function SubscribersPage() {
  const { getByType, remove } = useData()
  const subscribers = getByType('subscribers')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscribers</h1>
          <p className="text-gray-500 mt-1">Newsletter and email subscribers</p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
          Total: <strong>{subscribers.length}</strong>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscribers.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-500">No subscribers yet</td></tr>
            )}
            {subscribers.map(sub => (
              <tr key={sub._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{sub.email as string}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm">
                  <button onClick={() => { if (window.confirm('Remove this subscriber?')) remove(sub._id) }} className="text-red-600 hover:text-red-800">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
