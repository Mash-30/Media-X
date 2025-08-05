import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfilePage } from '../../modules/profile/pages/ProfilePage';

const ProfileStack = createStackNavigator();

export const ProfileRoutes = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={ProfilePage}
        options={{
          title: 'Profile',
        }}
      />
      {/* Add more profile-related screens here */}
      {/* <ProfileStack.Screen name="EditProfile" component={EditProfilePage} /> */}
      {/* <ProfileStack.Screen name="ProfileSettings" component={ProfileSettingsPage} /> */}
    </ProfileStack.Navigator>
  );
}; 