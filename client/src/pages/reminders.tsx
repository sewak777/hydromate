import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import { SEOHead } from "@/components/seo-head";
import { notificationService } from "@/services/notificationService";
import { CapacitorService } from "@/services/capacitor";
import { Bell, BellOff, Clock, Shield, Smartphone, Monitor, Settings, Save } from "lucide-react";

const reminderSchema = z.object({
  intervalMinutes: z.coerce.number().min(15).max(480),
  startTime: z.string(),
  endTime: z.string(),
  isEnabled: z.boolean(),
  soundId: z.string().optional(),
});

type ReminderFormData = z.infer<typeof reminderSchema>;

export default function Reminders() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isNative, setIsNative] = useState(false);

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

  const { data: reminders } = useQuery({
    queryKey: ["/api/reminders"],
    retry: false,
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

  // Initialize notification service
  useEffect(() => {
    const init = async () => {
      setIsNative(CapacitorService.isNative());
      
      // Check if notifications are supported
      if ('Notification' in window) {
        setPermission(Notification.permission);
        setNotificationsEnabled(Notification.permission === 'granted');
      } else {
        setPermission('denied');
        setNotificationsEnabled(false);
      }
      
      await notificationService.initialize();
    };
    init();
  }, []);

  const requestPermission = async () => {
    // First check if notifications are supported
    if (!('Notification' in window)) {
      toast({
        title: "Not Supported",
        description: "Notifications are not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    // Check current permission state
    const currentPermission = Notification.permission;
    
    if (currentPermission === 'denied') {
      toast({
        title: "Permission Blocked",
        description: "Notifications are blocked. Please enable them in your browser settings and refresh the page.",
        variant: "destructive",
      });
      return;
    }

    if (currentPermission === 'granted') {
      setPermission('granted');
      setNotificationsEnabled(true);
      toast({
        title: "Already Enabled",
        description: "Notifications are already enabled for this site.",
      });
      return;
    }

    // Request permission
    try {
      const newPermission = await notificationService.requestPermission();
      setPermission(newPermission);
      setNotificationsEnabled(newPermission === 'granted');
      
      if (newPermission === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive hydration reminders and goal notifications.",
        });
      } else if (newPermission === 'denied') {
        toast({
          title: "Permission Denied",
          description: "You can change this in your browser settings. Look for the notification icon in the address bar.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Permission Error",
        description: "There was an error requesting notification permission. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateReminderMutation = useMutation({
    mutationFn: async (data: ReminderFormData) => {
      const response = await apiRequest("/api/reminders", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reminders"] });
      toast({
        title: "Reminder settings updated",
        description: "Your notification preferences have been saved.",
      });
    },
    onError: (error: any) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Session expired",
          description: "Please log in again to continue.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
      } else {
        toast({
          title: "Error updating reminder settings",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    },
  });

  const onSubmit = (data: ReminderFormData) => {
    updateReminderMutation.mutate(data);
  };

  const getPermissionColor = () => {
    switch (permission) {
      case 'granted': return 'bg-green-100 text-green-800';
      case 'denied': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPermissionIcon = () => {
    switch (permission) {
      case 'granted': return <Bell className="w-4 h-4" />;
      case 'denied': return <BellOff className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <SEOHead 
        title="Reminders & Notifications - HydroMate"
        description="Configure your hydration reminders and notification settings for optimal water intake tracking."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
        <Navigation />
        
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Reminders & Notifications
                </span>
              </h1>
              <p className="text-[hsl(var(--text-light))] text-lg">
                Configure your hydration reminders and notification preferences to stay on track with your goals
              </p>
            </div>

            <div className="space-y-6">
              {/* Notification Permission Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <span>Notification Permission</span>
                    {isNative && (
                      <Badge variant="secondary" className="ml-2">
                        <Smartphone className="w-3 h-3 mr-1" />
                        Native App
                      </Badge>
                    )}
                    {!isNative && (
                      <Badge variant="outline" className="ml-2">
                        <Monitor className="w-3 h-3 mr-1" />
                        Web App
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Permission Status */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getPermissionIcon()}
                        <span className="font-medium">Notification Permission</span>
                      </div>
                      <Badge className={getPermissionColor()}>
                        {permission.charAt(0).toUpperCase() + permission.slice(1)}
                      </Badge>
                    </div>
                    
                    {permission !== 'granted' && (
                      <Button onClick={requestPermission} size="sm">
                        Enable Notifications
                      </Button>
                    )}
                  </div>

                  {/* Global Notification Toggle */}
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="notifications-enabled" 
                      checked={notificationsEnabled && permission === 'granted'}
                      disabled={permission !== 'granted'}
                      onCheckedChange={setNotificationsEnabled}
                    />
                    <Label htmlFor="notifications-enabled">
                      Enable hydration notifications
                    </Label>
                  </div>


                </CardContent>
              </Card>

              {/* Reminder Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Reminder Settings</span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <Form {...reminderForm}>
                    <form onSubmit={reminderForm.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={reminderForm.control}
                          name="intervalMinutes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reminder Interval</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select interval" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="15">Every 15 minutes</SelectItem>
                                  <SelectItem value="30">Every 30 minutes</SelectItem>
                                  <SelectItem value="60">Every hour</SelectItem>
                                  <SelectItem value="90">Every 90 minutes</SelectItem>
                                  <SelectItem value="120">Every 2 hours</SelectItem>
                                  <SelectItem value="180">Every 3 hours</SelectItem>
                                  <SelectItem value="240">Every 4 hours</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

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
                                  <SelectItem value="gentle">Gentle chime</SelectItem>
                                  <SelectItem value="water">Water drop</SelectItem>
                                  <SelectItem value="bell">Bell</SelectItem>
                                  <SelectItem value="none">Silent</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

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
                        name="isEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Enable Reminders</FormLabel>
                              <div className="text-sm text-[hsl(var(--text-light))]">
                                Turn on/off hydration reminders during your active hours
                              </div>
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

                      <Button
                        type="submit"
                        disabled={updateReminderMutation.isPending}
                        className="w-full"
                      >
                        {updateReminderMutation.isPending ? (
                          "Saving..."
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Reminder Settings
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Troubleshooting for denied permissions */}
              {permission === 'denied' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Permission Blocked</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-red-700">
                      Notifications are currently blocked. To enable them:
                    </p>
                    <div className="text-sm text-red-700 space-y-3">
                      <div className="border-l-4 border-red-300 pl-3">
                        <p className="font-medium">Chrome/Edge:</p>
                        <ol className="list-decimal ml-4 space-y-1">
                          <li>Click the lock/shield icon in the address bar</li>
                          <li>Set "Notifications" to "Allow"</li>
                          <li>Refresh this page</li>
                        </ol>
                      </div>
                      <div className="border-l-4 border-red-300 pl-3">
                        <p className="font-medium">Firefox:</p>
                        <ol className="list-decimal ml-4 space-y-1">
                          <li>Click the shield icon in the address bar</li>
                          <li>Click "Enable Notifications"</li>
                          <li>Or go to Settings → Privacy & Security → Permissions</li>
                        </ol>
                      </div>
                      <div className="border-l-4 border-red-300 pl-3">
                        <p className="font-medium">Safari:</p>
                        <ol className="list-decimal ml-4 space-y-1">
                          <li>Go to Safari → Preferences → Websites</li>
                          <li>Select "Notifications" from the left sidebar</li>
                          <li>Set this website to "Allow"</li>
                        </ol>
                      </div>
                    </div>
                    <Button 
                      onClick={() => window.location.reload()} 
                      className="w-full"
                      variant="outline"
                    >
                      Refresh Page After Enabling
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}