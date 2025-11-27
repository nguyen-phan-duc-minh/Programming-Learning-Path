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

export default function Analyzing() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Check if we have survey data, if not redirect to survey
    const surveyId = localStorage.getItem('surveyId')
    if (!surveyId) {
      router.push('/survey')
      return
    }

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    // Step progression animation
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= ANALYSIS_STEPS.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 500)

    // Navigate to dashboard after animation completes
    const timeout = setTimeout(() => {
      router.push('/dashboard')
    }, 3500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
      clearTimeout(timeout)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-6">
      <style jsx global>{`
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
    </div>
  )
}
