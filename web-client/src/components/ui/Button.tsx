import React from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
  title: string
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
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
}

export const Button: React.FC<ButtonProps> = ({
  title,
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
        flex items-center justify-center space-x-2 font-medium rounded-lg border transition-colors
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <>
          {icon}
          <span>{title}</span>
        </>
      )}
    </button>
  )
} 