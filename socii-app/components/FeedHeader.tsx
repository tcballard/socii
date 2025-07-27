import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, Users } from 'lucide-react-native';

export function FeedHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.logoSection}>
        <Heart size={28} color="#6B9BD2" strokeWidth={2} fill="#6B9BD2" />
        <Text style={styles.logoText}>Socii</Text>
      </View>
      
      <View style={styles.statusSection}>
        <View style={styles.connectionCounter}>
          <Users size={16} color="#7DB46C" strokeWidth={2} />
          <Text style={styles.connectionText}>24/50</Text>
        </View>
        <View style={styles.tierBadge}>
          <Text style={styles.tierText}>Family</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 8,
    fontFamily: 'Inter-Bold',
  },
  statusSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  connectionCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  connectionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#166534',
    marginLeft: 4,
    fontFamily: 'Inter-SemiBold',
  },
  tierBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  tierText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1D4ED8',
    fontFamily: 'Inter-SemiBold',
  },
});