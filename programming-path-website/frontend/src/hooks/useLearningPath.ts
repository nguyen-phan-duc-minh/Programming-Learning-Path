import { useState, useEffect } from 'react'
import type { LearningPathWithSchedules } from '@/types'
import { apiService } from '@/services/api.service'
import { storageService } from '@/services/storage.service'

export function useLearningPath() {
  const [learningPath, setLearningPath] = useState<LearningPathWithSchedules | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLearningPath()
  }, [])

  const loadLearningPath = async () => {
    try {
      const storedPath = storageService.getLearningPath()
      if (storedPath && 'id' in storedPath) {
        const data = await apiService.getLearningPath(storedPath.id as number)
        setLearningPath(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load learning path')
    } finally {
      setIsLoading(false)
    }
  }

  const markDayComplete = async (scheduleId: number) => {
    try {
      const authToken = storageService.getAuthToken()
      if (!authToken) throw new Error('No auth token')

      await apiService.completeDailySchedule(scheduleId, authToken)
      
      if (learningPath) {
        const updatedSchedules = learningPath.daily_schedules.map(schedule =>
          schedule.id === scheduleId ? { ...schedule, completed: true } : schedule
        )
        setLearningPath({ ...learningPath, daily_schedules: updatedSchedules })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark day complete')
      throw err
    }
  }

  const getProgress = () => {
    if (!learningPath) return { completed: 0, total: 0, percentage: 0 }
    
    const completed = learningPath.daily_schedules.filter(day => day.completed).length
    const total = learningPath.daily_schedules.length
    const percentage = Math.round((completed / total) * 100)
    
    return { completed, total, percentage }
  }

  const getTotalHours = () => {
    if (!learningPath) return 0
    return learningPath.daily_schedules.reduce((sum, day) => sum + day.estimated_hours, 0)
  }

  return {
    learningPath,
    isLoading,
    error,
    markDayComplete,
    getProgress,
    getTotalHours,
    reload: loadLearningPath,
  }
}
