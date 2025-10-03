import React, { useState } from 'react'
import { X, Coins, Crown, Zap, Gift, CreditCard } from 'lucide-react'

interface ZenStoreProps {
  onClose: () => void
}

const zenPackages = [
  {
    id: 'starter',
    name: 'Starter Pack',
    zen: 1000000,
    price: 5,
    bonus: 0,
    popular: false,
    icon: Coins,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'warrior',
    name: 'Warrior Pack',
    zen: 5000000,
    price: 20,
    bonus: 0,
    popular: true,
    icon: Zap,
    color: 'from-purple-500 to-blue-500'
  },
  {
    id: 'champion',
    name: 'Champion Pack',
    zen: 10000000,
    price: 35,
    bonus: 0,
    popular: false,
    icon: Crown,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'immortal',
    name: 'Immortal Pack',
    zen: 35000000,
    price: 100,
    bonus: 0,
    popular: false,
    icon: Gift,
    color: 'from-purple-500 to-pink-500'
  }
]


const ZenStore: React.FC<ZenStoreProps> = ({ onClose }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  const handlePurchase = async (packageId: string) => {
    setProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      alert('Purchase successful! Zen has been added to your account.')
      onClose()
    }, 2000)
  }

  const selectedPack = zenPackages.find(pack => pack.id === selectedPackage)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800/95 to-purple-900/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] border border-purple-500/20 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-purple-500/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
              <Coins className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Zen Store</h2>
              <p className="text-gray-400 text-sm">Premium Currency</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {!selectedPackage ? (
            // Package Selection
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">Choose Your Zen Package</h3>
                <p className="text-gray-400">Empower your character with premium currency</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {zenPackages.map((pack) => (
                  <div
                    key={pack.id}
                    className={`relative group cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                      pack.popular ? 'ring-2 ring-yellow-400' : ''
                    }`}
                    onClick={() => setSelectedPackage(pack.id)}
                  >
                    {pack.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-1 rounded-full text-sm font-bold z-10">
                        MOST POPULAR
                      </div>
                    )}
                    
                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 h-full">
                      <div className="text-center">
                        <div className={`inline-flex p-4 bg-gradient-to-br ${pack.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <pack.icon className="h-8 w-8 text-white" />
                        </div>
                        
                        <h4 className="text-xl font-bold text-white mb-2">{pack.name}</h4>
                        
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-yellow-400">
                            {(pack.zen + pack.bonus).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-400">
                            {pack.zen.toLocaleString()} Zen
                            {pack.bonus > 0 && (
                              <span className="text-green-400"> + {pack.bonus.toLocaleString()} Bonus</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-2xl font-bold text-white mb-4">
                          €{pack.price}
                        </div>
                        
                        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                          Select Package
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20 mt-8">
                <h4 className="text-lg font-bold text-white mb-4">What is Zen?</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                  <div>
                    <strong className="text-white">Premium Items:</strong> Purchase exclusive weapons, armor, and cosmetics
                  </div>
                  <div>
                    <strong className="text-white">Character Boosts:</strong> Accelerate your progression with XP boosters
                  </div>
                  <div>
                    <strong className="text-white">Convenience:</strong> Extra inventory space, teleportation, and more
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Payment Processing
            <div className="max-w-2xl mx-auto space-y-6">
              <button
                onClick={() => setSelectedPackage(null)}
                className="text-purple-400 hover:text-purple-300 mb-4"
              >
                ← Back to packages
              </button>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Complete Your Purchase</h3>
                <p className="text-gray-400">You're purchasing the {selectedPack?.name}</p>
              </div>

              {/* Order Summary */}
              <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
                <h4 className="text-lg font-bold text-white mb-4">Order Summary</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">{selectedPack?.name}</span>
                  <span className="text-white">€{selectedPack?.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Zen Amount</span>
                  <span className="text-yellow-400">{selectedPack ? (selectedPack.zen + selectedPack.bonus).toLocaleString() : 0}</span>
                </div>
                {selectedPack && selectedPack.bonus > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Bonus Zen</span>
                    <span className="text-green-400">+{selectedPack.bonus.toLocaleString()}</span>
                  </div>
                )}
                <hr className="border-purple-500/20 my-4" />
                <div className="flex justify-between items-center font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-white">€{selectedPack?.price}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-black/40 rounded-xl p-6 border border-purple-500/20">
                <h4 className="text-lg font-bold text-white mb-4">Secure Payment</h4>
                <div className="flex justify-center">
                  <div className="p-6 rounded-lg border-2 border-purple-500 bg-purple-500/20">
                    <CreditCard className="h-8 w-8 mx-auto mb-3 text-white" />
                    <div className="text-white text-lg font-medium text-center">Stripe Payment</div>
                    <div className="text-gray-400 text-sm text-center mt-1">Secure card processing</div>
                  </div>
                </div>
              </div>

              {/* Purchase Button */}
              <button
                onClick={() => selectedPack && handlePurchase(selectedPack.id)}
                disabled={processing}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
              >
                {processing ? 'Processing Payment...' : `Purchase for €${selectedPack?.price}`}
              </button>

              {/* Terms and Conditions */}
              <div className="bg-black/40 rounded-xl p-6 border border-red-500/20 mt-6">
                <h4 className="text-lg font-bold text-red-400 mb-4">Terms & Conditions</h4>
                <div className="text-sm text-gray-300 space-y-3">
                  <p className="text-red-400 font-semibold">Effective Date: June 29, 2025</p>
                  
                  <p className="font-semibold text-white">All payments made to our server via Stripe are final and non-refundable.</p>
                  
                  <p>By completing any transaction, you acknowledge and agree to this policy. Refunds will not be provided under the following conditions:</p>
                  
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Purchasing digital goods such as Zen or any in-game item</li>
                    <li>Failure to access the game due to personal technical problems</li>
                    <li>Account bans or suspensions resulting from violation of the game rules</li>
                  </ul>
                  
                  <p>If you believe a transaction was made in error, please contact our staff on Discord before taking any further action.</p>
                  
                  <p className="text-yellow-400 font-semibold">Initiating a chargeback without contacting us may result in permanent restrictions on your account.</p>
                  
                  <p className="text-center font-medium text-white mt-4">We appreciate your support of WOI Universe and your understanding of our digital policy.</p>
                </div>
              </div>

              <div className="text-center text-sm text-gray-400">
                <p>🔒 Secure payment processing • 30-day money-back guarantee</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ZenStore