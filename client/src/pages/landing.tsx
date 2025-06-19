import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Calculator, TrendingUp, Bell, Trophy, Palette, Cloud, Activity, Brain, Star, CheckCircle, Apple, Play } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 water-gradient rounded-full flex items-center justify-center">
                <Droplets className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-[hsl(var(--primary-blue))]">HydroFlow</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-[hsl(var(--text-light))] hover:text-[hsl(var(--primary-blue))] transition-colors">Features</a>
              <a href="#premium" className="text-[hsl(var(--text-light))] hover:text-[hsl(var(--primary-blue))] transition-colors">Premium</a>
              <a href="#pricing" className="text-[hsl(var(--text-light))] hover:text-[hsl(var(--primary-blue))] transition-colors">Pricing</a>
              <a href="#testimonials" className="text-[hsl(var(--text-light))] hover:text-[hsl(var(--primary-blue))] transition-colors">Reviews</a>
            </div>
            <Button 
              onClick={handleLogin}
              className="bg-[hsl(var(--vibrant-orange))] text-white hover:bg-orange-600 transition-colors font-semibold"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Unlock Your 
                <span className="text-blue-600 font-extrabold"> Best Hydration</span>
                <br />Feel the Difference
              </h1>
              <p className="text-xl text-[hsl(var(--text-light))] mb-8 leading-relaxed">
                Transform your daily hydration with intelligent reminders, personalized goals, and beautiful progress tracking. Join thousands who've made hydration effortless.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <Button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  <Apple className="w-5 h-5 mr-2" />
                  Download on App Store
                </Button>
                <Button
                  onClick={handleLogin}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Get it on Google Play
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-[hsl(var(--text-light))]">
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span>4.9/5</span>
                </div>
                <div>50K+ Downloads</div>
                <div>Free to Start</div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 animate-float">
                {/* Realistic phone mockup */}
                <div className="relative mx-auto max-w-sm">
                  {/* Phone Frame */}
                  <div className="relative bg-gray-800 rounded-[3rem] p-3 shadow-2xl">
                    {/* Screen */}
                    <div className="bg-white rounded-[2.5rem] overflow-hidden">
                      {/* Status bar */}
                      <div className="bg-black h-6 rounded-t-[2.5rem] flex items-center justify-between px-6">
                        <div className="text-white text-xs">9:41</div>
                        <div className="flex space-x-1">
                          <div className="w-4 h-2 bg-white rounded-sm"></div>
                          <div className="w-4 h-2 bg-white rounded-sm"></div>
                          <div className="w-4 h-2 bg-white rounded-sm"></div>
                        </div>
                      </div>
                      
                      {/* App Content */}
                      <div className="p-6 bg-gradient-to-br from-blue-500 to-green-400 text-white min-h-[600px]">
                        {/* Header */}
                        <div className="text-center mb-8">
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            <Droplets className="w-6 h-6" />
                            <span className="text-xl font-bold">HydroFlow</span>
                          </div>
                          <h3 className="text-lg font-semibold">Today's Progress</h3>
                          <p className="text-sm opacity-90">1,500ml of 2,000ml</p>
                        </div>
                        
                        {/* Water bottle visualization */}
                        <div className="relative mx-auto w-24 h-48 mb-8">
                          {/* Bottle outline */}
                          <div className="absolute inset-0 bg-white/20 rounded-full border-2 border-white/30"></div>
                          {/* Water fill */}
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-white/40 rounded-b-full transition-all duration-1000 border-2 border-white/50" 
                            style={{height: '75%'}}
                          ></div>
                          {/* Progress text */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                            75%
                          </div>
                          {/* Water droplets animation */}
                          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                            <Droplets className="w-4 h-4 animate-bounce" />
                          </div>
                        </div>
                        
                        {/* Quick log buttons */}
                        <div className="grid grid-cols-4 gap-2 mb-6">
                          <div className="bg-white/20 backdrop-blur rounded-lg p-2 text-center text-xs">
                            <div className="font-bold">250ml</div>
                            <div className="opacity-80">Glass</div>
                          </div>
                          <div className="bg-white/20 backdrop-blur rounded-lg p-2 text-center text-xs">
                            <div className="font-bold">500ml</div>
                            <div className="opacity-80">Bottle</div>
                          </div>
                          <div className="bg-white/40 backdrop-blur rounded-lg p-2 text-center text-xs font-bold border border-white/50">
                            <div className="font-bold">750ml</div>
                            <div className="opacity-90">Large</div>
                          </div>
                          <div className="bg-white/20 backdrop-blur rounded-lg p-2 text-center text-xs">
                            <div className="font-bold">1L</div>
                            <div className="opacity-80">Liter</div>
                          </div>
                        </div>
                        
                        {/* Main action button */}
                        <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
                          Log Water Intake
                        </button>
                        
                        {/* Progress stats */}
                        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div className="text-lg font-bold">7</div>
                            <div className="text-xs opacity-80">Day Streak</div>
                          </div>
                          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div className="text-lg font-bold">6</div>
                            <div className="text-xs opacity-80">Logs Today</div>
                          </div>
                          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                            <div className="text-lg font-bold">12</div>
                            <div className="text-xs opacity-80">Achievements</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Home indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-10 right-10 w-16 h-16 bg-green-400/20 rounded-full animate-pulse-slow"></div>
              <div className="absolute bottom-20 left-10 w-12 h-12 bg-blue-400/20 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 right-0 w-8 h-8 bg-blue-300/30 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-red-500">The Problem:</span> Most People Are Chronically Dehydrated
            </h2>
            <p className="text-xl text-[hsl(var(--text-light))] max-w-3xl mx-auto">
              75% of adults don't drink enough water daily. This leads to fatigue, poor concentration, 
              and decreased physical performance. Traditional reminder apps are too generic and easily ignored.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[hsl(var(--deep-teal))]">
                <span className="text-[hsl(var(--accent-green))]">The Solution:</span> Smart, Personalized Hydration
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[hsl(var(--accent-green))] rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="text-white w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Personalized Goals</h4>
                    <p className="text-[hsl(var(--text-light))]">Calculate your exact hydration needs based on weight, activity, and climate</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[hsl(var(--accent-green))] rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="text-white w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Smart Reminders</h4>
                    <p className="text-[hsl(var(--text-light))]">AI-powered notifications that adapt to your routine and habits</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[hsl(var(--accent-green))] rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="text-white w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Visual Progress</h4>
                    <p className="text-[hsl(var(--text-light))]">Beautiful animations that make tracking hydration engaging and rewarding</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              {/* Statistics card */}
              <Card className="water-gradient p-8 text-white">
                <h4 className="text-2xl font-bold mb-6">Results After 30 Days</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Hydration Goal Achievement</span>
                    <span className="font-bold">94%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{width: '94%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Energy Level Improvement</span>
                    <span className="font-bold">87%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{width: '87%'}}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>User Satisfaction</span>
                    <span className="font-bold">96%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{width: '96%'}}></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-16 bg-[hsl(var(--soft-gray))]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Everything You Need to Stay Hydrated</h2>
            <p className="text-xl text-[hsl(var(--text-light))] max-w-2xl mx-auto">
              Powerful features designed to make hydration effortless and enjoyable
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[hsl(var(--primary-blue))]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="text-[hsl(var(--primary-blue))] w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Goal Setting</h3>
                <p className="text-[hsl(var(--text-light))]">Personalized hydration goals based on your weight, activity level, and lifestyle</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[hsl(var(--accent-green))]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="text-[hsl(var(--accent-green))] w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Easy Logging</h3>
                <p className="text-[hsl(var(--text-light))]">Quick tap logging with preset sizes and custom beverage tracking</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[hsl(var(--deep-teal))]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-[hsl(var(--deep-teal))] w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
                <p className="text-[hsl(var(--text-light))]">Beautiful visualizations that show your daily and weekly hydration patterns</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[hsl(var(--vibrant-orange))]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="text-[hsl(var(--vibrant-orange))] w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Reminders</h3>
                <p className="text-[hsl(var(--text-light))]">Customizable notifications that fit your schedule and preferences</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="premium" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Unlock Premium Features for 
              <span className="water-gradient bg-clip-text text-transparent"> Next-Level Hydration</span>
            </h2>
            <p className="text-xl text-[hsl(var(--text-light))] max-w-2xl mx-auto">
              Advanced personalization and insights to optimize your hydration journey
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 water-gradient rounded-xl flex items-center justify-center">
                  <Cloud className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Weather-Based Adjustments</h3>
                  <p className="text-[hsl(var(--text-light))]">Automatically adjust your hydration goals based on temperature, humidity, and weather conditions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 water-gradient rounded-xl flex items-center justify-center">
                  <Activity className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Activity Integration</h3>
                  <p className="text-[hsl(var(--text-light))]">Sync with Apple Health and Google Fit to increase goals during workouts and active periods</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 water-gradient rounded-xl flex items-center justify-center">
                  <Brain className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
                  <p className="text-[hsl(var(--text-light))]">Machine learning analyzes your patterns to suggest optimal drinking times and habits</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 water-gradient rounded-xl flex items-center justify-center">
                  <Palette className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Custom Themes & Sounds</h3>
                  <p className="text-[hsl(var(--text-light))]">Personalize your app with exclusive themes, icons, and notification sounds</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Premium app mockup */}
              <Card className="water-gradient shadow-2xl p-8 text-white">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold">Premium Dashboard</h4>
                  <p className="text-sm opacity-80">Advanced analytics & insights</p>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Weekly Average</span>
                    <span className="font-bold">2.1L</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-white rounded-full h-2" style={{width: '85%'}}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold">7</div>
                    <div className="text-xs opacity-80">Day Streak</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold">94%</div>
                    <div className="text-xs opacity-80">Goal Rate</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs opacity-80 mb-1">Next reminder in</div>
                  <div className="text-lg font-bold">23 minutes</div>
                </div>
              </Card>
              
              {/* Floating premium badge */}
              <div className="absolute -top-4 -right-4 bg-[hsl(var(--vibrant-orange))] text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                PREMIUM
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-[hsl(var(--soft-gray))]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-xl text-[hsl(var(--text-light))]">Join thousands of happy, well-hydrated users</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-[hsl(var(--text-light))] mb-4">"This app completely changed my hydration habits. The smart reminders actually work, and I love seeing my progress every day!"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    SM
                  </div>
                  <div>
                    <div className="font-semibold">Sarah M.</div>
                    <div className="text-sm text-[hsl(var(--text-light))]">Marketing Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-[hsl(var(--text-light))] mb-4">"The premium features are worth every penny. The weather adjustments and activity tracking make it so much smarter than other apps."</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    MR
                  </div>
                  <div>
                    <div className="font-semibold">Mike R.</div>
                    <div className="text-sm text-[hsl(var(--text-light))]">Fitness Coach</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-[hsl(var(--text-light))] mb-4">"Beautiful design and actually useful reminders. I've been using it for 6 months and my energy levels are noticeably better."</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    EL
                  </div>
                  <div>
                    <div className="font-semibold">Emma L.</div>
                    <div className="text-sm text-[hsl(var(--text-light))]">Software Developer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Hydration Journey</h2>
            <p className="text-xl text-[hsl(var(--text-light))]">Start free, upgrade when you're ready for more</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="bg-[hsl(var(--soft-gray))] text-center">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Free</h3>
                <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-[hsl(var(--text-light))]">/month</span></div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-[hsl(var(--accent-green))] w-4 h-4" />
                    <span>Basic hydration tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-[hsl(var(--accent-green))] w-4 h-4" />
                    <span>Simple reminders</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-[hsl(var(--accent-green))] w-4 h-4" />
                    <span>Basic progress visualization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-[hsl(var(--accent-green))] w-4 h-4" />
                    <span>Achievement badges</span>
                  </li>
                </ul>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
            
            {/* Premium Plan */}
            <Card className="water-gradient text-center text-white relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[hsl(var(--vibrant-orange))] text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Premium</h3>
                <div className="text-4xl font-bold mb-6">$4.99<span className="text-lg opacity-80">/month</span></div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-white w-4 h-4" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-white w-4 h-4" />
                    <span>Weather-based adjustments</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-white w-4 h-4" />
                    <span>Activity integration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-white w-4 h-4" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-white w-4 h-4" />
                    <span>Custom themes & sounds</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-white w-4 h-4" />
                    <span>Quick log from notifications</span>
                  </li>
                </ul>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-white text-[hsl(var(--primary-blue))] hover:bg-gray-100 transition-colors"
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
            
            {/* Annual Plan */}
            <Card className="border-2 border-[hsl(var(--accent-green))] text-center">
              <CardContent className="p-8">
                <div className="text-[hsl(var(--accent-green))] text-sm font-bold mb-2">SAVE 40%</div>
                <h3 className="text-2xl font-bold mb-4">Premium Annual</h3>
                <div className="text-4xl font-bold mb-2">$29.99<span className="text-lg text-[hsl(var(--text-light))]">/year</span></div>
                <div className="text-sm text-[hsl(var(--text-light))] mb-6">Just $2.50/month</div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-[hsl(var(--accent-green))] w-4 h-4" />
                    <span>Everything in Premium</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-[hsl(var(--accent-green))] w-4 h-4" />
                    <span>40% cost savings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-[hsl(var(--accent-green))] w-4 h-4" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-[hsl(var(--accent-green))] w-4 h-4" />
                    <span>Early access to new features</span>
                  </li>
                </ul>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-[hsl(var(--accent-green))] text-white hover:bg-green-500 transition-colors"
                >
                  Get Annual Plan
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-[hsl(var(--text-light))]">All plans include a 7-day free trial • Cancel anytime • No hidden fees</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 water-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Hydration?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who've made hydration effortless. Download HydroFlow today and start your journey to better health.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button 
              onClick={handleLogin}
              className="bg-white text-[hsl(var(--primary-blue))] px-8 py-4 text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              <Apple className="w-5 h-5 mr-2" />
              Download on App Store
            </Button>
            <Button 
              onClick={handleLogin}
              className="bg-white text-[hsl(var(--accent-green))] px-8 py-4 text-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Get it on Google Play
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 water-gradient rounded-full flex items-center justify-center">
                  <Droplets className="text-white w-4 h-4" />
                </div>
                <span className="text-xl font-bold">HydroFlow</span>
              </div>
              <p className="text-gray-400">Making hydration effortless for healthier lives.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#premium" className="hover:text-white transition-colors">Premium</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Trophy className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Star className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Droplets className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HydroFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
