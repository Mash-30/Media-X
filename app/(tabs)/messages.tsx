import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../shared/utils/constants/colors';
import { router } from 'expo-router';

// Mock data for messages
const messages = [
  {
    id: '1',
    user: {
      username: 'sarah_wilson',
      displayName: 'Sarah Wilson',
      avatar: 'https://via.placeholder.com/50',
      isOnline: true,
      lastSeen: '2 min ago'
    },
    lastMessage: {
      text: 'Hey! How are you doing?',
      time: '2:30 PM',
      isRead: false,
      isFromMe: false
    },
    unreadCount: 2
  },
  {
    id: '2',
    user: {
      username: 'mike_chen',
      displayName: 'Mike Chen',
      avatar: 'https://via.placeholder.com/50',
      isOnline: false,
      lastSeen: '1 hour ago'
    },
    lastMessage: {
      text: 'Thanks for the help!',
      time: '1:45 PM',
      isRead: true,
      isFromMe: true
    },
    unreadCount: 0
  },
  {
    id: '3',
    user: {
      username: 'emma_davis',
      displayName: 'Emma Davis',
      avatar: 'https://via.placeholder.com/50',
      isOnline: true,
      lastSeen: '5 min ago'
    },
    lastMessage: {
      text: 'Can we meet tomorrow?',
      time: '12:20 PM',
      isRead: false,
      isFromMe: false
    },
    unreadCount: 1
  },
  {
    id: '4',
    user: {
      username: 'alex_johnson',
      displayName: 'Alex Johnson',
      avatar: 'https://via.placeholder.com/50',
      isOnline: false,
      lastSeen: '3 hours ago'
    },
    lastMessage: {
      text: 'Great photo!',
      time: '11:15 AM',
      isRead: true,
      isFromMe: false
    },
    unreadCount: 0
  },
  {
    id: '5',
    user: {
      username: 'lisa_brown',
      displayName: 'Lisa Brown',
      avatar: 'https://via.placeholder.com/50',
      isOnline: true,
      lastSeen: '1 min ago'
    },
    lastMessage: {
      text: 'I sent you the files',
      time: '10:30 AM',
      isRead: true,
      isFromMe: true
    },
    unreadCount: 0
  }
];

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState(messages);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredMessages(messages);
    } else {
      const filtered = messages.filter(message =>
        message.user.displayName.toLowerCase().includes(query.toLowerCase()) ||
        message.user.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMessages(filtered);
    }
  };

  const renderMessageItem = (message: any) => (
    <TouchableOpacity 
      key={message.id} 
      style={styles.messageItem}
             onPress={() => {
         router.push({
           pathname: '/chat-inbox',
           params: {
             username: message.user.username,
             displayName: message.user.displayName,
             isOnline: message.user.isOnline.toString()
           }
         });
       }}
               onLongPress={() => {
          router.push({
            pathname: '/profile/[userId]',
            params: { userId: message.user.username }
          });
        }}
    >
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={24} color={Colors.textLight} />
        </View>
        {message.user.isOnline && (
          <View style={styles.onlineIndicator} />
        )}
      </View>

      {/* Message Content */}
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{message.user.displayName}</Text>
          <Text style={styles.messageTime}>{message.lastMessage.time}</Text>
        </View>
        
        <View style={styles.messagePreview}>
          <Text 
            style={[
              styles.messageText,
              !message.lastMessage.isRead && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {message.lastMessage.isFromMe && 'You: '}
            {message.lastMessage.text}
          </Text>
          
          {message.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{message.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.newMessageButton}>
          <Ionicons name="create-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Search messages..."
            placeholderTextColor={Colors.textLight}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close" size={20} color={Colors.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Messages List */}
      <ScrollView style={styles.messagesList} showsVerticalScrollIndicator={false}>
        {filteredMessages.length > 0 ? (
          filteredMessages.map(renderMessageItem)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubble-outline" size={48} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>No messages found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? 'Try a different search term' : 'Start a conversation with friends'}
            </Text>
          </View>
        )}
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  newMessageButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  messagesList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  messageTime: {
    fontSize: 12,
    color: Colors.textLight,
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  unreadMessage: {
    color: Colors.text,
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 12,
    color: Colors.textWhite,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
}); 