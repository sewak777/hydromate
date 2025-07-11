import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { usePremium } from "@/hooks/usePremium";
import { createCheckoutSession, createCustomerPortalSession, formatPrice, type SubscriptionPlan } from "@/services/stripe";
import { Check, Crown, CreditCard, Settings, Loader2 } from "lucide-react";

const plans: SubscriptionPlan[] = [
  {
    id: 'price_1Rcc2DGdYl8QlNFU1yVhmZqE',
    name: 'Premium Monthly',
    description: 'All premium features with monthly billing',
    price: 999, // $9.99 in cents
    interval: 'month',
    features: [
      'Weather-based hydration adjustments',
      'Advanced analytics and insights',
      'Custom reminder sounds',
      'Priority customer support',
      'Smart notification scheduling'
    ]
  },
  {
    id: 'price_1Rcc2DGdYl8QlNFUgNzH7sKr',
    name: 'Premium Annual',
    description: 'All premium features with annual billing',
    price: 9599, // $95.99 in cents (20% discount)
    interval: 'year',
    features: [
      'Weather-based hydration adjustments',
      'Advanced analytics and insights',
      'Custom reminder sounds',
      'Priority customer support',
      'Smart notification scheduling',
      '20% annual discount'
    ]
  }
];

export default function SubscriptionPlans() {
  const [loading, setLoading] = useState<string | null>(null);
  const { isPremium, subscription } = usePremium();
  const { toast } = useToast();

  const handleSubscribe = async (priceId: string) => {
    try {
      setLoading(priceId);
      const { url } = await createCheckoutSession(priceId);
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setLoading('portal');
      const { url } = await createCustomerPortalSession();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating portal session:', error);
      toast({
        title: "Error",
        description: "Failed to open subscription management. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const isCurrentPlan = (planId: string) => {
    return isPremium && subscription?.stripePriceId === planId;
  };

  const getButtonText = (plan: SubscriptionPlan) => {
    if (loading === plan.id) return "Processing...";
    if (isCurrentPlan(plan.id)) return "Current Plan";
    if (isPremium) return "Switch Plan";
    return "Subscribe";
  };

  const getButtonVariant = (plan: SubscriptionPlan) => {
    if (isCurrentPlan(plan.id)) return "outline";
    if (plan.interval === 'year') return "default";
    return "outline";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-gray-600 text-lg">
          Unlock premium features for advanced hydration tracking
        </p>
      </div>

      {/* Current Subscription Status */}
      {isPremium && (
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Premium Active</h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {subscription?.planType} Plan - {subscription?.status}
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleManageSubscription}
                disabled={loading === 'portal'}
                variant="outline"
              >
                {loading === 'portal' ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Settings className="w-4 h-4 mr-2" />
                )}
                Manage Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative group cursor-pointer transition-all duration-300 ${
              isCurrentPlan(plan.id) ? 'opacity-75' : ''
            } ${plan.interval === 'year' ? 'animate-float' : ''}`}
          >
            {/* Glowing border effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${
              plan.interval === 'year' 
                ? 'from-blue-600 via-purple-600 to-cyan-600 animate-glow-pulse' 
                : 'from-gray-600 via-gray-400 to-gray-600'
            } rounded-lg blur-sm ${
              plan.interval === 'year' ? 'opacity-50' : 'opacity-20'
            } group-hover:opacity-100 group-hover:blur-md transition-all duration-500 group-hover:duration-200 ${
              plan.interval === 'year' ? '' : 'animate-pulse'
            }`}></div>
            
            {/* Secondary glow layer */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${
              plan.interval === 'year' 
                ? 'from-blue-500 via-purple-500 to-cyan-500' 
                : 'from-gray-500 via-gray-300 to-gray-500'
            } rounded-lg blur ${
              plan.interval === 'year' ? 'opacity-30' : 'opacity-0'
            } group-hover:opacity-80 transition duration-300`}></div>
            
            {/* Card content */}
            <Card className={`relative bg-white dark:bg-gray-950 border-2 transition-all duration-300 ${
              plan.interval === 'year' 
                ? 'border-blue-300 dark:border-blue-700 group-hover:border-blue-500 dark:group-hover:border-blue-400 shadow-lg shadow-blue-500/20' 
                : 'border-gray-300 dark:border-gray-700 group-hover:border-gray-500 dark:group-hover:border-gray-400 shadow-lg shadow-gray-500/10'
            } group-hover:shadow-2xl ${
              plan.interval === 'year' 
                ? 'group-hover:shadow-blue-500/40' 
                : 'group-hover:shadow-gray-500/30'
            } group-hover:scale-105 transform-gpu`}>
              
              {/* Popular badge */}
              {plan.interval === 'year' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {/* Subtle glow inside card */}
              <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${
                plan.interval === 'year' 
                  ? 'from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30' 
                  : 'from-gray-50/50 via-transparent to-gray-50/50 dark:from-gray-900/30 dark:to-gray-900/30'
              } ${
                plan.interval === 'year' ? 'opacity-40' : 'opacity-0'
              } group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Animated background pattern for premium */}
              {plan.interval === 'year' && (
                <div className="absolute inset-0 rounded-lg opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-l from-purple-500 via-blue-500 to-cyan-500 animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              )}
              
              <CardHeader className="text-center relative z-10">
                <CardTitle className="flex items-center justify-center space-x-2 text-xl">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    {plan.name}
                  </span>
                  {isCurrentPlan(plan.id) && (
                    <Badge variant="secondary">Current</Badge>
                  )}
                </CardTitle>
                <div className="mt-6">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${
                    plan.interval === 'year' 
                      ? 'from-blue-600 to-purple-600' 
                      : 'from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100'
                  } bg-clip-text text-transparent`}>
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-lg">/{plan.interval}</span>
                  {plan.interval === 'year' && (
                    <div className="text-sm text-green-600 font-medium mt-2 px-3 py-1 bg-green-50 dark:bg-green-950 rounded-full inline-block">
                      Save 20% annually
                    </div>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-3 text-base">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3 group/item">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.interval === 'year' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-r from-gray-500 to-gray-700'
                      } transition-transform duration-200 group-hover/item:scale-110`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-gray-100 transition-colors duration-200">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading === plan.id || isCurrentPlan(plan.id)}
                  className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                    plan.interval === 'year'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/50'
                      : isCurrentPlan(plan.id)
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white shadow-lg hover:shadow-xl hover:shadow-gray-500/50'
                  } ${!isCurrentPlan(plan.id) ? 'group-hover:scale-105' : ''}`}
                >
                  {loading === plan.id ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <CreditCard className="w-5 h-5 mr-2" />
                  )}
                  {getButtonText(plan)}
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Free Plan */}
      <div className="mt-8 max-w-md mx-auto">
        <div className="relative group cursor-pointer transition-all duration-300">
          {/* Subtle glow for free plan */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-lg blur opacity-25 group-hover:opacity-90 transition duration-500 group-hover:duration-200 animate-pulse"></div>
          
          <Card className="relative bg-white dark:bg-gray-950 border-2 border-green-200 dark:border-green-800 group-hover:border-green-400 dark:group-hover:border-green-600 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-green-500/20 group-hover:scale-105">
            
            {/* Subtle glow inside card */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/50 dark:from-green-950/30 dark:to-emerald-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <CardHeader className="text-center relative z-10">
              <CardTitle className="text-xl">
                <span className="bg-gradient-to-r from-green-700 to-emerald-600 dark:from-green-300 dark:to-emerald-300 bg-clip-text text-transparent">
                  Free Plan
                </span>
              </CardTitle>
              <div className="mt-6">
                <span className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  $0
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-lg">/month</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-3 text-base">Basic hydration tracking</p>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3 group/item">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 transition-transform duration-200 group-hover/item:scale-110">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-gray-100 transition-colors duration-200">
                    Basic water intake logging
                  </span>
                </li>
                <li className="flex items-center space-x-3 group/item">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 transition-transform duration-200 group-hover/item:scale-110">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-gray-100 transition-colors duration-200">
                    Simple daily goal tracking
                  </span>
                </li>
                <li className="flex items-center space-x-3 group/item">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 transition-transform duration-200 group-hover/item:scale-110">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-gray-100 transition-colors duration-200">
                    Basic reminders
                  </span>
                </li>
              </ul>
              
              {!isPremium ? (
                <div className="text-center">
                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
                    Current Plan
                  </Badge>
                </div>
              ) : (
                <div className="text-center">
                  <Button
                    disabled
                    className="w-full h-12 text-base font-semibold bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  >
                    Downgrade Available
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}