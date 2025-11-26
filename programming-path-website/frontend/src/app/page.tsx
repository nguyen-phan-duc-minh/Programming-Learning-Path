'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  const handleRoleSelect = (role: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedRole', role)
    }
    router.push('/auth')
  }

  const MenuSidebar = () => (
    <div className={`fixed inset-y-0 right-0 w-80 bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
      showMenu ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="p-6">
        <button
          onClick={() => setShowMenu(false)}
          className="absolute top-6 right-6 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-12 space-y-6">
          <a href="#" className="block text-orange-500 hover:text-orange-400 text-lg">Terms & conditions</a>
          <a href="#" className="block text-orange-500 hover:text-orange-400 text-lg">Privacy policy</a>
          <a href="#" className="block text-orange-500 hover:text-orange-400 text-lg">Cookie policy</a>
          <a href="#" className="block text-orange-500 hover:text-orange-400 text-lg">Subscription terms</a>
          <a href="#" className="block text-orange-500 hover:text-orange-400 text-lg">Online Dispute Resolution</a>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700">
          <h3 className="text-white font-semibold mb-2">Contact us</h3>
          <a href="mailto:support@codefinity.com" className="text-orange-500 hover:text-orange-400">
            support@codefinity.com
          </a>
        </div>

        <div className="mt-6">
          <h3 className="text-white font-semibold mb-2">Address</h3>
          <p className="text-gray-400 text-sm">
            Ucode Limited<br />
            Florinis 7,<br />
            Greg Tower, 2nd Floor,<br />
            1065, Nicosia, Cyprus
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}

      <MenuSidebar />

      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white font-bold">&lt;/&gt;</span>
          </div>
          <span className="text-xl font-bold">codefinity</span>
        </div>
        <button
          onClick={() => setShowMenu(true)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            TOP CODING CLASSES COURSES
          </h1>
          
          <p className="text-gray-300 text-lg mb-12">
            Get personalized learning track and start improving your tech skills
          </p>

          <h2 className="text-2xl font-semibold mb-8">I want to learn...</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            <button
              onClick={() => handleRoleSelect('software')}
              className="bg-orange-500 hover:bg-orange-600 text-white p-8 rounded-2xl flex items-center justify-between transition-all transform hover:scale-105"
            >
              <span className="text-xl font-semibold text-left">Software Development</span>
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                <span className="text-3xl">⚙️</span>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect('data')}
              className="bg-orange-500 hover:bg-orange-600 text-white p-8 rounded-2xl flex items-center justify-between transition-all transform hover:scale-105"
            >
              <span className="text-xl font-semibold text-left">Data Science / Analytics</span>
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                <span className="text-3xl">📊</span>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelect('both')}
              className="bg-orange-500 hover:bg-orange-600 text-white p-8 rounded-2xl flex items-center justify-between transition-all transform hover:scale-105"
            >
              <span className="text-xl font-semibold text-left">Both</span>
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
                <span className="text-2xl">📊⚙️</span>
              </div>
            </button>
          </div>

          <div className="text-sm text-gray-400">
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
