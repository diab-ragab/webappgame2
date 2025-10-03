import React from 'react'
import { Sword, Shield, Crown, Play, Coins, Zap } from 'lucide-react'

interface HeroSectionProps {
  onOpenAuth?: (mode: 'login' | 'register') => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuth }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Main Title */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <Crown className="h-16 w-16 text-yellow-400 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            War of the
            <span className="block bg-gradient-to-r from-purple-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Immortals
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Enter a realm where gods and mortals clash in epic battles. Forge your destiny, master ancient powers, and become the ultimate immortal warrior.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <button 
            onClick={() => {
              console.log('Hero join button clicked')
              onOpenAuth && onOpenAuth('register');
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 overflow-hidden active:scale-95 touch-manipulation"
          >
            {/* Mobile touch feedback */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity duration-150 md:hidden" />
            <div className="flex items-center justify-center space-x-2">
              <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Start Your Journey</span>
            </div>
          </button>
          <button className="relative px-8 py-4 bg-black/30 backdrop-blur-sm border-2 border-yellow-400/50 hover:border-yellow-400 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation overflow-hidden group">
            {/* Mobile touch feedback */}
            <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-active:opacity-100 transition-opacity duration-150 md:hidden" />
            Watch Trailer
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20">
            <Coins className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-xl md:text-2xl font-bold text-white mb-1">30K Zen</div>
            <div className="text-gray-400">Free Every Hour</div>
          </div>
          <div className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20">
            <Crown className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-xl md:text-2xl font-bold text-white mb-1">50% Off</div>
            <div className="text-gray-400">Monthly Discount</div>
          </div>
          <div className="text-center p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20">
            <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-xl md:text-2xl font-bold text-white mb-1">Weekly</div>
            <div className="text-gray-400">Active Updates</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection