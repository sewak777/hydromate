#!/bin/bash

# Auto Git Upload Script for HydroMate
# Usage: ./git-auto-upload.sh "commit message"

set -e

# Configuration
REPO_URL="https://github.com/sewak777/hydromate.git"
BRANCH="main"

# Function to upload changes
upload_changes() {
    local commit_msg="${1:-"chore: auto-update HydroMate files"}"
    
    echo "🔄 Starting auto-upload..."
    
    # Remove any lock files
    rm -f .git/config.lock .git/index.lock .git/HEAD.lock 2>/dev/null || true
    
    # Stage all changes
    git add .
    
    # Check if there are changes to commit
    if git diff --staged --quiet; then
        echo "✅ No changes to upload"
        return 0
    fi
    
    # Commit changes
    git commit -m "$commit_msg"
    
    # Push with personal access token (user will need to set TOKEN env var)
    if [ -n "$GITHUB_TOKEN" ]; then
        git push https://$GITHUB_TOKEN@github.com/sewak777/hydromate.git $BRANCH --force
        echo "✅ Successfully uploaded to GitHub!"
    else
        echo "❌ Please set GITHUB_TOKEN environment variable"
        echo "Run: export GITHUB_TOKEN=your_personal_access_token"
        return 1
    fi
}

# Main execution
upload_changes "$1"