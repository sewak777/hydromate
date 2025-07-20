# Manual Git Unlock Instructions

## Step 1: Open Shell in Replit
1. Look for the **Shell** tab in your Replit workspace
2. If you don't see it, click the **+** tab and select "Shell"
3. This opens a command-line terminal

## Step 2: Remove Lock Files
In the Shell terminal, run these commands one by one:

```bash
rm -f .git/config.lock
rm -f .git/index.lock  
rm -f .git/HEAD.lock
rm -f .git/refs/heads/main.lock
```

## Step 3: Add GitHub Remote
```bash
git remote add origin https://github.com/sewak777/hydromate.git
```

## Step 4: Stage and Commit Files
```bash
git add .
git commit -m "feat: add HydroMate hydration tracking application"
```

## Step 5: Push to GitHub
```bash
git push -u origin main
```

## Alternative: If Shell Commands Don't Work

### Create New Repository
1. Go to https://github.com/sewak777
2. Click "New repository" 
3. Name it "hydromate"
4. Create repository

### Upload Files Manually
1. In Replit: Three dots menu → "Download as zip"
2. Extract the zip file on your computer
3. In GitHub: Click "uploading an existing file"
4. Drag all extracted files to GitHub
5. Commit with message: "Initial HydroMate application"

## Current Project Status
Your HydroMate app is production-ready:
- Weather: New York 32°C, feels like 36°C, +350ml recommendation
- Authentication working
- All features operational

Once uploaded to GitHub, you can deploy to Vercel and point hydromate.ca to your live app.