import React from 'react'
import { Download, Monitor, Smartphone, ExternalLink } from 'lucide-react'

const DownloadSection: React.FC = () => {
  const downloadLinks = [
    {
      id: 'pc',
      name: 'PC Client',
      description: 'Full game client for Windows',
      icon: Monitor,
      size: '6 GB',
      version: 'Latest',
      color: 'from-blue-600 to-cyan-600',
      url: '#'
    },
    {
      id: 'launcher',
      name: 'Alternative PC Client',
      description: 'Alternative game client with enhanced features',
      icon: Monitor,
      size: '6 GB',
      version: 'Latest',
      color: 'from-green-600 to-emerald-600',
      url: 'https://download.warofimmortals.com/alternative-client'
    }
  ]

  return (
    <section id="download" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Download 
            <span className="bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent"> Game</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get the game client and start your immortal journey. Available for PC and mobile devices.
          </p>
        </div>

        {/* Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {downloadLinks.map((download) => (
            <div 
              key={download.id}
              className="group bg-gradient-to-br from-slate-800/50 to-purple-900/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 card-hover p-8"
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className={`p-4 bg-gradient-to-br ${download.color} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <download.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                  {download.name}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {download.description}
                </p>

                {/* Details */}
                <div className="flex justify-center space-x-6 mb-6 text-sm">
                  <div className="text-center">
                    <div className="text-white font-bold">{download.size}</div>
                    <div className="text-gray-400">Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold">{download.version}</div>
                    <div className="text-gray-400">Version</div>
                  </div>
                </div>

                {/* Download Button */}
                <a
                  href={download.url}
                  className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${download.color} hover:scale-105 text-white rounded-lg font-medium transition-all duration-300 transform`}
                >
                  <Download className="h-5 w-5" />
                  <span>Download Now</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* System Requirements */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">System Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-yellow-400 mb-4">Minimum Requirements</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Windows 10 64-bit</li>
                  <li>• Intel Core i3-6100 / AMD FX-6300</li>
                  <li>• 8 GB RAM</li>
                  <li>• DirectX 11 compatible graphics card</li>
                  <li>• 5 GB available storage</li>
                  <li>• Broadband internet connection</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-green-400 mb-4">Recommended Requirements</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Windows 11 64-bit</li>
                  <li>• Intel Core i5-8400 / AMD Ryzen 5 2600</li>
                  <li>• 16 GB RAM</li>
                  <li>• NVIDIA GTX 1060 / AMD RX 580</li>
                  <li>• 10 GB available storage (SSD)</li>
                  <li>• Stable broadband connection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadSection