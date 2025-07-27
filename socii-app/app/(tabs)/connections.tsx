import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, UserPlus, Users, Crown, Shield } from 'lucide-react-native';

// Mock data for development
const mockConnections = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    tier: 'Family',
    lastActive: '2 hours ago',
    mutualConnections: 5,
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    tier: 'Close Friends',
    lastActive: '5 hours ago',
    mutualConnections: 3,
  },
  {
    id: '3',
    name: 'Emma Davis',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    tier: 'Family',
    lastActive: '1 day ago',
    mutualConnections: 8,
  },
  {
    id: '4',
    name: 'David Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    tier: 'Close Friends',
    lastActive: '3 days ago',
    mutualConnections: 2,
  }
];

const pendingRequests = [
  {
    id: '5',
    name: 'Jessica Kim',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    mutualConnections: 4,
  }
];

export default function ConnectionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [connections, setConnections] = useState(mockConnections);
  const [requests, setRequests] = useState(pendingRequests);

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

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Family':
        return <Crown size={14} color="#7DB46C" strokeWidth={2} />;
      case 'Close Friends':
        return <Shield size={14} color="#6B9BD2" strokeWidth={2} />;
      default:
        return <Users size={14} color="#8E9AAF" strokeWidth={2} />;
    }
  };

  const handleAcceptRequest = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      setRequests(prev => prev.filter(r => r.id !== requestId));
      setConnections(prev => [...prev, {
        ...request,
        tier: 'Close Friends',
        lastActive: 'Just joined',
      }]);
    }
  };

  const handleDeclineRequest = (requestId: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Connections</Text>
        <TouchableOpacity style={styles.addButton}>
          <UserPlus size={20} color="#6B9BD2" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Connections</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>50</Text>
          <Text style={styles.statLabel}>Limit</Text>
        </View>
        <View style={styles.tierCard}>
          <Crown size={16} color="#7DB46C" strokeWidth={2} />
          <Text style={styles.tierLabel}>Family Plan</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search connections..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {requests.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Pending Requests</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{requests.length}</Text>
              </View>
            </View>
            
            {requests.map((request) => (
              <View key={request.id} style={styles.requestCard}>
                <Image source={{ uri: request.avatar }} style={styles.avatar} />
                <View style={styles.requestInfo}>
                  <Text style={styles.connectionName}>{request.name}</Text>
                  <Text style={styles.mutualText}>
                    {request.mutualConnections} mutual connections
                  </Text>
                </View>
                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAcceptRequest(request.id)}
                  >
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.declineButton}
                    onPress={() => handleDeclineRequest(request.id)}
                  >
                    <Text style={styles.declineButtonText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Connections</Text>
          
          {filteredConnections.map((connection) => (
            <TouchableOpacity key={connection.id} style={styles.connectionCard}>
              <Image source={{ uri: connection.avatar }} style={styles.avatar} />
              <View style={styles.connectionInfo}>
                <View style={styles.connectionHeader}>
                  <Text style={styles.connectionName}>{connection.name}</Text>
                  <View style={[styles.tierBadge, { backgroundColor: getTierColor(connection.tier) + '20' }]}>
                    {getTierIcon(connection.tier)}
                    <Text style={[styles.tierText, { color: getTierColor(connection.tier) }]}>
                      {connection.tier}
                    </Text>
                  </View>
                </View>
                <Text style={styles.lastActive}>Last active {connection.lastActive}</Text>
                <Text style={styles.mutualText}>
                  {connection.mutualConnections} mutual connections
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.upgradeSection}>
          <Text style={styles.upgradeTitle}>Want more connections?</Text>
          <Text style={styles.upgradeText}>
            Upgrade to Premium to connect with up to 150 close friends and family members.
          </Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade Plan</Text>
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
  addButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    fontFamily: 'Inter-Regular',
  },
  tierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    gap: 6,
  },
  tierLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#374151',
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    fontFamily: 'Inter-SemiBold',
  },
  badge: {
    backgroundColor: '#DC2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  connectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  requestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  connectionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  connectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  connectionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: 'Inter-SemiBold',
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  tierText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  lastActive: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
    fontFamily: 'Inter-Regular',
  },
  mutualText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Inter-Regular',
  },
  requestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#7DB46C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  acceptButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  declineButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  declineButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    fontFamily: 'Inter-SemiBold',
  },
  upgradeSection: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  upgradeText: {
    fontSize: 14,
    color: '#3730A3',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
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
});