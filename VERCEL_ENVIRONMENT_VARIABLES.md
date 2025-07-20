# Vercel Environment Variables for HydroMate

## Required Environment Variables

Add these in your Vercel project settings under "Environment Variables":

### Database Configuration
```
DATABASE_URL
```
**Value**: Your PostgreSQL connection string
**Example**: `postgresql://user:password@host:port/database`

### Weather API
```
OPENWEATHER_API_KEY
```
**Value**: Your OpenWeather API key
**Current Status**: Working (New York: 31°C, scattered clouds, +300ml recommendation)

### Authentication
```
SESSION_SECRET
```
**Value**: A secure random string for session encryption
**Example**: Generate with `openssl rand -base64 32`

```
REPL_ID
```
**Value**: Your Replit project identifier
**Note**: Used for authentication, get from your Replit project

```
REPLIT_DOMAINS
```
**Value**: `hydromate.ca,www.hydromate.ca`
**Purpose**: Allowed domains for authentication

### Environment Setting
```
NODE_ENV
```
**Value**: `production`
**Purpose**: Enables production optimizations

## How to Add in Vercel:

1. Go to your Vercel project dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in sidebar
4. For each variable:
   - Name: Variable name (e.g., `DATABASE_URL`)
   - Value: Your actual value
   - Environment: Select "Production", "Preview", and "Development"
   - Click "Save"

## Security Notes:
- Keep these values secret - never commit them to GitHub
- Use strong, unique values for SESSION_SECRET
- DATABASE_URL should be from a production database
- OPENWEATHER_API_KEY should be from your OpenWeather account

Your HydroMate app will be fully functional once these environment variables are configured!