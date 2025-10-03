import React from 'react'
import { Crown, Facebook, Twitter, Youtube, Twitch } from 'lucide-react'

interface FooterProps {
  currentPage?: string
  setCurrentPage?: (page: string) => void
}

const Footer: React.FC<FooterProps> = ({ currentPage, setCurrentPage }) => {
  const handleNavigation = (page: string) => {
    if (setCurrentPage) {
      setCurrentPage(page)
    }
  }

  return (
    <footer className="bg-black/40 backdrop-blur-sm border-t border-purple-500/20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-bold text-white">War of the Immortals</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              © 2024 WOI Universe. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitch className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Game</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Download</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">System Requirements</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Game Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Patch Notes</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bug Reports</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Forums</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('policy')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Payment Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('terms')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-purple-500/20 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 War of the Immortals Universe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer