import { createClient } from '@supabase/supabase-js';
import { API_BASE_URL, SUPABASE_ANON_KEY } from '../utils/constants';

// Create Supabase client
export const supabase = createClient(API_BASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Database Tables
export const TABLES = {
  USERS: 'users',
  CONNECTIONS: 'connections',
  POSTS: 'posts',
  COMMENTS: 'comments',
  MEDIA: 'media',
  SUBSCRIPTIONS: 'subscriptions',
} as const;