import React from 'react'
import { Users, Globe, Clock, Zap, Trophy, Sword, Shield, Star, Play, ArrowRight, CheckCircle, Crown, Target } from 'lucide-react'

const ServerInfoPage: React.FC = () => {
  const serverFeatures = [
    { icon: Zap, title: 'High Performance', description: 'Optimized for 99.9% uptime' },
    { icon: Users, title: '1000+ Players', description: 'Active community online 24/7' },
    { icon: Shield, title: 'Anti-Cheat', description: 'Advanced protection system' },
    { icon: Trophy, title: 'Weekly Events', description: 'Exciting tournaments & rewards' },
    { icon: Sword, title: 'Balanced PvP', description: 'Fair and competitive gameplay' },
    { icon: Star, title: 'Custom Content', description: 'Exclusive items and features' }
  ]

  const serverStats = [
    { label: 'Server Type', value: 'Season 6 Episode 3' },
    { label: 'Experience Rate', value: '100x' },
    { label: 'Drop Rate', value: '50%' },
    { label: 'Max Level', value: '400' },
    { label: 'Reset System', value: 'Unlimited' },
    { label: 'Grand Reset', value: 'Available' }
  ]

  const uniqueFeatures = [
    'Custom Boss System with Exclusive Drops',
    'Balanced PvP Arena with Ranking System',
    'Weekly Guild Wars with Massive Rewards',
    'VIP System with Special Benefits',
    'Auto-Event System Every 2 Hours',
    'Custom Wings & Pets Collection',
    'In-Game Store with Fair Prices',
    'Active GM Team & 24/7 Support'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0&rel=0"
              title="Server Trailer"
              allow="autoplay; encrypted-media"
              style={{ pointerEvents: 'none' }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 text-center px-6">
          <div className="inline-block mb-6">
            <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/50">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-bold">SERVER ONLINE</span>
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6 animate-pulse">
            WOI UNIVERSE
          </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The Ultimate MU Online Experience
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold text-xl text-white overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
              <span className="relative z-10 flex items-center space-x-2">
                <Play className="h-6 w-6" />
                <span>Play Now</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button className="px-8 py-4 bg-slate-800/80 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg font-bold text-xl text-white hover:bg-slate-700/80 transition-all duration-300 hover:border-purple-400">
              Watch Trailer
            </button>
          </div>

          <div className="mt-12 flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">1,247</div>
              <div className="text-gray-400">Players Online</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Server Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-white mb-12">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">WOI Universe</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {serverFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:transform hover:scale-105"
              >
                <feature.icon className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Server Stats */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Server Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {serverStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                  <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Unique Features */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
              <Crown className="h-8 w-8 text-yellow-400 mr-3" />
              Exclusive Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {uniqueFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of players in the most epic MU Online adventure
          </p>
          <button className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-2xl text-white overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
            <span className="relative z-10 flex items-center space-x-3">
              <Target className="h-8 w-8" />
              <span>Enter WOI Universe</span>
              <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <div className="mt-8 text-gray-400">
            <p>No download required • Play instantly in your browser</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServerInfoPage
