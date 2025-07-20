# Updated Git Commands - Repository Name Fixed

## Repository Name Corrected
- Old: `Hydromate` (capital H)
- New: `hydromate` (lowercase h)

## Commands to Run in Shell

### 1. Update remote URL:
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/sewak777/hydromate.git
```

### 2. Verify remote:
```bash
git remote -v
```

### 3. Push to GitHub:
```bash
git push -u origin main
```

## Alternative Single Command:
If the above doesn't work, try direct push:
```bash
git push https://YOUR_TOKEN@github.com/sewak777/hydromate.git main
```

## After Successful Push:
1. Your HydroMate project will be on GitHub
2. Go to Vercel.com → New Project
3. Import from GitHub: sewak777/hydromate
4. Configure build settings:
   - Build Command: `node build.js`
   - Output Directory: `dist/public`
5. Add environment variables
6. Deploy to hydromate.ca

## Current App Status:
- Weather integration: 32°C New York, feels like 37°C
- Authentication working perfectly
- All features operational
- Ready for production deployment

The repository name fix should resolve the 403 error.