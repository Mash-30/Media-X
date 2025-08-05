export const Routes = {
  // Authentication Routes
  SPLASH: 'Splash',
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main App Routes
  MAIN: 'Main',
  FEED: 'Feed',
  SEARCH: 'Search',
  PROFILE: 'Profile',
  MESSAGES: 'Messages',
  
  // Post Related Routes
  CREATE_POST: 'CreatePost',
  POST_DETAILS: 'PostDetails',
  COMMENTS: 'Comments',
  
  // User Related Routes
  USER_PROFILE: 'UserProfile',
  USER_PROFILE_DYNAMIC: 'profile/[userId]',
  FRIEND_REQUESTS: 'FriendRequests',
  ACTIVITY: 'Activity',
  
  // Story/Content Routes
  STORY_VIEW: 'StoryView',
  
  // Settings Routes
  SETTINGS: 'Settings',
  EDIT_PROFILE: 'EditProfile',
} as const;

export type RouteName = keyof typeof Routes; 