import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  StatusBar,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../shared/utils/constants/colors';

// Mock data for recent searches
const recentSearches = [
  { id: '1', username: '__shrutti__', profession: 'UI Designer' },
  { id: '2', username: 'erika_mateo', profession: 'Fashion Designer' },
  { id: '3', username: 'carmelita_marsham', profession: 'Drive' },
  { id: '4', username: '._tao_yi._', profession: 'Business Developers' },
  { id: '5', username: 'chineze.afamefuna', profession: 'Analyst' },
  { id: '6', username: 'darren_adams', profession: 'Photographer' },
  { id: '7', username: '_arkell_charles_', profession: 'Voice Artist' },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('amy_jasus');
  const [activeFilter, setActiveFilter] = useState('accounts');

  const filters = [
    { id: 'discover', label: 'Discover' },
    { id: 'accounts', label: 'Accounts' },
    { id: 'tag', label: 'Tag' },
  ];

  const renderFilterButton = (filter: any) => (
    <TouchableOpacity
      key={filter.id}
      style={[
        styles.filterButton,
        activeFilter === filter.id && styles.filterButtonActive
      ]}
      onPress={() => setActiveFilter(filter.id)}
    >
      <Text style={[
        styles.filterText,
        activeFilter === filter.id && styles.filterTextActive
      ]}>
        {filter.label}
      </Text>
    </TouchableOpacity>
  );

  const renderRecentSearch = (search: any) => (
    <View key={search.id} style={styles.recentSearchItem}>
      <View style={styles.recentSearchAvatar}>
        <Ionicons name="person" size={20} color={Colors.textLight} />
      </View>
      <View style={styles.recentSearchInfo}>
        <Text style={styles.recentSearchUsername}>{search.username}</Text>
        <Text style={styles.recentSearchProfession}>{search.profession}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="close" size={16} color={Colors.textLight} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={16} color={Colors.text} />
          <Ionicons name="wifi" size={16} color={Colors.text} />
          <Ionicons name="battery-full" size={16} color={Colors.text} />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search..."
            placeholderTextColor={Colors.textLight}
          />
          <TouchableOpacity>
            <Ionicons name="mic" size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {filters.map(renderFilterButton)}
      </View>

      {/* Recent Searches */}
      <View style={styles.recentContainer}>
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recent</Text>
          <TouchableOpacity>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.recentList} showsVerticalScrollIndicator={false}>
          {recentSearches.map(renderRecentSearch)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
    marginRight: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.borderLight,
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  filterTextActive: {
    color: Colors.textWhite,
  },
  recentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  clearAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  recentList: {
    flex: 1,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  recentSearchAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  recentSearchInfo: {
    flex: 1,
  },
  recentSearchUsername: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  recentSearchProfession: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  removeButton: {
    padding: 8,
  },
}); 