import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SEOHead } from "@/components/seo-head";
import { Droplets, Calculator, TrendingUp, Bell, Trophy, Palette, Cloud, Activity, Brain, Star, CheckCircle, Apple, Play, Crown } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <>
      <SEOHead 
        title="QuenchNow - Smart Water Reminder & Hydration Tracking App"
        description="Transform your daily hydration with intelligent reminders, personalized goals, and beautiful progress tracking. Join thousands who've made hydration effortless with weather-based recommendations."
        keywords="water reminder app, hydration tracker, water intake monitoring, daily water goal, health tracking app, wellness application, hydration habits, smart water reminders, water tracking app, health monitoring"
        canonicalUrl="https://quenchnow.com"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Droplets className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-blue-600">QuenchNow</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-[hsl(var(--text-light))] hover:text-[hsl(var(--primary-blue))] transition-colors">Features</a>
              <a href="#premium" className="text-[hsl(var(--text-light))] hover:text-[hsl(var(--primary-blue))] transition-colors">Premium</a>
              <a href="#pricing" className="text-[hsl(var(--text-light))] hover:text-[hsl(var(--primary-blue))] transition-colors">Pricing</a>
              <a href="#testimonials" className="text-[hsl(var(--text-light))] hover:text-[hsl(var(--primary-blue))] transition-colors">Reviews</a>
            </div>
            <Button 
              onClick={handleLogin}
              className="bg-orange-500 text-white hover:bg-orange-600 transition-colors font-semibold"
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
                Transform your daily hydration with intelligent water reminders, personalized daily goals, and beautiful progress tracking. Join thousands who've made healthy hydration habits effortless with our smart water intake app.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <Button
                  onClick={handleLogin}
                  className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center"
                >
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Download on App Store
                </Button>
                <Button
                  onClick={handleLogin}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center"
                >
                  <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
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
                    
                    {/* App interface matching actual QuenchNow design */}
                    <div className="bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white h-full p-4 text-gray-800">
                      {/* Navigation bar */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <Droplets className="text-white w-3 h-3" />
                          </div>
                          <span className="text-lg font-bold text-blue-600">QuenchNow</span>
                        </div>
                        <Bell className="w-5 h-5 text-gray-500" />
                      </div>

                      {/* Welcome header */}
                      <div className="text-center mb-4">
                        <h2 className="text-lg font-bold mb-1">Welcome back!</h2>
                        <p className="text-sm text-gray-600">500ml left to reach your goal</p>
                      </div>

                      {/* Stats cards */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                            <Droplets className="text-blue-600 w-3 h-3" />
                          </div>
                          <div className="text-lg font-bold text-blue-600">1500ml</div>
                          <div className="text-xs text-gray-500">Today</div>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center shadow-sm">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                            <TrendingUp className="text-green-600 w-3 h-3" />
                          </div>
                          <div className="text-lg font-bold text-green-600">75%</div>
                          <div className="text-xs text-gray-500">Progress</div>
                        </div>
                      </div>

                      {/* Water bottle visualization */}
                      <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                        <div className="flex items-center justify-center">
                          <div className="relative w-16 h-32">
                            <div className="absolute inset-0 bg-gray-100 rounded-full border-2 border-gray-200"></div>
                            <div 
                              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 to-blue-300 rounded-b-full border-2 border-blue-300" 
                              style={{height: '75%'}}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-bold text-gray-700">75%</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-2">
                          <div className="text-sm font-semibold">Daily Progress</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                          </div>
                        </div>
                      </div>

                      {/* Quick log buttons */}
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="text-sm font-semibold mb-2 text-center">Quick Log</div>
                        <div className="grid grid-cols-4 gap-1">
                          <button className="bg-blue-50 rounded-lg p-2 text-center border border-blue-200">
                            <div className="text-xs font-bold text-blue-600">250ml</div>
                          </button>
                          <button className="bg-blue-500 rounded-lg p-2 text-center text-white">
                            <div className="text-xs font-bold">500ml</div>
                          </button>
                          <button className="bg-blue-50 rounded-lg p-2 text-center border border-blue-200">
                            <div className="text-xs font-bold text-blue-600">750ml</div>
                          </button>
                          <button className="bg-blue-50 rounded-lg p-2 text-center border border-blue-200">
                            <div className="text-xs font-bold text-blue-600">1L</div>
                          </button>
                        </div>
                      </div>
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
              <div className="bg-slate-800 rounded-2xl p-8 text-white shadow-2xl border border-slate-700">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <Droplets className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2 text-white">Smart Hydration Results</h4>
                  <p className="text-slate-300">Proven success in 30 days</p>
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
              Unlock Premium Features for <span className="text-blue-600">Next-Level Hydration</span>
            </h2>
            <p className="text-xl text-[hsl(var(--text-light))] max-w-2xl mx-auto">
              Advanced insights to optimize your hydration journey
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
              

            </div>
            
            <div className="relative">
              {/* Premium Features Showcase */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Premium Dashboard</h4>
                  <p className="text-gray-600">Advanced analytics & personalization</p>
                </div>
                
                {/* Weather Integration */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Cloud className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Weather Sync</h5>
                        <p className="text-sm text-gray-600">32°C, Sunny</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">+500ml</div>
                      <div className="text-xs text-gray-500">Heat adjustment</div>
                    </div>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-500 rounded-full h-2" style={{width: '75%'}}></div>
                  </div>
                </div>
                
                {/* Activity Tracking */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">Workout Detected</h5>
                        <p className="text-sm text-gray-600">45 min running</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">+750ml</div>
                      <div className="text-xs text-gray-500">Recovery boost</div>
                    </div>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div className="bg-green-500 rounded-full h-2" style={{width: '90%'}}></div>
                  </div>
                </div>
                
                {/* AI Insights */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">AI Recommendation</h5>
                      <p className="text-sm text-gray-600">Optimal hydration pattern detected</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-100">
                    <p className="text-sm text-gray-700">"Drink 250ml every 45 minutes between 9 AM - 6 PM for best results"</p>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">15</div>
                    <div className="text-xs text-gray-500">Day Streak</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">96%</div>
                    <div className="text-xs text-gray-500">Success Rate</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">2.3L</div>
                    <div className="text-xs text-gray-500">Avg Daily</div>
                  </div>
                </div>
              </div>
              
              {/* Premium badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                PREMIUM
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-400 bg-opacity-20 rounded-full animate-pulse"></div>
              <div className="absolute top-1/4 -right-2 w-8 h-8 bg-green-400 bg-opacity-20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
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
            
            {/* Premium Monthly Plan */}
            <Card className="bg-blue-600 text-center text-white relative transform scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                MOST POPULAR
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">Premium Monthly</h3>
                <div className="mb-6">
                  <div className="text-lg text-white opacity-75 line-through">$9.99/month</div>
                  <div className="text-4xl font-bold text-white">$7.99<span className="text-lg opacity-90">/month</span></div>
                  <div className="text-sm text-orange-200 font-semibold">20% OFF</div>
                </div>
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
                  className="w-full bg-orange-500 text-white hover:bg-orange-600 transition-colors font-semibold"
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
            
            {/* Annual Plan */}
            <Card className="border-2 border-[hsl(var(--accent-green))] text-center">
              <CardContent className="p-8">
                <div className="text-[hsl(var(--accent-green))] text-sm font-bold mb-2">SAVE 30%</div>
                <h3 className="text-2xl font-bold mb-4">Premium Annual</h3>
                <div className="mb-6">
                  <div className="text-lg text-gray-500 line-through">$95.99/year</div>
                  <div className="text-4xl font-bold">$86.39<span className="text-lg text-[hsl(var(--text-light))]">/year</span></div>
                  <div className="text-sm text-[hsl(var(--text-light))]">Just $7.20/month</div>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-[hsl(var(--accent-green))] w-4 h-4" />
                    <span>Everything in Premium</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-[hsl(var(--accent-green))] w-4 h-4" />
                    <span>30% cost savings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="text-[hsl(var(--accent-green))] w-4 h-4" />
                    <span>Early access to new features</span>
                  </li>
                </ul>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-green-600 text-white hover:bg-green-700 transition-colors font-semibold"
                >
                  Get Annual Plan
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Feature Comparison Chart */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Feature Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold">Features</th>
                      <th className="text-center py-3 px-4 font-semibold">Free</th>
                      <th className="text-center py-3 px-4 font-semibold text-blue-600">Monthly</th>
                      <th className="text-center py-3 px-4 font-semibold text-green-600">Annual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4">Daily hydration tracking</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="bg-gray-25">
                      <td className="py-3 px-4">Basic reminders</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Weather-based adjustments</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="bg-gray-25">
                      <td className="py-3 px-4">Activity integration</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Advanced analytics</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>
                    <tr className="bg-gray-25">
                      <td className="py-3 px-4">Early access to features</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><CheckCircle className="w-5 h-5 text-green-500 mx-auto" /></td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-[hsl(var(--text-light))]">All plans include a 7-day free trial • Cancel anytime • No hidden fees</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Hydration?</h2>
          <p className="text-xl mb-8 text-white opacity-95 max-w-2xl mx-auto">
            Join thousands of users who've made hydration effortless. Download HydroFlow today and start your journey to better health.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button 
              onClick={handleLogin}
              className="bg-black text-white px-8 py-4 text-lg hover:bg-gray-800 transition-all transform hover:scale-105 flex items-center"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download on App Store
            </Button>
            <Button 
              onClick={handleLogin}
              className="bg-green-600 text-white px-8 py-4 text-lg hover:bg-green-700 transition-all transform hover:scale-105 flex items-center"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
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
                <span className="text-xl font-bold">QuenchNow</span>
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
            <p>&copy; 2024 QuenchNow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
