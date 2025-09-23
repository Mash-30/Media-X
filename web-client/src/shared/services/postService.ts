import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage')
  if (token) {
    const parsedToken = JSON.parse(token)
    if (parsedToken.state?.token) {
      config.headers.Authorization = `Bearer ${parsedToken.state.token}`
    }
  }
  return config
})

export interface Post {
  id: string
  content: string
  image?: string
  hashtags: string[]
  likes: number
  comments: number
  userId: string
  user?: {
    id: string
    username: string
    displayName: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  text: string
  postId: string
  userId: string
  user?: {
    id: string
    username: string
    displayName: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
}

export interface Like {
  id: string
  postId: string
  userId: string
  user?: {
    id: string
    username: string
    displayName: string
    avatar?: string
  }
  createdAt: string
}

class PostService {
  async getAllPosts(): Promise<Post[]> {
    try {
      const response = await api.get('/posts')
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch posts')
    }
  }

  async getPostById(postId: string): Promise<Post> {
    try {
      const response = await api.get(`/posts/${postId}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch post')
    }
  }

  async createPost(content: string, image?: string, hashtags: string[] = []): Promise<Post> {
    try {
      const response = await api.post('/posts', {
        content,
        image,
        hashtags
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create post')
    }
  }

  async updatePost(postId: string, content: string, image?: string, hashtags: string[] = []): Promise<Post> {
    try {
      const response = await api.put(`/posts/${postId}`, {
        content,
        image,
        hashtags
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update post')
    }
  }

  async deletePost(postId: string): Promise<void> {
    try {
      await api.delete(`/posts/${postId}`)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete post')
    }
  }

  async likePost(postId: string): Promise<Like> {
    try {
      const response = await api.post(`/posts/${postId}/like`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to like post')
    }
  }

  async unlikePost(postId: string): Promise<void> {
    try {
      await api.delete(`/posts/${postId}/like`)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to unlike post')
    }
  }

  async getPostComments(postId: string): Promise<Comment[]> {
    try {
      const response = await api.get(`/posts/${postId}/comments`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch comments')
    }
  }

  async addComment(postId: string, text: string): Promise<Comment> {
    try {
      const response = await api.post(`/posts/${postId}/comments`, { text })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add comment')
    }
  }
}

export const postService = new PostService()
