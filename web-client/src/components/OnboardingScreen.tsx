import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'

const onboardingData = [
  {
    id: 1,
    title: "Welcome To the Fun",
    subtitle: "Media X",
    description: "Connect with friends and share your moments"
  },
  {
    id: 2,
    title: "Best Social App to",
    subtitle: "Make New Friends",
    description: "Discover amazing people around the world"
  },
  {
    id: 3,
    title: "Enjoy Your Life",
    subtitle: "Every Time, Every Where",
    description: "Share your adventures and experiences"
  }
]

export const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      navigate('/login')
    }
  }

  const handleSkip = () => {
    navigate('/login')
  }

  const currentData = onboardingData[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-600">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="text-white text-lg font-medium">9:41</div>
        <button 
          onClick={handleSkip}
          className="text-white hover:text-primary-200 transition-colors"
        >
          Skip
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-6">
        {/* Image Placeholder */}
        <div className="mb-12">
          <div className="w-64 h-64 bg-white/10 rounded-2xl flex items-center justify-center">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-6xl">👤</span>
            </div>
          </div>
        </div>
        
        {/* Text Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">{currentData.title}</h1>
          <h2 className="text-3xl font-bold text-primary-200 mb-4">{currentData.subtitle}</h2>
          <p className="text-lg text-white/80">{currentData.description}</p>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex space-x-3 mb-12">
          {onboardingData.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        
        {/* Next Button */}
        <button
          onClick={handleNext}
          className="bg-white text-primary-500 px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 hover:bg-primary-50 transition-colors"
        >
          <span>{currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
} 