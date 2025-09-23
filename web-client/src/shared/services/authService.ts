// Mock authentication service
export interface LoginResponse {
  user: {
    id: string
    username: string
    email: string
    displayName: string
    avatar?: string
    bio?: string
    stats?: {
      posts: number
      followers: number
      following: number
    }
  }
  token: string
  message: string
}

export interface SignupData {
  username: string
  email: string
  password: string
  displayName: string
}

// Mock user data
const mockUser = {
  id: '1',
  username: 'johndoe',
  email: 'john@example.com',
  displayName: 'John Doe',
  avatar: 'https://via.placeholder.com/40',
  bio: 'Software Developer',
  stats: {
    posts: 42,
    followers: 1234,
    following: 567,
  },
}

class AuthService {
  async signIn(email: string, password: string): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock validation
    if (email === 'john@example.com' && password === 'password') {
      return {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
        message: 'Login successful'
      }
    } else {
      throw new Error('Invalid email or password')
    }
  }

  async signUp(userData: SignupData): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful signup
    const newUser = {
      id: '2',
      username: userData.username,
      email: userData.email,
      displayName: userData.displayName,
      avatar: 'https://via.placeholder.com/40',
      bio: '',
      stats: {
        posts: 0,
        followers: 0,
        following: 0,
      },
    }
    
    return {
      user: newUser,
      token: 'mock-jwt-token-' + Date.now(),
      message: 'Registration successful'
    }
  }

  async forgotPassword(email: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful password reset request
    console.log(`Password reset email sent to ${email}`)
  }

  async resetPassword(token: string, password: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful password reset
    console.log(`Password reset successful for token ${token}`)
  }

  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Mock successful logout
    console.log('User logged out successfully')
  }
}

export const authService = new AuthService()