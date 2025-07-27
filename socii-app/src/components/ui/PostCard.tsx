import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../../utils/types';
import { getRelativeTime } from '../../utils/mockData';

const { width: screenWidth } = Dimensions.get('window');

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onUserPress?: (userId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLike,
  onComment,
  onUserPress,
}) => {
  const handleLike = () => {
    onLike?.(post.id);
  };

  const handleComment = () => {
    onComment?.(post.id);
  };

  const handleUserPress = () => {
    onUserPress?.(post.userId);
  };

  const renderMedia = () => {
    if (post.mediaUrls.length === 0) return null;

    if (post.mediaUrls.length === 1) {
      return (
        <Image
          source={{ uri: post.mediaUrls[0] }}
          style={styles.singleImage}
          resizeMode="cover"
        />
      );
    }

    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.mediaContainer}
        pagingEnabled
      >
        {post.mediaUrls.map((url, index) => (
          <Image
            key={index}
            source={{ uri: url }}
            style={styles.multiImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    );
  };

  const getPrivacyIcon = () => {
    switch (post.privacyLevel) {
      case 'family': return 'home';
      case 'close_friends': return 'people';
      case 'connections': return 'globe-outline';
      default: return 'lock-closed';
    }
  };

  const getPrivacyColor = () => {
    switch (post.privacyLevel) {
      case 'family': return '#10B981';
      case 'close_friends': return '#6366F1';
      case 'connections': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      {/* Post Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={handleUserPress}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: post.user.avatar || 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.displayName}>{post.user.displayName}</Text>
            <View style={styles.metaInfo}>
              <Text style={styles.timestamp}>{getRelativeTime(post.createdAt)}</Text>
              <View style={styles.privacyBadge}>
                <Ionicons
                  name={getPrivacyIcon()}
                  size={12}
                  color={getPrivacyColor()}
                />
                <Text style={[styles.privacyText, { color: getPrivacyColor() }]}>
                  {post.privacyLevel.replace('_', ' ')}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <View style={styles.content}>
        <Text style={styles.postText}>{post.content}</Text>
      </View>

      {/* Media */}
      {renderMedia()}

      {/* Post Actions */}
      <View style={styles.actions}>
        <View style={styles.engagementStats}>
          {post.likeCount > 0 && (
            <Text style={styles.statsText}>
              {post.likeCount} {post.likeCount === 1 ? 'like' : 'likes'}
            </Text>
          )}
          {post.commentCount > 0 && (
            <Text style={styles.statsText}>
              {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
            </Text>
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, post.isLiked && styles.likedButton]}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Ionicons
              name={post.isLiked ? 'heart' : 'heart-outline'}
              size={22}
              color={post.isLiked ? '#EF4444' : '#6B7280'}
            />
            <Text style={[
              styles.actionText,
              post.isLiked && styles.likedText
            ]}>
              Like
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleComment}
            activeOpacity={0.7}
          >
            <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  displayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  privacyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  privacyText: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  moreButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  postText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  mediaContainer: {
    marginBottom: 12,
  },
  singleImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  multiImage: {
    width: screenWidth - 64, // Account for margins and padding
    height: 250,
    borderRadius: 8,
    marginRight: 8,
  },
  actions: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  engagementStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  likedButton: {
    backgroundColor: '#FEF2F2',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  likedText: {
    color: '#EF4444',
  },
});

export default PostCard;