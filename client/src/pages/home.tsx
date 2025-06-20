import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import WaterBottle from "@/components/water-bottle";
import IntakeLog from "@/components/intake-log";
import ProgressChart from "@/components/progress-chart";
import AchievementBadge from "@/components/achievement-badge";
import { Droplets, Target, TrendingUp, Trophy, Plus } from "lucide-react";

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

  const logIntakeMutation = useMutation({
    mutationFn: async (data: { amount: number; beverageType?: string; hydrationPercentage?: number }) => {
      await apiRequest("POST", "/api/intake", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/intake/today"] });
      toast({
        title: "Water logged!",
        description: "Great job staying hydrated!",
      });
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
                  />
                  
                  {/* Quick Log Buttons */}
                  <div className="grid grid-cols-4 gap-3 w-full max-w-md mb-6">
                    <Button
                      onClick={() => handleQuickLog(250)}
                      disabled={logIntakeMutation.isPending}
                      variant="outline"
                      className="flex flex-col items-center space-y-1 h-auto py-3"
                    >
                      <span className="text-xs">Glass</span>
                      <span className="font-bold">250ml</span>
                    </Button>
                    <Button
                      onClick={() => handleQuickLog(500)}
                      disabled={logIntakeMutation.isPending}
                      variant="outline"
                      className="flex flex-col items-center space-y-1 h-auto py-3"
                    >
                      <span className="text-xs">Bottle</span>
                      <span className="font-bold">500ml</span>
                    </Button>
                    <Button
                      onClick={() => handleQuickLog(750)}
                      disabled={logIntakeMutation.isPending}
                      variant="outline"
                      className="flex flex-col items-center space-y-1 h-auto py-3"
                    >
                      <span className="text-xs">Large</span>
                      <span className="font-bold">750ml</span>
                    </Button>
                    <Button
                      onClick={() => handleQuickLog(1000)}
                      disabled={logIntakeMutation.isPending}
                      variant="outline"
                      className="flex flex-col items-center space-y-1 h-auto py-3"
                    >
                      <span className="text-xs">Liter</span>
                      <span className="font-bold">1L</span>
                    </Button>
                  </div>

                  <IntakeLog onLogIntake={(data) => logIntakeMutation.mutate(data)} />
                </CardContent>
              </Card>

              {/* Weekly Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
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

              {/* Today's Intake Logs */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Logs</CardTitle>
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
  );
}
