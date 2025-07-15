import { SEOHead } from "@/components/seo-head";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, FileText, Shield, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function TermsOfService() {
  return (
    <>
      <SEOHead 
        title="Terms of Service - HydroMate"
        description="Read HydroMate's terms of service and user agreement for our hydration tracking application."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
        <Navigation />
        
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Terms of Service
                </span>
              </h1>
              <p className="text-[hsl(var(--text-light))] text-lg">
                User agreement and terms for using HydroMate
              </p>
            </div>

            <div className="mb-6">
              <Link href="/auth">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </Button>
              </Link>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Terms of Service</span>
                </CardTitle>
                <p className="text-sm text-[hsl(var(--text-light))]">
                  Last updated: July 15, 2025
                </p>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-6 text-sm">
                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>1. Acceptance of Terms</span>
                      </h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed">
                        By accessing and using HydroMate ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">2. Description of Service</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed mb-3">
                        HydroMate is a hydration tracking application that helps users monitor their daily water intake through smart reminders, personalized goals, and detailed analytics. The service includes:
                      </p>
                      <ul className="list-disc list-inside text-[hsl(var(--text-light))] space-y-1 ml-4">
                        <li>Daily water intake tracking</li>
                        <li>Personalized hydration goals</li>
                        <li>Smart reminder notifications</li>
                        <li>Progress analytics and insights</li>
                        <li>Premium features including weather integration</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>3. User Responsibilities</span>
                      </h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed mb-3">
                        You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for:
                      </p>
                      <ul className="list-disc list-inside text-[hsl(var(--text-light))] space-y-1 ml-4">
                        <li>Maintaining the confidentiality of your account information</li>
                        <li>All activities that occur under your account</li>
                        <li>Providing accurate health and personal information</li>
                        <li>Not using the Service for medical diagnosis or treatment</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">4. Premium Subscription</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed mb-3">
                        Premium features are available through paid subscription plans:
                      </p>
                      <ul className="list-disc list-inside text-[hsl(var(--text-light))] space-y-1 ml-4">
                        <li>Monthly Premium: $7.99/month</li>
                        <li>Annual Premium: $86.39/year (30% discount)</li>
                        <li>Subscriptions automatically renew unless cancelled</li>
                        <li>Cancellation available at any time through account settings</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">5. Privacy and Data Protection</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed">
                        We collect and process your personal information as described in our Privacy Policy. By using the Service, you consent to such processing and you warrant that all data provided by you is accurate.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>6. Medical Disclaimer</span>
                      </h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed">
                        HydroMate is not a medical device and should not be used for medical diagnosis, treatment, or as a substitute for professional medical advice. Always consult with a healthcare provider regarding your hydration needs and health conditions.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">7. Limitation of Liability</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed">
                        HydroMate shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">8. Modifications to Terms</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed">
                        We reserve the right to modify these terms at any time. We will provide notice of significant changes by posting the new terms on our website. Your continued use of the Service after such changes constitutes acceptance of the new terms.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">9. Contact Information</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed">
                        For questions about these Terms of Service, please contact us at support@hydromate.com
                      </p>
                    </section>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}