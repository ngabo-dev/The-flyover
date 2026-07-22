'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTeam } from '@/lib/team-context'

export default function TeamMemberDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { member, isLoading, error, fetchMember } = useTeam()

  useEffect(() => {
    fetchMember(id)
  }, [id, fetchMember])

  if (isLoading && !member) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
        Error: {error}
      </div>
    )
  }

  if (!member) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Team member not found</h1>
        <button
          onClick={() => router.push('/admin/team')}
          className="text-green-800 hover:text-green-700"
        >
          Back to team list
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="text-green-800 hover:text-green-700 inline-flex items-center"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <Link
          href={`/admin/team/create?edit=${id}`}
          className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Edit</span>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-green-800/20 flex items-center justify-center mr-6 flex-shrink-0">
              {member.image ? (
                <img className="h-20 w-20 rounded-full object-cover" src={member.image} alt={member.name} />
              ) : (
                <span className="text-2xl font-medium text-green-800">
                  {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
              <p className="text-green-800 font-medium">{member.role}</p>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                member.featured ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {member.featured ? 'Featured' : 'Regular'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-gray-900">{member.email || 'Not provided'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="text-gray-900">{member.phone || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h2>
              <div className="space-y-3">
                {member.socialLinks?.linkedin && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">LinkedIn</h3>
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-green-800 hover:text-green-700">
                      View Profile
                    </a>
                  </div>
                )}
                {member.socialLinks?.twitter && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Twitter</h3>
                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-green-800 hover:text-green-700">
                      View Profile
                    </a>
                  </div>
                )}
                {member.socialLinks?.facebook && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Facebook</h3>
                    <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-green-800 hover:text-green-700">
                      View Profile
                    </a>
                  </div>
                )}
                {!member.socialLinks?.linkedin && !member.socialLinks?.twitter && !member.socialLinks?.facebook && (
                  <p className="text-gray-500">No social media links provided</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Bio</h2>
            <p className="text-gray-900 whitespace-pre-wrap">{member.bio || 'No bio provided'}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-500" suppressHydrationWarning>
              <span>Created: {new Date(member.createdAt).toLocaleDateString('en-GB')}</span>
              <span>Last Updated: {new Date(member.updatedAt).toLocaleDateString('en-GB')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
