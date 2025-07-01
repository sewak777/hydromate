import type { RequestHandler } from "express";
import { getFeatureFlags } from "@shared/feature-flags";
import { isAuthenticated } from "./replitAuth";

export const conditionalAuth: RequestHandler = async (req, res, next) => {
  const flags = getFeatureFlags();
  
  // Check for development session user first
  if (process.env.NODE_ENV === 'development' && (req.session as any)?.user) {
    req.user = (req.session as any).user;
    return next();
  }
  
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