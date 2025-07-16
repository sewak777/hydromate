import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo-head";
import { Droplets, Calculator, TrendingUp, Bell, Trophy, Palette, Cloud, Activity, Brain, Star, CheckCircle, Apple, Play, Crown, ArrowRight, Zap, Shield, Heart, Users, ChevronDown } from "lucide-react";

export default function ModernLanding() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <>
      <SEOHead 
        title="HydroMate - Smart Water Reminder & Hydration Tracking App"
        description="Transform your daily hydration with intelligent reminders, personalized goals, and beautiful progress tracking. Join thousands who've made hydration effortless with weather-based recommendations."
        keywords="water reminder app, hydration tracker, water intake monitoring, daily water goal, health tracking app, wellness application, hydration habits, smart water reminders, water tracking app, health monitoring"
        canonicalUrl="https://hydromate.com"
      />
      
      <div className="min-h-screen bg-white">
        {/* Modern Navigation */}
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Droplets className="text-white w-5 h-5" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  HydroMate
                </span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Reviews</a>
                <Button 
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - Modern Design */}
        <section className="pt-24 pb-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6 opacity-0 animate-pulse" style={{animation: 'fadeInUp 0.6s ease-out forwards'}}>
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium">
                    <Zap className="w-4 h-4 mr-2" />
                    Smart hydration technology
                  </div>
                  
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Stay perfectly 
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      {" "}hydrated
                    </span>
                    <br />every single day
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                    Transform your health with intelligent water reminders, personalized goals, and beautiful progress tracking that adapts to your lifestyle.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-pulse" style={{animation: 'fadeInUp 0.6s ease-out 0.2s forwards'}}>
                  <Button
                    onClick={handleLogin}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    Start tracking today
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="flex items-center space-x-6 pt-8 opacity-0 animate-pulse" style={{animation: 'fadeInUp 0.6s ease-out 0.4s forwards'}}>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white"></div>
                      ))}
                    </div>
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

              {/* Right Content - App Preview */}
              <div className="relative flex justify-center lg:justify-end opacity-0 animate-pulse" style={{animation: 'slideInRight 0.8s ease-out 0.3s forwards'}}>
                {/* Phone Mockup */}
                <div className="relative">
                  <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                      {/* Status Bar */}
                      <div className="bg-gray-900 h-8 flex items-center justify-between px-6 text-white text-sm">
                        <span>9:41</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-2 bg-green-400 rounded"></div>
                          <span className="text-xs">100%</span>
                        </div>
                      </div>
                      
                      {/* App Interface */}
                      <div className="bg-gradient-to-br from-blue-50 to-white h-full p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">Good morning!</h3>
                            <p className="text-sm text-gray-600">Let's reach your hydration goal</p>
                          </div>
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Bell className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>

                        {/* Progress Card */}
                        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
                          <div className="text-center mb-4">
                            <div className="text-3xl font-bold text-blue-600 mb-1">1,200ml</div>
                            <div className="text-sm text-gray-600">of 2,000ml goal</div>
                          </div>
                          
                          {/* Circular Progress */}
                          <div className="relative w-32 h-32 mx-auto mb-4">
                            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                stroke="#2563eb" 
                                strokeWidth="8" 
                                fill="none"
                                strokeDasharray="251.2"
                                strokeDashoffset="75.36"
                                className="transition-all duration-1000"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold text-blue-600">60%</span>
                            </div>
                          </div>
                          
                          <div className="text-center text-sm text-gray-600">
                            You're doing great! 800ml to go
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-3">
                          <button className="bg-blue-600 text-white rounded-2xl p-4 text-center transition-transform hover:scale-105">
                            <Droplets className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-semibold">Log Water</div>
                          </button>
                          <button className="bg-gray-100 text-gray-700 rounded-2xl p-4 text-center transition-transform hover:scale-105">
                            <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                            <div className="text-sm font-semibold">View Stats</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-green-400/20 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-blue-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Cards Layout */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything you need to stay hydrated
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Powerful features designed to make hydration tracking effortless and effective
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: "Smart Reminders",
                  description: "Notifications that adapt to your schedule and preferences",
                  color: "blue"
                },
                {
                  icon: <Activity className="w-8 h-8" />,
                  title: "Progress Tracking",
                  description: "Beautiful charts and insights to visualize your hydration journey",
                  color: "green"
                },
                {
                  icon: <Cloud className="w-8 h-8" />,
                  title: "Weather Integration",
                  description: "Automatic goal adjustments based on temperature and humidity",
                  color: "purple"
                },
                {
                  icon: <Trophy className="w-8 h-8" />,
                  title: "Achievement System",
                  description: "Unlock badges and celebrate your hydration milestones",
                  color: "yellow"
                },
                {
                  icon: <Calculator className="w-8 h-8" />,
                  title: "Personalized Goals",
                  description: "Custom daily targets based on your body weight and activity level",
                  color: "pink"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Privacy First",
                  description: "Your health data stays secure with enterprise-grade protection",
                  color: "gray"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="opacity-0 animate-pulse modern-card"
                  style={{animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`}}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6`}>
                        <div className="text-blue-600">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50K+", label: "Active Users" },
                { number: "2M+", label: "Glasses Tracked" },
                { number: "94%", label: "Goal Achievement" },
                { number: "4.9★", label: "App Store Rating" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="space-y-2 opacity-0 animate-pulse"
                  style={{animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`}}
                >
                  <div className="text-4xl font-bold text-blue-600">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-xl text-gray-600">
                Start free, upgrade when you need advanced features
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic Plan */}
              <Card className="border-2 border-gray-200 shadow-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      15% OFF
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg text-gray-500 line-through">$3.49</span>
                      <div className="text-4xl font-bold text-gray-900">$2.99</div>
                    </div>
                    <div className="text-gray-600">per month</div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      "Basic hydration tracking",
                      "Simple reminders",
                      "Progress charts",
                      "Achievement badges"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={handleLogin}
                    variant="outline" 
                    className="w-full py-3 rounded-xl font-semibold"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="border-2 border-blue-500 shadow-lg relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg text-gray-500 line-through">$9.99</span>
                      <div className="text-4xl font-bold text-gray-900">$7.99</div>
                    </div>
                    <div className="text-gray-600">per month</div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      "Everything in Basic",
                      "Weather-based adjustments",
                      "Advanced analytics",
                      "Custom reminder schedules",
                      "Export data"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={handleLogin}
                    className="w-full py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700"
                  >
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>

              {/* Annual Plan */}
              <Card className="border-2 border-gray-200 shadow-sm">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      30% OFF
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Annual</h3>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-lg text-gray-500 line-through">$95.99</span>
                      <div className="text-4xl font-bold text-gray-900">$86.39</div>
                    </div>
                    <div className="text-gray-600">per year</div>
                    <div className="text-sm text-green-600 font-semibold mt-2">Save $57.60</div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      "Everything in Premium",
                      "2 months free",
                      "Early access to features"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={handleLogin}
                    variant="outline" 
                    className="w-full py-3 rounded-xl font-semibold"
                  >
                    Choose Annual
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="opacity-0 animate-pulse" style={{animation: 'fadeInUp 0.6s ease-out forwards'}}>
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to transform your hydration habits?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who've already improved their health with HydroMate. 
                Start your journey to better hydration today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleLogin}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105"
                >
                  Start Free Today
                </Button>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                    <Droplets className="text-white w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold">HydroMate</span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  The smart way to stay hydrated and healthy every day.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><button onClick={handleLogin} className="hover:text-white transition-colors text-left">Get Started</button></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><span className="text-gray-500">About</span></li>
                  <li><span className="text-gray-500">Blog</span></li>
                  <li><span className="text-gray-500">Contact</span></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><span className="text-gray-500">Help Center</span></li>
                  <li><span className="text-gray-500">Privacy</span></li>
                  <li><span className="text-gray-500">Terms</span></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2025 HydroMate. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}