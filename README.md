# Media X - Social Media App

A React Native/Expo social media application built with a modern micro-frontend architecture.

## 🎯 Features Implemented

### **Authentication Flow**
- ✅ Splash Screen with Media X branding
- ✅ Onboarding screens (3 screens with navigation)
- ✅ Login screen with form validation
- ✅ Sign up screen with account creation
- ✅ Forgot password screen

### **Main App Features**
- ✅ Social media feed with posts and stories
- ✅ Search functionality with filters
- ✅ Create post screen with cross-posting options
- ✅ Bottom navigation (Home, Messages, Search, Profile)
- ✅ Modern UI with teal/green theme

### **Design System**
- ✅ Consistent color scheme matching the design
- ✅ Reusable UI components (Button, Input)
- ✅ Proper typography and spacing
- ✅ Responsive layouts

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Install dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on your preferred platform:**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for Web browser

## 📱 App Flow

1. **Splash Screen** → Shows Media X branding
2. **Onboarding** → 3 screens introducing the app
3. **Authentication** → Login/Signup screens
4. **Main App** → Feed, Search, Messages, Profile

## 🎨 Design Features

### **Color Scheme**
- Primary: `#00B894` (Teal/Green)
- Background: `#FFFFFF` (White)
- Text: `#1A1A1A` (Dark Gray)
- Accents: Various shades for different states

### **Components**
- **Button**: Primary, secondary, and outline variants
- **Input**: Text inputs with icons and validation
- **Navigation**: Bottom tab navigation
- **Cards**: Post cards with user info and actions

## 🏗️ Architecture

The app follows a micro-frontend architecture with:

- **Shared Layer**: Common components, utilities, and services
- **Modules**: Feature-specific components (auth, feed, etc.)
- **Shell**: Main app container and navigation

## 📁 Project Structure

```
client/
├── app/                    # Main app screens
│   ├── (tabs)/           # Tab navigation screens
│   ├── auth/             # Authentication screens
│   ├── splash.tsx        # Splash screen
│   ├── onboarding.tsx    # Onboarding flow
│   └── create-post.tsx   # Post creation
├── shared/               # Shared components and utilities
│   ├── components/       # Reusable UI components
│   └── utils/           # Constants and helpers
└── modules/             # Feature modules (micro-frontend)
```

## 🔧 Development

### **Adding New Screens**
1. Create the screen component in the appropriate directory
2. Add the route to `app/_layout.tsx`
3. Update navigation as needed

### **Styling**
- Use the `Colors` constant for consistent theming
- Follow the existing component patterns
- Use the shared UI components when possible

### **State Management**
- Currently using React hooks for local state
- Ready for integration with Redux or Context API

## 🚀 Next Steps

### **Phase 1: Core Features**
- [ ] Implement real authentication
- [ ] Add image upload functionality
- [ ] Create real post creation flow
- [ ] Add comments and likes functionality

### **Phase 2: Advanced Features**
- [ ] Real-time messaging
- [ ] Push notifications
- [ ] User profiles
- [ ] Story creation

### **Phase 3: Performance**
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Caching strategies
- [ ] Performance monitoring

## 📱 Screenshots

The app includes screens matching the provided design images:
- Splash screen with Media X branding
- Onboarding flow with user portraits
- Authentication screens (login, signup, forgot password)
- Social media feed with posts and stories
- Search functionality with filters
- Post creation with cross-posting options

## 🛠️ Technologies Used

- **React Native** with Expo
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Ionicons** for icons
- **React Hooks** for state management

## 📄 License

This project is part of a social media application implementation.
