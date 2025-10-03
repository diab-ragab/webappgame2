import React from 'react'
import { Shield, AlertTriangle, MessageCircle, CreditCard } from 'lucide-react'

const PolicyPage: React.FC = () => {
  return (
    <section className="py-24 relative min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-red-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Payment & Refund
            <span className="block bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Please read our payment terms carefully before making any purchases
          </p>
        </div>

        {/* Policy Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-red-900/30 backdrop-blur-sm rounded-2xl border border-red-500/20 p-8 mb-8">
          {/* Effective Date */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="text-red-400 font-semibold">Effective Date: June 29, 2025</span>
            </div>
          </div>

          {/* Main Policy Statement */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <CreditCard className="h-6 w-6 mr-3 text-red-400" />
              No Refund Policy
            </h2>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <p className="text-lg font-semibold text-red-300 mb-4">
                All payments made to our server via Stripe are final and non-refundable.
              </p>
              <p className="text-gray-300">
                By completing any transaction, you acknowledge and agree to this policy.
              </p>
            </div>
          </div>

          {/* Conditions */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">
              Refunds will not be provided under the following conditions:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 bg-black/20 rounded-lg border border-red-500/20">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Purchasing digital goods such as Zen or any in-game item</p>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-black/20 rounded-lg border border-red-500/20">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Failure to access the game due to personal technical problems</p>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-black/20 rounded-lg border border-red-500/20">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Account bans or suspensions resulting from violation of the game rules</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-3 text-blue-400" />
              Transaction Errors
            </h3>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <p className="text-gray-300 mb-3">
                If you believe a transaction was made in error, please contact our staff on Discord before taking any further action.
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-300 font-semibold">
                  ⚠️ Initiating a chargeback without contacting us may result in permanent restrictions on your account.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <p className="text-lg text-purple-200 font-medium">
                We appreciate your support of WOI Universe and your understanding of our digital policy.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h4 className="text-lg font-bold text-white mb-3">Secure Payments</h4>
            <p className="text-gray-400">
              All transactions are processed securely through Stripe, ensuring your payment information is protected with industry-standard encryption.
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <h4 className="text-lg font-bold text-white mb-3">Digital Goods</h4>
            <p className="text-gray-400">
              Zen and in-game items are digital goods that are delivered instantly to your account upon successful payment completion.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PolicyPage