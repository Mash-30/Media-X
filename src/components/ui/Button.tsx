import React from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
  title?: string
  children?: React.ReactNode
  onPress?: () => void
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  className?: string
  icon?: React.ReactNode
}

const variantClasses = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 border-primary-500',
  secondary: 'bg-white text-text-primary hover:bg-border-light border-border',
  outline: 'bg-transparent text-primary-500 hover:bg-primary-50 border-primary-500',
}

const sizeClasses = {
  small: 'px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm',
  medium: 'px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base',
  large: 'px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg',
}

export const Button: React.FC<ButtonProps> = ({
  title,
  children,
  onPress,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  icon
}) => {
  const handleClick = onClick || onPress

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center space-x-1 sm:space-x-2 font-medium rounded-lg border transition-colors
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin sm:w-4 sm:h-4" />
      ) : (
        <>
          {icon}
          <span className="text-xs sm:text-sm">{children || title}</span>
        </>
      )}
    </button>
  )
} 