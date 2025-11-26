import type { DailySchedule } from '@/types'

interface DayCardProps {
  day: DailySchedule
  isSelected: boolean
  onClick: () => void
}

export function DayCard({ day, isSelected, onClick }: DayCardProps) {
  return (
    <div
      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
        day.completed
          ? 'bg-green-900/30 border-green-500'
          : isSelected
          ? 'bg-orange-900/30 border-orange-500'
          : 'bg-gray-800 border-gray-600 hover:border-gray-500'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-semibold text-orange-500">
          Day {day.day_number}
        </span>
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
  )
}
