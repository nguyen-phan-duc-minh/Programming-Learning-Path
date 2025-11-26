interface ProgressBarProps {
  current: number
  total: number
  label?: string
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100)

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{label || 'Your Progress'}</h2>
        <span className="text-orange-500 font-bold">
          {current}/{total} Days Complete
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
        <div 
          className="bg-orange-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-gray-400 text-sm">{percentage}% Complete</p>
    </div>
  )
}
