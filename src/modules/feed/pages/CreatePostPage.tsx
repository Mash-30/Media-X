import React, { useState } from 'react'
import { X, Image, Smile, MapPin, User, Globe, Lock, Users } from 'lucide-react'
import { Avatar } from '@components/ui/Avatar'
import { Button } from '@components/ui/Button'

export const CreatePostPage = () => {
  const [postText, setPostText] = useState('Hello Guys,\nI would love to share a fine adventure trip in kashmir hope you guys like it\n\n#travel #time #tranding')
  const [privacy, setPrivacy] = useState('public')
  const [facebookEnabled, setFacebookEnabled] = useState(false)
  const [twitterEnabled, setTwitterEnabled] = useState(false)

  const handlePost = () => {
    console.log('Creating post:', { postText, privacy, facebookEnabled, twitterEnabled })
    // Navigate back
    window.history.back()
  }

  const handleClose = () => {
    window.history.back()
  }

  const privacyOptions = [
    { id: 'public', label: 'Public', icon: Globe, description: 'Anyone can see this post' },
    { id: 'friends', label: 'Friends', icon: Users, description: 'Only your friends can see this post' },
    { id: 'private', label: 'Private', icon: Lock, description: 'Only you can see this post' },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-border p-4 flex items-center justify-between">
        <button
          onClick={handleClose}
          className="p-2 hover:bg-border-light rounded-lg transition-colors"
        >
          <X size={24} className="text-text-secondary" />
        </button>
        <h1 className="text-lg font-semibold text-text-primary">Create New Post</h1>
        <Button
          title="Post"
          onPress={handlePost}
          variant="primary"
          size="small"
        />
      </div>

      {/* Content */}
      <div className="bg-white p-6">
        {/* User Info */}
        <div className="flex items-center space-x-3 mb-6">
          <Avatar size="md" />
          <div className="flex-1">
            <p className="font-medium text-text-primary">chineze_afamefuna</p>
            <button className="flex items-center space-x-1 text-primary-500 hover:text-primary-600">
              <Globe size={16} />
              <span className="text-sm">Public</span>
            </button>
          </div>
        </div>
        
        {/* Post Input */}
        <div className="mb-6">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full min-h-32 p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          />
        </div>
        
        {/* Privacy Settings */}
        <div className="mb-6">
          <h3 className="font-medium text-text-primary mb-3">Who can see this post?</h3>
          <div className="space-y-2">
            {privacyOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => setPrivacy(option.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    privacy === option.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-border hover:bg-border-light'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon size={20} className="text-text-secondary" />
                    <div className="text-left">
                      <p className="font-medium text-text-primary">{option.label}</p>
                      <p className="text-sm text-text-secondary">{option.description}</p>
                    </div>
                  </div>
                  {privacy === option.id && (
                    <div className="w-4 h-4 bg-primary-500 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
        
        {/* Cross-posting Options */}
        <div className="mb-6">
          <h3 className="font-medium text-text-primary mb-3">Also post on</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-sm">f</span>
                </div>
                <span className="font-medium text-text-primary">Facebook</span>
              </div>
              <button
                onClick={() => setFacebookEnabled(!facebookEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  facebookEnabled ? 'bg-primary-500' : 'bg-border'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  facebookEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
                  <span className="text-white text-sm">t</span>
                </div>
                <span className="font-medium text-text-primary">Twitter</span>
              </div>
              <button
                onClick={() => setTwitterEnabled(!twitterEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  twitterEnabled ? 'bg-primary-500' : 'bg-border'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  twitterEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-4 pt-4 border-t border-border">
          <button className="flex items-center space-x-2 p-2 hover:bg-border-light rounded-lg transition-colors">
            <Image size={20} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Photo</span>
          </button>
          
          <button className="flex items-center space-x-2 p-2 hover:bg-border-light rounded-lg transition-colors">
            <Smile size={20} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Feeling</span>
          </button>
          
          <button className="flex items-center space-x-2 p-2 hover:bg-border-light rounded-lg transition-colors">
            <MapPin size={20} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">Check in</span>
          </button>
        </div>
      </div>
    </div>
  )
} 