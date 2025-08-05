import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Colors } from '../shared/utils/constants/colors';
import '../amplifyconfiguration';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return null; // Show splash screen
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      {/* Splash Screen */}
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      
      {/* Onboarding */}
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      
      {/* Authentication */}
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
      <Stack.Screen name="auth/forgot-password" options={{ headerShown: false }} />
      
      {/* Main App */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Post Creation */}
      <Stack.Screen name="create-post" options={{ headerShown: false }} />
      
      {/* Chat Inbox */}
      <Stack.Screen name="chat-inbox" options={{ headerShown: false }} />
      
      {/* User Profile */}
      <Stack.Screen name="profile/[userId]" options={{ headerShown: false }} />
      
      {/* Post Details */}
      <Stack.Screen name="post/[postId]" options={{ headerShown: false }} />
    </Stack>
  );
}
