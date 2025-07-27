// API functions for interacting with Supabase
import { supabase } from './supabase';
import type { User, Post, Connection, FeedPost, PostWithUser } from './types';

// Auth functions
export const authApi = {
  signUp: async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    
    if (error) throw error;
    return data;
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getCurrentUser: () => {
    return supabase.auth.getUser();
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// User functions
export const userApi = {
  getProfile: async (userId: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  updateProfile: async (userId: string, updates: Partial<User>) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  searchUsers: async (query: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, full_name, username, avatar_url')
      .or(`full_name.ilike.%${query}%,username.ilike.%${query}%`)
      .limit(10);
    
    if (error) throw error;
    return data;
  },
};

// Posts functions
export const postsApi = {
  getFeed: async (limit = 20, offset = 0): Promise<FeedPost[]> => {
    const { data, error } = await supabase
      .rpc('get_user_feed', {
        user_uuid: (await supabase.auth.getUser()).data.user?.id,
        limit_count: limit,
        offset_count: offset,
      });
    
    if (error) throw error;
    return data || [];
  },

  createPost: async (content: string, mediaUrls?: string[]) => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: user.data.user.id,
        content,
        media_urls: mediaUrls || [],
        post_type: mediaUrls && mediaUrls.length > 0 ? 'image' : 'text',
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  likePost: async (postId: string) => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('post_likes')
      .insert({
        post_id: postId,
        user_id: user.data.user.id,
      });
    
    if (error) throw error;
    return data;
  },

  unlikePost: async (postId: string) => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.data.user.id);
    
    if (error) throw error;
  },

  getPostComments: async (postId: string) => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        user:users(full_name, username, avatar_url)
      `)
      .eq('post_id', postId)
      .eq('is_active', true)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  addComment: async (postId: string, content: string) => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: user.data.user.id,
        content,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Connections functions
export const connectionsApi = {
  getConnections: async () => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('connections')
      .select(`
        *,
        requester:users!connections_requester_id_fkey(full_name, username, avatar_url),
        receiver:users!connections_receiver_id_fkey(full_name, username, avatar_url)
      `)
      .or(`requester_id.eq.${user.data.user.id},receiver_id.eq.${user.data.user.id}`)
      .eq('status', 'accepted');
    
    if (error) throw error;
    return data;
  },

  getPendingRequests: async () => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('connections')
      .select(`
        *,
        requester:users!connections_requester_id_fkey(full_name, username, avatar_url)
      `)
      .eq('receiver_id', user.data.user.id)
      .eq('status', 'pending');
    
    if (error) throw error;
    return data;
  },

  sendConnectionRequest: async (receiverId: string, tier: 'family' | 'close_friends' | 'general' = 'general') => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('connections')
      .insert({
        requester_id: user.data.user.id,
        receiver_id: receiverId,
        tier,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  acceptConnectionRequest: async (connectionId: string) => {
    const { data, error } = await supabase
      .from('connections')
      .update({
        status: 'accepted',
        accepted_at: new Date().toISOString(),
      })
      .eq('id', connectionId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  declineConnectionRequest: async (connectionId: string) => {
    const { error } = await supabase
      .from('connections')
      .delete()
      .eq('id', connectionId);
    
    if (error) throw error;
  },

  getConnectionCount: async () => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .rpc('get_user_connection_count', {
        user_uuid: user.data.user.id,
      });
    
    if (error) throw error;
    return data || 0;
  },
};

// Notifications functions
export const notificationsApi = {
  getNotifications: async (limit = 50) => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.data.user.id)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  markAsRead: async (notificationId: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
    
    if (error) throw error;
  },

  markAllAsRead: async () => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.data.user.id);
    
    if (error) throw error;
  },
};

// Real-time subscriptions
export const realtimeApi = {
  subscribeToPosts: (callback: (payload: any) => void) => {
    return supabase
      .channel('posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        callback
      )
      .subscribe();
  },

  subscribeToNotifications: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },

  subscribeToConnections: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('connections')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'connections',
          filter: `requester_id=eq.${userId}`,
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'connections',
          filter: `receiver_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },
};