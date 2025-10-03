import React from 'react'
import { Server, Globe, Users, Zap, Clock, Wifi, AlertTriangle, CheckCircle } from 'lucide-react'

const ServerStatus: React.FC = () => {
  const server = {
    name: 'WOI Universe',
    region: 'Europe',
    status: 'online',
    players: 15420,
    maxPlayers: 20000,
    ping: 45,
    uptime: '99.8%',
    load: 77,
    totalAccounts: 89247,
    totalCharacters: 156893,
    lastAccountCreated: '2024-01-15 18:23:45',
    lastCharacterCreated: '2024-01-15 18:45:12'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'maintenance': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'offline': return 'text-red-400 bg-red-500/20 border-red-500/30'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-4 w-4" />
      case 'maintenance': return <AlertTriangle className="h-4 w-4" />
      case 'offline': return <Server className="h-4 w-4" />
      default: return <Server className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Low': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'
      case 'High': return 'text-orange-400'
      case 'Extreme': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getLoadColor = (load: number) => {
    if (load < 50) return 'from-green-500 to-green-600'
    if (load < 75) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }

  return (
    <section id="server-status" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Server
            <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent"> Status</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-time status of the game server and all realms are currently online.
          </p>
        </div>

        {/* Server Status */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Server className="h-6 w-6 mr-3 text-blue-400" />
            Game Server
          </h3>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{server.name}</h4>
                  <p className="text-gray-400 flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {server.region}
                  </p>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(server.status)}`}>
                  {getStatusIcon(server.status)}
                  <span className="text-sm font-bold uppercase">{server.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-blue-400 mr-1" />
                    <span className="text-sm text-gray-400">Players</span>
                  </div>
                  <div className="text-lg font-bold text-white">
                    {server.players.toLocaleString()}/{server.maxPlayers.toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-3 bg-black/20 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Wifi className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-sm text-gray-400">Ping</span>
                  </div>
                  <div className="text-lg font-bold text-white">{server.ping}ms</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Uptime
                  </span>
                  <span className="text-green-400 font-bold">{server.uptime}</span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400 flex items-center">
                      <Zap className="h-4 w-4 mr-1" />
                      Server Load
                    </span>
                    <span className="text-white font-bold">{server.load}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getLoadColor(server.load)} transition-all duration-1000 ease-out`}
                      style={{ width: `${server.load}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Server Statistics */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Users className="h-6 w-6 mr-3 text-blue-400" />
            Server Statistics
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-black/20 rounded-lg border border-blue-500/20">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {server.totalAccounts.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total Accounts</div>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-lg border border-purple-500/20">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {server.totalCharacters.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total Characters</div>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-400 mb-1">
                    {server.lastAccountCreated.split(' ')[1]}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    {server.lastAccountCreated.split(' ')[0]}
                  </div>
                  <div className="text-xs text-gray-400">Last Account</div>
                </div>
                <div className="text-center p-4 bg-black/20 rounded-lg border border-yellow-500/20">
                  <div className="text-lg font-bold text-yellow-400 mb-1">
                    {server.lastCharacterCreated.split(' ')[1]}
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    {server.lastCharacterCreated.split(' ')[0]}
                  </div>
                  <div className="text-xs text-gray-400">Last Character</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Realm Status */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Globe className="h-6 w-6 mr-3 text-purple-400" />
            Realm Status
          </h3>
          <div className="text-center">
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 max-w-md mx-auto">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/20">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-bold">ALL REALMS ONLINE</span>
                </div>
              </div>
              <p className="text-gray-300 text-lg">
                All game realms are currently operational and ready for adventure!
              </p>
              <div className="mt-4 text-sm text-gray-400">
                9 Realms • All Systems Operational
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ServerStatus