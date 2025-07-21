import { useState } from 'react';
import { useLocation, type LocationData } from '@/hooks/useLocation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LocationDetectorProps {
  onLocationDetected?: (location: LocationData, city?: string) => void;
  className?: string;
}

export default function LocationDetector({ onLocationDetected, className }: LocationDetectorProps) {
  const { location, error, loading, getCurrentLocation, isSupported } = useLocation();
  const { toast } = useToast();
  const [detectedCity, setDetectedCity] = useState<string | null>(null);
  const [reverseGeocodingLoading, setReverseGeocodingLoading] = useState(false);

  const handleGetLocation = async () => {
    try {
      const locationData = await getCurrentLocation();
      
      // Reverse geocoding to get city name
      setReverseGeocodingLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${locationData.latitude}&lon=${locationData.longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo'}`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const cityName = data[0].name;
            const country = data[0].country;
            const fullCityName = country === 'US' 
              ? `${cityName}, ${data[0].state || ''}, ${country}`.replace(', ,', ',')
              : `${cityName}, ${country}`;
            
            setDetectedCity(fullCityName);
            
            // Save to localStorage for weather service
            localStorage.setItem('weatherCity', fullCityName);
            localStorage.setItem('useGeolocation', 'true');
            
            toast({
              title: "Location detected",
              description: `Found your location: ${fullCityName}`,
            });
            
            onLocationDetected?.(locationData, fullCityName);
          }
        }
      } catch (geoError) {
        console.warn('Reverse geocoding failed:', geoError);
        toast({
          title: "Location detected",
          description: `Location found (${locationData.latitude.toFixed(4)}, ${locationData.longitude.toFixed(4)})`,
        });
        onLocationDetected?.(locationData);
      } finally {
        setReverseGeocodingLoading(false);
      }
    } catch (locationError: any) {
      toast({
        title: "Location access failed",
        description: locationError.message || "Could not access your location",
        variant: "destructive",
      });
    }
  };

  if (!isSupported) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 text-gray-500">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">Location services not supported</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span>Location Detection</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="space-y-2">
          {location && (
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">
                Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </span>
              <Badge variant="secondary" className="text-xs">
                ±{Math.round(location.accuracy)}m
              </Badge>
            </div>
          )}
          
          {detectedCity && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">{detectedCity}</span>
            </div>
          )}
          
          {error && (
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-600">{error.message}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleGetLocation}
          disabled={loading || reverseGeocodingLoading}
          className="w-full"
          size="sm"
        >
          {loading || reverseGeocodingLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {reverseGeocodingLoading ? 'Getting city name...' : 'Getting location...'}
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4 mr-2" />
              Detect My Location
            </>
          )}
        </Button>

        {/* Help Text */}
        <p className="text-xs text-gray-500">
          We'll use your location to provide accurate weather-based hydration recommendations
        </p>
      </CardContent>
    </Card>
  );
}