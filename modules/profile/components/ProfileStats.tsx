import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Stats {
  posts: number;
  followers: number;
  following: number;
}

interface ProfileStatsProps {
  stats: Stats;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
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
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{formatNumber(stats.posts)}</Text>
        <Text style={styles.statLabel}>posts</Text>
      </View>
      
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{formatNumber(stats.followers)}</Text>
        <Text style={styles.statLabel}>followers</Text>
      </View>
      
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{formatNumber(stats.following)}</Text>
        <Text style={styles.statLabel}>following</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 10,
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