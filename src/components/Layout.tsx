import React from 'react'
import Header from './Header'
import AnimatedBackground from './AnimatedBackground'

interface LayoutProps {
  children: React.ReactNode
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

const Layout: React.FC<LayoutProps> = ({ children, newsItems, setNewsItems, currentPage, setCurrentPage, events, setEvents, bosses, setBosses, onOpenAuth }) => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header 
          newsItems={newsItems} 
          setNewsItems={setNewsItems} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          events={events}
          setEvents={setEvents}
          bosses={bosses}
          setBosses={setBosses}
          onOpenAuth={onOpenAuth}
        />
        <main className="pt-24">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout