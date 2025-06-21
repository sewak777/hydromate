import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Geolocation } from '@capacitor/geolocation';
import { Preferences } from '@capacitor/preferences';
import { Network } from '@capacitor/network';

export class CapacitorService {
  static isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  static getPlatform(): string {
    return Capacitor.getPlatform();
  }

  static async initializeApp(): Promise<void> {
    if (!this.isNative()) return;

    try {
      // Configure status bar
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#2563eb' });

      // Hide splash screen after app loads
      await SplashScreen.hide();

      // Request notification permissions
      await LocalNotifications.requestPermissions();

      console.log('Capacitor app initialized successfully');
    } catch (error) {
      console.error('Error initializing Capacitor app:', error);
    }
  }

  static async triggerHapticFeedback(style: ImpactStyle = ImpactStyle.Medium): Promise<void> {
    if (!this.isNative()) return;
    
    try {
      await Haptics.impact({ style });
    } catch (error) {
      console.error('Haptic feedback error:', error);
    }
  }

  static async scheduleNotification(options: {
    title: string;
    body: string;
    id: number;
    schedule?: { at: Date };
  }): Promise<void> {
    if (!this.isNative()) {
      // Fallback to web notifications
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(options.title, { body: options.body });
      }
      return;
    }

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: options.title,
            body: options.body,
            id: options.id,
            schedule: options.schedule,
            sound: 'beep.wav',
            attachments: undefined,
            actionTypeId: '',
            extra: null
          }
        ]
      });
    } catch (error) {
      console.error('Notification scheduling error:', error);
    }
  }

  static async getCurrentPosition(): Promise<{ latitude: number; longitude: number } | null> {
    try {
      if (this.isNative()) {
        const position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000
        });
        return {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
      } else {
        // Web geolocation fallback
        return new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
          }

          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            },
            (error) => reject(error),
            { enableHighAccuracy: true, timeout: 10000 }
          );
        });
      }
    } catch (error) {
      console.error('Geolocation error:', error);
      return null;
    }
  }

  static async setPreference(key: string, value: string): Promise<void> {
    try {
      if (this.isNative()) {
        await Preferences.set({ key, value });
      } else {
        localStorage.setItem(key, value);
      }
    } catch (error) {
      console.error('Preference storage error:', error);
    }
  }

  static async getPreference(key: string): Promise<string | null> {
    try {
      if (this.isNative()) {
        const { value } = await Preferences.get({ key });
        return value;
      } else {
        return localStorage.getItem(key);
      }
    } catch (error) {
      console.error('Preference retrieval error:', error);
      return null;
    }
  }

  static async getNetworkStatus(): Promise<{ connected: boolean; connectionType: string }> {
    try {
      if (this.isNative()) {
        const status = await Network.getStatus();
        return {
          connected: status.connected,
          connectionType: status.connectionType
        };
      } else {
        return {
          connected: navigator.onLine,
          connectionType: 'unknown'
        };
      }
    } catch (error) {
      console.error('Network status error:', error);
      return { connected: true, connectionType: 'unknown' };
    }
  }

  static addAppStateChangeListener(callback: (state: { isActive: boolean }) => void): void {
    if (!this.isNative()) return;

    App.addListener('appStateChange', callback);
  }

  static addBackButtonListener(callback: () => void): void {
    if (!this.isNative()) return;

    App.addListener('backButton', callback);
  }
}