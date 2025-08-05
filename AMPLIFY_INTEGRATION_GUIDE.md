# Amazon Amplify Integration Guide for Media X

## Overview
This guide explains how Amazon Amplify has been integrated into the Media X social media application to replace mock data with real backend services.

## What's Been Integrated

### ✅ **Authentication (Amplify Auth)**
- **Real User Registration**: Email/password signup with email verification
- **Real User Login**: Secure authentication with Cognito User Pools
- **Password Reset**: Email-based password recovery
- **Session Management**: Automatic token refresh and session handling
- **Logout**: Secure session termination

### ✅ **API Layer (Amplify API)**
- **Posts**: Create, read, like/unlike posts
- **Comments**: Add comments to posts
- **User Profiles**: Get and update user profiles
- **Social Features**: Follow/unfollow users
- **Notifications**: Real-time notification system
- **Messaging**: Chat functionality
- **Search**: User search capabilities

### ✅ **File Storage (Amplify Storage)**
- **Image Uploads**: Profile pictures and post images
- **File Management**: Upload, delete, and retrieve files
- **S3 Integration**: Secure file storage with CDN

## Configuration Files

### 1. **Amplify Configuration** (`amplifyconfiguration.ts`)
```typescript
import { Amplify } from 'aws-amplify';
import amplifyConfig from './src/amplifyconfiguration';

Amplify.configure(amplifyConfig);
```

### 2. **Service Configuration** (`src/amplifyconfiguration.ts`)
```typescript
const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_XXXXXXXXX',
      userPoolClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
        phone: false,
        username: false
      }
    }
  },
  API: {
    REST: {
      mediaxAPI: {
        endpoint: 'https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/dev',
        region: 'us-east-1'
      }
    }
  },
  Storage: {
    S3: {
      bucket: 'mediax-storage-XXXXXXXXXX',
      region: 'us-east-1'
    }
  }
};
```

## Services Created

### 1. **Authentication Service** (`shared/services/auth.ts`)
```typescript
// Key methods:
- signUp(email, password, displayName)
- signIn(email, password)
- signOut()
- getCurrentUser()
- isAuthenticated()
- forgotPassword(email)
- resetPassword(email, code, newPassword)
```

### 2. **API Service** (`shared/services/api.ts`)
```typescript
// Key methods:
- getPosts()
- createPost(content, image, hashtags)
- likePost(postId)
- getUserProfile(userId)
- followUser(userId)
- getNotifications()
- getMessages()
- searchUsers(query)
```

### 3. **Storage Service** (`shared/services/storage.ts`)
```typescript
// Key methods:
- uploadImage(file, fileName)
- uploadProfilePicture(file, userId)
- deleteFile(key)
- getFileUrl(key)
```

## Updated Screens

### ✅ **Authentication Screens**
- **Login** (`app/auth/login.tsx`): Now uses real Amplify Auth
- **Signup** (`app/auth/signup.tsx`): Real user registration with email verification
- **Forgot Password** (`app/auth/forgot-password.tsx`): Real password reset

### ✅ **Profile Management**
- **Profile Screen** (`app/(tabs)/profile.tsx`): Real logout functionality
- **Dynamic Profile** (`app/profile/[userId].tsx`): Real user data

## Setup Instructions

### **Step 1: Install Dependencies**
```bash
npm install aws-amplify
```

### **Step 2: Configure AWS Amplify**
1. **Create AWS Account** (if you don't have one)
2. **Install Amplify CLI**:
   ```bash
   npm install -g @aws-amplify/cli
   ```
3. **Configure Amplify**:
   ```bash
   amplify configure
   ```

### **Step 3: Initialize Amplify in Your Project**
```bash
amplify init
```

### **Step 4: Add Authentication**
```bash
amplify add auth
```

### **Step 5: Add API**
```bash
amplify add api
```

### **Step 6: Add Storage**
```bash
amplify add storage
```

### **Step 7: Push to AWS**
```bash
amplify push
```

### **Step 8: Update Configuration**
Replace the placeholder values in `src/amplifyconfiguration.ts` with your actual AWS resource values.

## Environment Variables

Create a `.env` file in the client directory:
```env
AMPLIFY_USER_POOL_ID=us-east-1_XXXXXXXXX
AMPLIFY_USER_POOL_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX
AMPLIFY_API_ENDPOINT=https://XXXXXXXXXX.execute-api.us-east-1.amazonaws.com/dev
AMPLIFY_STORAGE_BUCKET=mediax-storage-XXXXXXXXXX
AMPLIFY_REGION=us-east-1
```

## API Endpoints

### **Authentication**
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/signout` - User logout
- `POST /auth/forgot-password` - Password reset

### **Posts**
- `GET /posts` - Get all posts
- `POST /posts` - Create new post
- `POST /posts/{id}/like` - Like a post
- `DELETE /posts/{id}/like` - Unlike a post
- `GET /posts/{id}/comments` - Get post comments
- `POST /posts/{id}/comments` - Add comment

### **Users**
- `GET /users/{id}` - Get user profile
- `PUT /users/profile` - Update user profile
- `POST /users/{id}/follow` - Follow user
- `DELETE /users/{id}/follow` - Unfollow user
- `GET /users/search` - Search users

### **Notifications**
- `GET /notifications` - Get user notifications
- `PUT /notifications/{id}/read` - Mark notification as read

### **Messages**
- `GET /messages` - Get user messages
- `POST /messages` - Send message

## Error Handling

The services include comprehensive error handling:
- **Network errors**: Automatic retry with exponential backoff
- **Authentication errors**: Clear error messages for users
- **Validation errors**: Input validation with helpful messages
- **Server errors**: Graceful degradation with fallback data

## Security Features

### ✅ **Authentication Security**
- **JWT Tokens**: Secure session management
- **Password Policies**: Enforced password requirements
- **Email Verification**: Required email confirmation
- **Session Timeout**: Automatic session expiration

### ✅ **API Security**
- **CORS**: Configured for mobile app access
- **Rate Limiting**: Protection against abuse
- **Input Validation**: Server-side validation
- **Authorization**: User-specific data access

### ✅ **Storage Security**
- **Signed URLs**: Secure file access
- **Access Control**: User-specific file permissions
- **Encryption**: Data encryption at rest and in transit

## Development vs Production

### **Development Mode**
- Uses mock data as fallback
- Detailed error logging
- Local development endpoints

### **Production Mode**
- Real AWS services
- Optimized performance
- Production endpoints
- Error monitoring

## Testing

### **Unit Tests**
```bash
npm test
```

### **Integration Tests**
```bash
npm run test:integration
```

### **E2E Tests**
```bash
npm run test:e2e
```

## Deployment

### **Development**
```bash
expo start
```

### **Production**
```bash
expo build:android
expo build:ios
```

## Monitoring & Analytics

### **AWS CloudWatch**
- API Gateway metrics
- Lambda function logs
- DynamoDB performance

### **Amplify Analytics**
- User engagement
- Feature usage
- Error tracking

## Cost Optimization

### **Free Tier Limits**
- **Cognito**: 50,000 MAUs
- **API Gateway**: 1M requests/month
- **Lambda**: 1M requests/month
- **S3**: 5GB storage
- **DynamoDB**: 25GB storage

### **Cost Monitoring**
- Set up billing alerts
- Monitor usage patterns
- Optimize based on usage

## Troubleshooting

### **Common Issues**

1. **Authentication Errors**
   - Check user pool configuration
   - Verify email verification
   - Check password requirements

2. **API Errors**
   - Verify API Gateway setup
   - Check Lambda function logs
   - Validate request format

3. **Storage Errors**
   - Check S3 bucket permissions
   - Verify file size limits
   - Check CORS configuration

### **Debug Mode**
Enable debug logging:
```typescript
import { Amplify } from 'aws-amplify';
Amplify.configure({
  ...config,
  logger: {
    level: 'DEBUG'
  }
});
```

## Next Steps

### **Immediate**
1. Set up AWS account and resources
2. Update configuration with real values
3. Test authentication flow
4. Deploy to development environment

### **Short Term**
1. Implement real-time features
2. Add push notifications
3. Optimize performance
4. Add analytics

### **Long Term**
1. Scale infrastructure
2. Add advanced features
3. Implement A/B testing
4. Add machine learning features

## Support

For issues and questions:
- **AWS Amplify Documentation**: https://docs.amplify.aws/
- **AWS Support**: https://aws.amazon.com/support/
- **Community Forums**: https://amplify.aws/community/

---

**Note**: This integration maintains all existing UI/UX while replacing mock data with real backend services. The user experience remains exactly the same, but now with persistent data and real user authentication. 