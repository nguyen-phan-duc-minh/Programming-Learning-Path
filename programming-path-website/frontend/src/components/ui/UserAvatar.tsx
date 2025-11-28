import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import type { User } from '@/lib/api'

interface UserAvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  className?: string
  onLogout?: () => void
  onProfile?: () => void
  showDropdown?: boolean
}

export function UserAvatar({ 
  user, 
  size = 'md', 
  showName = false, 
  className = '',
  onLogout,
  onProfile,
  showDropdown = false
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }
  
  const avatarSize = sizeClasses[size]
  const initial = user.name.charAt(0).toUpperCase()
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])
  
  const handleAvatarClick = () => {
    if (showDropdown) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="flex items-center space-x-3">
        {showName && (
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleAvatarClick}
          className={`${avatarSize} rounded-full overflow-hidden bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold shrink-0 ${showDropdown ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
        >
          {user.picture && !imageError ? (
            <Image
              src={user.picture}
              alt={user.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span>{initial}</span>
          )}
        </button>
      </div>
      
      {/* Dropdown Menu */}
      {showDropdown && isDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50">
          {onProfile && (
            <button
              onClick={() => {
                onProfile()
                setIsDropdownOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profile</span>
            </button>
          )}
          {onLogout && (
            <button
              onClick={() => {
                onLogout()
                setIsDropdownOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 transition-colors flex items-center space-x-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
