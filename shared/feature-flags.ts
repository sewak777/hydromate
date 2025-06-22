export interface FeatureFlags {
  authRequired: boolean;
  premiumRequired: boolean;
  mockUsers: boolean;
  mockSubscriptions: boolean;
  testMode: boolean;
}

export const defaultFlags: FeatureFlags = {
  authRequired: false,
  premiumRequired: false,
  mockUsers: true,
  mockSubscriptions: false,
  testMode: true,
};

// Environment-based flag overrides
export const getFeatureFlags = (): FeatureFlags => {
  const flags = { ...defaultFlags };
  
  if (process.env.NODE_ENV === 'development') {
    // Development defaults - user-friendly for testing
    flags.authRequired = process.env.FF_AUTH_REQUIRED === 'true';
    flags.premiumRequired = process.env.FF_PREMIUM_REQUIRED === 'true';
    flags.mockUsers = process.env.FF_MOCK_USERS !== 'false';
    flags.mockSubscriptions = process.env.FF_MOCK_SUBSCRIPTIONS === 'true';
    flags.testMode = process.env.FF_TEST_MODE !== 'false';
  }
  
  return flags;
};