import { Request, Response, NextFunction } from 'express';

export interface AccessControlConfig {
  allowedRoles: string[];
  requireAuthentication: boolean;
  rateLimitPerMinute?: number;
  ipWhitelist?: string[];
  secretAccessLevel: 'none' | 'read' | 'write';
}

export class AccessControlManager {
  private config: AccessControlConfig;
  private rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map();

  constructor(config: AccessControlConfig) {
    this.config = config;
  }

  // Middleware to check user permissions
  checkPermissions = (requiredLevel: 'read' | 'write' | 'admin') => {
    return (req: Request, res: Response, next: NextFunction) => {
      // Check authentication if required
      if (this.config.requireAuthentication && !req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Check user role
      const userRole = req.user?.role || 'guest';
      if (!this.config.allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      // Check secret access level
      if (this.isSecretEndpoint(req.path)) {
        if (this.config.secretAccessLevel === 'none') {
          return res.status(403).json({ error: 'Secret access denied' });
        }
        
        if (requiredLevel === 'write' && this.config.secretAccessLevel !== 'write') {
          return res.status(403).json({ error: 'Secret write access denied' });
        }
      }

      next();
    };
  };

  // Rate limiting middleware
  rateLimit = (req: Request, res: Response, next: NextFunction) => {
    if (!this.config.rateLimitPerMinute) {
      return next();
    }

    const clientId = this.getClientId(req);
    const now = Date.now();
    const windowStart = now - 60000; // 1 minute window

    const clientData = this.rateLimitStore.get(clientId);
    
    if (!clientData || clientData.resetTime < windowStart) {
      this.rateLimitStore.set(clientId, { count: 1, resetTime: now });
      return next();
    }

    if (clientData.count >= this.config.rateLimitPerMinute) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded',
        retryAfter: Math.ceil((clientData.resetTime + 60000 - now) / 1000)
      });
    }

    clientData.count++;
    next();
  };

  // IP whitelist middleware
  ipWhitelist = (req: Request, res: Response, next: NextFunction) => {
    if (!this.config.ipWhitelist?.length) {
      return next();
    }

    const clientIp = this.getClientIP(req);
    if (!this.config.ipWhitelist.includes(clientIp)) {
      return res.status(403).json({ error: 'IP address not whitelisted' });
    }

    next();
  };

  private isSecretEndpoint(path: string): boolean {
    const secretPaths = ['/api/secrets', '/api/config', '/api/admin'];
    return secretPaths.some(secretPath => path.startsWith(secretPath));
  }

  private getClientId(req: Request): string {
    return req.user?.id || this.getClientIP(req);
  }

  private getClientIP(req: Request): string {
    return req.ip || 
           req.connection.remoteAddress || 
           (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
           'unknown';
  }
}

// Pre-configured access control profiles
export const accessControlProfiles = {
  production: {
    allowedRoles: ['admin', 'user'],
    requireAuthentication: true,
    rateLimitPerMinute: 100,
    secretAccessLevel: 'none' as const
  },
  
  development: {
    allowedRoles: ['admin', 'user', 'guest'],
    requireAuthentication: false,
    rateLimitPerMinute: 1000,
    secretAccessLevel: 'read' as const
  },
  
  restrictedProduction: {
    allowedRoles: ['admin'],
    requireAuthentication: true,
    rateLimitPerMinute: 50,
    ipWhitelist: [], // Add trusted IPs
    secretAccessLevel: 'none' as const
  }
};