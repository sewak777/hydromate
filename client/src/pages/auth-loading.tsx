import { useEffect } from "react";
import { Droplets } from "lucide-react";

export default function AuthLoading() {
  useEffect(() => {
    // Auto-redirect after a few seconds if stuck
    const timer = setTimeout(() => {
      window.location.href = "/";
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative text-center space-y-8">
        {/* Animated Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center animate-pulse">
            <Droplets className="text-white w-10 h-10" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Signing you in...
          </h1>
          <p className="text-gray-600 max-w-md">
            Please wait while we securely authenticate your account and prepare your personalized dashboard.
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>

        {/* Security Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Secure Authentication
        </div>

        {/* Fallback Message */}
        <div className="text-xs text-gray-500 max-w-sm">
          If this page doesn't redirect automatically, 
          <a href="/" className="text-blue-600 hover:underline ml-1">click here to return home</a>
        </div>
      </div>
    </div>
  );
}