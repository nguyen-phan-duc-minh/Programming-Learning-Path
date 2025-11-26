import type { DailySchedule } from '@/types'

interface DayDetailModalProps {
  day: DailySchedule
  onClose: () => void
  onComplete: (scheduleId: number) => void
}

export function DayDetailModal({ day, onClose, onComplete }: DayDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Day {day.day_number}: {day.title}
              </h2>
              <div className="flex items-center text-gray-400 mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Estimated time: {day.estimated_hours} hours
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">What you&apos;ll learn:</h3>
            <p className="text-gray-300 mb-4">{day.content}</p>
            
            <h4 className="font-semibold mb-2">Topics covered:</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {day.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* Videos Section */}
            {day.videos && day.videos.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  Video Tutorials
                </h4>
                <div className="space-y-2">
                  {day.videos.map((video, index) => (
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
            {day.resources && day.resources.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Additional Resources
                </h4>
                <div className="space-y-2">
                  {day.resources.map((resource, index) => (
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
            {!day.completed ? (
              <button
                onClick={() => onComplete(day.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
