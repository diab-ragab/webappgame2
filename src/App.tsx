import React, { useState } from 'react'
import Layout from './components/Layout'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import ClassesSection from './components/ClassesSection'
import RankingsSection from './components/RankingsSection'
import DownloadSection from './components/DownloadSection'
import NewsSection from './components/NewsSection'
import PolicyPage from './components/PolicyPage'
import TermsPage from './components/TermsPage'
import RankingsPage from './components/RankingsPage'
import ServerInfoPage from './components/ServerInfoPage'
import FloatingServerStatus from './components/FloatingServerStatus'
import FloatingDiscord from './components/FloatingDiscord'
import LoadingScreen from './components/LoadingScreen'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'
import FloatingVote from './components/FloatingVote'
import ZenStore from './components/ZenStore'
import UserPanel from './components/UserPanel'
import GMPanel from './components/GMPanel'
import { supabase } from './lib/supabase'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [showLoading, setShowLoading] = useState(true)
  const [showMainContent, setShowMainContent] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showZenStore, setShowZenStore] = useState(false)
  const [showUserPanel, setShowUserPanel] = useState(false)
  const [showGMPanel, setShowGMPanel] = useState(false)
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Dragon Lord Siege',
      type: 'PvP Event',
      startTime: '2024-01-16 20:00',
      endTime: '2024-01-16 22:00',
      status: 'upcoming',
      rewards: '50,000 Zen + Legendary Weapon',
      participants: 247,
      maxParticipants: 500
    },
    {
      id: 2,
      name: 'Guild War Championship',
      type: 'Guild Event',
      startTime: '2024-01-17 19:00',
      endTime: '2024-01-17 21:30',
      status: 'upcoming',
      rewards: '100,000 Zen + Guild Buffs',
      participants: 89,
      maxParticipants: 200
    }
  ])
  const [bosses, setBosses] = useState([
    {
      id: 1,
      name: 'Ancient Dragon Lord',
      location: 'Dragon\'s Lair',
      nextSpawn: '2024-01-16 14:30',
      respawnTime: '6 hours',
      difficulty: 'Legendary',
      level: 95,
      rewards: ['Dragon Scale Armor', 'Immortal Sword', '100,000 Zen'],
      status: 'alive',
      lastKilledBy: 'Phoenix Legion'
    },
    {
      id: 2,
      name: 'Shadow Demon King',
      location: 'Void Sanctum',
      nextSpawn: '2024-01-16 16:45',
      respawnTime: '4 hours',
      difficulty: 'Epic',
      level: 88,
      rewards: ['Shadow Cloak', 'Demon Blade', '75,000 Zen'],
      status: 'dead',
      lastKilledBy: 'DragonSlayer'
    }
  ])
  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: 'Season 5: Rise of the Dragon Lords',
      excerpt: 'New expansion brings ancient dragons, legendary artifacts, and a massive new continent to explore.',
      content: 'New expansion brings ancient dragons, legendary artifacts, and a massive new continent to explore. Players can now venture into the mystical Dragon Realms, where ancient wyrms guard treasures beyond imagination.\n\nThe expansion features:\n• 5 new dragon-themed zones\n• 20+ legendary artifacts with unique abilities\n• New Dragon Lord class with devastating fire and ice powers\n• Epic raid dungeons with massive dragon bosses\n• Enhanced PvP arenas set in floating dragon lairs\n\nPrepare yourself for the ultimate test of immortal strength as you face creatures that have existed since the dawn of time.',
      date: '2024-01-15',
      author: 'Dev Team',
      image: 'https://images.pexels.com/photos/1202723/pexels-photo-1202723.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 2,
      title: 'Guild War Championship Results',
      excerpt: 'Congratulations to the Phoenix Legion for their decisive victory in the quarterly championship.',
      content: 'Congratulations to the Phoenix Legion for their decisive victory in the quarterly championship. After weeks of intense battles, strategic planning, and incredible teamwork, they have emerged as the ultimate guild champions.\n\nChampionship Highlights:\n• Phoenix Legion defeated 127 competing guilds\n• Final battle lasted over 6 hours with epic siege warfare\n• Record-breaking 50,000 players participated across all matches\n• Prize pool of 100 million Zen distributed to winners\n\nThe championship featured innovative new siege mechanics, including destructible castle walls, aerial dragon mounts, and powerful guild-specific ultimate abilities. Phoenix Legion\'s victory was secured through their masterful use of coordinated dragon cavalry charges and their legendary guild leader\'s divine intervention spell.\n\nNext championship begins in 3 months - start preparing your guilds now!',
      date: '2024-01-10',
      author: 'Community Team',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: 'Balance Update 4.2.1 Live Now',
      excerpt: 'Combat improvements, class balancing, and quality of life updates now available.',
      content: 'Combat improvements, class balancing, and quality of life updates now available. This major update addresses community feedback and introduces significant improvements to gameplay mechanics.\n\nKey Changes:\n\nClass Balance:\n• Divine Mage: Reduced mana costs by 15% for all spells\n• Death Knight: Increased life drain effectiveness by 20%\n• Shadow Archer: Improved stealth duration and movement speed\n• Sacred Guardian: Enhanced shield abilities and healing output\n• Immortal Warrior: Balanced sword techniques for better PvP performance\n\nCombat System:\n• Improved hit detection and responsiveness\n• New combo system with visual feedback\n• Enhanced critical hit animations and effects\n• Reduced input lag for better competitive play\n\nQuality of Life:\n• Faster loading times between zones\n• Improved inventory management\n• Enhanced guild communication tools\n• Better quest tracking and navigation\n\nThese changes are based on extensive player feedback and months of testing. We continue to monitor gameplay data and will make additional adjustments as needed.',
      date: '2024-01-05',
      author: 'Game Balance Team',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ])

  // Get user state from Supabase
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const openAuthModal = (mode: 'login' | 'register' | 'zen-store' | 'user-panel' | 'gm-panel') => {
    console.log('🔥 App.tsx - Opening modal with mode:', mode)

    if (mode === 'zen-store') {
      setShowZenStore(true)
    } else if (mode === 'user-panel') {
      setShowUserPanel(true)
    } else if (mode === 'gm-panel') {
      setShowGMPanel(true)
    } else {
      setAuthMode(mode as 'login' | 'register')
      setShowAuthModal(true)
    }
  }

  const closeAuthModal = () => {
    setShowAuthModal(false)
  }

  const handleLoadingComplete = () => {
    setShowLoading(false)
    setTimeout(() => {
      setShowMainContent(true)
    }, 300)
  }

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <>
      <div className={`transition-all duration-1000 ease-out ${
        showMainContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
      }`}>
        <Layout 
          newsItems={newsItems} 
          setNewsItems={setNewsItems} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          events={events}
          setEvents={setEvents}
          bosses={bosses}
          setBosses={setBosses}
          onOpenAuth={openAuthModal}
        >
          {currentPage === 'home' ? (
            <>
              <HeroSection onOpenAuth={openAuthModal} />
              <FeaturesSection />
              <ClassesSection />
              <DownloadSection />
              <NewsSection newsItems={newsItems} />
            </>
          ) : currentPage === 'policy' ? (
            <PolicyPage />
          ) : currentPage === 'terms' ? (
            <TermsPage />
          ) : currentPage === 'rankings' ? (
            <RankingsPage />
          ) : currentPage === 'server-info' ? (
            <ServerInfoPage />
          ) : null}
          <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </Layout>

      </div>
      
      {/* Fixed Floating Elements - Outside main container */}
      <FloatingDiscord />
      <FloatingVote />
      <FloatingServerStatus />
      
      {showAuthModal && (
        console.log('🔥 Rendering AuthModal with showAuthModal:', showAuthModal, 'authMode:', authMode),
        <AuthModal
          mode={authMode}
          onClose={closeAuthModal}
          onSwitchMode={setAuthMode}
          onNavigateToPage={setCurrentPage}
        />
      )}

      {showZenStore && (
        <ZenStore onClose={() => setShowZenStore(false)} />
      )}

      {showUserPanel && user && (
        <UserPanel
          user={user}
          onClose={() => setShowUserPanel(false)}
          onSignOut={() => {
            setUser(null)
            setShowUserPanel(false)
          }}
          onOpenZenStore={() => {
            setShowUserPanel(false)
            setShowZenStore(true)
          }}
          events={events}
          bosses={bosses}
        />
      )}

      {showGMPanel && (
        <GMPanel
          onClose={() => setShowGMPanel(false)}
          newsItems={newsItems}
          setNewsItems={setNewsItems}
          events={events}
          setEvents={setEvents}
          bosses={bosses}
          setBosses={setBosses}
        />
      )}
    </>
  )
}

export default App