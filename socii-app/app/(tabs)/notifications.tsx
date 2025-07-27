import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Heart, MessageCircle, UserPlus, Settings, CheckCheck } from 'lucide-react-native';

// Mock data for development
const mockNotifications = [
  {
    id: '1',
    type: 'like',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
    content: 'liked your photo from the family camping trip',
    timestamp: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
    content: 'commented on your post: "Looks like you had an amazing time!"',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'connection',
    user: {
      name: 'Jessica Kim',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
    content: 'wants to connect with you',
    timestamp: '3 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'like',
    user: {
      name: 'Emma Davis',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    },
    content: 'and 3 others liked your post about homemade pizza night',
    timestamp: '2 days ago',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    content: 'Your Family plan subscription renews in 7 days',
    timestamp: '1 week ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart size={20} color="#DC2626" strokeWidth={2} fill="#DC2626" />;
      case 'comment':
        return <MessageCircle size={20} color="#6B9BD2" strokeWidth={2} />;
      case 'connection':
        return <UserPlus size={20} color="#7DB46C" strokeWidth={2} />;
      default:
        return <Settings size={20} color="#8E9AAF" strokeWidth={2} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <CheckCheck size={20} color="#6B9BD2" strokeWidth={2} />
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.todaySection}>
          <Text style={styles.sectionTitle}>Today</Text>
          
          {mockNotifications
            .filter(notification => notification.timestamp.includes('minutes') || notification.timestamp.includes('hour'))
            .map((notification) => (
              <TouchableOpacity key={notification.id} style={[
                styles.notificationCard,
                !notification.read && styles.unreadNotification
              ]}>
                <View style={styles.notificationContent}>
                  <View style={styles.iconContainer}>
                    {notification.type === 'system' ? (
                      getNotificationIcon(notification.type)
                    ) : (
                      <Image source={{ uri: notification.user?.avatar }} style={styles.avatar} />
                    )}
                    <View style={styles.typeIcon}>
                      {getNotificationIcon(notification.type)}
                    </View>
                  </View>
                  
                  <View style={styles.textContent}>
                    <Text style={styles.notificationText}>
                      {notification.user && (
                        <Text style={styles.userName}>{notification.user.name} </Text>
                      )}
                      {notification.content}
                    </Text>
                    <Text style={styles.timestamp}>{notification.timestamp}</Text>
                  </View>
                </View>
                
                {!notification.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.earlierSection}>
          <Text style={styles.sectionTitle}>Earlier</Text>
          
          {mockNotifications
            .filter(notification => !notification.timestamp.includes('minutes') && !notification.timestamp.includes('hour'))
            .map((notification) => (
              <TouchableOpacity key={notification.id} style={[
                styles.notificationCard,
                !notification.read && styles.unreadNotification
              ]}>
                <View style={styles.notificationContent}>
                  <View style={styles.iconContainer}>
                    {notification.type === 'system' ? (
                      getNotificationIcon(notification.type)
                    ) : (
                      <Image source={{ uri: notification.user?.avatar }} style={styles.avatar} />
                    )}
                    <View style={styles.typeIcon}>
                      {getNotificationIcon(notification.type)}
                    </View>
                  </View>
                  
                  <View style={styles.textContent}>
                    <Text style={styles.notificationText}>
                      {notification.user && (
                        <Text style={styles.userName}>{notification.user.name} </Text>
                      )}
                      {notification.content}
                    </Text>
                    <Text style={styles.timestamp}>{notification.timestamp}</Text>
                  </View>
                </View>
                
                {!notification.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.privacyNote}>
          <Text style={styles.privacyText}>
            We only send notifications that matter - no spam, no promotional content, just updates from your close connections.
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
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0F2FE',
    gap: 6,
  },
  markAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0C4A6E',
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  todaySection: {
    marginTop: 16,
    marginBottom: 24,
  },
  earlierSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 3,
    borderLeftColor: '#6B9BD2',
    backgroundColor: '#F8FAFC',
  },
  notificationContent: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  typeIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 2,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  textContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: 'Inter-SemiBold',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6B9BD2',
    marginTop: 4,
  },
  privacyNote: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  privacyText: {
    fontSize: 13,
    color: '#166534',
    lineHeight: 18,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});