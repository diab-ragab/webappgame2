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
      <header className={`fixed left-4 right-4 top-4 z-[100] transition-all duration-700 ${
        scrolled
          ? 'backdrop-blur-3xl'
          : 'backdrop-blur-2xl'
      }`}
      style={{
        background: scrolled
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
        boxShadow: scrolled
          ? '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)'
          : '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 0 rgba(255, 255, 255, 0.08)',
        border: '1.5px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '24px',
      }}>
        <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-purple-500/5 to-blue-500/10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-shimmer" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative p-3 rounded-2xl backdrop-blur-xl transition-all duration-500 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(251, 146, 60, 0.08) 100%)',
                  boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 4px 16px rgba(251, 191, 36, 0.2)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                }}>
                <Crown className="h-6 w-6 text-yellow-300 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] transition-all duration-500 group-hover:rotate-12" />
                <div className="absolute inset-0 rounded-2xl bg-yellow-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <button
                onClick={() => handleNavigation('home')}
                className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200 hover:from-white hover:via-yellow-100 hover:to-white transition-all duration-500 drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)] group-hover:scale-105 tracking-wide"
              >
                WOI Universe
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {[
                { label: 'Home', action: () => handleNavigation('home', 'home'), active: currentPage === 'home' },
                { label: 'Features', action: () => handleNavigation('home', 'features'), active: false },
                { label: 'Classes', action: () => handleNavigation('home', 'classes'), active: false },
                { label: 'Rankings', action: () => handleNavigation('rankings'), active: currentPage === 'rankings' },
                { label: 'Download', action: () => handleNavigation('home', 'download'), active: false },
                { label: 'News', action: () => handleNavigation('home', 'news'), active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="relative px-4 py-2 rounded-2xl font-semibold text-sm transition-all duration-500 group overflow-hidden backdrop-blur-xl"
                  style={{
                    background: item.active
                      ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)'
                      : 'transparent',
                    boxShadow: item.active
                      ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15)'
                      : 'none',
                    border: item.active
                      ? '1px solid rgba(255, 255, 255, 0.25)'
                      : '1px solid transparent',
                    color: item.active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  }}
                  onMouseEnter={(e) => {
                    if (!item.active) {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)';
                      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.border = '1px solid transparent';
                      e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-2xl" />
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-2">
                  {isGM && (
                    <button
                      onClick={handleOpenGMPanel}
                      className="group relative flex items-center space-x-2 px-4 py-2 rounded-2xl font-semibold text-sm text-white backdrop-blur-xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(251, 146, 60, 0.15) 100%)',
                        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 4px 12px rgba(239, 68, 68, 0.25)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                      }}
                    >
                      <Shield className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">GM</span>
                    </button>
                  )}
                  <button
                    onClick={handleOpenZenStore}
                    className="relative group flex items-center space-x-2 px-5 py-2 rounded-2xl font-bold text-sm text-white backdrop-blur-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-0.5 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.25) 0%, rgba(251, 146, 60, 0.2) 50%, rgba(251, 191, 36, 0.25) 100%)',
                      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.3), 0 8px 24px rgba(251, 191, 36, 0.3)',
                      border: '1px solid rgba(251, 191, 36, 0.4)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 rounded-2xl" />
                    <Coins className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">Buy Zen</span>
                  </button>
                  <button
                    onClick={handleOpenUserPanel}
                    className="group flex items-center space-x-2 px-4 py-2 rounded-2xl font-medium text-sm text-white backdrop-blur-xl transition-all duration-500 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
                      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    <User className="h-4 w-4 text-yellow-300 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative z-10">{user.user_metadata?.username || 'Warrior'}</span>
                    <Settings className="h-4 w-4 text-white/60 group-hover:text-yellow-300 transition-colors duration-300" />
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="group flex items-center space-x-1 px-3 py-2 rounded-2xl font-medium text-sm text-red-300 backdrop-blur-xl transition-all duration-500 hover:scale-105 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.08) 100%)',
                      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 2px 8px rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    <LogOut className="h-4 w-4 relative z-10" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="px-4 py-2 rounded-2xl font-semibold text-sm text-white/70 hover:text-white backdrop-blur-xl transition-all duration-500"
                    style={{
                      background: 'transparent',
                      border: '1px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)';
                      e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.boxShadow = 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.border = '1px solid transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleOpenAuth('register')}
                    className="group relative px-5 py-2 rounded-2xl font-bold text-sm text-white backdrop-blur-xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 4px 16px rgba(147, 51, 234, 0.25)',
                      border: '1px solid rgba(147, 51, 234, 0.3)',
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 rounded-2xl" />
                    <span className="relative z-10">Join Now</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-2xl text-white backdrop-blur-xl transition-all duration-500 hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
                  boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 z-50 mt-4">
              <div className="mx-4 px-6 pt-4 pb-6 space-y-3 backdrop-blur-3xl rounded-3xl shadow-2xl animate-in slide-in-from-top-4 duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.15), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)',
                  border: '1.5px solid rgba(255, 255, 255, 0.18)',
                }}>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-purple-500/5 to-blue-500/10 rounded-3xl pointer-events-none" />
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