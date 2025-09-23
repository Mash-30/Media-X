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
  LogOut
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
      <header className="bg-primary-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold">Media X</h1>
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
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreatePost}
                className="p-2 rounded-lg hover:bg-primary-600 transition-colors"
                title="Create Post"
              >
                <Plus size={20} />
              </button>
              
              <button className="p-2 rounded-lg hover:bg-primary-600 transition-colors relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="flex items-center space-x-3">
                <Avatar 
                  src={user?.avatar} 
                  alt={user?.displayName || 'User'}
                  size="sm"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user?.displayName}</p>
                  <p className="text-xs text-primary-100">@{user?.username}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-t border-border">
        <div className="flex justify-around">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`flex flex-col items-center py-2 px-3 text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-primary-500'
                    : 'text-text-secondary hover:text-primary-500'
                }`}
              >
                <Icon size={24} />
                <span className="mt-1">{item.name}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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