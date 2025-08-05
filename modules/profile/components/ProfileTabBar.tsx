import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TabType = 'posts' | 'saved' | 'tagged';

interface ProfileTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const ProfileTabBar: React.FC<ProfileTabBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { key: 'posts' as TabType, icon: 'grid-outline', label: 'Posts' },
    { key: 'saved' as TabType, icon: 'bookmark-outline', label: 'Saved' },
    { key: 'tagged' as TabType, icon: 'person-outline', label: 'Tagged' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            activeTab === tab.key && styles.activeTab,
          ]}
          onPress={() => onTabChange(tab.key)}
        >
          <Ionicons
            name={tab.icon as any}
            size={24}
            color={activeTab === tab.key ? '#262626' : '#8e8e93'}
          />
          {activeTab === tab.key && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  activeTab: {
    borderTopWidth: 1,
    borderTopColor: '#262626',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#262626',
  },
}); 