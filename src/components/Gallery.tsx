import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const screenshots = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1202723/pexels-photo-1202723.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Epic Dragon Battle',
      description: 'Face legendary dragons in epic boss battles'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'PvP Arena',
      description: 'Compete in intense player vs player combat'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Guild Warfare',
      description: 'Team up with your guild for massive battles'
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Mystical Realms',
      description: 'Explore beautiful and dangerous fantasy worlds'
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Character Customization',
      description: 'Create your unique hero with extensive customization'
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Legendary Loot',
      description: 'Discover powerful weapons and rare artifacts'
    }
  ]

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? screenshots.length - 1 : selectedImage - 1)
    }
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === screenshots.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Game Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the stunning visuals and epic moments from WOI Universe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {screenshots.map((screenshot, index) => (
            <div
              key={screenshot.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={screenshot.url}
                alt={screenshot.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2">{screenshot.title}</h3>
                  <p className="text-gray-300 text-sm">{screenshot.description}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Maximize2 className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronLeft className="h-12 w-12" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <ChevronRight className="h-12 w-12" />
          </button>

          <div className="max-w-6xl w-full">
            <img
              src={screenshots[selectedImage].url}
              alt={screenshots[selectedImage].title}
              className="w-full h-auto rounded-lg"
            />
            <div className="text-center mt-6">
              <h3 className="text-white font-bold text-2xl mb-2">
                {screenshots[selectedImage].title}
              </h3>
              <p className="text-gray-300">{screenshots[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
