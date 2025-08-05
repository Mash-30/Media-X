import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StatusBar,
  SafeAreaView,
  Modal
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../shared/utils/constants/colors';

// Mock data for stories
const stories = [
  { id: 'you', username: 'You', hasStory: false, isAdd: true },
  { id: '1', username: 'uzoma_10', hasStory: true },
  { id: '2', username: '_.buchi._', hasStory: true },
  { id: '3', username: '__chihoko', hasStory: true },
  { id: '4', username: '_.gand', hasStory: true },
];

// Mock data for posts
const posts = [
  {
    id: '1',
    user: {
      username: 'jana_strassmann',
      displayName: 'Jana Strassmann',
      avatar: 'https://via.placeholder.com/40',
      profession: 'Artist'
    },
    content: {
      text: 'Hello my friends today i did holl for the first time it was a crazy experience.',
      image: 'https://via.placeholder.com/400x500',
      isMultiImage: true
    },
    engagement: {
      likes: 500,
      comments: 13,
      isLiked: true
    },
    hashtags: ['#travel', '#time', '#tranding']
  }
];

// Mock data for notifications
const notifications = [
  {
    id: '1',
    type: 'like',
    user: {
      username: 'sarah_wilson',
      displayName: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/40'
    },
    content: 'liked your post',
    time: '2 minutes ago',
    isRead: false
  },
  {
    id: '2',
    type: 'comment',
    user: {
      username: 'mike_chen',
      displayName: 'Mike Chen',
      avatar: 'https://via.placeholder.com/40'
    },
    content: 'commented: "Amazing photo! 🔥"',
    time: '5 minutes ago',
    isRead: false
  },
  {
    id: '3',
    type: 'follow',
    user: {
      username: 'emma_davis',
      displayName: 'Emma Davis',
      avatar: 'https://via.placeholder.com/40'
    },
    content: 'started following you',
    time: '1 hour ago',
    isRead: true
  },
  {
    id: '4',
    type: 'mention',
    user: {
      username: 'alex_johnson',
      displayName: 'Alex Johnson',
      avatar: 'https://via.placeholder.com/40'
    },
    content: 'mentioned you in a comment',
    time: '2 hours ago',
    isRead: true
  },
  {
    id: '5',
    type: 'like',
    user: {
      username: 'lisa_brown',
      displayName: 'Lisa Brown',
      avatar: 'https://via.placeholder.com/40'
    },
    content: 'liked your story',
    time: '3 hours ago',
    isRead: true
  }
];

export default function FeedScreen() {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationPress = () => {
    setShowNotifications(true);
  };

  const handleNotificationItemPress = (notification: any) => {
    // Navigate based on notification type
    switch (notification.type) {
      case 'follow':
        // Navigate to user profile
        router.push({
          pathname: '/profile/[userId]',
          params: { userId: notification.user.username }
        });
        break;
      case 'like':
      case 'comment':
      case 'mention':
        // Navigate to post details (we'll create this route)
        router.push({
          pathname: '/post/[postId]',
          params: { 
            postId: '1', // Mock post ID - in real app this would come from notification
            notificationType: notification.type,
            userId: notification.user.username
          }
        });
        break;
      default:
        // Default to user profile
        router.push({
          pathname: '/profile/[userId]',
          params: { userId: notification.user.username }
        });
    }
    setShowNotifications(false);
  };

  const renderStory = (story: any) => (
    <TouchableOpacity key={story.id} style={styles.storyContainer}>
      <View style={[
        styles.storyAvatar,
        story.hasStory && styles.storyAvatarActive,
        story.isAdd && styles.storyAvatarAdd
      ]}>
        {story.isAdd ? (
          <Ionicons name="add" size={20} color={Colors.primary} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={20} color={Colors.textLight} />
          </View>
        )}
      </View>
      <Text style={styles.storyUsername}>{story.username}</Text>
    </TouchableOpacity>
  );

  const renderPost = (post: any) => (
    <View key={post.id} style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <TouchableOpacity 
          style={styles.postUserInfo}
          onPress={() => {
            router.push({
              pathname: '/profile/[userId]',
              params: { userId: post.user.username }
            });
          }}
        >
          <View style={styles.postAvatar}>
            <Ionicons name="person" size={20} color={Colors.textLight} />
          </View>
          <View>
            <Text style={styles.postUsername}>{post.user.username}</Text>
            <Text style={styles.postProfession}>{post.user.profession}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <View style={styles.postContent}>
        <View style={styles.postImageContainer}>
          <View style={styles.postImagePlaceholder}>
            <Ionicons name="image" size={40} color={Colors.textLight} />
          </View>
          {post.content.isMultiImage && (
            <View style={styles.multiImageIndicator}>
              <Ionicons name="copy" size={16} color={Colors.textWhite} />
            </View>
          )}
        </View>
        
        <Text style={styles.postText}>{post.content.text}</Text>
        
        <View style={styles.postHashtags}>
          {post.engagement.isLiked && (
            <Text style={styles.likedText}>Liked by you and {post.engagement.likes} others</Text>
          )}
        </View>
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons 
            name={post.engagement.isLiked ? "heart" : "heart-outline"} 
            size={24} 
            color={post.engagement.isLiked ? Colors.like : Colors.text} 
          />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color={Colors.text} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="arrow-up-circle-outline" size={24} color={Colors.text} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Media X</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/create-post')}>
            <Ionicons name="add" size={24} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleNotificationPress}>
            <Ionicons name="notifications-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.storiesContainer}
        contentContainerStyle={styles.storiesContent}
      >
        {stories.map(renderStory)}
      </ScrollView>

      {/* Posts */}
      <ScrollView style={styles.postsContainer} showsVerticalScrollIndicator={false}>
        {posts.map(renderPost)}
      </ScrollView>

      {/* Notifications Modal */}
      <Modal
        visible={showNotifications}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNotifications(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowNotifications(false)}
        >
          <View style={styles.notificationsModal}>
            <View style={styles.notificationsHeader}>
              <Text style={styles.notificationsTitle}>Notifications</Text>
              <TouchableOpacity onPress={() => setShowNotifications(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationItem,
                    !notification.isRead && styles.unreadNotification
                  ]}
                  onPress={() => handleNotificationItemPress(notification)}
                >
                  <View style={styles.notificationAvatar}>
                    <Ionicons name="person" size={20} color={Colors.textLight} />
                  </View>
                  
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationText}>
                      <Text style={styles.notificationUsername}>{notification.user.displayName}</Text>
                      {' '}{notification.content}
                    </Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                  
                  {!notification.isRead && (
                    <View style={styles.unreadDot} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
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
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  storiesContainer: {
    maxHeight: 100,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  storiesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  storyAvatarActive: {
    borderColor: Colors.storyBorder,
  },
  storyAvatarAdd: {
    borderColor: Colors.primary,
    backgroundColor: Colors.background,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyUsername: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
  },
  postsContainer: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: Colors.background,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  postUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  postProfession: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  postContent: {
    paddingHorizontal: 16,
  },
  postImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  postImagePlaceholder: {
    width: '100%',
    height: 400,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  multiImageIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.overlay,
    borderRadius: 4,
    padding: 4,
  },
  postText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 8,
  },
  postHashtags: {
    marginBottom: 12,
  },
  likedText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  postActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  notificationsModal: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  notificationsList: {
    maxHeight: 400,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  unreadNotification: {
    backgroundColor: Colors.background,
  },
  notificationAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationUsername: {
    fontWeight: '600',
  },
  notificationTime: {
    fontSize: 12,
    color: Colors.textLight,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: 8,
  },
});
