import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { conditionalAuth } from "./feature-flags";
import {
  insertHydrationProfileSchema,
  insertIntakeLogSchema,
  insertReminderSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      let user = await storage.getUser(userId);
      
      // Create test user if not exists and in test mode
      if (!user && req.user.claims.email === 'test@example.com') {
        user = await storage.upsertUser({
          id: userId,
          email: req.user.claims.email,
          firstName: req.user.claims.first_name,
          lastName: req.user.claims.last_name,
          profileImageUrl: req.user.claims.profile_image_url,
        });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Hydration profile routes
  app.get('/api/profile', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profile = await storage.getHydrationProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post('/api/profile', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const profileData = insertHydrationProfileSchema.parse({
        ...req.body,
        userId,
      });
      
      // Calculate daily goal based on weight, gender, and activity level
      const baseGoal = calculateDailyHydrationGoal(profileData.weight, profileData.gender, profileData.activityLevel);
      profileData.dailyGoal = profileData.customGoal || baseGoal;
      
      const profile = await storage.upsertHydrationProfile(profileData);
      res.json(profile);
    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(500).json({ message: "Failed to save profile" });
    }
  });

  // Intake log routes
  app.post('/api/intake', conditionalAuth, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const today = new Date().toISOString().split('T')[0];
      
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
      const today = new Date().toISOString().split('T')[0];
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
      const today = new Date().toISOString().split('T')[0];
      
      // Get today's data
      const [profile, todayIntake, todaySummary, streak, achievements] = await Promise.all([
        storage.getHydrationProfile(userId),
        storage.getTotalIntakeForDate(userId, today),
        storage.getDailySummary(userId, today),
        storage.getStreakCount(userId),
        storage.getUserAchievements(userId),
      ]);

      // Get last 7 days for chart
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      const startDate = sevenDaysAgo.toISOString().split('T')[0];
      
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
      const reminderData = insertReminderSchema.parse({
        ...req.body,
        userId,
      });
      
      const reminder = await storage.upsertReminder(reminderData);
      res.json(reminder);
    } catch (error) {
      console.error("Error saving reminder:", error);
      res.status(500).json({ message: "Failed to save reminder" });
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
      res.json({ isPremium: !!subscription, subscription });
    } catch (error) {
      console.error("Error fetching subscription:", error);
      res.status(500).json({ message: "Failed to fetch subscription" });
    }
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
