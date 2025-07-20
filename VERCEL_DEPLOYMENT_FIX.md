# Vercel Deployment Environment Variables

## Copy These Values to Vercel

Here are the environment variables formatted for easy copying to Vercel:

```env
DATABASE_URL=postgresql://username:password@hostname:5432/database_name
OPENWEATHER_API_KEY=your_openweather_api_key_here
SESSION_SECRET=your-super-secret-session-key-here-make-it-long-and-random
REPL_ID=your_replit_project_identifier
REPLIT_DOMAINS=hydromate.ca,www.hydromate.ca
ISSUER_URL=https://replit.com/oidc
NODE_ENV=production
```

## Instructions:
1. Replace placeholder values with your actual credentials
2. Copy each line to Vercel Environment Variables section
3. Set environment scope to: Production, Preview, Development
4. Never commit .env files to GitHub

## Build Configuration:
- Framework: Other
- Build Command: `node build.js`
- Output Directory: `dist/public`

Your HydroMate project (sewak777/hydromate) is ready for deployment once these environment variables are configured.