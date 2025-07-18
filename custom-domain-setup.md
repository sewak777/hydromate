# Custom Domain Setup for HydroMate

## Overview
This guide will help you set up a custom domain (like hydromate.com) for your HydroMate application.

## Step 1: Choose and Purchase Your Domain

### Recommended Domain Names
- **hydromate.com** (if available)
- **myhydromate.com** 
- **hydromate.app**
- **stayhydromate.com**
- **hydromate.io**

### Domain Registrars
- **Namecheap** (recommended - affordable, good interface)
- **GoDaddy** (popular, more expensive)
- **Cloudflare** (good integration with hosting)
- **Google Domains** (now part of Squarespace)

## Step 2: Choose Deployment Platform

### Option A: Vercel (Recommended)
- **Pros**: Free tier, excellent Next.js support, easy custom domains
- **Cons**: Serverless functions have limitations
- **Cost**: Free for personal projects, $20/month for pro

### Option B: Netlify
- **Pros**: Great for static sites, good CI/CD
- **Cons**: Less ideal for full-stack apps
- **Cost**: Free tier available

### Option C: Railway
- **Pros**: Excellent for full-stack apps, PostgreSQL support
- **Cons**: More expensive than others
- **Cost**: $5/month minimum

### Option D: DigitalOcean App Platform
- **Pros**: Good performance, database support
- **Cons**: Less beginner-friendly
- **Cost**: $5/month minimum

## Step 3: Deploy Your App

### For Vercel Deployment:

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy from your project directory**:
```bash
vercel --prod
```

4. **Configure Environment Variables** in Vercel dashboard:
   - DATABASE_URL
   - SESSION_SECRET
   - REPL_ID
   - OPENWEATHER_API_KEY
   - STRIPE_SECRET_KEY (when ready)

### For Railway Deployment:

1. **Connect GitHub repository** to Railway
2. **Add environment variables**
3. **Deploy with one click**

## Step 4: Configure Custom Domain

### In Vercel:
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., hydromate.com)
4. Configure DNS records as instructed

### DNS Configuration:
```
Type: A
Name: @
Value: [Vercel IP provided]

Type: CNAME
Name: www
Value: [your-app].vercel.app
```

## Step 5: Update Application Configuration

### Environment Variables for Production:
```bash
# Production Domain
REPLIT_DOMAINS=hydromate.com,www.hydromate.com

# Database (use production database)
DATABASE_URL=your_production_postgresql_url

# Session Secret (generate new one)
SESSION_SECRET=your_production_session_secret

# OAuth Configuration
REPL_ID=your_production_repl_id

# Weather API
OPENWEATHER_API_KEY=your_api_key

# Production Mode
NODE_ENV=production
```

### Update Domain Configuration:
The app will automatically detect your custom domain and adjust all URLs accordingly.

## Step 6: SSL Certificate
Most platforms (Vercel, Netlify, Railway) automatically provision SSL certificates for custom domains.

## Step 7: Test Your Custom Domain

### Verify these work:
- **https://hydromate.com** (your landing page)
- **https://hydromate.com/api/login** (authentication)
- **https://hydromate.com/admin** (admin panel)

### Test Features:
- User registration and login
- Hydration tracking
- Weather integration
- Database connectivity
- Admin panel access

## Step 8: Additional Configuration

### Email Setup (Optional):
- Configure email service for notifications
- Set up contact forms

### Analytics (Optional):
- Google Analytics
- Plausible Analytics
- Vercel Analytics

### Monitoring:
- Set up uptime monitoring
- Error tracking (Sentry)
- Performance monitoring

## Cost Estimate

### Minimum Monthly Cost:
- **Domain**: $1-2/month ($12-24/year)
- **Hosting**: $0-5/month (free tier or basic plan)
- **Database**: $0-5/month (if separate)
- **Total**: $1-12/month

### Recommended Setup:
- **Domain**: Namecheap (~$12/year)
- **Hosting**: Vercel (free tier)
- **Database**: Vercel Postgres (free tier)
- **Total**: ~$1/month

## Security Considerations

### Production Checklist:
- [ ] Use HTTPS everywhere
- [ ] Secure environment variables
- [ ] Enable CORS properly
- [ ] Set up proper session security
- [ ] Configure security headers
- [ ] Set up rate limiting
- [ ] Regular security updates

## Migration Steps

### From Replit to Custom Domain:
1. **Export your data** (users, hydration logs)
2. **Set up production database**
3. **Deploy application**
4. **Import data to production**
5. **Test thoroughly**
6. **Switch DNS to new domain**

## Recommended Domain Names

Based on your app, here are some suggestions:
- **hydromate.com** (primary choice)
- **hydromate.app**
- **stayhydromate.com**
- **myhydromate.com**
- **hydromate.io**

## Next Steps

1. **Choose your domain name**
2. **Purchase from registrar**
3. **Choose deployment platform**
4. **Set up deployment**
5. **Configure custom domain**
6. **Test everything**
7. **Go live!**

Would you like me to help you with any specific step in this process?