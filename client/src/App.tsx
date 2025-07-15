/**
 * HydroMate - Smart Hydration Tracking Application
 * Copyright (c) 2025 HydroMate
 * Licensed under MIT License - see LICENSE file for details
 */

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
import ModernLanding from "@/pages/modern-landing";
import AuthPage from "@/pages/auth";
import AuthLoading from "@/pages/auth-loading";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import Analytics from "@/pages/analytics";
import Reminders from "@/pages/reminders";
import Notifications from "@/pages/notifications";
import Subscription from "@/pages/subscription";
import SubscriptionSuccess from "@/pages/subscription-success";
import SubscriptionCancel from "@/pages/subscription-cancel";
import TermsOfService from "@/pages/terms";
import PrivacyPolicy from "@/pages/privacy";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  // Initialize notifications when app loads
  useEffect(() => {
    notificationService.initialize();
  }, []);

  return (
    <Switch>
      {isLoading ? (
        <Route path="*" component={AuthLoading} />
      ) : !isAuthenticated ? (
        <>
          <Route path="/" component={ModernLanding} />
          <Route path="/landing" component={Landing} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/auth/loading" component={AuthLoading} />
          <Route path="/terms" component={TermsOfService} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="*" component={NotFound} />
        </>
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/landing" component={ModernLanding} />
          <Route path="/profile" component={Profile} />
          <Route path="/analytics" component={Analytics} />
          <Route path="/reminders" component={Reminders} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/subscription" component={Subscription} />
          <Route path="/subscription/success" component={SubscriptionSuccess} />
          <Route path="/subscription/cancel" component={SubscriptionCancel} />
          <Route path="/terms" component={TermsOfService} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="*" component={NotFound} />
        </>
      )}
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
