import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Globe } from "lucide-react";

interface LocationSettingsProps {
  onLocationChange?: (location: { city?: string; useGeolocation: boolean }) => void;
}

export default function LocationSettings({ onLocationChange }: LocationSettingsProps) {
  const [useGeolocation, setUseGeolocation] = useState(true);
  const [cityName, setCityName] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);

  const handleGeolocationToggle = (enabled: boolean) => {
    setUseGeolocation(enabled);
    onLocationChange?.({ city: cityName, useGeolocation: enabled });
  };

  const handleCityChange = (city: string) => {
    setCityName(city);
    onLocationChange?.({ city, useGeolocation });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser");
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Use weather API to get city name from coordinates
          const response = await fetch(
            `/api/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          const data = await response.json();
          if (data.weather?.location) {
            const detectedCity = data.weather.location;
            setCityName(detectedCity);
            onLocationChange?.({ city: detectedCity, useGeolocation: true });
          }
        } catch (error) {
          console.error("Error getting city name:", error);
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsDetecting(false);
        alert("Unable to detect location. Please enter your city manually.");
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
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
                <Input
                  placeholder="Enter your city"
                  value={cityName}
                  onChange={(e) => handleCityChange(e.target.value)}
                />
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
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}