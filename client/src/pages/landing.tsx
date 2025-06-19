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
            <div className="lg:w-1/2 relative flex justify-center">
              <div className="relative animate-float">
                {/* Phone mockup with solid background and borders */}
                <div className="w-80 h-[600px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl mx-auto">
                  {/* Screen */}
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                    {/* Status bar */}
                    <div className="bg-gray-900 h-8 flex items-center justify-between px-6 text-white text-sm">
                      <span>9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-2 bg-white rounded opacity-80"></div>
                        <div className="w-4 h-2 bg-white rounded opacity-60"></div>
                        <div className="w-4 h-2 bg-white rounded opacity-40"></div>
                      </div>
                    </div>
                    
                    {/* App interface */}
                    <div className="bg-gradient-to-br from-blue-500 to-green-500 h-full p-6 text-white">
                      {/* App header */}
                      <div className="text-center mb-6">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <Droplets className="w-7 h-7" />
                          <span className="text-2xl font-bold">HydroFlow</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-1">Today's Progress</h3>
                        <p className="text-base opacity-90">1,500ml of 2,000ml</p>
                      </div>
                      
                      {/* Large water bottle */}
                      <div className="relative mx-auto w-28 h-56 mb-6">
                        <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full border-4 border-white border-opacity-30"></div>
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-40 rounded-b-full border-4 border-white border-opacity-50" 
                          style={{height: '75%'}}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">75%</span>
                        </div>
                      </div>
                      
                      {/* Quick buttons */}
                      <div className="grid grid-cols-4 gap-2 mb-6">
                        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                          <div className="font-bold text-sm">250ml</div>
                          <div className="text-xs opacity-80">Glass</div>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                          <div className="font-bold text-sm">500ml</div>
                          <div className="text-xs opacity-80">Bottle</div>
                        </div>
                        <div className="bg-white bg-opacity-40 rounded-lg p-3 text-center border-2 border-white border-opacity-50">
                          <div className="font-bold text-sm">750ml</div>
                          <div className="text-xs">Large</div>
                        </div>
                        <div className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                          <div className="font-bold text-sm">1L</div>
                          <div className="text-xs opacity-80">Liter</div>
                        </div>
                      </div>
                      
                      {/* Action button */}
                      <button className="w-full bg-white text-blue-600 font-semibold py-4 rounded-xl shadow-lg text-lg">
                        Log Water Intake
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-16 right-16 w-16 h-16 bg-green-400 bg-opacity-20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-24 left-16 w-12 h-12 bg-blue-400 bg-opacity-20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 right-4 w-8 h-8 bg-blue-300 bg-opacity-30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
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
            
            {/* Problem visualization */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Dehydration statistics */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-red-600 mb-2">75%</h3>
                    <p className="text-gray-700 font-semibold">Of adults are chronically dehydrated</p>
                  </div>
                  
                  {/* Effects illustration */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold text-orange-600 mb-2">-23%</h3>
                    <p className="text-gray-700 font-semibold">Decrease in cognitive performance</p>
                  </div>
                  
                  {/* Solution preview */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <Droplets className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-green-600 mb-2">94%</h3>
                    <p className="text-gray-700 font-semibold">Success rate with smart reminders</p>
                  </div>
                </div>
                
                {/* Visual water level indicator */}
                <div className="mt-8 flex justify-center">
                  <div className="relative w-64 h-12 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-400 to-orange-400 rounded-full" style={{width: '25%'}}></div>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-700">
                      Average Daily Hydration: 25% of Goal
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              {/* Enhanced solution visualization */}
              <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl p-8 text-white shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Droplets className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Smart Hydration Results</h4>
                  <p className="text-blue-100">Proven success in 30 days</p>
                </div>
                
                {/* Progress circles */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray="94, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">94%</span>
                      </div>
                    </div>
                    <p className="text-sm text-blue-100">Goal Achievement</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray="87, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">87%</span>
                      </div>
                    </div>
                    <p className="text-sm text-blue-100">Energy Boost</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeDasharray="96, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">96%</span>
                      </div>
                    </div>
                    <p className="text-sm text-blue-100">Satisfaction</p>
                  </div>
                </div>
                
                {/* Key benefits */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-blue-100">Personalized hydration goals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-blue-100">Smart reminder system</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-blue-100">Progress tracking & rewards</span>
                  </div>
                </div>
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 bg-opacity-30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 bg-opacity-30 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
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

      {/* User Success Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Hydration Champions</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">Real results from real users who transformed their health</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Droplets className="w-12 h-12 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">2.5M+</div>
              <div className="text-blue-100">Glasses Logged</div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-4xl font-bold mb-2">87%</div>
              <div className="text-blue-100">Energy Increase</div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-4xl font-bold mb-2">96%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
          </div>
          
          {/* Visual progress representation */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur">
              <h3 className="text-2xl font-bold text-center mb-8">Transform Your Health in 30 Days</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full"></div>
                    <div className="absolute inset-2 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">Day 1</span>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">Start Journey</h4>
                  <p className="text-blue-100 text-sm">Set personalized goals and begin tracking</p>
                </div>
                
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 bg-white bg-opacity-30 rounded-full"></div>
                    <div className="absolute inset-2 bg-white bg-opacity-40 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">Day 15</span>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">Build Habits</h4>
                  <p className="text-blue-100 text-sm">Smart reminders become second nature</p>
                </div>
                
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 bg-white bg-opacity-40 rounded-full"></div>
                    <div className="absolute inset-2 bg-white bg-opacity-50 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold">Day 30</span>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">See Results</h4>
                  <p className="text-blue-100 text-sm">Experience increased energy and focus</p>
                </div>
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
