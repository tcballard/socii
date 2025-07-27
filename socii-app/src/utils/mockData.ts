import { Post, User, ConnectionCategory } from './types';

// Mock Users representing different personas from our PRD
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'sarah.connor@email.com',
    username: 'sarahc',
    displayName: 'Sarah Connor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b602?w=150&h=150&fit=crop&crop=face',
    bio: 'Mom of two, family organizer, loves sharing moments',
    isPrivate: false,
    subscriptionTier: 'close_friends',
    connectionCount: 47,
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-07-27T00:00:00Z',
  },
  {
    id: '2', 
    email: 'mike.chen@email.com',
    username: 'mikechen',
    displayName: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Digital minimalist, privacy advocate, dad',
    isPrivate: true,
    subscriptionTier: 'inner_circle',
    connectionCount: 23,
    createdAt: '2025-02-20T00:00:00Z',
    updatedAt: '2025-07-27T00:00:00Z',
  },
  {
    id: '3',
    email: 'emma.rodriguez@email.com', 
    username: 'emmarodriguez',
    displayName: 'Emma Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Grandma, loves staying connected with family',
    isPrivate: false,
    subscriptionTier: 'family_plan',
    connectionCount: 89,
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2025-07-27T00:00:00Z',
  },
  {
    id: '4',
    email: 'david.kim@email.com',
    username: 'davidkim',
    displayName: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Uncle, photographer, world traveler',
    isPrivate: false,
    subscriptionTier: 'full_circle',
    connectionCount: 78,
    createdAt: '2025-03-05T00:00:00Z',
    updatedAt: '2025-07-27T00:00:00Z',
  },
  {
    id: '5',
    email: 'lisa.williams@email.com',
    username: 'lisawilliams',
    displayName: 'Lisa Williams',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    bio: 'Sister, teacher, coffee enthusiast',
    isPrivate: false,
    subscriptionTier: 'close_friends',
    connectionCount: 42,
    createdAt: '2025-01-25T00:00:00Z',
    updatedAt: '2025-07-27T00:00:00Z',
  },
];

// Mock Posts with realistic content and chronological order
export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Beautiful sunset with the family today! Sometimes the simple moments are the most precious. Kids loved building sandcastles and collecting shells. 🌅',
    mediaUrls: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    ],
    privacyLevel: 'connections',
    likeCount: 12,
    commentCount: 3,
    isLiked: false,
    createdAt: '2025-07-27T18:30:00Z',
    updatedAt: '2025-07-27T18:30:00Z',
    user: mockUsers[0],
  },
  {
    id: '2',
    userId: '2',
    content: 'Just finished reading "Digital Minimalism" by Cal Newport. Really makes you think about how we use technology and social media. The idea of intentional tech use resonates deeply.',
    mediaUrls: [],
    privacyLevel: 'close_friends',
    likeCount: 8,
    commentCount: 2,
    isLiked: true,
    createdAt: '2025-07-27T16:45:00Z',
    updatedAt: '2025-07-27T16:45:00Z',
    user: mockUsers[1],
  },
  {
    id: '3',
    userId: '3',
    content: 'Made my famous chocolate chip cookies for the grandkids today! Recipe has been in our family for three generations. Nothing beats the smell of fresh cookies and little ones\' laughter.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=400&fit=crop',
    ],
    privacyLevel: 'family',
    likeCount: 15,
    commentCount: 5,
    isLiked: true,
    createdAt: '2025-07-27T14:20:00Z',
    updatedAt: '2025-07-27T14:20:00Z',
    user: mockUsers[2],
  },
  {
    id: '4',
    userId: '4',
    content: 'Captured this amazing street art in Barcelona yesterday. The colors and detail are incredible. Planning to create a photo book of this Europe trip for the family.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop',
    ],
    privacyLevel: 'connections',
    likeCount: 22,
    commentCount: 7,
    isLiked: false,
    createdAt: '2025-07-27T12:15:00Z',
    updatedAt: '2025-07-27T12:15:00Z',
    user: mockUsers[3],
  },
  {
    id: '5',
    userId: '5',
    content: 'First day of school prep! Getting supplies ready and feeling grateful for another year of teaching. These kids always surprise me with their creativity and curiosity.',
    mediaUrls: [],
    privacyLevel: 'connections',
    likeCount: 6,
    commentCount: 1,
    isLiked: false,
    createdAt: '2025-07-27T10:30:00Z',
    updatedAt: '2025-07-27T10:30:00Z',
    user: mockUsers[4],
  },
  {
    id: '6',
    userId: '1',
    content: 'Date night planning! Finally found a babysitter for Friday. Any recommendations for quiet restaurants downtown? Looking for somewhere we can actually have a conversation.',
    mediaUrls: [],
    privacyLevel: 'close_friends',
    likeCount: 4,
    commentCount: 8,
    isLiked: false,
    createdAt: '2025-07-27T09:45:00Z',
    updatedAt: '2025-07-27T09:45:00Z',
    user: mockUsers[0],
  },
  {
    id: '7',
    userId: '3',
    content: 'Weekly family video call was wonderful today! Saw all the grandchildren and caught up with everyone. Technology may be complicated, but being able to see their faces makes it worth it.',
    mediaUrls: [],
    privacyLevel: 'family',
    likeCount: 11,
    commentCount: 2,
    isLiked: true,
    createdAt: '2025-07-26T19:00:00Z',
    updatedAt: '2025-07-26T19:00:00Z',
    user: mockUsers[2],
  },
  {
    id: '8',
    userId: '2',
    content: 'Meditation garden is coming along nicely. Sometimes disconnecting from the digital world and connecting with nature is exactly what we need. Peace.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=400&fit=crop',
    ],
    privacyLevel: 'connections',
    likeCount: 9,
    commentCount: 1,
    isLiked: true,
    createdAt: '2025-07-26T16:30:00Z',
    updatedAt: '2025-07-26T16:30:00Z',
    user: mockUsers[1],
  },
];

// Helper function to format relative time
export const getRelativeTime = (dateString: string): string => {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return postDate.toLocaleDateString();
};

// Connection category helpers
export const getConnectionCategoryColor = (category?: ConnectionCategory): string => {
  switch (category) {
    case 'family': return '#10B981'; // Green
    case 'close_friends': return '#6366F1'; // Purple
    case 'friends': return '#3B82F6'; // Blue
    case 'colleagues': return '#F59E0B'; // Orange
    default: return '#6B7280'; // Gray
  }
};

export const getConnectionCategoryLabel = (category?: ConnectionCategory): string => {
  switch (category) {
    case 'family': return 'Family';
    case 'close_friends': return 'Close Friend';
    case 'friends': return 'Friend';
    case 'colleagues': return 'Colleague';
    default: return 'Connection';
  }
};