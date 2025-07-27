import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Settings, CreditCard as Edit3, Crown, Users, Calendar, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 3;

// Mock data for development
const userProfile = {
  name: 'Alex Thompson',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=2',
  tier: 'Family',
  joinDate: 'March 2024',
  bio: 'Dad of two, coffee enthusiast, weekend warrior. Building memories with the people who matter most.',
  stats: {
    posts: 47,
    connections: 24,
    likes: 312,
  }
};

const recentPosts = [
  'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1720186/pexels-photo-1720186.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=400',
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={20} color="#6B7280" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
            <View style={styles.tierBadge}>
              <Crown size={16} color="#7DB46C" strokeWidth={2} />
            </View>
          </View>
          
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userTier}>{userProfile.tier} Plan</Text>
          
          <Text style={styles.userBio}>{userProfile.bio}</Text>
          
          <View style={styles.joinInfo}>
            <Calendar size={14} color="#9CA3AF" strokeWidth={2} />
            <Text style={styles.joinText}>Joined {userProfile.joinDate}</Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Edit3 size={16} color="#6B9BD2" strokeWidth={2} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.stats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.stats.connections}</Text>
            <Text style={styles.statLabel}>Connections</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.stats.likes}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
        </View>

        <View style={styles.postsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Posts</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.photoGrid}>
            {recentPosts.map((image, index) => (
              <TouchableOpacity key={index} style={styles.photoItem}>
                <Image source={{ uri: image }} style={styles.postImage} />
                {index === 0 && (
                  <View style={styles.recentBadge}>
                    <Heart size={12} color="#FFFFFF" strokeWidth={2} fill="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Your Plan Benefits</Text>
          
          <View style={styles.featureCard}>
            <Crown size={20} color="#7DB46C" strokeWidth={2} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Family Plan</Text>
              <Text style={styles.featureDescription}>
                Connect with up to 50 family members and close friends
              </Text>
            </View>
          </View>
          
          <View style={styles.featureCard}>
            <Users size={20} color="#6B9BD2" strokeWidth={2} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Private Connections</Text>
              <Text style={styles.featureDescription}>
                No algorithms, no ads - just real moments with people who matter
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.upgradeCard}>
            <Text style={styles.upgradeTitle}>Want to connect with more people?</Text>
            <Text style={styles.upgradeDescription}>
              Upgrade to Premium for up to 150 connections
            </Text>
            <View style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.privacySection}>
          <Text style={styles.privacyTitle}>Privacy & Security</Text>
          <Text style={styles.privacyText}>
            Your data stays private. We never sell your information or show you ads. Learn more about our privacy commitment.
          </Text>
          <TouchableOpacity>
            <Text style={styles.privacyLink}>Privacy Policy</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: 'Inter-Bold',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#E5E7EB',
  },
  tierBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  userTier: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7DB46C',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  userBio: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
  },
  joinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  joinText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginLeft: 6,
    fontFamily: 'Inter-Regular',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0F2FE',
    gap: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0C4A6E',
    fontFamily: 'Inter-SemiBold',
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  postsSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Inter-SemiBold',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B9BD2',
    fontFamily: 'Inter-SemiBold',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photoItem: {
    position: 'relative',
  },
  postImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
  },
  recentBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuresSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  featureContent: {
    flex: 1,
    marginLeft: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
    fontFamily: 'Inter-SemiBold',
  },
  featureDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  upgradeCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 6,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  upgradeDescription: {
    fontSize: 14,
    color: '#3730A3',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  upgradeButton: {
    backgroundColor: '#6B9BD2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  upgradeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  privacySection: {
    backgroundColor: '#F0FDF4',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 32,
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  privacyText: {
    fontSize: 13,
    color: '#166534',
    lineHeight: 18,
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  privacyLink: {
    fontSize: 13,
    fontWeight: '600',
    color: '#059669',
    textDecorationLine: 'underline',
    fontFamily: 'Inter-SemiBold',
  },
});