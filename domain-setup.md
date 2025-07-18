# Domain Setup Guide for HydroMate

## Current Domain Configuration

**Current Replit Domain:** `b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev`

## Domain Setup Components

### 1. Environment Variables
The following environment variables are configured for domain handling:

```bash
# Current domain (automatically set by Replit)
REPLIT_DOMAINS=b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev

# Session configuration
SESSION_SECRET=your_session_secret_here

# Database URL (automatically configured)
DATABASE_URL=your_postgresql_connection_string

# OAuth configuration
REPL_ID=your_repl_id_here
ISSUER_URL=https://replit.com/oidc
```

### 2. Domain Configuration File
Created `client/src/lib/config.ts` with:
- Current domain detection
- Production vs development environment handling
- API endpoint configuration
- Authentication URL setup
- External service URL configuration

### 3. Authentication Setup
The authentication system is configured to work with your current domain:

- **Login URL**: `/api/login`
- **Logout URL**: `/api/logout`
- **Callback URL**: `/api/callback`
- **OAuth Redirect**: Automatically configured for current domain

### 4. Session Configuration
Sessions are configured with:
- **Secure cookies**: Enabled in production
- **Domain handling**: Automatic domain detection
- **Cross-origin support**: Enabled for development
- **Session storage**: PostgreSQL-based

### 5. CORS and Security
Security headers are configured to work with your domain:
- **CORS**: Configured for current domain
- **Content Security Policy**: Domain-specific
- **Cookie security**: Environment-aware

## Features Enabled

### ✅ Authentication
- Replit OAuth integration
- Session-based authentication
- Automatic domain detection

### ✅ Database
- PostgreSQL connection established
- Session storage configured
- User data persistence

### ✅ Weather Integration
- OpenWeather API connected
- Location-based weather data
- Hydration recommendations

### ✅ Real-time Features
- Live weather updates
- Hydration tracking
- Progress monitoring

### ✅ Security
- Rate limiting
- Input sanitization
- SQL injection protection
- Secure headers

## Domain-Specific URLs

### Main Application
- **Landing Page**: `https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/`
- **App Dashboard**: `https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/` (after login)
- **Profile**: `https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/profile`
- **Analytics**: `https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/analytics`

### Authentication
- **Login**: `https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/api/login`
- **Logout**: `https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/api/logout`

### Admin Panel
- **Admin Dashboard**: `https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/admin`

### API Endpoints
- **User API**: `https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/api/auth/user`
- **Weather API**: `https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/api/weather`
- **Hydration API**: `https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/api/intake`

## Deployment Considerations

### For Production Deployment
1. **Custom Domain**: Replace Replit domain with your custom domain
2. **SSL Certificate**: Ensure HTTPS is properly configured
3. **Environment Variables**: Update all domain references
4. **Database**: Ensure production database is configured
5. **Session Security**: Verify secure cookie settings

### Environment Detection
The app automatically detects the environment and adjusts:
- **Development**: Relaxed security, debugging enabled
- **Production**: Strict security, access control enabled

## Testing the Domain Setup

### 1. Authentication Flow
1. Visit the landing page
2. Click "Sign In" to test OAuth flow
3. Complete authentication
4. Verify redirect to dashboard

### 2. API Endpoints
Test key endpoints:
```bash
# Check health
curl https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/api/health

# Test weather API
curl https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/api/weather
```

### 3. Security Headers
Verify security headers are properly set:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security (in production)

## Next Steps

1. **Test all features** with the current domain
2. **Verify authentication** works correctly
3. **Test API endpoints** respond properly
4. **Check security headers** are applied
5. **Prepare for custom domain** if needed

The domain is now fully configured and ready for use!