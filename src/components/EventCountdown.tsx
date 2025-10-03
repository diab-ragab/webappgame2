import React, { useState, useEffect } from 'react'
import { Clock, Calendar } from 'lucide-react'

interface EventCountdownProps {
  eventDate: string
  eventName: string
}

const EventCountdown: React.FC<EventCountdownProps> = ({ eventDate, eventName }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(eventDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [eventDate])

  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-5 w-5 text-purple-400" />
        <h3 className="text-xl font-bold text-white">{eventName}</h3>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="bg-slate-800/50 rounded-lg p-3 mb-2">
            <span className="text-3xl font-bold text-purple-400">{timeLeft.days}</span>
          </div>
          <span className="text-gray-400 text-sm">Days</span>
        </div>
        <div className="text-center">
          <div className="bg-slate-800/50 rounded-lg p-3 mb-2">
            <span className="text-3xl font-bold text-blue-400">{timeLeft.hours}</span>
          </div>
          <span className="text-gray-400 text-sm">Hours</span>
        </div>
        <div className="text-center">
          <div className="bg-slate-800/50 rounded-lg p-3 mb-2">
            <span className="text-3xl font-bold text-green-400">{timeLeft.minutes}</span>
          </div>
          <span className="text-gray-400 text-sm">Minutes</span>
        </div>
        <div className="text-center">
          <div className="bg-slate-800/50 rounded-lg p-3 mb-2">
            <span className="text-3xl font-bold text-yellow-400">{timeLeft.seconds}</span>
          </div>
          <span className="text-gray-400 text-sm">Seconds</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-2 text-gray-400">
        <Clock className="h-4 w-4" />
        <span className="text-sm">Event starts on {new Date(eventDate).toLocaleString()}</span>
      </div>
    </div>
  )
}

export default EventCountdown
