-- Storage policies for Supabase Storage bucket 'posts'
-- Run this in Supabase SQL Editor after creating the storage bucket

-- Enable RLS on storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('posts', 'posts', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Users can upload their own images
CREATE POLICY "Users can upload their own images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'posts' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can view their own images
CREATE POLICY "Users can view their own images" ON storage.objects
FOR SELECT USING (
  bucket_id = 'posts' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can view images from connected users
CREATE POLICY "Users can view connected users images" ON storage.objects
FOR SELECT USING (
  bucket_id = 'posts' AND
  (storage.foldername(name))[1] IN (
    SELECT requester_id::text FROM public.connections 
    WHERE receiver_id = auth.uid() AND status = 'accepted'
    UNION
    SELECT receiver_id::text FROM public.connections 
    WHERE requester_id = auth.uid() AND status = 'accepted'
  )
);

-- Policy: Users can update their own images
CREATE POLICY "Users can update their own images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'posts' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can delete their own images
CREATE POLICY "Users can delete their own images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'posts' AND
  auth.uid()::text = (storage.foldername(name))[1]
);