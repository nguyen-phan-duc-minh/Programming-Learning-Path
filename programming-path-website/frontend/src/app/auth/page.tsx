'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { apiService } from '@/lib/api'

export default function Auth() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    
    try {
      // For demo purposes, simulate Google auth
      // In production, you would integrate with Google OAuth
      const mockToken = 'mock-google-token-' + Date.now()
      const surveyId = localStorage.getItem('surveyId')
      
      const result = await apiService.googleAuth(
        mockToken,
        surveyId ? parseInt(surveyId) : undefined
      )
      
      // Store auth token
      localStorage.setItem('authToken', result.token)
      localStorage.removeItem('surveyId')
      
      // If learning path is available, go to dashboard
      if (result.learning_path) {
        localStorage.setItem('learningPath', JSON.stringify(result.learning_path))
        router.push('/dashboard')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error during authentication:', error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl">Setting up your account...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold">&lt;/&gt;</span>
          </div>
          <span className="text-xl font-bold">codefinity</span>
        </div>
        <button className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-4">
            Enter your email to create the account and save your progress
          </h1>
          
          <p className="text-gray-400 text-center mb-8">
            Don&apos;t worry, we are not going to send you spam
          </p>

          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
            
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>We respect your privacy and are committed to protecting your personal data</span>
            </div>
          </div>

          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors mb-4"
          >
            Continue
          </button>

          <div className="text-center text-sm text-gray-400">
            Existing user?{' '}
            <button className="text-orange-500 hover:underline">
              Login
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}