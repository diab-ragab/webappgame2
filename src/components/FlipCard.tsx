import React, { useState } from 'react'
import { Video as LucideIcon } from 'lucide-react'

interface FlipCardProps {
  icon: LucideIcon
  name: string
  description: string
  color: string
  stats: { strength: number; agility: number; vitality: number; energy: number }
  powers: Array<{ name: string; description: string; cooldown: number }>
  playstyle: string
  difficulty: string
}

const FlipCard: React.FC<FlipCardProps> = ({
  icon: Icon,
  name,
  description,
  color,
  stats,
  powers,
  playstyle,
  difficulty
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="flip-card h-96 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`flip-card-inner relative w-full h-full ${isFlipped ? 'rotate-y-180' : ''}`}>
        <div className={`flip-card-front absolute w-full h-full bg-gradient-to-br ${color} rounded-xl p-6 flex flex-col items-center justify-center text-white shadow-2xl`}>
          <Icon className="h-24 w-24 mb-4" />
          <h3 className="text-3xl font-bold mb-2">{name}</h3>
          <p className="text-center text-white/90 mb-4">{description}</p>
          <div className={`px-4 py-1 rounded-full ${difficulty === 'Easy' ? 'bg-green-500/30' : difficulty === 'Medium' ? 'bg-yellow-500/30' : 'bg-red-500/30'}`}>
            <span className="text-sm font-bold">{difficulty}</span>
          </div>
        </div>

        <div className="flip-card-back absolute w-full h-full bg-slate-800 rounded-xl p-6 overflow-y-auto shadow-2xl border border-purple-500/30">
          <h3 className="text-2xl font-bold text-white mb-4">{name} Details</h3>

          <div className="mb-4">
            <h4 className="text-purple-400 font-bold mb-2">Stats</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Strength</span>
                <div className="flex-1 mx-3 bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${stats.strength}%` }}></div>
                </div>
                <span className="text-white font-bold">{stats.strength}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Agility</span>
                <div className="flex-1 mx-3 bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.agility}%` }}></div>
                </div>
                <span className="text-white font-bold">{stats.agility}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Vitality</span>
                <div className="flex-1 mx-3 bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${stats.vitality}%` }}></div>
                </div>
                <span className="text-white font-bold">{stats.vitality}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Energy</span>
                <div className="flex-1 mx-3 bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${stats.energy}%` }}></div>
                </div>
                <span className="text-white font-bold">{stats.energy}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-purple-400 font-bold mb-2">Powers</h4>
            <div className="space-y-2">
              {powers.slice(0, 2).map((power, index) => (
                <div key={index} className="bg-slate-700/50 rounded p-2">
                  <div className="flex justify-between items-start">
                    <span className="text-white font-medium text-sm">{power.name}</span>
                    <span className="text-xs text-gray-400">{power.cooldown}s</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{power.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-300 italic">{playstyle}</div>
        </div>
      </div>
    </div>
  )
}

export default FlipCard
