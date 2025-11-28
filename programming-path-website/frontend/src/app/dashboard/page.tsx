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
      const tempAccessToken = localStorage.getItem('tempAccessToken')
      const token = authToken || tempAccessToken
      
      if (!token) {
        router.push('/auth')
        return
      }

      await apiService.completeDailySchedule(scheduleId, token)
      
      if (learningPath) {
        // Update local state
        const updatedSchedules = learningPath.daily_schedules.map(schedule =>
          schedule.id === scheduleId ? { ...schedule, completed: true } : schedule
        )
        setLearningPath({ ...learningPath, daily_schedules: updatedSchedules })
        // Close modal after marking complete
        setSelectedDay(null)
      }
    } catch (error) {
      console.error('Error marking day complete:', error)
    }
  }

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
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
            <button 
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold">&lt;/&gt;</span>
              </div>
              <span className="text-xl font-bold">Codefinity FourTech</span>
            </button>
            <div className="flex items-center space-x-4">
              {user && (
                <UserAvatar 
                  user={user} 
                  showName={true} 
                  showDropdown={true}
                  onProfile={() => router.push('/profile')}
                  onLogout={logout}
                />
              )}
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

        {/* Days List - Horizontal Layout */}
        <div className="space-y-4 mb-8">
          {learningPath.daily_schedules.map((day) => (
            <div key={day.id}>
              {/* Day Header - Clickable */}
              <div
                onClick={() => setSelectedDay(selectedDay?.id === day.id ? null : day)}
                className={`cursor-pointer p-6 rounded-lg border-2 transition-all duration-200 ${
                  day.completed
                    ? 'bg-green-900/30 border-green-500'
                    : selectedDay?.id === day.id
                    ? 'bg-orange-900/30 border-orange-500'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <span className="text-2xl font-bold text-orange-500">Day {day.day_number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{day.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {day.estimated_hours}h
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          {day.videos?.length || 0} videos
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {day.resources?.length || 0} resources
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {day.completed && (
                      <div className="flex items-center text-green-400">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <svg 
                      className={`w-6 h-6 transition-transform ${selectedDay?.id === day.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Day Content - Expandable */}
              {selectedDay?.id === day.id && (
                <div className="mt-4 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">What you&apos;ll learn:</h4>
                    <p className="text-gray-300 mb-4">{selectedDay.content}</p>
                    
                    <h5 className="font-semibold mb-2">Topics covered:</h5>
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
                  </div>

                  {/* Video Tutorials with Embedded YouTube */}
                  {selectedDay.videos && selectedDay.videos.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                        Video Tutorials
                      </h4>
                      <div className="space-y-4">
                        {selectedDay.videos.map((video, index) => {
                          const videoId = getYouTubeVideoId(video.url)
                          return (
                            <div key={index} className="bg-gray-700/50 rounded-lg overflow-hidden">
                              {videoId ? (
                                <div>
                                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                      className="absolute top-0 left-0 w-full h-full"
                                      src={`https://www.youtube.com/embed/${videoId}`}
                                      title={video.title}
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    ></iframe>
                                  </div>
                                  <div className="p-4">
                                    <h5 className="font-medium text-white mb-1">{video.title}</h5>
                                    <p className="text-sm text-gray-400">Duration: {video.duration}</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="p-4">
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
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Additional Resources */}
                  {selectedDay.resources && selectedDay.resources.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Additional Resources
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedDay.resources.map((resource, index) => (
                          <a
                            key={index}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h5 className="text-green-400 font-medium mb-1">{resource.title}</h5>
                                <span className="inline-block px-2 py-1 bg-gray-600 text-xs rounded">
                                  {resource.type}
                                </span>
                              </div>
                              <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mark Complete Button */}
                  <div className="flex justify-end pt-4 border-t border-gray-700">
                    {!selectedDay.completed ? (
                      <button
                        onClick={() => markDayComplete(selectedDay.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Mark as Complete</span>
                      </button>
                    ) : (
                      <div className="flex items-center text-green-400 font-semibold">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Completed
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

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