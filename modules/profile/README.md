# Profile Module

This module implements an Instagram-like profile page with all the essential features.

## Features

### ✅ **Profile Header**
- **Round Profile Picture**: Circular avatar with border
- **Stats Display**: Posts, Followers, Following counts with proper formatting (K, M)
- **Responsive Layout**: Adapts to different screen sizes

### ✅ **Profile Information**
- **User Bio**: Displays user's bio with proper formatting
- **Website Link**: Clickable website link with icon
- **Edit Button**: For own profile editing

### ✅ **Action Buttons**
- **Edit Profile**: For own profile
- **Follow/Following**: For other users' profiles
- **Dynamic States**: Button changes based on follow status

### ✅ **Tab Navigation**
- **Posts Tab**: Shows user's posts in grid
- **Saved Tab**: Shows saved posts (placeholder)
- **Tagged Tab**: Shows tagged posts (placeholder)
- **Active Indicators**: Visual feedback for active tab

### ✅ **Posts Grid**
- **3-Column Layout**: Instagram-style grid
- **Video Indicators**: Play icon for video posts
- **Touch Interactions**: Tap to view post details
- **Empty States**: Helpful messages when no posts
- **Responsive Design**: Adapts to screen width

## Components

### `ProfilePage`
Main container component that orchestrates all profile features.

### `ProfileHeader`
Displays profile picture and stats (posts, followers, following).

### `ProfileBio`
Shows user information including name, username, bio, and website.

### `ProfileActions`
Handles action buttons (Edit Profile, Follow/Following).

### `ProfileTabBar`
Tab navigation between Posts, Saved, and Tagged content.

### `PostsGrid`
Displays posts in a responsive 3-column grid with video indicators.

## Usage

```tsx
import { ProfilePage } from './modules/profile/pages/ProfilePage';

// Use in your app
<ProfilePage />
```

## Data Structure

### UserProfile Interface
```tsx
interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  website?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  isFollowing: boolean;
  isOwnProfile: boolean;
}
```

### Post Interface
```tsx
interface Post {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  type: 'image' | 'video';
  likes: number;
  comments: number;
}
```

## Styling

The profile follows Instagram's design patterns:
- **Colors**: Instagram's color palette (#262626, #8e8e93, #dbdbdb, etc.)
- **Typography**: Proper font weights and sizes
- **Spacing**: Consistent padding and margins
- **Borders**: Subtle borders and separators
- **Icons**: Ionicons for consistency

## Responsive Design

- **Grid Layout**: Automatically adjusts to screen width
- **Profile Picture**: Maintains aspect ratio
- **Text Scaling**: Proper text sizing for different screens
- **Touch Targets**: Adequate touch areas for mobile

## Future Enhancements

- [ ] Stories integration
- [ ] Highlight reels
- [ ] Profile editing functionality
- [ ] Post detail navigation
- [ ] Real API integration
- [ ] Image caching
- [ ] Pull-to-refresh
- [ ] Infinite scroll for posts 