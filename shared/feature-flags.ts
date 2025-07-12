export interface FeatureFlags {
  authRequired: boolean;
  premiumRequired: boolean;
  mockUsers: boolean;
  mockSubscriptions: boolean;
  testMode: boolean;
}

export const defaultFlags: FeatureFlags = {
  authRequired: true,  // SECURITY: Always require auth by default
  premiumRequired: false,
  mockUsers: false,    // SECURITY: Disable mock users by default
  mockSubscriptions: false,
  testMode: false,     // SECURITY: Disable test mode by default
};

// Environment-based flag overrides
export const getFeatureFlags = (): FeatureFlags => {
  const flags = { ...defaultFlags };
  
  if (process.env.NODE_ENV === 'development') {
    // SECURITY: Explicit opt-in for development features only
    flags.authRequired = process.env.FF_AUTH_REQUIRED !== 'false';  // Default to true unless explicitly disabled
    flags.premiumRequired = process.env.FF_PREMIUM_REQUIRED === 'true';
    flags.mockUsers = process.env.FF_MOCK_USERS === 'true';  // Only enable when explicitly set
    flags.mockSubscriptions = process.env.FF_MOCK_SUBSCRIPTIONS === 'true';
    flags.testMode = process.env.FF_TEST_MODE === 'true';  // Only enable when explicitly set
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