import { Request, Response, NextFunction } from 'express';
import { db } from './db';

// Database Row Level Security (RLS) enforcement
export class DatabaseSecurityManager {
  
  // Ensure user can only access their own data
  static enforceUserIsolation = (req: Request, res: Response, next: NextFunction) => {
    const authenticatedUserId = (req as any).user?.claims?.sub;
    
    if (!authenticatedUserId) {
      return res.status(401).json({ 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED' 
      });
    }
    
    // Add authenticated user ID to request context for database queries
    (req as any).authenticatedUserId = authenticatedUserId;
    
    // Check if user is trying to access other user's data
    const requestedUserId = req.params.userId || req.body.userId || req.query.userId;
    if (requestedUserId && requestedUserId !== authenticatedUserId) {
      console.error(`🚨 SECURITY: User ${authenticatedUserId} attempted to access data for user ${requestedUserId}`);
      return res.status(403).json({ 
        error: 'Access denied: Cannot access other user data',
        code: 'FORBIDDEN_CROSS_USER_ACCESS' 
      });
    }
    
    next();
  };
  
  // Validate that all write operations include proper user context
  static validateWriteOperation = (req: Request, res: Response, next: NextFunction) => {
    const method = req.method;
    const authenticatedUserId = (req as any).authenticatedUserId;
    
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      if (!authenticatedUserId) {
        return res.status(401).json({ 
          error: 'Authentication required for write operations',
          code: 'AUTH_REQUIRED_WRITE' 
        });
      }
      
      // For write operations, ensure userId is set to authenticated user
      if (req.body && typeof req.body === 'object') {
        if (req.body.userId && req.body.userId !== authenticatedUserId) {
          console.error(`🚨 SECURITY: Write operation attempted with wrong userId. Auth: ${authenticatedUserId}, Body: ${req.body.userId}`);
          return res.status(403).json({ 
            error: 'Cannot perform operations on other user data',
            code: 'FORBIDDEN_WRITE_OTHER_USER' 
          });
        }
        
        // Automatically set userId to authenticated user for all write operations
        req.body.userId = authenticatedUserId;
      }
    }
    
    next();
  };
  
  // Audit log for sensitive operations
  static auditLog = (operation: string, userId: string, resourceType: string, resourceId?: string) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      operation,
      userId,
      resourceType,
      resourceId,
      ip: 'unknown' // Would be filled from request context
    };
    
    // In production, this would go to a secure audit log service
    if (process.env.NODE_ENV === 'production') {
      console.log('🔐 AUDIT:', JSON.stringify(logEntry));
    }
  };
  
  // Prevent privilege escalation
  static preventPrivilegeEscalation = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const authenticatedUserId = (req as any).authenticatedUserId;
    
    // List of fields users should never be able to modify
    const restrictedFields = [
      'role', 'isAdmin', 'permissions', 'adminLevel', 
      'stripeCustomerId', 'subscription.status', 'subscription.planType',
      'createdAt', 'id' // ID and timestamps should be system-controlled
    ];
    
    if (body && typeof body === 'object') {
      const attemptedFields = Object.keys(body);
      const violations = attemptedFields.filter(field => 
        restrictedFields.some(restricted => field.includes(restricted))
      );
      
      if (violations.length > 0) {
        console.error(`🚨 PRIVILEGE ESCALATION ATTEMPT: User ${authenticatedUserId} tried to modify: ${violations.join(', ')}`);
        return res.status(403).json({ 
          error: 'Cannot modify restricted fields',
          code: 'FORBIDDEN_FIELD_MODIFICATION',
          violations 
        });
      }
    }
    
    next();
  };
}

// Middleware to enforce database security
export const enforceDataSecurity = [
  DatabaseSecurityManager.enforceUserIsolation,
  DatabaseSecurityManager.validateWriteOperation,
  DatabaseSecurityManager.preventPrivilegeEscalation
];

// Helper to build secure database queries with user isolation
export const secureQuery = {
  forUser: (userId: string) => ({
    userId
  }),
  
  withUserCheck: (authenticatedUserId: string, requestedUserId?: string) => {
    if (requestedUserId && requestedUserId !== authenticatedUserId) {
      throw new Error(`Access denied: User ${authenticatedUserId} cannot access data for ${requestedUserId}`);
    }
    return { userId: authenticatedUserId };
  }
};