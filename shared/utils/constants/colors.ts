export const Colors = {
  // Primary Brand Colors (from Media X images)
  primary: '#00B894', // Main teal/green color
  primaryDark: '#00A085', // Darker shade for pressed states
  primaryLight: '#00D4A3', // Lighter shade for highlights
  
  // Background Colors
  background: '#FFFFFF',
  cardBackground: '#FFFFFF',
  headerBackground: '#00B894',
  
  // Text Colors
  text: '#1A1A1A',
  textSecondary: '#666666',
  textLight: '#999999',
  textWhite: '#FFFFFF',
  
  // Status Colors
  success: '#00B894',
  error: '#FF6B6B',
  warning: '#FFA726',
  info: '#4FC3F7',
  
  // Interactive Elements
  border: '#E5E5E5',
  borderLight: '#F0F0F0',
  shadow: '#000000',
  
  // Social Media Specific
  like: '#FF6B6B',
  comment: '#4FC3F7',
  share: '#00B894',
  
  // Story/Highlight Colors
  storyBorder: '#00B894',
  storyBackground: '#FFFFFF',
  
  // Progress/Progress Indicators
  progress: '#00B894',
  progressBackground: '#E5E5E5',
  
  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Transparent Colors
  transparent: 'transparent',
} as const;

export type ColorScheme = typeof Colors; 