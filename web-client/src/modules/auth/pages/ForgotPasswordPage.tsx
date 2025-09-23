import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@components/ui/Button'

export const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-primary-100">Enter your email to reset your password</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <p className="text-text-secondary mb-4">Password reset functionality coming soon...</p>
            <Link to="/login">
              <Button title="Back to Login" variant="primary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 