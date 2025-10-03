import React from 'react'
import { Star } from 'lucide-react'

const FloatingVote: React.FC = () => {
  const handleVoteClick = () => {
    window.open('https://vote.warofimmortals.com', '_blank')
  }

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <button
        onClick={handleVoteClick}
        className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/25 active:scale-95 touch-manipulation"
      >
        <Star className="h-5 w-5" />
        <span className="font-medium hidden sm:inline">Vote for Us</span>
        <span className="font-medium sm:hidden">Vote</span>
      </button>
    </div>
  )
}

export default FloatingVote