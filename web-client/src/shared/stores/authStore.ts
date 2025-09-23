import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  username: string
  displayName: string
  email: string
  avatar?: string
  bio?: string
  stats?: {
    posts: number
    followers: number
    following: number
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (userData: any) => Promise<void>
  initialize: () => void
}

// Mock user data
const mockUser: User = {
  id: '1',
  username: 'johndoe',
  displayName: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://via.placeholder.com/150',
  bio: 'Digital creator | Photography enthusiast | Travel lover ✈️',
  stats: {
    posts: 42,
    followers: 1234,
    following: 567,
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true, // Start with loading true

      initialize: () => {
        // Simulate checking for existing session
        setTimeout(() => {
          set({ isLoading: false })
        }, 1000)
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const { authService } = await import('../services/authService')
          const response = await authService.signIn(email, password)
          
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        try {
          const { authService } = await import('../services/authService')
          await authService.logout()
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
          set({
            user: null,
            isAuthenticated: false,
          })
        }
      },

      signup: async (userData: any) => {
        set({ isLoading: true })
        try {
          const { authService } = await import('../services/authService')
          const response = await authService.signUp(userData)
          
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
) 