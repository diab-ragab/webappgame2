import React, { useState } from 'react'
import { User, Settings, Sword, Users, Trophy, LogOut, X, Crown, Shield, Zap, Lock, Eye, EyeOff, Coins, Calendar, Clock, MessageCircle, Send, Bot, Star, AlertCircle, CheckCircle } from 'lucide-react'

interface UserPanelProps {
  user: any
  onClose: () => void
  onSignOut: () => void
  onOpenZenStore?: () => void
  events?: any[]
  bosses?: any[]
}

const UserPanel: React.FC<UserPanelProps> = ({ user, onClose, onSignOut, onOpenZenStore, events = [], bosses = [] }) => {
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [changingPassword, setChangingPassword] = useState(false)

  // Chat state variables
  const [chatMessages, setChatMessages] = useState<Array<{id: number, type: string, message: string}>>([])
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Mock user data - in real app this would come from your database
  const mockUserData = {
    zenBalance: 2500000,
    characterCount: 3,
    registrationDate: user?.created_at || new Date().toISOString(),
    lastLogin: '2024-01-15 16:45:23',
    lastZenPurchase: '2024-01-10 14:30:15'
  }

  const handleSignOut = async () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    onSignOut()
    onClose()
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')
    setChangingPassword(true)

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match')
      setChangingPassword(false)
      return
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long')
      setChangingPassword(false)
      return
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/change-password.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          currentPassword,
          newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Password change failed')
      }

      setPasswordSuccess('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setShowChangePassword(false)
    } catch (error: any) {
      setPasswordError(error.message)
    } finally {
      setChangingPassword(false)
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = { id: Date.now(), type: 'user', message: chatInput }
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! For PvP combat, I recommend focusing on your class's signature abilities and timing your combos perfectly.",
        "The best way to level up quickly is to participate in guild events and complete daily quests. Don't forget about the Double XP weekends!",
        "Boss hunting is very profitable! Check the Boss Times tab to see when the next legendary bosses spawn. Ancient Dragon Lord drops the best loot!",
        "For new players, I suggest starting with the Champion class - it's well-balanced and great for learning the game mechanics.",
        "Zen can be earned through PvP victories, boss kills, and daily login rewards. You can also purchase it in our store for faster progression!",
        "Guild wars are epic! Join a guild to participate in massive battles and earn exclusive rewards. Check the Guild tab to find one that fits your playstyle.",
        "Each class has unique powers and playstyles. Experiment with different builds and find what works best for your combat style!",
        "The ranking system is based on PvP wins, power level, and overall achievements. Keep fighting and climbing those leaderboards!"
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const botMessage = { id: Date.now() + 1, type: 'bot', message: randomResponse }
      
      setChatMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
      case 'active': return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'completed': return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  const getBossStatusColor = (status: string) => {
    switch (status) {
      case 'alive': return 'text-green-400'
      case 'dead': return 'text-red-400'
      case 'spawning': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Legendary': return 'text-purple-400'
      case 'Epic': return 'text-orange-400'
      case 'Rare': return 'text-blue-400'
      default: return 'text-gray-400'
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'characters', label: 'Characters', icon: Sword },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'bosses', label: 'Boss Times', icon: Clock },
    { id: 'guild', label: 'Guild', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'chatbot', label: 'AI Guide', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const mockCharacters = [
    { 
      id: 1,
      name: 'Shadowbane', 
      class: 'Berzeker', 
      level: 85, 
      realm: 'Nethermoor',
      godLevel: 12,
      pvpWins: 247,
      pvpRank: 'Immortal Warrior',
      powers: ['Berserker Rage', 'Blood Frenzy', 'Immortal Fury', 'Death Strike'],
      pets: [
        { name: 'Shadowfang', type: 'Dark Wolf', level: 80 },
        { name: 'Voidclaw', type: 'Shadow Dragon', level: 75 }
      ],
      stats: {
        strength: 2850,
        agility: 1920,
        vitality: 3200,
        energy: 1650
      }
    },
    { 
      id: 2,
      name: 'Lightbringer', 
      class: 'Champion', 
      level: 72, 
      realm: 'Celestial Plains',
      godLevel: 8,
      pvpWins: 156,
      pvpRank: 'Divine Guardian',
      powers: ['Holy Strike', 'Divine Shield', 'Blessing of Light', 'Sacred Weapon'],
      pets: [
        { name: 'Celestia', type: 'Light Phoenix', level: 70 }
      ],
      stats: {
        strength: 2100,
        agility: 1800,
        vitality: 2900,
        energy: 2200
      }
    },
    { 
      id: 3,
      name: 'Stormweaver', 
      class: 'Magus', 
      level: 68, 
      realm: 'Arcane Sanctum',
      godLevel: 6,
      pvpWins: 89,
      pvpRank: 'Arcane Master',
      powers: ['Lightning Storm', 'Arcane Missile', 'Teleport', 'Mana Shield'],
      pets: [
        { name: 'Sparkle', type: 'Electric Sprite', level: 65 },
        { name: 'Thunderwing', type: 'Storm Eagle', level: 68 }
      ],
      stats: {
        strength: 1200,
        agility: 1600,
        vitality: 1800,
        energy: 3500
      }
    },
  ]

  const mockAchievements = [
    { title: 'First Blood', description: 'Win your first PvP battle', icon: Sword, completed: true },
    { title: 'Guild Master', description: 'Lead a guild to victory', icon: Crown, completed: true },
    { title: 'Immortal Ascension', description: 'Reach maximum level', icon: Zap, completed: false },
    { title: 'Realm Conqueror', description: 'Conquer all 12 realms', icon: Shield, completed: false },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] border border-purple-500/20 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Warrior Panel</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 bg-black/20 border-r border-purple-500/20 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Sign Out Button */}
            <div className="mt-8 pt-4 border-t border-purple-500/20">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">Profile Overview</h3>
                
                {/* Zen Balance Card */}
                <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-xl p-6 border border-yellow-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                        <Coins className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">Zen Balance</h4>
                        <p className="text-yellow-400 text-2xl font-bold">{mockUserData.zenBalance.toLocaleString()}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (onOpenZenStore) {
                          onOpenZenStore()
                          onClose()
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                    >
                      Buy More
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                    <h4 className="text-lg font-bold text-white mb-4">Account Info</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-400">Email</label>
                        <p className="text-white">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Registration Date</span>
                        </label>
                        <p className="text-white">{new Date(mockUserData.registrationDate).toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Last Login</span>
                        </label>
                        <p className="text-white">{mockUserData.lastLogin}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400">Status</label>
                        <p className="text-green-400">Active Warrior</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                    <h4 className="text-lg font-bold text-white mb-4">Game Stats</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400 flex items-center space-x-1">
                          <Sword className="h-4 w-4" />
                          <span>Characters</span>
                        </span>
                        <span className="text-white">{mockUserData.characterCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Playtime</span>
                        <span className="text-white">247 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">PvP Wins</span>
                        <span className="text-white">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Quests Completed</span>
                        <span className="text-white">89</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase History */}
                <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-yellow-400" />
                    <span>Purchase History</span>
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-purple-500/10">
                      <div>
                        <p className="text-white font-medium">Last Zen Purchase</p>
                        <p className="text-gray-400 text-sm">{mockUserData.lastZenPurchase}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-400 font-bold">+1,000,000 Zen</p>
                        <p className="text-gray-400 text-sm">€5.00</p>
                      </div>
                    </div>
                    <button className="w-full py-2 text-purple-400 hover:text-purple-300 text-sm transition-colors">
                      View Full Purchase History
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'characters' && (
              <div className="space-y-6">
                {!selectedCharacter ? (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-white">Your Characters</h3>
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                        Create New
                      </button>
                    </div>
                    <div className="grid gap-4">
                      {mockCharacters.map((character) => (
                        <div 
                          key={character.id} 
                          className="bg-black/20 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 cursor-pointer"
                          onClick={() => setSelectedCharacter(character)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-xl font-bold text-white">{character.name}</h4>
                              <p className="text-purple-400">{character.class}</p>
                              <p className="text-gray-400">Level {character.level} • {character.realm}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm">
                                <span className="text-yellow-400">God Level {character.godLevel}</span>
                                <span className="text-green-400">{character.pvpWins} PvP Wins</span>
                                <span className="text-blue-400">{character.pvpRank}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                                className="px-3 py-1 bg-green-600/20 text-green-400 rounded border border-green-600/30 hover:bg-green-600/30 transition-colors"
                              >
                                Play
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation()
                                }}
                                className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded border border-blue-600/30 hover:bg-blue-600/30 transition-colors"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setSelectedCharacter(null)}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        ← Back to Characters
                      </button>
                      <h3 className="text-2xl font-bold text-white">{selectedCharacter.name}</h3>
                    </div>

                    {/* Character Overview */}
                    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-bold text-white mb-4">Character Info</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Class:</span>
                              <span className="text-purple-400 font-bold">{selectedCharacter.class}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Level:</span>
                              <span className="text-white font-bold">{selectedCharacter.level}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">God Level:</span>
                              <span className="text-yellow-400 font-bold">{selectedCharacter.godLevel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Realm:</span>
                              <span className="text-blue-400">{selectedCharacter.realm}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400">Username</label>
                          <p className="text-white">{user.user_metadata?.username || 'Not set'}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-4">PvP Stats</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">PvP Wins:</span>
                              <span className="text-green-400 font-bold">{selectedCharacter.pvpWins}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">PvP Rank:</span>
                              <span className="text-orange-400 font-bold">{selectedCharacter.pvpRank}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Character Stats */}
                    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                      <h4 className="text-lg font-bold text-white mb-4">Character Stats</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                          <div className="text-2xl font-bold text-red-400">{selectedCharacter.stats.strength}</div>
                          <div className="text-sm text-gray-400">Strength</div>
                        </div>
                        <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                          <div className="text-2xl font-bold text-green-400">{selectedCharacter.stats.agility}</div>
                          <div className="text-sm text-gray-400">Agility</div>
                        </div>
                        <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <div className="text-2xl font-bold text-blue-400">{selectedCharacter.stats.vitality}</div>
                          <div className="text-sm text-gray-400">Vitality</div>
                        </div>
                        <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          <div className="text-2xl font-bold text-purple-400">{selectedCharacter.stats.energy}</div>
                          <div className="text-sm text-gray-400">Energy</div>
                        </div>
                      </div>
                    </div>

                    {/* Powers */}
                    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                        Powers & Abilities
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedCharacter.powers.map((power: string, index: number) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                            <Zap className="h-4 w-4 text-yellow-400" />
                            <span className="text-white font-medium">{power}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pets */}
                    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                        <Crown className="h-5 w-5 mr-2 text-green-400" />
                        Companion Pets
                      </h4>
                      <div className="grid gap-4">
                        {selectedCharacter.pets.map((pet: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                            <div className="flex items-center space-x-3">
                              <Crown className="h-6 w-6 text-green-400" />
                              <div>
                                <h5 className="text-white font-bold">{pet.name}</h5>
                                <p className="text-green-400 text-sm">{pet.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-bold">Level {pet.level}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Upcoming Events</h3>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-xl font-bold text-white">{event.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${getEventStatusColor(event.status)}`}>
                              {event.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-400 mb-3">{event.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Start Time:</span>
                              <span className="text-white ml-1">{event.startTime}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Duration:</span>
                              <span className="text-white ml-1">{event.duration}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Participants:</span>
                              <span className="text-white ml-1">{event.participants || 0}/{event.maxParticipants || 'Unlimited'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {events.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-400">No events scheduled at the moment</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'bosses' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Boss Spawn Times</h3>
                <div className="space-y-4">
                  {bosses.map((boss) => (
                    <div key={boss.id} className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-xl font-bold text-white">{boss.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              boss.difficulty === 'Legendary' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                              boss.difficulty === 'Epic' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                              'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                              {boss.difficulty}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              boss.status === 'alive' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                              boss.status === 'dead' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                              'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                              {boss.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-400 mb-2">{boss.location} • Level {boss.level}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Next Spawn:</span>
                              <span className="text-white ml-1">{boss.nextSpawn}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Respawn Time:</span>
                              <span className="text-white ml-1">{boss.respawnTime}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Last Killed By:</span>
                              <span className="text-yellow-400 ml-1">{boss.lastKilledBy}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Rewards:</span>
                              <span className="text-green-400 ml-1 text-xs">{Array.isArray(boss.rewards) ? boss.rewards.join(', ') : boss.rewards}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {bosses.length === 0 && (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-400">No boss spawn times available</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'guild' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Guild Information</h3>
                <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-400">You are not currently in a guild</p>
                    <button className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                      Find a Guild
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Achievements</h3>
                <div className="grid gap-4">
                  {mockAchievements.map((achievement, index) => (
                    <div key={index} className={`bg-black/20 rounded-xl p-6 border ${
                      achievement.completed ? 'border-green-500/30' : 'border-purple-500/20'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          achievement.completed ? 'bg-green-500/20' : 'bg-gray-500/20'
                        }`}>
                          <achievement.icon className={`h-6 w-6 ${
                            achievement.completed ? 'text-green-400' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white">{achievement.title}</h4>
                          <p className="text-gray-400">{achievement.description}</p>
                        </div>
                        {achievement.completed && (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'chatbot' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center">
                  <Bot className="h-6 w-6 mr-3 text-blue-400" />
                  AI Game Guide
                </h3>
                
                {/* Chat Container */}
                <div className="bg-black/20 rounded-xl border border-purple-500/20 h-96 flex flex-col">
                  {/* Chat Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.type === 'user' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-blue-600/20 text-blue-100 border border-blue-500/30'
                        }`}>
                          {msg.type === 'bot' && (
                            <div className="flex items-center space-x-2 mb-1">
                              <Bot className="h-4 w-4 text-blue-400" />
                              <span className="text-xs text-blue-400 font-bold">AI Guide</span>
                            </div>
                          )}
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-blue-600/20 text-blue-100 border border-blue-500/30 px-4 py-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-4 w-4 text-blue-400" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Chat Input */}
                  <div className="border-t border-purple-500/20 p-4">
                    <form onSubmit={handleChatSubmit} className="flex space-x-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask me anything about the game..."
                        className="flex-1 px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={!chatInput.trim() || isTyping}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>
                
                {/* Quick Questions */}
                <div className="bg-black/20 rounded-xl p-4 border border-purple-500/20">
                  <h4 className="text-lg font-bold text-white mb-3">Quick Questions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "How do I level up faster?",
                      "Which class is best for PvP?",
                      "When do bosses spawn?",
                      "How to join a guild?",
                      "Best way to earn Zen?",
                      "PvP combat tips?"
                    ].map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setChatInput(question)
                          handleChatSubmit({ preventDefault: () => {} } as React.FormEvent)
                        }}
                        className="text-left px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded border border-blue-500/20 hover:border-blue-500/40 transition-all duration-200 text-sm"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Account Settings</h3>
                
                {/* Change Password Section */}
                <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-white">Password & Security</h4>
                    <button
                      onClick={() => setShowChangePassword(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                    >
                      <Lock className="h-4 w-4" />
                      <span>Change Password</span>
                    </button>
                  </div>
                  
                  {showChangePassword && (
                    <form onSubmit={handleChangePassword} className="space-y-4 mt-6">
                      {/* Current Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-12 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-12 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm New Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-12 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Confirm new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Error/Success Messages */}
                      {passwordError && (
                        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                          {passwordError}
                        </div>
                      )}
                      
                      {passwordSuccess && (
                        <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
                          {passwordSuccess}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          disabled={changingPassword}
                          className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:scale-100"
                        >
                          {changingPassword ? 'Changing...' : 'Change Password'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowChangePassword(false)
                            setCurrentPassword('')
                            setNewPassword('')
                            setConfirmPassword('')
                            setPasswordError('')
                            setPasswordSuccess('')
                          }}
                          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                    <h4 className="text-lg font-bold text-white mb-4">Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded bg-black/20 border-purple-500/30" defaultChecked />
                        <span className="text-gray-300">Guild notifications</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded bg-black/20 border-purple-500/30" defaultChecked />
                        <span className="text-gray-300">PvP match alerts</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded bg-black/20 border-purple-500/30" />
                        <span className="text-gray-300">Marketing emails</span>
                      </label>
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                    <h4 className="text-lg font-bold text-white mb-4">Privacy</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded bg-black/20 border-purple-500/30" defaultChecked />
                        <span className="text-gray-300">Show online status</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded bg-black/20 border-purple-500/30" defaultChecked />
                        <span className="text-gray-300">Allow friend requests</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPanel