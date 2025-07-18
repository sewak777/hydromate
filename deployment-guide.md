# HydroMate Deployment Guide

## Quick Start - Custom Domain Setup

### Step 1: Choose Your Domain
Recommended domain names for HydroMate:
- **hydromate.com** (primary choice)
- **myhydromate.com**
- **hydromate.app**
- **stayhydromate.com**
- **hydromate.io**

### Step 2: Purchase Domain
1. Visit [Namecheap](https://namecheap.com) (recommended)
2. Search for your chosen domain
3. Purchase for ~$12/year
4. Keep domain registrar login details safe

### Step 3: Deploy to Vercel (Recommended)

#### Why Vercel?
- Free tier perfect for HydroMate
- Automatic SSL certificates
- Easy custom domain setup
- Great performance
- Built-in database support

#### Deployment Steps:

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy HydroMate**
   - Click "Import Project"
   - Connect your GitHub repo
   - Vercel will auto-detect settings
   - Click "Deploy"

3. **Configure Environment Variables**
   ```bash
   # Required for production
   NODE_ENV=production
   DATABASE_URL=your_production_database_url
   SESSION_SECRET=your_new_session_secret
   REPL_ID=your_repl_id
   OPENWEATHER_API_KEY=your_weather_api_key
   
   # Optional (for later)
   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

4. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add your domain (e.g., hydromate.com)
   - Follow DNS setup instructions

5. **Configure DNS**
   In your domain registrar (Namecheap):
   ```
   Type: A
   Host: @
   Value: 76.76.19.61 (Vercel's IP)
   
   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   ```

### Step 4: Database Setup

#### Option 1: Vercel Postgres (Recommended)
- Free tier: 256MB storage
- Automatic backups
- Built-in connection pooling
- Easy to set up

#### Option 2: Neon (Alternative)
- Free tier: 3GB storage
- Serverless PostgreSQL
- Good for scaling

#### Setup Steps:
1. In Vercel dashboard, go to Storage
2. Create new Postgres database
3. Copy connection string
4. Add to environment variables as `DATABASE_URL`

### Step 5: Test Your Custom Domain

Once deployed, test these URLs:
- **https://hydromate.com** - Landing page
- **https://hydromate.com/api/login** - Authentication
- **https://hydromate.com/admin** - Admin panel

### Step 6: Update Application Settings

The app automatically detects custom domains and adjusts all URLs. No code changes needed!

## Alternative Deployment Options

### Option B: Railway
- $5/month minimum
- Excellent for full-stack apps
- Built-in PostgreSQL
- Easy deployment

### Option C: Netlify
- Free tier available
- Good for static sites
- Functions support
- Easy custom domains

### Option D: DigitalOcean
- $5/month minimum
- More control
- Better for scaling
- Requires more setup

## Production Checklist

### Before Going Live:
- [ ] Domain purchased and configured
- [ ] SSL certificate working (automatic with Vercel)
- [ ] Database connected and tested
- [ ] Environment variables set
- [ ] All features tested on custom domain
- [ ] Admin panel access confirmed
- [ ] User registration working
- [ ] Email notifications configured (optional)

### Security Checklist:
- [ ] HTTPS enabled everywhere
- [ ] Secure session configuration
- [ ] Rate limiting active
- [ ] CORS properly configured
- [ ] Input validation working
- [ ] SQL injection protection enabled

## Cost Breakdown

### Minimal Setup (Recommended):
- **Domain**: $12/year (Namecheap)
- **Hosting**: Free (Vercel)
- **Database**: Free (Vercel Postgres)
- **SSL**: Free (Vercel)
- **Total**: $1/month

### Professional Setup:
- **Domain**: $12/year
- **Hosting**: $20/month (Vercel Pro)
- **Database**: $29/month (Vercel Postgres Pro)
- **Monitoring**: $9/month (Sentry)
- **Total**: $60/month

## Troubleshooting

### Common Issues:

1. **DNS Not Working**
   - Wait 24-48 hours for DNS propagation
   - Check DNS settings in registrar
   - Verify A records point to correct IP

2. **SSL Certificate Issues**
   - Vercel handles this automatically
   - May take 24 hours to provision
   - Check domain validation

3. **Database Connection**
   - Verify DATABASE_URL format
   - Check database permissions
   - Test connection strings

4. **Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify values are correct

## Next Steps After Deployment

1. **Monitor Performance**
   - Set up error tracking
   - Monitor uptime
   - Track user metrics

2. **Set Up Analytics**
   - Google Analytics
   - Vercel Analytics
   - User behavior tracking

3. **Email Integration**
   - Notification emails
   - User onboarding
   - Admin alerts

4. **Mobile App**
   - iOS App Store
   - Google Play Store
   - PWA optimization

## Support

If you need help with deployment:
1. Check Vercel documentation
2. Review DNS propagation status
3. Test environment variables
4. Verify database connectivity

Your HydroMate app is production-ready and will work perfectly with a custom domain!