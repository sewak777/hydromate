# Complete Environment Variables for HydroMate Production

## Required Environment Variables for Vercel

Add these exact environment variables in your Vercel project settings:

### 1. DATABASE_URL
**Variable Name**: `DATABASE_URL`
**Value**: Your PostgreSQL connection string
**Example**: `postgresql://username:password@hostname:5432/database_name`
**Environment**: Production, Preview, Development

### 2. OPENWEATHER_API_KEY
**Variable Name**: `OPENWEATHER_API_KEY`
**Value**: Your OpenWeather API key from openweathermap.org
**Example**: `abc123def456ghi789jkl012mno345pqr678`
**Environment**: Production, Preview, Development

### 3. SESSION_SECRET
**Variable Name**: `SESSION_SECRET`
**Value**: A secure random string (32+ characters)
**Example**: `your-super-secret-session-key-here-make-it-long-and-random`
**Environment**: Production, Preview, Development

### 4. NODE_ENV
**Variable Name**: `NODE_ENV`
**Value**: `production`
**Environment**: Production only

### 5. REPL_ID
**Variable Name**: `REPL_ID`
**Value**: Your Replit project identifier
**Example**: `abc123def-456g-789h-012i-345jkl678mno`
**Environment**: Production, Preview, Development

### 6. REPLIT_DOMAINS
**Variable Name**: `REPLIT_DOMAINS`
**Value**: `hydromate.ca,www.hydromate.ca`
**Environment**: Production, Preview, Development

### 7. ISSUER_URL (Optional)
**Variable Name**: `ISSUER_URL`
**Value**: `https://replit.com/oidc`
**Environment**: Production, Preview, Development

## How to Add in Vercel:

1. Go to your Vercel project dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in the left sidebar
4. For each variable above:
   - **Name**: Copy the variable name exactly
   - **Value**: Enter your actual value
   - **Environment**: Select Production, Preview, and Development
   - Click "Save"

## Critical Notes:
- **DATABASE_URL**: Must be a live PostgreSQL database (not local)
- **OPENWEATHER_API_KEY**: Get from https://openweathermap.org/api
- **SESSION_SECRET**: Generate with `openssl rand -base64 32` or use a password generator
- **REPLIT_DOMAINS**: Must match your actual domain exactly
- Never commit these values to GitHub - they're secrets

## Current App Status:
Your HydroMate app is successfully uploaded to GitHub (sewak777/hydromate) and ready for Vercel deployment with these environment variables.