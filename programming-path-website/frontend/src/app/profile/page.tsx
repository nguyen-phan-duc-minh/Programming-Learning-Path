'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UserAvatar } from '@/components/ui'
import type { User } from '@/lib/api'

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    const tempAccessToken = localStorage.getItem('tempAccessToken')
    const hasAccess = authToken || tempAccessToken
    
    if (!hasAccess) {
      router.push('/auth')
      return
    }

    // Load user info from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      // Create mock user from email if no user data
      const userEmail = localStorage.getItem('userEmail')
      if (userEmail) {
        const mockUser: User = {
          id: 0,
          name: userEmail.split('@')[0],
          email: userEmail,
          created_at: new Date().toISOString()
        }
        setUser(mockUser)
      }
    }
    
    setIsLoading(false)
  }, [router])

  const logout = () => {
    localStorage.clear()
    router.push('/')
  }

  const handleBack = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No user found</h1>
          <button
            onClick={() => router.push('/auth')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold">&lt;/&gt;</span>
              </div>
              <span className="text-xl font-bold">codefinity</span>
            </button>
            <div className="flex items-center space-x-4">
              {user && (
                <UserAvatar 
                  user={user} 
                  showName={true} 
                  showDropdown={true}
                  onProfile={() => {}}
                  onLogout={logout}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Profile Header */}
        <div className="bg-gray-800 rounded-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-3xl shrink-0">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{user.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-gray-400 text-lg mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                  Active Learner
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  Member since {formatDate(user.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
          
          <div className="space-y-6">
            {/* User ID */}
            <div className="border-b border-gray-700 pb-4">
              <label className="text-sm text-gray-400 mb-1 block">User ID</label>
              <p className="text-lg text-white">{user.id === 0 ? 'Guest User' : `#${user.id}`}</p>
            </div>

            {/* Full Name */}
            <div className="border-b border-gray-700 pb-4">
              <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
              <p className="text-lg text-white">{user.name}</p>
            </div>

            {/* Email */}
            <div className="border-b border-gray-700 pb-4">
              <label className="text-sm text-gray-400 mb-1 block">Email Address</label>
              <p className="text-lg text-white">{user.email}</p>
            </div>

            {/* Account Type */}
            <div className="border-b border-gray-700 pb-4">
              <label className="text-sm text-gray-400 mb-1 block">Account Type</label>
              <p className="text-lg text-white">
                {user.id === 0 ? 'Guest Account' : 'Registered Account'}
              </p>
            </div>

            {/* Member Since */}
            <div className="pb-4">
              <label className="text-sm text-gray-400 mb-1 block">Member Since</label>
              <p className="text-lg text-white">{formatDate(user.created_at)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={logout}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  )
}
