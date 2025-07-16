import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import { SEOHead } from "@/components/seo-head";
import { CheckCircle, Crown, ArrowRight } from "lucide-react";

export default function SubscriptionSuccess() {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Welcome to Premium!",
      description: "Your subscription has been activated successfully.",
    });
  }, [toast]);

  return (
    <>
      <SEOHead 
        title="Subscription Successful - HydroMate Premium"
        description="Welcome to HydroMate Premium! Your subscription has been activated successfully."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
        <Navigation />
        
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="text-center bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <span>Welcome to Premium!</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-gray-600 text-lg">
                  Your HydroMate Premium subscription has been activated successfully. 
                  You now have access to all premium features!
                </p>
                
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Premium Features Unlocked:</h3>
                  <ul className="text-left space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Weather-based hydration adjustments</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Advanced analytics and insights</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Custom reminder sounds</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Priority customer support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Smart notification scheduling</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="w-full"
                    size="lg"
                  >
                    Start Using Premium Features
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <Button 
                    onClick={() => window.location.href = '/profile'}
                    variant="outline"
                    className="w-full"
                  >
                    Manage Subscription
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500">
                  Need help? Contact our support team at support@hydromate.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}