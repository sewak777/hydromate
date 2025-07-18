import { storage } from "./storage";
import { Request, Response, NextFunction } from "express";

export class AccessControlManager {
  private profile: AccessControlProfile;

  constructor(profile: AccessControlProfile) {
    this.profile = profile;
  }

  // Middleware to check user access
  checkUserAccess = async (req: any, res: Response, next: NextFunction) => {
    try {
      // Skip access control in development mode
      if (process.env.NODE_ENV === 'development') {
        return next();
      }

      // Skip if access control is disabled
      if (!this.profile.enabled) {
        return next();
      }

      // Get user ID from authenticated request
      const userId = req.user?.claims?.sub;
      if (!userId) {
        return res.status(401).json({ 
          success: false, 
          message: 'Authentication required' 
        });
      }

      // Check if user has access control entry
      const accessControl = await storage.getUserAccessControl(userId);
      
      if (!accessControl) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access request required. Please submit an access request to use this application.',
          action: 'request_access'
        });
      }

      // Check access status
      if (accessControl.status === 'pending') {
        return res.status(403).json({ 
          success: false, 
          message: 'Access request pending approval. Please wait for administrator approval.',
          action: 'wait_for_approval'
        });
      }

      if (accessControl.status === 'rejected') {
        return res.status(403).json({ 
          success: false, 
          message: 'Access request rejected. Please contact administrator.',
          action: 'contact_admin'
        });
      }

      if (accessControl.status === 'suspended') {
        return res.status(403).json({ 
          success: false, 
          message: 'Access suspended. Please contact administrator.',
          action: 'contact_admin'
        });
      }

      // Access approved - continue
      next();
    } catch (error) {
      console.error('Access control check failed:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Access control check failed' 
      });
    }
  };

  // Rate limiting middleware
  rateLimit = (req: Request, res: Response, next: NextFunction) => {
    // Rate limiting logic can be added here
    next();
  };

  // IP whitelist middleware
  ipWhitelist = (req: Request, res: Response, next: NextFunction) => {
    if (this.profile.ipWhitelist && this.profile.ipWhitelist.length > 0) {
      const clientIp = req.ip || req.connection.remoteAddress;
      if (!this.profile.ipWhitelist.includes(clientIp || '')) {
        return res.status(403).json({ 
          success: false, 
          message: 'Access denied from this IP address' 
        });
      }
    }
    next();
  };
}

export interface AccessControlProfile {
  enabled: boolean;
  maxUsers?: number;
  requireApproval: boolean;
  ipWhitelist?: string[];
  allowedDomains?: string[];
}

export const accessControlProfiles = {
  development: {
    enabled: false,
    requireApproval: false,
  } as AccessControlProfile,
  
  restrictedProduction: {
    enabled: true,
    maxUsers: 50,
    requireApproval: true,
    allowedDomains: ['@gmail.com', '@replit.com'],
  } as AccessControlProfile,
  
  openProduction: {
    enabled: false,
    requireApproval: false,
  } as AccessControlProfile,
};