# GoDaddy DNS Setup for hydromate.ca

## Step-by-Step Guide to Point Your Domain to HydroMate

### Step 1: Login to GoDaddy
1. Go to [godaddy.com](https://godaddy.com)
2. Click "Sign In" 
3. Enter your GoDaddy account credentials

### Step 2: Access DNS Management
1. Click on your account name (top right)
2. Select "My Products" from dropdown
3. Find "hydromate.ca" in your domain list
4. Click the "DNS" button next to hydromate.ca

### Step 3: Update DNS Records

You'll see a list of DNS records. You need to modify/add these:

#### Remove Current Records (if any):
- Delete any existing A records pointing to parking pages
- Delete any CNAME records for @ (root domain)

#### Add New Records:

**Record 1: Root Domain (A Record)**
```
Type: A
Host: @
Points to: 76.76.19.61
TTL: 1 Hour
```

**Record 2: WWW Subdomain (CNAME)**
```
Type: CNAME
Host: www
Points to: cname.vercel-dns.com
TTL: 1 Hour
```

### Step 4: Save Changes
1. Click "Save" after adding each record
2. GoDaddy will show a confirmation message
3. Changes may take 1-24 hours to propagate worldwide

### Step 5: Deploy Your App
1. In your Replit project, click the "Deploy" button
2. Choose Vercel as your deployment platform
3. During setup, add your custom domain: **hydromate.ca**
4. Vercel will provide DNS instructions (which you've already completed)

### Step 6: Add Environment Variables
In your Vercel deployment dashboard, add these:

```
NODE_ENV=production
DATABASE_URL=your_production_database_url
SESSION_SECRET=your_new_production_secret
REPL_ID=your_repl_id
OPENWEATHER_API_KEY=your_weather_api_key
REPLIT_DOMAINS=hydromate.ca,www.hydromate.ca
```

### Step 7: Test Your Domain
After 1-24 hours, test these URLs:
- **https://hydromate.ca** (should show your landing page)
- **https://www.hydromate.ca** (should redirect to main domain)
- **https://hydromate.ca/api/login** (should work for authentication)

## Visual Guide for GoDaddy Interface:

### What You'll See:
1. **DNS Management Page**: Shows all your current DNS records
2. **Add Record Button**: Usually at the bottom of the record list
3. **Record Types**: Dropdown with A, CNAME, MX, etc.
4. **Host Field**: Where you enter @ or www
5. **Points To Field**: Where you enter the IP address or domain

### Common GoDaddy Interface Elements:
- **Type**: Select from dropdown (A or CNAME)
- **Host**: Text field (enter @ or www)
- **Points to**: Text field (enter IP or domain)
- **TTL**: Usually defaults to 1 hour (leave as is)

## Troubleshooting:

### If DNS Changes Don't Work:
1. **Wait longer**: DNS can take up to 48 hours
2. **Check record format**: Ensure no typos in IP addresses
3. **Clear browser cache**: Try incognito/private browsing
4. **Use DNS checker**: Tools like whatsmydns.net

### If You Can't Find DNS Settings:
1. Look for "DNS", "DNS Management", or "Nameservers"
2. Make sure you're in the right domain (hydromate.ca)
3. Contact GoDaddy support if needed

### If Records Won't Save:
1. Make sure you're clicking "Save" after each record
2. Check that all fields are filled correctly
3. Try refreshing the page and trying again

## Expected Timeline:
- **DNS Update**: 1-24 hours (usually 1-4 hours)
- **SSL Certificate**: Automatic once DNS propagates
- **App Live**: Immediately after SSL is ready

## Your Final URLs:
- **Landing Page**: https://hydromate.ca
- **App Dashboard**: https://hydromate.ca (after login)
- **Admin Panel**: https://hydromate.ca/admin

## After Success:
Once your domain is live, your HydroMate app will automatically:
- Detect the hydromate.ca domain
- Adjust all authentication URLs
- Work with Canadian users perfectly
- Display weather in Celsius (already configured)

Your app is production-ready and will work perfectly with your Canadian domain!