const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  // Shell configuration
  shell: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'shell',
        remotes: {
          auth: 'auth@http://localhost:3001/remoteEntry.js',
          feed: 'feed@http://localhost:3002/remoteEntry.js',
          profile: 'profile@http://localhost:3003/remoteEntry.js',
          explore: 'explore@http://localhost:3004/remoteEntry.js',
          messaging: 'messaging@http://localhost:3005/remoteEntry.js',
          notifications: 'notifications@http://localhost:3006/remoteEntry.js',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^19.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
          'react-native': { singleton: true, requiredVersion: '^0.79.5' },
          'expo-router': { singleton: true, requiredVersion: '^5.1.4' },
          '@expo/vector-icons': { singleton: true, requiredVersion: '^14.1.0' },
        },
      }),
    ],
  },

  // Auth module configuration
  auth: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'auth',
        filename: 'remoteEntry.js',
        exposes: {
          './LoginForm': './modules/auth/components/LoginForm',
          './RegisterForm': './modules/auth/components/RegisterForm',
          './Onboarding': './modules/auth/components/Onboarding',
          './useAuth': './shared/hooks/useAuth',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^19.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
          'react-native': { singleton: true, requiredVersion: '^0.79.5' },
          'expo-router': { singleton: true, requiredVersion: '^5.1.4' },
          '@expo/vector-icons': { singleton: true, requiredVersion: '^14.1.0' },
        },
      }),
    ],
  },

  // Feed module configuration
  feed: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'feed',
        filename: 'remoteEntry.js',
        exposes: {
          './PostCard': './modules/feed/components/PostCard',
          './PostList': './modules/feed/components/PostList',
          './CreatePost': './modules/feed/components/CreatePost',
          './FeedPage': './modules/feed/pages/FeedPage',
          './usePosts': './modules/feed/hooks/usePosts',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^19.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
          'react-native': { singleton: true, requiredVersion: '^0.79.5' },
          'expo-router': { singleton: true, requiredVersion: '^5.1.4' },
          '@expo/vector-icons': { singleton: true, requiredVersion: '^14.1.0' },
        },
      }),
    ],
  },

  // Profile module configuration
  profile: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'profile',
        filename: 'remoteEntry.js',
        exposes: {
          './ProfileHeader': './modules/profile/components/ProfileHeader',
          './ProfileStats': './modules/profile/components/ProfileStats',
          './ProfilePage': './modules/profile/pages/ProfilePage',
          './useProfile': './modules/profile/hooks/useProfile',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^19.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
          'react-native': { singleton: true, requiredVersion: '^0.79.5' },
          'expo-router': { singleton: true, requiredVersion: '^5.1.4' },
          '@expo/vector-icons': { singleton: true, requiredVersion: '^14.1.0' },
        },
      }),
    ],
  },

  // Explore module configuration
  explore: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'explore',
        filename: 'remoteEntry.js',
        exposes: {
          './SearchBar': './modules/explore/components/SearchBar',
          './TrendingTopics': './modules/explore/components/TrendingTopics',
          './ExplorePage': './modules/explore/pages/ExplorePage',
          './useSearch': './modules/explore/hooks/useSearch',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^19.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
          'react-native': { singleton: true, requiredVersion: '^0.79.5' },
          'expo-router': { singleton: true, requiredVersion: '^5.1.4' },
          '@expo/vector-icons': { singleton: true, requiredVersion: '^14.1.0' },
        },
      }),
    ],
  },

  // Messaging module configuration
  messaging: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'messaging',
        filename: 'remoteEntry.js',
        exposes: {
          './ChatList': './modules/messaging/components/ChatList',
          './ChatRoom': './modules/messaging/components/ChatRoom',
          './MessagesPage': './modules/messaging/pages/MessagesPage',
          './useMessages': './modules/messaging/hooks/useMessages',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^19.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
          'react-native': { singleton: true, requiredVersion: '^0.79.5' },
          'expo-router': { singleton: true, requiredVersion: '^5.1.4' },
          '@expo/vector-icons': { singleton: true, requiredVersion: '^14.1.0' },
        },
      }),
    ],
  },

  // Notifications module configuration
  notifications: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'notifications',
        filename: 'remoteEntry.js',
        exposes: {
          './NotificationList': './modules/notifications/components/NotificationList',
          './NotificationItem': './modules/notifications/components/NotificationItem',
          './NotificationsPage': './modules/notifications/pages/NotificationsPage',
          './useNotifications': './modules/notifications/hooks/useNotifications',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^19.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
          'react-native': { singleton: true, requiredVersion: '^0.79.5' },
          'expo-router': { singleton: true, requiredVersion: '^5.1.4' },
          '@expo/vector-icons': { singleton: true, requiredVersion: '^14.1.0' },
        },
      }),
    ],
  },
}; 