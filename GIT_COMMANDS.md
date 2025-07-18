# Git Commands for HydroMate Migration

## Commands to Run on Your Local Machine

After downloading your HydroMate project from Replit and setting up your local repository, run these commands:

### 1. Clone Your Repository
```bash
git clone https://github.com/sewak777/Hobby-repo.git
cd Hobby-repo
```

### 2. Create Project Directory
```bash
mkdir hydromate
cd hydromate
```

### 3. Copy Files
Copy all HydroMate files from your Replit download to this directory.

### 4. Initialize and Commit
```bash
# Add all files
git add .

# Commit with detailed message
git commit -m "feat: add HydroMate hydration tracking application

Complete React/Node.js hydration tracking app with:
- Real-time weather integration (OpenWeather API)
- User authentication and premium features
- PostgreSQL database with comprehensive analytics
- Mobile-ready PWA capabilities
- Production deployment configurations
- Custom domain support (hydromate.ca)

Features:
- Smart water intake logging with beverage types
- Weather-based hydration recommendations
- Achievement system and progress tracking
- Premium analytics dashboard
- Session-based authentication
- Stripe payment integration
- Responsive design with modern UI

Technical Stack:
- Frontend: React 18, TypeScript, Tailwind CSS
- Backend: Node.js, Express, PostgreSQL
- Database: Drizzle ORM with comprehensive schema
- APIs: OpenWeather integration
- Deployment: Vercel/Netlify ready
- Mobile: PWA with Capacitor support"

# Push to GitHub
git push origin main
```

### 5. Verify Upload
Check your repository at: https://github.com/sewak777/Hobby-repo

## Alternative: GitHub Desktop
If you prefer a GUI:
1. Download GitHub Desktop
2. Clone your repository
3. Copy HydroMate files to `hydromate/` folder
4. Commit and push through the interface

## Next Steps After Upload
1. Deploy to Vercel (import from GitHub)
2. Configure environment variables
3. Set up custom domain (hydromate.ca)
4. Test deployment

Your HydroMate application is ready for production deployment!