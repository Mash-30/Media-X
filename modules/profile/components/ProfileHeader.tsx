import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { UserProfile } from '../pages/ProfilePage';

const { width } = Dimensions.get('window');

interface ProfileHeaderProps {
  userProfile: UserProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userProfile }) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: userProfile.avatar }}
          style={styles.profilePicture}
          resizeMode="cover"
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatNumber(userProfile.stats.posts)}</Text>
          <Text style={styles.statLabel}>posts</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatNumber(userProfile.stats.followers)}</Text>
          <Text style={styles.statLabel}>followers</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatNumber(userProfile.stats.following)}</Text>
          <Text style={styles.statLabel}>following</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  profilePictureContainer: {
    marginRight: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#e1e1e1',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#8e8e93',
    fontWeight: '400',
  },
}); 