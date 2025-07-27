# Supabase Setup Instructions

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `socii-app`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

## 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. In your Supabase dashboard, go to **Settings > API**

3. Copy the following values to your `.env` file:
   - **Project URL** → `EXPO_PUBLIC_SUPABASE_URL`
   - **Project API Key (anon/public)** → `EXPO_PUBLIC_SUPABASE_ANON_KEY`

Your `.env` file should look like:
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `lib/database.sql`
3. Click "Run" to create all tables and functions

## 4. Configure Row Level Security

1. Still in the **SQL Editor**
2. Copy and paste the contents of `lib/rls-policies.sql`
3. Click "Run" to set up all security policies

## 5. Configure Authentication

1. Go to **Authentication > Settings**
2. Configure the following:
   - **Site URL**: `exp://localhost:8081` (for development)
   - **Redirect URLs**: Add your production URLs when ready

## 6. Set Up Storage (for images)

1. Go to **Storage**
2. Create a new bucket called `posts`
3. Set it to **Public** (we'll handle privacy via RLS)
4. In **Policies**, create policies for:
   - Users can upload their own images
   - Users can view images from connected users

## 7. Test the Connection

Run the app and check the console for any Supabase connection errors:

```bash
cd socii-app
npm run dev
```

## 8. Optional: Set Up Real-time

1. Go to **Database > Replication**
2. Create publications for real-time updates:
   - `posts` table for live feed updates
   - `notifications` table for instant notifications
   - `connections` table for connection requests

## Database Schema Overview

### Core Tables:
- **users**: User profiles and settings
- **connections**: Mutual friend relationships
- **posts**: User posts with privacy controls
- **post_likes**: Like tracking
- **comments**: Post comments
- **media**: File storage metadata
- **subscriptions**: Subscription management
- **notifications**: User notifications

### Key Features:
- **Row Level Security**: Users can only see data they have permission to access
- **Real-time Updates**: Live updates for posts, notifications, and connections
- **Privacy First**: All queries respect connection relationships
- **Scalable**: Optimized indexes and efficient queries

## Next Steps

After setup is complete:
1. Test authentication flow
2. Create sample users and connections
3. Test posting and feed functionality
4. Set up image upload to Supabase Storage
5. Configure push notifications