import React, { useState, useEffect } from 'react'
import { Server, CheckCircle, Users, Wifi, Clock, Zap, X, Globe, XCircle } from 'lucide-react'

interface ServerData {
  name: string
  region: string
  status: 'online' | 'offline'
  players: number
  maxPlayers: number
  ping: number
  uptime: string
  load: number
  totalAccounts: number
  totalCharacters: number
  lastAccountCreated: string
  lastCharacterCreated: string
}

const FloatingServerStatus: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [serverData, setServerData] = useState<ServerData>({
    name: 'WOI Universe',
    region: 'Europe',
    status: 'online',
    players: 0,
    maxPlayers: 1000,
    ping: 45,
    uptime: '0%',
    load: 0,
    totalAccounts: 0,
    totalCharacters: 0,
    lastAccountCreated: 'N/A',
    lastCharacterCreated: 'N/A'
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/server-status.php`)
        const data = await response.json()

        if (data.success) {
          setServerData(prev => ({
            ...prev,
            status: data.status,
            players: data.players.online,
            maxPlayers: data.players.max,
            uptime: data.uptime,
            totalAccounts: data.totalAccounts,
            totalCharacters: data.totalCharacters || 0,
            lastAccountCreated: data.lastAccountCreated || 'N/A',
            lastCharacterCreated: data.lastCharacterCreated || 'N/A',
            load: Math.round((data.players.online / data.players.max) * 100)
          }))
        }
      } catch (error) {
        console.error('Failed to fetch server status:', error)
        setServerData(prev => ({
          ...prev,
          status: 'offline'
        }))
      } finally {
        setIsLoading(false)
      }
    }

    fetchServerStatus()
    const interval = setInterval(fetchServerStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const server = serverData

  const getLoadColor = (load: number) => {
    if (load < 50) return 'from-green-500 to-green-600'
    if (load < 75) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }

  return (
    <>
      {/* Fixed Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className={`flex items-center space-x-2 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 touch-manipulation ${
            server.status === 'online'
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-green-500/25'
              : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-red-500/25'
          } text-white`}
        >
          {server.status === 'online' ? (
            <>
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium hidden sm:inline">Server Online</span>
              <span className="font-medium sm:hidden">Online</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5" />
              <span className="font-medium hidden sm:inline">Server Offline</span>
              <span className="font-medium sm:hidden">Offline</span>
            </>
          )}
        </button>
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsExpanded(false)}
        >
          <div 
            className="bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-2xl border border-purple-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg">
                  <Server className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Server Status</h2>
                  <p className="text-gray-400">Real-time server information</p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 -m-2 touch-manipulation"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Server Status */}
              <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">{server.name}</h4>
                    <p className="text-gray-400 flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      {server.region}
                    </p>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${
                    server.status === 'online'
                      ? 'border-green-500/30 bg-green-500/20'
                      : 'border-red-500/30 bg-red-500/20'
                  }`}>
                    {server.status === 'online' ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-bold uppercase text-green-400">ONLINE</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-bold uppercase text-red-400">OFFLINE</span>
                      </>
                    )}
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

              {/* Server Statistics */}
              <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-400" />
                  Server Statistics
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Accounts:</span>
                      <span className="text-blue-400 font-bold">{server.totalAccounts.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Characters:</span>
                      <span className="text-purple-400 font-bold">{server.totalCharacters.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 block mb-1">Last Account Created:</span>
                      <span className="text-green-400 text-sm font-medium">{server.lastAccountCreated}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Last Character Created:</span>
                      <span className="text-yellow-400 text-sm font-medium">{server.lastCharacterCreated}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Realm Status */}
              <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-purple-400" />
                  Realm Status
                </h4>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className="flex items-center space-x-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/20">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-green-400 font-bold">ALL REALMS ONLINE</span>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    All game realms are currently operational and ready for adventure!
                  </p>
                  <div className="mt-3 text-sm text-gray-400">
                    9 Realms • All Systems Operational
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingServerStatus