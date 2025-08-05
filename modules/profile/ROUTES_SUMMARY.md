# Profile Module Routes & Navigation

## 📍 **Main Profile Routes**

### **Primary Routes**
```
/profile                    # Current user's profile
/profile/:userId           # Specific user's profile
```

### **Profile Sub-Routes**
```
/profile/edit              # Edit profile page
/profile/settings          # Profile settings page
```

### **User-Specific Routes**
```
/profile/:userId/posts     # User's posts tab
/profile/:userId/saved     # User's saved posts tab
/profile/:userId/tagged    # User's tagged posts tab
```

### **Profile Actions**
```
/profile/:userId/follow    # Follow user
/profile/:userId/unfollow  # Unfollow user
```

## 🧭 **Navigation Usage**

### **Using the Navigation Hook**
```tsx
import { useProfileNavigation } from './modules/profile/hooks/useProfileNavigation';

const MyComponent = () => {
  const { navigateToProfile, navigateToUserProfile } = useProfileNavigation();
  
  // Navigate to own profile
  navigateToProfile();
  
  // Navigate to specific user's profile
  navigateToUserProfile('user123');
};
```

### **Direct Route Access**
```tsx
import { PROFILE_ROUTES } from './modules/profile/routes';

// Access route constants
const profileUrl = PROFILE_ROUTES.PROFILE;           // '/profile'
const userProfileUrl = PROFILE_ROUTES.USER_PROFILE;  // '/profile/:userId'
```

### **URL Generation Helpers**
```tsx
import { getProfileUrl, getUserPostsUrl } from './modules/profile/routes';

const profileUrl = getProfileUrl('user123');        // '/profile/user123'
const postsUrl = getUserPostsUrl('user123');        // '/profile/user123/posts'
```

## 🎯 **Route Parameters**

### **Profile Route Parameters**
```tsx
// Route: /profile/:userId
{
  userId: string;          // User ID for specific user profile
  activeTab?: 'posts' | 'saved' | 'tagged';  // Active tab selection
}
```

### **Navigation State**
```tsx
// Navigation state for profile
{
  userId?: string;         // Optional user ID
  activeTab?: string;      // Active tab (posts, saved, tagged)
  isOwnProfile?: boolean;  // Whether viewing own profile
}
```

## 🔗 **Integration with Main App**

### **Tab Navigation**
The profile is integrated as a tab in the main bottom tab navigator:
- **Tab Name**: `Profile`
- **Tab Icon**: `person-outline` / `person`
- **Route**: `/profile`

### **Stack Navigation**
Profile can be accessed via:
- Bottom tab navigation
- Direct navigation from other screens
- Deep linking

## 📱 **Usage Examples**

### **1. Navigate to Own Profile**
```tsx
const { navigateToProfile } = useProfileNavigation();
navigateToProfile();
```

### **2. Navigate to User Profile**
```tsx
const { navigateToUserProfile } = useProfileNavigation();
navigateToUserProfile('user123');
```

### **3. Navigate to User's Posts**
```tsx
const { navigateToUserPosts } = useProfileNavigation();
navigateToUserPosts('user123');
```

### **4. Navigate to Edit Profile**
```tsx
const { navigateToEditProfile } = useProfileNavigation();
navigateToEditProfile();
```

### **5. Deep Link to Profile**
```tsx
// Deep link URL examples:
// myapp://profile
// myapp://profile/user123
// myapp://profile/user123/posts
```

## 🎨 **Route Styling**

### **Tab Bar Configuration**
```tsx
{
  tabBarIcon: ({ focused, color, size }) => (
    <Ionicons 
      name={focused ? 'person' : 'person-outline'} 
      size={size} 
      color={color} 
    />
  ),
  tabBarActiveTintColor: '#007AFF',
  tabBarInactiveTintColor: '#666',
}
```

## 🚀 **Quick Start**

1. **Import the ProfilePage**:
```tsx
import { ProfilePage } from './modules/profile/pages/ProfilePage';
```

2. **Add to Navigation**:
```tsx
<Tab.Screen name="Profile" component={ProfilePage} />
```

3. **Use Navigation Hook**:
```tsx
const { navigateToProfile } = useProfileNavigation();
```

4. **Access Routes**:
```tsx
import { PROFILE_ROUTES } from './modules/profile/routes';
```

## 📋 **Route Summary Table**

| Route | Description | Parameters |
|-------|-------------|------------|
| `/profile` | Own profile | None |
| `/profile/:userId` | User profile | `userId` |
| `/profile/edit` | Edit profile | None |
| `/profile/settings` | Profile settings | None |
| `/profile/:userId/posts` | User's posts | `userId` |
| `/profile/:userId/saved` | User's saved | `userId` |
| `/profile/:userId/tagged` | User's tagged | `userId` | 