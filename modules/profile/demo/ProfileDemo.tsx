import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ProfilePage } from '../pages/ProfilePage';

export const ProfileDemo: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ProfilePage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 