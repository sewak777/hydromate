import type { RequestHandler } from "express";
import { getFeatureFlags } from "@shared/feature-flags";
import { isAuthenticated } from "./replitAuth";

export const conditionalAuth: RequestHandler = async (req, res, next) => {
  const flags = getFeatureFlags();
  
  // SECURITY FIX: Enforce strict production authentication
  if (process.env.NODE_ENV === 'production') {
    // In production, ALWAYS use real authentication - no bypasses
    return isAuthenticated(req, res, next);
  }
  
  // Development-only authentication flows (with strict validation)
  if (process.env.NODE_ENV === 'development') {
    // Debug session in development
    console.log('🔍 ConditionalAuth Debug:');
    console.log('  - Session ID:', req.session?.id || 'none');
    console.log('  - Session User:', (req.session as any)?.user ? 'exists' : 'missing');
    console.log('  - Session Keys:', Object.keys(req.session || {}));
    
    // Check logout flag first before any authentication
    if ((req.session as any)?.loggedOut) {
      console.log('🚫 User has logged out - blocking all authentication');
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    // Check for development session user first (only for properly authenticated sessions)
    if ((req.session as any)?.user) {
      req.user = (req.session as any).user;
      console.log('✅ Using development session user:', (req.user as any).claims.sub);
      return next();
    }
    
    // Fallback: Check for development token in headers (strict validation)
    const devToken = req.headers['x-dev-token'] as string;
    if (devToken && devToken.startsWith('dev-auth-')) {
      const userId = devToken.replace('dev-auth-', '');
      // SECURITY: Validate dev token format
      if (userId && userId.length > 3 && userId.match(/^[a-zA-Z0-9-]+$/)) {
        req.user = {
          claims: {
            sub: userId,
            email: 'dev@hydromate.local',
            first_name: 'Dev',
            last_name: 'User',
            profile_image_url: null,
          },
          expires_at: Math.floor(Date.now() / 1000) + 3600,
        };
        console.log('✅ Using development token auth:', userId);
        return next();
      }
    }
    
    // Additional fallback: Use dev-user-123 as default ONLY in development
    if (flags.authRequired === false && flags.testMode) {
      req.user = {
        claims: {
          sub: 'dev-user-123',
          email: 'dev@hydromate.local',
          first_name: 'Dev',
          last_name: 'User',
          profile_image_url: null,
        },
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      };
      console.log('✅ Using development fallback auth: dev-user-123');
      return next();
    }
  }
  
  // Default: Always require authentication
  return isAuthenticated(req, res, next);
};