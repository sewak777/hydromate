import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SEOHead } from "@/components/seo-head";
import { Droplets, Shield, Star, Users, ArrowRight, CheckCircle } from "lucide-react";
import { queryClient } from "@/lib/queryClient";

export default function AuthPage() {
  const handleLogin = () => {
    // In development mode, skip auth and enable mock user
    if (import.meta.env.DEV) {
      // Enable mock user for development
      fetch('/api/dev/enable-mock-user', { 
        method: 'POST',
        credentials: 'include' // Ensure cookies are included
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Store development token for backup authentication
            if (data.devToken) {
              localStorage.setItem('devToken', data.devToken);
            }
            console.log('Mock user created, session ID:', data.sessionId);
            // Redirect to main app
            window.location.href = "/";
          } else {
            // Fallback to normal auth flow
            window.location.href = "/api/login?direct=true";
          }
        })
        .catch(() => {
          // Fallback to normal auth flow
          window.location.href = "/api/login?direct=true";
        });
    } else {
      // Production: normal auth flow
      window.location.href = "/auth/loading";
      setTimeout(() => {
        window.location.href = "/api/login?direct=true";
      }, 1000);
    }
  };

  return (
    <>
      <SEOHead 
        title="Sign In - HydroMate"
        description="Sign in to access your personal hydration tracking dashboard and continue your wellness journey."
        keywords="sign in, login, hydration tracker, water reminder app"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding & Benefits */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Droplets className="text-white w-6 h-6" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                HydroMate
              </span>
            </div>

            {/* Welcome Message */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Welcome back to your
                <span className="text-blue-600"> hydration journey</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Continue tracking your daily water intake and building healthy habits that last.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {[
                "Smart reminders personalized to your schedule",
                "Beautiful progress tracking and insights", 
                "Achievement system to keep you motivated",
                "Weather-based hydration recommendations"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600 font-medium">50K+ users</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">4.9 rating</span>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-4 text-center pb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Droplets className="text-white w-8 h-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Sign in to your account
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    Access your personal hydration dashboard
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Secure Login Info */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm font-semibold text-blue-900">Secure Authentication</div>
                      <div className="text-xs text-blue-700">Your data is protected with enterprise-grade security</div>
                    </div>
                  </div>
                </div>

                {/* Sign In Button */}
                <Button
                  onClick={handleLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  size="lg"
                >
                  Continue to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* Privacy Note */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </p>
                </div>

                {/* Features Preview */}
                <div className="border-t pt-6">
                  <div className="text-center mb-4">
                    <span className="text-sm font-semibold text-gray-700">What's waiting for you:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="space-y-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <Droplets className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-700">Track Progress</div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-700">Reach Goals</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}