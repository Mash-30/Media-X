# Media X - Social Media Web Application

A modern React-based social media web application built with Vite.js, featuring a micro-frontend architecture and responsive design.

## 🚀 Features

### Core Features
- **Authentication System**: Login, signup, and password recovery
- **Social Feed**: Instagram-like feed with stories and posts
- **User Profiles**: Complete profile management with posts grid
- **Search & Discovery**: Advanced user search functionality
- **Messaging**: Real-time chat interface (coming soon)
- **Post Creation**: Rich post creation with cross-posting options
- **Responsive Design**: Mobile-first design approach

### Technical Features
- **Micro-frontend Architecture**: Modular component structure
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern utility-first styling
- **State Management**: Zustand for global state management
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router with protected routes
- **API Integration**: Axios with interceptors for authentication
- **Toast Notifications**: React Hot Toast for user feedback

## 🏗️ Architecture

### Project Structure
```
web-client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (Button, Input, etc.)
│   │   ├── layout/         # Layout components (Header, Navigation)
│   │   └── auth/           # Authentication components
│   ├── modules/            # Feature-based modules
│   │   ├── auth/           # Authentication module
│   │   ├── feed/           # Feed and posts module
│   │   ├── profile/        # User profiles module
│   │   ├── messaging/      # Messaging module
│   │   └── explore/        # Search and discovery module
│   ├── shared/             # Shared utilities and services
│   │   ├── stores/         # Global state stores
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   └── assets/             # Static assets
```

### Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion

## 🎨 Design System

### Color Palette
- **Primary**: `#00B894` (Teal/Green)
- **Background**: `#FFFFFF` (White)
- **Text**: `#1A1A1A` (Dark Gray)
- **Borders**: `#E5E5E5` (Light Gray)
- **Success**: `#00B894` (Green)
- **Error**: `#FF6B6B` (Red)
- **Warning**: `#FFA726` (Orange)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Buttons**: Primary, Secondary, Outline, Ghost variants
- **Inputs**: With icons, validation states, and helper text
- **Cards**: Consistent card components with shadows
- **Navigation**: Bottom navigation with active states

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🔐 Authentication

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `password`

### Features
- Email/password authentication
- Social login (Facebook, Google) - Mock implementation
- Password recovery
- Protected routes
- Persistent authentication state

## 📱 Pages & Features

### Authentication Pages
- **Login**: Email/password and social login
- **Signup**: User registration with validation
- **Forgot Password**: Password recovery flow

### Main Application
- **Home Feed**: Stories and posts with interactions
- **Search**: User discovery and search
- **Messages**: Chat conversations list
- **Profile**: User profile with posts grid
- **Create Post**: Post creation with cross-posting

## 🎯 Key Features

### Feed System
- **Stories**: Instagram-like stories with add functionality
- **Posts**: User posts with like, comment, share actions
- **Post Navigation**: Multi-post users with navigation arrows
- **Real-time Interactions**: Like feedback and engagement

### User Management
- **Profile Pages**: Complete user profiles with stats
- **Follow System**: Follow/unfollow functionality
- **User Search**: Advanced search with filters
- **Profile Editing**: Edit profile information

### Post System
- **Rich Content**: Text, images, and videos
- **Cross-posting**: Share to Facebook and Twitter
- **Privacy Settings**: Public/private post options
- **Engagement**: Likes, comments, and shares

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001/api
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette matching the design
- Custom animations and transitions
- Responsive breakpoints
- Component-specific utilities

## 🧪 Development

### Code Style
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting
- **TypeScript**: Strict type checking

### Component Development
- **Atomic Design**: Components follow atomic design principles
- **Props Interface**: All components have TypeScript interfaces
- **Default Props**: Sensible defaults for all components
- **Accessibility**: ARIA labels and keyboard navigation

### State Management
- **Zustand**: Lightweight state management
- **Persistent State**: Authentication state persists across sessions
- **Type Safety**: Fully typed state and actions

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Deploy to Netlify
1. Build the project
2. Upload the `dist` folder
3. Configure redirects for SPA routing

## 🔮 Future Enhancements

### Planned Features
- **Real-time Chat**: WebSocket integration for messaging
- **Image Upload**: Cloud storage integration
- **Video Support**: Video upload and playback
- **Notifications**: Push notifications
- **Dark Mode**: Theme switching
- **PWA**: Progressive Web App features

### Technical Improvements
- **Unit Tests**: Jest and React Testing Library
- **E2E Tests**: Cypress or Playwright
- **Performance**: Code splitting and lazy loading
- **SEO**: Meta tags and structured data
- **Analytics**: User behavior tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS** 