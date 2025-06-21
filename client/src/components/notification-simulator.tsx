import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bell, Smartphone, Monitor, Play } from "lucide-react";

export default function NotificationSimulator() {
  const [title, setTitle] = useState("HydroFlow Reminder");
  const [body, setBody] = useState("Time to drink water! Stay hydrated.");
  const [platform, setPlatform] = useState<'web' | 'mobile'>('web');
  const { toast } = useToast();

  const simulateNotification = () => {
    const notification = document.createElement('div');
    notification.className = `
      fixed z-50 animate-in slide-in-from-right duration-300 max-w-sm
      ${platform === 'web' ? 'top-4 right-4' : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'}
    `;
    
    if (platform === 'web') {
      // Web notification style
      notification.innerHTML = `
        <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">${title}</p>
              <p class="mt-1 text-sm text-gray-500">${body}</p>
              <div class="mt-2 flex space-x-2">
                <button class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Log 250ml</button>
                <button class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Dismiss</button>
              </div>
            </div>
            <button class="flex-shrink-0 text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.parentElement.remove()">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      `;
    } else {
      // Mobile notification style
      notification.innerHTML = `
        <div class="bg-gray-900 text-white rounded-2xl shadow-2xl p-4 w-80">
          <div class="flex items-center space-x-3 mb-2">
            <img src="/android-chrome-192x192.png" alt="HydroFlow" class="w-8 h-8 rounded-lg">
            <div class="flex-1">
              <p class="text-xs text-gray-300">HydroFlow</p>
              <p class="text-xs text-gray-400">now</p>
            </div>
          </div>
          <p class="text-sm font-medium mb-1">${title}</p>
          <p class="text-sm text-gray-300 mb-3">${body}</p>
          <div class="flex space-x-2">
            <button class="flex-1 bg-blue-600 text-white text-xs py-2 px-3 rounded-lg">Log Water</button>
            <button class="bg-gray-700 text-gray-300 text-xs py-2 px-3 rounded-lg" onclick="this.parentElement.parentElement.parentElement.remove()">Close</button>
          </div>
        </div>
      `;
    }

    document.body.appendChild(notification);

    // Auto-remove after 6 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 6000);

    toast({
      title: "Notification Simulated",
      description: `Showing how this would appear on ${platform === 'web' ? 'desktop' : 'mobile'} devices.`,
    });
  };

  const presetNotifications = [
    {
      title: "Time to Hydrate!",
      body: "You haven't logged water in 2 hours. Your body needs hydration."
    },
    {
      title: "Goal Achievement!",
      body: "Congratulations! You've reached your daily hydration goal of 2000ml."
    },
    {
      title: "Streak Milestone",
      body: "Amazing! You've maintained your hydration streak for 7 days!"
    },
    {
      title: "Weather Alert",
      body: "It's hot outside (32°C). Consider increasing your water intake today."
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <span>Notification Simulator</span>
          <Badge variant="secondary">Demo</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Platform Selection */}
        <div className="flex items-center space-x-4">
          <Label>Platform:</Label>
          <div className="flex space-x-2">
            <Button
              variant={platform === 'web' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPlatform('web')}
            >
              <Monitor className="w-4 h-4 mr-2" />
              Web
            </Button>
            <Button
              variant={platform === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPlatform('mobile')}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </Button>
          </div>
        </div>

        {/* Custom Notification */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Notification Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter notification title"
            />
          </div>
          
          <div>
            <Label htmlFor="body">Notification Body</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter notification message"
              rows={3}
            />
          </div>
          
          <Button onClick={simulateNotification} className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Simulate Notification
          </Button>
        </div>

        {/* Preset Notifications */}
        <div className="space-y-3">
          <Label>Quick Presets:</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {presetNotifications.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setTitle(preset.title);
                  setBody(preset.body);
                  setTimeout(simulateNotification, 100);
                }}
                className="text-left h-auto p-3"
              >
                <div>
                  <p className="font-medium text-xs">{preset.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{preset.body}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
          <p className="font-medium mb-1">Production Behavior:</p>
          <p>
            In a deployed app, these notifications would appear as real system notifications 
            with sound, vibration (mobile), and the ability to interact even when the app is closed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}