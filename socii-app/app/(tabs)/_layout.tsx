import { Tabs } from 'expo-router';
import { Chrome as Home, Users, Plus, Bell, User } from 'lucide-react-native';
import { StyleSheet, Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#6B9BD2',
        tabBarInactiveTintColor: '#8E9AAF',
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: 'Connections',
          tabBarIcon: ({ size, color }) => (
            <Users size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-post"
        options={{
          title: 'Post',
          tabBarIcon: ({ size, color }) => (
            <Plus size={size + 4} color={color} strokeWidth={2} />
          ),
          tabBarLabelStyle: [styles.tabBarLabel, styles.centerTabLabel],
          tabBarIconStyle: styles.centerTabIcon,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ size, color }) => (
            <Bell size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 34 : 8,
    height: Platform.OS === 'ios' ? 88 : 68,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Inter-Medium',
  },
  centerTabLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  centerTabIcon: {
    backgroundColor: '#6B9BD2',
    borderRadius: 20,
    padding: 8,
  },
});