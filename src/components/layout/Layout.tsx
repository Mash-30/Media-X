import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { 
  Home, 
  Search, 
  MessageCircle, 
  User, 
  Plus,
  Bell,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useAuthStore } from '@shared/stores/authStore'
import { Button } from '@components/ui/Button'
import { Avatar } from '@components/ui/Avatar'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Messages', href: '/messages', icon: MessageCircle },
  { name: 'Profile', href: '/profile', icon: User },
]

export const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user } = useAuthStore()
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleCreatePost = () => {
    navigate('/create-post')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary-500 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-lg sm:text-2xl font-bold">Media X</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-white hover:bg-primary-600'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={handleCreatePost}
                className="p-2 rounded-lg hover:bg-primary-600 transition-colors"
                title="Create Post"
              >
                <Plus size={18} className="sm:w-5 sm:h-5" />
              </button>
              
              <button className="p-2 rounded-lg hover:bg-primary-600 transition-colors relative">
                <Bell size={18} className="sm:w-5 sm:h-5" />
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-xs">
                  3
                </span>
              </button>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <Avatar 
                  src={user?.avatar} 
                  alt={user?.displayName || 'User'}
                  size="sm"
                />
                <div className="hidden lg:block">
                  <p className="text-sm font-medium">{user?.displayName}</p>
                  <p className="text-xs text-primary-100">@{user?.username}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-primary-600 border-t border-primary-400">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.href)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-700 text-white'
                        : 'text-white hover:bg-primary-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </button>
                )
              })}
              
              {/* Mobile User Actions */}
              <div className="border-t border-primary-400 pt-2 mt-2">
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-3 text-sm text-white hover:bg-primary-700 rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden bg-white border-t border-border fixed bottom-0 left-0 right-0 z-40">
        <div className="flex justify-around py-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`flex flex-col items-center py-2 px-2 text-xs font-medium transition-colors min-w-0 flex-1 ${
                  isActive
                    ? 'text-primary-500'
                    : 'text-text-secondary hover:text-primary-500'
                }`}
              >
                <Icon size={20} />
                <span className="mt-1 truncate">{item.name}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 pb-16 md:pb-6">
        <Outlet />
      </main>

      {/* Settings Menu (Desktop) */}
      <div className="hidden md:block fixed bottom-6 right-6">
        <div className="bg-white rounded-lg shadow-lg border border-border p-4">
          <div className="space-y-2">
            <button className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-text-secondary hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors">
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-error hover:bg-error/10 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 