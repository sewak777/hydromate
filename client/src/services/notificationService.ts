import { CapacitorService } from './capacitor';

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  scheduledTime?: Date;
  actions?: Array<{
    action: string;
    title: string;
  }>;
}

export class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize(): Promise<boolean> {
    // Check if notifications are supported
    if (!('Notification' in window) && !CapacitorService.isNative()) {
      console.warn('Notifications not supported in this environment');
      return false;
    }

    // Request permission
    await this.requestPermission();
    return this.permission === 'granted';
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (CapacitorService.isNative()) {
      // For native apps, Capacitor handles permissions
      this.permission = 'granted';
      return 'granted';
    }

    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
    }

    return this.permission;
  }

  getPermission(): NotificationPermission {
    return this.permission;
  }

  async showNotification(options: NotificationOptions): Promise<void> {
    if (this.permission !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    if (CapacitorService.isNative()) {
      // Use Capacitor for native notifications
      await CapacitorService.scheduleNotification({
        title: options.title,
        body: options.body,
        id: Date.now(),
        schedule: options.scheduledTime ? { at: options.scheduledTime } : undefined
      });
      return;
    }

    // Web notifications
    if (options.scheduledTime) {
      // Schedule notification for later
      const delay = options.scheduledTime.getTime() - Date.now();
      if (delay > 0) {
        setTimeout(() => {
          this.createWebNotification(options);
        }, delay);
      }
    } else {
      // Show immediately
      this.createWebNotification(options);
    }
  }

  private createWebNotification(options: NotificationOptions): void {
    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon || '/favicon-32x32.png',
      badge: options.badge || '/favicon-16x16.png',
      tag: options.tag || 'hydroflow-notification',
      requireInteraction: true,
      actions: options.actions,
    });

    // Auto-close after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);

    // Handle clicks
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }

  async scheduleHydrationReminder(reminderTime: string, goalAmount: number): Promise<void> {
    const now = new Date();
    const [hours, minutes] = reminderTime.split(':').map(Number);
    
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);
    
    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    await this.showNotification({
      title: 'Hydration Reminder 💧',
      body: `Time to drink water! Your daily goal is ${goalAmount}ml.`,
      icon: '/android-chrome-192x192.png',
      tag: 'hydration-reminder',
      scheduledTime,
      actions: [
        { action: 'log-water', title: 'Log 250ml' },
        { action: 'dismiss', title: 'Dismiss' }
      ]
    });
  }

  async showGoalAchievedNotification(totalIntake: number, goalAmount: number): Promise<void> {
    await this.showNotification({
      title: 'Goal Achieved! 🎉',
      body: `Congratulations! You've reached your daily hydration goal of ${goalAmount}ml. Total intake: ${totalIntake}ml.`,
      icon: '/android-chrome-192x192.png',
      tag: 'goal-achieved'
    });
  }

  async showDrinkReminder(currentIntake: number, goalAmount: number): Promise<void> {
    const remaining = goalAmount - currentIntake;
    const percentage = Math.round((currentIntake / goalAmount) * 100);

    await this.showNotification({
      title: 'Hydration Check 💙',
      body: `You're ${percentage}% to your goal! ${remaining}ml remaining. Keep up the great work!`,
      icon: '/android-chrome-192x192.png',
      tag: 'drink-reminder',
      actions: [
        { action: 'log-250', title: 'Log 250ml' },
        { action: 'log-500', title: 'Log 500ml' }
      ]
    });
  }

  async testNotification(): Promise<void> {
    await this.showNotification({
      title: 'HydroFlow Test Notification',
      body: 'This is a test notification to demonstrate push notification functionality.',
      icon: '/android-chrome-192x192.png',
      tag: 'test-notification'
    });
  }
}

export const notificationService = NotificationService.getInstance();