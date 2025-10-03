import React, { useState, useEffect } from 'react'
import { Crown, Sword, Shield, Zap } from 'lucide-react'

interface LoadingScreenProps {
  onComplete: () => void
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [currentLore, setCurrentLore] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)

  const loreTexts = [
    "In the beginning, there were only mortals...",
    "The gods watched from their celestial realm...",
    "War erupted between the divine and mortal worlds...",
    "Heroes rose to challenge the immortals...",
    "Ancient powers awakened from their slumber...",
    "The fate of all realms hangs in the balance...",
    "Your legend begins now, warrior..."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsCompleting(true)
          setTimeout(onComplete, 1500) // Extended delay for transition effect
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    const loreInterval = setInterval(() => {
      setCurrentLore(prev => (prev + 1) % loreTexts.length)
    }, 2000)

    return () => clearInterval(loreInterval)
  }, [])

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50 transition-all duration-1000 ${
      isCompleting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-500" />
        
        {/* Floating Symbols */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Sword className="h-8 w-8 text-purple-400/30" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-delayed">
          <Shield className="h-6 w-6 text-blue-400/30" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 animate-float-slow">
          <Zap className="h-7 w-7 text-yellow-400/30" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 animate-float">
          <Crown className="h-9 w-9 text-yellow-400/30" />
        </div>
      </div>

      <div className={`relative z-10 text-center max-w-2xl mx-auto px-4 transition-all duration-1000 ${
        isCompleting ? 'transform translate-y-8 opacity-0' : 'transform translate-y-0 opacity-100'
      }`}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Crown className="h-20 w-20 text-yellow-400 animate-pulse" />
            <div className="absolute inset-0 animate-ping">
              <Crown className="h-20 w-20 text-yellow-400/50" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          War of the
          <span className="block bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Immortals
          </span>
        </h1>

        {/* Lore Text */}
        <div className="h-16 mb-12 flex items-center justify-center">
          <p className="text-xl text-gray-300 animate-fade-in italic">
            {loreTexts[currentLore]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">
              {progress >= 100 ? 'Entering the realm...' : 'Loading your destiny...'}
            </span>
            <span className="text-yellow-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 via-yellow-400 to-purple-600 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent ${
                progress >= 100 ? 'animate-ping' : 'animate-pulse'
              }`} />
            </div>
          </div>
        </div>

        {/* Loading Stages */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className={`flex items-center space-x-2 ${progress > 25 ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${progress > 25 ? 'bg-green-400' : 'bg-gray-500'}`} />
            <span>Realms</span>
          </div>
          <div className={`flex items-center space-x-2 ${progress > 50 ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${progress > 50 ? 'bg-green-400' : 'bg-gray-500'}`} />
            <span>Classes</span>
          </div>
          <div className={`flex items-center space-x-2 ${progress > 75 ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${progress > 75 ? 'bg-green-400' : 'bg-gray-500'}`} />
            <span>Powers</span>
          </div>
          <div className={`flex items-center space-x-2 ${progress > 90 ? 'text-green-400' : 'text-gray-500'}`}>
            <div className={`w-2 h-2 rounded-full ${progress > 90 ? 'bg-green-400' : 'bg-gray-500'}`} />
            <span>Ready</span>
          </div>
        </div>

        {/* Tip */}
        <div className="mt-8 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/20">
          <p className="text-gray-400 text-sm">
            💡 <strong className="text-yellow-400">Tip:</strong> Each class has unique powers and playstyles. Choose wisely, warrior!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen