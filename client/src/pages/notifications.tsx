import { SEOHead } from "@/components/seo-head";
import Navigation from "@/components/navigation";
import NotificationDemo from "@/components/notification-demo";

export default function Notifications() {
  return (
    <>
      <SEOHead 
        title="Push Notifications Demo - HydroFlow"
        description="Experience push notifications functionality for hydration reminders and goal achievements in HydroFlow."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
        <Navigation />
        
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Push Notifications Demo
                </span>
              </h1>
              <p className="text-[hsl(var(--text-light))] text-lg">
                Test and experience how HydroFlow's smart notifications work across web and mobile platforms
              </p>
            </div>

            <NotificationDemo />
          </div>
        </div>
      </div>
    </>
  );
}