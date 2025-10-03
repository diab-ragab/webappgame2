import React from 'react'
import { Twitter, Facebook, Instagram, Youtube, Heart, MessageCircle, Share2, ExternalLink } from 'lucide-react'

const SocialFeed: React.FC = () => {
  const socialPosts = [
    {
      id: 1,
      platform: 'twitter',
      author: 'WOI Universe',
      handle: '@WOIUniverse',
      avatar: '🎮',
      content: 'New Dragon Lord expansion drops this Friday! Get ready for epic battles and legendary loot. Who\'s excited? 🐉⚔️',
      timestamp: '2h ago',
      likes: 347,
      comments: 52,
      shares: 89,
      image: 'https://images.pexels.com/photos/1202723/pexels-photo-1202723.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      platform: 'facebook',
      author: 'WOI Universe',
      handle: 'WOI Universe',
      avatar: '🎮',
      content: '🎉 Guild War Championship winners announced! Congratulations to Phoenix Legion for their incredible victory!',
      timestamp: '5h ago',
      likes: 892,
      comments: 134,
      shares: 267,
    },
    {
      id: 3,
      platform: 'instagram',
      author: 'woiuniverse',
      handle: '@woiuniverse',
      avatar: '🎮',
      content: 'Check out this insane PvP combo by @ShadowSlayer! 🔥 Tag someone who needs to see this!',
      timestamp: '8h ago',
      likes: 1247,
      comments: 89,
      shares: 156,
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      platform: 'youtube',
      author: 'WOI Universe',
      handle: 'WOI Universe',
      avatar: '🎮',
      content: 'NEW VIDEO: Top 10 Tips for Beginners - Master the game in just one week! Link in bio 🎬',
      timestamp: '1d ago',
      likes: 2341,
      comments: 345,
      shares: 678,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-500" />
      case 'youtube':
        return <Youtube className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return 'border-blue-400/30 hover:border-blue-400/50'
      case 'facebook':
        return 'border-blue-600/30 hover:border-blue-600/50'
      case 'instagram':
        return 'border-pink-500/30 hover:border-pink-500/50'
      case 'youtube':
        return 'border-red-600/30 hover:border-red-600/50'
      default:
        return 'border-purple-500/30'
    }
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Stay connected with the latest updates, events, and community highlights
          </p>

          <div className="flex justify-center space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-400/10 hover:bg-blue-400/20 rounded-lg border border-blue-400/30 hover:border-blue-400/50 transition-all duration-200"
            >
              <Twitter className="h-6 w-6 text-blue-400" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-600/10 hover:bg-blue-600/20 rounded-lg border border-blue-600/30 hover:border-blue-600/50 transition-all duration-200"
            >
              <Facebook className="h-6 w-6 text-blue-600" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-pink-500/10 hover:bg-pink-500/20 rounded-lg border border-pink-500/30 hover:border-pink-500/50 transition-all duration-200"
            >
              <Instagram className="h-6 w-6 text-pink-500" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-red-600/10 hover:bg-red-600/20 rounded-lg border border-red-600/30 hover:border-red-600/50 transition-all duration-200"
            >
              <Youtube className="h-6 w-6 text-red-600" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialPosts.map((post) => (
            <div
              key={post.id}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border ${getPlatformColor(post.platform)} transition-all duration-300 hover:transform hover:scale-105`}
            >
              <div className="flex items-start space-x-3 mb-4">
                <div className="text-3xl">{post.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold">{post.author}</h4>
                      <p className="text-gray-400 text-sm">{post.handle}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPlatformIcon(post.platform)}
                      <span className="text-gray-400 text-sm">{post.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{post.content}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>{post.shares}</span>
                </button>
                <button className="text-gray-400 hover:text-purple-400 transition-colors">
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialFeed
