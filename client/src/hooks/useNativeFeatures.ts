import { useState, useEffect } from 'react';
import { CapacitorService } from '../services/capacitor';

export function useNativeFeatures() {
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState<string>('web');
  const [networkStatus, setNetworkStatus] = useState({ connected: true, connectionType: 'unknown' });

  useEffect(() => {
    setIsNative(CapacitorService.isNative());
    setPlatform(CapacitorService.getPlatform());

    // Get initial network status
    CapacitorService.getNetworkStatus().then(setNetworkStatus);

    // Set up app state listeners for native apps
    if (CapacitorService.isNative()) {
      CapacitorService.addAppStateChangeListener((state) => {
        console.log('App state changed:', state);
      });

      CapacitorService.addBackButtonListener(() => {
        console.log('Back button pressed');
        // Handle back button logic
      });
    }
  }, []);

  const scheduleReminder = async (options: {
    title: string;
    body: string;
    scheduledTime: Date;
  }) => {
    await CapacitorService.scheduleNotification({
      title: options.title,
      body: options.body,
      id: Date.now(),
      schedule: { at: options.scheduledTime }
    });
  };

  const hapticFeedback = () => {
    CapacitorService.triggerHapticFeedback();
  };

  const getCurrentLocation = async () => {
    return await CapacitorService.getCurrentPosition();
  };

  const savePreference = async (key: string, value: string) => {
    await CapacitorService.setPreference(key, value);
  };

  const getPreference = async (key: string) => {
    return await CapacitorService.getPreference(key);
  };

  return {
    isNative,
    platform,
    networkStatus,
    scheduleReminder,
    hapticFeedback,
    getCurrentLocation,
    savePreference,
    getPreference
  };
}