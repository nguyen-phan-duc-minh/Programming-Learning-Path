import { useState } from 'react'
import Image from 'next/image'
import type { User } from '@/lib/api'

interface UserAvatarProps {
  user: User
  size?: 'sm' | 'md' | 'lg'
  showName?: boolean
  className?: string
}

export function UserAvatar({ user, size = 'md', showName = false, className = '' }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false)
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }
  
  const avatarSize = sizeClasses[size]
  const initial = user.name.charAt(0).toUpperCase()
  
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {showName && (
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-white">{user.name}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
      )}
      <div className={`${avatarSize} rounded-full overflow-hidden bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold shrink-0`}>
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
      </div>
    </div>
  )
}
