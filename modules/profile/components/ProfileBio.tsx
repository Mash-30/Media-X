import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile } from '../pages/ProfilePage';

interface ProfileBioProps {
  userProfile: UserProfile;
}

export const ProfileBio: React.FC<ProfileBioProps> = ({ userProfile }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.fullName}>{userProfile.fullName}</Text>
        {userProfile.isOwnProfile && (
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={16} color="#262626" />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.username}>@{userProfile.username}</Text>
      
      {userProfile.bio && (
        <Text style={styles.bio}>{userProfile.bio}</Text>
      )}
      
      {userProfile.website && (
        <TouchableOpacity style={styles.websiteContainer}>
          <Ionicons name="link-outline" size={14} color="#00376b" />
          <Text style={styles.website}>{userProfile.website}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  fullName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
    marginRight: 8,
  },
  editButton: {
    padding: 4,
  },
  username: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#262626',
    lineHeight: 20,
    marginBottom: 8,
  },
  websiteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  website: {
    fontSize: 14,
    color: '#00376b',
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
}); 