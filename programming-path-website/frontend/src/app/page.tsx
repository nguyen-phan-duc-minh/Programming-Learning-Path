'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleStart = () => {
    setIsAnalyzing(true)
    // Simulate analysis time
    setTimeout(() => {
      router.push('/survey')
    }, 3000)
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Analyzing your skills growth potential</h1>
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-gray-600 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-orange-500 rounded-full animate-pulse" style={{
              background: `conic-gradient(from 0deg, #f97316 0deg, #f97316 280deg, transparent 280deg)`
            }}></div>
            <div className="absolute inset-4 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">78%</span>
            </div>
          </div>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Analyzing your current skill level</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Analyzing your preferences</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Analyzing your match in the IT market</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Picking the best materials and insights</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
              <span>Finding the best learning practices for people like you</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
              <span className="text-gray-500">Creating your personal learning plan</span>
            </div>
          </div>
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

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Over 1.5 million people have chosen{' '}
            <span className="text-orange-500">Codefinity</span>
          </h1>
          
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="text-gray-300">
              <span className="text-sm">Computerworld</span>
              <div className="text-sm font-semibold">Top IT certification provider</div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-12 rounded-lg text-lg transition-colors"
          >
            Continue
          </button>

          <div className="mt-6 text-sm text-gray-400">
            By continuing I agree with{' '}
            <a href="#" className="text-orange-500 hover:underline">Terms & conditions</a>,{' '}
            <a href="#" className="text-orange-500 hover:underline">Privacy policy</a>,{' '}
            <a href="#" className="text-orange-500 hover:underline">Cookie policy</a>
          </div>
        </div>
      </main>
    </div>
  )
}
