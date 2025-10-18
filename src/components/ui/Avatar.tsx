import React from 'react'
import { User } from 'lucide-react'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'md',
  className = '' 
}) => {
  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-border-light flex items-center justify-center ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt || 'Avatar'} 
          className="w-full h-full object-cover"
        />
      ) : (
        <User size={size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 32} className="text-text-light" />
      )}
    </div>
  )
} 