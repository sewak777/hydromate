import { SEOHead } from "@/components/seo-head";
import Navigation from "@/components/navigation";
import NotificationDemo from "@/components/notification-demo";

export default function Notifications() {
  return (
    <>
      <SEOHead 
        title="Notification Settings - QuenchNow"
        description="Configure your hydration reminders and notification preferences for optimal water intake tracking."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
        <Navigation />
        
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Notification Settings
                </span>
              </h1>
              <p className="text-[hsl(var(--text-light))] text-lg">
                Configure your hydration reminders and notification preferences to stay on track with your goals
              </p>
            </div>

            <NotificationDemo />
          </div>
        </div>
      </div>
    </>
  );
}