import React, { useState, useEffect } from 'react'
import { Play, ArrowRight, Volume2, VolumeX } from 'lucide-react'

interface LandingPageProps {
  onEnter: () => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [isMuted, setIsMuted] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideoLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=${isMuted ? '1' : '0'}&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0&rel=0&modestbranding=1`}
          title="Server Trailer"
          allow="autoplay; encrypted-media"
          style={{
            pointerEvents: 'none',
            transform: 'scale(1.1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Server Name with Epic Animation */}
        <div className="text-center mb-12 animate-fade-in">
          <h1
            className="text-8xl md:text-[12rem] lg:text-[15rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 mb-4 tracking-wider"
            style={{
              textShadow: '0 0 80px rgba(251, 191, 36, 0.5), 0 0 120px rgba(251, 191, 36, 0.3)',
              animation: 'pulse-glow 3s ease-in-out infinite'
            }}
          >
            WOI
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-widest">
            UNIVERSE
          </h2>
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse" />
        </div>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl text-gray-300 mb-12 text-center max-w-3xl animate-fade-in-delay">
          Enter the Ultimate WOI Universe Experience
        </p>

        {/* Server Status Badge */}
        <div className="mb-12 animate-fade-in-delay-2">
          <div className="flex items-center space-x-3 bg-black/60 backdrop-blur-md px-8 py-4 rounded-full border-2 border-green-500/50 shadow-2xl shadow-green-500/30">
            <div className="relative">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping" />
            </div>
            <span className="text-green-400 font-bold text-xl">SERVER ONLINE</span>
            <span className="text-gray-400">|</span>
            <span className="text-white font-bold text-xl">1,247 Players</span>
          </div>
        </div>

        {/* Enter Button */}
        <button
          onClick={onEnter}
          className="group relative px-16 py-6 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 rounded-2xl font-black text-3xl text-black overflow-hidden transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-yellow-500/50 animate-fade-in-delay-3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          <span className="relative z-10 flex items-center space-x-4">
            <Play className="h-8 w-8 fill-current" />
            <span>ENTER NOW</span>
            <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform" />
          </span>
        </button>

        {/* Additional Info */}
        <div className="mt-16 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-gray-400 animate-fade-in-delay-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full" />
            <span>Beast Bound Patch</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <span>100 EXP & 150 Drops</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span>24/7 Support</span>
          </div>
        </div>

        {/* Mute Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-8 right-8 p-4 bg-black/60 backdrop-blur-md rounded-full border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-110"
        >
          {isMuted ? (
            <VolumeX className="h-6 w-6 text-white" />
          ) : (
            <Volume2 className="h-6 w-6 text-yellow-400" />
          )}
        </button>
      </div>

      {/* Animated Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 30px rgba(251, 191, 36, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 60px rgba(251, 191, 36, 0.8));
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          opacity: 0;
          animation: fade-in 1s ease-out 0.3s forwards;
        }

        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fade-in 1s ease-out 0.6s forwards;
        }

        .animate-fade-in-delay-3 {
          opacity: 0;
          animation: fade-in 1s ease-out 0.9s forwards;
        }

        .animate-fade-in-delay-4 {
          opacity: 0;
          animation: fade-in 1s ease-out 1.2s forwards;
        }
      `}</style>
    </div>
  )
}

export default LandingPage
