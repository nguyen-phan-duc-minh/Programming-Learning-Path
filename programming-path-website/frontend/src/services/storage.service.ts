class StorageService {
  // Auth Token
  getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('authToken')
  }

  setAuthToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('authToken', token)
  }

  removeAuthToken(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('authToken')
  }

  // Survey ID
  getSurveyId(): number | null {
    if (typeof window === 'undefined') return null
    const id = localStorage.getItem('surveyId')
    return id ? parseInt(id) : null
  }

  setSurveyId(id: number): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('surveyId', id.toString())
  }

  removeSurveyId(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('surveyId')
  }

  // Learning Path
  getLearningPath(): Record<string, unknown> | null {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem('learningPath')
    return data ? JSON.parse(data) : null
  }

  setLearningPath(path: Record<string, unknown>): void {
    if (typeof window === 'undefined') return
    localStorage.setItem('learningPath', JSON.stringify(path))
  }

  removeLearningPath(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('learningPath')
  }

  // Clear all data
  clearAll(): void {
    if (typeof window === 'undefined') return
    this.removeAuthToken()
    this.removeSurveyId()
    this.removeLearningPath()
  }
}

export const storageService = new StorageService()
