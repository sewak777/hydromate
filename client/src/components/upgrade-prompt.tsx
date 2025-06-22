import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Sparkles, ArrowRight } from "lucide-react";

interface UpgradePromptProps {
  feature: string;
  description: string;
  onUpgrade?: () => void;
}

export default function UpgradePrompt({ feature, description, onUpgrade }: UpgradePromptProps) {
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      window.location.href = '/subscription';
    }
  };

  return (
    <Card className="border-2 border-dashed border-blue-300 bg-gradient-to-r from-blue-50 to-purple-50">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
          <Crown className="w-6 h-6 text-blue-600" />
        </div>
        <CardTitle className="flex items-center justify-center space-x-2">
          <Sparkles className="w-5 h-5 text-yellow-500" />
          <span>Premium Feature</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{feature}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        
        <Button onClick={handleUpgrade} className="w-full" size="lg">
          Upgrade to Premium
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        
        <p className="text-xs text-gray-500">
          Starting at $9.99/month • Cancel anytime
        </p>
      </CardContent>
    </Card>
  );
}