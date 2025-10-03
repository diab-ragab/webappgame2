import React, { useState } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff, Check } from 'lucide-react'

interface AuthModalProps {
  mode: 'login' | 'register'
  onClose: () => void
  onSwitchMode: (mode: 'login' | 'register') => void
  onNavigateToPage?: (page: string) => void
}

const AuthModal: React.FC<AuthModalProps> = ({ mode, onClose, onSwitchMode, onNavigateToPage }) => {
  const [isClosing, setIsClosing] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300) // Match the animation duration
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('Form submitted', { mode, email, username })

    if (mode === 'register' && !username.trim()) {
      setError('Username is required')
      setLoading(false)
      return
    }

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (mode === 'register' && !acceptTerms) {
      setError('You must accept the Terms of Service and Privacy Policy')
      setLoading(false)
      return
    }

    try {
      if (mode === 'login') {
        console.log('Attempting login with username:', loginUsername)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/login.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: loginUsername,
            password,
          }),
        })

        const data = await response.json()

        if (!response.ok || data.error) {
          throw new Error(data.error || 'Login failed')
        }

        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        console.log('Login successful')
      } else {
        console.log('Attempting signup with:', email, username)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/register.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        })

        const data = await response.json()

        if (!response.ok || data.error) {
          throw new Error(data.error || 'Registration failed')
        }

        console.log('Signup successful')
        setError('Account created successfully! Please sign in.')
      }
      handleClose()
    } catch (error: any) {
      console.error('Authentication error:', error)
      setError(error.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 transition-all duration-300 ease-out ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md border border-purple-500/20 transition-all duration-300 ease-out transform ${
          isClosing 
            ? 'opacity-0 scale-95 translate-y-4' 
            : 'opacity-100 scale-100 translate-y-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {mode === 'login' ? 'Welcome Back, Warrior' : 'Join the Battle'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field (Registration only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Choose your warrior name"
                  />
                </div>
              </div>
            )}

            {/* Username/Email Field */}
            {mode === 'login' ? (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Registration only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Terms and Conditions (Registration only) */}
            {mode === 'register' && (
              <div className="flex items-start space-x-3">
                <button
                  type="button"
                  onClick={() => setAcceptTerms(!acceptTerms)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    acceptTerms 
                      ? 'bg-purple-600 border-purple-600' 
                      : 'border-gray-600 hover:border-purple-500'
                  }`}
                >
                  {acceptTerms && <Check className="h-3 w-3 text-white" />}
                </button>
                <div className="text-sm text-gray-300">
                  I accept the{' '}
                  <button
                    type="button"
                    className="text-purple-400 hover:text-purple-300 underline"
                    onClick={() => {
                      if (onNavigateToPage) {
                        onNavigateToPage('terms')
                        onClose()
                      }
                    }}
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    className="text-purple-400 hover:text-purple-300 underline"
                    onClick={() => {
                      if (onNavigateToPage) {
                        onNavigateToPage('policy')
                        onClose()
                      }
                    }}
                  >
                    Privacy Policy
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || (mode === 'register' && !acceptTerms)}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:scale-100"
            >
              {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
            </button>

            {/* Forgot Password Link */}
            {mode === 'login' && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToPage) {
                      onNavigateToPage('reset-password')
                      onClose()
                    }
                  }}
                  className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            {/* Switch Mode */}
            <div className="text-center pt-4">
              <span className="text-gray-400">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {mode === 'login' ? 'Join Now' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthModal