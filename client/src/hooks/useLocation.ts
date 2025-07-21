import { useState, useEffect } from 'react';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface LocationError {
  code: number;
  message: string;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<LocationError | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject({
          code: 0,
          message: 'Geolocation is not supported by this browser'
        });
        return;
      }

      setLoading(true);
      setError(null);

      const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000 // 5 minutes cache
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };
          
          setLocation(locationData);
          setLoading(false);
          resolve(locationData);
        },
        (error) => {
          const locationError: LocationError = {
            code: error.code,
            message: getErrorMessage(error.code)
          };
          
          setError(locationError);
          setLoading(false);
          reject(locationError);
        },
        options
      );
    });
  };

  const watchLocation = (callback: (location: LocationData) => void) => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by this browser'
      });
      return null;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 60000 // 1 minute cache for watch
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };
        
        setLocation(locationData);
        setError(null);
        callback(locationData);
      },
      (error) => {
        const locationError: LocationError = {
          code: error.code,
          message: getErrorMessage(error.code)
        };
        
        setError(locationError);
      },
      options
    );

    return watchId;
  };

  const stopWatching = (watchId: number) => {
    if (navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }
  };

  return {
    location,
    error,
    loading,
    getCurrentLocation,
    watchLocation,
    stopWatching,
    isSupported: !!navigator.geolocation
  };
}

function getErrorMessage(code: number): string {
  const isReplit = typeof window !== 'undefined' && window.location.hostname.includes('replit');
  
  switch (code) {
    case 1:
      return isReplit 
        ? 'Location access restricted in preview environment. Works in production.'
        : 'Location access denied by user. Please allow location access and try again.';
    case 2:
      return 'Location information unavailable. Please check your device settings.';
    case 3:
      return 'Location request timed out. Please try again.';
    default:
      return isReplit
        ? 'Location detection limited in preview. Works when deployed.'
        : 'An unknown error occurred while retrieving location';
  }
}