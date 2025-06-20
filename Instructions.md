# Feature Flags Implementation Plan for HydroFlow

## Overview
This document outlines a comprehensive feature flag system to toggle authentication and payment requirements for testing purposes. The system allows developers to test different user flows without needing actual authentication or payment processing.

## Current Architecture Analysis

### Authentication Flow
- **Frontend**: Uses `useAuth()` hook that checks `/api/auth/user` endpoint
- **Backend**: Uses `isAuthenticated` middleware on protected routes
- **Routes**: All API endpoints except `/api/login`, `/api/logout`, `/api/callback` require authentication
- **Session Management**: PostgreSQL-based session storage with Replit OAuth

### Premium Features & Subscription System
- **Subscription Table**: Tracks user subscriptions with status, plan type, dates
- **Premium Features**: Weather adjustments, activity integration, advanced analytics
- **Subscription Endpoint**: `/api/subscription` returns premium status
- **Frontend**: Profile page and home dashboard check subscription status

### Protected Routes Analysis
```typescript
// Backend routes requiring authentication:
- GET /api/auth/user
- GET /api/profile, POST /api/profile
- GET /api/intake, POST /api/intake
- GET /api/reminders, POST /api/reminders
- GET /api/achievements
- GET /api/dashboard
- GET /api/subscription

// Frontend route protection:
- Home page (/) - requires authentication
- Profile page (/profile) - requires authentication
- Landing page (/) - shown when not authenticated
```

## Feature Flag System Design

### 1. Configuration Structure

Create a centralized feature flag configuration:

```typescript
// shared/feature-flags.ts
export interface FeatureFlags {
  authRequired: boolean;
  premiumRequired: boolean;
  mockUsers: boolean;
  mockSubscriptions: boolean;
  testMode: boolean;
}

export const defaultFlags: FeatureFlags = {
  authRequired: true,
  premiumRequired: true,
  mockUsers: false,
  mockSubscriptions: false,
  testMode: false,
};

// Environment-based flag overrides
export const getFeatureFlags = (): FeatureFlags => {
  const flags = { ...defaultFlags };
  
  if (process.env.NODE_ENV === 'development') {
    flags.authRequired = process.env.FF_AUTH_REQUIRED !== 'false';
    flags.premiumRequired = process.env.FF_PREMIUM_REQUIRED !== 'false';
    flags.mockUsers = process.env.FF_MOCK_USERS === 'true';
    flags.mockSubscriptions = process.env.FF_MOCK_SUBSCRIPTIONS === 'true';
    flags.testMode = process.env.FF_TEST_MODE === 'true';
  }
  
  return flags;
};
```

### 2. Backend Implementation

#### Authentication Middleware Enhancement
```typescript
// server/feature-flags.ts
import { getFeatureFlags } from "@shared/feature-flags";

export const conditionalAuth: RequestHandler = async (req, res, next) => {
  const flags = getFeatureFlags();
  
  if (!flags.authRequired || flags.testMode) {
    // Mock user for testing
    if (flags.mockUsers) {
      req.user = {
        claims: {
          sub: 'test-user-123',
          email: 'test@example.com',
          first_name: 'Test',
          last_name: 'User',
          profile_image_url: null,
        },
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      };
    }
    return next();
  }
  
  // Use original authentication
  return isAuthenticated(req, res, next);
};
```

#### Routes Update
```typescript
// server/routes.ts - Updated route protection
import { conditionalAuth } from "./feature-flags";

// Replace isAuthenticated with conditionalAuth for all protected routes
app.get('/api/auth/user', conditionalAuth, async (req: any, res) => {
  // Implementation remains the same
});

app.get('/api/profile', conditionalAuth, async (req: any, res) => {
  // Implementation remains the same
});

// Add test user creation endpoint
app.post('/api/test/user', async (req, res) => {
  const flags = getFeatureFlags();
  if (!flags.testMode) {
    return res.status(403).json({ message: 'Test mode not enabled' });
  }
  
  // Create test user logic
});
```

#### Subscription Mocking
```typescript
// server/storage.ts - Enhanced subscription handling
export class DatabaseStorage implements IStorage {
  async getSubscription(userId: string): Promise<Subscription | undefined> {
    const flags = getFeatureFlags();
    
    if (flags.mockSubscriptions && flags.testMode) {
      // Return mock premium subscription
      return {
        id: 1,
        userId,
        planType: 'annual',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      };
    }
    
    if (!flags.premiumRequired) {
      // Return mock premium for all users
      return {
        id: 1,
        userId,
        planType: 'annual',
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      };
    }
    
    // Original implementation
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, "active")));
    return subscription;
  }
}
```

### 3. Frontend Implementation

#### Enhanced useAuth Hook
```typescript
// client/src/hooks/useAuth.ts
import { getFeatureFlags } from "@shared/feature-flags";

export function useAuth() {
  const flags = getFeatureFlags();
  
  const query = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    enabled: flags.authRequired, // Only fetch if auth is required
  });

  // Override for test mode
  if (!flags.authRequired || flags.testMode) {
    return {
      user: flags.mockUsers ? {
        id: 'test-user-123',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        profileImageUrl: null,
      } : null,
      isLoading: false,
      isAuthenticated: !flags.authRequired || flags.mockUsers,
    };
  }

  return {
    user: query.data,
    isLoading: query.isLoading,
    isAuthenticated: !!query.data,
  };
}
```

#### App Router Enhancement
```typescript
// client/src/App.tsx
import { getFeatureFlags } from "@shared/feature-flags";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const flags = getFeatureFlags();

  // Skip auth check in test mode
  if (flags.testMode && !flags.authRequired) {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/profile" component={Profile} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}
```

#### Premium Feature Toggle
```typescript
// client/src/hooks/usePremium.ts
import { useQuery } from "@tanstack/react-query";
import { getFeatureFlags } from "@shared/feature-flags";

export function usePremium() {
  const flags = getFeatureFlags();
  
  const query = useQuery({
    queryKey: ["/api/subscription"],
    enabled: flags.premiumRequired,
  });

  if (!flags.premiumRequired || flags.mockSubscriptions) {
    return {
      isPremium: true,
      subscription: {
        planType: 'annual',
        status: 'active',
      },
      isLoading: false,
    };
  }

  return {
    isPremium: query.data?.isPremium || false,
    subscription: query.data?.subscription,
    isLoading: query.isLoading,
  };
}
```

### 4. Testing Environment Configurations

#### Development Environment (.env.development)
```bash
# Feature Flags for Development
FF_AUTH_REQUIRED=false
FF_PREMIUM_REQUIRED=false
FF_MOCK_USERS=true
FF_MOCK_SUBSCRIPTIONS=true
FF_TEST_MODE=true

# Database (optional for testing)
FF_USE_MEMORY_STORAGE=true
```

#### Testing Scripts (package.json)
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "dev:no-auth": "FF_AUTH_REQUIRED=false FF_MOCK_USERS=true npm run dev",
    "dev:premium": "FF_PREMIUM_REQUIRED=false FF_MOCK_SUBSCRIPTIONS=true npm run dev",
    "dev:test-mode": "FF_TEST_MODE=true FF_AUTH_REQUIRED=false FF_PREMIUM_REQUIRED=false npm run dev",
    "test:e2e": "FF_TEST_MODE=true playwright test",
    "test:integration": "FF_TEST_MODE=true jest --testPathPattern=integration"
  }
}
```

### 5. Test Data Management

#### Mock Data Service
```typescript
// server/test-data.ts
export const mockUsers = {
  'test-user-123': {
    id: 'test-user-123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    profileImageUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  'premium-user-456': {
    id: 'premium-user-456',
    email: 'premium@example.com',
    firstName: 'Premium',
    lastName: 'User',
    profileImageUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const mockProfiles = {
  'test-user-123': {
    userId: 'test-user-123',
    weight: 70,
    gender: 'male',
    activityLevel: 'moderately_active',
    dailyGoal: 2500,
    timezone: 'UTC',
  },
};

export const mockSubscriptions = {
  'premium-user-456': {
    id: 1,
    userId: 'premium-user-456',
    planType: 'annual',
    status: 'active',
    startDate: new Date(),
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
  },
};
```

### 6. Implementation Steps

#### Phase 1: Core Infrastructure
1. Create `shared/feature-flags.ts` with configuration
2. Implement `server/feature-flags.ts` with conditional middleware
3. Update `server/routes.ts` to use conditional authentication
4. Create mock data service in `server/test-data.ts`

#### Phase 2: Frontend Integration
1. Update `client/src/hooks/useAuth.ts` with feature flag support
2. Create `client/src/hooks/usePremium.ts` for subscription handling
3. Modify `client/src/App.tsx` router logic
4. Update component premium feature checks

#### Phase 3: Testing Configuration
1. Add environment variables for different test modes
2. Create npm scripts for various testing scenarios
3. Implement test data seeding functionality
4. Add cleanup utilities for test data

#### Phase 4: Validation & Documentation
1. Test all authentication bypass scenarios
2. Verify premium feature toggles work correctly
3. Ensure production safety (flags disabled by default)
4. Document usage patterns and examples

### 7. Usage Examples

#### Testing Without Authentication
```bash
# Start development server with auth disabled
npm run dev:no-auth

# Access home page directly without login
# All protected routes will use mock user data
```

#### Testing Premium Features
```bash
# Enable all premium features for testing
npm run dev:premium

# All users will have premium subscription
# Premium features will be accessible
```

#### Full Test Mode
```bash
# Complete testing environment
npm run dev:test-mode

# No authentication required
# All premium features enabled
# Mock data for all services
```

### 8. Production Safety

#### Safeguards
- Feature flags default to production values (auth required, premium required)
- Test mode only available in development environment
- Environment variable validation prevents accidental production deployment
- Clear logging when feature flags are active

#### Monitoring
```typescript
// server/index.ts - Startup logging
const flags = getFeatureFlags();
if (process.env.NODE_ENV === 'development') {
  console.log('🏳️ Feature Flags Active:', flags);
  if (!flags.authRequired) console.warn('⚠️  Authentication disabled');
  if (!flags.premiumRequired) console.warn('⚠️  Premium features unlocked');
  if (flags.testMode) console.warn('⚠️  Test mode enabled');
}
```

## Conclusion

This feature flag system provides comprehensive control over authentication and payment flows for testing while maintaining production safety. The implementation allows developers to:

- Test user flows without authentication setup
- Verify premium features without payment processing
- Use mock data for consistent testing
- Maintain clear separation between test and production environments
- Easily toggle specific features for targeted testing

The system is designed to be non-intrusive to existing code while providing powerful testing capabilities.