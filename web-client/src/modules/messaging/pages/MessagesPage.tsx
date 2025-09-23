import React, { useState } from 'react'
import { Search, MoreVertical, Circle, Send } from 'lucide-react'
import { Avatar } from '@components/ui/Avatar'
import { useNavigate } from 'react-router-dom'

// Enhanced mock data for messages
const messages = [
  {
    id: '1',
    user: {
      username: 'sarah_wilson',
      displayName: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/50',
      isOnline: true,
      lastSeen: '2 min ago'
    },
    lastMessage: {
      text: 'Hey! How are you doing?',
      timestamp: '2 min ago',
      isRead: false
    },
    unreadCount: 2
  },
  {
    id: '2',
    user: {
      username: 'mike_chen',
      displayName: 'Mike Chen',
      avatar: 'https://via.placeholder.com/50',
      isOnline: false,
      lastSeen: '1 hour ago'
    },
    lastMessage: {
      text: 'Thanks for the help with the project!',
      timestamp: '1 hour ago',
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: '3',
    user: {
      username: 'emma_davis',
      displayName: 'Emma Davis',
      avatar: 'https://via.placeholder.com/50',
      isOnline: true,
      lastSeen: 'online'
    },
    lastMessage: {
      text: 'Can we meet tomorrow?',
      timestamp: '3 hours ago',
      isRead: false
    },
    unreadCount: 1
  },
  {
    id: '4',
    user: {
      username: 'alex_johnson',
      displayName: 'Alex Johnson',
      avatar: 'https://via.placeholder.com/50',
      isOnline: false,
      lastSeen: 'yesterday'
    },
    lastMessage: {
      text: 'Great job on the presentation!',
      timestamp: 'yesterday',
      isRead: true
    },
    unreadCount: 0
  },
  {
    id: '5',
    user: {
      username: 'lisa_brown',
      displayName: 'Lisa Brown',
      avatar: 'https://via.placeholder.com/50',
      isOnline: true,
      lastSeen: 'online'
    },
    lastMessage: {
      text: 'See you at the party tonight!',
      timestamp: '2 days ago',
      isRead: true
    },
    unreadCount: 0
  }
]

export const MessagesPage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredMessages, setFilteredMessages] = useState(messages)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setFilteredMessages(messages)
    } else {
      const filtered = messages.filter(message =>
        message.user.username.toLowerCase().includes(query.toLowerCase()) ||
        message.user.displayName.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredMessages(filtered)
    }
  }

  const handleMessageClick = (message: any) => {
    navigate(`/chat/${message.id}`)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-full border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Send size={24} />
            </div>
            <p className="text-lg font-medium">No messages found</p>
            <p className="text-sm">Try searching for a different name</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleMessageClick(message)}
                className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="relative">
                  <Avatar
                    src={message.user.avatar}
                    alt={message.user.displayName}
                    size="lg"
                  />
                  {message.user.isOnline && (
                    <Circle
                      size={12}
                      className="absolute -bottom-1 -right-1 text-green-500 fill-current"
                    />
                  )}
                </div>
                
                <div className="flex-1 ml-4 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {message.user.displayName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {message.lastMessage.timestamp}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 truncate">
                      {message.lastMessage.text}
                    </p>
                    {message.unreadCount > 0 && (
                      <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {message.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}