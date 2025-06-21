import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { notificationService } from "@/services/notificationService";
import { CapacitorService } from "@/services/capacitor";
import { 
  Bell, 
  BellOff, 
  Clock, 
  Target, 
  Droplets, 
  TestTube,
  Shield,
  Smartphone,
  Monitor
} from "lucide-react";

export default function NotificationDemo() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isEnabled, setIsEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [isNative, setIsNative] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize notification service
    const init = async () => {
      setIsNative(CapacitorService.isNative());
      
      // Check if notifications are supported
      if ('Notification' in window) {
        setPermission(Notification.permission);
        setIsEnabled(Notification.permission === 'granted');
      } else {
        setPermission('denied');
        setIsEnabled(false);
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
      setIsEnabled(true);
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
      setIsEnabled(newPermission === 'granted');
      
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

  const testBasicNotification = async () => {
    await notificationService.testNotification();
    toast({
      title: "Test Sent",
      description: "Check for the notification popup!",
    });
  };

  const testHydrationReminder = async () => {
    await notificationService.scheduleHydrationReminder(reminderTime, 2000);
    toast({
      title: "Reminder Scheduled",
      description: `Hydration reminder set for ${reminderTime}`,
    });
  };

  const testGoalAchieved = async () => {
    await notificationService.showGoalAchievedNotification(2000, 2000);
    toast({
      title: "Goal Notification Sent",
      description: "Celebration notification displayed!",
    });
  };

  const testDrinkReminder = async () => {
    await notificationService.showDrinkReminder(1200, 2000);
    toast({
      title: "Drink Reminder Sent",
      description: "Progress reminder notification sent!",
    });
  };

  const scheduleReminderIn30Seconds = async () => {
    const futureTime = new Date(Date.now() + 30 * 1000); // 30 seconds from now
    await notificationService.showNotification({
      title: "Scheduled Reminder 📅",
      body: "This notification was scheduled 30 seconds ago!",
      scheduledTime: futureTime,
      tag: 'scheduled-demo'
    });
    
    toast({
      title: "Reminder Scheduled",
      description: "You'll receive a notification in 30 seconds!",
    });
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <span>Push Notifications Demo</span>
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
      
      <CardContent className="space-y-6">
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

        {/* Notification Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="notifications-enabled" 
              checked={isEnabled && permission === 'granted'}
              disabled={permission !== 'granted'}
              onCheckedChange={setIsEnabled}
            />
            <Label htmlFor="notifications-enabled">
              Enable hydration notifications
            </Label>
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="reminder-time" className="w-32">
              Reminder Time:
            </Label>
            <Input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-32"
            />
          </div>
        </div>

        {/* Demo Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={testBasicNotification}
            disabled={!isEnabled}
            className="flex items-center space-x-2"
            variant="outline"
          >
            <TestTube className="w-4 h-4" />
            <span>Test Basic Notification</span>
          </Button>

          <Button
            onClick={testHydrationReminder}
            disabled={!isEnabled}
            className="flex items-center space-x-2"
            variant="outline"
          >
            <Clock className="w-4 h-4" />
            <span>Test Daily Reminder</span>
          </Button>

          <Button
            onClick={testGoalAchieved}
            disabled={!isEnabled}
            className="flex items-center space-x-2"
            variant="outline"
          >
            <Target className="w-4 h-4" />
            <span>Test Goal Achievement</span>
          </Button>

          <Button
            onClick={testDrinkReminder}
            disabled={!isEnabled}
            className="flex items-center space-x-2"
            variant="outline"
          >
            <Droplets className="w-4 h-4" />
            <span>Test Progress Reminder</span>
          </Button>

          <Button
            onClick={scheduleReminderIn30Seconds}
            disabled={!isEnabled}
            className="flex items-center space-x-2 md:col-span-2"
            variant="default"
          >
            <Clock className="w-4 h-4" />
            <span>Schedule Notification (30s)</span>
          </Button>
        </div>

        {/* Information */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">How Notifications Work:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>Web:</strong> Browser notifications with action buttons</li>
            <li>• <strong>Mobile:</strong> Native push notifications via Capacitor</li>
            <li>• <strong>Scheduled:</strong> Daily reminders at your preferred time</li>
            <li>• <strong>Smart:</strong> Progress updates and goal celebrations</li>
            <li>• <strong>Interactive:</strong> Quick actions to log water intake</li>
          </ul>
        </div>

        {permission === 'denied' && (
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-900 mb-2">Permission Blocked</h4>
            <p className="text-sm text-red-700 mb-3">
              Notifications are currently blocked. To enable them:
            </p>
            <div className="text-sm text-red-700 space-y-2">
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
              className="mt-4 w-full"
              variant="outline"
            >
              Refresh Page After Enabling
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}