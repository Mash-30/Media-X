#!/bin/bash

# Media X CI/CD Deployment Script
echo "🚀 Starting Media X deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Install Amplify CLI
echo "🔧 Installing Amplify CLI..."
npm install -g @aws-amplify/cli

# Initialize Amplify (if not already done)
if [ ! -d ".amplify" ]; then
    echo "⚙️ Initializing Amplify..."
    amplify init --yes
fi

# Determine environment
if [ "$1" = "prod" ]; then
    ENV="prod"
    echo "🏭 Deploying to PRODUCTION..."
else
    ENV="dev"
    echo "🔬 Deploying to DEVELOPMENT..."
fi

# Checkout environment
echo "🔄 Checking out $ENV environment..."
amplify env checkout $ENV --yes

# Push changes to AWS
echo "⬆️ Pushing to AWS..."
amplify push --yes

# Build the app
echo "🔨 Building the app..."
npm run build

# Deploy to Amplify
echo "🚀 Deploying to Amplify..."
amplify publish --yes

echo "✅ Deployment completed successfully!"
echo "🌐 Your app is now live on AWS Amplify!" 