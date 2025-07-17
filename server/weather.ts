interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  feelsLike: number;
  uvIndex?: number;
  location: string;
}

interface WeatherRecommendation {
  baseAdjustment: number;
  reason: string;
  factors: string[];
}

export class WeatherService {
  private apiKey: string | null;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || null;
    console.log('🌤️ Weather service initialized with API key:', this.apiKey ? 'present' : 'missing');
  }

  private getMockWeatherData(location: string = "Demo City"): WeatherData {
    return {
      temperature: 22,
      humidity: 60,
      description: "partly cloudy",
      feelsLike: 24,
      location: location,
    };
  }

  async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    if (!this.apiKey) {
      console.log('No API key provided, using mock weather data');
      return this.getMockWeatherData(`Location (${lat.toFixed(2)}, ${lon.toFixed(2)})`);
    }

    const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        feelsLike: Math.round(data.main.feels_like),
        location: data.name,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getMockWeatherData();
    }
  }

  async getWeatherByCity(city: string): Promise<WeatherData> {
    if (!this.apiKey) {
      console.log('No API key provided, using mock weather data');
      return this.getMockWeatherData(city);
    }

    // Check if city is coordinates (lat,lon format)
    const coordinatePattern = /^-?\d+\.?\d*,-?\d+\.?\d*$/;
    if (coordinatePattern.test(city)) {
      const [lat, lon] = city.split(',').map(Number);
      return this.getWeatherByCoords(lat, lon);
    }

    const url = `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
    console.log('🌤️ Fetching weather for city:', city);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Weather API error: ${response.status} - ${response.statusText}`);
        throw new Error(`Weather API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('🌤️ Weather data received for:', data.name);
      
      return {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        feelsLike: Math.round(data.main.feels_like),
        location: data.name,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return this.getMockWeatherData(city);
    }
  }

  calculateHydrationAdjustment(weather: WeatherData): WeatherRecommendation {
    let adjustment = 0;
    const factors: string[] = [];
    let reason = '';

    // Temperature-based adjustments
    if (weather.temperature > 25) {
      const tempAdjustment = Math.min((weather.temperature - 25) * 50, 500);
      adjustment += tempAdjustment;
      factors.push(`High temperature (${weather.temperature}°C)`);
    } else if (weather.temperature < 10) {
      adjustment -= 100;
      factors.push(`Cold weather (${weather.temperature}°C)`);
    }

    // Humidity-based adjustments
    if (weather.humidity < 30) {
      adjustment += 200;
      factors.push(`Low humidity (${weather.humidity}%)`);
    } else if (weather.humidity > 80) {
      adjustment += 100;
      factors.push(`High humidity (${weather.humidity}%)`);
    }

    // Feels-like temperature
    if (weather.feelsLike > weather.temperature + 5) {
      adjustment += 150;
      factors.push(`Feels warmer (${weather.feelsLike}°C)`);
    }

    // Generate recommendation message
    if (adjustment > 200) {
      reason = `Increase intake by ${adjustment}ml due to weather conditions`;
    } else if (adjustment > 0) {
      reason = `Consider drinking ${adjustment}ml extra today`;
    } else if (adjustment < 0) {
      reason = `Normal intake recommended for cool weather`;
    } else {
      reason = `Perfect weather for normal hydration`;
    }

    return {
      baseAdjustment: Math.max(adjustment, -200), // Don't reduce by more than 200ml
      reason,
      factors
    };
  }
}

export const weatherService = new WeatherService();