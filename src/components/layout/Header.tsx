import { useLocation } from 'react-router-dom'
import { Plus, Bell } from 'lucide-react'
import { useAuthStore } from '@shared/stores/authStore'

export const Header: React.FC = () => {
  const location = useLocation()
  const { user } = useAuthStore()

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Media X'
      case '/search':
        return 'Search'
      case '/messages':
        return 'Messages'
      case '/profile':
        return 'Profile'
      case '/create-post':
        return 'Create Post'
      default:
        return 'Media X'
    }
  }

  const showActions = location.pathname === '/'

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-text-primary">
          {getPageTitle()}
        </h1>
        
        {showActions && (
          <div className="flex items-center space-x-3">
            <button className="p-2 text-text-primary hover:text-primary-500 transition-colors">
              <Plus size={20} />
            </button>
            <button className="p-2 text-text-primary hover:text-primary-500 transition-colors">
              <Bell size={20} />
            </button>
          </div>
        )}
      </div>
    </header>
  )
} 