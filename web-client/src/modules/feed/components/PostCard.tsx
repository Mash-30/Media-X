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
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-border-light flex items-center justify-center">
            <span className="text-text-light text-sm">👤</span>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{post.user.displayName}</h3>
            <p className="text-sm text-text-secondary">{post.user.profession}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-border-light rounded-full transition-colors">
          <MoreHorizontal size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <div className="mb-4">
          <div className="w-full h-64 bg-border-light rounded-lg flex items-center justify-center mb-4">
            <span className="text-text-light text-lg">📷</span>
          </div>
          {post.content.isMultiImage && (
            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              📷
            </div>
          )}
        </div>
        
        <p className="text-text-primary mb-3">{post.content.text}</p>
        
        {isLiked && (
          <p className="text-sm text-text-secondary mb-3">
            Liked by you and {post.engagement.likes} others
          </p>
        )}

        {/* Post Actions */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => onLike(post.id)}
            className="flex items-center space-x-2 hover:text-like transition-colors"
          >
            <Heart 
              size={20} 
              className={isLiked ? 'fill-like text-like' : ''} 
            />
            <span className="text-sm">{post.engagement.likes}</span>
          </button>
          
          <button className="flex items-center space-x-2 hover:text-comment transition-colors">
            <MessageCircle size={20} />
            <span className="text-sm">{post.engagement.comments}</span>
          </button>
          
          <button className="flex items-center space-x-2 hover:text-share transition-colors">
            <Share2 size={20} />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  )
} 