import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets } from "lucide-react";

export default function ProductionLogin() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      // Force page reload to trigger session-based authentication
      window.location.reload();
    } catch (error) {
      console.error('Login error:', error);
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Droplets className="text-white w-8 h-8" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome to HydroMate
          </CardTitle>
          <p className="text-gray-600 mt-2">Production Demo</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-gray-600">
            Click below to access the HydroMate demo application with full features.
          </p>
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full"
          >
            {isLoggingIn ? "Loading App..." : "Enter HydroMate Demo"}
          </Button>
          <div className="text-xs text-gray-500 text-center">
            <p>Demo Features Include:</p>
            <ul className="mt-2 space-y-1">
              <li>• Water intake tracking</li>
              <li>• Weather-based recommendations</li>
              <li>• Progress analytics</li>
              <li>• Achievement system</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}