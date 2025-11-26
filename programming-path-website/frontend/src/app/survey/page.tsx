'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiService } from '@/services/api.service'
import { storageService } from '@/services/storage.service'
import { ProgressBar } from '@/components/ui'
import { SURVEY_QUESTIONS, type Question } from '@/constants/questions'
import type { SurveyData } from '@/types'

export default function Survey() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [surveyData, setSurveyData] = useState<Partial<SurveyData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getAllQuestions = (): Question[] => {
    let allQuestions = [...SURVEY_QUESTIONS.general]
    
    if (surveyData.role === 'software') {
      allQuestions = [...allQuestions, ...SURVEY_QUESTIONS.software, ...SURVEY_QUESTIONS.final]
    } else if (surveyData.role === 'data') {
      allQuestions = [...allQuestions, ...SURVEY_QUESTIONS.data, ...SURVEY_QUESTIONS.final]
    } else if (surveyData.role === 'both') {
      allQuestions = [...allQuestions, ...SURVEY_QUESTIONS.software, ...SURVEY_QUESTIONS.data, ...SURVEY_QUESTIONS.final]
    } else if (currentStep < SURVEY_QUESTIONS.general.length) {
      allQuestions = SURVEY_QUESTIONS.general
    }
    
    return allQuestions
  }

  const allQuestions = getAllQuestions()
  const currentQuestion = allQuestions[currentStep]
  const totalSteps = allQuestions.length

  const handleAnswer = (value: string | string[]) => {
    const newData = { ...surveyData }
    if (currentQuestion) {
      if (currentQuestion.multiple) {
        (newData as Record<string, unknown>)[currentQuestion.id] = Array.isArray(value) ? value : [value]
      } else {
        (newData as Record<string, unknown>)[currentQuestion.id] = Array.isArray(value) ? value[0] : value
      }
      setSurveyData(newData)
    }

    if (currentStep === totalSteps - 1) {
      submitSurvey(newData)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const submitSurvey = async (data: Partial<SurveyData>) => {
    setIsSubmitting(true)
    try {
      const result = await apiService.submitSurvey(data)
      storageService.setSurveyId(result.survey_id)
      router.push('/auth')
    } catch (error) {
      console.error('Error submitting survey:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    } else {
      router.push('/')
    }
  }

  const handleMultipleChoice = (value: string) => {
    const currentValues = Array.isArray(surveyData[currentQuestion?.id as keyof SurveyData]) 
      ? surveyData[currentQuestion?.id as keyof SurveyData] as string[]
      : []
    
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    
    setSurveyData(prev => ({
      ...prev,
      [currentQuestion?.id || '']: newValues
    }))
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl">Processing your responses...</p>
        </div>
      </div>
    )
  }

  const currentValues = Array.isArray(surveyData[currentQuestion.id as keyof SurveyData]) 
    ? surveyData[currentQuestion.id as keyof SurveyData] as string[]
    : []

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

      {/* Progress Bar */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <button onClick={goBack} className="text-orange-500 hover:text-orange-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-gray-400">
            {currentStep + 1}/{totalSteps}
          </span>
        </div>
        <ProgressBar current={currentStep + 1} total={totalSteps} />
      </div>

      {/* Question Content */}
      <main className="px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          {currentQuestion.title && (
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              {currentQuestion.title}
            </h1>
          )}
          
          {currentQuestion.subtitle && (
            <p className="text-gray-400 text-center mb-6">
              {currentQuestion.subtitle}
            </p>
          )}

          {currentQuestion.question && (
            <p className="text-xl text-center mb-8">
              {currentQuestion.question}
            </p>
          )}

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = currentQuestion.multiple
                ? currentValues.includes(option.value)
                : surveyData[currentQuestion.id as keyof SurveyData] === option.value

              return (
                <button
                  key={option.value}
                  onClick={() => {
                    if (currentQuestion.multiple) {
                      handleMultipleChoice(option.value)
                    } else {
                      handleAnswer(option.value)
                    }
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {option.icon && <span className="text-2xl">{option.icon}</span>}
                      <span className="text-lg">{option.label}</span>
                    </div>
                    {currentQuestion.multiple && (
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-600'
                      }`}>
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Continue button for multiple choice questions */}
          {currentQuestion.multiple && currentValues.length > 0 && (
            <button
              onClick={() => handleAnswer(currentValues)}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
            >
              Continue
            </button>
          )}
        </div>
      </main>
    </div>
  )
}
