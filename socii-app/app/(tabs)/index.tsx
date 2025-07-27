import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Heart, MessageCircle, Clock, Shield } from 'lucide-react-native';
import { FeedHeader } from '@/components/FeedHeader';
import { PostCard } from '@/components/PostCard';

const { width } = Dimensions.get('window');

// Mock data for development
const mockPosts = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      tier: 'Family'
    },
    content: "Just finished making homemade pizza with the kids! Messy kitchen but so worth it for these smiles. 🍕",
    images: [
      'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    timestamp: '2 hours ago',
    likes: 12,
    comments: 3,
    liked: false,
  },
  {
    id: '2',
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      tier: 'Close Friends'
    },
    content: "Weekend camping trip was exactly what we needed. No cell service, just quality time with the family.",
    images: [
      'https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    timestamp: '1 day ago',
    likes: 8,
    comments: 5,
    liked: true,
  },
  {
    id: '3',
    user: {
      name: 'Emma Davis',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      tier: 'Family'
    },
    content: "First day of school pictures! Can't believe how fast they're growing up. Time really does fly when you're raising little humans.",
    images: [
      'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    timestamp: '3 days ago',
    likes: 24,
    comments: 8,
    liked: false,
  }
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState(mockPosts);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <FeedHeader />
      
      <ScrollView
        style={styles.feed}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6B9BD2']}
            tintColor="#6B9BD2"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.algorithmBanner}>
          <Shield size={16} color="#7DB46C" strokeWidth={2} />
          <Text style={styles.algorithmText}>
            No algorithm here - just real moments from people who matter
          </Text>
        </View>

        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => handleLike(post.id)}
          />
        ))}

        <View style={styles.endOfFeed}>
          <Text style={styles.endOfFeedText}>You're all caught up!</Text>
          <Text style={styles.endOfFeedSubtext}>
            No more posts from your connections right now
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  feed: {
    flex: 1,
  },
  algorithmBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  algorithmText: {
    fontSize: 13,
    color: '#0F766E',
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
    fontFamily: 'Inter-Medium',
  },
  errorBanner: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#DC2626',
  },
  endOfFeed: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  endOfFeedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'Inter-SemiBold',
  },
  endOfFeedSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});