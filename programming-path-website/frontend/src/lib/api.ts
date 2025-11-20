const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

export interface SurveyData {
  role: string
  experience_level: string
  motivation: string
  time_commitment: string
  devices: string | string[]
  learning_style: string
  interests: string | string[]
  // Software-specific fields
  programming_experience?: string
  preferred_environment?: string
  project_type?: string
  learning_pace?: string
  // Data science-specific fields
  math_background?: string
  data_tools?: string | string[]
  industry_focus?: string
  data_size_comfort?: string
  // Final assessment fields
  confidence_level: string
  career_impact: string
  stress_level: string
  uncertainty: string
  barriers: string
  python_benefits: string
  quick_learning: string
  self_taught: string
  data_growth: string
  salary_potential: string
  age_range: string
}

export interface LearningPath {
  id: number
  title: string
  description: string
  duration_days: number
}

export interface Video {
  title: string
  url: string
  duration: string
}

export interface Resource {
  title: string
  url: string
  type: string
}

export interface DailySchedule {
  id: number
  day_number: number
  title: string
  content: string
  estimated_hours: number
  topics: string[]
  videos: Video[]
  resources: Resource[]
  completed: boolean
}

export interface LearningPathWithSchedules extends LearningPath {
  daily_schedules: DailySchedule[]
}

class ApiService {
  private async fetchApi(endpoint: string, options?: RequestInit) {
    const url = `${API_BASE_URL}${endpoint}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error)
      throw error
    }
  }

  async submitSurvey(data: Partial<SurveyData>) {
    return this.fetchApi('/api/survey', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async googleAuth(token: string, surveyId?: number) {
    return this.fetchApi('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        token,
        survey_id: surveyId,
      }),
    })
  }

  async getLearningPath(pathId: number): Promise<LearningPathWithSchedules> {
    return this.fetchApi(`/api/learning-path/${pathId}`)
  }

  async completeDailySchedule(scheduleId: number, authToken: string) {
    return this.fetchApi(`/api/daily-schedule/${scheduleId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
  }

  async healthCheck() {
    return this.fetchApi('/api/health')
  }
}

export const apiService = new ApiService()