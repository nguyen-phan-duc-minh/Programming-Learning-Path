'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ANALYSIS_STEPS = [
  { id: 1, text: 'Analyzing your current skill level' },
  { id: 2, text: 'Analyzing your preferences' },
  { id: 3, text: 'Analyzing your match in the IT market' },
  { id: 4, text: 'Picking the best materials and insights' },
  { id: 5, text: 'Finding the best learning practices for people like you' },
  { id: 6, text: 'Creating your personal learning plan' }
]

export default function Welcome() {
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isAnalyzing) return

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= ANALYSIS_STEPS.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 500)

    const timeout = setTimeout(() => {
      router.push('/survey')
    }, 3500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearTimeout(timeout)
    }
  }, [isAnalyzing, router])

  const handleStart = () => {
    setIsAnalyzing(true)
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-2xl w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-12 animate-fade-in">
            Analyzing your skills growth potential
          </h1>
          
          <div className="relative w-48 h-48 mx-auto mb-12">
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-700"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                className="text-orange-500 transition-all duration-300 ease-out"
                strokeLinecap="round"
              />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold">{progress}%</div>
              </div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-orange-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-3">
            {ANALYSIS_STEPS.map((step, index) => {
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep
              const isPending = index > currentStep

              return (
                <div
                  key={step.id}
                  className={`flex items-center justify-center space-x-3 transition-all duration-500 ${
                    isPending ? 'opacity-40' : 'opacity-100'
                  }`}
                  style={{
                    transform: isCurrent ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease-out'
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    {isCompleted && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-scale-in">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    {isCurrent && (
                      <div className="relative">
                        <div className="w-5 h-5 bg-yellow-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-5 h-5 bg-yellow-500 rounded-full animate-ping"></div>
                      </div>
                    )}
                    {isPending && (
                      <div className="w-5 h-5 bg-gray-600 rounded-full"></div>
                    )}
                  </div>

                  <span className={`text-sm md:text-base transition-colors duration-300 ${
                    isCompleted ? 'text-gray-300' : 
                    isCurrent ? 'text-white font-medium' : 
                    'text-gray-500'
                  }`}>
                    {step.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scale-in {
            from {
              transform: scale(0);
            }
            to {
              transform: scale(1);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }

          .animate-scale-in {
            animation: scale-in 0.3s ease-out;
          }
        `}</style>
      </div>
    )
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
