import type { RequestHandler } from "express";
import { getFeatureFlags } from "@shared/feature-flags";
import { isAuthenticated } from "./replitAuth";

export const conditionalAuth: RequestHandler = async (req, res, next) => {
  const flags = getFeatureFlags();
  
  // Debug session in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 ConditionalAuth Debug:');
    console.log('  - Session ID:', req.session?.id || 'none');
    console.log('  - Session User:', (req.session as any)?.user ? 'exists' : 'missing');
    console.log('  - Session Keys:', Object.keys(req.session || {}));
  }
  
  // Check for development session user first (only for properly authenticated sessions)
  if (process.env.NODE_ENV === 'development' && (req.session as any)?.user) {
    req.user = (req.session as any).user;
    console.log('✅ Using development session user:', (req.user as any).claims.sub);
    return next();
  }
  
  // Development token bypass disabled for proper auth flow
  
  // SECURITY: Only allow auth bypass in development with explicit flags
  if (process.env.NODE_ENV === 'development' && !flags.authRequired && flags.testMode) {
    // Mock user for testing in development only
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
  
  // SECURITY: Always require authentication in production or when flags demand it
  return isAuthenticated(req, res, next);
};