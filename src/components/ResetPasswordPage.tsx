import React, { useState } from 'react'
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react'

interface ResetPasswordPageProps {
  onNavigateToPage: (page: string) => void
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigateToPage }) => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const resetResponse = await fetch(`${import.meta.env.VITE_API_URL}/reset-password.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      })

      const resetData = await resetResponse.json()

      if (!resetResponse.ok || resetData.error) {
        throw new Error(resetData.error || 'Failed to reset password')
      }

      const loginResponse = await fetch(`${import.meta.env.VITE_API_URL}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: resetData.username,
          password: newPassword,
        }),
      })

      const loginData = await loginResponse.json()

      if (!loginResponse.ok || loginData.error) {
        throw new Error('Password reset but login failed. Please try logging in manually.')
      }

      localStorage.setItem('user', JSON.stringify(loginData.user))
      localStorage.setItem('token', loginData.token)

      setSuccess('Password reset successfully! Logging you in...')
      setTimeout(() => {
        onNavigateToPage('home')
        window.location.reload()
      }, 1500)
    } catch (error: any) {
      setError(error.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-800/90 to-purple-900/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md border border-purple-500/20 p-6">
        <button
          onClick={() => onNavigateToPage('home')}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">
          Reset Password
        </h2>
        <p className="text-gray-400 mb-6">
          Enter your email and new password to reset your account.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
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

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter new password"
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
                placeholder="Confirm new password"
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

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:scale-100"
          >
            {loading ? 'Resetting Password...' : 'Reset Password & Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage
