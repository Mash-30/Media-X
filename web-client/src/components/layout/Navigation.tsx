import { NavLink, useLocation } from 'react-router-dom'
import { Home, Search, MessageCircle, User, Plus } from 'lucide-react'
import { cn } from '@utils/cn'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/messages', icon: MessageCircle, label: 'Messages' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export const Navigation: React.FC = () => {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center w-16 h-12 rounded-lg transition-colors',
                isActive
                  ? 'text-primary-500 bg-primary-50'
                  : 'text-text-light hover:text-text-primary'
              )
            }
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </NavLink>
        ))}
        
        {/* Create Post Button */}
        <NavLink
          to="/create-post"
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center w-16 h-12 rounded-lg transition-colors',
              isActive
                ? 'text-primary-500 bg-primary-50'
                : 'text-text-light hover:text-text-primary'
            )
          }
        >
          <Plus size={20} />
          <span className="text-xs mt-1">Create</span>
        </NavLink>
      </div>
    </nav>
  )
} 