import React, { useState, useEffect } from 'react'
import { User, Crown, LogOut, Menu, X, Settings, Coins, Shield } from 'lucide-react'
import AuthModal from './AuthModal'
import UserPanel from './UserPanel'
import ZenStore from './ZenStore'
import GMPanel from './GMPanel'

interface HeaderProps {
  newsItems?: any[]
  setNewsItems?: (items: any[]) => void
  currentPage?: string
  setCurrentPage?: (page: string) => void
  events?: any[]
  setEvents?: (events: any[]) => void
  bosses?: any[]
  setBosses?: (bosses: any[]) => void
  onOpenAuth?: (mode: 'login' | 'register') => void
}

const Header: React.FC<HeaderProps> = ({ newsItems, setNewsItems, currentPage, setCurrentPage, events, setEvents, bosses, setBosses, onOpenAuth }) => {
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleOpenAuth = (mode: 'login' | 'register') => {
    console.log('🔥 Header - handleOpenAuth called with mode:', mode)
    if (onOpenAuth) {
      console.log('🔥 Header - Calling onOpenAuth prop')
      onOpenAuth(mode)
    } else {
      console.error('🔥 Header - onOpenAuth prop is not available!')
    }
  }

  const handleOpenZenStore = () => {
    console.log('🔥 Header - Opening Zen Store')
    if (onOpenAuth) {
      // We'll use a special mode for zen store
      onOpenAuth('zen-store' as any)
    }
  }

  const handleOpenUserPanel = () => {
    console.log('🔥 Header - Opening User Panel')
    if (onOpenAuth) {
      // We'll use a special mode for user panel
      onOpenAuth('user-panel' as any)
    }
  }

  const handleOpenGMPanel = () => {
    console.log('🔥 Header - Opening GM Panel')
    if (onOpenAuth) {
      // We'll use a special mode for GM panel
      onOpenAuth('gm-panel' as any)
    }
  }

  const isGM = user?.email === 'admin@warofimmortals.com' || user?.email === 'admin@woiuniverse.com' || user?.email?.includes('gm@')

  const handleNavigation = (page: string, sectionId?: string) => {
    if (setCurrentPage) {
      setCurrentPage(page)
    }
    if (sectionId && page === 'home') {
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[100] border-b border-yellow-500/20 shadow-2xl shadow-yellow-500/10" style={{ backgroundColor: '#0c0c1a' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.05),transparent_70%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 group">
              <div className="relative">
                <Crown className="h-8 w-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full animate-pulse" />
              </div>
              <button
                onClick={() => handleNavigation('home')}
                className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 hover:from-yellow-300 hover:via-yellow-200 hover:to-yellow-400 transition-all duration-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)] group-hover:scale-105"
              >
                WOI Universe
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => handleNavigation('home', 'home')}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 group overflow-hidden ${currentPage === 'home' ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Home</span>
              </button>
              <button
                onClick={() => handleNavigation('home', 'features')}
                className="relative px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Features</span>
              </button>
              <button
                onClick={() => handleNavigation('home', 'classes')}
                className="relative px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Classes</span>
              </button>
              <button
                onClick={() => handleNavigation('rankings')}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 group overflow-hidden ${currentPage === 'rankings' ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Rankings</span>
              </button>
              <button
                onClick={() => handleNavigation('home', 'download')}
                className="relative px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Download</span>
              </button>
              <button
                onClick={() => handleNavigation('home', 'news')}
                className="relative px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">News</span>
              </button>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {isGM && (
                    <button
                      onClick={handleOpenGMPanel}
                      className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                    >
                      <Shield className="h-4 w-4" />
                      <span>GM</span>
                    </button>
                  )}
                  <button
                    onClick={handleOpenZenStore}
                    className="relative flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 hover:from-yellow-400 hover:via-orange-400 hover:to-yellow-500 text-white rounded-lg font-bold text-sm shadow-lg hover:shadow-xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 min-w-[110px] animate-pulse-slow border border-yellow-400/30 hover:border-yellow-300/60 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg animate-ping opacity-75" />
                    <div className="relative flex items-center space-x-2">
                      <Coins className="h-4 w-4" />
                      <span>Buy Zen</span>
                    </div>
                  </button>
                  <button
                    onClick={handleOpenUserPanel}
                    className="flex items-center space-x-2 text-sm hover:text-yellow-400 transition-colors duration-200 group"
                  >
                    <User className="h-4 w-4 text-yellow-400 group-hover:scale-110 transition-transform duration-200" />
                    <span className="text-gray-300">{user.user_metadata?.username || 'Warrior'}</span>
                    <Settings className="h-4 w-4 text-gray-400 group-hover:text-yellow-400 transition-colors duration-200" />
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleOpenAuth('register')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 font-medium"
                  >
                    Join Now
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-2 text-gray-300 hover:text-yellow-400 transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-yellow-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                {mobileMenuOpen ? <X className="h-6 w-6 relative z-10" /> : <Menu className="h-6 w-6 relative z-10" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 z-50">
              <div className="mx-4 px-6 pt-4 pb-6 space-y-3 backdrop-blur-xl rounded-2xl mt-4 border border-yellow-500/30 shadow-2xl shadow-yellow-500/20 animate-in slide-in-from-top-4 duration-300" style={{ background: 'linear-gradient(135deg, rgba(12, 12, 26, 0.98) 0%, rgba(30, 20, 50, 0.98) 100%)' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-purple-500/5 rounded-2xl pointer-events-none" />
                <button 
                  onClick={() => {handleNavigation('home', 'home'); setMobileMenuOpen(false)}}
                  className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/5 hover:translate-x-1 ${currentPage === 'home' ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-300 hover:text-yellow-400'}`}
                >
                  <span className="text-lg">🏠</span>
                  <span className="ml-3 font-medium">Home</span>
                </button>
                <button 
                  onClick={() => {handleNavigation('home', 'features'); setMobileMenuOpen(false)}}
                  className="flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:bg-white/5 hover:translate-x-1"
                >
                  <span className="text-lg">⚡</span>
                  <span className="ml-3 font-medium">Features</span>
                </button>
                <button 
                  onClick={() => {handleNavigation('home', 'classes'); setMobileMenuOpen(false)}}
                  className="flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:bg-white/5 hover:translate-x-1"
                >
                  <span className="text-lg">⚔️</span>
                  <span className="ml-3 font-medium">Classes</span>
                </button>
                <button 
                  onClick={() => {handleNavigation('rankings'); setMobileMenuOpen(false)}}
                  className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/5 hover:translate-x-1 ${currentPage === 'rankings' ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-300 hover:text-yellow-400'}`}
                >
                  <span className="text-lg">🏆</span>
                  <span className="ml-3 font-medium">Rankings</span>
                </button>
                <button 
                  onClick={() => {handleNavigation('home', 'download'); setMobileMenuOpen(false)}}
                  className="flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:bg-white/5 hover:translate-x-1"
                >
                  <span className="text-lg">📱</span>
                  <span className="ml-3 font-medium">Download</span>
                </button>
                <button
                  onClick={() => {handleNavigation('home', 'news'); setMobileMenuOpen(false)}}
                  className="flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:bg-white/5 hover:translate-x-1"
                >
                  <span className="text-lg">📰</span>
                  <span className="ml-3 font-medium">News</span>
                </button>

                <div className="border-t border-purple-500/20 my-4"></div>
                
                {user ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => {handleOpenZenStore(); setMobileMenuOpen(false)}}
                      className="relative flex items-center space-x-3 w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 border border-yellow-400/30 group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                      <div className="relative flex items-center space-x-3">
                        <span className="text-lg">💰</span>
                        <Coins className="h-4 w-4" />
                        <span className="font-bold">Buy Zen</span>
                      </div>
                    </button>
                    {isGM && (
                      <button
                        onClick={() => {handleOpenGMPanel(); setMobileMenuOpen(false)}}
                        className="flex items-center w-full text-left px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300"
                      >
                        <span className="text-lg">🛡️</span>
                        <span className="ml-3 font-medium">GM Panel</span>
                      </button>
                    )}
                    <button
                      onClick={() => {handleOpenUserPanel(); setMobileMenuOpen(false)}}
                      className="flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-white/5 transition-all duration-300"
                    >
                      <span className="text-lg">👤</span>
                      <span className="ml-3 font-medium">{user.user_metadata?.username || 'Warrior'} Panel</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full text-left px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                    >
                      <span className="text-lg">🚪</span>
                      <span className="ml-3 font-medium">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {handleOpenAuth('login'); setMobileMenuOpen(false)}}
                      className="flex items-center w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                      <span className="text-lg">🔑</span>
                      <span className="ml-3 font-medium">Sign In</span>
                    </button>
                    <button
                      onClick={() => {handleOpenAuth('register'); setMobileMenuOpen(false)}}
                      className="flex items-center w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="text-lg">⚔️</span>
                      <span className="ml-3 font-bold">Join the Battle</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

    </>
  )
}

export default Header