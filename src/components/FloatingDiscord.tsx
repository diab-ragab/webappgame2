import React from 'react'
import { MessageCircle } from 'lucide-react'

const FloatingDiscord: React.FC = () => {
  const handleDiscordClick = () => {
    window.open('https://discord.gg/woiuniverse', '_blank')
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={handleDiscordClick}
        className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/25 active:scale-95 touch-manipulation"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-medium hidden sm:inline">Join Discord</span>
        <span className="font-medium sm:hidden">Discord</span>
      </button>
    </div>
  )
}

export default FloatingDiscord