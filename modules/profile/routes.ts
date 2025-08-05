export const PROFILE_ROUTES = {
  // Main profile routes
  PROFILE: '/profile',
  PROFILE_USER: '/profile/:userId',
  
  // Profile sub-routes
  EDIT_PROFILE: '/profile/edit',
  PROFILE_SETTINGS: '/profile/settings',
  
  // User-specific routes
  USER_PROFILE: '/profile/:userId',
  USER_POSTS: '/profile/:userId/posts',
  USER_SAVED: '/profile/:userId/saved',
  USER_TAGGED: '/profile/:userId/tagged',
  
  // Profile actions
  FOLLOW_USER: '/profile/:userId/follow',
  UNFOLLOW_USER: '/profile/:userId/unfollow',
  
  // Profile navigation
  PROFILE_TAB_POSTS: 'posts',
  PROFILE_TAB_SAVED: 'saved',
  PROFILE_TAB_TAGGED: 'tagged',
} as const;

export type ProfileRoute = typeof PROFILE_ROUTES[keyof typeof PROFILE_ROUTES];

// Helper function to generate user-specific profile URLs
export const getProfileUrl = (userId: string): string => {
  return `/profile/${userId}`;
};

export const getUserPostsUrl = (userId: string): string => {
  return `/profile/${userId}/posts`;
};

export const getUserSavedUrl = (userId: string): string => {
  return `/profile/${userId}/saved`;
};

export const getUserTaggedUrl = (userId: string): string => {
  return `/profile/${userId}/tagged`;
}; 