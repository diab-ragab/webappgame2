import React, { useState } from 'react'
import { Trophy, Sword, Users, Crown, Zap, Star, Medal, Target, Shield, Flame } from 'lucide-react'

const RankingsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pvp')

  const pvpRankings = [
    { rank: 1, name: 'DragonSlayer', class: 'Berzeker', level: 95, wins: 2847, winRate: 89.2, power: 45820, guild: 'Phoenix Legion' },
    { rank: 2, name: 'ShadowMage', class: 'Magus', level: 93, wins: 2634, winRate: 87.5, power: 44150, guild: 'Dark Covenant' },
    { rank: 3, name: 'IronGuardian', class: 'Champion', level: 91, wins: 2456, winRate: 85.8, power: 42890, guild: 'Steel Brotherhood' },
    { rank: 4, name: 'DeathWhisper', class: 'Heretic', level: 89, wins: 2298, winRate: 84.3, power: 41230, guild: 'Void Seekers' },
    { rank: 5, name: 'SwiftBlade', class: 'Slayer', level: 87, wins: 2187, winRate: 83.1, power: 40560, guild: 'Silent Assassins' },
    { rank: 6, name: 'StormCaller', class: 'Enchantress', level: 85, wins: 2034, winRate: 81.7, power: 39840, guild: 'Mystic Circle' },
    { rank: 7, name: 'BladeDancer', class: 'Duelist', level: 84, wins: 1967, winRate: 80.4, power: 38920, guild: 'Elegant Fighters' },
    { rank: 8, name: 'NatureWarden', class: 'Ranger', level: 82, wins: 1845, winRate: 79.2, power: 37650, guild: 'Forest Guardians' },
    { rank: 9, name: 'DoomBringer', class: 'Harbinger', level: 80, wins: 1723, winRate: 77.8, power: 36480, guild: 'Apocalypse' },
    { rank: 10, name: 'LightBearer', class: 'Champion', level: 78, wins: 1654, winRate: 76.5, power: 35290, guild: 'Divine Order' }
  ]

  const guildRankings = [
    { rank: 1, name: 'Phoenix Legion', members: 150, avgLevel: 87, totalPower: 6750000, wins: 342, leader: 'DragonSlayer' },
    { rank: 2, name: 'Dark Covenant', members: 145, avgLevel: 85, totalPower: 6234000, wins: 298, leader: 'ShadowMage' },
    { rank: 3, name: 'Steel Brotherhood', members: 142, avgLevel: 83, totalPower: 5890000, wins: 276, leader: 'IronGuardian' },
    { rank: 4, name: 'Void Seekers', members: 138, avgLevel: 81, totalPower: 5456000, wins: 254, leader: 'DeathWhisper' },
    { rank: 5, name: 'Silent Assassins', members: 135, avgLevel: 79, totalPower: 5123000, wins: 231, leader: 'SwiftBlade' },
    { rank: 6, name: 'Mystic Circle', members: 132, avgLevel: 77, totalPower: 4890000, wins: 209, leader: 'StormCaller' },
    { rank: 7, name: 'Elegant Fighters', members: 128, avgLevel: 75, totalPower: 4567000, wins: 187, leader: 'BladeDancer' },
    { rank: 8, name: 'Forest Guardians', members: 125, avgLevel: 73, totalPower: 4234000, wins: 165, leader: 'NatureWarden' },
    { rank: 9, name: 'Apocalypse', members: 122, avgLevel: 71, totalPower: 3987000, wins: 143, leader: 'DoomBringer' },
    { rank: 10, name: 'Divine Order', members: 119, avgLevel: 69, totalPower: 3756000, wins: 121, leader: 'LightBearer' }
  ]

  const powerRankings = [
    { rank: 1, name: 'DragonSlayer', class: 'Berzeker', power: 45820, mainPower: 'Berserker Rage', petPower: 'Shadow Dragon Breath', guild: 'Phoenix Legion' },
    { rank: 2, name: 'ShadowMage', class: 'Magus', power: 44150, mainPower: 'Meteor Storm', petPower: 'Void Familiar Curse', guild: 'Dark Covenant' },
    { rank: 3, name: 'IronGuardian', class: 'Champion', power: 42890, mainPower: 'Divine Judgment', petPower: 'Holy Lion Roar', guild: 'Steel Brotherhood' },
    { rank: 4, name: 'DeathWhisper', class: 'Heretic', power: 41230, mainPower: 'Soul Annihilation', petPower: 'Necro Wraith Drain', guild: 'Void Seekers' },
    { rank: 5, name: 'SwiftBlade', class: 'Slayer', power: 40560, mainPower: 'Shadow Assassination', petPower: 'Stealth Panther Strike', guild: 'Silent Assassins' },
    { rank: 6, name: 'StormCaller', class: 'Enchantress', power: 39840, mainPower: 'Mind Domination', petPower: 'Mystic Phoenix Fire', guild: 'Mystic Circle' },
    { rank: 7, name: 'BladeDancer', class: 'Duelist', power: 38920, mainPower: 'Perfect Blade Dance', petPower: 'Wind Eagle Slash', guild: 'Elegant Fighters' },
    { rank: 8, name: 'NatureWarden', class: 'Ranger', power: 37650, mainPower: 'Nature\'s Wrath', petPower: 'Ancient Tree Guardian', guild: 'Forest Guardians' },
    { rank: 9, name: 'DoomBringer', class: 'Harbinger', power: 36480, mainPower: 'Apocalypse Wave', petPower: 'Chaos Demon Summon', guild: 'Apocalypse' },
    { rank: 10, name: 'LightBearer', class: 'Champion', power: 35290, mainPower: 'Divine Protection', petPower: 'Celestial Angel Heal', guild: 'Divine Order' }
  ]

  const tabs = [
    { id: 'pvp', label: 'PvP Rankings', icon: Sword },
    { id: 'guilds', label: 'Guild Rankings', icon: Users },
    { id: 'power', label: 'Power Rankings', icon: Zap }
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-400" />
      case 2: return <Medal className="h-6 w-6 text-gray-300" />
      case 3: return <Trophy className="h-6 w-6 text-amber-600" />
      default: return <span className="text-lg font-bold text-gray-400">#{rank}</span>
    }
  }

  const getClassColor = (className: string) => {
    const colors: { [key: string]: string } = {
      'Berzeker': 'text-red-400',
      'Magus': 'text-purple-400',
      'Champion': 'text-yellow-400',
      'Heretic': 'text-gray-400',
      'Slayer': 'text-cyan-400',
      'Enchantress': 'text-pink-400',
      'Duelist': 'text-green-400',
      'Ranger': 'text-emerald-400',
      'Harbinger': 'text-red-600'
    }
    return colors[className] || 'text-white'
  }

  return (
    <section id="rankings" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Live 
            <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent"> Rankings</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time leaderboards showing the most powerful warriors, guilds, and their legendary abilities.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-2 border border-purple-500/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Rankings Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden">
          {activeTab === 'pvp' && (
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Sword className="h-6 w-6 mr-3 text-red-400" />
                PvP Champions
              </h3>
              <div className="space-y-4">
                {pvpRankings.map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(player.rank)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{player.name}</h4>
                        <p className={`text-sm font-medium ${getClassColor(player.class)}`}>{player.class} • Level {player.level}</p>
                        <p className="text-xs text-gray-400">{player.guild}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">{player.wins} Wins</div>
                      <div className="text-sm text-yellow-400">{player.winRate}% Win Rate</div>
                      <div className="text-xs text-purple-400">{player.power.toLocaleString()} Power</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'guilds' && (
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Users className="h-6 w-6 mr-3 text-blue-400" />
                Guild Supremacy
              </h3>
              <div className="space-y-4">
                {guildRankings.map((guild) => (
                  <div key={guild.rank} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(guild.rank)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{guild.name}</h4>
                        <p className="text-sm text-blue-400">{guild.members} Members • Avg Level {guild.avgLevel}</p>
                        <p className="text-xs text-gray-400">Leader: {guild.leader}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-400">{guild.totalPower.toLocaleString()} Power</div>
                      <div className="text-sm text-green-400">{guild.wins} Guild Wins</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'power' && (
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Zap className="h-6 w-6 mr-3 text-yellow-400" />
                Ultimate Powers
              </h3>
              <div className="space-y-4">
                {powerRankings.map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(player.rank)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{player.name}</h4>
                        <p className={`text-sm font-medium ${getClassColor(player.class)}`}>{player.class}</p>
                        <p className="text-xs text-gray-400">{player.guild}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-400">{player.power.toLocaleString()} Power</div>
                      <div className="text-sm text-red-400 flex items-center">
                        <Flame className="h-3 w-3 mr-1" />
                        {player.mainPower}
                      </div>
                      <div className="text-xs text-green-400 flex items-center">
                        <Star className="h-3 w-3 mr-1" />
                        {player.petPower}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Update Indicator */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-medium">Live Updates Every 30 Seconds</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RankingsSection