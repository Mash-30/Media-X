import { Amplify } from 'aws-amplify';

// Amplify configuration
const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.EXPO_PUBLIC_USER_POOL_ID || 'us-east-1_placeholder',
      userPoolClientId: process.env.EXPO_PUBLIC_USER_POOL_CLIENT_ID || 'placeholder',
      signUpVerificationMethod: 'code',
    }
  },
  API: {
    GraphQL: {
      endpoint: process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT || 'https://placeholder.appsync-api.us-east-1.amazonaws.com/graphql',
      region: process.env.EXPO_PUBLIC_AWS_REGION || 'us-east-1',
      defaultAuthMode: 'userPool',
    }
  },
  Storage: {
    S3: {
      bucket: process.env.EXPO_PUBLIC_S3_BUCKET || 'placeholder-bucket',
      region: process.env.EXPO_PUBLIC_AWS_REGION || 'us-east-1',
    }
  }
};

// Configure Amplify
Amplify.configure(amplifyConfig);

export default amplifyConfig; 