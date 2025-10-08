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
    const checkUser = () => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        setUser(null)
      }
    }

    checkUser()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        checkUser()
      }
    }

    const handleCustomUserUpdate = () => {
      checkUser()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('userUpdated', handleCustomUserUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userUpdated', handleCustomUserUpdate)
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
      <header className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-purple-500/20'
          : 'bg-gradient-to-b from-black/60 via-black/40 to-transparent backdrop-blur-xl border-b border-white/5'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-cyan-600/5 pointer-events-none" />
        <div className={`absolute inset-0 transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative p-2.5 rounded-xl bg-gradient-to-br from-yellow-400/20 via-orange-400/10 to-purple-600/20 backdrop-blur-sm border border-white/10 group-hover:border-yellow-400/40 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-yellow-400/30">
                <Crown className="h-7 w-7 text-yellow-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.9)] transition-all duration-500 group-hover:rotate-12 group-hover:scale-110" />
                <div className="absolute inset-0 bg-yellow-400/10 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <button
                onClick={() => handleNavigation('home')}
                className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-orange-300 hover:from-yellow-200 hover:via-white hover:to-yellow-200 transition-all duration-500 drop-shadow-[0_0_12px_rgba(251,191,36,0.4)] group-hover:scale-105 tracking-wide"
              >
                WOI Universe
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => handleNavigation('home', 'home')}
                className={`relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-500 group overflow-hidden ${
                  currentPage === 'home'
                    ? 'text-white bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg shadow-yellow-400/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10'
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative">Home</span>
              </button>
              <button
                onClick={() => handleNavigation('home', 'features')}
                className="relative px-5 py-2.5 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10 transition-all duration-500 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative">Features</span>
              </button>
              <button
                onClick={() => handleNavigation('home', 'classes')}
                className="relative px-5 py-2.5 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10 transition-all duration-500 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative">Classes</span>
              </button>
              <button
                onClick={() => handleNavigation('rankings')}
                className={`relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-500 group overflow-hidden ${
                  currentPage === 'rankings'
                    ? 'text-white bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg shadow-yellow-400/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10'
                }`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative">Rankings</span>
              </button>
              <button
                onClick={() => handleNavigation('home', 'download')}
                className="relative px-5 py-2.5 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10 transition-all duration-500 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative">Download</span>
              </button>
              <button
                onClick={() => handleNavigation('home', 'news')}
                className="relative px-5 py-2.5 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10 transition-all duration-500 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative">News</span>
              </button>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  {isGM && (
                    <button
                      onClick={handleOpenGMPanel}
                      className="group relative flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-600/90 to-orange-600/90 hover:from-red-500 hover:to-orange-500 text-white rounded-xl font-semibold backdrop-blur-sm border border-red-400/30 hover:border-red-300/50 shadow-lg hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                      <Shield className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">GM</span>
                    </button>
                  )}
                  <button
                    onClick={handleOpenZenStore}
                    className="relative group flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 hover:from-yellow-400 hover:via-orange-400 hover:to-yellow-500 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-yellow-500/40 transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 border border-yellow-400/40 hover:border-yellow-300/70 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <div className="absolute inset-0 bg-yellow-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Coins className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Buy Zen</span>
                  </button>
                  <button
                    onClick={handleOpenUserPanel}
                    className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:scale-105"
                  >
                    <User className="h-4 w-4 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                    <span>{user.user_metadata?.username || 'Warrior'}</span>
                    <Settings className="h-4 w-4 text-gray-400 group-hover:text-yellow-400 transition-colors duration-300" />
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 backdrop-blur-sm border border-red-500/20 hover:border-red-400/40 transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <LogOut className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="px-5 py-2.5 rounded-xl font-semibold text-gray-300 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-transparent hover:border-white/10 transition-all duration-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleOpenAuth('register')}
                    className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-bold shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 border border-purple-400/30 hover:border-purple-300/50 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    <span className="relative z-10">Join Now</span>
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