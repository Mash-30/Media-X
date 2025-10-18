import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Share2, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { PostCard } from '@modules/feed/components/PostCard'
import { StoryCard } from '@modules/feed/components/StoryCard'
import { CommentModal } from '@modules/feed/components/CommentModal'
import { Button } from '@components/ui/Button'
import toast from 'react-hot-toast'

// Mock data for stories
const stories = [
  { id: 'you', username: 'You', hasStory: false, isAdd: true },
  { id: '1', username: 'uzoma_10', hasStory: true },
  { id: '2', username: '_.buchi._', hasStory: true },
  { id: '3', username: '__chihoko', hasStory: true },
  { id: '4', username: '_.gand', hasStory: true },
  { id: '5', username: 'sarah_wilson', hasStory: true },
  { id: '6', username: 'mike_chen', hasStory: true },
]

// Mock data for posts
const mockPosts = [
  {
    id: '1',
    user: {
      username: 'jana_strassmann',
      displayName: 'Jana Strassmann',
      avatar: 'https://via.placeholder.com/40',
      profession: 'Artist'
    },
    content: {
      text: 'Hello my friends today i did holl for the first time it was a crazy experience.',
      image: 'https://via.placeholder.com/600x400',
      isMultiImage: true
    },
    engagement: {
      likes: 500,
      comments: 13,
      isLiked: true
    },
    hashtags: ['#travel', '#time', '#tranding']
  },
  {
    id: '2',
    user: {
      username: 'john_doe',
      displayName: 'John Doe',
      avatar: 'https://via.placeholder.com/40',
      profession: 'Software Developer'
    },
    content: {
      text: 'Just finished building this amazing social media app! 🚀 #coding #reactnative #socialmedia',
      image: 'https://via.placeholder.com/600x400',
      isMultiImage: false
    },
    engagement: {
      likes: 320,
      comments: 8,
      isLiked: false
    },
    hashtags: ['#coding', '#reactnative', '#socialmedia']
  },
  {
    id: '3',
    user: {
      username: 'sarah_wilson',
      displayName: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/40',
      profession: 'Photographer'
    },
    content: {
      text: 'Sunset vibes at the beach today. Perfect ending to a perfect day! 🌅',
      image: 'https://via.placeholder.com/600x400',
      isMultiImage: true
    },
    engagement: {
      likes: 280,
      comments: 5,
      isLiked: false
    },
    hashtags: ['#sunset', '#beach', '#vibes']
  },
]

export const HomePage = () => {
  const navigate = useNavigate()
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [currentPostIndex, setCurrentPostIndex] = useState<Record<string, number>>({})
  const [commentModalOpen, setCommentModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [posts, setPosts] = useState(mockPosts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts)
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId)
      toast.success('Post unliked')
    } else {
      newLikedPosts.add(postId)
      toast.success('Post liked')
    }
    setLikedPosts(newLikedPosts)
    
    // Update the post in the list
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            engagement: {
              ...post.engagement,
              likes: newLikedPosts.has(postId) ? (post.engagement?.likes || 0) + 1 : Math.max(0, (post.engagement?.likes || 0) - 1)
            }
          }
        : post
    ))
  }

  const handleComment = (post: any) => {
    setSelectedPost(post)
    setCommentModalOpen(true)
  }

  const handleUserClick = (username: string) => {
    console.log('handleUserClick - username:', username)
    if (username === 'jana_strassmann') {
      console.log('Navigating to profile:', `/user/${username}`)
      navigate(`/user/${username}`)
    }
  }

  const handleCloseCommentModal = () => {
    setCommentModalOpen(false)
    setSelectedPost(null)
  }

  const handleCommentAdded = (postId: string) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              engagement: {
                ...post.engagement,
                comments: (post.engagement?.comments || 0) + 1
              }
            }
          : post
      )
    )
  }

  const handleNextPost = (username: string) => {
    const userPosts = posts.filter(post => post.user.username === username)
    const currentIndex = currentPostIndex[username] || 0
    if (currentIndex < userPosts.length - 1) {
      setCurrentPostIndex(prev => ({ ...prev, [username]: currentIndex + 1 }))
    }
  }

  const handlePreviousPost = (username: string) => {
    const currentIndex = currentPostIndex[username] || 0
    if (currentIndex > 0) {
      setCurrentPostIndex(prev => ({ ...prev, [username]: currentIndex - 1 }))
    }
  }

  const getCurrentPostIndex = (username: string) => currentPostIndex[username] || 0

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading posts...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-error mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-0">
      {/* Stories Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 sm:pb-4 scrollbar-hide">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>

      {/* Posts Section */}
      <div className="space-y-4 sm:space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">No posts yet</p>
            <p className="text-sm text-text-light">Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post) => {
            const userPosts = posts.filter(p => p.user?.username === post.user?.username)
            const currentIndex = getCurrentPostIndex(post.user?.username || '')
            const currentPost = userPosts[currentIndex] || post
            
            return (
              <div key={`${post.user?.username}-${currentIndex}`} className="bg-white rounded-lg shadow-sm border border-border">
                {/* Post Header */}
                <div className="flex items-center justify-between p-3 sm:p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-border-light flex items-center justify-center">
                      {currentPost.user?.avatar ? (
                        <img 
                          src={currentPost.user.avatar} 
                          alt={currentPost.user.displayName || currentPost.user.username}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-text-light text-xs sm:text-sm">👤</span>
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => handleUserClick(currentPost.user?.username)}
                        className="text-left hover:opacity-80 transition-opacity"
                      >
                        <h3 className="font-semibold text-text-primary text-sm sm:text-base">
                          {currentPost.user?.displayName || currentPost.user?.username || 'Unknown User'}
                        </h3>
                        <p className="text-xs sm:text-sm text-text-secondary">@{currentPost.user?.username || 'unknown'}</p>
                      </button>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-border-light rounded-full transition-colors">
                    <MoreHorizontal size={18} className="text-text-secondary sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Post Content */}
                <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                  {currentPost.content?.image && (
                    <div className="mb-3 sm:mb-4">
                      <div className="w-full h-48 sm:h-64 bg-border-light rounded-lg flex items-center justify-center mb-3 sm:mb-4 relative">
                        <img 
                          src={currentPost.content.image} 
                          alt="Post content"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                  
                  <p className="text-text-primary mb-2 sm:mb-3 text-sm sm:text-base">
                    {typeof currentPost.content === 'string' 
                      ? currentPost.content 
                      : currentPost.content?.text || ''
                    }
                  </p>
                  
                  {currentPost.hashtags && currentPost.hashtags.length > 0 && (
                    <div className="mb-2 sm:mb-3">
                      {currentPost.hashtags.map((tag, index) => (
                        <span key={index} className="text-primary-500 text-xs sm:text-sm mr-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {likedPosts.has(currentPost.id) && (
                    <p className="text-xs sm:text-sm text-text-secondary mb-2 sm:mb-3">
                      Liked by you and {currentPost.engagement?.likes || 0} others
                    </p>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <button 
                      onClick={() => handleLike(currentPost.id)}
                      className="flex items-center space-x-1 sm:space-x-2 hover:text-like transition-colors py-1"
                    >
                      <Heart 
                        size={18} 
                        className={`sm:w-5 sm:h-5 ${likedPosts.has(currentPost.id) ? 'fill-like text-like' : ''}`} 
                      />
                      <span className="text-xs sm:text-sm">{currentPost.engagement?.likes || 0}</span>
                    </button>
                    
                    <button 
                      onClick={() => handleComment(currentPost)}
                      className="flex items-center space-x-1 sm:space-x-2 hover:text-comment transition-colors py-1"
                    >
                      <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm">{currentPost.engagement?.comments || 0}</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 sm:space-x-2 hover:text-share transition-colors py-1">
                      <Share2 size={18} className="sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm hidden sm:inline">Share</span>
                    </button>
                  </div>

                  {/* Post Navigation (if multiple posts) */}
                  {userPosts.length > 1 && (
                    <div className="mt-3 sm:mt-4 flex items-center justify-between">
                      <button
                        onClick={() => handlePreviousPost(post.user?.username || '')}
                        disabled={currentIndex === 0}
                        className="p-1.5 sm:p-2 hover:bg-border-light rounded-full transition-colors disabled:opacity-50"
                      >
                        <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                      </button>
                      
                      <div className="flex space-x-1">
                        {userPosts.map((_, index) => (
                          <div
                            key={index}
                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                              index === currentIndex ? 'bg-primary-500' : 'bg-border'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <button
                        onClick={() => handleNextPost(post.user?.username || '')}
                        disabled={currentIndex === userPosts.length - 1}
                        className="p-1.5 sm:p-2 hover:bg-border-light rounded-full transition-colors disabled:opacity-50"
                      >
                        <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Comment Modal */}
      {selectedPost && (
        <CommentModal
          isOpen={commentModalOpen}
          onClose={handleCloseCommentModal}
          postId={selectedPost.id}
          postUser={selectedPost.user}
          postContent={selectedPost.content?.text || selectedPost.content}
          postImage={selectedPost.content?.image}
          onCommentAdded={() => handleCommentAdded(selectedPost.id)}
        />
      )}
    </div>
  )
} 