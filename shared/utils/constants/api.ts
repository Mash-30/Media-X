export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  POSTS: {
    LIST: '/posts',
    CREATE: '/posts',
    UPDATE: '/posts/:id',
    DELETE: '/posts/:id',
    LIKE: '/posts/:id/like',
    COMMENT: '/posts/:id/comments',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
    SEARCH: '/users/search',
    FOLLOW: '/users/:id/follow',
    UNFOLLOW: '/users/:id/unfollow',
  },
  MESSAGES: {
    LIST: '/messages',
    CREATE: '/messages',
    CONVERSATIONS: '/conversations',
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/:id/read',
    SETTINGS: '/notifications/settings',
  },
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export type HttpMethod = typeof HTTP_METHODS[keyof typeof HTTP_METHODS]; 