import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo-head";
import { 
  Droplets, 
  TrendingUp, 
  Bell, 
  Trophy, 
  Cloud, 
  Activity, 
  Brain, 
  Star, 
  CheckCircle, 
  Play,
  Apple,
  Smartphone,
  Target,
  Award,
  BarChart3,
  Zap,
  Shield,
  Heart
} from "lucide-react";

export default function ModernLanding() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const features = [
    {
      icon: Bell,
      title: "Smart Reminders",
      description: "AI-powered notifications that adapt to your schedule and habits",
      color: "bg-green-500",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: Cloud,
      title: "Weather Integration",
      description: "Automatic hydration adjustments based on local weather conditions",
      color: "bg-blue-500",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed insights and trends to optimize your hydration habits",
      color: "bg-purple-500",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      icon: Target,
      title: "Personalized Goals",
      description: "Custom daily targets based on your weight, activity, and lifestyle",
      color: "bg-orange-500",
      gradient: "from-orange-400 to-orange-600"
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Unlock badges and celebrate milestones on your hydration journey",
      color: "bg-yellow-500",
      gradient: "from-yellow-400 to-yellow-600"
    },
    {
      icon: Heart,
      title: "Health Tracking",
      description: "Monitor your wellness with comprehensive health integration",
      color: "bg-red-500",
      gradient: "from-red-400 to-red-600"
    }
  ];

  const trustedBy = [
    "Amazon", "Spotify", "HubSpot", "Notion", "Netflix", "Zoom"
  ];

  return (
    <>
      <SEOHead 
        title="QuenchNow - Smart Hydration Made Simple"
        description="Transform your daily hydration with intelligent reminders, personalized goals, and beautiful progress tracking. Join thousands making hydration effortless."
        keywords="water reminder app, hydration tracker, water intake monitoring, daily water goal, health tracking app"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-300 to-lime-200">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <Droplets className="text-green-600 w-6 h-6" />
                </div>
                <span className="text-xl font-bold text-white">QuenchNow</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <a href="#about" className="text-white/80 hover:text-white transition-colors font-medium">About us</a>
                <a href="#services" className="text-white/80 hover:text-white transition-colors font-medium">Services</a>
                <a href="#case-study" className="text-white/80 hover:text-white transition-colors font-medium">Use Cases</a>
                <a href="#pricing" className="text-white/80 hover:text-white transition-colors font-medium">Pricing</a>
                <a href="#blog" className="text-white/80 hover:text-white transition-colors font-medium">Blog</a>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-green-600">
                  Request a quote
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-white">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Navigating the{" "}
                  <span className="bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                    digital landscape
                  </span>{" "}
                  for success
                </h1>
                
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Our digital marketing agency helps navigate the online landscape with expert guidance and advanced solutions through a range of marketing services including SEO, PPC, social media marketing, and web development.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button 
                    onClick={handleLogin}
                    size="lg"
                    className="bg-black text-white hover:bg-gray-900 px-8 py-4 text-lg font-semibold rounded-xl"
                  >
                    Start a consultation
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold rounded-xl"
                  >
                    View our portfolio
                  </Button>
                </div>

                {/* Trusted by logos */}
                <div className="space-y-4">
                  <p className="text-white/60 text-sm font-medium">Trusted by leading brands</p>
                  <div className="flex flex-wrap items-center gap-6">
                    {trustedBy.map((brand) => (
                      <div key={brand} className="text-white/40 font-semibold text-sm">
                        {brand}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Illustration/Graphics */}
              <div className="relative">
                <div className="relative z-10">
                  {/* Main illustration area */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-6">
                    <div className="flex items-center justify-center h-40">
                      <div className="relative">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <Droplets className="w-10 h-10 text-green-500" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature cards floating around */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardContent className="p-4">
                        <Bell className="w-6 h-6 text-white mb-2" />
                        <p className="text-white/80 text-sm font-medium">Smart Reminders</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                      <CardContent className="p-4">
                        <TrendingUp className="w-6 h-6 text-white mb-2" />
                        <p className="text-white/80 text-sm font-medium">Progress Tracking</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 right-10 w-4 h-4 bg-white rounded-full"></div>
                  <div className="absolute bottom-20 left-5 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute top-1/3 left-0 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <Badge className="bg-green-100 text-green-700 mb-4">Services</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                We provide marketing services to help businesses grow and succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From strategy development to execution, we offer comprehensive digital marketing solutions 
                tailored to your business needs and goals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`h-2 bg-gradient-to-r ${feature.gradient}`}></div>
                    <div className="p-6">
                      <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                      <div className="mt-4">
                        <Button variant="ghost" className="p-0 h-auto font-semibold text-green-600 hover:text-green-700">
                          Learn more →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-green-500">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to transform your hydration habits?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of users who've made hydration effortless with QuenchNow's intelligent tracking and reminders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleLogin}
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  View Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Droplets className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold">QuenchNow</span>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 QuenchNow. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}