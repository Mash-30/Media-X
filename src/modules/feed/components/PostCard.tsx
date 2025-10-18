import React from 'react'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'

interface Post {
  id: string
  user: {
    username: string
    displayName: string
    avatar: string
    profession: string
  }
  content: {
    text: string
    image: string
    isMultiImage: boolean
  }
  engagement: {
    likes: number
    comments: number
    isLiked: boolean
  }
  hashtags: string[]
}

interface PostCardProps {
  post: Post
  isLiked: boolean
  onLike: (postId: string) => void
}

export const PostCard: React.FC<PostCardProps> = ({ post, isLiked, onLike }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-border-light flex items-center justify-center">
            <span className="text-text-light text-xs sm:text-sm">👤</span>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary text-sm sm:text-base">{post.user.displayName}</h3>
            <p className="text-xs sm:text-sm text-text-secondary">{post.user.profession}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-border-light rounded-full transition-colors">
          <MoreHorizontal size={18} className="text-text-secondary sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <div className="mb-3 sm:mb-4">
          <div className="w-full h-48 sm:h-64 bg-border-light rounded-lg flex items-center justify-center mb-3 sm:mb-4">
            <span className="text-text-light text-base sm:text-lg">📷</span>
          </div>
          {post.content.isMultiImage && (
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              📷
            </div>
          )}
        </div>
        
        <p className="text-text-primary mb-2 sm:mb-3 text-sm sm:text-base">{post.content.text}</p>
        
        {isLiked && (
          <p className="text-xs sm:text-sm text-text-secondary mb-2 sm:mb-3">
            Liked by you and {post.engagement.likes} others
          </p>
        )}

        {/* Post Actions */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button 
            onClick={() => onLike(post.id)}
            className="flex items-center space-x-1 sm:space-x-2 hover:text-like transition-colors py-1"
          >
            <Heart 
              size={18} 
              className={`sm:w-5 sm:h-5 ${isLiked ? 'fill-like text-like' : ''}`} 
            />
            <span className="text-xs sm:text-sm">{post.engagement.likes}</span>
          </button>
          
          <button className="flex items-center space-x-1 sm:space-x-2 hover:text-comment transition-colors py-1">
            <MessageCircle size={18} className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">{post.engagement.comments}</span>
          </button>
          
          <button className="flex items-center space-x-1 sm:space-x-2 hover:text-share transition-colors py-1">
            <Share2 size={18} className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
} 