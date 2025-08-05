import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '../../shared/utils/constants/colors';
import { ProfileHeader } from '../../modules/profile/components/ProfileHeader';
import { ProfileBio } from '../../modules/profile/components/ProfileBio';
import { ProfileActions } from '../../modules/profile/components/ProfileActions';
import { PostsGrid } from '../../modules/profile/components/PostsGrid';
import { ProfileTabBar } from '../../modules/profile/components/ProfileTabBar';
import { authService } from '../../shared/services/auth';

// Mock data for current user profile
const mockUserProfile = {
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

const mockPosts = [
  {
    id: '1',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image' as const,
    likes: 123,
    comments: 12,
  },
  {
    id: '2',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'video' as const,
    likes: 89,
    comments: 5,
  },
  {
    id: '3',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image' as const,
    likes: 256,
    comments: 23,
  },
  {
    id: '4',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image' as const,
    likes: 67,
    comments: 8,
  },
  {
    id: '5',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'video' as const,
    likes: 189,
    comments: 15,
  },
  {
    id: '6',
    imageUrl: 'https://via.placeholder.com/300x300',
    thumbnailUrl: 'https://via.placeholder.com/150x150',
    type: 'image' as const,
    likes: 92,
    comments: 7,
  },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'tagged'>('posts');
  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [posts, setPosts] = useState(mockPosts);
  const [showSettings, setShowSettings] = useState(false);

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

  const handleSettingsPress = () => {
    setShowSettings(true);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await authService.signOut();
              setShowSettings(false);
            } catch (error: any) {
              Alert.alert('Logout Failed', error.message);
            }
          },
        },
      ]
    );
  };

  const handleLoginFromAnotherAccount = () => {
    Alert.alert(
      'Switch Account',
      'Are you sure you want to login from another account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Switch',
          style: 'default',
          onPress: () => {
            setShowSettings(false);
            // Navigate to splash first, then it will redirect to login
            router.replace('/splash');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
          <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

      {/* Settings Modal */}
      <Modal
        visible={showSettings}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSettings(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSettings(false)}
        >
          <View style={styles.settingsModal}>
            <View style={styles.settingsHeader}>
              <Text style={styles.settingsTitle}>Settings</Text>
              <TouchableOpacity onPress={() => setShowSettings(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.settingsOption} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color={Colors.error} />
              <Text style={[styles.settingsOptionText, { color: Colors.error }]}>Logout</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingsOption} onPress={handleLoginFromAnotherAccount}>
              <Ionicons name="swap-horizontal-outline" size={20} color={Colors.text} />
              <Text style={styles.settingsOptionText}>Login from another account</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsModal: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    minWidth: 280,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  settingsOptionText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
}); 