import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../pages/ProfilePage';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 4) / 3; // 3 columns with 2px gap

type TabType = 'posts' | 'saved' | 'tagged';

interface PostsGridProps {
  posts: Post[];
  onPostPress: (postId: string) => void;
  activeTab: TabType;
}

export const PostsGrid: React.FC<PostsGridProps> = ({
  posts,
  onPostPress,
  activeTab,
}) => {
  const renderPostItem = (post: Post, index: number) => (
    <TouchableOpacity
      key={post.id}
      style={[
        styles.postItem,
        {
          marginLeft: index % 3 === 0 ? 0 : 1,
          marginTop: index < 3 ? 0 : 1,
        },
      ]}
      onPress={() => onPostPress(post.id)}
    >
      <Image
        source={{ uri: post.thumbnailUrl }}
        style={styles.postImage}
        resizeMode="cover"
      />
      
      {/* Video indicator */}
      {post.type === 'video' && (
        <View style={styles.videoIndicator}>
          <Ionicons name="play" size={16} color="#fff" />
        </View>
      )}
      
      {/* Multiple posts indicator (if needed) */}
      {post.type === 'video' && (
        <View style={styles.multipleIndicator}>
          <Ionicons name="play" size={12} color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons
          name={
            activeTab === 'posts'
              ? 'grid-outline'
              : activeTab === 'saved'
              ? 'bookmark-outline'
              : 'person-outline'
          }
          size={64}
          color="#dbdbdb"
        />
      </View>
      <Text style={styles.emptyTitle}>
        {activeTab === 'posts'
          ? 'No Posts Yet'
          : activeTab === 'saved'
          ? 'No Saved Posts'
          : 'No Tagged Posts'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {activeTab === 'posts'
          ? 'When you share photos and videos, they\'ll appear on your profile.'
          : activeTab === 'saved'
          ? 'Save photos and videos that you want to see again.'
          : 'Photos and videos of you that others have shared will appear here.'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {posts.length > 0 ? (
        <View style={styles.grid}>
          {posts.map((post, index) => renderPostItem(post, index))}
        </View>
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  multipleIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  emptyIconContainer: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 