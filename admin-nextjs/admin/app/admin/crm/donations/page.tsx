'use client'

import { useData } from '@/lib/data-context'

export default function DonationsPage() {
  const { getByType, remove } = useData()
  const donations = getByType('donations')

  const total = donations.reduce((sum: number, d: any) => sum + (typeof d.amount === 'number' ? d.amount : 0), 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donations</h1>
          <p className="text-gray-500 mt-1">Track and manage donations</p>
        </div>
        <div className="text-sm bg-green-50 text-green-800 px-4 py-2 rounded-lg border border-green-200 font-semibold">
          Total: RWF {total.toLocaleString()}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount (RWF)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donations.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No donations recorded yet</td></tr>
            )}
            {donations.map(d => (
              <tr key={d._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{d.donorName as string || 'Anonymous'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{d.donorEmail as string || '-'}</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-800">{(d.amount as number)?.toLocaleString() || 0}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{d.campaign as string || 'General'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(d.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm">
                  <button onClick={() => { if (window.confirm('Delete this donation record?')) remove(d._id) }} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
