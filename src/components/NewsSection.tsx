import React from 'react'
import { Calendar, User, ArrowRight, X } from 'lucide-react'

const defaultNewsItems = [
  {
    id: 1,
    title: 'Season 5: Rise of the Dragon Lords',
    excerpt: 'New expansion brings ancient dragons, legendary artifacts, and a massive new continent to explore.',
    date: '2024-01-15',
    author: 'Dev Team',
    image: 'https://images.pexels.com/photos/1202723/pexels-photo-1202723.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    title: 'Guild War Championship Results',
    excerpt: 'Congratulations to the Phoenix Legion for their decisive victory in the quarterly championship.',
    date: '2024-01-10',
    author: 'Community Team',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 3,
    title: 'Balance Update 4.2.1 Live Now',
    excerpt: 'Combat improvements, class balancing, and quality of life updates now available.',
    date: '2024-01-05',
    author: 'Game Balance Team',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
]

interface NewsSectionProps {
  newsItems?: any[]
}

const NewsSection: React.FC<NewsSectionProps> = ({ newsItems = defaultNewsItems }) => {
  const [selectedArticle, setSelectedArticle] = React.useState<any>(null)

  const handleReadMore = (article: any) => {
    setSelectedArticle(article)
  }

  const closeModal = () => {
    setSelectedArticle(null)
  }

  return (
    <>
      <section id="news" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Latest 
            <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent"> News</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest developments, events, and announcements from the War of the Immortals universe.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <article 
              key={index}
              className="group bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                  {news.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {news.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(news.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{news.author}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <button 
                  onClick={() => handleReadMore(news)}
                  className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 group"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105">
            View All News
          </button>
        </div>
      </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] border border-purple-500/20 overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(selectedArticle.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <User className="h-4 w-4" />
                  <span>{selectedArticle.author}</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Image */}
              <div className="relative h-64 mb-6 overflow-hidden rounded-xl">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {selectedArticle.title}
              </h1>

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                  {selectedArticle.content || selectedArticle.excerpt}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NewsSection