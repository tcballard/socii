-- Row Level Security (RLS) Policies for Socii
-- Run this after creating the database schema

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view connected users' profiles" ON public.users
  FOR SELECT USING (
    id IN (
      SELECT requester_id FROM public.connections 
      WHERE receiver_id = auth.uid() AND status = 'accepted'
      UNION
      SELECT receiver_id FROM public.connections 
      WHERE requester_id = auth.uid() AND status = 'accepted'
    )
  );

-- Connections policies
CREATE POLICY "Users can view their own connections" ON public.connections
  FOR SELECT USING (
    requester_id = auth.uid() OR receiver_id = auth.uid()
  );

CREATE POLICY "Users can create connection requests" ON public.connections
  FOR INSERT WITH CHECK (requester_id = auth.uid());

CREATE POLICY "Users can update connections they're part of" ON public.connections
  FOR UPDATE USING (
    requester_id = auth.uid() OR receiver_id = auth.uid()
  );

CREATE POLICY "Users can delete their own connection requests" ON public.connections
  FOR DELETE USING (requester_id = auth.uid());

-- Posts policies
CREATE POLICY "Users can view posts from connections" ON public.posts
  FOR SELECT USING (
    user_id = auth.uid() OR
    user_id IN (
      SELECT requester_id FROM public.connections 
      WHERE receiver_id = auth.uid() AND status = 'accepted'
      UNION
      SELECT receiver_id FROM public.connections 
      WHERE requester_id = auth.uid() AND status = 'accepted'
    )
  );

CREATE POLICY "Users can create their own posts" ON public.posts
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own posts" ON public.posts
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own posts" ON public.posts
  FOR DELETE USING (user_id = auth.uid());

-- Post likes policies
CREATE POLICY "Users can view likes on visible posts" ON public.post_likes
  FOR SELECT USING (
    post_id IN (
      SELECT id FROM public.posts WHERE 
      user_id = auth.uid() OR
      user_id IN (
        SELECT requester_id FROM public.connections 
        WHERE receiver_id = auth.uid() AND status = 'accepted'
        UNION
        SELECT receiver_id FROM public.connections 
        WHERE requester_id = auth.uid() AND status = 'accepted'
      )
    )
  );

CREATE POLICY "Users can like visible posts" ON public.post_likes
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    post_id IN (
      SELECT id FROM public.posts WHERE 
      user_id = auth.uid() OR
      user_id IN (
        SELECT requester_id FROM public.connections 
        WHERE receiver_id = auth.uid() AND status = 'accepted'
        UNION
        SELECT receiver_id FROM public.connections 
        WHERE requester_id = auth.uid() AND status = 'accepted'
      )
    )
  );

CREATE POLICY "Users can remove their own likes" ON public.post_likes
  FOR DELETE USING (user_id = auth.uid());

-- Comments policies
CREATE POLICY "Users can view comments on visible posts" ON public.comments
  FOR SELECT USING (
    post_id IN (
      SELECT id FROM public.posts WHERE 
      user_id = auth.uid() OR
      user_id IN (
        SELECT requester_id FROM public.connections 
        WHERE receiver_id = auth.uid() AND status = 'accepted'
        UNION
        SELECT receiver_id FROM public.connections 
        WHERE requester_id = auth.uid() AND status = 'accepted'
      )
    )
  );

CREATE POLICY "Users can comment on visible posts" ON public.comments
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    post_id IN (
      SELECT id FROM public.posts WHERE 
      user_id = auth.uid() OR
      user_id IN (
        SELECT requester_id FROM public.connections 
        WHERE receiver_id = auth.uid() AND status = 'accepted'
        UNION
        SELECT receiver_id FROM public.connections 
        WHERE requester_id = auth.uid() AND status = 'accepted'
      )
    )
  );

CREATE POLICY "Users can update their own comments" ON public.comments
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own comments" ON public.comments
  FOR DELETE USING (user_id = auth.uid());

-- Media policies
CREATE POLICY "Users can view media from visible posts" ON public.media
  FOR SELECT USING (
    user_id = auth.uid() OR
    post_id IN (
      SELECT id FROM public.posts WHERE 
      user_id = auth.uid() OR
      user_id IN (
        SELECT requester_id FROM public.connections 
        WHERE receiver_id = auth.uid() AND status = 'accepted'
        UNION
        SELECT receiver_id FROM public.connections 
        WHERE requester_id = auth.uid() AND status = 'accepted'
      )
    )
  );

CREATE POLICY "Users can upload their own media" ON public.media
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own media" ON public.media
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own media" ON public.media
  FOR DELETE USING (user_id = auth.uid());

-- Subscriptions policies
CREATE POLICY "Users can view their own subscription" ON public.subscriptions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own subscription" ON public.subscriptions
  FOR UPDATE USING (user_id = auth.uid());

-- Notifications policies
CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);

-- Function to check if users are connected
CREATE OR REPLACE FUNCTION public.are_users_connected(user1_id UUID, user2_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.connections 
    WHERE ((requester_id = user1_id AND receiver_id = user2_id) 
           OR (requester_id = user2_id AND receiver_id = user1_id))
    AND status = 'accepted'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's connection count
CREATE OR REPLACE FUNCTION public.get_user_connection_count(user_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) FROM public.connections 
    WHERE (requester_id = user_uuid OR receiver_id = user_uuid) 
    AND status = 'accepted'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's feed posts
CREATE OR REPLACE FUNCTION public.get_user_feed(user_uuid UUID, limit_count INTEGER DEFAULT 20, offset_count INTEGER DEFAULT 0)
RETURNS TABLE (
  post_id UUID,
  user_id UUID,
  full_name TEXT,
  username TEXT,
  avatar_url TEXT,
  content TEXT,
  media_urls TEXT[],
  like_count INTEGER,
  comment_count INTEGER,
  user_liked BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as post_id,
    p.user_id,
    u.full_name,
    u.username,
    u.avatar_url,
    p.content,
    p.media_urls,
    p.like_count,
    p.comment_count,
    EXISTS(SELECT 1 FROM public.post_likes pl WHERE pl.post_id = p.id AND pl.user_id = user_uuid) as user_liked,
    p.created_at
  FROM public.posts p
  JOIN public.users u ON p.user_id = u.id
  WHERE p.is_active = true
  AND (
    p.user_id = user_uuid OR
    p.user_id IN (
      SELECT requester_id FROM public.connections 
      WHERE receiver_id = user_uuid AND status = 'accepted'
      UNION
      SELECT receiver_id FROM public.connections 
      WHERE requester_id = user_uuid AND status = 'accepted'
    )
  )
  ORDER BY p.created_at DESC
  LIMIT limit_count OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;