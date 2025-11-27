const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

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
        // Try to get error details from response
        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const errorData = await response.json()
          if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch {
          // If we can't parse the error response, use the default message
        }
        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error)
      throw error
    }
  }

  async submitSurvey(data: Partial<Record<string, unknown>>) {
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

  async getLearningPath(pathId: number) {
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
