'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { apiService, type LearningPathWithSchedules as LearningPath, type DailySchedule, type Video, type Resource, type User } from '@/lib/api'
import { UserAvatar } from '@/components/ui'

export default function Dashboard() {
  const router = useRouter()
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState<DailySchedule | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    const tempAccessToken = localStorage.getItem('tempAccessToken')
    const hasAccess = authToken || tempAccessToken
    
    if (!hasAccess) {
      router.push('/auth')
      return
    }

    // Load user info from localStorage or fetch if we have authToken
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else if (authToken) {
      fetchUserInfo(authToken)
    } else {
      // Create a mock user from email if no auth token
      const userEmail = localStorage.getItem('userEmail')
      if (userEmail) {
        const mockUser: User = {
          id: 0,
          name: userEmail.split('@')[0],
          email: userEmail,
          created_at: new Date().toISOString()
        }
        setUser(mockUser)
        localStorage.setItem('user', JSON.stringify(mockUser))
      }
    }

    // Try to get learning path from localStorage first
    const storedPath = localStorage.getItem('learningPath')
    if (storedPath) {
      const pathData = JSON.parse(storedPath)
      fetchFullLearningPath(pathData.id)
    } else {
      setIsLoading(false)
    }
  }, [router])

  const fetchUserInfo = async (authToken: string) => {
    try {
      const userData = await apiService.getUserInfo(authToken)
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }

  const fetchFullLearningPath = async (pathId: number) => {
    try {
      const data = await apiService.getLearningPath(pathId)
      setLearningPath(data)
    } catch (error) {
      console.error('Error fetching learning path:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const markDayComplete = async (scheduleId: number) => {
    try {
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        router.push('/auth')
        return
      }

      await apiService.completeDailySchedule(scheduleId, authToken)
      
      if (learningPath) {
        // Update local state
        const updatedSchedules = learningPath.daily_schedules.map(schedule =>
          schedule.id === scheduleId ? { ...schedule, completed: true } : schedule
        )
        setLearningPath({ ...learningPath, daily_schedules: updatedSchedules })
      }
    } catch (error) {
      console.error('Error marking day complete:', error)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('tempAccessToken')
    localStorage.removeItem('learningPath')
    localStorage.removeItem('user')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('surveyId')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading your learning path...</p>
        </div>
      </div>
    )
  }

  if (!learningPath) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No learning path found</h1>
          <p className="text-gray-400 mb-6">Please complete the survey first</p>
          <button
            onClick={() => router.push('/survey')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
          >
            Take Survey
          </button>
        </div>
      </div>
    )
  }

  const completedDays = learningPath.daily_schedules.filter(day => day.completed).length
  const progressPercentage = (completedDays / learningPath.daily_schedules.length) * 100

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold">&lt;/&gt;</span>
              </div>
              <span className="text-xl font-bold">codefinity</span>
            </div>
            <div className="flex items-center space-x-4">
              {user && <UserAvatar user={user} showName={true} />}
              <button
                onClick={logout}
                className="text-gray-400 hover:text-white px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Learning Path Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{learningPath.title}</h1>
          <p className="text-xl text-gray-300 mb-6">{learningPath.description}</p>
          
          {/* Progress */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Progress</h2>
              <span className="text-orange-500 font-bold">
                {completedDays}/{learningPath.daily_schedules.length} Days Complete
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
              <div 
                className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-sm">{Math.round(progressPercentage)}% Complete</p>
          </div>
        </div>

        {/* Calendar View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 mb-8">
          {learningPath.daily_schedules.map((day) => (
            <div
              key={day.id}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                day.completed
                  ? 'bg-green-900/30 border-green-500'
                  : selectedDay?.id === day.id
                  ? 'bg-orange-900/30 border-orange-500'
                  : 'bg-gray-800 border-gray-600 hover:border-gray-500'
              }`}
              onClick={() => setSelectedDay(day)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-orange-500">Day {day.day_number}</span>
                {day.completed && (
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <h3 className="font-medium text-sm mb-2 line-clamp-2">{day.title}</h3>
              <div className="flex items-center text-xs text-gray-400">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {day.estimated_hours}h
              </div>
            </div>
          ))}
        </div>

        {/* Day Detail Modal */}
        {selectedDay && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Day {selectedDay.day_number}: {selectedDay.title}</h2>
                    <div className="flex items-center text-gray-400 mb-4">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Estimated time: {selectedDay.estimated_hours} hours
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">What you&apos;ll learn:</h3>
                  <p className="text-gray-300 mb-4">{selectedDay.content}</p>
                  
                  <h4 className="font-semibold mb-2">Topics covered:</h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedDay.topics.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Videos Section */}
                  {selectedDay.videos && selectedDay.videos.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        Video Tutorials
                      </h4>
                      <div className="space-y-2">
                        {selectedDay.videos.map((video, index) => (
                          <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                            <a 
                              href={video.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 font-medium"
                            >
                              {video.title}
                            </a>
                            <p className="text-sm text-gray-400 mt-1">Duration: {video.duration}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resources Section */}
                  {selectedDay.resources && selectedDay.resources.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Additional Resources
                      </h4>
                      <div className="space-y-2">
                        {selectedDay.resources.map((resource, index) => (
                          <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-green-400 hover:text-green-300 font-medium"
                            >
                              {resource.title}
                            </a>
                            <span className="ml-2 px-2 py-1 bg-gray-600 text-xs rounded">
                              {resource.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  {!selectedDay.completed ? (
                    <button
                      onClick={() => markDayComplete(selectedDay.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                      Mark as Complete
                    </button>
                  ) : (
                    <div className="flex items-center text-green-400">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Completed
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Days Completed</h3>
            <p className="text-3xl font-bold text-orange-500">{completedDays}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Days Remaining</h3>
            <p className="text-3xl font-bold text-blue-500">{learningPath.daily_schedules.length - completedDays}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Total Hours</h3>
            <p className="text-3xl font-bold text-green-500">
              {learningPath.daily_schedules.reduce((total, day) => total + day.estimated_hours, 0)}h
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}