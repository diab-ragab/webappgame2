import React from 'react'
import { Sword, Wand2, Bot as Bow, Shield, Skull, Crown, Zap, Target, Sparkles, X, Star, TrendingUp, Play, Video } from 'lucide-react'

const classes = [
  {
    icon: Crown,
    name: 'Berzeker',
    description: 'Fierce warrior who enters unstoppable rage, dealing massive damage while sacrificing defense.',
    color: 'from-red-500 to-orange-500',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    stats: { strength: 95, agility: 70, vitality: 85, energy: 60 },
    powers: [
      { name: 'Berserker Rage', description: 'Enter an unstoppable fury, increasing damage by 150% but reducing defense by 50%', cooldown: 60 },
      { name: 'Blood Frenzy', description: 'Each kill extends rage duration and increases attack speed', cooldown: 0 },
      { name: 'Immortal Fury', description: 'Become immune to crowd control effects while in rage', cooldown: 120 },
      { name: 'Death Strike', description: 'Deal massive damage based on missing health', cooldown: 30 }
    ],
    playstyle: 'High-risk, high-reward melee combat with devastating burst damage',
    difficulty: 'Hard'
  },
  {
    icon: Wand2,
    name: 'Magus',
    description: 'Master of arcane arts with devastating spells and reality-bending magical abilities.',
    color: 'from-purple-500 to-blue-500',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    stats: { strength: 40, agility: 60, vitality: 55, energy: 100 },
    powers: [
      { name: 'Arcane Missile', description: 'Launch homing magical projectiles that pierce through enemies', cooldown: 8 },
      { name: 'Teleport', description: 'Instantly teleport to target location, leaving behind a magical explosion', cooldown: 15 },
      { name: 'Mana Shield', description: 'Absorb damage using mana instead of health', cooldown: 45 },
      { name: 'Meteor Storm', description: 'Rain down devastating meteors in a large area', cooldown: 90 }
    ],
    playstyle: 'Long-range spellcaster with powerful area-of-effect abilities',
    difficulty: 'Medium'
  },
  {
    icon: Sword,
    name: 'Champion',
    description: 'Noble warrior with balanced combat skills and inspiring leadership abilities.',
    color: 'from-yellow-500 to-amber-500',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    stats: { strength: 80, agility: 75, vitality: 90, energy: 70 },
    powers: [
      { name: 'Divine Strike', description: 'Blessed weapon attacks that deal holy damage and heal allies nearby', cooldown: 12 },
      { name: 'Rally Cry', description: 'Boost all party members\' damage and defense for 30 seconds', cooldown: 120 },
      { name: 'Shield Wall', description: 'Create an impenetrable barrier that protects allies', cooldown: 60 },
      { name: 'Judgment', description: 'Mark enemies for increased damage from all sources', cooldown: 45 }
    ],
    playstyle: 'Balanced warrior-leader with strong team support abilities',
    difficulty: 'Easy'
  },
  {
    icon: Skull,
    name: 'Heretic',
    description: 'Dark practitioner of forbidden arts with cursed magic and soul manipulation.',
    color: 'from-gray-500 to-slate-600',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    stats: { strength: 50, agility: 65, vitality: 60, energy: 95 },
    powers: [
      { name: 'Soul Drain', description: 'Steal life force from enemies to heal yourself and damage them over time', cooldown: 20 },
      { name: 'Curse of Weakness', description: 'Reduce enemy damage and movement speed significantly', cooldown: 30 },
      { name: 'Dark Ritual', description: 'Sacrifice health to gain massive mana and spell power', cooldown: 90 },
      { name: 'Necromantic Aura', description: 'Nearby enemies take constant dark damage', cooldown: 0 }
    ],
    playstyle: 'Dark magic user with life-stealing and debuffing abilities',
    difficulty: 'Hard'
  },
  {
    icon: Zap,
    name: 'Slayer',
    description: 'Lightning-fast assassin with deadly precision and unmatched speed in combat.',
    color: 'from-cyan-500 to-blue-500',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    stats: { strength: 75, agility: 100, vitality: 65, energy: 80 },
    powers: [
      { name: 'Shadow Step', description: 'Instantly appear behind target enemy with guaranteed critical hit', cooldown: 15 },
      { name: 'Poison Blade', description: 'Coat weapons with deadly poison that spreads to nearby enemies', cooldown: 25 },
      { name: 'Vanish', description: 'Become completely invisible and gain massive movement speed', cooldown: 60 },
      { name: 'Assassination', description: 'Deal massive damage to enemies below 30% health', cooldown: 45 }
    ],
    playstyle: 'High-mobility assassin focused on critical hits and stealth',
    difficulty: 'Hard'
  },
  {
    icon: Target,
    name: 'Duelist',
    description: 'Master of blade combat with elegant techniques and deadly finesse strikes.',
    color: 'from-green-500 to-teal-500',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    stats: { strength: 85, agility: 90, vitality: 75, energy: 65 },
    powers: [
      { name: 'Riposte', description: 'Counter-attack that deals double damage after blocking or dodging', cooldown: 10 },
      { name: 'Flurry', description: 'Unleash a series of lightning-fast strikes with increasing damage', cooldown: 20 },
      { name: 'Perfect Balance', description: 'Become immune to knockdown and gain attack speed', cooldown: 45 },
      { name: 'Blade Dance', description: 'Spin attack that hits all nearby enemies with critical chance', cooldown: 35 }
    ],
    playstyle: 'Agile melee fighter with precise timing-based combat',
    difficulty: 'Medium'
  },
  {
    icon: Bow,
    name: 'Ranger',
    description: 'Expert marksman with nature magic and unparalleled archery skills.',
    color: 'from-emerald-500 to-green-500',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    stats: { strength: 60, agility: 95, vitality: 70, energy: 85 },
    powers: [
      { name: 'Multi-Shot', description: 'Fire multiple arrows that split and hit additional targets', cooldown: 12 },
      { name: 'Nature\'s Blessing', description: 'Summon healing spirits and gain natural armor', cooldown: 60 },
      { name: 'Eagle Eye', description: 'Increase range and critical hit chance dramatically', cooldown: 30 },
      { name: 'Rain of Arrows', description: 'Barrage a large area with hundreds of magical arrows', cooldown: 90 }
    ],
    playstyle: 'Long-range archer with nature magic and pet companions',
    difficulty: 'Medium'
  },
  {
    icon: Shield,
    name: 'Harbinger',
    description: 'Herald of destruction with apocalyptic powers and battlefield dominance.',
    color: 'from-red-600 to-purple-600',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    stats: { strength: 90, agility: 55, vitality: 100, energy: 75 },
    powers: [
      { name: 'Apocalypse', description: 'Channel devastating energy that grows stronger over time', cooldown: 120 },
      { name: 'Doom Aura', description: 'Enemies near you take increasing damage over time', cooldown: 0 },
      { name: 'Cataclysm', description: 'Create massive explosions that chain between enemies', cooldown: 45 },
      { name: 'Immortal Wrath', description: 'Become unstoppable and immune to death for 10 seconds', cooldown: 180 }
    ],
    playstyle: 'Tanky destroyer with massive area damage and crowd control',
    difficulty: 'Hard'
  },
  {
    icon: Sparkles,
    name: 'Enchantress',
    description: 'Mystical spellcaster with enchanting abilities and powerful support magic.',
    color: 'from-pink-500 to-purple-500',
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    stats: { strength: 45, agility: 70, vitality: 65, energy: 90 },
    powers: [
      { name: 'Charm', description: 'Turn enemies into temporary allies who fight for you', cooldown: 45 },
      { name: 'Healing Aura', description: 'Continuously heal all nearby allies over time', cooldown: 0 },
      { name: 'Mana Burn', description: 'Drain enemy mana and deal damage based on amount drained', cooldown: 20 },
      { name: 'Mass Enchantment', description: 'Boost all allies\' magical abilities and resistances', cooldown: 90 }
    ],
    playstyle: 'Support caster with crowd control and team enhancement abilities',
    difficulty: 'Medium'
  }
]

const ClassesSection: React.FC = () => {
  const [selectedClass, setSelectedClass] = React.useState<any>(null)
  const [showVideo, setShowVideo] = React.useState(false)

  return (
    <section id="classes" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
            Choose Your Destiny
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master one of nine unique classes, each with devastating abilities and distinct playstyles. 
            Your choice will determine your path to immortality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem, index) => {
            const IconComponent = classItem.icon
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
                onClick={() => setSelectedClass(classItem)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${classItem.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${classItem.color} flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white text-center mb-3 group-hover:text-yellow-400 transition-colors">
                    {classItem.name}
                  </h3>
                  
                  <p className="text-gray-300 text-center text-sm leading-relaxed mb-4">
                    {classItem.description}
                  </p>
                  
                  {classItem.difficulty && (
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        classItem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        classItem.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {classItem.difficulty}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="sticky top-0 bg-gradient-to-br from-gray-800 to-gray-900 p-6 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedClass.color} flex items-center justify-center`}>
                  <selectedClass.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">{selectedClass.name}</h3>
              </div>
              <button
                onClick={() => {
                  setSelectedClass(null)
                  setShowVideo(false)
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">{selectedClass.description}</p>
              
              {/* Video Preview Section */}
              {selectedClass.video && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Video className="w-5 h-5 mr-2" />
                    Class Preview
                  </h4>
                  {!showVideo ? (
                    <button
                      onClick={() => setShowVideo(true)}
                      className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Play className="w-5 h-5" />
                      <span>Watch Preview</span>
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="aspect-video bg-black rounded-lg overflow-hidden">
                        <video
                          src={selectedClass.video}
                          controls
                          className="w-full h-full"
                          autoPlay
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <button
                        onClick={() => setShowVideo(false)}
                        className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Close Video</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {/* Stats */}
              {selectedClass.stats && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Base Statistics
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedClass.stats).map(([stat, value]) => (
                      <div key={stat} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300 capitalize">{stat}</span>
                          <span className="text-white font-semibold">{value}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${selectedClass.color}`}
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Powers */}
              {selectedClass.powers && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Signature Abilities
                  </h4>
                  <div className="grid gap-4">
                    {selectedClass.powers.map((power, index) => (
                      <div key={index} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-yellow-400">{power.name}</h5>
                          <span className="text-xs text-gray-400 bg-gray-600 px-2 py-1 rounded">
                            {power.cooldown}s CD
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{power.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Playstyle & Difficulty */}
              {(selectedClass.playstyle || selectedClass.difficulty) && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-4">Combat Style</h4>
                  <div className="space-y-3">
                    {selectedClass.playstyle && (
                      <p className="text-gray-300">{selectedClass.playstyle}</p>
                    )}
                    {selectedClass.difficulty && (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Difficulty:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          selectedClass.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                          selectedClass.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {selectedClass.difficulty}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ClassesSection