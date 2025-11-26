import Link from 'next/link'

interface HeaderProps {
  showLogout?: boolean
  onLogout?: () => void
}

export function Header({ showLogout = false, onLogout }: HeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-white font-bold">&lt;/&gt;</span>
            </div>
            <span className="text-xl font-bold">codefinity</span>
          </Link>
          
          {showLogout && onLogout && (
            <button
              onClick={onLogout}
              className="text-gray-400 hover:text-white px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
