// Domain and Environment Configuration
export const config = {
  // Domain configuration
  domain: {
    // Current Replit domain
    replit: 'b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev',
    
    // Production domains (when deployed)
    production: process.env.NODE_ENV === 'production' 
      ? (typeof window !== 'undefined' ? window.location.hostname : 'localhost')
      : 'b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev',
    
    // Get current domain
    current: typeof window !== 'undefined' ? window.location.hostname : 'localhost',
    
    // Custom domain candidates
    candidates: [
      'hydromate.com',
      'myhydromate.com', 
      'hydromate.app',
      'stayhydromate.com',
      'hydromate.io'
    ]
  },

  // API configuration
  api: {
    baseUrl: process.env.NODE_ENV === 'production' 
      ? `https://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`
      : `https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev`,
    
    // Webhook endpoints for external services
    webhooks: {
      stripe: '/api/stripe/webhook',
      openweather: '/api/weather/webhook'
    }
  },

  // Auth configuration
  auth: {
    loginUrl: '/api/login',
    logoutUrl: '/api/logout',
    callbackUrl: '/api/callback'
  },

  // App metadata
  app: {
    name: 'HydroMate',
    description: 'Smart Hydration Tracking Application',
    version: '1.0.0',
    author: 'HydroMate Team'
  },

  // External service URLs
  external: {
    // Stripe customer portal return URL
    stripeReturn: process.env.NODE_ENV === 'production'
      ? `https://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}/profile`
      : 'https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/profile',
    
    // OAuth redirect URLs  
    oauthRedirect: process.env.NODE_ENV === 'production'
      ? `https://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}/api/callback`
      : 'https://b5fa9c6c-b079-4172-8433-00334db933ad-00-2ttq89vigkrig.spock.replit.dev/api/callback'
  },

  // Feature flags
  features: {
    enableAnalytics: true,
    enableNotifications: true,
    enableWeather: true,
    enablePremium: true,
    enableAccessControl: process.env.NODE_ENV === 'production'
  }
};

// Utility functions
export const getFullUrl = (path: string) => {
  return `${config.api.baseUrl}${path}`;
};

export const getCurrentDomain = () => {
  return config.domain.current;
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

export const getAuthUrls = () => {
  const baseUrl = config.api.baseUrl;
  return {
    login: `${baseUrl}${config.auth.loginUrl}`,
    logout: `${baseUrl}${config.auth.logoutUrl}`,
    callback: `${baseUrl}${config.auth.callbackUrl}`
  };
};