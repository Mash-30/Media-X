import { API } from 'aws-amplify';
import { User } from './auth';

export interface Post {
  id: string;
  userId: string;
  user: User;
  content: {
    text: string;
    image?: string;
    isMultiImage: boolean;
  };
  engagement: {
    likes: number;
    comments: number;
    isLiked: boolean;
  };
  hashtags: string[];
  timestamp: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  userId: string;
  user: User;
  content: string;
  time: string;
  isRead: boolean;
  postId?: string;
}

export interface Message {
  id: string;
  userId: string;
  user: User;
  lastMessage: {
    text: string;
    time: string;
    isRead: boolean;
    isFromMe: boolean;
  };
  unreadCount: number;
}

class ApiService {
  private apiName = 'mediaxAPI';

  // Posts
  async getPosts(): Promise<Post[]> {
    try {
      const response = await API.get(this.apiName, '/posts', {});
      return response.data || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  async createPost(content: string, image?: string, hashtags: string[] = []): Promise<Post> {
    try {
      const response = await API.post(this.apiName, '/posts', {
        body: {
          content,
          image,
          hashtags,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  async likePost(postId: string): Promise<void> {
    try {
      await API.post(this.apiName, `/posts/${postId}/like`, {});
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  }

  async unlikePost(postId: string): Promise<void> {
    try {
      await API.delete(this.apiName, `/posts/${postId}/like`, {});
    } catch (error) {
      console.error('Error unliking post:', error);
      throw error;
    }
  }

  // Comments
  async getComments(postId: string): Promise<Comment[]> {
    try {
      const response = await API.get(this.apiName, `/posts/${postId}/comments`, {});
      return response.data || [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  async createComment(postId: string, text: string): Promise<Comment> {
    try {
      const response = await API.post(this.apiName, `/posts/${postId}/comments`, {
        body: { text },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  // User Profiles
  async getUserProfile(userId: string): Promise<User> {
    try {
      const response = await API.get(this.apiName, `/users/${userId}`, {});
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  async updateUserProfile(updates: Partial<User>): Promise<User> {
    try {
      const response = await API.put(this.apiName, '/users/profile', {
        body: updates,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  async followUser(userId: string): Promise<void> {
    try {
      await API.post(this.apiName, `/users/${userId}/follow`, {});
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    }
  }

  async unfollowUser(userId: string): Promise<void> {
    try {
      await API.delete(this.apiName, `/users/${userId}/follow`, {});
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw error;
    }
  }

  // Notifications
  async getNotifications(): Promise<Notification[]> {
    try {
      const response = await API.get(this.apiName, '/notifications', {});
      return response.data || [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      await API.put(this.apiName, `/notifications/${notificationId}/read`, {});
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  // Messages
  async getMessages(): Promise<Message[]> {
    try {
      const response = await API.get(this.apiName, '/messages', {});
      return response.data || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  }

  async sendMessage(userId: string, text: string): Promise<void> {
    try {
      await API.post(this.apiName, '/messages', {
        body: { userId, text },
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Search
  async searchUsers(query: string): Promise<User[]> {
    try {
      const response = await API.get(this.apiName, `/users/search?q=${encodeURIComponent(query)}`, {});
      return response.data || [];
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  }

  // Mock data fallback (for development)
  getMockPosts(): Post[] {
    return [
      {
        id: '1',
        userId: '1',
        user: {
          id: '1',
          email: 'jana@example.com',
          username: 'jana_strassmann',
          displayName: 'Jana Strassmann',
          stats: { posts: 42, followers: 1234, following: 567 }
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
        hashtags: ['#travel', '#time', '#tranding'],
        timestamp: '2 hours ago',
        createdAt: new Date().toISOString()
      }
    ];
  }

  getMockNotifications(): Notification[] {
    return [
      {
        id: '1',
        type: 'like',
        userId: '2',
        user: {
          id: '2',
          email: 'sarah@example.com',
          username: 'sarah_wilson',
          displayName: 'Sarah Wilson',
          stats: { posts: 156, followers: 8923, following: 234 }
        },
        content: 'liked your post',
        time: '2 minutes ago',
        isRead: false,
        postId: '1'
      }
    ];
  }

  getMockMessages(): Message[] {
    return [
      {
        id: '1',
        userId: '2',
        user: {
          id: '2',
          email: 'sarah@example.com',
          username: 'sarah_wilson',
          displayName: 'Sarah Wilson',
          stats: { posts: 156, followers: 8923, following: 234 }
        },
        lastMessage: {
          text: 'Hey! How are you doing?',
          time: '2:30 PM',
          isRead: false,
          isFromMe: false
        },
        unreadCount: 2
      }
    ];
  }
}

export const apiService = new ApiService(); 