// Environment Security Manager
export class EnvironmentSecurity {
  
  // Validate all required environment variables are present
  static validateEnvironment(): { isValid: boolean; errors: string[] } {
    const required = {
      production: [
        'DATABASE_URL',
        'SESSION_SECRET',
        'REPL_ID',
        'REPLIT_DOMAINS',
        'OPENWEATHER_API_KEY'
      ],
      development: [
        'DATABASE_URL'
      ]
    };
    
    const isProduction = process.env.NODE_ENV === 'production';
    const requiredVars = isProduction ? required.production : required.development;
    const errors: string[] = [];
    
    requiredVars.forEach(varName => {
      const value = process.env[varName];
      if (!value || value.trim() === '') {
        errors.push(`Missing required environment variable: ${varName}`);
      } else if (varName.includes('SECRET') || varName.includes('KEY')) {
        // Validate secrets have minimum length and complexity
        if (value.length < 32) {
          errors.push(`${varName} must be at least 32 characters long`);
        }
        if (value === 'your_secret_here' || value.includes('example')) {
          errors.push(`${varName} contains placeholder value - please set real secret`);
        }
      }
    });
    
    // Additional production-specific validations
    if (isProduction) {
      // Validate DATABASE_URL format
      const dbUrl = process.env.DATABASE_URL;
      if (dbUrl && !dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
        errors.push('DATABASE_URL must be a valid PostgreSQL connection string');
      }
      
      // Validate domains are HTTPS in production
      const domains = process.env.REPLIT_DOMAINS;
      if (domains) {
        const domainList = domains.split(',');
        const hasInsecureDomain = domainList.some(domain => 
          domain.trim().startsWith('http://') || domain.trim().includes('localhost')
        );
        if (hasInsecureDomain) {
          errors.push('REPLIT_DOMAINS should not contain HTTP or localhost in production');
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  // Get safe environment info (without exposing secrets)
  static getSafeEnvironmentInfo() {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const hasDatabase = !!process.env.DATABASE_URL;
    const hasWeatherApi = !!process.env.OPENWEATHER_API_KEY;
    const hasStripe = !!process.env.STRIPE_SECRET_KEY;
    const hasSessionSecret = !!process.env.SESSION_SECRET;
    
    return {
      environment: nodeEnv,
      features: {
        database: hasDatabase,
        weather: hasWeatherApi,
        payments: hasStripe,
        authentication: hasSessionSecret
      },
      isProductionReady: nodeEnv === 'production' && hasDatabase && hasSessionSecret
    };
  }
  
  // Sanitize environment variables for client-side exposure
  static getClientSafeEnvVars() {
    return {
      NODE_ENV: process.env.NODE_ENV,
      // Only include non-sensitive variables that client needs
      APP_VERSION: process.env.APP_VERSION || '1.0.0',
      API_BASE_URL: process.env.NODE_ENV === 'production' 
        ? 'https://hydromate.ca' 
        : 'http://localhost:5000'
    };
  }
  
  // Check for common security misconfigurations
  static auditEnvironmentSecurity(): { issues: string[]; recommendations: string[] } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Check for default/weak secrets
    const sessionSecret = process.env.SESSION_SECRET;
    if (sessionSecret && (sessionSecret.length < 64 || sessionSecret === sessionSecret.toLowerCase())) {
      issues.push('SESSION_SECRET appears to be weak');
      recommendations.push('Generate a strong SESSION_SECRET with uppercase, lowercase, numbers, and symbols (64+ chars)');
    }
    
    // Check for exposed development variables in production
    if (process.env.NODE_ENV === 'production') {
      const devVars = ['DEBUG', 'DEV_MODE', 'SKIP_AUTH', 'TEST_MODE'];
      devVars.forEach(varName => {
        if (process.env[varName]) {
          issues.push(`Development variable ${varName} is set in production`);
          recommendations.push(`Remove ${varName} from production environment`);
        }
      });
    }
    
    // Check for hardcoded URLs in development
    if (process.env.NODE_ENV === 'development') {
      const domains = process.env.REPLIT_DOMAINS;
      if (domains && domains.includes('hydromate.ca')) {
        recommendations.push('Consider using localhost domains for development to avoid confusion');
      }
    }
    
    return { issues, recommendations };
  }
}

// Initialize environment security check
export const initializeEnvironmentSecurity = () => {
  const validation = EnvironmentSecurity.validateEnvironment();
  
  if (!validation.isValid) {
    console.error('🚨 ENVIRONMENT SECURITY ERRORS:');
    validation.errors.forEach(error => console.error(`  - ${error}`));
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Production environment validation failed. Cannot start server.');
    } else {
      console.warn('⚠️  Development environment has issues, but server will continue...');
    }
  }
  
  const audit = EnvironmentSecurity.auditEnvironmentSecurity();
  if (audit.issues.length > 0) {
    console.warn('⚠️  ENVIRONMENT SECURITY ISSUES:');
    audit.issues.forEach(issue => console.warn(`  - ${issue}`));
    console.warn('💡 RECOMMENDATIONS:');
    audit.recommendations.forEach(rec => console.warn(`  - ${rec}`));
  }
  
  const envInfo = EnvironmentSecurity.getSafeEnvironmentInfo();
  console.log('🔐 Environment Security Status:', envInfo);
  
  return validation.isValid;
};