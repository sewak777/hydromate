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
    id: 'free',
    name: 'Basic',
    description: 'Basic hydration tracking with essential features',
    price: 299, // $2.99 in cents (after 15% discount)
    interval: 'month',
    features: [
      'Basic hydration tracking',
      'Daily water intake goals',
      'Simple reminders',
      'Progress tracking',
      'Basic analytics'
    ]
  },
  {
    id: 'price_1Rcc2DGdYl8QlNFU1yVhmZqE',
    name: 'Premium Monthly',
    description: 'All premium features with monthly billing',
    price: 799, // $7.99 in cents (discounted from $9.99)
    interval: 'month',
    features: [
      'Weather-based hydration adjustments',
      'Advanced analytics and insights',
      'Custom reminder sounds',
      'Priority customer support',
      'Smart notification scheduling'
    ]
  },

];

export default function SubscriptionPlans() {
  const [loading, setLoading] = useState<string | null>(null);
  const { isPremium, subscription } = usePremium();
  const { toast } = useToast();

  const handleSubscribe = async (priceId: string) => {
    if (priceId === 'free') {
      toast({
        title: "Free Plan",
        description: "You're already using the free plan! Upgrade to Premium for advanced features.",
      });
      return;
    }
    
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
    if (plan.id === 'free') return "Get Started";
    if (isPremium) return "Switch Plan";
    return "Subscribe";
  };

  const getButtonVariant = (plan: SubscriptionPlan) => {
    if (isCurrentPlan(plan.id)) return "outline";
    if (plan.id === 'price_1Rcc2DGdYl8QlNFU1yVhmZqE') return "default";
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
          <Card 
            key={plan.id} 
            className={`text-center transition-all duration-300 hover:shadow-lg ${
              plan.id === 'price_1Rcc2DGdYl8QlNFU1yVhmZqE' 
                ? 'border-2 border-blue-500 shadow-lg relative' 
                : 'border-2 border-gray-200 shadow-sm'
            } ${
              isCurrentPlan(plan.id) ? 'opacity-75' : ''
            }`}
          >
            {/* Popular badge for Premium Monthly */}
            {plan.id === 'price_1Rcc2DGdYl8QlNFU1yVhmZqE' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            
            {/* Discount badge for Basic plan */}
            {plan.id === 'free' && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  15% OFF
                </span>
              </div>
            )}
            
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                  {isCurrentPlan(plan.id) && (
                    <Badge variant="secondary" className="ml-2">Current</Badge>
                  )}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {plan.id === 'free' && (
                    <span className="text-lg text-gray-500 line-through">$3.49</span>
                  )}
                  {plan.id === 'price_1Rcc2DGdYl8QlNFU1yVhmZqE' && (
                    <span className="text-lg text-gray-500 line-through">$9.99</span>
                  )}
                  {plan.id === 'price_1Rcc2DGdYl8QlNFUgNzH7sKr' && (
                    <span className="text-lg text-gray-500 line-through">$95.99</span>
                  )}
                  <div className="text-4xl font-bold text-gray-900">
                    {formatPrice(plan.price)}
                  </div>
                </div>
                <div className="text-gray-600">per {plan.interval}</div>
                {plan.interval === 'year' && (
                  <div className="text-sm text-green-600 font-semibold mt-2">Save $57.60</div>
                )}
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id || isCurrentPlan(plan.id)}
                className={`w-full py-3 rounded-xl font-semibold ${
                  plan.interval === 'year'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : isCurrentPlan(plan.id)
                    ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                    : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
                variant={plan.interval === 'year' ? 'default' : 'outline'}
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
        ))}
      </div>


    </div>
  );
}