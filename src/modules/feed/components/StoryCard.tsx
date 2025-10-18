import React from 'react'
import { Plus, User } from 'lucide-react'

interface Story {
  id: string
  username: string
  hasStory: boolean
  isAdd?: boolean
}

interface StoryCardProps {
  story: Story
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <div className="flex flex-col items-center space-y-2 min-w-0">
      <div className={`
        w-16 h-16 rounded-full flex items-center justify-center border-2 transition-colors
        ${story.hasStory ? 'border-primary-500' : 'border-border'}
        ${story.isAdd ? 'bg-primary-500 text-white' : 'bg-border-light'}
      `}>
        {story.isAdd ? (
          <Plus size={20} />
        ) : (
          <User size={20} className="text-text-light" />
        )}
      </div>
      <span className="text-xs text-text-primary truncate max-w-16 text-center">
        {story.username}
      </span>
    </div>
  )
} 