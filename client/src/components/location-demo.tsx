import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Loader2, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export default function LocationDemo() {
  const { toast } = useToast();
  const [isDemo, setIsDemo] = useState(false);

  const handleDemoLocation = () => {
    setIsDemo(true);
    
    // Simulate Toronto location
    const demoLocation = {
      latitude: 43.6532,
      longitude: -79.3832,
      accuracy: 65,
      city: 'Toronto, Ontario, Canada'
    };

    setTimeout(() => {
      toast({
        title: "Demo location set",
        description: `Location set to ${demoLocation.city}`,
      });
      
      // Save demo location to localStorage
      localStorage.setItem('weatherCity', demoLocation.city);
      localStorage.setItem('useGeolocation', 'true');
      
      // Trigger weather update
      window.location.reload();
    }, 1500);
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Info className="w-5 h-5 text-blue-600" />
          <span>Location Demo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          Since location access is restricted in this preview environment, try the demo to see how location detection works:
        </div>
        
        {isDemo ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">
                Demo Location: 43.6532, -79.3832
              </span>
              <Badge variant="secondary" className="text-xs">
                ±65m
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">Toronto, Ontario, Canada</span>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded p-2">
              <p className="text-sm text-green-800">
                Weather data will refresh to show Toronto's current conditions
              </p>
            </div>
          </div>
        ) : (
          <Button 
            onClick={handleDemoLocation}
            className="w-full"
            size="sm"
            variant="outline"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Try Toronto Demo Location
          </Button>
        )}
        
        <div className="text-xs text-gray-500">
          <strong>In production:</strong> Users can click "Detect My Location" to automatically get their GPS coordinates and local weather data.
        </div>
      </CardContent>
    </Card>
  );
}