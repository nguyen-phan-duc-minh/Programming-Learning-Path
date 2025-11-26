'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Auth() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [showMenu, setShowMenu] = useState(false)

  const handleContinue = () => {
    if (email) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userEmail', email)
      }
      router.push('/welcome')
    }
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
          className="text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleContinue()}
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
            onClick={handleContinue}
            disabled={!email}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors mb-4"
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