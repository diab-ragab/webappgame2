import React from 'react'
import { Shield, AlertTriangle, Users, Gavel, Eye, Lock, Ban, Crown } from 'lucide-react'

const TermsPage: React.FC = () => {
  return (
    <section className="py-24 relative min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Gavel className="h-16 w-16 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Terms of
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using War of the Immortals
          </p>
        </div>

        {/* Terms Content */}
        <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/20 p-8 mb-8">
          {/* Effective Date */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-blue-400" />
              <span className="text-blue-400 font-semibold">Effective Date: January 1, 2024</span>
            </div>
          </div>

          {/* Acceptance of Terms */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-blue-400" />
              1. Acceptance of Terms
            </h2>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <p className="text-gray-300 mb-4">
                By accessing and using War of the Immortals ("the Game"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
              <p className="text-gray-300">
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>
          </div>

          {/* Account Responsibilities */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Users className="h-5 w-5 mr-3 text-green-400" />
              2. Account Responsibilities
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-4 bg-black/20 rounded-lg border border-blue-500/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">You are responsible for maintaining the confidentiality of your account credentials</p>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-black/20 rounded-lg border border-blue-500/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">You must provide accurate and complete information when creating your account</p>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-black/20 rounded-lg border border-blue-500/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">You are responsible for all activities that occur under your account</p>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-black/20 rounded-lg border border-blue-500/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-300">Account sharing or selling is strictly prohibited</p>
              </div>
            </div>
          </div>

          {/* Prohibited Conduct */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Ban className="h-5 w-5 mr-3 text-red-400" />
              3. Prohibited Conduct
            </h3>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
              <p className="text-red-300 font-semibold mb-4">
                The following activities are strictly prohibited and may result in account suspension or termination:
              </p>
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Using cheats, hacks, bots, or any unauthorized third-party software</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Exploiting bugs or glitches for unfair advantage</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Harassment, bullying, or toxic behavior towards other players</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Real money trading (RMT) of in-game items or currency</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Spamming, advertising, or promoting external services</p>
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Items and Currency */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Crown className="h-5 w-5 mr-3 text-yellow-400" />
              4. Virtual Items and Currency
            </h3>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
              <div className="space-y-3">
                <p className="text-gray-300">
                  All virtual items, currency (Zen), and characters are owned by WOI Universe and licensed to you for use.
                </p>
                <p className="text-gray-300">
                  Virtual items have no real-world value and cannot be exchanged for real money.
                </p>
                <p className="text-yellow-300 font-semibold">
                  We reserve the right to modify, remove, or discontinue any virtual items at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy and Data */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Lock className="h-5 w-5 mr-3 text-purple-400" />
              5. Privacy and Data Collection
            </h3>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <div className="space-y-3">
                <p className="text-gray-300">
                  We collect and process personal data in accordance with our Privacy Policy.
                </p>
                <p className="text-gray-300">
                  Game data, including character progress and statistics, may be stored and analyzed for game improvement.
                </p>
                <p className="text-gray-300">
                  We may use cookies and similar technologies to enhance your gaming experience.
                </p>
              </div>
            </div>
          </div>

          {/* Enforcement and Penalties */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-3 text-orange-400" />
              6. Enforcement and Penalties
            </h3>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
              <div className="space-y-3">
                <p className="text-gray-300">
                  We reserve the right to monitor gameplay and investigate violations of these terms.
                </p>
                <p className="text-orange-300 font-semibold">
                  Penalties for violations may include:
                </p>
                <div className="ml-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Temporary account suspension</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Permanent account termination</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">Removal of virtual items or currency</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-300">IP address or hardware bans</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">7. Limitation of Liability</h3>
            <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-6">
              <p className="text-gray-300 mb-3">
                WOI Universe shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
              <p className="text-gray-300">
                The game is provided "as is" without warranties of any kind, either express or implied.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">8. Changes to Terms</h3>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <p className="text-gray-300 mb-3">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
              </p>
              <p className="text-blue-300 font-semibold">
                Continued use of the game after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <h4 className="text-lg font-bold text-white mb-3">Questions About These Terms?</h4>
              <p className="text-gray-300 mb-3">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-green-300">
                <p>📧 Email: legal@warofimmortals.com</p>
                <p>💬 Discord: WOI Universe Official</p>
                <p>🌐 Website: www.warofimmortals.com/support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
            <h4 className="text-lg font-bold text-white mb-3">Fair Play</h4>
            <p className="text-gray-400">
              We are committed to maintaining a fair and enjoyable gaming environment for all players. Report any violations to our support team.
            </p>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
            <h4 className="text-lg font-bold text-white mb-3">Community Guidelines</h4>
            <p className="text-gray-400">
              Respect other players, follow the rules, and help us build an amazing gaming community together.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TermsPage