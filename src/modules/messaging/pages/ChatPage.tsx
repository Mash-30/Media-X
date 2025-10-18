import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Send, ArrowLeft, MoreVertical, Paperclip, Smile } from 'lucide-react'
import { Avatar } from '@components/ui/Avatar'

interface Message {
  id: string
  text: string
  timestamp: number
  isFromMe: boolean
  isRead: boolean
}

interface User {
  username: string
  displayName: string
  avatar?: string
  isOnline: boolean
  lastSeen: string
}

// Enhanced mock data for chat messages (with timestamps)
const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey! How are you doing?',
    timestamp: Date.now() - 3600000, // 1 hour ago
    isFromMe: false,
    isRead: true
  },
  {
    id: '2',
    text: 'I\'m doing great! Thanks for asking. How about you?',
    timestamp: Date.now() - 3500000, // 58 minutes ago
    isFromMe: true,
    isRead: true
  },
  {
    id: '3',
    text: 'Pretty good! Just working on some projects.',
    timestamp: Date.now() - 3400000, // 57 minutes ago
    isFromMe: false,
    isRead: true
  },
  {
    id: '4',
    text: 'That sounds interesting! What kind of projects?',
    timestamp: Date.now() - 3300000, // 55 minutes ago
    isFromMe: true,
    isRead: true
  },
  {
    id: '5',
    text: 'Mostly web development and mobile apps.',
    timestamp: Date.now() - 3200000, // 53 minutes ago
    isFromMe: false,
    isRead: true
  },
  {
    id: '6',
    text: 'That\'s awesome! I\'d love to see some of your work.',
    timestamp: Date.now() - 3100000, // 52 minutes ago
    isFromMe: true,
    isRead: false
  }
]

export const ChatPage = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // Get user info from location state or create default
  const userInfo: User = location.state?.user || {
    username: userId || 'user',
    displayName: userId || 'User',
    avatar: undefined,
    isOnline: true,
    lastSeen: '2 min ago'
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    console.log('Messages state updated:', messages)
  }, [messages])

  useEffect(() => {
    // Simulate typing indicator
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false)
        // Add a mock reply
        const mockReply: Message = {
          id: Date.now().toString(),
          text: getRandomReply(),
          timestamp: Date.now(),
          isFromMe: false,
          isRead: false
        }
        setMessages(prev => [...prev, mockReply])
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const getRandomReply = () => {
    const replies = [
      'That\'s interesting!',
      'Tell me more about that.',
      'I see what you mean.',
      'Thanks for sharing!',
      'That sounds great!',
      'I agree with you.',
      'What do you think about that?',
      'That\'s a good point!'
    ]
    return replies[Math.floor(Math.random() * replies.length)]
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return

    setIsSending(true)
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      timestamp: Date.now(),
      isFromMe: true,
      isRead: false
    }

    console.log('Sending message:', userMessage)
    setMessages(prev => {
      const newMessages = [...prev, userMessage]
      console.log('Updated messages:', newMessages)
      return newMessages
    })
    setNewMessage('')
    setIsSending(false)

    // Simulate typing indicator
    setTimeout(() => {
      setIsTyping(true)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const renderMessage = (message: Message) => (
    <div
      key={message.id}
      className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          message.isFromMe
            ? 'bg-primary-500 text-white rounded-br-md'
            : 'bg-gray-200 text-gray-900 rounded-bl-md'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <div className={`flex items-center justify-end mt-1 space-x-1 ${
          message.isFromMe ? 'text-white/70' : 'text-gray-500'
        }`}>
          <span className="text-xs">{formatTime(message.timestamp)}</span>
          {message.isFromMe && (
            <span className="text-xs">
              {message.isRead ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-white">
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/messages')} 
            className="p-2 hover:bg-border-light rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-text-primary" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button 
                onClick={() => navigate(`/user/${userInfo.username}`)}
                className="cursor-pointer"
              >
                <Avatar 
                  size="md" 
                  src={userInfo.avatar} 
                  alt={userInfo.displayName} 
                  className="cursor-pointer" 
                />
              </button>
              {userInfo.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-text-primary">{userInfo.displayName}</h2>
              <p className="text-sm text-text-light">
                {userInfo.isOnline ? 'Online' : `Last seen ${userInfo.lastSeen}`}
              </p>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-border-light rounded-full transition-colors">
          <MoreVertical size={20} className="text-text-primary" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length > 0 ? (
          messages.map(renderMessage)
        ) : (
          <div className="text-center text-gray-500">
            No messages yet. Start a conversation!
          </div>
        )}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-200 text-gray-900 rounded-2xl rounded-bl-md px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-white">
        <div className="flex items-end space-x-2">
          <button className="p-2 hover:bg-border-light rounded-full transition-colors">
            <Paperclip size={20} className="text-text-light" />
          </button>
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent max-h-32"
              rows={1}
              disabled={isSending}
            />
            <button className="absolute right-2 bottom-2 p-1 hover:bg-border-light rounded-full transition-colors">
              <Smile size={20} className="text-text-light" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isSending}
            className={`p-3 rounded-full min-w-[48px] flex items-center justify-center transition-colors ${
              newMessage.trim() && !isSending 
                ? 'bg-primary-500 hover:bg-primary-600 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send size={20} className="text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
} 