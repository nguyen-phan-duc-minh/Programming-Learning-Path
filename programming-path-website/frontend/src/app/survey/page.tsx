'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiService, type SurveyData as ApiSurveyData } from '@/lib/api'

interface Option {
  value: string
  label: string
  icon?: string
}

type SurveyData = ApiSurveyData

interface Question {
  id: string
  title?: string
  subtitle?: string
  question?: string
  multiple?: boolean
  options: Option[]
}

const questions = {
  general: [
    {
      id: 'role',
      title: 'TOP CODING CLASSES COURSES',
      subtitle: 'Get personalized learning track and start improving your tech skills',
      question: 'I want to learn...',
      options: [
        { value: 'software', label: 'Software Development', icon: '⚙️' },
        { value: 'data', label: 'Data Science / Analytics', icon: '📊' },
        { value: 'both', label: 'Both', icon: '📊⚙️' }
      ]
    },
    {
      id: 'experience_level',
      title: 'How familiar are you with coding?',
      options: [
        { value: 'beginner', label: 'Starting from scratch' },
        { value: 'some_knowledge', label: 'Have some knowledge' },
        { value: 'intermediate', label: 'I know enough to be dangerous' }
      ]
    },
    {
      id: 'motivation',
      title: 'Why are you learning to code?',
      options: [
        { value: 'school', label: 'I need it for school' },
        { value: 'career', label: 'I need it for my career' },
        { value: 'project', label: 'I need for my own project' },
        { value: 'exercise', label: 'I want to learn it as a brain exercise' },
        { value: 'enjoy', label: 'I just enjoy coding' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'time_commitment',
      title: 'How much time do you want to commit to learning Data Science / Analytics?',
      options: [
        { value: 'less_30min', label: 'Less than 30 min/ week' },
        { value: '1hour', label: 'Up to 1 hour/ week' },
        { value: '2hours', label: 'Up to 2 hours/ week' },
        { value: '4hours', label: 'Up to 4 hours/ week' },
        { value: 'not_sure', label: 'Not sure yet' }
      ]
    },
    {
      id: 'devices',
      title: 'What devices would you like to use for learning?',
      subtitle: 'You can choose more than one option',
      multiple: true,
      options: [
        { value: 'desktop', label: 'Desktop' },
        { value: 'laptop', label: 'Laptop' },
        { value: 'tablet', label: 'Tablet' },
        { value: 'mobile', label: 'Mobile' }
      ]
    },
    {
      id: 'learning_style',
      title: 'Do you prefer starting from theory or diving into practice?',
      options: [
        { value: 'theory', label: 'Theory' },
        { value: 'practice', label: 'Practice' }
      ]
    }
  ],
  software: [
    {
      id: 'interests',
      title: 'Select all areas you are interested in',
      subtitle: 'You can choose more than one option',
      multiple: true,
      options: [
        { value: 'basic_syntax', label: 'Basic syntax' },
        { value: 'variables_types', label: 'Variables and types' },
        { value: 'loops_algorithms', label: 'Loops and common algorithms' },
        { value: 'functions', label: 'Functions' },
        { value: 'data_structures', label: 'Data structures' },
        { value: 'math_statistics', label: 'Mathematics and statistics' },
        { value: 'oop', label: 'Object-oriented programming' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'programming_experience',
      title: 'Have you programmed before in any language?',
      options: [
        { value: 'never', label: 'Never' },
        { value: 'little', label: 'A little' },
        { value: 'some', label: 'Some experience' },
        { value: 'experienced', label: 'Very experienced' }
      ]
    },
    {
      id: 'preferred_environment',
      title: 'What development environment do you prefer?',
      options: [
        { value: 'online', label: 'Online coding platforms' },
        { value: 'local', label: 'Local development setup' },
        { value: 'mobile', label: 'Mobile apps' },
        { value: 'no_preference', label: 'No preference' }
      ]
    },
    {
      id: 'project_type',
      title: 'What type of projects interest you most?',
      options: [
        { value: 'web_apps', label: 'Web applications' },
        { value: 'mobile_apps', label: 'Mobile applications' },
        { value: 'games', label: 'Games' },
        { value: 'automation', label: 'Automation scripts' },
        { value: 'apis', label: 'APIs and backend services' }
      ]
    },
    {
      id: 'learning_pace',
      title: 'What learning pace works best for you?',
      options: [
        { value: 'slow_steady', label: 'Slow and steady' },
        { value: 'moderate', label: 'Moderate pace' },
        { value: 'fast_intensive', label: 'Fast and intensive' },
        { value: 'flexible', label: 'Flexible based on my schedule' }
      ]
    }
  ],
  data: [
    {
      id: 'interests',
      title: 'Select all areas you are interested in',
      subtitle: 'You can choose more than one option',
      multiple: true,
      options: [
        { value: 'statistical_analysis', label: 'Statistical analysis' },
        { value: 'data_engineering', label: 'Data engineering' },
        { value: 'database_management', label: 'Database management' },
        { value: 'machine_learning', label: 'Machine learning' },
        { value: 'data_visualization', label: 'Data visualization' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'math_background',
      title: 'How comfortable are you with mathematics and statistics?',
      options: [
        { value: 'not_comfortable', label: 'Not comfortable at all' },
        { value: 'basic', label: 'Basic understanding' },
        { value: 'comfortable', label: 'Quite comfortable' },
        { value: 'expert', label: 'Expert level' }
      ]
    },
    {
      id: 'data_tools',
      title: 'Have you used any data analysis tools before?',
      multiple: true,
      options: [
        { value: 'excel', label: 'Excel/Google Sheets' },
        { value: 'sql', label: 'SQL' },
        { value: 'python', label: 'Python' },
        { value: 'r', label: 'R' },
        { value: 'tableau', label: 'Tableau/Power BI' },
        { value: 'none', label: 'None of the above' }
      ]
    },
    {
      id: 'industry_focus',
      title: 'Which industry are you most interested in applying data science?',
      options: [
        { value: 'finance', label: 'Finance' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'technology', label: 'Technology' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'research', label: 'Research/Academia' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'data_size_comfort',
      title: 'How comfortable are you working with large datasets?',
      options: [
        { value: 'small_only', label: 'Small datasets only (< 1000 rows)' },
        { value: 'medium', label: 'Medium datasets (1K-100K rows)' },
        { value: 'large', label: 'Large datasets (100K+ rows)' },
        { value: 'big_data', label: 'Big data (millions of records)' }
      ]
    }
  ],
  final: [
    // Câu hỏi 8-12 (sau role-specific questions)
    {
      id: 'confidence_level',
      title: 'How do you feel about learning to code?',
      options: [
        { value: 'stressed', label: 'Stressed' },
        { value: 'worried', label: 'Worried' },
        { value: 'uncertain', label: 'Uncertain' },
        { value: 'confident', label: 'Confident' }
      ]
    },
    {
      id: 'career_impact',
      title: 'Learning Python would improve my career prospects',
      options: [
        { value: 'disagree', label: 'Disagree' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'agree', label: 'Agree' }
      ]
    },
    {
      id: 'stress_level',
      title: 'I feel stressed when learning something completely new',
      options: [
        { value: 'disagree', label: 'Disagree' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'agree', label: 'Agree' }
      ]
    },
    {
      id: 'uncertainty',
      title: 'I would love to learn coding but just not sure what to start with',
      options: [
        { value: 'disagree', label: 'Disagree' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'agree', label: 'Agree' }
      ]
    },
    {
      id: 'barriers',
      title: 'What prevents me from learning coding is',
      options: [
        { value: 'fear', label: 'Fear' },
        { value: 'lack_knowledge', label: 'Lack of knowledge' },
        { value: 'lack_discipline', label: 'Lack of discipline' },
        { value: 'lack_time', label: 'Lack of time and focus' }
      ]
    },
    {
      id: 'python_benefits',
      title: 'I hear about benefits of knowing Python',
      options: [
        { value: 'rarely', label: 'Rarely' },
        { value: 'occasionally', label: 'Occasionally' },
        { value: 'often', label: 'Quite often' },
        { value: 'always', label: 'All the time' }
      ]
    },
    {
      id: 'quick_learning',
      title: 'Did you know that with right support you can learn coding in 7 days?',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      id: 'self_taught',
      title: 'Did you know that you can successfully learn coding without having tech degree?',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      id: 'data_growth',
      title: 'Did you know that 90% of data in the world was generated over the last two years?',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      id: 'salary_potential',
      title: 'Did you know that data professionals are making twice the average salary?',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      id: 'age_range',
      title: 'What is your age range?',
      options: [
        { value: 'under_18', label: 'Under 18' },
        { value: '18_24', label: '18-24' },
        { value: '25_34', label: '25-34' },
        { value: '35_44', label: '35-44' },
        { value: '45_54', label: '45-54' },
        { value: 'over_55', label: 'Over 55' }
      ]
    }
  ]
}

export default function Survey() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [surveyData, setSurveyData] = useState<Partial<SurveyData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const getAllQuestions = () => {
    let allQuestions = [...questions.general] // 6 câu hỏi chung
    
    if (surveyData.role === 'software') {
      // 6 chung + 5 software + 11 final = 22 câu hỏi
      allQuestions = [...allQuestions, ...questions.software, ...questions.final]
    } else if (surveyData.role === 'data') {
      // 6 chung + 5 data science + 11 final = 22 câu hỏi
      allQuestions = [...allQuestions, ...questions.data, ...questions.final]
    } else if (surveyData.role === 'both') {
      // 6 chung + 5 software + 5 data + 11 final = 27 câu hỏi (nhiều hơn vì học cả hai)
      allQuestions = [...allQuestions, ...questions.software, ...questions.data, ...questions.final]
    } else if (currentStep < questions.general.length) {
      // Vẫn trong các câu hỏi chung
      allQuestions = questions.general
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
        (newData as any)[currentQuestion.id] = Array.isArray(value) ? value : [value]
      } else {
        (newData as any)[currentQuestion.id] = Array.isArray(value) ? value[0] : value
      }
      setSurveyData(newData)
    }

    // If this is the last question, submit the survey
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
      
      // Store survey ID for later use with Google auth
      localStorage.setItem('surveyId', result.survey_id.toString())
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

  const handleMultipleChoice = (value: string, currentValues: string[] = []) => {
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    
    setSurveyData(prev => ({
      ...prev,
      [currentQuestion?.id || '']: newValues
    }))
  }

  if (!currentQuestion) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>
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
            {surveyData.role && (
              <span className="ml-2 text-xs text-orange-400">
                ({surveyData.role === 'both' ? '27 total' : '22 total'})
              </span>
            )}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <main className="px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          {currentQuestion.title && (
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {currentQuestion.title}
            </h1>
          )}
          
          {currentQuestion.subtitle && (
            <p className="text-gray-300 text-center mb-8">{currentQuestion.subtitle}</p>
          )}

          {currentQuestion.question && (
            <h2 className="text-2xl font-semibold text-center mb-8">{currentQuestion.question}</h2>
          )}

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  if (currentQuestion.multiple) {
                    handleMultipleChoice(option.value, currentValues)
                  } else {
                    handleAnswer(option.value)
                  }
                }}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  currentQuestion.multiple
                    ? currentValues.includes(option.value)
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                    : 'border-gray-600 hover:border-orange-500 hover:bg-orange-500/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {'icon' in option && option.icon && <span className="text-2xl">{option.icon}</span>}
                    <span className="text-lg">{option.label}</span>
                  </div>
                  {currentQuestion.multiple && (
                    <div className={`w-5 h-5 rounded border-2 ${
                      currentValues.includes(option.value)
                        ? 'bg-orange-500 border-orange-500'
                        : 'border-gray-400'
                    }`}>
                      {currentValues.includes(option.value) && (
                        <svg className="w-3 h-3 text-white m-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {currentQuestion.multiple && currentValues.length > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => handleAnswer(currentValues)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}