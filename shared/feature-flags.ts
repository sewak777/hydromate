export interface FeatureFlags {
  authRequired: boolean;
  premiumRequired: boolean;
  mockUsers: boolean;
  mockSubscriptions: boolean;
  testMode: boolean;
}

export const defaultFlags: FeatureFlags = {
  authRequired: true,
  premiumRequired: true,
  mockUsers: false,
  mockSubscriptions: false,
  testMode: false,
};

// Environment-based flag overrides
export const getFeatureFlags = (): FeatureFlags => {
  const flags = { ...defaultFlags };
  
  if (process.env.NODE_ENV === 'development') {
    flags.authRequired = process.env.FF_AUTH_REQUIRED !== 'false';
    flags.premiumRequired = process.env.FF_PREMIUM_REQUIRED !== 'false';
    flags.mockUsers = process.env.FF_MOCK_USERS === 'true';
    flags.mockSubscriptions = process.env.FF_MOCK_SUBSCRIPTIONS === 'true';
    flags.testMode = process.env.FF_TEST_MODE === 'true';
  }
  
  return flags;
};