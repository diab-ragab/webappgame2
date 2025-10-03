import React from 'react'

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-black" />
      
      {/* Animated cosmic nebula layers */}
      <div 
        className="absolute inset-0 animate-pulse-slow"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, 
              rgba(139, 92, 246, 0.6) 0%, 
              rgba(59, 130, 246, 0.4) 20%, 
              rgba(16, 185, 129, 0.3) 40%, 
              transparent 70%),
            radial-gradient(ellipse at 70% 60%, 
              rgba(236, 72, 153, 0.5) 0%, 
              rgba(168, 85, 247, 0.35) 25%, 
              rgba(59, 130, 246, 0.25) 50%, 
              transparent 80%),
            radial-gradient(ellipse at 50% 30%, 
              rgba(255, 187, 36, 0.4) 0%, 
              rgba(236, 72, 153, 0.3) 30%, 
              transparent 60%)
          `
        }}
      />
      
      {/* Animated floating cosmic elements */}
      <div className="absolute inset-0">
        {/* Large animated cosmic orbs */}
        <div 
          className="absolute w-48 h-48 rounded-full opacity-70 animate-float"
          style={{
            left: '10%',
            top: '15%',
            background: `radial-gradient(circle, 
              rgba(139, 92, 246, 0.8) 0%, 
              rgba(59, 130, 246, 0.5) 30%, 
              rgba(16, 185, 129, 0.3) 60%, 
              transparent 80%)`,
            filter: 'blur(3px)'
          }}
        />
        <div 
          className="absolute w-36 h-36 rounded-full opacity-80 animate-float-delayed"
          style={{
            right: '15%',
            top: '25%',
            background: `radial-gradient(circle, 
              rgba(236, 72, 153, 0.9) 0%, 
              rgba(168, 85, 247, 0.6) 40%, 
              rgba(255, 187, 36, 0.4) 70%, 
              transparent 90%)`,
            filter: 'blur(2px)'
          }}
        />
        <div 
          className="absolute w-56 h-56 rounded-full opacity-60 animate-float-slow"
          style={{
            left: '55%',
            bottom: '10%',
            background: `radial-gradient(circle, 
              rgba(16, 185, 129, 0.7) 0%, 
              rgba(59, 130, 246, 0.5) 25%, 
              rgba(139, 92, 246, 0.3) 50%, 
              transparent 75%)`,
            filter: 'blur(4px)'
          }}
        />
        
        {/* Animated cosmic dust and stars */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'animate-pulse' : 
              i % 3 === 1 ? 'animate-bounce-gentle' : 
              'animate-float'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + (i % 4)}px`,
              height: `${1 + (i % 4)}px`,
              background: i % 5 === 0 ? '#fbbf24' : 
                         i % 5 === 1 ? '#a855f7' : 
                         i % 5 === 2 ? '#3b82f6' : 
                         i % 5 === 3 ? '#ec4899' : '#10b981',
              opacity: 0.3 + (i % 10) * 0.07,
              boxShadow: `0 0 ${3 + (i % 4)}px currentColor`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + (i % 3)}s`
            }}
          />
        ))}

        {/* Floating magical particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute animate-drift-right"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + (i % 10)}s`
            }}
          >
            <div
              className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
              style={{
                boxShadow: '0 0 6px #fbbf24',
                opacity: 0.6
              }}
            />
          </div>
        ))}

        {/* Drifting energy streams */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`stream-${i}`}
            className="absolute animate-drift-left"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${20 + (i % 8)}s`
            }}
          >
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-magical-pulse"
              style={{
                boxShadow: '0 0 8px #a855f7',
                opacity: 0.4
              }}
            />
          </div>
        ))}

        {/* Orbiting cosmic elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`orbit-${i}`}
            className="absolute animate-orbit-animation"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i * 8)}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${8 + (i % 4)}s`
            }}
          >
            <div
              className="w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                boxShadow: '0 0 4px #22d3ee',
                opacity: 0.8
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Animated atmospheric depth layers */}
      <div 
        className="absolute inset-0 opacity-30 animate-pulse-slow"
        style={{
          background: `
            radial-gradient(ellipse at 25% 75%, 
              rgba(0, 0, 0, 0.5) 0%, 
              rgba(30, 41, 59, 0.3) 40%, 
              transparent 70%),
            radial-gradient(ellipse at 75% 25%, 
              rgba(15, 23, 42, 0.4) 0%, 
              rgba(51, 65, 85, 0.2) 50%, 
              transparent 80%)
          `,
          animationDuration: '6s'
        }}
      />

      {/* Sliding cosmic rays */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`ray-${i}`}
          className="absolute animate-slide-down opacity-20"
          style={{
            left: `${10 + (i * 20)}%`,
            width: '2px',
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, #a855f7, transparent)',
            animationDelay: `${i * 2}s`,
            animationDuration: '10s'
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground