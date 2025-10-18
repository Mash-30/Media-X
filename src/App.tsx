import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from '@shared/stores/authStore'
import { Layout } from '@components/layout/Layout'
import { ProtectedRoute } from '@components/auth/ProtectedRoute'
import { SplashScreen } from '@components/SplashScreen'
import { OnboardingScreen } from '@components/OnboardingScreen'

// Auth Pages
import { LoginPage } from '@modules/auth/pages/LoginPage'
import { SignupPage } from '@modules/auth/pages/SignupPage'
import { ForgotPasswordPage } from '@modules/auth/pages/ForgotPasswordPage'

// Main App Pages
import { HomePage } from '@modules/feed/pages/HomePage'
import { SearchPage } from '@modules/explore/pages/SearchPage'
import { MessagesPage } from '@modules/messaging/pages/MessagesPage'
import { ProfilePage } from '@modules/profile/pages/ProfilePage'
import { CreatePostPage } from '@modules/feed/pages/CreatePostPage'
import { ChatPage } from '@modules/messaging/pages/ChatPage'
import { PostDetailPage } from '@modules/feed/pages/PostDetailPage'
import { UserProfilePage } from '@modules/profile/pages/UserProfilePage'

function App() {
  const { isAuthenticated, isLoading } = useAuthStore()

  // Show splash screen while loading
  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#00B894',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#FF6B6B',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        {/* Splash Screen */}
        <Route path="/splash" element={<SplashScreen />} />
        
        {/* Onboarding */}
        <Route path="/onboarding" element={<OnboardingScreen />} />
        
        {/* Public Routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
        } />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />
        } />
        <Route path="/forgot-password" element={
          isAuthenticated ? <Navigate to="/" replace /> : <ForgotPasswordPage />
        } />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="create-post" element={<CreatePostPage />} />
          <Route path="chat/:userId" element={<ChatPage />} />
          <Route path="post/:postId" element={<PostDetailPage />} />
          <Route path="user/:username" element={<UserProfilePage />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    </>
  )
}

export default App 