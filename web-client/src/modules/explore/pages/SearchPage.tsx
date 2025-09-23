import React, { useState } from 'react'
import { Search, User, Hash, MapPin } from 'lucide-react'
import { Avatar } from '@components/ui/Avatar'

// Mock data for recent searches
const recentSearches = [
  { id: '1', username: '__shrutti__', profession: 'UI Designer' },
  { id: '2', username: 'erika_mateo', profession: 'Fashion Designer' },
  { id: '3', username: 'carmelita_marsham', profession: 'Driver' },
  { id: '4', username: '._tao_yi._', profession: 'Business Developer' },
  { id: '5', username: 'chineze.afamefuna', profession: 'Analyst' },
  { id: '6', username: 'darren_adams', profession: 'Photographer' },
  { id: '7', username: '_arkell_charles_', profession: 'Voice Artist' },
]

// Mock data for all users
const allUsers = [
  { id: '1', username: 'jana_strassmann', displayName: 'Jana Strassmann', profession: 'Artist' },
  { id: '2', username: 'john_doe', displayName: 'John Doe', profession: 'Software Developer' },
  { id: '3', username: 'sarah_wilson', displayName: 'Sarah Wilson', profession: 'Photographer' },
  { id: '4', username: '__shrutti__', displayName: 'Shruti Sharma', profession: 'UI Designer' },
  { id: '5', username: 'erika_mateo', displayName: 'Erika Mateo', profession: 'Fashion Designer' },
  { id: '6', username: 'carmelita_marsham', displayName: 'Carmelita Marsham', profession: 'Driver' },
  { id: '7', username: '._tao_yi._', displayName: 'Tao Yi', profession: 'Business Developer' },
  { id: '8', username: 'chineze.afamefuna', displayName: 'Chineze Afamefuna', profession: 'Analyst' },
  { id: '9', username: 'darren_adams', displayName: 'Darren Adams', profession: 'Photographer' },
  { id: '10', username: '_arkell_charles_', displayName: 'Arkell Charles', profession: 'Voice Artist' },
]

const filters = [
  { id: 'discover', label: 'Discover', icon: MapPin },
  { id: 'accounts', label: 'Accounts', icon: User },
  { id: 'tag', label: 'Tag', icon: Hash },
]

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('accounts')
  const [filteredUsers, setFilteredUsers] = useState(allUsers)

  const handleSearchChange = (text: string) => {
    setSearchQuery(text)
    
    if (text.length > 0) {
      const filtered = allUsers.filter(user => 
        user.username.toLowerCase().includes(text.toLowerCase()) ||
        user.displayName.toLowerCase().includes(text.toLowerCase()) ||
        user.profession.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(allUsers)
    }
  }

  const renderFilterButton = (filter: any) => {
    const Icon = filter.icon
    return (
      <button
        key={filter.id}
        onClick={() => setActiveFilter(filter.id)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeFilter === filter.id
            ? 'bg-primary-500 text-white'
            : 'bg-border-light text-text-secondary hover:bg-border'
        }`}
      >
        <Icon size={16} />
        <span>{filter.label}</span>
      </button>
    )
  }

  const renderRecentSearch = (search: any) => (
    <div key={search.id} className="flex items-center justify-between p-3 hover:bg-border-light rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <Avatar size="sm" />
        <div>
          <p className="font-medium text-text-primary">{search.username}</p>
          <p className="text-sm text-text-secondary">{search.profession}</p>
        </div>
      </div>
      <button className="text-text-light hover:text-primary-500">
        <User size={16} />
      </button>
    </div>
  )

  const renderUserSuggestion = (user: any) => (
    <div key={user.id} className="flex items-center justify-between p-3 hover:bg-border-light rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <Avatar size="sm" />
        <div>
          <p className="font-medium text-text-primary">{user.displayName}</p>
          <p className="text-sm text-text-secondary">@{user.username}</p>
          <p className="text-xs text-text-light">{user.profession}</p>
        </div>
      </div>
      <button className="text-text-light hover:text-primary-500">
        <User size={16} />
      </button>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Search</h1>
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-light" size={20} />
          <input
            type="text"
            placeholder="Search for people, tags, or places..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {filters.map(renderFilterButton)}
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {searchQuery.length === 0 ? (
          <>
            {/* Recent Searches */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-text-primary mb-3">Recent Searches</h2>
              <div className="space-y-2">
                {recentSearches.map(renderRecentSearch)}
              </div>
            </div>

            {/* Suggested Users */}
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-3">Suggested for You</h2>
              <div className="space-y-2">
                {allUsers.slice(0, 5).map(renderUserSuggestion)}
              </div>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-3">
              Search Results ({filteredUsers.length})
            </h2>
            <div className="space-y-2">
              {filteredUsers.map(renderUserSuggestion)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 