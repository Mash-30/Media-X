import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProfileHeader } from '../components/ProfileHeader';
import { ProfileBio } from '../components/ProfileBio';
import { ProfileActions } from '../components/ProfileActions';
import { PostsGrid } from '../components/PostsGrid';
import { ProfileTabBar } from '../components/ProfileTabBar';

const { width } = Dimensions.get('window');

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  website?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  isFollowing: boolean;
  isOwnProfile: boolean;
}

export interface Post {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  type: 'image' | 'video';
  likes: number;
  comments: number;
}

const mockUserProfile: UserProfile = {
  id: '1',
  username: 'johndoe',
  fullName: 'John Doe',
  avatar: 'https://via.placeholder.com/150',
  bio: 'Digital creator | Photography enthusiast | Travel lover ✈️',
  website: 'https://johndoe.com',
  stats: {
    posts: 42,
    followers: 1234,
    following: 567,
  },
  isFollowing: false,
  isOwnProfile: true,
};

const mockPosts: Post[] = [
  {
    id: '1',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image',
    likes: 123,
    comments: 12,
  },
  {
    id: '2',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'video',
    likes: 89,
    comments: 5,
  },
  {
    id: '3',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image',
    likes: 256,
    comments: 23,
  },
  {
    id: '4',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image',
    likes: 67,
    comments: 8,
  },
  {
    id: '5',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'video',
    likes: 189,
    comments: 15,
  },
  {
    id: '6',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image',
    likes: 92,
    comments: 7,
  },
];

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleEditProfile = () => {
    // Navigate to edit profile page
    console.log('Edit profile');
  };

  const handleFollow = () => {
    setUserProfile(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      stats: {
        ...prev.stats,
        followers: prev.isFollowing ? prev.stats.followers - 1 : prev.stats.followers + 1,
      },
    }));
  };

  const handlePostPress = (postId: string) => {
    // Navigate to post detail
    console.log('Post pressed:', postId);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <ProfileHeader userProfile={userProfile} />

      {/* Profile Bio */}
      <ProfileBio userProfile={userProfile} />

      {/* Profile Actions */}
      <ProfileActions
        userProfile={userProfile}
        onEditProfile={handleEditProfile}
        onFollow={handleFollow}
      />

      {/* Tab Bar */}
      <ProfileTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Posts Grid */}
      <PostsGrid
        posts={posts}
        onPostPress={handlePostPress}
        activeTab={activeTab}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 