import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Navigation from "@/components/navigation";
import SubscriptionPlans from "@/components/subscription-plans";
import { SEOHead } from "@/components/seo-head";

export default function Subscription() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

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

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <>
      <SEOHead 
        title="Premium Subscription - HydroMate"
        description="Upgrade to HydroMate Premium for advanced hydration tracking, weather-based adjustments, and detailed analytics."
        keywords="hydration, premium, subscription, weather tracking, advanced analytics"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
        <Navigation />
        
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4">
            <SubscriptionPlans />
          </div>
        </div>
      </div>
    </>
  );
}