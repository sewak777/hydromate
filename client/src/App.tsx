import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { notificationService } from "@/services/notificationService";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import Analytics from "@/pages/analytics";
import Notifications from "@/pages/notifications";
import Subscription from "@/pages/subscription";
import SubscriptionSuccess from "@/pages/subscription-success";
import SubscriptionCancel from "@/pages/subscription-cancel";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  // Initialize notifications when app loads
  useEffect(() => {
    notificationService.initialize();
  }, []);

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/subscription" component={Subscription} />
          <Route path="/subscription/success" component={SubscriptionSuccess} />
          <Route path="/subscription/cancel" component={SubscriptionCancel} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
