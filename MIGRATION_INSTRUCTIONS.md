# HydroMate Migration to Hobby-repo

## Step-by-Step Migration Guide

### 1. Prepare Your GitHub Repository

First, ensure your "Hobby-repo" is ready:
```bash
cd path/to/your/hobby-repo
mkdir hydromate
cd hydromate
```

### 2. Export from Replit

**Method A: Direct Download**
1. In Replit, click the three dots menu (⋮)
2. Select "Download as zip"
3. Extract the downloaded file
4. Copy all contents to your `hobby-repo/hydromate/` folder

**Method B: Git Clone (if you have Git access)**
```bash
# In your hobby-repo/hydromate folder
git clone https://replit.com/@yourusername/your-repl-name.git .
```

### 3. Project Structure in Your Repository

Your repository structure will be:
```
Hobby-repo/
├── hydromate/                    # HydroMate application
│   ├── client/                   # React frontend
│   │   ├── src/
│   │   │   ├── components/      # UI components
│   │   │   ├── pages/           # Page components
│   │   │   ├── hooks/           # Custom hooks
│   │   │   └── lib/             # Utilities
│   │   ├── index.html
│   │   └── vite.config.ts
│   ├── server/                   # Node.js backend
│   │   ├── index.ts             # Server entry point
│   │   ├── routes.ts            # API routes
│   │   ├── storage.ts           # Database layer
│   │   ├── db.ts                # Database connection
│   │   ├── weather.ts           # Weather service
│   │   └── replitAuth.ts        # Authentication
│   ├── shared/                   # Shared schemas
│   │   └── schema.ts            # Database schema
│   ├── attached_assets/          # Project assets
│   ├── README.md                 # Main documentation
│   ├── DEPLOYMENT_CHECKLIST.md  # Deployment guide
│   ├── CONTRIBUTING.md           # Contribution guide
│   ├── .gitignore               # Git ignore rules
│   ├── .env.example             # Environment template
│   ├── package.json             # Dependencies
│   ├── vercel.json              # Vercel config
│   ├── netlify.toml             # Netlify config
│   └── railway.json             # Railway config
└── other-projects/               # Your other projects
```

### 4. Essential Files to Copy

Make sure these files are included:
- **Core Application**: `client/`, `server/`, `shared/`
- **Configuration**: `package.json`, `tsconfig.json`, `vite.config.ts`
- **Documentation**: `README.md`, `DEPLOYMENT_CHECKLIST.md`, `CONTRIBUTING.md`
- **Environment**: `.env.example`, `.gitignore`
- **Deployment**: `vercel.json`, `netlify.toml`, `railway.json`

### 5. Commit to GitHub

```bash
cd hobby-repo
git add hydromate/
git commit -m "feat: add HydroMate hydration tracking application

Complete React/Node.js hydration tracking app with:
- Weather integration via OpenWeather API
- User authentication and premium features
- PostgreSQL database with Drizzle ORM
- Mobile-ready PWA capabilities
- Production deployment configurations
- Ready for hydromate.ca domain"

git push origin main
```

### 6. Environment Variables

Create `.env` file in `hydromate/` folder:
```env
# Copy from .env.example and fill in your values
DATABASE_URL=your_postgresql_connection_string
OPENWEATHER_API_KEY=your_weather_api_key
SESSION_SECRET=your_session_secret
REPL_ID=your_repl_id
REPLIT_DOMAINS=hydromate.ca,www.hydromate.ca
NODE_ENV=production
```

### 7. Deploy to Production

**Option A: Vercel (Recommended)**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `hydromate`
4. Configure environment variables
5. Deploy

**Option B: Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist/public`
5. Configure environment variables

### 8. Configure Custom Domain

After deployment:
1. Add `hydromate.ca` as custom domain
2. Update DNS in GoDaddy:
   - A Record: `@` → `76.76.19.61`
   - CNAME: `www` → `cname.vercel-dns.com`

### 9. Testing

After deployment, test:
- Homepage loads correctly
- User authentication works
- Water logging functions
- Weather data displays
- Analytics and premium features
- Mobile responsiveness

## Current Project Status

✅ **Application**: Fully developed and functional
✅ **Features**: All core and premium features working
✅ **Database**: PostgreSQL schema ready
✅ **APIs**: Weather integration working
✅ **Authentication**: User login/logout system
✅ **UI**: Modern, responsive design
✅ **Documentation**: Complete setup guides
✅ **Deployment**: Production-ready configurations

## Timeline

- **Migration**: 30 minutes
- **Deployment**: 15 minutes
- **DNS Propagation**: 24-48 hours
- **Go Live**: Your app will be accessible at https://hydromate.ca

## Support

If you encounter issues:
1. Check that all files copied correctly
2. Verify environment variables are set
3. Ensure package.json dependencies install properly
4. Wait for DNS propagation for domain access

Your HydroMate application is ready for production deployment!