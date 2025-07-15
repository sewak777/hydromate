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

  async generateWeeklyAnalytics(userId: string, startDate: string, endDate: string): Promise<any> {
    const summaries = await this.getDailySummariesByRange(userId, startDate, endDate);
    
    // Get actual beverage data
    const logs = await this.db
      .select({
        beverageType: intakeLogs.beverageType,
        amount: intakeLogs.amount
      })
      .from(intakeLogs)
      .where(
        and(
          eq(intakeLogs.userId, userId),
          gte(intakeLogs.loggedAt, startDate),
          lte(intakeLogs.loggedAt, endDate)
        )
      );

    // Calculate preferred beverage
    const beverageGroups = logs.reduce((acc, log) => {
      const type = log.beverageType || 'water';
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += log.amount;
      return acc;
    }, {} as Record<string, number>);

    const preferredBeverage = Object.entries(beverageGroups)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'water';

    const totalIntake = summaries.reduce((sum, summary) => sum + summary.totalIntake, 0);
    const averageDailyIntake = summaries.length > 0 ? totalIntake / summaries.length : 0;
    const goalsMetCount = summaries.filter(summary => summary.goalMet).length;
    const consistencyScore = summaries.length > 0 ? Math.round((goalsMetCount / summaries.length) * 100) : 0;
    
    return {
      totalIntake,
      averageDailyIntake: Math.round(averageDailyIntake),
      goalsMetCount,
      consistencyScore,
      preferredBeverage: preferredBeverage.charAt(0).toUpperCase() + preferredBeverage.slice(1).replace('_', ' '),
      totalLogs: logs.length,
      daily: summaries.map(summary => ({
        date: summary.date,
        intake: summary.totalIntake,
        goal: summary.goalAmount,
        percentage: summary.goalAmount > 0 ? Math.round((summary.totalIntake / summary.goalAmount) * 100) : 0,
        goalMet: summary.goalMet,
        logs: 1,
        hydrationPercentage: summary.goalAmount > 0 ? Math.round((summary.totalIntake / summary.goalAmount) * 100) : 0
      }))
    };
  }

  async generateMonthlyAnalytics(userId: string, month: number, year: number): Promise<any> {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const endDate = `${year}-${month.toString().padStart(2, '0')}-31`;
    
    return await this.generateWeeklyAnalytics(userId, startDate, endDate);
  }

  async getAdvancedAnalytics(userId: string, period: '7d' | '30d' | '90d'): Promise<any> {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const endDate = getCurrentDateInTimezone('America/Toronto');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = getDateInTimezone(startDate, 'America/Toronto');
    
    const summaries = await this.getDailySummariesByRange(userId, startDateStr, endDate);
    
    // Get actual beverage data
    const logs = await this.db
      .select({
        beverageType: intakeLogs.beverageType,
        amount: intakeLogs.amount
      })
      .from(intakeLogs)
      .where(
        and(
          eq(intakeLogs.userId, userId),
          gte(intakeLogs.loggedAt, startDateStr),
          lte(intakeLogs.loggedAt, endDate)
        )
      );

    // Calculate preferred beverage
    const beverageGroups = logs.reduce((acc, log) => {
      const type = log.beverageType || 'water';
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += log.amount;
      return acc;
    }, {} as Record<string, number>);

    const preferredBeverage = Object.entries(beverageGroups)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || 'water';

    const totalIntake = summaries.reduce((sum, summary) => sum + summary.totalIntake, 0);
    const averageDailyIntake = summaries.length > 0 ? totalIntake / summaries.length : 0;
    const goalsMetCount = summaries.filter(summary => summary.goalMet).length;
    const consistencyScore = summaries.length > 0 ? Math.round((goalsMetCount / summaries.length) * 100) : 0;

    // Get beverage distribution and patterns
    const beverageDistribution = await this.getBeverageDistribution(userId, startDateStr, endDate);
    const patterns = await this.getHydrationPatterns(userId, startDateStr, endDate);
    
    return {
      daily: summaries.map(summary => ({
        date: summary.date,
        intake: summary.totalIntake,
        goal: summary.goalAmount,
        percentage: summary.goalAmount > 0 ? Math.round((summary.totalIntake / summary.goalAmount) * 100) : 0,
        goalMet: summary.goalMet,
        logs: 1,
        hydrationPercentage: summary.goalAmount > 0 ? Math.round((summary.totalIntake / summary.goalAmount) * 100) : 0
      })),
      weekly: {
        totalIntake,
        averageDailyIntake: Math.round(averageDailyIntake),
        goalsMetCount,
        consistencyScore,
        preferredBeverage: preferredBeverage.charAt(0).toUpperCase() + preferredBeverage.slice(1).replace('_', ' '),
        totalLogs: logs.length
      },
      monthly: {
        totalIntake,
        averageDailyIntake: Math.round(averageDailyIntake),
        goalsMetCount,
        bestStreak: 0,
        consistencyScore,
        preferredBeverage: preferredBeverage.charAt(0).toUpperCase() + preferredBeverage.slice(1).replace('_', ' '),
        totalLogs: logs.length
      },
      insights: {
        bestDay: 'N/A',
        worstDay: 'N/A',
        averageFirstLog: 'N/A',
        averageLastLog: 'N/A',
        mostActiveHour: 'N/A',
        beverageDistribution,
        patterns: patterns.patterns
      }
    };
  }

  async getBeverageDistribution(userId: string, startDate: string, endDate: string): Promise<any[]> {
    const logs = await this.db
      .select({
        beverageType: intakeLogs.beverageType,
        amount: intakeLogs.amount
      })
      .from(intakeLogs)
      .where(
        and(
          eq(intakeLogs.userId, userId),
          gte(intakeLogs.loggedAt, startDate),
          lte(intakeLogs.loggedAt, endDate)
        )
      );

    if (logs.length === 0) {
      return [{ type: 'Water', percentage: 100, color: '#2563eb' }];
    }

    // Calculate total intake
    const totalIntake = logs.reduce((sum, log) => sum + log.amount, 0);

    // Group by beverage type
    const beverageGroups = logs.reduce((acc, log) => {
      const type = log.beverageType || 'water';
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type] += log.amount;
      return acc;
    }, {} as Record<string, number>);

    // Convert to percentage and add colors
    const beverageColors = {
      water: '#2563eb',
      tea: '#a16207',
      coffee: '#92400e',
      juice: '#ea580c',
      sports_drink: '#eab308',
      soda: '#dc2626',
      milk: '#6b7280',
      other: '#059669'
    };

    return Object.entries(beverageGroups).map(([type, amount]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' '),
      percentage: Math.round((amount / totalIntake) * 100),
      color: beverageColors[type as keyof typeof beverageColors] || '#6b7280'
    }));
  }

  async getHydrationPatterns(userId: string, startDate: string, endDate: string): Promise<any> {
    const logs = await this.db
      .select({
        loggedAt: intakeLogs.loggedAt,
        amount: intakeLogs.amount
      })
      .from(intakeLogs)
      .where(
        and(
          eq(intakeLogs.userId, userId),
          gte(intakeLogs.loggedAt, startDate),
          lte(intakeLogs.loggedAt, endDate)
        )
      )
      .orderBy(intakeLogs.loggedAt);

    if (logs.length === 0) {
      return {
        patterns: ['No data available for pattern analysis']
      };
    }

    // Analyze hourly patterns
    const hourlyData = logs.reduce((acc, log) => {
      const hour = new Date(log.loggedAt).getHours();
      if (!acc[hour]) {
        acc[hour] = 0;
      }
      acc[hour] += log.amount;
      return acc;
    }, {} as Record<number, number>);

    // Find peak hours
    const peakHours = Object.entries(hourlyData)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([hour]) => `${hour}:00`);

    return {
      patterns: [
        `Most active hydration hours: ${peakHours.join(', ')}`,
        `Average intake per session: ${Math.round(logs.reduce((sum, log) => sum + log.amount, 0) / logs.length)}ml`,
        `Total logging sessions: ${logs.length}`
      ]
    };
  }
}

export const storage = new DatabaseStorage();
