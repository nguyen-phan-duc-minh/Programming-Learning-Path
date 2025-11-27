'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Welcome() {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  const handleStart = () => {
    router.push('/survey')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}

      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold">&lt;/&gt;</span>
          </div>
          <span className="text-xl font-bold">codefinity</span>
        </div>
        <button
          onClick={() => setShowMenu(true)}
          className="text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

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
            <button onClick={() => setShowMenu(true)} className="text-orange-500 hover:underline">Terms & conditions</button>,{' '}
            <button onClick={() => setShowMenu(true)} className="text-orange-500 hover:underline">Privacy policy</button>,{' '}
            <button onClick={() => setShowMenu(true)} className="text-orange-500 hover:underline">Cookie policy</button>
          </div>
        </div>
      </main>
    </div>
  )
}
