import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info,
  ExternalLink,
  RefreshCw
} from "lucide-react";

interface BrowserInfo {
  name: string;
  version: string;
  isSupported: boolean;
}

export default function NotificationTroubleshoot() {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [permissionState, setPermissionState] = useState<NotificationPermission>('default');
  const [isReplit, setIsReplit] = useState(false);
  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  useEffect(() => {
    detectBrowser();
    checkEnvironment();
    checkPermissionState();
  }, []);

  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    let name = 'Unknown';
    let version = 'Unknown';
    let isSupported = false;

    if (userAgent.includes('Chrome')) {
      name = 'Chrome';
      const match = userAgent.match(/Chrome\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      isSupported = parseInt(version) >= 50;
    } else if (userAgent.includes('Firefox')) {
      name = 'Firefox';
      const match = userAgent.match(/Firefox\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      isSupported = parseInt(version) >= 44;
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      name = 'Safari';
      const match = userAgent.match(/Safari\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      isSupported = parseInt(version) >= 604;
    } else if (userAgent.includes('Edge')) {
      name = 'Edge';
      const match = userAgent.match(/Edge\/(\d+)/);
      version = match ? match[1] : 'Unknown';
      isSupported = parseInt(version) >= 14;
    }

    setBrowserInfo({ name, version, isSupported });
  };

  const checkEnvironment = () => {
    const hostname = window.location.hostname;
    setIsReplit(hostname.includes('replit.dev') || hostname.includes('replit.app'));
  };

  const checkPermissionState = () => {
    if ('Notification' in window) {
      setPermissionState(Notification.permission);
    }
  };

  const runDiagnostics = async () => {
    const results: { [key: string]: boolean } = {};

    // Test 1: Notification API availability
    results.apiAvailable = 'Notification' in window;

    // Test 2: Service Worker registration
    results.serviceWorker = 'serviceWorker' in navigator;

    // Test 3: HTTPS requirement
    results.httpsOrLocalhost = window.location.protocol === 'https:' || 
                               window.location.hostname === 'localhost' ||
                               window.location.hostname === '127.0.0.1';

    // Test 4: Permission state
    results.permissionGranted = Notification.permission === 'granted';

    // Test 5: Focus state
    results.windowFocused = document.hasFocus();

    // Test 6: Notification constructor
    try {
      if (Notification.permission === 'granted') {
        const testNotification = new Notification('Test', { 
          body: 'Diagnostic test', 
          silent: true,
          tag: 'diagnostic'
        });
        testNotification.close();
        results.constructorWorks = true;
      } else {
        results.constructorWorks = false;
      }
    } catch (error) {
      results.constructorWorks = false;
    }

    setTestResults(results);
    
    toast({
      title: "Diagnostics Complete",
      description: "Check the results below for troubleshooting information.",
    });
  };

  const forcePermissionRequest = async () => {
    if (!('Notification' in window)) {
      toast({
        title: "Not Supported",
        description: "Notifications are not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Reset any cached permission state
      const permission = await Notification.requestPermission();
      setPermissionState(permission);
      
      if (permission === 'granted') {
        // Test with immediate notification
        const testNotification = new Notification('Permission Granted!', {
          body: 'Notifications are now working. You should see this message.',
          icon: '/android-chrome-192x192.png',
          tag: 'permission-test'
        });
        
        setTimeout(() => testNotification.close(), 5000);
        
        toast({
          title: "Success!",
          description: "Notifications are now enabled and working.",
        });
      } else {
        toast({
          title: "Permission " + permission,
          description: permission === 'denied' ? 
            "Notifications were blocked. Try the manual steps below." :
            "Permission request was dismissed.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request permission: " + error.message,
        variant: "destructive",
      });
    }
  };

  const openInNewTab = () => {
    const url = window.location.href;
    window.open(url, '_blank');
    toast({
      title: "New Tab Opened",
      description: "Try enabling notifications in the new tab, then return here.",
    });
  };

  const getStatusIcon = (status: boolean | undefined) => {
    if (status === undefined) return <Info className="w-4 h-4 text-gray-500" />;
    return status ? 
      <CheckCircle className="w-4 h-4 text-green-600" /> : 
      <XCircle className="w-4 h-4 text-red-600" />;
  };

  const getStatusColor = (status: boolean | undefined) => {
    if (status === undefined) return 'text-gray-600';
    return status ? 'text-green-600' : 'text-red-600';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <span>Notification Troubleshooting</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Environment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Browser Information</h4>
            {browserInfo && (
              <div className="space-y-1 text-sm">
                <p><strong>Browser:</strong> {browserInfo.name} {browserInfo.version}</p>
                <p><strong>Supported:</strong> 
                  <Badge className={browserInfo.isSupported ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {browserInfo.isSupported ? 'Yes' : 'No'}
                  </Badge>
                </p>
              </div>
            )}
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Environment</h4>
            <div className="space-y-1 text-sm">
              <p><strong>Platform:</strong> {isReplit ? 'Replit Preview' : 'Standard Web'}</p>
              <p><strong>Protocol:</strong> {window.location.protocol}</p>
              <p><strong>Permission:</strong> 
                <Badge className={`ml-2 ${
                  permissionState === 'granted' ? 'bg-green-100 text-green-800' :
                  permissionState === 'denied' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {permissionState}
                </Badge>
              </p>
            </div>
          </div>
        </div>

        {/* Replit-specific warning */}
        {isReplit && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Replit Environment Detected:</strong> Notifications may be limited in the preview environment. 
              For full functionality, try opening this app in a new browser tab or deploy it to production.
            </AlertDescription>
          </Alert>
        )}

        {/* Diagnostic Tests */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Diagnostic Tests</h4>
            <Button onClick={runDiagnostics} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Diagnostics
            </Button>
          </div>
          
          {Object.keys(testResults).length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className={`flex items-center space-x-2 p-2 rounded ${getStatusColor(testResults.apiAvailable)}`}>
                {getStatusIcon(testResults.apiAvailable)}
                <span className="text-sm">Notification API Available</span>
              </div>
              <div className={`flex items-center space-x-2 p-2 rounded ${getStatusColor(testResults.serviceWorker)}`}>
                {getStatusIcon(testResults.serviceWorker)}
                <span className="text-sm">Service Worker Support</span>
              </div>
              <div className={`flex items-center space-x-2 p-2 rounded ${getStatusColor(testResults.httpsOrLocalhost)}`}>
                {getStatusIcon(testResults.httpsOrLocalhost)}
                <span className="text-sm">HTTPS/Localhost</span>
              </div>
              <div className={`flex items-center space-x-2 p-2 rounded ${getStatusColor(testResults.permissionGranted)}`}>
                {getStatusIcon(testResults.permissionGranted)}
                <span className="text-sm">Permission Granted</span>
              </div>
              <div className={`flex items-center space-x-2 p-2 rounded ${getStatusColor(testResults.windowFocused)}`}>
                {getStatusIcon(testResults.windowFocused)}
                <span className="text-sm">Window Focused</span>
              </div>
              <div className={`flex items-center space-x-2 p-2 rounded ${getStatusColor(testResults.constructorWorks)}`}>
                {getStatusIcon(testResults.constructorWorks)}
                <span className="text-sm">Notification Constructor</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={forcePermissionRequest} className="w-full">
            Force Permission Request
          </Button>
          <Button onClick={openInNewTab} variant="outline" className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            Open in New Tab
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Page
          </Button>
        </div>

        {/* Manual Steps */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-3">Manual Permission Steps</h4>
          <div className="text-sm text-blue-700 space-y-3">
            <div>
              <p className="font-medium">1. Check Address Bar:</p>
              <p>Look for a notification icon (🔔) or shield icon in your browser's address bar and click it.</p>
            </div>
            <div>
              <p className="font-medium">2. Site Settings:</p>
              <p>Right-click on the page → Site Information → Permissions → Notifications → Allow</p>
            </div>
            <div>
              <p className="font-medium">3. Browser Settings:</p>
              <p>Go to your browser's privacy/content settings and ensure notifications are enabled for this site.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}