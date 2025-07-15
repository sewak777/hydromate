import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SEOHead } from "@/components/seo-head";
import Navigation from "@/components/navigation";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  Droplets, 
  Award, 
  Clock, 
  Zap,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from "lucide-react";

interface AnalyticsData {
  daily: Array<{
    date: string;
    intake: number;
    goal: number;
    percentage: number;
    goalMet: boolean;
    logs: number;
    hydrationPercentage: number;
  }>;
  weekly: {
    totalIntake: number;
    averageDailyIntake: number;
    goalsMetCount: number;
    consistencyScore: number;
    preferredBeverage: string;
    totalLogs: number;
  };
  monthly: {
    totalIntake: number;
    averageDailyIntake: number;
    goalsMetCount: number;
    bestStreak: number;
    consistencyScore: number;
    preferredBeverage: string;
    totalLogs: number;
  };
  insights: {
    bestDay: string;
    worstDay: string;
    averageFirstLog: string;
    averageLastLog: string;
    mostActiveHour: string;
    beverageDistribution: Array<{
      type: string;
      percentage: number;
      color: string;
    }>;
    patterns: string[];
  };
}

const CHART_COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [selectedChart, setSelectedChart] = useState<'intake' | 'consistency' | 'hydration'>('intake');

  const { data: analyticsData, isLoading } = useQuery<AnalyticsData>({
    queryKey: ["/api/analytics", selectedPeriod],
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
        <Navigation />
        <div className="pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[hsl(var(--primary-blue))]"></div>
        </div>
      </div>
    );
  }

  const periodLabels = {
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
    '90d': 'Last 90 Days'
  };

  return (
    <>
      <SEOHead 
        title="Analytics - QuenchNow Hydration Insights"
        description="Comprehensive hydration analytics and insights. Track your water intake patterns, consistency scores, and detailed progress reports."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
        <Navigation />
        
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Hydration Analytics
                </span>
              </h1>
              <p className="text-[hsl(var(--text-light))] text-lg">
                Detailed insights into your hydration journey and progress patterns
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Select value={selectedPeriod} onValueChange={(value: '7d' | '30d' | '90d') => setSelectedPeriod(value)}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedChart} onValueChange={(value: 'intake' | 'consistency' | 'hydration') => setSelectedChart(value)}>
                <SelectTrigger className="w-full sm:w-48">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intake">Intake Analysis</SelectItem>
                  <SelectItem value="consistency">Consistency Tracking</SelectItem>
                  <SelectItem value="hydration">Hydration Quality</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="patterns">Patterns</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-[hsl(var(--text-light))]">Total Intake</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {analyticsData?.weekly.totalIntake || 0}ml
                          </p>
                        </div>
                        <Droplets className="w-8 h-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-[hsl(var(--text-light))]">Daily Average</p>
                          <p className="text-2xl font-bold text-green-600">
                            {Math.round(analyticsData?.weekly.averageDailyIntake || 0)}ml
                          </p>
                        </div>
                        <Target className="w-8 h-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-[hsl(var(--text-light))]">Goals Met</p>
                          <p className="text-2xl font-bold text-yellow-600">
                            {analyticsData?.weekly.goalsMetCount || 0}
                          </p>
                        </div>
                        <Award className="w-8 h-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-[hsl(var(--text-light))]">Consistency</p>
                          <p className="text-2xl font-bold text-purple-600">
                            {Math.round(analyticsData?.weekly.consistencyScore || 0)}%
                          </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>Daily Intake Progress ({periodLabels[selectedPeriod]})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      {analyticsData?.daily && analyticsData.daily.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          {selectedChart === 'intake' ? (
                            <BarChart data={analyticsData.daily}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="intake" fill="#2563eb" name="Actual Intake (ml)" />
                              <Bar dataKey="goal" fill="#e5e7eb" name="Goal (ml)" />
                            </BarChart>
                          ) : selectedChart === 'consistency' ? (
                            <LineChart data={analyticsData.daily}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Line 
                                type="monotone" 
                                dataKey="percentage" 
                                stroke="#10b981" 
                                strokeWidth={3}
                                name="Goal Achievement (%)"
                              />
                            </LineChart>
                          ) : (
                            <AreaChart data={analyticsData.daily}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Area 
                                type="monotone" 
                                dataKey="hydrationPercentage" 
                                stroke="#8b5cf6" 
                                fill="#8b5cf6" 
                                fillOpacity={0.3}
                                name="Hydration Quality (%)"
                              />
                            </AreaChart>
                          )}
                        </ResponsiveContainer>
                      ) : (
                        <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
                          <div className="text-center">
                            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-500 text-lg font-medium">No data available</p>
                            <p className="text-gray-400 text-sm">Start logging your water intake to see analytics</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Trends Tab */}
              <TabsContent value="trends" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Weekly Trends */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Consistency Score</span>
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={analyticsData?.weekly.consistencyScore || 0} 
                              className="w-24" 
                            />
                            <span className="font-semibold">
                              {Math.round(analyticsData?.weekly.consistencyScore || 0)}%
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span>Preferred Beverage</span>
                          <Badge variant="secondary">
                            {analyticsData?.weekly.preferredBeverage || 'Water'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Logs</span>
                          <span className="font-semibold">
                            {analyticsData?.weekly.totalLogs || 0}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Monthly Trends */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Best Streak</span>
                          <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span className="font-semibold">
                              {analyticsData?.monthly.bestStreak || 0} days
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Average</span>
                          <span className="font-semibold">
                            {Math.round(analyticsData?.monthly.averageDailyIntake || 0)}ml/day
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Goals Achievement</span>
                          <span className="font-semibold text-green-600">
                            {analyticsData?.monthly.goalsMetCount || 0} days
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Beverage Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChartIcon className="w-5 h-5" />
                      <span>Beverage Distribution</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analyticsData?.insights.beverageDistribution || []}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="percentage"
                            label={({ type, percentage }) => `${type}: ${percentage}%`}
                          >
                            {analyticsData?.insights.beverageDistribution?.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Patterns Tab */}
              <TabsContent value="patterns" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Daily Patterns */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span>Daily Timing Patterns</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Average First Log</span>
                          <span className="font-semibold text-green-600">
                            {analyticsData?.insights.averageFirstLog || '--:--'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Last Log</span>
                          <span className="font-semibold text-blue-600">
                            {analyticsData?.insights.averageLastLog || '--:--'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Most Active Hour</span>
                          <span className="font-semibold text-purple-600">
                            {analyticsData?.insights.mostActiveHour || '--:--'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Highlights */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Best Day</span>
                          <span className="font-semibold text-green-600">
                            {analyticsData?.insights.bestDay || 'No data'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Challenging Day</span>
                          <span className="font-semibold text-orange-600">
                            {analyticsData?.insights.worstDay || 'No data'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Insights Tab */}
              <TabsContent value="insights" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personalized Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData?.insights.patterns?.map((pattern, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-blue-800">{pattern}</p>
                        </div>
                      )) || (
                        <p className="text-[hsl(var(--text-light))]">
                          Keep logging your hydration to unlock personalized insights!
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}