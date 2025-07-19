# Vercel Build and Output Settings for HydroMate

## Build Settings Configuration

### Framework Settings
```
Framework Preset: Other
Root Directory: ./
```

### Build Commands
```
Build Command: npm run build
Output Directory: dist/public
Install Command: npm install
```

### Advanced Build Settings
```
Node.js Version: 18.x
```

## Environment Variables
Add these in Vercel dashboard under "Environment Variables":

```
DATABASE_URL=your_postgresql_connection_string
OPENWEATHER_API_KEY=your_weather_api_key
SESSION_SECRET=your_session_secret_key
REPL_ID=your_repl_identifier
REPLIT_DOMAINS=hydromate.ca,www.hydromate.ca
NODE_ENV=production
```

## Build Configuration Details

### What the Build Command Does:
- `vite build` - Compiles React frontend to `dist/public/`
- `esbuild server/index.ts` - Compiles Node.js backend to `dist/index.js`

### Output Structure:
```
dist/
├── public/          # Frontend files (served at /)
│   ├── index.html
│   ├── assets/
│   └── ...
└── index.js         # Backend API (serves /api/*)
```

### Vercel Configuration:
Your `vercel.json` file handles:
- API routing (`/api/*` → backend)
- Static file serving (`/*` → frontend)
- Environment variables
- Function settings

## Deployment Steps:
1. Connect GitHub repository to Vercel
2. Use these build settings
3. Add environment variables
4. Deploy
5. Add custom domain: hydromate.ca

Your HydroMate project will be live at https://hydromate.ca after deployment!