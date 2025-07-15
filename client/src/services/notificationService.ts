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
    // Check if we're in a restricted environment (like Replit iframe)
    const isRestricted = this.isRestrictedEnvironment();
    
    // Check if notifications are supported
    if (!('Notification' in window) && !CapacitorService.isNative()) {
      if (isRestricted) {
        console.warn('Notifications not supported in iframe environment - would work in production');
      } else {
        console.warn('Notifications not supported in this browser');
      }
      return false;
    }

    // In restricted environments, simulate permission for demo purposes
    if (isRestricted) {
      this.permission = 'granted'; // Simulate granted for demo
      return true;
    }

    // Request permission in normal environments
    await this.requestPermission();
    return this.permission === 'granted';
  }

  private isRestrictedEnvironment(): boolean {
    // Check if we're in an iframe or restricted environment
    try {
      return window.self !== window.top || 
             window.location.hostname.includes('replit.dev') ||
             window.location.hostname.includes('replit.app');
    } catch (e) {
      return true; // Assume restricted if we can't check
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (CapacitorService.isNative()) {
      // For native apps, Capacitor handles permissions
      this.permission = 'granted';
      return 'granted';
    }

    if ('Notification' in window) {
      // Check current permission state first
      this.permission = Notification.permission;
      
      // If already granted or denied, return current state
      if (this.permission !== 'default') {
        return this.permission;
      }
      
      // Request permission only if it's in default state
      try {
        this.permission = await Notification.requestPermission();
      } catch (error) {
        console.error('Error requesting notification permission:', error);
        this.permission = 'denied';
      }
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

    // In restricted environments, show a visual simulation
    if (this.isRestrictedEnvironment()) {
      this.showSimulatedNotification(options);
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

  private showSimulatedNotification(options: NotificationOptions): void {
    // Create a visual simulation of the notification using safe DOM manipulation
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-right duration-300';
    
    const container = document.createElement('div');
    container.className = 'flex items-start space-x-3';
    
    // Icon section
    const iconSection = document.createElement('div');
    iconSection.className = 'flex-shrink-0';
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center';
    iconWrapper.innerHTML = `<svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
    </svg>`;
    iconSection.appendChild(iconWrapper);
    
    // Text content section
    const textSection = document.createElement('div');
    textSection.className = 'flex-1 min-w-0';
    
    const titleEl = document.createElement('p');
    titleEl.className = 'text-sm font-medium text-gray-900';
    titleEl.textContent = options.title; // Safe text assignment
    
    const bodyEl = document.createElement('p');
    bodyEl.className = 'mt-1 text-sm text-gray-500';
    bodyEl.textContent = options.body; // Safe text assignment
    
    const demoLabel = document.createElement('p');
    demoLabel.className = 'mt-2 text-xs text-blue-600';
    demoLabel.textContent = 'Demo Notification - Would be real in production';
    
    textSection.appendChild(titleEl);
    textSection.appendChild(bodyEl);
    textSection.appendChild(demoLabel);
    
    // Close button
    const closeButton = document.createElement('button');
    closeButton.className = 'flex-shrink-0 text-gray-400 hover:text-gray-600';
    closeButton.onclick = () => notification.remove();
    closeButton.innerHTML = `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
    </svg>`;
    
    container.appendChild(iconSection);
    container.appendChild(textSection);
    container.appendChild(closeButton);
    notification.appendChild(container);

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);

    console.log('Simulated notification:', options.title, options.body);
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


}

export const notificationService = NotificationService.getInstance();