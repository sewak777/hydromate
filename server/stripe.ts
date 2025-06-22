import Stripe from 'stripe';
import { storage } from './storage';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

export const subscriptionPlans: SubscriptionPlan[] = [
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
    description: 'All premium features with annual billing (20% off)',
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

export async function createCheckoutSession(
  userId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  const user = await storage.getUser(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email || undefined,
    client_reference_id: userId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
    metadata: {
      userId: userId,
    },
  });

  return session;
}

export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

export async function handleWebhookEvent(
  event: Stripe.Event
): Promise<void> {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
      break;
    
    case 'invoice.payment_succeeded':
      await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
      break;
    
    case 'invoice.payment_failed':
      await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
      break;
    
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
      break;
    
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
      break;
    
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void> {
  const userId = session.client_reference_id || session.metadata?.userId;
  
  if (!userId) {
    console.error('No user ID found in checkout session');
    return;
  }

  if (session.mode === 'subscription' && session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    
    await storage.upsertSubscription({
      userId,
      stripeCustomerId: session.customer as string,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      planType: subscription.items.data[0].price.recurring?.interval || 'month',
    });
    
    console.log(`Subscription created for user ${userId}: ${subscription.id}`);
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
    const userId = subscription.metadata?.userId;
    
    if (userId) {
      await storage.upsertSubscription({
        userId,
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        planType: subscription.items.data[0].price.recurring?.interval || 'month',
      });
      
      console.log(`Payment succeeded for user ${userId}: ${invoice.id}`);
    }
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  console.log(`Payment failed for invoice: ${invoice.id}`);
  // Could implement email notifications or grace period logic here
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
  const userId = subscription.metadata?.userId;
  
  if (userId) {
    await storage.upsertSubscription({
      userId,
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      planType: subscription.items.data[0].price.recurring?.interval || 'month',
    });
    
    console.log(`Subscription updated for user ${userId}: ${subscription.id}`);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
  const userId = subscription.metadata?.userId;
  
  if (userId) {
    await storage.upsertSubscription({
      userId,
      stripeCustomerId: subscription.customer as string,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status: 'canceled',
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      planType: subscription.items.data[0].price.recurring?.interval || 'month',
    });
    
    console.log(`Subscription canceled for user ${userId}: ${subscription.id}`);
  }
}