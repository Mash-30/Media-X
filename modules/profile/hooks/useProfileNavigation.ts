import { useNavigation } from '@react-navigation/native';
import { PROFILE_ROUTES, getProfileUrl, getUserPostsUrl, getUserSavedUrl, getUserTaggedUrl } from '../routes';

export const useProfileNavigation = () => {
  const navigation = useNavigation();

  const navigateToProfile = (userId?: string) => {
    if (userId) {
      navigation.navigate('Profile' as never, { userId } as never);
    } else {
      navigation.navigate('Profile' as never);
    }
  };

  const navigateToUserProfile = (userId: string) => {
    navigation.navigate('Profile' as never, { userId } as never);
  };

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile' as never);
  };

  const navigateToProfileSettings = () => {
    navigation.navigate('ProfileSettings' as never);
  };

  const navigateToUserPosts = (userId: string) => {
    navigation.navigate('Profile' as never, { 
      userId, 
      activeTab: 'posts' 
    } as never);
  };

  const navigateToUserSaved = (userId: string) => {
    navigation.navigate('Profile' as never, { 
      userId, 
      activeTab: 'saved' 
    } as never);
  };

  const navigateToUserTagged = (userId: string) => {
    navigation.navigate('Profile' as never, { 
      userId, 
      activeTab: 'tagged' 
    } as never);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return {
    navigateToProfile,
    navigateToUserProfile,
    navigateToEditProfile,
    navigateToProfileSettings,
    navigateToUserPosts,
    navigateToUserSaved,
    navigateToUserTagged,
    goBack,
  };
}; 