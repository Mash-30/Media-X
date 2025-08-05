import { useState, useEffect, useCallback } from 'react';
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';

export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check for existing session on mount
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();
      
      setAuthState({
        user: {
          id: user.attributes.sub,
          email: user.attributes.email,
          username: user.username,
          firstName: user.attributes.given_name,
          lastName: user.attributes.family_name,
          avatar: user.attributes.picture,
          bio: user.attributes.bio,
          createdAt: user.attributes.created_at,
          updatedAt: user.attributes.updated_at,
        },
        token: session.getAccessToken().getJwtToken(),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  };

  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const user = await Auth.signIn(credentials.email, credentials.password);
      const session = await Auth.currentSession();
      
      setAuthState({
        user: {
          id: user.attributes.sub,
          email: user.attributes.email,
          username: user.username,
          firstName: user.attributes.given_name,
          lastName: user.attributes.family_name,
          avatar: user.attributes.picture,
          bio: user.attributes.bio,
          createdAt: user.attributes.created_at,
          updatedAt: user.attributes.updated_at,
        },
        token: session.getAccessToken().getJwtToken(),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { user } = await Auth.signUp({
        username: credentials.username,
        password: credentials.password,
        attributes: {
          email: credentials.email,
          given_name: credentials.firstName,
          family_name: credentials.lastName,
        },
      });

      // For now, we'll consider registration successful
      // In a real app, you might want to handle email verification
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
      }));

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.warn('Logout failed:', error);
    }

    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const updateUser = useCallback((userData: Partial<User>) => {
    setAuthState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null,
    }));
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    updateUser,
    clearError,
  };
}; 
