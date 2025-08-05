import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../shared/utils/constants/colors';
import { router, useLocalSearchParams } from 'expo-router';

// Mock data for chat messages
const mockMessages = [
  {
    id: '1',
    text: 'Hey! How are you doing?',
    time: '2:30 PM',
    isFromMe: false,
    isRead: true
  },
  {
    id: '2',
    text: 'I\'m doing great! Thanks for asking. How about you?',
    time: '2:32 PM',
    isFromMe: true,
    isRead: true
  },
  {
    id: '3',
    text: 'Pretty good! Just working on some new projects.',
    time: '2:35 PM',
    isFromMe: false,
    isRead: true
  },
  {
    id: '4',
    text: 'That sounds interesting! What kind of projects?',
    time: '2:36 PM',
    isFromMe: true,
    isRead: true
  },
  {
    id: '5',
    text: 'Mostly web development and mobile apps. I\'m learning React Native right now.',
    time: '2:38 PM',
    isFromMe: false,
    isRead: true
  },
  {
    id: '6',
    text: 'That\'s awesome! React Native is really powerful.',
    time: '2:40 PM',
    isFromMe: true,
    isRead: false
  }
];

export default function ChatInboxScreen() {
  const params = useLocalSearchParams();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Extract user info from params
  const userInfo = {
    username: params.username as string || 'sarah_wilson',
    displayName: params.displayName as string || 'Sarah Wilson',
    isOnline: params.isOnline === 'true' || false
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFromMe: true,
        isRead: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate received message
        const reply = {
          id: (Date.now() + 1).toString(),
          text: 'Thanks for the message! I\'ll get back to you soon.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFromMe: false,
          isRead: true
        };
        setMessages(prev => [...prev, reply]);
      }, 2000);
    }
  };

  const renderMessage = (message: any) => (
    <View key={message.id} style={[
      styles.messageContainer,
      message.isFromMe ? styles.messageFromMe : styles.messageFromOther
    ]}>
      <View style={[
        styles.messageBubble,
        message.isFromMe ? styles.bubbleFromMe : styles.bubbleFromOther
      ]}>
        <Text style={[
          styles.messageText,
          message.isFromMe ? styles.textFromMe : styles.textFromOther
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.messageTime,
          message.isFromMe ? styles.timeFromMe : styles.timeFromOther
        ]}>
          {message.time}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={Colors.textLight} />
            </View>
            {userInfo.isOnline && (
              <View style={styles.onlineIndicator} />
            )}
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userInfo.displayName}</Text>
            <Text style={styles.userStatus}>
              {userInfo.isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.messagesContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map(renderMessage)}
          
          {isTyping && (
            <View style={styles.typingContainer}>
              <View style={styles.typingBubble}>
                <Text style={styles.typingText}>typing...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="add" size={24} color={Colors.primary} />
          </TouchableOpacity>
          
          <View style={styles.messageInputContainer}>
            <TextInput
              style={styles.messageInput}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              placeholderTextColor={Colors.textLight}
              multiline
              maxLength={500}
            />
          </View>
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !newMessage.trim() && styles.sendButtonDisabled
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={newMessage.trim() ? Colors.textWhite : Colors.textLight} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  userStatus: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  moreButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    marginBottom: 12,
  },
  messageFromMe: {
    alignItems: 'flex-end',
  },
  messageFromOther: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  bubbleFromMe: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleFromOther: {
    backgroundColor: Colors.borderLight,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  textFromMe: {
    color: Colors.textWhite,
  },
  textFromOther: {
    color: Colors.text,
  },
  messageTime: {
    fontSize: 11,
  },
  timeFromMe: {
    color: Colors.textWhite,
    opacity: 0.8,
  },
  timeFromOther: {
    color: Colors.textSecondary,
  },
  typingContainer: {
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  typingBubble: {
    backgroundColor: Colors.borderLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
  },
  typingText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  messageInputContainer: {
    flex: 1,
    backgroundColor: Colors.borderLight,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  messageInput: {
    fontSize: 16,
    color: Colors.text,
    paddingVertical: 4,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: Colors.borderLight,
  },
}); 