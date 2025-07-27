// TypeScript types for Supabase database

export type SubscriptionTier = 'inner_circle' | 'close_friends' | 'full_circle' | 'family_plan';
export type ConnectionStatus = 'pending' | 'accepted' | 'blocked';
export type ConnectionTier = 'family' | 'close_friends' | 'general';
export type PostType = 'text' | 'image' | 'life_event';

export interface User {
  id: string;
  email: string;
  username?: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  subscription_tier: SubscriptionTier;
  connection_limit: number;
  is_active: boolean;
  privacy_settings: {
    profile_visible: boolean;
    posts_visible: 'everyone' | 'connections_only' | 'private';
  };
  created_at: string;
  updated_at: string;
}

export interface Connection {
  id: string;
  requester_id: string;
  receiver_id: string;
  status: ConnectionStatus;
  tier: ConnectionTier;
  created_at: string;
  accepted_at?: string;
}

export interface Post {
  id: string;
  user_id: string;
  content?: string;
  post_type: PostType;
  media_urls?: string[];
  privacy_settings: {
    visible_to: 'connections' | 'family' | 'close_friends';
    allow_comments: boolean;
  };
  like_count: number;
  comment_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  user_id: string;
  post_id: string;
  file_name: string;
  file_type: string;
  file_size?: number;
  storage_path: string;
  public_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  subscription_tier: SubscriptionTier;
  revenue_cat_customer_id?: string;
  revenue_cat_subscription_id?: string;
  status: string;
  current_period_start?: string;
  current_period_end?: string;
  trial_end?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  content: string;
  data?: Record<string, any>;
  is_read: boolean;
  created_at: string;
}

// Extended types for UI components
export interface PostWithUser extends Post {
  user: {
    full_name: string;
    username?: string;
    avatar_url?: string;
  };
  user_liked: boolean;
}

export interface ConnectionWithUser extends Connection {
  user: User;
  mutual_connections?: number;
}

export interface CommentWithUser extends Comment {
  user: {
    full_name: string;
    username?: string;
    avatar_url?: string;
  };
}

// API Response types
export interface FeedPost {
  post_id: string;
  user_id: string;
  full_name: string;
  username?: string;
  avatar_url?: string;
  content?: string;
  media_urls?: string[];
  like_count: number;
  comment_count: number;
  user_liked: boolean;
  created_at: string;
}

// Subscription tier limits
export const SUBSCRIPTION_LIMITS: Record<SubscriptionTier, { connections: number; price: number }> = {
  inner_circle: { connections: 25, price: 2.99 },
  close_friends: { connections: 50, price: 4.99 },
  full_circle: { connections: 100, price: 7.99 },
  family_plan: { connections: 150, price: 9.99 },
};

// Connection tier colors (matching existing UI)
export const CONNECTION_TIER_COLORS: Record<ConnectionTier, string> = {
  family: '#7DB46C',
  close_friends: '#6B9BD2',
  general: '#8E9AAF',
};