import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Send, Heart, MoreHorizontal, ArrowLeft } from 'lucide-react'
import { Avatar } from '@components/ui/Avatar'

interface Comment {
  id: string
  user: {
    username: string
    displayName: string
    avatar?: string
  }
  text: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
}

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  postId: string
  postUser: {
    username: string
    displayName: string
    avatar?: string
  }
  postContent: string
  postImage?: string
  onCommentAdded?: () => void
}

// Mock comments data with replies
const mockComments: Comment[] = [
  {
    id: '1',
    user: {
      username: 'sarah_wilson',
      displayName: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/40'
    },
    text: 'Amazing post! Love the content 😍',
    timestamp: '2 hours ago',
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: '1-1',
        user: {
          username: 'johndoe',
          displayName: 'John Doe',
          avatar: 'https://via.placeholder.com/40'
        },
        text: 'Thanks Sarah! Glad you liked it 😊',
        timestamp: '1 hour ago',
        likes: 3,
        isLiked: false
      }
    ]
  },
  {
    id: '2',
    user: {
      username: 'mike_chen',
      displayName: 'Mike Chen',
      avatar: 'https://via.placeholder.com/40'
    },
    text: 'This is exactly what I needed to see today!',
    timestamp: '1 hour ago',
    likes: 8,
    isLiked: true
  },
  {
    id: '3',
    user: {
      username: 'emma_davis',
      displayName: 'Emma Davis',
      avatar: 'https://via.placeholder.com/40'
    },
    text: 'Keep up the great work! 👏',
    timestamp: '30 min ago',
    likes: 5,
    isLiked: false
  }
]

export const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  postId,
  postUser,
  postContent,
  postImage,
  onCommentAdded
}) => {
  const navigate = useNavigate()
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replyingToReply, setReplyingToReply] = useState<{commentId: string, reply: Comment} | null>(null)
  
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null)
  const replyToReplyTextareaRef = useRef<HTMLTextAreaElement>(null)

  const handleUserClick = (username: string) => {
    if (username === 'jana_strassmann') {
      navigate(`/user/${username}`)
    }
  }

  // Auto-focus reply textarea when reply section appears
  useEffect(() => {
    if (replyingTo && replyTextareaRef.current) {
      replyTextareaRef.current.focus()
    }
  }, [replyingTo])

  // Auto-focus reply-to-reply textarea when it appears
  useEffect(() => {
    if (replyingToReply && replyToReplyTextareaRef.current) {
      replyToReplyTextareaRef.current.focus()
    }
  }, [replyingToReply])

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        user: {
          username: 'johndoe',
          displayName: 'John Doe',
          avatar: 'https://via.placeholder.com/40'
        },
        text: newComment.trim(),
        timestamp: 'Just now',
        likes: 0,
        isLiked: false
      }
      
      setComments(prev => [newCommentObj, ...prev])
      setNewComment('')
      
      // Notify parent component that a comment was added
      onCommentAdded?.()
    } catch (error) {
      console.error('Failed to post comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async () => {
    if (!replyText.trim() || !replyingTo) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newReply: Comment = {
        id: `${replyingTo.id}-${Date.now()}`,
        user: {
          username: 'johndoe',
          displayName: 'John Doe',
          avatar: 'https://via.placeholder.com/40'
        },
        text: replyText.trim(),
        timestamp: 'Just now',
        likes: 0,
        isLiked: false
      }
      
      setComments(prev => 
        prev.map(comment => 
          comment.id === replyingTo.id 
            ? { 
                ...comment, 
                replies: [...(comment.replies || []), newReply]
              }
            : comment
        )
      )
      
      setReplyText('')
      setReplyingTo(null)
      
      // Notify parent component that a comment was added
      onCommentAdded?.()
    } catch (error) {
      console.error('Failed to post reply:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReplyToReply = async () => {
    if (!replyText.trim() || !replyingToReply) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newReplyToReply: Comment = {
        id: `${replyingToReply.reply.id}-${Date.now()}`,
        user: {
          username: 'johndoe',
          displayName: 'John Doe',
          avatar: 'https://via.placeholder.com/40'
        },
        text: replyText.trim(),
        timestamp: 'Just now',
        likes: 0,
        isLiked: false
      }
      
      setComments(prev => 
        prev.map(comment => 
          comment.id === replyingToReply.commentId 
            ? {
                ...comment,
                replies: comment.replies?.map(reply =>
                  reply.id === replyingToReply.reply.id
                    ? {
                        ...reply,
                        replies: [...(reply.replies || []), newReplyToReply]
                      }
                    : reply
                )
              }
            : comment
        )
      )
      
      setReplyText('')
      setReplyingToReply(null)
      
      // Notify parent component that a comment was added
      onCommentAdded?.()
    } catch (error) {
      console.error('Failed to post reply to reply:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikeComment = (commentId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked 
            }
          : comment
      )
    )
  }

  const handleLikeReply = (commentId: string, replyId: string) => {
    setComments(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? {
              ...comment,
              replies: comment.replies?.map(reply =>
                reply.id === replyId
                  ? {
                      ...reply,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                      isLiked: !reply.isLiked
                    }
                  : reply
              )
            }
          : comment
      )
    )
  }

  const handleReply = (comment: Comment) => {
    setReplyingTo(comment)
    setReplyingToReply(null)
    setReplyText('')
  }

  const handleReplyToReply = (commentId: string, reply: Comment) => {
    setReplyingToReply({ commentId, reply })
    setReplyingTo(null)
    setReplyText('')
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
    setReplyingToReply(null)
    setReplyText('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (replyingTo) {
        handleSubmitReply()
      } else if (replyingToReply) {
        handleSubmitReplyToReply()
      } else {
        handleSubmitComment()
      }
    }
  }

  const handleReplyKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (replyingToReply) {
        handleSubmitReplyToReply()
      } else {
        handleSubmitReply()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50">
      <div className="bg-white rounded-t-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Comments</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-border-light rounded-full transition-colors"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Post Preview */}
        <div className="p-4 border-b border-border">
          <div className="flex items-start space-x-3">
            <Avatar size="sm" src={postUser.avatar} alt={postUser.displayName} />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <button
                  onClick={() => handleUserClick(postUser.username)}
                  className="hover:opacity-80 transition-opacity"
                >
                  <span className="font-semibold text-text-primary">{postUser.displayName}</span>
                </button>
                <span className="text-sm text-text-secondary">@{postUser.username}</span>
              </div>
              <p className="text-text-primary mb-2">{postContent}</p>
              {postImage && (
                <div className="w-full h-32 bg-border-light rounded-lg flex items-center justify-center mb-2">
                  <span className="text-text-light">📷</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 comment-scroll">
          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-secondary">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="space-y-3">
                {/* Main Comment */}
                <div className="flex items-start space-x-3">
                  <Avatar size="sm" src={comment.user.avatar} alt={comment.user.displayName} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <button
                        onClick={() => handleUserClick(comment.user.username)}
                        className="hover:opacity-80 transition-opacity"
                      >
                        <span className="font-semibold text-text-primary">{comment.user.displayName}</span>
                      </button>
                      <span className="text-sm text-text-secondary">@{comment.user.username}</span>
                      <span className="text-xs text-text-light">{comment.timestamp}</span>
                    </div>
                    <p className="text-text-primary mb-2">{comment.text}</p>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className={`flex items-center space-x-1 text-sm transition-colors ${
                          comment.isLiked ? 'text-like' : 'text-text-secondary hover:text-like'
                        }`}
                      >
                        <Heart size={14} className={comment.isLiked ? 'fill-current' : ''} />
                        <span>{comment.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleReply(comment)}
                        className="text-sm text-text-secondary hover:text-text-primary"
                      >
                        Reply
                      </button>
                      <button className="text-sm text-text-secondary hover:text-text-primary">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reply Section */}
                {replyingTo?.id === comment.id && (
                  <div className="ml-8 bg-border-light rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <ArrowLeft size={14} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary">
                        Replying to <span className="font-medium">{replyingTo.user.displayName}</span>
                      </span>
                      <button
                        onClick={handleCancelReply}
                        className="text-xs text-text-light hover:text-text-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="flex items-end space-x-3">
                      <Avatar size="sm" />
                      <div className="flex-1 relative">
                        <textarea
                          ref={replyTextareaRef}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyPress={handleReplyKeyPress}
                          placeholder={`Reply to ${replyingTo.user.displayName}...`}
                          className="w-full p-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          rows={1}
                          style={{ minHeight: '36px', maxHeight: '100px' }}
                        />
                      </div>
                      <button
                        onClick={handleSubmitReply}
                        disabled={!replyText.trim() || isSubmitting}
                        className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-8 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <Avatar size="sm" src={reply.user.avatar} alt={reply.user.displayName} />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-text-primary">{reply.user.displayName}</span>
                              <span className="text-sm text-text-secondary">@{reply.user.username}</span>
                              <span className="text-xs text-text-light">{reply.timestamp}</span>
                            </div>
                            <p className="text-text-primary mb-2">{reply.text}</p>
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => handleLikeReply(comment.id, reply.id)}
                                className={`flex items-center space-x-1 text-sm transition-colors ${
                                  reply.isLiked ? 'text-like' : 'text-text-secondary hover:text-like'
                                }`}
                              >
                                <Heart size={14} className={reply.isLiked ? 'fill-current' : ''} />
                                <span>{reply.likes}</span>
                              </button>
                              <button 
                                onClick={() => handleReplyToReply(comment.id, reply)}
                                className="text-sm text-text-secondary hover:text-text-primary"
                              >
                                Reply
                              </button>
                              <button className="text-sm text-text-secondary hover:text-text-primary">
                                <MoreHorizontal size={14} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Reply to Reply Section */}
                        {replyingToReply?.commentId === comment.id && replyingToReply?.reply.id === reply.id && (
                          <div className="ml-8 bg-border-light rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-2">
                              <ArrowLeft size={14} className="text-text-secondary" />
                              <span className="text-sm text-text-secondary">
                                Replying to <span className="font-medium">{replyingToReply.reply.user.displayName}</span>
                              </span>
                              <button
                                onClick={handleCancelReply}
                                className="text-xs text-text-light hover:text-text-secondary"
                              >
                                Cancel
                              </button>
                            </div>
                            <div className="flex items-end space-x-3">
                              <Avatar size="sm" />
                              <div className="flex-1 relative">
                                <textarea
                                  ref={replyToReplyTextareaRef}
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  onKeyPress={handleReplyKeyPress}
                                  placeholder={`Reply to ${replyingToReply.reply.user.displayName}...`}
                                  className="w-full p-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                                  rows={1}
                                  style={{ minHeight: '36px', maxHeight: '100px' }}
                                />
                              </div>
                              <button
                                onClick={handleSubmitReplyToReply}
                                disabled={!replyText.trim() || isSubmitting}
                                className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Send size={14} />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Nested Replies */}
                        {reply.replies && reply.replies.length > 0 && (
                          <div className="ml-8 space-y-3">
                            {reply.replies.map((nestedReply) => (
                              <div key={nestedReply.id} className="flex items-start space-x-3">
                                <Avatar size="sm" src={nestedReply.user.avatar} alt={nestedReply.user.displayName} />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-semibold text-text-primary">{nestedReply.user.displayName}</span>
                                    <span className="text-sm text-text-secondary">@{nestedReply.user.username}</span>
                                    <span className="text-xs text-text-light">{nestedReply.timestamp}</span>
                                  </div>
                                  <p className="text-text-primary mb-2">{nestedReply.text}</p>
                                  <div className="flex items-center space-x-4">
                                    <button className="text-sm text-text-secondary hover:text-like">
                                      <Heart size={14} />
                                      <span>{nestedReply.likes}</span>
                                    </button>
                                    <button className="text-sm text-text-secondary hover:text-text-primary">
                                      Reply
                                    </button>
                                    <button className="text-sm text-text-secondary hover:text-text-primary">
                                      <MoreHorizontal size={14} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-end space-x-3">
            <Avatar size="sm" />
            <div className="flex-1 relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a comment..."
                className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
              className="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 