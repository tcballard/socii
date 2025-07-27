// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  isPrivate: boolean;
  subscriptionTier: SubscriptionTier;
  connectionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: ConnectionStatus;
  category?: ConnectionCategory;
  createdAt: string;
  user?: User;
  connectedUser?: User;
}

// Post Types
export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrls: string[];
  privacyLevel: PrivacyLevel;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  user: User;
}

// Enums
export type SubscriptionTier = 
  | 'inner_circle' 
  | 'close_friends' 
  | 'full_circle' 
  | 'family_plan';

export type ConnectionStatus = 
  | 'pending' 
  | 'accepted' 
  | 'blocked' 
  | 'muted';

export type ConnectionCategory = 
  | 'family' 
  | 'close_friends' 
  | 'friends' 
  | 'colleagues' 
  | 'other';

export type PrivacyLevel = 
  | 'connections' 
  | 'close_friends' 
  | 'family' 
  | 'custom';

// API Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  displayName: string;
}

export interface PostForm {
  content: string;
  mediaUrls: string[];
  privacyLevel: PrivacyLevel;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  CreatePost: undefined;
  PostDetail: { postId: string };
  ConnectionDetail: { connectionId: string };
  Settings: undefined;
  PrivacySettings: undefined;
  Subscription: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Feed: undefined;
  Connections: undefined;
  Profile: undefined;
};

// Store Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface FeedState {
  posts: Post[];
  isLoading: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  error: string | null;
}

export interface ConnectionsState {
  connections: Connection[];
  pendingRequests: Connection[];
  isLoading: boolean;
  error: string | null;
}