'use client'

import Link from 'next/link'
import { useTeam } from '@/lib/team-context'
import { useData } from '@/lib/data-context'

export default function DashboardPage() {
  const { members, isLoading: teamLoading } = useTeam()
  const { getByType } = useData()

  const services = getByType('services')
  const events = getByType('events')
  const testimonials = getByType('testimonials')
  const partners = getByType('partners')
  const contacts = getByType('contacts')
  const subscribers = getByType('subscribers')
  const donations = getByType('donations')
  const heroSlides = getByType('hero-slides')
  const aboutItems = getByType('about-content')

  const totalDonations = donations.reduce((sum: number, d: any) => sum + (typeof d.amount === 'number' ? d.amount : 0), 0)
  const roles = Array.from(new Set(members.map(m => m.role)))
  const featuredCount = members.filter(m => m.featured).length
  const totalItems = members.length + services.length + events.length + testimonials.length + partners.length + contacts.length + subscribers.length + donations.length + heroSlides.length + aboutItems.length

  const barData = [
    { label: 'Team', count: members.length, color: '#166534', href: '/admin/team' },
    { label: 'Services', count: services.length, color: '#15803d', href: '/admin/cms/services' },
    { label: 'Events', count: events.length, color: '#16a34a', href: '/admin/cms/events' },
    { label: 'Testimonials', count: testimonials.length, color: '#22c55e', href: '/admin/cms/testimonials' },
    { label: 'Partners', count: partners.length, color: '#4ade80', href: '/admin/cms/partners' },
    { label: 'Contacts', count: contacts.length, color: '#86efac', href: '/admin/crm/contacts' },
    { label: 'Subscribers', count: subscribers.length, color: '#bbf7d0', href: '/admin/crm/subscribers' },
    { label: 'Donations', count: donations.length, color: '#dcfce7', href: '/admin/crm/donations' },
  ]

  const maxCount = Math.max(...barData.map(d => d.count), 1)

  const roleCounts = roles.map(role => ({
    role,
    count: members.filter(m => m.role === role).length,
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500" suppressHydrationWarning>
          Last updated: {new Date().toLocaleDateString('en-GB')}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-800 to-green-700 text-white rounded-lg p-5">
          <p className="text-green-100 text-sm font-medium">Total Items</p>
          <p className="text-3xl font-bold mt-1">{totalItems}</p>
          <p className="text-green-200 text-xs mt-1">Across all sections</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <p className="text-gray-500 text-sm font-medium">Team Members</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{members.length}</p>
          <p className="text-green-700 text-xs mt-1">{featuredCount} featured</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <p className="text-gray-500 text-sm font-medium">Donations</p>
          <p className="text-3xl font-bold text-green-800 mt-1">{donations.length}</p>
          <p className="text-green-700 text-xs mt-1">RWF {totalDonations.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <p className="text-gray-500 text-sm font-medium">Contacts</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{contacts.length}</p>
          <p className="text-green-700 text-xs mt-1">{subscribers.length} subscribers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Overview</h2>
          <div className="space-y-3">
            {barData.map(item => (
              <Link key={item.label} href={item.href} className="block group">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600 group-hover:text-gray-900">{item.label}</span>
                  <span className="font-semibold text-gray-900">{item.count}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                    style={{ width: `${(item.count / maxCount) * 100}%`, backgroundColor: item.color }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Role Distribution</h2>
          {teamLoading ? (
            <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div></div>
          ) : roleCounts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No team members yet</p>
          ) : (
            <div className="space-y-3">
              {roleCounts.map(({ role, count }) => (
                <div key={role}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">{role}</span>
                    <span className="font-semibold text-gray-900">{count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-green-700 transition-all duration-500"
                      style={{ width: `${(count / Math.max(...roleCounts.map(r => r.count), 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total roles</span>
              <span className="font-semibold text-gray-900">{roles.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 42 42" className="w-48 h-48">
              {donations.length > 0 || members.length > 0 ? (
                <>
                  <circle cx="21" cy="21" r="15.9" fill="#f3f4f6" />
                  {donations.length > 0 && (
                    <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#166534" strokeWidth="3.2"
                      strokeDasharray={`${(donations.length / Math.max(totalItems, 1)) * 100} ${100 - (donations.length / Math.max(totalItems, 1)) * 100}`}
                      strokeDashoffset="25" transform="rotate(-90) translate(-42)" />
                  )}
                  {members.length > 0 && (
                    <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#22c55e" strokeWidth="3.2"
                      strokeDasharray={`${(members.length / Math.max(totalItems, 1)) * 100} ${100 - (members.length / Math.max(totalItems, 1)) * 100}`}
                      strokeDashoffset={`${25 - (donations.length / Math.max(totalItems, 1)) * 100}`} transform="rotate(-90) translate(-42)" />
                  )}
                  {services.length > 0 && (
                    <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#4ade80" strokeWidth="3.2"
                      strokeDasharray={`${(services.length / Math.max(totalItems, 1)) * 100} ${100 - (services.length / Math.max(totalItems, 1)) * 100}`}
                      strokeDashoffset={`${25 - ((donations.length + members.length) / Math.max(totalItems, 1)) * 100}`} transform="rotate(-90) translate(-42)" />
                  )}
                  {events.length > 0 && (
                    <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#86efac" strokeWidth="3.2"
                      strokeDasharray={`${(events.length / Math.max(totalItems, 1)) * 100} ${100 - (events.length / Math.max(totalItems, 1)) * 100}`}
                      strokeDashoffset={`${25 - ((donations.length + members.length + services.length) / Math.max(totalItems, 1)) * 100}`} transform="rotate(-90) translate(-42)" />
                  )}
                </>
              ) : (
                <circle cx="21" cy="21" r="15.9" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1" />
              )}
              <text x="21" y="21" textAnchor="middle" dominantBaseline="central" className="text-2xl font-bold fill-gray-900">{totalItems}</text>
              <text x="21" y="28" textAnchor="middle" dominantBaseline="central" className="text-xs fill-gray-500">total</text>
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#166534' }} /> Donations ({donations.length})</div>
            <div className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#22c55e' }} /> Team ({members.length})</div>
            <div className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#4ade80' }} /> Services ({services.length})</div>
            <div className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#86efac' }} /> Events ({events.length})</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Link href="/admin/team/create" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="w-9 h-9 bg-green-800 rounded-lg flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </div>
              <div><p className="font-medium text-gray-900 text-sm">Add Team Member</p><p className="text-xs text-gray-500">Create a new team profile</p></div>
            </Link>
            <Link href="/admin/cms/services" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="w-9 h-9 bg-blue-700 rounded-lg flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" /></svg>
              </div>
              <div><p className="font-medium text-gray-900 text-sm">Manage Services</p><p className="text-xs text-gray-500">Update service offerings</p></div>
            </Link>
            <Link href="/admin/cms/events" className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="w-9 h-9 bg-purple-700 rounded-lg flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div><p className="font-medium text-gray-900 text-sm">Add Event</p><p className="text-xs text-gray-500">Create a new event or program</p></div>
            </Link>
            <Link href="/admin/settings/site" className="flex items-center p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
              <div className="w-9 h-9 bg-amber-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div><p className="font-medium text-gray-900 text-sm">Site Settings</p><p className="text-xs text-gray-500">Configure site-wide options</p></div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Featured Team Members</h2>
          <Link href="/admin/team" className="text-green-800 hover:text-green-700 font-medium text-sm">View all</Link>
        </div>
        {teamLoading ? (
          <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div></div>
        ) : members.filter(m => m.featured).length === 0 ? (
          <p className="text-gray-500 text-center py-8">No featured team members yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {members.filter(m => m.featured).map((member) => (
              <Link key={member._id} href={`/admin/team/${member._id}`} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3 hover:bg-green-50 transition-colors">
                <div className="h-10 w-10 rounded-full bg-green-800/20 flex items-center justify-center flex-shrink-0">
                  {member.image ? (
                    <img className="h-10 w-10 rounded-full object-cover" src={member.image} alt={member.name} />
                  ) : (
                    <span className="text-sm font-medium text-green-800">{member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{member.name}</div>
                  <div className="text-xs text-gray-500 truncate">{member.role}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
