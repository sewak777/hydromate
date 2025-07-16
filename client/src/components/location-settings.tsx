import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationSettingsProps {
  onLocationChange?: (location: { city?: string; useGeolocation: boolean }) => void;
}

export default function LocationSettings({ onLocationChange }: LocationSettingsProps) {
  const [useGeolocation, setUseGeolocation] = useState(true);
  const [cityName, setCityName] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  // Popular cities for suggestions
  const popularCities = [
    "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener",
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
    "London", "Birmingham", "Manchester", "Leeds", "Glasgow", "Liverpool", "Newcastle", "Sheffield", "Bristol", "Cardiff",
    "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Canberra", "Newcastle", "Wollongong", "Geelong",
    "New Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
    "Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya", "Sapporo", "Kobe", "Fukuoka", "Sendai", "Hiroshima",
    "Paris", "Berlin", "Rome", "Madrid", "Amsterdam", "Vienna", "Brussels", "Prague", "Warsaw", "Stockholm"
  ];

  // Load saved location preferences
  useEffect(() => {
    const savedCity = localStorage.getItem('weatherCity');
    const savedUseGeolocation = localStorage.getItem('useGeolocation');
    
    if (savedCity) {
      setCityName(savedCity);
    }
    if (savedUseGeolocation !== null) {
      setUseGeolocation(savedUseGeolocation === 'true');
    }
  }, []);

  const handleGeolocationToggle = (enabled: boolean) => {
    setUseGeolocation(enabled);
    localStorage.setItem('useGeolocation', enabled.toString());
    onLocationChange?.({ city: cityName, useGeolocation: enabled });
    
    toast({
      title: "Location preference updated",
      description: enabled ? "Using automatic location detection" : "Using manual city selection",
    });
    
    // Refresh weather data immediately
    window.dispatchEvent(new CustomEvent('refreshWeather'));
  };

  const handleCityChange = (city: string) => {
    setCityName(city);
    localStorage.setItem('weatherCity', city);
    onLocationChange?.({ city, useGeolocation });
    
    // Generate suggestions when user types
    if (city.length >= 2) {
      const filteredSuggestions = popularCities.filter(
        popularCity => popularCity.toLowerCase().startsWith(city.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCityName(suggestion);
    localStorage.setItem('weatherCity', suggestion);
    onLocationChange?.({ city: suggestion, useGeolocation });
    setShowSuggestions(false);
    
    // Trigger weather refresh for selected city
    console.log('🌍 Weather refresh for selected city:', suggestion);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('refreshWeather'));
    }, 100);
  };

  // Only trigger weather refresh when user manually enters a complete city name (Enter key)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && cityName.trim().length > 2) {
      e.preventDefault();
      setShowSuggestions(false);
      console.log('🌍 Manual weather refresh for:', cityName);
      
      // Add small delay to ensure all state updates are complete
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('refreshWeather'));
      }, 100);
    }
  };

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support automatic location detection",
        variant: "destructive",
      });
      return;
    }

    setIsDetecting(true);
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 300000,
          enableHighAccuracy: false
        });
      });

      // Use reverse geocoding to get city name
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=demo`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const detectedCity = data[0].name;
          setCityName(detectedCity);
          localStorage.setItem('weatherCity', detectedCity);
          onLocationChange?.({ city: detectedCity, useGeolocation: false });
          
          toast({
            title: "Location detected",
            description: `Set location to ${detectedCity}`,
          });
          
          // Refresh weather data
          window.dispatchEvent(new CustomEvent('refreshWeather'));
        }
      } else {
        // Fallback: just use coordinates
        const detectedCity = `${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`;
        setCityName(detectedCity);
        localStorage.setItem('weatherCity', detectedCity);
        onLocationChange?.({ city: detectedCity, useGeolocation: false });
        
        toast({
          title: "Location detected",
          description: `Set location to coordinates: ${detectedCity}`,
        });
        
        // Refresh weather data
        window.dispatchEvent(new CustomEvent('refreshWeather'));
      }
    } catch (error) {
      toast({
        title: "Location detection failed",
        description: "Unable to detect your location. Please enter your city manually.",
        variant: "destructive",
      });
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span>Location Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Use Automatic Location</div>
            <div className="text-sm text-gray-600">
              Automatically detect your location for weather data
            </div>
          </div>
          <Switch
            checked={useGeolocation}
            onCheckedChange={handleGeolocationToggle}
          />
        </div>

        {!useGeolocation && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">City Name</label>
              <div className="flex space-x-2 mt-1">
                <div className="relative flex-1">
                  <Input
                    placeholder="Enter your city (press Enter to update weather)"
                    value={cityName}
                    onChange={(e) => handleCityChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={detectLocation}
                  disabled={isDetecting}
                  className="flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>{isDetecting ? "Detecting..." : "Detect"}</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {cityName && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-sm text-blue-800">
              <strong>Current Location:</strong> {cityName}
              {isDetecting && !useGeolocation && (
                <span className="text-gray-500 ml-2">Updating weather...</span>
              )}
            </div>
            {!useGeolocation && (
              <div className="text-xs text-gray-600 mt-1">
                Press Enter or click "Detect" to update weather data
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}