import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { usePremium } from "@/hooks/usePremium";
import { useToast } from "@/hooks/use-toast";
import { useNativeFeatures } from "@/hooks/useNativeFeatures";

import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { SEOHead } from "@/components/seo-head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import WaterBottle from "@/components/water-bottle";
import IntakeLog from "@/components/intake-log";
import ProgressChart from "@/components/progress-chart";
import AchievementBadge from "@/components/achievement-badge";
import { Droplets, Target, TrendingUp, Trophy, Plus, Cloud, Activity, Bell, Settings } from "lucide-react";

interface DashboardData {
  profile?: {
    dailyGoal: number;
    customGoal?: number;
  };
  todayIntake: number;
  todaySummary?: {
    goalMet: boolean;
    totalIntake: number;
    goalAmount: number;
  };
  streak: number;
  achievements: number;
  weekSummaries: Array<{
    date: string;
    totalIntake: number;
    goalAmount: number;
    goalMet: boolean;
  }>;
}

export default function Home() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const { isPremium, subscription } = usePremium();
  const { hapticFeedback, isNative, platform } = useNativeFeatures();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
    retry: false,
  });

  const { data: todayIntake = [] } = useQuery({
    queryKey: ["/api/intake/today"],
    retry: false,
  });

  const { data: weatherData, error: weatherError } = useQuery({
    queryKey: ["/api/weather"],
    enabled: true,
    retry: false,
    refetchInterval: 30 * 60 * 1000, // Refresh every 30 minutes
    queryFn: async () => {
      console.log('🌤️ Attempting to fetch weather data...');
      // Try geolocation first
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 10000,
              enableHighAccuracy: false
            });
          });
          
          console.log('🌤️ Got geolocation, fetching weather for coords:', position.coords.latitude, position.coords.longitude);
          const response = await fetch(`/api/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          if (!response.ok) {
            console.error('🌤️ Weather fetch failed with status:', response.status);
            throw new Error('Weather fetch failed');
          }
          return response.json();
        } catch (error) {
          console.log('🌤️ Geolocation failed, using default city New York');
          // Fallback to a default city
          const response = await fetch('/api/weather?city=New York');
          if (!response.ok) {
            console.error('🌤️ Weather fetch failed with status:', response.status);
            throw new Error('Weather fetch failed');
          }
          return response.json();
        }
      } else {
        // No geolocation support, use default
        console.log('🌤️ No geolocation support, using default city New York');
        const response = await fetch('/api/weather?city=New York');
        if (!response.ok) {
          console.error('🌤️ Weather fetch failed with status:', response.status);
          throw new Error('Weather fetch failed');
        }
        return response.json();
      }
    }
  });

  // Debug weather data
  if (weatherError) {
    console.error('🌤️ Weather query error:', weatherError);
  }
  if (weatherData) {
    console.log('🌤️ Weather data received:', weatherData);
  }

  const logIntakeMutation = useMutation({
    mutationFn: async (data: { amount: number; beverageType?: string; hydrationPercentage?: number }) => {
      // Calculate effective hydration amount
      const effectiveAmount = data.hydrationPercentage 
        ? Math.round(data.amount * (data.hydrationPercentage / 100))
        : data.amount;
      
      await apiRequest("POST", "/api/intake", {
        ...data,
        amount: effectiveAmount
      });
    },
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/intake/today"] });
      
      // Calculate effective amount for toast
      const effectiveAmount = variables.hydrationPercentage 
        ? Math.round(variables.amount * (variables.hydrationPercentage / 100))
        : variables.amount;
      
      // Enhanced feedback with effective amount
      toast({
        title: "Water logged!",
        description: `Added ${effectiveAmount}ml to your daily intake. Great job staying hydrated!`,
      });
      
      // Trigger haptic feedback for mobile
      if (isNative) {
        hapticFeedback();
      }

      // Check if goal achieved and send notification
      const newTotal = (dashboardData?.todayIntake || 0) + effectiveAmount;
      const goal = dashboardData?.profile?.dailyGoal || 2000;
      
      if (newTotal >= goal && (dashboardData?.todayIntake || 0) < goal) {
        await notificationService.showGoalAchievedNotification(newTotal, goal);
      }
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to log water intake. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleQuickLog = (amount: number) => {
    // Add haptic feedback for native apps
    if (isNative) {
      hapticFeedback();
    }
    logIntakeMutation.mutate({ amount });
  };

  if (isDashboardLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
        <Navigation />
        <div className="pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[hsl(var(--primary-blue))]"></div>
        </div>
      </div>
    );
  }

  const currentIntake = dashboardData?.todayIntake || 0;
  const dailyGoal = dashboardData?.profile?.customGoal || dashboardData?.profile?.dailyGoal || 2000;
  const progressPercentage = Math.min((currentIntake / dailyGoal) * 100, 100);
  const remainingAmount = Math.max(dailyGoal - currentIntake, 0);

  return (
    <>
      <SEOHead 
        title="Dashboard - HydroMate Water Tracking"
        description="Track your daily water intake with intelligent analytics, weather-based recommendations, and personalized hydration goals. Monitor your progress with beautiful charts and achievements."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back! <span className="water-gradient bg-clip-text text-transparent">Stay Hydrated</span>
            </h1>
            <p className="text-[hsl(var(--text-light))] text-lg">
              {remainingAmount > 0 
                ? `${remainingAmount}ml left to reach your daily goal`
                : "Congratulations! You've reached your daily goal!"
              }
            </p>
          </div>

          {/* Main Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[hsl(var(--primary-blue))]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Droplets className="text-[hsl(var(--primary-blue))] w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-[hsl(var(--primary-blue))]">{currentIntake}ml</div>
                <div className="text-sm text-[hsl(var(--text-light))]">Today's Intake</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[hsl(var(--accent-green))]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="text-[hsl(var(--accent-green))] w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-[hsl(var(--accent-green))]">{dailyGoal}ml</div>
                <div className="text-sm text-[hsl(var(--text-light))]">Daily Goal</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[hsl(var(--vibrant-orange))]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="text-[hsl(var(--vibrant-orange))] w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-[hsl(var(--vibrant-orange))]">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-[hsl(var(--text-light))]">Progress</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[hsl(var(--deep-teal))]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="text-[hsl(var(--deep-teal))] w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-[hsl(var(--deep-teal))]">{dashboardData?.streak || 0}</div>
                <div className="text-sm text-[hsl(var(--text-light))]">Day Streak</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Progress & Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Water Bottle Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Today's Progress</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <WaterBottle 
                    currentAmount={currentIntake}
                    goalAmount={dailyGoal}
                    className="mb-6"
                    onFillAnimation={() => {
                      if (isNative) {
                        hapticFeedback();
                      }
                    }}
                  />
                  
                  {/* Quick Log Buttons */}
                  <div className="grid grid-cols-4 gap-3 w-full max-w-md mb-6">
                    <Button
                      onClick={() => handleQuickLog(250)}
                      disabled={logIntakeMutation.isPending}
                      variant="outline"
                      className="flex flex-col items-center space-y-1 h-auto py-3 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      {logIntakeMutation.isPending ? (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span className="text-xs">Glass</span>
                          <span className="font-bold">250ml</span>
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleQuickLog(500)}
                      disabled={logIntakeMutation.isPending}
                      variant="outline"
                      className="flex flex-col items-center space-y-1 h-auto py-3 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      {logIntakeMutation.isPending ? (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span className="text-xs">Bottle</span>
                          <span className="font-bold">500ml</span>
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleQuickLog(750)}
                      disabled={logIntakeMutation.isPending}
                      variant="outline"
                      className="flex flex-col items-center space-y-1 h-auto py-3 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      {logIntakeMutation.isPending ? (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span className="text-xs">Large</span>
                          <span className="font-bold">750ml</span>
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleQuickLog(1000)}
                      disabled={logIntakeMutation.isPending}
                      variant="outline"
                      className="flex flex-col items-center space-y-1 h-auto py-3 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      {logIntakeMutation.isPending ? (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span className="text-xs">Liter</span>
                          <span className="font-bold">1L</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <IntakeLog onLogIntake={(data) => logIntakeMutation.mutate(data)} />
                </CardContent>
              </Card>

              {/* Weekly Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Weekly Progress</span>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      PREMIUM
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgressChart data={dashboardData?.weekSummaries || []} />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Achievements & Today's Logs */}
            <div className="space-y-6">


              {/* Achievement Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-[hsl(var(--deep-teal))]" />
                    <span>Achievements</span>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      PREMIUM
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-[hsl(var(--deep-teal))]">
                      {dashboardData?.achievements || 0}
                    </div>
                    <div className="text-sm text-[hsl(var(--text-light))]">Badges Earned</div>
                  </div>
                  <AchievementBadge />
                </CardContent>
              </Card>

              {/* Weather Insights */}
              {true && (
                <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Cloud className="w-5 h-5 text-blue-600" />
                      <span>Weather Insights</span>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                        PREMIUM
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {weatherData ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Location</span>
                          <span className="font-semibold">{weatherData.weather.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Temperature</span>
                          <span className="font-semibold">{weatherData.weather.temperature}°C</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Feels Like</span>
                          <span className="font-semibold">{weatherData.weather.feelsLike}°C</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Humidity</span>
                          <span className="font-semibold">{weatherData.weather.humidity}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Conditions</span>
                          <span className="font-semibold capitalize">{weatherData.weather.description}</span>
                        </div>
                        {weatherData.recommendation.baseAdjustment !== 0 && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <Activity className="w-4 h-4 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-800">
                                {weatherData.recommendation.reason}
                              </span>
                            </div>
                            {weatherData.recommendation.factors.length > 0 && (
                              <div className="mt-2 text-xs text-yellow-700">
                                Factors: {weatherData.recommendation.factors.join(', ')}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <Cloud className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Loading weather data...</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Reminders & Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <span>Reminders & Notifications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Configure your hydration reminders and notification preferences
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => window.location.href = '/reminders'}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Reminder Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Today's Intake Logs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span>Today's Logs</span>
                    {isPremium && (
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                        ENHANCED
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {todayIntake.length > 0 ? (
                      todayIntake.map((log: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-[hsl(var(--soft-gray))] rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[hsl(var(--primary-blue))]/10 rounded-full flex items-center justify-center">
                              <Droplets className="w-4 h-4 text-[hsl(var(--primary-blue))]" />
                            </div>
                            <div>
                              <div className="font-medium">{log.amount}ml</div>
                              <div className="text-xs text-[hsl(var(--text-light))]">
                                {log.beverageType || 'Water'}
                                {isPremium && log.hydrationPercentage && (
                                  <span className="ml-2 text-blue-600 font-semibold">
                                    ({log.hydrationPercentage}% hydration)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-[hsl(var(--text-light))]">
                            {new Date(log.loggedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-[hsl(var(--text-light))] py-8">
                        <Droplets className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No intake logged yet today</p>
                        <p className="text-sm">Start by logging your first drink!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
