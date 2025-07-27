// App Constants
export const APP_NAME = 'Socii';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://your-supabase-url.supabase.co';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Connection Limits by Tier
export const CONNECTION_LIMITS = {
  INNER_CIRCLE: 25,
  CLOSE_FRIENDS: 50,
  FULL_CIRCLE: 100,
  FAMILY_PLAN: 150,
} as const;

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  INNER_CIRCLE: {
    id: 'inner_circle',
    name: 'Inner Circle',
    price: 2.99,
    connections: CONNECTION_LIMITS.INNER_CIRCLE,
  },
  CLOSE_FRIENDS: {
    id: 'close_friends',
    name: 'Close Friends',
    price: 4.99,
    connections: CONNECTION_LIMITS.CLOSE_FRIENDS,
  },
  FULL_CIRCLE: {
    id: 'full_circle',
    name: 'Full Circle',
    price: 7.99,
    connections: CONNECTION_LIMITS.FULL_CIRCLE,
  },
  FAMILY_PLAN: {
    id: 'family_plan',
    name: 'Family Plan',
    price: 9.99,
    connections: CONNECTION_LIMITS.FAMILY_PLAN,
    accounts: 5,
  },
} as const;

// Content Limits
export const CONTENT_LIMITS = {
  POST_TEXT_LENGTH: 500,
  PHOTOS_PER_POST: 10,
  MAX_VIDEO_SIZE_MB: 100,
  MAX_PHOTO_SIZE_MB: 10,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  CONNECTION_LIMIT_REACHED: 'You have reached your connection limit for this tier.',
} as const;

// Screen Names
export const SCREEN_NAMES = {
  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  
  // Main Tabs
  FEED: 'Feed',
  CONNECTIONS: 'Connections',
  PROFILE: 'Profile',
  
  // Screens
  CONNECTION_DETAIL: 'ConnectionDetail',
  POST_DETAIL: 'PostDetail',
  SETTINGS: 'Settings',
  PRIVACY_SETTINGS: 'PrivacySettings',
  SUBSCRIPTION: 'Subscription',
} as const;