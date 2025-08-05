import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  StatusBar 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../shared/utils/constants/colors';
import { Button } from '../shared/components/ui/Button';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: "Welcome To the Fun",
    subtitle: "Media X",
    description: "Connect with friends and share your moments"
  },
  {
    id: 2,
    title: "Best Social App to",
    subtitle: "Make New Friends",
    description: "Discover amazing people around the world"
  },
  {
    id: 3,
    title: "Enjoy Your Life",
    subtitle: "Every Time, Every Where",
    description: "Share your adventures and experiences"
  }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace('/auth/login');
    }
  };

  const handleSkip = () => {
    router.replace('/auth/login');
  };

  const currentData = onboardingData[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Image Placeholder - Replace with actual image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="person" size={80} color={Colors.textLight} />
          </View>
        </View>
        
        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentData.title}</Text>
          <Text style={styles.subtitle}>{currentData.subtitle}</Text>
        </View>
        
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot
              ]}
            />
          ))}
        </View>
      </View>
      
      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <Button
          title="Next"
          onPress={handleNext}
          style={styles.nextButton}
          icon={
            <Ionicons 
              name="arrow-forward" 
              size={20} 
              color={Colors.textWhite} 
              style={{ marginRight: 8 }}
            />
          }
        />
      </View>
    </View>
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
    paddingTop: 60,
    paddingBottom: 20,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textWhite,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.4,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.background,
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
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.textWhite,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textWhite,
    opacity: 0.3,
    marginHorizontal: 4,
  },
  activeDot: {
    opacity: 1,
    backgroundColor: Colors.background,
  },
  bottomContainer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  nextButton: {
    width: '100%',
  },
}); 