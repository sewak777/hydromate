# HydroMate Deployment to hydromate.ca

## 🚀 Quick Deployment Guide

Your HydroMate application is ready for deployment to your custom Canadian domain `hydromate.ca`.

### Pre-Deployment Status ✅
- ✅ GitHub Repository: `sewak777/hydromate` (1,662 files uploaded)
- ✅ Production Build: Tailwind CSS issues resolved
- ✅ Authentication: Working with demo system
- ✅ Water Logging: Fixed and functional
- ✅ Database: PostgreSQL schema ready
- ✅ Security: Production hardened

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import project: `sewak777/hydromate`

2. **Configure Build Settings**
   ```
   Framework: Other
   Build Command: node build.js
   Output Directory: dist/public
   Node.js Version: 18.x
   ```

3. **Environment Variables**
   Add these to Vercel's environment variables:
   ```
   DATABASE_URL=your_neon_database_url
   OPENWEATHER_API_KEY=your_openweather_key
   SESSION_SECRET=your-secure-session-secret-key
   REPL_ID=your-app-identifier
   REPLIT_DOMAINS=hydromate.ca,www.hydromate.ca
   ISSUER_URL=https://replit.com/oidc
   NODE_ENV=production
   ```

4. **Custom Domain Setup**
   - Go to Project Settings → Domains
   - Add `hydromate.ca`
   - Add `www.hydromate.ca`
   - Update DNS records (see DNS section below)

### Option 2: Netlify

1. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - New site from Git → GitHub → `sewak777/hydromate`

2. **Build Settings**
   ```
   Build command: node build.js
   Publish directory: dist/public
   ```

3. **Environment Variables**
   Add the same environment variables as above

4. **Custom Domain**
   - Domain settings → Add custom domain → `hydromate.ca`

## DNS Configuration for hydromate.ca

### For Vercel:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

### For Netlify:
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

## GoDaddy DNS Setup (Your Domain Registrar)

1. Log into GoDaddy
2. Go to My Products → Domain → DNS
3. Update DNS records:
   - Delete existing A records for @ and www
   - Add new records as shown above
4. Changes take 24-48 hours to propagate

## Required Environment Variables

You'll need these secrets for production:

```env
# Database (Required)
DATABASE_URL=postgresql://user:pass@host:5432/db

# Weather API (Required) 
OPENWEATHER_API_KEY=your_api_key

# Authentication (Required)
SESSION_SECRET=long-random-secret-key
REPL_ID=hydromate-app
REPLIT_DOMAINS=hydromate.ca,www.hydromate.ca

# Optional - Stripe for payments
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Post-Deployment Checklist

After deployment:

1. **Test Core Features**
   - [ ] User registration/login
   - [ ] Water logging functionality
   - [ ] Weather-based recommendations
   - [ ] Progress analytics
   - [ ] Mobile PWA installation

2. **Domain Verification**
   - [ ] `https://hydromate.ca` loads correctly
   - [ ] `https://www.hydromate.ca` redirects properly
   - [ ] SSL certificate is active
   - [ ] All API endpoints working

3. **Performance Check**
   - [ ] Page load times under 3 seconds
   - [ ] Mobile responsiveness
   - [ ] Offline PWA functionality

## Troubleshooting

### Common Issues:

**Build Errors:**
- Check Node.js version (use 18.x)
- Verify all environment variables are set
- Check build logs for missing dependencies

**Authentication Issues:**
- Verify REPLIT_DOMAINS includes your domain
- Check SESSION_SECRET is set
- Ensure DATABASE_URL is accessible

**Database Connection:**
- Test DATABASE_URL connectivity
- Check Neon database is running
- Verify network access from deployment platform

## Next Steps

1. Choose deployment platform (Vercel recommended)
2. Set up environment variables
3. Configure custom domain
4. Update DNS records at GoDaddy
5. Test deployment
6. Monitor for 24-48 hours for DNS propagation

Your HydroMate app is production-ready and should work perfectly on `hydromate.ca`!