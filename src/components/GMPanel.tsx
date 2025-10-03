import React, { useState } from 'react'
import { X, Plus, Users, Coins, Send, Search, CreditCard as Edit, Trash2, Shield, Crown, Eye, Calendar, Clock, Zap, Target } from 'lucide-react'

interface GMPanelProps {
  onClose: () => void
  newsItems?: any[]
  setNewsItems?: (items: any[]) => void
  events?: any[]
  setEvents?: (events: any[]) => void
  bosses?: any[]
  setBosses?: (bosses: any[]) => void
}

const GMPanel: React.FC<GMPanelProps> = ({ 
  onClose, 
  newsItems, 
  setNewsItems,
  events,
  setEvents,
  bosses,
  setBosses
}) => {
  // Handle default values for props
  const currentNewsItems = newsItems || []
  const currentEvents = events || []
  const currentBosses = bosses || []

  const mockAccounts = [
  {
    id: 1,
    email: 'player1@example.com',
    username: 'DragonSlayer',
    level: 85,
    zen: 2500000,
    status: 'online',
    lastLogin: '2024-01-15 14:30',
    characters: 3
  },
  {
    id: 2,
    email: 'player2@example.com',
    username: 'ShadowMage',
    level: 72,
    zen: 1800000,
    status: 'offline',
    lastLogin: '2024-01-14 22:15',
    characters: 2
  },
  {
    id: 3,
    email: 'player3@example.com',
    username: 'IronGuardian',
    level: 68,
    zen: 950000,
    status: 'online',
    lastLogin: '2024-01-15 16:45',
    characters: 1
  }
]

  const [activeTab, setActiveTab] = useState('accounts')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null)
  const [zenAmount, setZenAmount] = useState('')
  const [zenReason, setZenReason] = useState('')
  const [showAddNews, setShowAddNews] = useState(false)
  const [newsTitle, setNewsTitle] = useState('')
  const [newsContent, setNewsContent] = useState('')
  const [newsAuthor, setNewsAuthor] = useState('')
  const [newsImage, setNewsImage] = useState('')
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [showAddBoss, setShowAddBoss] = useState(false)
  const [eventName, setEventName] = useState('')
  const [eventType, setEventType] = useState('PvP Event')
  const [eventStartTime, setEventStartTime] = useState('')
  const [eventEndTime, setEventEndTime] = useState('')
  const [eventRewards, setEventRewards] = useState('')
  const [eventMaxParticipants, setEventMaxParticipants] = useState('')
  const [bossName, setBossName] = useState('')
  const [bossLocation, setBossLocation] = useState('')
  const [bossNextSpawn, setBossNextSpawn] = useState('')
  const [bossRespawnTime, setBossRespawnTime] = useState('')
  const [bossDifficulty, setBossDifficulty] = useState('Epic')
  const [bossLevel, setBossLevel] = useState('')
  const [bossRewards, setBossRewards] = useState('')
  

  const tabs = [
    { id: 'accounts', label: 'Player Accounts', icon: Users },
    { id: 'news', label: 'News Management', icon: Edit },
    { id: 'zen', label: 'Zen Management', icon: Coins },
    { id: 'events', label: 'Event Management', icon: Calendar },
    { id: 'bosses', label: 'Boss Management', icon: Target }
  ]

  const filteredAccounts = mockAccounts.filter(account =>
    account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendZen = () => {
    if (selectedAccount && zenAmount && zenReason) {
      alert(`Sent ${parseInt(zenAmount).toLocaleString()} Zen to account ID ${selectedAccount}\nReason: ${zenReason}`)
      setSelectedAccount(null)
      setZenAmount('')
      setZenReason('')
    }
  }

  const handleAddNews = () => {
    if (newsTitle && newsContent && newsAuthor) {
      const newNews = {
        id: Date.now(),
        title: newsTitle,
        excerpt: newsContent.substring(0, 150) + '...',
        content: newsContent,
        date: new Date().toISOString().split('T')[0],
        author: newsAuthor,
        image: newsImage || 'https://images.pexels.com/photos/1202723/pexels-photo-1202723.jpeg?auto=compress&cs=tinysrgb&w=600',
        status: 'published'
      }
      
      if (setNewsItems) {
        setNewsItems([newNews, ...currentNewsItems])
      }
      
      setShowAddNews(false)
      setNewsTitle('')
      setNewsContent('')
      setNewsAuthor('')
      setNewsImage('')
      alert(`News article "${newsTitle}" has been created and published!`)
    }
  }

  const handleDeleteNews = (newsId: number) => {
    if (setNewsItems && window.confirm('Are you sure you want to delete this news article?')) {
      setNewsItems(newsItems.filter(news => news.id !== newsId))
    }
  }

  const handleAddEvent = () => {
    if (eventName && eventStartTime && eventEndTime && eventRewards) {
      const newEvent = {
        id: Date.now(),
        name: eventName,
        type: eventType,
        startTime: eventStartTime,
        endTime: eventEndTime,
        status: 'upcoming',
        rewards: eventRewards,
        participants: 0,
        maxParticipants: parseInt(eventMaxParticipants) || 100
      }
      
      if (setEvents) {
        setEvents([newEvent, ...currentEvents])
      }
      setShowAddEvent(false)
      setEventName('')
      setEventType('PvP Event')
      setEventStartTime('')
      setEventEndTime('')
      setEventRewards('')
      setEventMaxParticipants('')
      alert(`Event "${eventName}" has been created!`)
    }
  }

  const handleAddBoss = () => {
    if (bossName && bossLocation && bossNextSpawn && bossRespawnTime && bossLevel) {
      const newBoss = {
        id: Date.now(),
        name: bossName,
        location: bossLocation,
        nextSpawn: bossNextSpawn,
        respawnTime: bossRespawnTime,
        difficulty: bossDifficulty,
        level: parseInt(bossLevel),
        rewards: bossRewards.split(',').map(r => r.trim()).filter(r => r),
        status: 'alive',
        lastKilledBy: 'Unknown'
      }
      
      setBosses([newBoss, ...bosses])
      setShowAddBoss(false)
      setBossName('')
      setBossLocation('')
      setBossNextSpawn('')
      setBossRespawnTime('')
      setBossDifficulty('Epic')
      setBossLevel('')
      setBossRewards('')
      alert(`Boss "${bossName}" has been added!`)
    }
  }

  const handleDeleteEvent = (eventId: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== eventId))
    }
  }

  const handleDeleteBoss = (bossId: number) => {
    if (window.confirm('Are you sure you want to delete this boss?')) {
      setBosses(bosses.filter(boss => boss.id !== bossId))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800/95 to-red-900/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] border border-red-500/20 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-red-500/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">GM Control Panel</h2>
              <p className="text-gray-400">Game Master Administration Tools</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex h-[700px]">
          {/* Sidebar */}
          <div className="w-64 bg-black/20 border-r border-red-500/20 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-bold text-white">GM Status</span>
              </div>
              <p className="text-xs text-gray-400">Full administrative access</p>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'accounts' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Player Accounts</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search accounts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  {filteredAccounts.map((account) => (
                    <div key={account.id} className="bg-black/20 rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-xl font-bold text-white">{account.username}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              account.status === 'online' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}>
                              {account.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-400 mb-1">{account.email}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Level:</span>
                              <span className="text-white ml-1">{account.level}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Zen:</span>
                              <span className="text-yellow-400 ml-1">{account.zen.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Characters:</span>
                              <span className="text-white ml-1">{account.characters}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Last Login:</span>
                              <span className="text-white ml-1">{account.lastLogin}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded border border-blue-600/30 hover:bg-blue-600/30 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => setSelectedAccount(account.id)}
                            className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded border border-yellow-600/30 hover:bg-yellow-600/30 transition-colors"
                          >
                            <Coins className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">News Management</h3>
                  <button
                    onClick={() => setShowAddNews(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add News</span>
                  </button>
                </div>

                {showAddNews && (
                  <div className="bg-black/40 rounded-xl p-6 border border-red-500/20">
                    <h4 className="text-lg font-bold text-white mb-4">Create News Article</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                        <input
                          type="text"
                          value={newsTitle}
                          onChange={(e) => setNewsTitle(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter news title..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
                        <textarea
                          value={newsContent}
                          onChange={(e) => setNewsContent(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter news content..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Author</label>
                        <input
                          type="text"
                          value={newsAuthor}
                          onChange={(e) => setNewsAuthor(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter author name..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                        <input
                          type="url"
                          value={newsImage}
                          onChange={(e) => setNewsImage(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter image URL (optional)..."
                        />
                        {newsImage && (
                          <div className="mt-2">
                            <img 
                              src={newsImage} 
                              alt="Preview" 
                              className="w-32 h-20 object-cover rounded border border-gray-600"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={handleAddNews}
                          className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                        >
                          Publish News
                        </button>
                        <button
                          onClick={() => setShowAddNews(false)}
                          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid gap-4">
                  {newsItems.map((news) => (
                    <div key={news.id} className="bg-black/20 rounded-xl p-6 border border-red-500/20">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2">{news.title}</h4>
                          <p className="text-gray-400 mb-3">{news.excerpt}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>By {news.author}</span>
                            <span>{news.date}</span>
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                              {news.status?.toUpperCase() || 'PUBLISHED'}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded border border-blue-600/30 hover:bg-blue-600/30 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteNews(news.id)}
                            className="px-3 py-1 bg-red-600/20 text-red-400 rounded border border-red-600/30 hover:bg-red-600/30 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'zen' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Zen Management</h3>
                
                {selectedAccount && (
                  <div className="bg-black/40 rounded-xl p-6 border border-red-500/20">
                    <h4 className="text-lg font-bold text-white mb-4">Send Zen to Player</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Selected Account</label>
                        <div className="p-3 bg-black/20 rounded-lg border border-gray-600">
                          <p className="text-white font-medium">
                            {mockAccounts.find(acc => acc.id === selectedAccount)?.username}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {mockAccounts.find(acc => acc.id === selectedAccount)?.email}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Zen Amount</label>
                        <input
                          type="number"
                          value={zenAmount}
                          onChange={(e) => setZenAmount(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter Zen amount..."
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Reason</label>
                      <input
                        type="text"
                        value={zenReason}
                        onChange={(e) => setZenReason(e.target.value)}
                        className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter reason for Zen transfer..."
                      />
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <button
                        onClick={handleSendZen}
                        className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                      >
                        <Send className="h-4 w-4" />
                        <span>Send Zen</span>
                      </button>
                      <button
                        onClick={() => setSelectedAccount(null)}
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-black/20 rounded-xl p-6 border border-red-500/20">
                  <h4 className="text-lg font-bold text-white mb-4">Zen Statistics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">2.5B</div>
                      <div className="text-gray-400">Total Zen in Economy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">€15,420</div>
                      <div className="text-gray-400">Revenue This Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">1,247</div>
                      <div className="text-gray-400">Zen Purchases</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Event Management</h3>
                  <button
                    onClick={() => setShowAddEvent(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Event</span>
                  </button>
                </div>

                {showAddEvent && (
                  <div className="bg-black/40 rounded-xl p-6 border border-red-500/20">
                    <h4 className="text-lg font-bold text-white mb-4">Create New Event</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Event Name</label>
                        <input
                          type="text"
                          value={eventName}
                          onChange={(e) => setEventName(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter event name..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Event Type</label>
                        <select
                          value={eventType}
                          onChange={(e) => setEventType(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="PvP Event">PvP Event</option>
                          <option value="Guild Event">Guild Event</option>
                          <option value="Server Event">Server Event</option>
                          <option value="Boss Event">Boss Event</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Start Time</label>
                        <input
                          type="datetime-local"
                          value={eventStartTime}
                          onChange={(e) => setEventStartTime(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">End Time</label>
                        <input
                          type="datetime-local"
                          value={eventEndTime}
                          onChange={(e) => setEventEndTime(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Rewards</label>
                        <input
                          type="text"
                          value={eventRewards}
                          onChange={(e) => setEventRewards(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="e.g., 50,000 Zen + Legendary Weapon"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Max Participants</label>
                        <input
                          type="number"
                          value={eventMaxParticipants}
                          onChange={(e) => setEventMaxParticipants(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter max participants..."
                        />
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <button
                        onClick={handleAddEvent}
                        className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                      >
                        Create Event
                      </button>
                      <button
                        onClick={() => setShowAddEvent(false)}
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid gap-4">
                  {events.map((event) => (
                    <div key={event.id} className="bg-black/20 rounded-xl p-6 border border-red-500/20">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2">{event.name}</h4>
                          <p className="text-blue-400 mb-2">{event.type}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Start:</span>
                              <span className="text-white ml-1">{event.startTime}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">End:</span>
                              <span className="text-white ml-1">{event.endTime}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Rewards:</span>
                              <span className="text-yellow-400 ml-1">{event.rewards}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Participants:</span>
                              <span className="text-white ml-1">{event.participants}/{event.maxParticipants}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded border border-blue-600/30 hover:bg-blue-600/30 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteEvent(event.id)}
                            className="px-3 py-1 bg-red-600/20 text-red-400 rounded border border-red-600/30 hover:bg-red-600/30 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bosses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Boss Management</h3>
                  <button
                    onClick={() => setShowAddBoss(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Boss</span>
                  </button>
                </div>

                {showAddBoss && (
                  <div className="bg-black/40 rounded-xl p-6 border border-red-500/20">
                    <h4 className="text-lg font-bold text-white mb-4">Add New Boss</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Boss Name</label>
                        <input
                          type="text"
                          value={bossName}
                          onChange={(e) => setBossName(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter boss name..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                        <input
                          type="text"
                          value={bossLocation}
                          onChange={(e) => setBossLocation(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter location..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Next Spawn Time</label>
                        <input
                          type="datetime-local"
                          value={bossNextSpawn}
                          onChange={(e) => setBossNextSpawn(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Respawn Time</label>
                        <input
                          type="text"
                          value={bossRespawnTime}
                          onChange={(e) => setBossRespawnTime(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="e.g., 6 hours"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Difficulty</label>
                        <select
                          value={bossDifficulty}
                          onChange={(e) => setBossDifficulty(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="Rare">Rare</option>
                          <option value="Epic">Epic</option>
                          <option value="Legendary">Legendary</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Level</label>
                        <input
                          type="number"
                          value={bossLevel}
                          onChange={(e) => setBossLevel(e.target.value)}
                          className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter boss level..."
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Rewards (comma separated)</label>
                      <input
                        type="text"
                        value={bossRewards}
                        onChange={(e) => setBossRewards(e.target.value)}
                        className="w-full px-4 py-2 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="e.g., Dragon Scale Armor, Immortal Sword, 100000 Zen"
                      />
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <button
                        onClick={handleAddBoss}
                        className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                      >
                        Add Boss
                      </button>
                      <button
                        onClick={() => setShowAddBoss(false)}
                        className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid gap-4">
                  {currentBosses.map((boss) => (
                    <div key={boss.id} className="bg-black/20 rounded-xl p-6 border border-red-500/20">
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
                              <span className="text-green-400 ml-1">{boss.rewards.join(', ')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded border border-blue-600/30 hover:bg-blue-600/30 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteBoss(boss.id)}
                            className="px-3 py-1 bg-red-600/20 text-red-400 rounded border border-red-600/30 hover:bg-red-600/30 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GMPanel