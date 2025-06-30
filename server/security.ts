import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// User isolation middleware - ensures users can only access their own data
export const requireUserOwnership = (req: Request, res: Response, next: NextFunction) => {
  const authenticatedUserId = (req as any).user?.claims?.sub;
  const requestedUserId = req.params.userId || req.body.userId || req.query.userId;
  
  if (!authenticatedUserId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  // If a specific user ID is being accessed, ensure it matches the authenticated user
  if (requestedUserId && requestedUserId !== authenticatedUserId) {
    return res.status(403).json({ error: 'Access denied: Cannot access other user data' });
  }
  
  next();
};

// Input sanitization middleware
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Recursively sanitize all string values in request body
  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      // Remove potentially dangerous characters and trim whitespace
      return obj.trim().replace(/[<>]/g, '');
    }
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }
    if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
      return sanitized;
    }
    return obj;
  };
  
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  next();
};

// Schema validation middleware factory
export const validateSchema = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation error',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      return res.status(400).json({ error: 'Invalid request data' });
    }
  };
};

// Rate limiting store for enhanced security
export class SecurityRateLimiter {
  private store = new Map<string, { count: number; resetTime: number; blocked: boolean }>();
  
  constructor(
    private maxRequests: number = 100,
    private windowMs: number = 60000, // 1 minute
    private blockDurationMs: number = 300000 // 5 minutes
  ) {}
  
  middleware = (req: Request, res: Response, next: NextFunction) => {
    const clientId = this.getClientId(req);
    const now = Date.now();
    
    let record = this.store.get(clientId);
    
    if (!record) {
      record = { count: 0, resetTime: now + this.windowMs, blocked: false };
      this.store.set(clientId, record);
    }
    
    // Check if client is currently blocked
    if (record.blocked) {
      return res.status(429).json({
        error: 'Too many requests - temporarily blocked',
        retryAfter: Math.ceil((record.resetTime - now) / 1000)
      });
    }
    
    // Reset counter if window has passed
    if (now > record.resetTime) {
      record.count = 0;
      record.resetTime = now + this.windowMs;
      record.blocked = false;
    }
    
    record.count++;
    
    // Block client if they exceed the limit
    if (record.count > this.maxRequests) {
      record.blocked = true;
      record.resetTime = now + this.blockDurationMs;
      return res.status(429).json({
        error: 'Rate limit exceeded - temporarily blocked',
        retryAfter: Math.ceil(this.blockDurationMs / 1000)
      });
    }
    
    // Add rate limit headers
    res.setHeader('X-RateLimit-Limit', this.maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, this.maxRequests - record.count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));
    
    next();
  };
  
  private getClientId(req: Request): string {
    const userId = (req as any).user?.claims?.sub;
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    return userId || ip;
  }
}

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Prevent XSS attacks
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // HTTPS enforcement (in production)
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  // Content Security Policy
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://api.stripe.com https://api.openweathermap.org"
  );
  
  next();
};

// Database query parameter sanitization
export const sanitizeDbParams = (params: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') {
      // Remove SQL injection patterns
      sanitized[key] = value.replace(/[';--]/g, '').trim();
    } else if (typeof value === 'number') {
      // Ensure it's a valid number
      sanitized[key] = isNaN(value) ? 0 : value;
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};