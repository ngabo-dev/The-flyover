'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTeam } from '@/lib/team-context'

const roles = [
  'Executive Director',
  'Program Director',
  'Senior Therapist',
  'Therapist',
  'Nurse',
  'Community Outreach Officer',
  'Education Specialist',
  'Nutritionist',
  'Advocate',
  'Volunteer',
]

function CreateTeamMemberForm() {
  const { createMember, updateMember, fetchMember, member, isLoading, error } = useTeam()
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  const isEditing = !!editId

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    image: '',
    bio: '',
    featured: false,
    socialLinks: { linkedin: '', twitter: '', facebook: '' },
  })

  useEffect(() => {
    if (editId) fetchMember(editId)
  }, [editId, fetchMember])

  useEffect(() => {
    if (isEditing && member && member._id === editId) {
      setFormData({
        name: member.name || '',
        role: member.role || '',
        email: member.email || '',
        phone: member.phone || '',
        image: member.image || '',
        bio: member.bio || '',
        featured: member.featured || false,
        socialLinks: {
          linkedin: member.socialLinks?.linkedin || '',
          twitter: member.socialLinks?.twitter || '',
          facebook: member.socialLinks?.facebook || '',
        },
      })
    }
  }, [member, editId, isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [platform]: value } }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isEditing && editId) {
        await updateMember(editId, formData as any)
      } else {
        await createMember(formData as any)
      }
      router.push('/admin/team')
    } catch (err) {
      console.error('Failed to save team member:', err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="text-green-800 hover:text-green-700 mb-6 inline-flex items-center">
        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{isEditing ? 'Edit Team Member' : 'Add Team Member'}</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">Error: {error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
              <select name="role" value={formData.role} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent">
                <option value="">Select a role</option>
                {roles.map(role => (<option key={role} value={role}>{role}</option>))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image URL</label>
            <input type="url" name="image" value={formData.image} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent" placeholder="https://example.com/image.jpg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent" placeholder="Brief description of the team member..." />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input type="url" value={formData.socialLinks.linkedin} onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent" placeholder="https://linkedin.com/in/username" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                <input type="url" value={formData.socialLinks.twitter} onChange={(e) => handleSocialLinkChange('twitter', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent" placeholder="https://twitter.com/username" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input type="url" value={formData.socialLinks.facebook} onChange={(e) => handleSocialLinkChange('facebook', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-transparent" placeholder="https://facebook.com/username" />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4 text-green-800 focus:ring-green-800 border-gray-300 rounded" />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">Featured team member</label>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={isLoading} className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2">
              {isLoading ? 'Saving...' : isEditing ? 'Update Team Member' : 'Create Team Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CreateTeamMemberPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800" /></div>}>
      <CreateTeamMemberForm />
    </Suspense>
  )
}
