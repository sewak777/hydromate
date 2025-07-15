import { SEOHead } from "@/components/seo-head";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Shield, Database, Eye, Lock, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead 
        title="Privacy Policy - HydroMate"
        description="Read HydroMate's privacy policy and learn how we protect your personal information and data."
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--soft-gray))] to-white">
        <Navigation />
        
        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Privacy Policy
                </span>
              </h1>
              <p className="text-[hsl(var(--text-light))] text-lg">
                How we collect, use, and protect your personal information
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
                  <Shield className="w-5 h-5" />
                  <span>Privacy Policy</span>
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
                        <Eye className="w-4 h-4" />
                        <span>1. Information We Collect</span>
                      </h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed mb-3">
                        We collect information you provide directly to us and automatically when you use our Service:
                      </p>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Personal Information:</h4>
                          <ul className="list-disc list-inside text-[hsl(var(--text-light))] space-y-1 ml-4">
                            <li>Name and email address (via Replit authentication)</li>
                            <li>Profile information (weight, gender, activity level)</li>
                            <li>Hydration preferences and goals</li>
                            <li>Subscription and payment information</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Usage Data:</h4>
                          <ul className="list-disc list-inside text-[hsl(var(--text-light))] space-y-1 ml-4">
                            <li>Water intake logs and beverage preferences</li>
                            <li>App usage patterns and feature interactions</li>
                            <li>Device information and browser type</li>
                            <li>Location data (if enabled for weather features)</li>
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
                        <Database className="w-4 h-4" />
                        <span>2. How We Use Your Information</span>
                      </h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed mb-3">
                        We use the information we collect to:
                      </p>
                      <ul className="list-disc list-inside text-[hsl(var(--text-light))] space-y-1 ml-4">
                        <li>Provide and maintain the HydroMate service</li>
                        <li>Calculate personalized hydration goals</li>
                        <li>Send reminder notifications (with your consent)</li>
                        <li>Generate analytics and progress reports</li>
                        <li>Process payments and manage subscriptions</li>
                        <li>Provide weather-based hydration recommendations</li>
                        <li>Improve our service and develop new features</li>
                        <li>Communicate with you about updates and support</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">3. Information Sharing</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed mb-3">
                        We do not sell, trade, or otherwise transfer your personal information to third parties except:
                      </p>
                      <ul className="list-disc list-inside text-[hsl(var(--text-light))] space-y-1 ml-4">
                        <li>With your explicit consent</li>
                        <li>To process payments through Stripe (encrypted)</li>
                        <li>To provide weather data through OpenWeather API</li>
                        <li>To comply with legal obligations</li>
                        <li>To protect our rights and prevent fraud</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>4. Data Security</span>
                      </h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed mb-3">
                        We implement appropriate security measures to protect your information:
                      </p>
                      <ul className="list-disc list-inside text-[hsl(var(--text-light))] space-y-1 ml-4">
                        <li>Encryption of data in transit and at rest</li>
                        <li>Secure authentication through Replit OAuth</li>
                        <li>Regular security audits and updates</li>
                        <li>Access controls and user data isolation</li>
                        <li>Secure payment processing through Stripe</li>
                        <li>HTTPS enforcement for all connections</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">5. Data Retention</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed">
                        We retain your personal information only as long as necessary to provide the service and fulfill legal obligations. You may request deletion of your account and data at any time through your account settings.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">6. Your Rights</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed mb-3">
                        You have the right to:
                      </p>
                      <ul className="list-disc list-inside text-[hsl(var(--text-light))] space-y-1 ml-4">
                        <li>Access your personal information</li>
                        <li>Correct inaccurate information</li>
                        <li>Delete your account and data</li>
                        <li>Export your data</li>
                        <li>Opt out of notifications</li>
                        <li>Withdraw consent for location tracking</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3 flex items-center space-x-2">
                        <Cookie className="w-4 h-4" />
                        <span>7. Cookies and Tracking</span>
                      </h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed">
                        We use cookies and similar technologies to maintain your session, remember preferences, and analyze usage patterns. You can control cookie settings through your browser preferences.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">8. Third-Party Services</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed mb-3">
                        We integrate with third-party services that have their own privacy policies:
                      </p>
                      <ul className="list-disc list-inside text-[hsl(var(--text-light))] space-y-1 ml-4">
                        <li>Replit Authentication - for secure login</li>
                        <li>Stripe - for payment processing</li>
                        <li>OpenWeather - for weather data</li>
                        <li>Neon Database - for secure data storage</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">9. Children's Privacy</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed">
                        HydroMate is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">10. Changes to Privacy Policy</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed">
                        We may update this privacy policy periodically. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold text-lg mb-3">11. Contact Us</h3>
                      <p className="text-[hsl(var(--text-light))] leading-relaxed">
                        For questions about this Privacy Policy or our data practices, please contact us at privacy@hydromate.com
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