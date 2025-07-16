import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { weatherService } from "./weather";
import { generateSitemap } from "./sitemap";
import { conditionalAuth } from "./feature-flags";
import { AccessControlManager, accessControlProfiles } from "./access-control";
import { getCurrentDateInTimezone, getDateRangeInTimezone } from "./dateUtils";
import { 
  requireUserOwnership, 
  sanitizeInput, 
  validateSchema, 
  SecurityRateLimiter,
  securityHeaders 
} from "./security";
import {
  insertHydrationProfileSchema,
  insertIntakeLogSchema,
  insertReminderSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize security middleware
  const securityRateLimit = new SecurityRateLimiter(
    process.env.NODE_ENV === 'production' ? 100 : 1000, // requests per minute
    60000, // 1 minute window
    300000 // 5 minute block duration
  );
  
  const accessControl = new AccessControlManager(
    process.env.NODE_ENV === 'production' 
      ? accessControlProfiles.restrictedProduction 
      : accessControlProfiles.development
  );

  // Apply global security middleware
  app.use(securityHeaders);
  app.use(sanitizeInput);
  app.use(securityRateLimit.middleware);
  app.use(accessControl.rateLimit);
  app.use(accessControl.ipWhitelist);

  // Auth middleware
  await setupAuth(app);

  // Development-only route to enable mock user
  if (process.env.NODE_ENV === 'development') {
    app.post('/api/dev/enable-mock-user', async (req: any, res) => {
      try {
        const mockUser = {
          claims: {
            sub: 'dev-user-123',
            email: 'dev@quenchnow.com',
            first_name: 'Dev',
            last_name: 'User',
            profile_image_url: null,
          },
          expires_at: Math.floor(Date.now() / 1000) + 3600,
        };

        console.log('🔧 Setting mock user session:', mockUser.claims.sub);
        
        // Ensure session exists first
        if (!req.session) {
          return res.status(500).json({ success: false, message: 'Session not available' });
        }
        
        // Set mock user session
        (req.session as any).user = mockUser;
        
        console.log('🔧 Session after setting user:', req.session.id);
        console.log('🔧 Session user check:', (req.session as any).user ? 'exists' : 'missing');
        
        // Create user in database if doesn't exist
        await storage.upsertUser({
          id: mockUser.claims.sub,
          email: mockUser.claims.email,
          firstName: mockUser.claims.first_name,
          lastName: mockUser.claims.last_name,
          profileImageUrl: mockUser.claims.profile_image_url,
        });

        // Force session save before responding
        req.session.save((err: any) => {
          if (err) {
            console.error('❌ Session save error:', err);
            return res.status(500).json({ success: false, message: 'Session save failed' });
          }
          console.log('✅ Session saved successfully, ID:', req.session.id);
          console.log('✅ Saved session user:', (req.session as any).user ? 'exists' : 'missing');
          
          // For development, also set a simple dev token in localStorage
          res.json({ 
            success: true, 
            message: 'Mock user enabled for development',
            devToken: 'dev-auth-' + mockUser.claims.sub,
            sessionId: req.session.id,
            redirectUrl: '/' // Redirect to main app after auth
          });
        });
      } catch (error) {
        console.error('Error creating mock user:', error);
        res.status(500).json({ success: false, message: 'Failed to create mock user' });
      }
    });
  }

  // Auth routes  
  app.get('/api/auth/user', conditionalAuth, requireUserOwnership, async (req: any, res) => {
    try {
      // Debug logging for development
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Auth endpoint debug:');
        console.log('  - Session user:', (req.session as any)?.user ? 'exists' : 'missing');
        console.log('  - req.user:', req.user ? 'exists' : 'missing');
        console.log('  - User claims:', req.user?.claims?.sub || 'none');
      }

      const userId = req.user.claims.sub;
      let user = await storage.getUser(userId);
      
      // Create user if not exists (for both test and dev users)
      if (!user) {
        user = await storage.upsertUser({
          id: userId,
          email: req.user.claims.email,
          firstName: req.user.claims.first_name,
          lastName: req.user.claims.last_name,
          profileImageUrl: req.user.claims.profile_image_url,
        });
        
        if (process.env.NODE_ENV === 'development') {
          console.log('✓ Created new user in database:', userId);
        }
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Hydration profile routes
  app.get('/api/profile', conditionalAuth, requireUserOwnership, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getHydrationProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post('/api/profile', conditionalAuth, requireUserOwnership, validateSchema(insertHydrationProfileSchema), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Calculate daily goal based on weight, gender, and activity level
      const weight = parseFloat(req.body.weight) || 70;
      const gender = req.body.gender || 'other';
      const activityLevel = req.body.activityLevel || 'moderately_active';
      const customGoal = req.body.customGoal ? parseInt(req.body.customGoal) : null;
      
      const baseGoal = calculateDailyHydrationGoal(weight, gender, activityLevel);
      const dailyGoal = customGoal || baseGoal;
      
      const profileData = {
        userId,
        weight,
        gender,
        activityLevel,
        dailyGoal,
        customGoal,
        timezone: req.body.timezone || 'UTC',
        location: req.body.location || null,
        useGeolocation: req.body.useGeolocation !== false,
        weatherEnabled: req.body.weatherEnabled !== false,
      };
      
      // Validate against schema
      const validatedData = insertHydrationProfileSchema.parse(profileData);
      
      const profile = await storage.upsertHydrationProfile(validatedData);
      res.json(profile);
    } catch (error) {
      console.error("Error saving profile:", error);
      if (error.issues) {
        res.status(400).json({ 
          message: "Validation error", 
          details: error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`) 
        });
      } else {
        res.status(500).json({ message: "Failed to save profile" });
      }
    }
  });

  // Intake log routes
  app.post('/api/intake', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const today = getCurrentDateInTimezone('America/Toronto');
      
      const logData = insertIntakeLogSchema.parse({
        ...req.body,
        userId,
        date: today,
      });

      const intake = await storage.createIntakeLog(logData);
      
      // Update daily summary
      await updateDailySummary(userId, today);
      
      res.json(intake);
    } catch (error) {
      console.error("Error logging intake:", error);
      res.status(500).json({ message: "Failed to log intake" });
    }
  });

  app.get('/api/intake/today', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const today = getCurrentDateInTimezone('America/Toronto');
      const logs = await storage.getIntakeLogsByDate(userId, today);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching intake logs:", error);
      res.status(500).json({ message: "Failed to fetch intake logs" });
    }
  });

  app.get('/api/intake/range', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start date and end date are required" });
      }
      
      const logs = await storage.getIntakeLogsByDateRange(userId, startDate as string, endDate as string);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching intake logs:", error);
      res.status(500).json({ message: "Failed to fetch intake logs" });
    }
  });

  // Dashboard data route
  app.get('/api/dashboard', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const today = getCurrentDateInTimezone('America/Toronto');
      
      // Get today's data
      const [profile, todayIntake, todaySummary, streak, achievements] = await Promise.all([
        storage.getHydrationProfile(userId),
        storage.getTotalIntakeForDate(userId, today),
        storage.getDailySummary(userId, today),
        storage.getStreakCount(userId),
        storage.getUserAchievements(userId),
      ]);

      // Get last 7 days for chart
      const { startDate } = getDateRangeInTimezone(6, 'America/Toronto');
      
      const weekSummaries = await storage.getDailySummariesByRange(userId, startDate, today);

      res.json({
        profile,
        todayIntake,
        todaySummary,
        streak,
        achievements: achievements.length,
        weekSummaries,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // Reminder routes
  app.get('/api/reminders', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const reminder = await storage.getReminder(userId);
      res.json(reminder);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      res.status(500).json({ message: "Failed to fetch reminders" });
    }
  });

  app.post('/api/reminders', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const reminderData = {
        userId,
        intervalMinutes: parseInt(req.body.intervalMinutes) || 60,
        startTime: req.body.startTime || '08:00',
        endTime: req.body.endTime || '22:00',
        isEnabled: req.body.isEnabled !== false,
        soundId: req.body.soundId || 'default',
      };
      
      // Validate against schema
      const validatedData = insertReminderSchema.parse(reminderData);
      
      const reminder = await storage.upsertReminder(validatedData);
      res.json(reminder);
    } catch (error) {
      console.error("Error saving reminder:", error);
      if (error.issues) {
        res.status(400).json({ 
          message: "Validation error", 
          details: error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`) 
        });
      } else {
        res.status(500).json({ message: "Failed to save reminder" });
      }
    }
  });

  // Achievement routes
  app.get('/api/achievements', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const [allAchievements, userAchievements] = await Promise.all([
        storage.getAllAchievements(),
        storage.getUserAchievements(userId),
      ]);
      
      const userAchievementIds = new Set(userAchievements.map(ua => ua.achievementId));
      const achievementsWithStatus = allAchievements.map(achievement => ({
        ...achievement,
        unlocked: userAchievementIds.has(achievement.id),
        unlockedAt: userAchievements.find(ua => ua.achievementId === achievement.id)?.unlockedAt,
      }));
      
      res.json(achievementsWithStatus);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  // Subscription status route
  app.get('/api/subscription', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const subscription = await storage.getSubscription(userId);
      const isPremium = subscription && subscription.status === 'active';
      res.json({ isPremium, subscription });
    } catch (error) {
      console.error("Error fetching subscription:", error);
      res.status(500).json({ message: "Failed to fetch subscription" });
    }
  });

  // Subscription plans route
  app.get('/api/subscription/plans', async (req: any, res) => {
    try {
      const { subscriptionPlans } = await import('./stripe');
      res.json(subscriptionPlans);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      res.status(500).json({ message: "Failed to fetch subscription plans" });
    }
  });

  // Stripe routes
  app.post('/api/stripe/create-checkout-session', conditionalAuth, async (req: any, res) => {
    try {
      const { createCheckoutSession } = await import('./stripe');
      const userId = req.user.claims.sub;
      const { priceId, successUrl, cancelUrl } = req.body;

      const session = await createCheckoutSession(userId, priceId, successUrl, cancelUrl);
      res.json({ url: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  app.post('/api/stripe/create-portal-session', conditionalAuth, async (req: any, res) => {
    try {
      const { createCustomerPortalSession } = await import('./stripe');
      const userId = req.user.claims.sub;
      const { returnUrl } = req.body;

      const subscription = await storage.getSubscription(userId);
      if (!subscription || !subscription.stripeCustomerId) {
        return res.status(400).json({ message: "No active subscription found" });
      }

      const session = await createCustomerPortalSession(subscription.stripeCustomerId, returnUrl);
      res.json({ url: session.url });
    } catch (error) {
      console.error("Error creating portal session:", error);
      res.status(500).json({ message: "Failed to create portal session" });
    }
  });

  app.post('/api/stripe/webhook', async (req, res) => {
    try {
      const { stripe, handleWebhookEvent } = await import('./stripe');
      const sig = req.headers['stripe-signature'];
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!webhookSecret) {
        console.log('STRIPE_WEBHOOK_SECRET not configured - skipping webhook verification');
        return res.status(200).json({ received: true, note: 'Webhook secret not configured' });
      }

      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig!, webhookSecret);
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      await handleWebhookEvent(event);
      res.json({ received: true });
    } catch (error) {
      console.error("Error processing webhook:", error);
      res.status(500).json({ message: "Failed to process webhook" });
    }
  });

  // Weather routes
  app.get("/api/weather", conditionalAuth, async (req: any, res) => {
    try {
      const { lat, lon, city } = req.query;
      
      if (!lat && !lon && !city) {
        return res.status(400).json({ message: "Location coordinates or city name required" });
      }

      let weatherData;
      if (lat && lon) {
        weatherData = await weatherService.getWeatherByCoords(parseFloat(lat), parseFloat(lon));
      } else if (city) {
        weatherData = await weatherService.getWeatherByCity(city);
      }

      const recommendation = weatherService.calculateHydrationAdjustment(weatherData);

      res.json({
        weather: weatherData,
        recommendation
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      res.status(500).json({ message: "Failed to fetch weather data" });
    }
  });

  // Analytics routes
  app.get('/api/analytics', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const period = (req.query.period as '7d' | '30d' | '90d') || '30d';
      
      const analytics = await storage.getAdvancedAnalytics(userId, period);
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.get('/api/analytics/weekly/:startDate/:endDate', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { startDate, endDate } = req.params;
      
      const analytics = await storage.generateWeeklyAnalytics(userId, startDate, endDate);
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching weekly analytics:", error);
      res.status(500).json({ message: "Failed to fetch weekly analytics" });
    }
  });

  app.get('/api/analytics/monthly/:month/:year', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const month = parseInt(req.params.month);
      const year = parseInt(req.params.year);
      
      const analytics = await storage.generateMonthlyAnalytics(userId, month, year);
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching monthly analytics:", error);
      res.status(500).json({ message: "Failed to fetch monthly analytics" });
    }
  });

  // SEO routes
  app.get('/sitemap.xml', (req, res) => {
    res.set('Content-Type', 'application/xml');
    res.send(generateSitemap());
  });

  app.get('/robots.txt', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(`User-agent: *
Allow: /

Sitemap: https://hydroflow.app/sitemap.xml

Disallow: /api/
Disallow: /profile
Disallow: /dashboard

Allow: /
Allow: /features
Allow: /pricing
Allow: /about
Allow: /privacy
Allow: /terms`);
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to calculate daily hydration goal
function calculateDailyHydrationGoal(weight: number, gender: string, activityLevel: string): number {
  // Base calculation: 35ml per kg of body weight
  let baseGoal = weight * 35;
  
  // Gender adjustment
  if (gender === 'male') {
    baseGoal *= 1.1;
  }
  
  // Activity level adjustments
  const activityMultipliers = {
    sedentary: 1.0,
    lightly_active: 1.1,
    moderately_active: 1.2,
    very_active: 1.3,
    extremely_active: 1.4,
  };
  
  baseGoal *= activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.0;
  
  // Round to nearest 50ml
  return Math.round(baseGoal / 50) * 50;
}

// Helper function to update daily summary
async function updateDailySummary(userId: string, date: string): Promise<void> {
  const [totalIntake, profile] = await Promise.all([
    storage.getTotalIntakeForDate(userId, date),
    storage.getHydrationProfile(userId),
  ]);
  
  if (!profile) return;
  
  const goalAmount = profile.customGoal || profile.dailyGoal;
  const goalMet = totalIntake >= goalAmount;
  
  const logs = await storage.getIntakeLogsByDate(userId, date);
  const logCount = logs.length;
  
  // Calculate streak
  let streakDay = 0;
  if (goalMet) {
    streakDay = await storage.getStreakCount(userId) + 1;
  }
  
  await storage.upsertDailySummary({
    userId,
    date,
    totalIntake,
    goalAmount,
    goalMet,
    streakDay,
    logCount,
  });
}
