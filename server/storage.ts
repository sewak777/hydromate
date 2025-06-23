import {
  users,
  hydrationProfiles,
  intakeLogs,
  reminders,
  achievements,
  userAchievements,
  dailySummaries,
  subscriptions,
  type User,
  type UpsertUser,
  type HydrationProfile,
  type InsertHydrationProfile,
  type IntakeLog,
  type InsertIntakeLog,
  type Reminder,
  type InsertReminder,
  type Achievement,
  type UserAchievement,
  type DailySummary,
  type InsertDailySummary,
  type Subscription,
  type InsertSubscription,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, sum, count } from "drizzle-orm";
import { getFeatureFlags } from "@shared/feature-flags";
import { getCurrentDateInTimezone, getDateInTimezone } from "./dateUtils";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Hydration profile operations
  getHydrationProfile(userId: string): Promise<HydrationProfile | undefined>;
  upsertHydrationProfile(profile: InsertHydrationProfile): Promise<HydrationProfile>;
  
  // Intake log operations
  createIntakeLog(log: InsertIntakeLog): Promise<IntakeLog>;
  getIntakeLogsByDate(userId: string, date: string): Promise<IntakeLog[]>;
  getIntakeLogsByDateRange(userId: string, startDate: string, endDate: string): Promise<IntakeLog[]>;
  
  // Reminder operations
  getReminder(userId: string): Promise<Reminder | undefined>;
  upsertReminder(reminder: InsertReminder): Promise<Reminder>;
  
  // Achievement operations
  getAllAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: string): Promise<UserAchievement[]>;
  unlockAchievement(userId: string, achievementId: number): Promise<UserAchievement>;
  
  // Daily summary operations
  getDailySummary(userId: string, date: string): Promise<DailySummary | undefined>;
  upsertDailySummary(summary: InsertDailySummary): Promise<DailySummary>;
  getDailySummariesByRange(userId: string, startDate: string, endDate: string): Promise<DailySummary[]>;
  
  // Subscription operations
  getSubscription(userId: string): Promise<Subscription | undefined>;
  upsertSubscription(subscription: InsertSubscription): Promise<Subscription>;
  
  // Analytics operations
  getStreakCount(userId: string): Promise<number>;
  getTotalIntakeForDate(userId: string, date: string): Promise<number>;
  generateWeeklyAnalytics(userId: string, startDate: string, endDate: string): Promise<any>;
  generateMonthlyAnalytics(userId: string, month: number, year: number): Promise<any>;
  getAdvancedAnalytics(userId: string, period: '7d' | '30d' | '90d'): Promise<any>;
  getBeverageDistribution(userId: string, startDate: string, endDate: string): Promise<any[]>;
  getHydrationPatterns(userId: string, startDate: string, endDate: string): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Hydration profile operations
  async getHydrationProfile(userId: string): Promise<HydrationProfile | undefined> {
    const [profile] = await db
      .select()
      .from(hydrationProfiles)
      .where(eq(hydrationProfiles.userId, userId));
    return profile;
  }

  async upsertHydrationProfile(profile: InsertHydrationProfile): Promise<HydrationProfile> {
    const existing = await this.getHydrationProfile(profile.userId);
    
    if (existing) {
      const [updated] = await db
        .update(hydrationProfiles)
        .set({ ...profile, updatedAt: new Date() })
        .where(eq(hydrationProfiles.userId, profile.userId))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(hydrationProfiles)
        .values(profile)
        .returning();
      return created;
    }
  }

  // Intake log operations
  async createIntakeLog(log: InsertIntakeLog): Promise<IntakeLog> {
    const [created] = await db
      .insert(intakeLogs)
      .values(log)
      .returning();
    return created;
  }

  async getIntakeLogsByDate(userId: string, date: string): Promise<IntakeLog[]> {
    return await db
      .select()
      .from(intakeLogs)
      .where(and(eq(intakeLogs.userId, userId), eq(intakeLogs.date, date)))
      .orderBy(desc(intakeLogs.loggedAt));
  }

  async getIntakeLogsByDateRange(userId: string, startDate: string, endDate: string): Promise<IntakeLog[]> {
    return await db
      .select()
      .from(intakeLogs)
      .where(
        and(
          eq(intakeLogs.userId, userId),
          gte(intakeLogs.date, startDate),
          lte(intakeLogs.date, endDate)
        )
      )
      .orderBy(desc(intakeLogs.loggedAt));
  }

  // Reminder operations
  async getReminder(userId: string): Promise<Reminder | undefined> {
    const [reminder] = await db
      .select()
      .from(reminders)
      .where(eq(reminders.userId, userId));
    return reminder;
  }

  async upsertReminder(reminder: InsertReminder): Promise<Reminder> {
    const existing = await this.getReminder(reminder.userId);
    
    if (existing) {
      const [updated] = await db
        .update(reminders)
        .set({ ...reminder, updatedAt: new Date() })
        .where(eq(reminders.userId, reminder.userId))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(reminders)
        .values(reminder)
        .returning();
      return created;
    }
  }

  // Achievement operations
  async getAllAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async getUserAchievements(userId: string): Promise<UserAchievement[]> {
    return await db
      .select()
      .from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.unlockedAt));
  }

  async unlockAchievement(userId: string, achievementId: number): Promise<UserAchievement> {
    const [unlocked] = await db
      .insert(userAchievements)
      .values({ userId, achievementId })
      .returning();
    return unlocked;
  }

  // Daily summary operations
  async getDailySummary(userId: string, date: string): Promise<DailySummary | undefined> {
    const [summary] = await db
      .select()
      .from(dailySummaries)
      .where(and(eq(dailySummaries.userId, userId), eq(dailySummaries.date, date)));
    return summary;
  }

  async upsertDailySummary(summary: InsertDailySummary): Promise<DailySummary> {
    const existing = await this.getDailySummary(summary.userId, summary.date);
    
    if (existing) {
      const [updated] = await db
        .update(dailySummaries)
        .set(summary)
        .where(and(eq(dailySummaries.userId, summary.userId), eq(dailySummaries.date, summary.date)))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(dailySummaries)
        .values(summary)
        .returning();
      return created;
    }
  }

  async getDailySummariesByRange(userId: string, startDate: string, endDate: string): Promise<DailySummary[]> {
    return await db
      .select()
      .from(dailySummaries)
      .where(
        and(
          eq(dailySummaries.userId, userId),
          gte(dailySummaries.date, startDate),
          lte(dailySummaries.date, endDate)
        )
      )
      .orderBy(desc(dailySummaries.date));
  }

  // Subscription operations
  async getSubscription(userId: string): Promise<Subscription | undefined> {
    const flags = getFeatureFlags();
    
    if (flags.mockSubscriptions || flags.testMode || !flags.premiumRequired) {
      // Return mock premium subscription
      return {
        id: 1,
        userId,
        planType: 'year',
        status: 'active',
        stripeCustomerId: 'cus_mock_123',
        stripeSubscriptionId: 'sub_mock_123',
        stripePriceId: 'price_annual',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    
    const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId));
    return subscription;
  }

  async upsertSubscription(subscriptionData: InsertSubscription): Promise<Subscription> {
    const [subscription] = await db
      .insert(subscriptions)
      .values(subscriptionData)
      .onConflictDoUpdate({
        target: subscriptions.userId,
        set: {
          ...subscriptionData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return subscription;
  }

  // Analytics operations
  async getStreakCount(userId: string): Promise<number> {
    const summaries = await db
      .select()
      .from(dailySummaries)
      .where(and(eq(dailySummaries.userId, userId), eq(dailySummaries.goalMet, true)))
      .orderBy(desc(dailySummaries.date))
      .limit(365); // Check up to a year back

    let streak = 0;
    const today = getCurrentDateInTimezone('America/Toronto');
    let currentDate = new Date();
    
    // Parse today's date in local timezone
    const todayParts = today.split('-');
    currentDate = new Date(parseInt(todayParts[0]), parseInt(todayParts[1]) - 1, parseInt(todayParts[2]));

    for (const summary of summaries) {
      const summaryDate = summary.date;
      const expectedDate = getDateInTimezone(currentDate, 'America/Toronto');
      
      if (summaryDate === expectedDate) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  async getTotalIntakeForDate(userId: string, date: string): Promise<number> {
    const result = await db
      .select({ total: sum(intakeLogs.amount) })
      .from(intakeLogs)
      .where(and(eq(intakeLogs.userId, userId), eq(intakeLogs.date, date)));
    
    return Number(result[0]?.total) || 0;
  }
}

export const storage = new DatabaseStorage();
