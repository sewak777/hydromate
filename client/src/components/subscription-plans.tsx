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
      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${
              plan.interval === 'year' ? 'border-blue-500 shadow-lg' : ''
            } ${isCurrentPlan(plan.id) ? 'bg-gray-50' : ''}`}
          >
            {plan.interval === 'year' && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <span>{plan.name}</span>
                {isCurrentPlan(plan.id) && (
                  <Badge variant="secondary">Current</Badge>
                )}
              </CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
                <span className="text-gray-600">/{plan.interval}</span>
                {plan.interval === 'year' && (
                  <div className="text-sm text-green-600 font-medium mt-1">
                    Save 20% annually
                  </div>
                )}
              </div>
              <p className="text-gray-600 mt-2">{plan.description}</p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id || isCurrentPlan(plan.id)}
                variant={getButtonVariant(plan)}
                className="w-full"
              >
                {loading === plan.id ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CreditCard className="w-4 h-4 mr-2" />
                )}
                {getButtonText(plan)}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Free Plan */}
      <Card className="mt-6 border-gray-200">
        <CardHeader className="text-center">
          <CardTitle>Free Plan</CardTitle>
          <div className="mt-4">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-gray-600">/month</span>
          </div>
          <p className="text-gray-600 mt-2">Basic hydration tracking</p>
        </CardHeader>
        
        <CardContent>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-sm">Basic water intake logging</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-sm">Simple daily goal tracking</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-sm">Basic reminders</span>
            </li>
          </ul>
          
          {!isPremium && (
            <div className="text-center">
              <Badge variant="secondary">Current Plan</Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}