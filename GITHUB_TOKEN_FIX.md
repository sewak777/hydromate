# GitHub Token Permission Fix

## Current Issue
The GitHub token lacks push permissions. The repository is "sewak777/hydromate" (lowercase).

## Exact Solution Steps

### Create New Token with Correct Permissions

1. **Go to GitHub Token Settings**:
   - Visit: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"

2. **Configure Token**:
   - Name: `Replit HydroMate Push Access`
   - Expiration: No expiration (or 1 year)
   
3. **Select ALL These Scopes** (critical):
   - ✅ **repo** (Full control of private repositories)
     - ✅ repo:status
     - ✅ repo_deployment  
     - ✅ public_repo
     - ✅ repo:invite
     - ✅ security_events
   - ✅ **workflow** (Update GitHub Action workflows)
   - ✅ **write:packages** (Upload packages to registry)
   - ✅ **delete:packages** (Delete packages from registry)
   - ✅ **admin:repo_hook** (Admin access to repository hooks)
   - ✅ **admin:org_hook** (Admin access to organization hooks)

4. **Generate Token**:
   - Click "Generate token"
   - Copy the token immediately (save it temporarily)

### Update Token in Replit

1. In Replit, click the **Lock icon** (Secrets) in left sidebar
2. Find **GITHUB_TOKEN** and click "Edit"
3. Paste the new token
4. Click "Save"

## Repository URL Correction

The correct repository URL is: `https://github.com/sewak777/hydromate.git` (lowercase "hydromate")

## Test After Token Update

Once you update the token, I'll test the push with:
```bash
git push https://sewak777:${GITHUB_TOKEN}@github.com/sewak777/hydromate.git main
```

This should resolve the 403 permission error and successfully push all your HydroMate changes to GitHub.

## Why This Fix Works

The current token only has read permissions. The new token with **repo** scope provides:
- Push access to repositories
- Create/update files
- Manage repository settings
- Full repository control

This is essential for pushing code changes from Replit to GitHub.