import { Auth } from 'aws-amplify';
import { router } from 'expo-router';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  website?: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
}

export interface AuthError {
  code: string;
  message: string;
}

class AuthService {
  private currentUser: User | null = null;

  // Sign up a new user
  async signUp(email: string, password: string, displayName: string): Promise<User> {
    try {
      const username = email; // Using email as username
      
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name: displayName,
        },
      });

      // Create user profile
      const newUser: User = {
        id: user.userId,
        email,
        username: email,
        displayName,
        avatar: undefined,
        bio: '',
        website: '',
        stats: {
          posts: 0,
          followers: 0,
          following: 0,
        },
      };

      this.currentUser = newUser;
      return newUser;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in user
  async signIn(email: string, password: string): Promise<User> {
    try {
      const { user } = await Auth.signIn(email, password);
      
      // Get user attributes
      const attributes = await Auth.currentUserInfo();
      
      const currentUser: User = {
        id: user.userId,
        email: attributes.attributes.email,
        username: attributes.attributes.email,
        displayName: attributes.attributes.name || email,
        avatar: undefined,
        bio: '',
        website: '',
        stats: {
          posts: 0,
          followers: 0,
          following: 0,
        },
      };

      this.currentUser = currentUser;
      return currentUser;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Sign out user
  async signOut(): Promise<void> {
    try {
      await Auth.signOut();
      this.currentUser = null;
      router.replace('/auth/login');
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Get current user
  async getCurrentUser(): Promise<User | null> {
    try {
      if (this.currentUser) {
        return this.currentUser;
      }

      const user = await Auth.currentAuthenticatedUser();
      if (!user) {
        return null;
      }

      const attributes = await Auth.currentUserInfo();
      
      const currentUser: User = {
        id: user.userId,
        email: attributes.attributes.email,
        username: attributes.attributes.email,
        displayName: attributes.attributes.name || attributes.attributes.email,
        avatar: undefined,
        bio: '',
        website: '',
        stats: {
          posts: 0,
          followers: 0,
          following: 0,
        },
      };

      this.currentUser = currentUser;
      return currentUser;
    } catch (error: any) {
      return null;
    }
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    try {
      await Auth.currentAuthenticatedUser();
      return true;
    } catch {
      return false;
    }
  }

  // Forgot password
  async forgotPassword(email: string): Promise<void> {
    try {
      await Auth.forgotPassword(email);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Reset password
  async resetPassword(email: string, code: string, newPassword: string): Promise<void> {
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  // Update user profile
  async updateProfile(updates: Partial<User>): Promise<User> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    this.currentUser = { ...this.currentUser, ...updates };
    return this.currentUser;
  }

  // Handle authentication errors
  private handleAuthError(error: any): AuthError {
    let message = 'An unexpected error occurred';
    let code = 'UNKNOWN_ERROR';

    if (error.code) {
      code = error.code;
      switch (error.code) {
        case 'UserNotConfirmedException':
          message = 'Please confirm your email address';
          break;
        case 'NotAuthorizedException':
          message = 'Invalid email or password';
          break;
        case 'UserNotFoundException':
          message = 'User not found';
          break;
        case 'UsernameExistsException':
          message = 'An account with this email already exists';
          break;
        case 'InvalidPasswordException':
          message = 'Password must be at least 8 characters long';
          break;
        case 'CodeMismatchException':
          message = 'Invalid verification code';
          break;
        case 'ExpiredCodeException':
          message = 'Verification code has expired';
          break;
        default:
          message = error.message || message;
      }
    }

    return { code, message };
  }
}

export const authService = new AuthService(); 