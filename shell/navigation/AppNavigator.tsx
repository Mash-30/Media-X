import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '../providers/AuthProvider';
import { ROUTES } from '../../shared/utils/constants/routes';

// Import remote modules (these would be loaded dynamically in a real implementation)
// import { LoginForm } from 'auth/LoginForm';
// import { FeedPage } from 'feed/FeedPage';
// import { ExplorePage } from 'explore/ExplorePage';
import { ProfilePage } from '../../modules/profile/pages/ProfilePage';
// import { MessagesPage } from 'messaging/MessagesPage';
// import { NotificationsPage } from 'notifications/NotificationsPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder components for demonstration
const LoginForm = () => <div>Login Form (Remote Module)</div>;
const FeedPage = () => <div>Feed Page (Remote Module)</div>;
const ExplorePage = () => <div>Explore Page (Remote Module)</div>;
const MessagesPage = () => <div>Messages Page (Remote Module)</div>;
const NotificationsPage = () => <div>Notifications Page (Remote Module)</div>;

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginForm} />
    {/* Add other auth screens here */}
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case 'Feed':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Explore':
            iconName = focused ? 'search' : 'search-outline';
            break;
          case 'Messages':
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
            break;
          case 'Notifications':
            iconName = focused ? 'notifications' : 'notifications-outline';
            break;
          case 'Profile':
            iconName = focused ? 'person' : 'person-outline';
            break;
          default:
            iconName = 'home-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#666',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Feed" component={FeedPage} />
    <Tab.Screen name="Explore" component={ExplorePage} />
    <Tab.Screen name="Messages" component={MessagesPage} />
    <Tab.Screen name="Notifications" component={NotificationsPage} />
    <Tab.Screen name="Profile" component={ProfilePage} />
  </Tab.Navigator>
);

const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    // Show loading screen
    return <div>Loading...</div>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 