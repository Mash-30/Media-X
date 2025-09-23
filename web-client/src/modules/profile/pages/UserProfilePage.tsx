import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MoreHorizontal, MessageCircle, UserPlus, UserMinus, Heart, Share2 } from 'lucide-react'
import { Avatar } from '@components/ui/Avatar'
import { Button } from '@components/ui/Button'

// Mock data for Jana Strassmann
const janaStrassmann = {
  id: '1',
  username: 'jana_strassmann',
  displayName: 'Jana Strassmann',
  email: 'jana@example.com',
  avatar: 'https://via.placeholder.com/150',
  bio: 'Artist & Creative Director | Capturing life through art 🎨 | Berlin, Germany',
  website: 'https://janastrassmann.art',
  location: 'Berlin, Germany',
  joinDate: 'March 2020',
  stats: {
    posts: 42,
    followers: 1234,
    following: 567
  },
  isFollowing: false,
  isVerified: true
}

// Mock posts for Jana Strassmann
const janaPosts = [
  {
    id: '1',
    content: {
      text: 'Hello my friends today i did holl for the first time it was a crazy experience. The views were absolutely breathtaking and the adventure was unforgettable! 🏔️✨',
      image: 'https://via.placeholder.com/600x400',
      isMultiImage: true
    },
    engagement: {
      likes: 500,
      comments: 13,
      isLiked: false
    },
    hashtags: ['#travel', '#time', '#tranding'],
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    content: {
      text: 'Working on a new art project today. The creative process is so therapeutic! 🎨✨',
      image: 'https://via.placeholder.com/600x400',
      isMultiImage: false
    },
    engagement: {
      likes: 320,
      comments: 8,
      isLiked: false
    },
    hashtags: ['#art', '#creative', '#process'],
    timestamp: '1 day ago'
  },
  {
    id: '3',
    content: {
      text: 'Beautiful sunset in Berlin today. Sometimes the best moments are the simple ones 🌅',
      image: 'https://via.placeholder.com/600x400',
      isMultiImage: false
    },
    engagement: {
      likes: 180,
      comments: 5,
      isLiked: false
    },
    hashtags: ['#berlin', '#sunset', '#photography'],
    timestamp: '3 days ago'
  }
]

export const UserProfilePage = () => {
  const { username } = useParams<{ username: string }>()
  const navigate = useNavigate()
  const [isFollowing, setIsFollowing] = useState(janaStrassmann.isFollowing)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  // Debug logging
  console.log('UserProfilePage - username:', username)

  const handleBack = () => {
    navigate(-1)
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts)
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId)
    } else {
      newLikedPosts.add(postId)
    }
    setLikedPosts(newLikedPosts)
  }


  // For now, only show Jana Strassmann's profile
  // Show profile for jana_strassmann or if no username is provided (fallback)
  if (username && username !== 'jana_strassmann') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-border p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">User Not Found</h1>
            <p className="text-text-secondary mb-4">The user "{username}" could not be found.</p>
            <Button onClick={handleBack} variant="outline">
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-border mb-4">
        {/* Profile Header */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-text-primary">Profile</h1>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Profile Info */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <Avatar
                src={janaStrassmann.avatar}
                alt={janaStrassmann.displayName}
                size="xl"
                className="w-24 h-24"
              />
              {janaStrassmann.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-text-primary mb-1">
              {janaStrassmann.displayName}
            </h2>
            <p className="text-text-secondary mb-2">@{janaStrassmann.username}</p>
            
            {janaStrassmann.bio && (
              <p className="text-text-primary mb-3 max-w-md mx-auto">
                {janaStrassmann.bio}
              </p>
            )}
            
            <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary mb-4">
              {janaStrassmann.location && (
                <span>📍 {janaStrassmann.location}</span>
              )}
              <span>Joined {janaStrassmann.joinDate}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold text-text-primary">{janaStrassmann.stats.posts}</div>
                <div className="text-sm text-text-secondary">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-text-primary">{janaStrassmann.stats.followers}</div>
                <div className="text-sm text-text-secondary">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-text-primary">{janaStrassmann.stats.following}</div>
                <div className="text-sm text-text-secondary">Following</div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleFollow}
                variant={isFollowing ? "outline" : "primary"}
                className="px-8"
              >
                {isFollowing ? (
                  <>
                    <UserMinus size={16} className="mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus size={16} className="mr-2" />
                    Follow
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary px-4">Posts</h3>
        {janaPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border border-border">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Avatar
                  src={janaStrassmann.avatar}
                  alt={janaStrassmann.displayName}
                  size="sm"
                />
                <div>
                  <h4 className="font-semibold text-text-primary">{janaStrassmann.displayName}</h4>
                  <p className="text-sm text-text-secondary">@{janaStrassmann.username}</p>
                </div>
              </div>
              <span className="text-sm text-text-secondary">{post.timestamp}</span>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
              {post.content.image && (
                <div className="mb-4">
                  <img
                    src={post.content.image}
                    alt="Post content"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <p className="text-text-primary mb-3">{post.content.text}</p>
              
              {post.hashtags && post.hashtags.length > 0 && (
                <div className="mb-3">
                  {post.hashtags.map((tag, index) => (
                    <span key={index} className="text-primary-500 text-sm mr-2">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-2 hover:text-red-500 transition-colors"
                >
                  <Heart
                    size={20}
                    className={likedPosts.has(post.id) ? 'fill-red-500 text-red-500' : ''}
                  />
                  <span className="text-sm">{post.engagement.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                  <MessageCircle size={20} />
                  <span className="text-sm">{post.engagement.comments}</span>
                </button>
                
                <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                  <Share2 size={20} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}