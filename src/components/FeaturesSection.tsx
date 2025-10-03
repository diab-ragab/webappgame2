import React from 'react'
import { Sword, Users, Map, Zap, Crown, Shield } from 'lucide-react'

const features = [
  {
    icon: Sword,
    title: 'Epic Combat System',
    description: 'Master fluid combat with hundreds of skills, combos, and devastating ultimate abilities.'
  },
  {
    icon: Users,
    title: 'Guild Wars',
    description: 'Form alliances, conquer territories, and lead massive guild battles for realm dominance.'
  },
  {
    icon: Map,
    title: 'Vast Open World',
    description: 'Explore 12 unique realms, each with distinct environments, creatures, and secrets.'
  },
  {
    icon: Zap,
    title: 'Divine Powers',
    description: 'Harness the power of ancient gods and ascend to immortality with unique abilities.'
  },
  {
    icon: Crown,
    title: 'Legendary Artifacts',
    description: 'Collect and upgrade mythical weapons and armor with game-changing properties.'
  },
  {
    icon: Shield,
    title: 'PvP Arenas',
    description: 'Prove your worth in ranked battles, tournaments, and massive siege warfare.'
  }
]

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Forge Your 
            <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent"> Legend</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience next-generation MMORPG gameplay with revolutionary features that redefine what it means to be immortal.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 card-hover"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection