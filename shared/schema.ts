import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  real,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Hydration profiles for personalized goals
export const hydrationProfiles = pgTable("hydration_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  weight: real("weight").notNull(), // in kg
  gender: varchar("gender").notNull(), // 'male', 'female', 'other'
  activityLevel: varchar("activity_level").notNull(), // 'sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'
  dailyGoal: integer("daily_goal").notNull(), // in ml
  customGoal: integer("custom_goal"), // user override in ml
  timezone: varchar("timezone").default("UTC"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Water intake logs
export const intakeLogs = pgTable("intake_logs", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(), // in ml
  beverageType: varchar("beverage_type").default("water"), // 'water', 'tea', 'coffee', 'juice', etc.
  hydrationPercentage: integer("hydration_percentage").default(100), // 0-100%
  loggedAt: timestamp("logged_at").defaultNow(),
  date: date("date").notNull(), // for daily aggregation
});

// Reminders configuration
export const reminders = pgTable("reminders", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  intervalMinutes: integer("interval_minutes").notNull().default(60),
  startTime: varchar("start_time").notNull().default("08:00"), // HH:mm format
  endTime: varchar("end_time").notNull().default("22:00"), // HH:mm format
  soundId: varchar("sound_id").default("default"),
  isEnabled: boolean("is_enabled").default(true),
  weatherAdjustment: boolean("weather_adjustment").default(false), // premium feature
  activityAdjustment: boolean("activity_adjustment").default(false), // premium feature
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Achievements system
export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description").notNull(),
  iconName: varchar("icon_name").notNull(),
  badgeColor: varchar("badge_color").notNull(),
  requirement: jsonb("requirement").notNull(), // flexible requirement structure
  isPremium: boolean("is_premium").default(false),
});

// User achievements (many-to-many)
export const userAchievements = pgTable("user_achievements", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  achievementId: integer("achievement_id").notNull().references(() => achievements.id),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

// Daily summaries for analytics
export const dailySummaries = pgTable("daily_summaries", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  date: date("date").notNull(),
  totalIntake: integer("total_intake").notNull().default(0), // in ml
  goalAmount: integer("goal_amount").notNull(), // in ml
  goalMet: boolean("goal_met").default(false),
  streakDay: integer("streak_day").default(0),
  logCount: integer("log_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Premium subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  planType: varchar("plan_type").notNull(), // 'monthly', 'annual'
  status: varchar("status").notNull(), // 'active', 'cancelled', 'expired'
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  hydrationProfile: one(hydrationProfiles),
  intakeLogs: many(intakeLogs),
  reminders: one(reminders),
  userAchievements: many(userAchievements),
  dailySummaries: many(dailySummaries),
  subscription: one(subscriptions),
}));

export const hydrationProfilesRelations = relations(hydrationProfiles, ({ one }) => ({
  user: one(users, {
    fields: [hydrationProfiles.userId],
    references: [users.id],
  }),
}));

export const intakeLogsRelations = relations(intakeLogs, ({ one }) => ({
  user: one(users, {
    fields: [intakeLogs.userId],
    references: [users.id],
  }),
}));

export const remindersRelations = relations(reminders, ({ one }) => ({
  user: one(users, {
    fields: [reminders.userId],
    references: [users.id],
  }),
}));

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, {
    fields: [userAchievements.userId],
    references: [users.id],
  }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}));

export const dailySummariesRelations = relations(dailySummaries, ({ one }) => ({
  user: one(users, {
    fields: [dailySummaries.userId],
    references: [users.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertHydrationProfileSchema = createInsertSchema(hydrationProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertIntakeLogSchema = createInsertSchema(intakeLogs).omit({
  id: true,
  loggedAt: true,
});

export const insertReminderSchema = createInsertSchema(reminders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDailySummarySchema = createInsertSchema(dailySummaries).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type HydrationProfile = typeof hydrationProfiles.$inferSelect;
export type InsertHydrationProfile = z.infer<typeof insertHydrationProfileSchema>;
export type IntakeLog = typeof intakeLogs.$inferSelect;
export type InsertIntakeLog = z.infer<typeof insertIntakeLogSchema>;
export type Reminder = typeof reminders.$inferSelect;
export type InsertReminder = z.infer<typeof insertReminderSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type DailySummary = typeof dailySummaries.$inferSelect;
export type InsertDailySummary = z.infer<typeof insertDailySummarySchema>;
export type Subscription = typeof subscriptions.$inferSelect;
