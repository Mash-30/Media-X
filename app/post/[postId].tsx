import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors } from '../../shared/utils/constants/colors';

// Mock post data
const mockPost = {
  id: '1',
  user: {
    username: 'jana_strassmann',
    displayName: 'Jana Strassmann',
    avatar: 'https://via.placeholder.com/40',
    profession: 'Artist'
  },
  content: {
    text: 'Hello my friends today i did holl for the first time it was a crazy experience. The views were absolutely breathtaking and the adventure was unforgettable! 🏔️✨',
    image: 'https://via.placeholder.com/400x500',
    isMultiImage: true
  },
  engagement: {
    likes: 500,
    comments: 13,
    isLiked: true
  },
  hashtags: ['#travel', '#time', '#tranding', '#adventure', '#mountains'],
  timestamp: '2 hours ago'
};

// Mock comments
const mockComments = [
  {
    id: '1',
    user: {
      username: 'sarah_wilson',
      displayName: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/40'
    },
    text: 'Amazing photo! 🔥',
    timestamp: '1 hour ago',
    likes: 5
  },
  {
    id: '2',
    user: {
      username: 'mike_chen',
      displayName: 'Mike Chen',
      avatar: 'https://via.placeholder.com/40'
    },
    text: 'This looks incredible! Where is this?',
    timestamp: '30 minutes ago',
    likes: 3
  },
  {
    id: '3',
    user: {
      username: 'emma_davis',
      displayName: 'Emma Davis',
      avatar: 'https://via.placeholder.com/40'
    },
    text: 'Love the composition! 📸',
    timestamp: '15 minutes ago',
    likes: 2
  }
];

export default function PostDetailsScreen() {
  const { postId, notificationType, userId } = useLocalSearchParams<{ 
    postId: string; 
    notificationType?: string; 
    userId?: string;
  }>();
  const [post, setPost] = useState(mockPost);
  const [comments, setComments] = useState(mockComments);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading post data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [postId]);

  const handleBack = () => {
    router.back();
  };

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      engagement: {
        ...prev.engagement,
        isLiked: !prev.engagement.isLiked,
        likes: prev.engagement.isLiked ? prev.engagement.likes - 1 : prev.engagement.likes + 1
      }
    }));
  };

  const handleUserPress = (username: string) => {
    router.push({
      pathname: '/profile/[userId]',
      params: { userId: username }
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading post...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <TouchableOpacity 
            style={styles.postUserInfo}
            onPress={() => handleUserPress(post.user.username)}
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
            {post.hashtags.map((hashtag, index) => (
              <Text key={index} style={styles.hashtag}>{hashtag}</Text>
            ))}
          </View>
        </View>

        {/* Post Actions */}
        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
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

        {/* Engagement Summary */}
        <View style={styles.engagementSummary}>
          <Text style={styles.likesText}>{post.engagement.likes} likes</Text>
          <Text style={styles.commentsText}>{post.engagement.comments} comments</Text>
        </View>

        {/* Comments */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comments</Text>
          {comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <TouchableOpacity 
                style={styles.commentUserInfo}
                onPress={() => handleUserPress(comment.user.username)}
              >
                <View style={styles.commentAvatar}>
                  <Ionicons name="person" size={16} color={Colors.textLight} />
                </View>
                <View style={styles.commentContent}>
                  <Text style={styles.commentText}>
                    <Text style={styles.commentUsername}>{comment.user.displayName}</Text>
                    {' '}{comment.text}
                  </Text>
                  <Text style={styles.commentTime}>{comment.timestamp}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  moreButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
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
    marginBottom: 12,
  },
  postHashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  hashtag: {
    fontSize: 14,
    color: Colors.primary,
    marginRight: 8,
    marginBottom: 4,
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
  engagementSummary: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  likesText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  commentsText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  commentItem: {
    marginBottom: 16,
  },
  commentUserInfo: {
    flexDirection: 'row',
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  commentUsername: {
    fontWeight: '600',
  },
  commentTime: {
    fontSize: 12,
    color: Colors.textLight,
  },
}); 