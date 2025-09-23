import React, { useState } from 'react'
import { Settings, Grid, Bookmark, Tag, Edit, LogOut } from 'lucide-react'
import { Avatar } from '@components/ui/Avatar'
import { Button } from '@components/ui/Button'

// Mock data for current user profile
const mockUserProfile = {
  id: '1',
  username: 'johndoe',
  displayName: 'John Doe',
  avatar: 'https://via.placeholder.com/150',
  bio: 'Digital creator | Photography enthusiast | Travel lover ✈️',
  website: 'https://johndoe.com',
  stats: {
    posts: 42,
    followers: 1234,
    following: 567,
  },
  isFollowing: false,
  isOwnProfile: true,
}

const mockPosts = [
  {
    id: '1',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image' as const,
    likes: 123,
    comments: 12,
  },
  {
    id: '2',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'video' as const,
    likes: 89,
    comments: 5,
  },
  {
    id: '3',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image' as const,
    likes: 256,
    comments: 23,
  },
  {
    id: '4',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image' as const,
    likes: 67,
    comments: 8,
  },
  {
    id: '5',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'video' as const,
    likes: 189,
    comments: 15,
  },
  {
    id: '6',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image' as const,
    likes: 92,
    comments: 7,
  },
]

const tabs = [
  { id: 'posts', label: 'Posts', icon: Grid },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'tagged', label: 'Tagged', icon: Tag },
]

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('posts')
  const [userProfile, setUserProfile] = useState(mockUserProfile)
  const [posts, setPosts] = useState(mockPosts)

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const handleEditProfile = () => {
    console.log('Edit profile')
  }

  const handleSettings = () => {
    console.log('Settings')
  }

  const handleLogout = () => {
    console.log('Logout')
  }

  const renderTabButton = (tab: any) => {
    const Icon = tab.icon
    return (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeTab === tab.id
            ? 'bg-primary-500 text-white'
            : 'text-text-secondary hover:text-primary-500'
        }`}
      >
        <Icon size={16} />
        <span>{tab.label}</span>
      </button>
    )
  }

  const renderPostGrid = () => (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((post) => (
        <div key={post.id} className="aspect-square bg-border-light rounded-lg flex items-center justify-center relative group cursor-pointer">
          <span className="text-text-light text-lg">📷</span>
          {post.type === 'video' && (
            <div className="absolute top-2 right-2 bg-black/50 text-white px-1 py-0.5 rounded text-xs">
              ▶️
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <span className="text-sm">❤️</span>
                <span className="text-sm">{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-sm">💬</span>
                <span className="text-sm">{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-6">
        <div className="flex items-start space-x-6">
          {/* Avatar */}
          <Avatar size="xl" src={userProfile.avatar} alt={userProfile.displayName} />
          
          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <h1 className="text-2xl font-bold text-text-primary">{userProfile.displayName}</h1>
              <div className="flex space-x-2">
                <Button
                  title="Edit Profile"
                  onPress={handleEditProfile}
                  variant="outline"
                  size="small"
                />
                <button
                  onClick={handleSettings}
                  className="p-2 hover:bg-border-light rounded-lg transition-colors"
                >
                  <Settings size={20} className="text-text-secondary" />
                </button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex space-x-8 mb-4">
              <div className="text-center">
                <p className="font-semibold text-text-primary">{formatNumber(userProfile.stats.posts)}</p>
                <p className="text-sm text-text-secondary">posts</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-text-primary">{formatNumber(userProfile.stats.followers)}</p>
                <p className="text-sm text-text-secondary">followers</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-text-primary">{formatNumber(userProfile.stats.following)}</p>
                <p className="text-sm text-text-secondary">following</p>
              </div>
            </div>
            
            {/* Bio */}
            <div className="mb-4">
              <p className="font-medium text-text-primary mb-1">{userProfile.displayName}</p>
              <p className="text-text-secondary mb-2">{userProfile.bio}</p>
              {userProfile.website && (
                <a 
                  href={userProfile.website} 
                  className="text-primary-500 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userProfile.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-2 border-b border-border">
          {tabs.map(renderTabButton)}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'posts' && renderPostGrid()}
        {activeTab === 'saved' && (
          <div className="text-center py-12">
            <Bookmark size={48} className="text-text-light mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No saved posts yet</h3>
            <p className="text-text-secondary">Save photos and videos that you want to see again.</p>
          </div>
        )}
        {activeTab === 'tagged' && (
          <div className="text-center py-12">
            <Tag size={48} className="text-text-light mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No tagged posts yet</h3>
            <p className="text-text-secondary">Photos and videos you're tagged in will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
} 