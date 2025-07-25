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

import Navigation from "@/components/navigation";
import LocationSettings from "@/components/location-settings";
import { SEOHead } from "@/components/seo-head";
import { User, Activity, Settings, Save, MapPin } from "lucide-react";

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

type ProfileFormData = z.infer<typeof profileSchema>;

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

  const onProfileSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <>
      <SEOHead 
        title="Profile Settings - HydroMate"
        description="Customize your hydration profile with personalized goals and weather preferences. Optimize your water tracking experience."
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



            {/* Location & Weather Settings Card */}
            {true && (
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
