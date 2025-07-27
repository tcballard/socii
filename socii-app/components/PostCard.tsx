import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Heart, MessageCircle, Clock } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const imageWidth = width - 32;

interface User {
  name: string;
  avatar: string;
  tier: string;
}

interface Post {
  id: string;
  user: User;
  content: string;
  images: string[];
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
}

interface PostCardProps {
  post: Post;
  onLike: () => void;
}

export function PostCard({ post, onLike }: PostCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLike();
  };

  const handleDoubleTap = () => {
    if (!post.liked) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onLike();
    }
  };

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentImageIndex(roundIndex);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Family':
        return '#7DB46C';
      case 'Close Friends':
        return '#6B9BD2';
      default:
        return '#8E9AAF';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <View style={styles.metaInfo}>
            <View style={[styles.tierBadge, { backgroundColor: getTierColor(post.user.tier) + '20', borderColor: getTierColor(post.user.tier) + '40' }]}>
              <Text style={[styles.tierText, { color: getTierColor(post.user.tier) }]}>
                {post.user.tier}
              </Text>
            </View>
            <View style={styles.timestampContainer}>
              <Clock size={12} color="#9CA3AF" strokeWidth={2} />
              <Text style={styles.timestamp}>{post.timestamp}</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.images.length > 0 && (
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
          >
            {post.images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={handleDoubleTap}
                activeOpacity={0.95}
              >
                <Image
                  source={{ uri: image }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {post.images.length > 1 && (
            <View style={styles.imageIndicator}>
              {post.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentImageIndex ? styles.activeDot : styles.inactiveDot
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, post.liked && styles.likedButton]}
          onPress={handleLike}
          activeOpacity={0.7}
        >
          <Heart
            size={20}
            color={post.liked ? '#DC2626' : '#6B7280'}
            strokeWidth={2}
            fill={post.liked ? '#DC2626' : 'none'}
          />
          <Text style={[styles.actionText, post.liked && styles.likedText]}>
            {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <MessageCircle size={20} color="#6B7280" strokeWidth={2} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: 'Inter-SemiBold',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 8,
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
  },
  tierText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
    paddingHorizontal: 16,
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  postImage: {
    width: imageWidth,
    height: 280,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  imageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    backgroundColor: '#6B9BD2',
  },
  inactiveDot: {
    backgroundColor: '#D1D5DB',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
  },
  likedButton: {
    backgroundColor: '#FEF2F2',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 6,
    fontFamily: 'Inter-SemiBold',
  },
  likedText: {
    color: '#DC2626',
  },
});