import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { usePremium } from "@/hooks/usePremium";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/navigation";
import LocationSettings from "@/components/location-settings";
import { SEOHead } from "@/components/seo-head";
import { User, Activity, Bell, Settings, Save, Crown, MapPin } from "lucide-react";
import NotificationDemo from "@/components/notification-demo";
import NotificationTroubleshoot from "@/components/notification-troubleshoot";
import NotificationSimulator from "@/components/notification-simulator";

const profileSchema = z.object({
  weight: z.coerce.number().min(30).max(300),
  gender: z.enum(["male", "female", "other"]),
  activityLevel: z.enum(["sedentary", "lightly_active", "moderately_active", "very_active", "extremely_active"]),
  customGoal: z.coerce.number().optional(),
  timezone: z.string().optional(),
  location: z.string().optional(),
  useGeolocation: z.boolean().default(true),
  weatherEnabled: z.boolean().default(true),
});

const reminderSchema = z.object({
  intervalMinutes: z.coerce.number().min(15).max(480),
  startTime: z.string(),
  endTime: z.string(),
  isEnabled: z.boolean(),
  soundId: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type ReminderFormData = z.infer<typeof reminderSchema>;

export default function Profile() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const { isPremium, subscription } = usePremium();
  const [calculatedGoal, setCalculatedGoal] = useState<number>(0);

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

  const { data: profile } = useQuery({
    queryKey: ["/api/profile"],
    retry: false,
  });

  const { data: reminders } = useQuery({
    queryKey: ["/api/reminders"],
    retry: false,
  });

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      weight: profile?.weight || 70,
      gender: profile?.gender || "other",
      activityLevel: profile?.activityLevel || "moderately_active",
      customGoal: profile?.customGoal,
      timezone: profile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      location: profile?.location,
      useGeolocation: profile?.useGeolocation !== false,
      weatherEnabled: profile?.weatherEnabled !== false,
    },
  });

  const reminderForm = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      intervalMinutes: reminders?.intervalMinutes || 60,
      startTime: reminders?.startTime || "08:00",
      endTime: reminders?.endTime || "22:00",
      isEnabled: reminders?.isEnabled !== false,
      soundId: reminders?.soundId || "default",
    },
  });

  // Update form when data loads
  useEffect(() => {
    if (profile) {
      profileForm.reset({
        weight: profile.weight,
        gender: profile.gender,
        activityLevel: profile.activityLevel,
        customGoal: profile.customGoal,
        timezone: profile.timezone,
        location: profile.location,
        useGeolocation: profile.useGeolocation,
        weatherEnabled: profile.weatherEnabled,
      });
    }
  }, [profile, profileForm]);

  useEffect(() => {
    if (reminders) {
      reminderForm.reset({
        intervalMinutes: reminders.intervalMinutes,
        startTime: reminders.startTime,
        endTime: reminders.endTime,
        isEnabled: reminders.isEnabled,
        soundId: reminders.soundId,
      });
    }
  }, [reminders, reminderForm]);

  // Calculate goal when weight, gender, or activity level changes
  useEffect(() => {
    const weight = profileForm.watch("weight");
    const gender = profileForm.watch("gender");
    const activityLevel = profileForm.watch("activityLevel");

    if (weight && gender && activityLevel) {
      let baseGoal = weight * 35;
      
      if (gender === "male") {
        baseGoal *= 1.1;
      }
      
      const activityMultipliers = {
        sedentary: 1.0,
        lightly_active: 1.1,
        moderately_active: 1.2,
        very_active: 1.3,
        extremely_active: 1.4,
      };
      
      baseGoal *= activityMultipliers[activityLevel];
      const calculated = Math.round(baseGoal / 50) * 50;
      setCalculatedGoal(calculated);
    }
  }, [profileForm.watch("weight"), profileForm.watch("gender"), profileForm.watch("activityLevel")]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      await apiRequest("POST", "/api/profile", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      toast({
        title: "Profile updated!",
        description: "Your hydration profile has been saved successfully.",
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
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateRemindersMutation = useMutation({
    mutationFn: async (data: ReminderFormData) => {
      await apiRequest("POST", "/api/reminders", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reminders"] });
      toast({
        title: "Reminders updated!",
        description: "Your reminder settings have been saved successfully.",
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
        description: "Failed to update reminders. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  const onReminderSubmit = (data: ReminderFormData) => {
    updateRemindersMutation.mutate(data);
  };

  return (
    <>
      <SEOHead 
        title="Profile Settings - QuenchNow"
        description="Customize your hydration profile with personalized goals, reminder settings, and weather preferences. Optimize your water tracking experience."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="water-gradient bg-clip-text text-transparent">Profile Settings</span>
            </h1>
            <p className="text-[hsl(var(--text-light))] text-lg">
              Personalize your hydration experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* User Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-[hsl(var(--primary-blue))]" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (kg)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={profileForm.control}
                      name="activityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select activity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                              <SelectItem value="lightly_active">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                              <SelectItem value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
                              <SelectItem value="very_active">Very Active (hard exercise 6-7 days/week)</SelectItem>
                              <SelectItem value="extremely_active">Extremely Active (very hard exercise, physical job)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-[hsl(var(--soft-gray))] p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Recommended Daily Goal:</span>
                        <span className="text-lg font-bold text-[hsl(var(--primary-blue))]">
                          {calculatedGoal}ml
                        </span>
                      </div>
                      <p className="text-sm text-[hsl(var(--text-light))]">
                        Based on your weight, gender, and activity level
                      </p>
                    </div>

                    <FormField
                      control={profileForm.control}
                      name="customGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Daily Goal (optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={`Leave empty to use recommended ${calculatedGoal}ml`}
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors"
                      disabled={updateProfileMutation.isPending}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {updateProfileMutation.isPending ? "Saving..." : "Save Profile"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Reminder Settings Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-[hsl(var(--accent-green))]" />
                  <span>Reminder Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...reminderForm}>
                  <form onSubmit={reminderForm.handleSubmit(onReminderSubmit)} className="space-y-6">
                    <FormField
                      control={reminderForm.control}
                      name="isEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Reminders</FormLabel>
                            <p className="text-sm text-[hsl(var(--text-light))]">
                              Receive notifications to drink water
                            </p>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={reminderForm.control}
                      name="intervalMinutes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reminder Interval (minutes)</FormLabel>
                          <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select interval" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="15">Every 15 minutes</SelectItem>
                              <SelectItem value="30">Every 30 minutes</SelectItem>
                              <SelectItem value="60">Every hour</SelectItem>
                              <SelectItem value="90">Every 1.5 hours</SelectItem>
                              <SelectItem value="120">Every 2 hours</SelectItem>
                              <SelectItem value="180">Every 3 hours</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={reminderForm.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={reminderForm.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={reminderForm.control}
                      name="soundId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notification Sound</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select sound" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="default">Default</SelectItem>
                              <SelectItem value="gentle">Gentle Chime</SelectItem>
                              <SelectItem value="water_drop">Water Drop</SelectItem>
                              <SelectItem value="bell">Bell</SelectItem>
                              <SelectItem value="nature">Nature Sounds</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors"
                      disabled={updateRemindersMutation.isPending}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {updateRemindersMutation.isPending ? "Saving..." : "Save Reminders"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Location & Weather Settings Card */}
            {isPremium && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>Weather Settings</span>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      PREMIUM
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <LocationSettings
                    onLocationChange={(location) => {
                      profileForm.setValue("location", location.city || "");
                      profileForm.setValue("useGeolocation", location.useGeolocation);
                    }}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Account Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-[hsl(var(--deep-teal))]" />
                <span>Account Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-[hsl(var(--text-light))]">Email</label>
                  <p className="text-lg">{user?.email || "Not provided"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-[hsl(var(--text-light))]">Name</label>
                  <p className="text-lg">
                    {user?.firstName || user?.lastName 
                      ? `${user?.firstName || ""} ${user?.lastName || ""}`.trim()
                      : "Not provided"
                    }
                  </p>
                </div>
              </div>
              
              {/* Subscription Status */}
              {isPremium && (
                <div className="mt-6 pt-6 border-t">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <Crown className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Premium Subscription</div>
                          <div className="text-sm text-gray-600 capitalize">
                            {subscription?.planType} Plan - Active
                          </div>
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                        ACTIVE
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/api/logout"}
                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                >
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}
