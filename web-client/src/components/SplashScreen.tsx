import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@shared/stores/authStore'

export const SplashScreen = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Simulate splash screen delay
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/')
      } else {
        navigate('/login')
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="absolute w-16 h-16 bg-primary-400 rounded-lg"
              style={{
                left: `${(index % 5) * 20}%`,
                top: `${Math.floor(index / 5) * 20}%`,
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Logo Container */}
      <div className="relative z-10 text-center">
        <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg mb-8">
          <span className="text-4xl font-bold text-white">X</span>
        </div>
        
        {/* App Name */}
        <h1 className="text-3xl font-bold text-white tracking-wider">MEDIA X</h1>
        
        {/* Loading Animation */}
        <div className="mt-8 flex justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
} 