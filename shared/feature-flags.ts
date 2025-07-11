export interface FeatureFlags {
  authRequired: boolean;
  premiumRequired: boolean;
  mockUsers: boolean;
  mockSubscriptions: boolean;
  testMode: boolean;
}

export const defaultFlags: FeatureFlags = {
  authRequired: false,  // TEMPORARILY DISABLED FOR TESTING
  premiumRequired: false,
  mockUsers: true,    // TEMPORARILY ENABLED FOR TESTING
  mockSubscriptions: false,
  testMode: true,     // TEMPORARILY ENABLED FOR TESTING
};

// Environment-based flag overrides
export const getFeatureFlags = (): FeatureFlags => {
  const flags = { ...defaultFlags };
  
  if (process.env.NODE_ENV === 'development') {
    // SECURITY: Explicit opt-in for development features only
    flags.authRequired = false;  // TEMPORARILY DISABLED FOR TESTING
    flags.premiumRequired = process.env.FF_PREMIUM_REQUIRED === 'true';
    flags.mockUsers = true;  // TEMPORARILY ENABLED FOR TESTING
    flags.mockSubscriptions = process.env.FF_MOCK_SUBSCRIPTIONS === 'true';
    flags.testMode = true;  // TEMPORARILY ENABLED FOR TESTING
  } else {
    // SECURITY: Production enforces strict security
    flags.authRequired = true;
    flags.premiumRequired = process.env.FF_PREMIUM_REQUIRED === 'true';
    flags.mockUsers = false;
    flags.mockSubscriptions = false;
    flags.testMode = false;
  }
  
  return flags;
};