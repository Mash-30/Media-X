import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  StatusBar,
  SafeAreaView,
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../shared/utils/constants/colors';

export default function CreatePostScreen() {
  const [postText, setPostText] = useState('Hello Guys,\nI would love to share a fine adventure trip in kashmir hope you guys like it\n\n#travel #time #tranding');
  const [facebookEnabled, setFacebookEnabled] = useState(false);
  const [twitterEnabled, setTwitterEnabled] = useState(false);

  const handlePost = () => {
    // Handle post creation
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose}>
          <Ionicons name="close" size={24} color={Colors.textWhite} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Post</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.postButton}>Post</Text>
        </TouchableOpacity>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={20} color={Colors.textLight} />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.username}>chineze_afamefuna</Text>
            <TouchableOpacity style={styles.privacyButton}>
              <Text style={styles.privacyText}>Public</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Post Input */}
        <View style={styles.postInputContainer}>
          <TextInput
            style={styles.postInput}
            value={postText}
            onChangeText={setPostText}
            placeholder="What's on your mind?"
            placeholderTextColor={Colors.textLight}
            multiline
            textAlignVertical="top"
          />
        </View>
        
        {/* Cross-posting Options */}
        <View style={styles.crossPostContainer}>
          <Text style={styles.crossPostTitle}>Also post on</Text>
          
          <View style={styles.platformOption}>
            <View style={styles.platformInfo}>
              <Ionicons name="logo-facebook" size={20} color={Colors.text} />
              <Text style={styles.platformText}>Facebook</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, facebookEnabled && styles.toggleActive]}
              onPress={() => setFacebookEnabled(!facebookEnabled)}
            >
              <View style={[styles.toggleThumb, facebookEnabled && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.platformOption}>
            <View style={styles.platformInfo}>
              <Ionicons name="logo-twitter" size={20} color={Colors.text} />
              <Text style={styles.platformText}>Twitter</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, twitterEnabled && styles.toggleActive]}
              onPress={() => setTwitterEnabled(!twitterEnabled)}
            >
              <View style={[styles.toggleThumb, twitterEnabled && styles.toggleThumbActive]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  postButton: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  privacyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  privacyText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textWhite,
    marginRight: 4,
  },
  postInputContainer: {
    marginBottom: 24,
  },
  postInput: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  crossPostContainer: {
    marginBottom: 24,
  },
  crossPostTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  platformOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  toggle: {
    width: 44,
    height: 24,
    backgroundColor: Colors.border,
    borderRadius: 12,
    padding: 2,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    backgroundColor: Colors.background,
    borderRadius: 10,
  },
  toggleThumbActive: {
    backgroundColor: Colors.textWhite,
    transform: [{ translateX: 20 }],
  },
}); 