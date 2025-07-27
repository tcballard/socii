import { supabase, TABLES } from '../../config/supabase';
import { Post, PostForm, PaginatedResponse } from '../../utils/types';

export class PostsService {
  static async getFeed(page = 0, limit = 20): Promise<PaginatedResponse<Post>> {
    const { data, error, count } = await supabase
      .from(TABLES.POSTS)
      .select(`
        *,
        user:users(id, username, display_name, avatar),
        like_count,
        comment_count,
        is_liked
      `)
      .order('created_at', { ascending: false })
      .range(page * limit, (page + 1) * limit - 1);

    if (error) throw error;

    return {
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        hasMore: (count || 0) > (page + 1) * limit,
      },
    };
  }

  static async createPost(form: PostForm): Promise<Post> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from(TABLES.POSTS)
      .insert({
        user_id: user.id,
        content: form.content,
        media_urls: form.mediaUrls,
        privacy_level: form.privacyLevel,
      })
      .select(`
        *,
        user:users(id, username, display_name, avatar)
      `)
      .single();

    if (error) throw error;
    return data;
  }

  static async likePost(postId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('post_likes')
      .upsert({
        post_id: postId,
        user_id: user.id,
      });

    if (error) throw error;
  }

  static async unlikePost(postId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.id);

    if (error) throw error;
  }

  static async deletePost(postId: string): Promise<void> {
    const { error } = await supabase
      .from(TABLES.POSTS)
      .delete()
      .eq('id', postId);

    if (error) throw error;
  }
}