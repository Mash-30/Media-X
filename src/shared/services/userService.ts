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

export interface User {
  id: string
  username: string
  email: string
  displayName?: string
  avatar?: string
  bio?: string
  website?: string
  followers: number
  following: number
  posts: number
  authProvider?: 'email' | 'facebook' | 'google'
  createdAt: string
  updatedAt: string
}

export interface Follow {
  id: string
  followerId: string
  followingId: string
  createdAt: string
}

class UserService {
  async getUserById(userId: string): Promise<User> {
    try {
      const response = await api.get(`/users/${userId}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user')
    }
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    try {
      const response = await api.put(`/users/${userId}`, userData)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update user')
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    try {
      const response = await api.get(`/users/search?q=${encodeURIComponent(query)}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to search users')
    }
  }

  async followUser(userId: string): Promise<Follow> {
    try {
      // Get current user ID from auth store
      const authStorage = localStorage.getItem('auth-storage')
      if (!authStorage) {
        throw new Error('User not authenticated')
      }
      
      const parsedAuth = JSON.parse(authStorage)
      const currentUserId = parsedAuth.state?.user?.id
      
      if (!currentUserId) {
        throw new Error('User not authenticated')
      }

      const response = await api.post(`/users/${userId}/follow`, {
        followerId: currentUserId
      })
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to follow user')
    }
  }

  async unfollowUser(userId: string): Promise<void> {
    try {
      // Get current user ID from auth store
      const authStorage = localStorage.getItem('auth-storage')
      if (!authStorage) {
        throw new Error('User not authenticated')
      }
      
      const parsedAuth = JSON.parse(authStorage)
      const currentUserId = parsedAuth.state?.user?.id
      
      if (!currentUserId) {
        throw new Error('User not authenticated')
      }

      await api.delete(`/users/${userId}/follow`, {
        data: { followerId: currentUserId }
      })
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to unfollow user')
    }
  }
}

export const userService = new UserService()
