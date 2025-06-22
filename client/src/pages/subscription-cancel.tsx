import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import { SEOHead } from "@/components/seo-head";
import { XCircle, ArrowLeft, CreditCard } from "lucide-react";

export default function SubscriptionCancel() {
  return (
    <>
      <SEOHead 
        title="Subscription Cancelled - HydroFlow"
        description="Your subscription process was cancelled. You can try again anytime."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
        <Navigation />
        
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="text-center">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <XCircle className="w-8 h-8 text-gray-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">
                  Subscription Cancelled
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-gray-600">
                  Your subscription process was cancelled. No charges have been made to your account.
                  You can try again anytime or continue using HydroFlow with our free features.
                </p>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">Free Features Available:</h3>
                  <ul className="text-left space-y-1 text-sm text-blue-700">
                    <li>• Basic water intake logging</li>
                    <li>• Simple daily goal tracking</li>
                    <li>• Basic reminders</li>
                    <li>• Progress visualization</li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => window.location.href = '/subscription'}
                    className="w-full"
                    size="lg"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Try Premium Again
                  </Button>
                  
                  <Button 
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Continue with Free Plan
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500">
                  Questions? Contact us at support@hydroflow.app
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}