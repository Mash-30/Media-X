import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserProfile } from '../pages/ProfilePage';
import { Colors } from '../../../shared/utils/constants/colors';

interface ProfileActionsProps {
  userProfile: UserProfile;
  onEditProfile: () => void;
  onFollow: () => void;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  userProfile,
  onEditProfile,
  onFollow,
}) => {
  return (
    <View style={styles.container}>
      {userProfile.isOwnProfile ? (
        <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.followButton,
            userProfile.isFollowing && styles.followingButton,
          ]}
          onPress={onFollow}
        >
          <Text
            style={[
              styles.followButtonText,
              userProfile.isFollowing && styles.followingButtonText,
            ]}
          >
            {userProfile.isFollowing ? 'Following' : 'Follow'}
          </Text>
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
  editButton: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  followButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  followingButton: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  followingButtonText: {
    color: Colors.text,
  },
}); 