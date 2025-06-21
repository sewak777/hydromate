import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle } from "lucide-react";
import { notificationService } from "@/services/notificationService";
import { useToast } from "@/hooks/use-toast";

export default function NotificationTest() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const showTestNotification = async () => {
    setIsLoading(true);
    try {
      await notificationService.testNotification();
      toast({
        title: "Notification Sent",
        description: "Check your notification area to see the test notification!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification. Please check permissions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <Bell className="w-8 h-8 mx-auto mb-2 text-blue-600" />
        <CardTitle>Test Push Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-center text-gray-600">
          Click the button below to see a sample notification
        </p>
        
        <Button 
          onClick={showTestNotification}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            "Sending..."
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Send Test Notification
            </>
          )}
        </Button>

        <div className="text-xs text-center text-gray-500 space-y-1">
          <p>The notification will appear:</p>
          <p>• Desktop: Top-right corner</p>
          <p>• Mobile: Notification bar</p>
          <p>• Native App: System notifications</p>
        </div>
      </CardContent>
    </Card>
  );
}