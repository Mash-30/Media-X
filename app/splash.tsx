import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '../shared/utils/constants/colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  useEffect(() => {
    // Simulate splash screen delay
    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        {Array.from({ length: 20 }).map((_, index) => (
          <View key={index} style={styles.patternShape} />
        ))}
      </View>
      
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBackground}>
          <Text style={styles.logoText}>X</Text>
        </View>
      </View>
      
      {/* App Name */}
      <Text style={styles.appName}>MEDIA X</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  patternShape: {
    width: width / 4,
    height: height / 8,
    backgroundColor: Colors.primaryDark,
    opacity: 0.1,
    margin: 2,
    borderRadius: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    width: 80,
    height: 80,
    backgroundColor: Colors.primaryDark,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.textWhite,
    fontFamily: 'System',
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.textWhite,
    letterSpacing: 2,
  },
}); 