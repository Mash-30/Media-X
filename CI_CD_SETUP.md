# Media X CI/CD Pipeline Setup

## 🚀 Quick Start

### **Option 1: AWS Amplify Console (Recommended)**

1. **Go to AWS Amplify Console**: https://console.aws.amazon.com/amplify/
2. **Click "New app" → "Host web app"**
3. **Connect your Git repository** (GitHub/GitLab/Bitbucket)
4. **Select your repository and branch**
5. **Build settings**: Use the `amplify.yml` file (already created)
6. **Click "Save and deploy"**

### **Option 2: GitHub Actions**

1. **Add GitHub Secrets**:
   - Go to your GitHub repository → Settings → Secrets
   - Add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

2. **Push to trigger deployment**:
   ```bash
   git add .
   git commit -m "Add CI/CD pipeline"
   git push origin main
   ```

### **Option 3: Manual Deployment**

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Deploy to development
./scripts/deploy.sh

# Deploy to production
./scripts/deploy.sh prod
```

## 📁 Files Created

### **Build Configuration**
- `amplify.yml` - Amplify Console build settings
- `buildspec.yml` - AWS CodeBuild configuration
- `.github/workflows/amplify-deploy.yml` - GitHub Actions workflow

### **Deployment Scripts**
- `scripts/deploy.sh` - Manual deployment script
- `env.example` - Environment variables template

## 🔧 Configuration

### **Environment Variables**
Copy `env.example` to `.env` and update with your real values:
```bash
cp env.example .env
```

### **GitHub Secrets** (for GitHub Actions)
Add these in your GitHub repository settings:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### **AWS IAM Permissions**
Your IAM user needs these permissions:
- `AmplifyFullAccess`
- `CloudFormationFullAccess`
- `S3FullAccess`
- `LambdaFullAccess`
- `APIGatewayFullAccess`

## 🌍 Environments

### **Development**
- **Branch**: `develop`
- **Environment**: `dev`
- **URL**: `https://dev.yourapp.amplifyapp.com`

### **Production**
- **Branch**: `main`
- **Environment**: `prod`
- **URL**: `https://yourapp.amplifyapp.com`

## 🔄 Workflow

### **Automatic Deployment**
1. **Push to `develop`** → Deploy to dev environment
2. **Push to `main`** → Deploy to production
3. **Pull Request** → Create preview deployment

### **Manual Deployment**
```bash
# Development
./scripts/deploy.sh

# Production
./scripts/deploy.sh prod
```

## 📊 Monitoring

### **Build Status**
- Check Amplify Console for build logs
- Monitor GitHub Actions for workflow status
- View deployment history

### **Performance**
- Monitor build times
- Track deployment success rates
- Analyze bundle sizes

## 🛠️ Troubleshooting

### **Common Issues**

1. **Build Fails**
   ```bash
   # Check logs
   amplify console
   ```

2. **Environment Variables Missing**
   ```bash
   # Add in Amplify Console
   Settings → Environment variables
   ```

3. **AWS Credentials Error**
   ```bash
   # Reconfigure
   amplify configure
   ```

### **Debug Commands**
```bash
# Check Amplify status
amplify status

# View logs
amplify console

# Force push
amplify push --force
```

## 🎯 Next Steps

1. **Connect your Git repository** to Amplify Console
2. **Update environment variables** with real AWS values
3. **Test the pipeline** by pushing to your repository
4. **Monitor deployments** in Amplify Console

## 📞 Support

- **AWS Amplify Docs**: https://docs.amplify.aws/
- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **AWS CodeBuild Docs**: https://docs.aws.amazon.com/codebuild/

---

**Your CI/CD pipeline is ready! 🚀**

Just connect your Git repository and start deploying automatically! 