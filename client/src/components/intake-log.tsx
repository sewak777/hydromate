import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Plus, Coffee, Droplets, Wine, Zap } from "lucide-react";

interface IntakeLogProps {
  onLogIntake: (data: { amount: number; beverageType?: string; hydrationPercentage?: number }) => void;
}

const beverageTypes = [
  { id: "water", name: "Water", icon: Droplets, hydration: 100, color: "hsl(var(--primary-blue))" },
  { id: "tea", name: "Tea", icon: Coffee, hydration: 85, color: "hsl(30, 40%, 50%)" },
  { id: "coffee", name: "Coffee", icon: Coffee, hydration: 75, color: "hsl(20, 30%, 30%)" },
  { id: "juice", name: "Juice", icon: Wine, hydration: 80, color: "hsl(25, 80%, 50%)" },
  { id: "sports_drink", name: "Sports Drink", icon: Zap, hydration: 90, color: "hsl(60, 80%, 50%)" },
  { id: "soda", name: "Soda", icon: Wine, hydration: 60, color: "hsl(0, 60%, 40%)" },
  { id: "milk", name: "Milk", icon: Wine, hydration: 85, color: "hsl(0, 0%, 95%)" },
  { id: "other", name: "Other", icon: Droplets, hydration: 80, color: "hsl(var(--accent-green))" },
];

export default function IntakeLog({ onLogIntake }: IntakeLogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(250);
  const [selectedBeverage, setSelectedBeverage] = useState("water");
  const [customHydration, setCustomHydration] = useState([100]);

  const currentBeverage = beverageTypes.find(b => b.id === selectedBeverage) || beverageTypes[0];
  const hydrationPercentage = selectedBeverage === "other" ? customHydration[0] : currentBeverage.hydration;

  const handleSubmit = () => {
    onLogIntake({
      amount,
      beverageType: selectedBeverage,
      hydrationPercentage,
    });
    setIsOpen(false);
    // Reset to defaults
    setAmount(250);
    setSelectedBeverage("water");
    setCustomHydration([100]);
  };

  const presetAmounts = [100, 150, 200, 250, 300, 350, 400, 500, 750, 1000];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-[hsl(var(--primary-blue))] hover:bg-blue-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Log Custom Amount
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Droplets className="w-5 h-5 text-[hsl(var(--primary-blue))]" />
            <span>Log Water Intake</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Beverage Type Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Beverage Type</Label>
            <div className="grid grid-cols-4 gap-2">
              {beverageTypes.map((beverage) => {
                const Icon = beverage.icon;
                const isSelected = selectedBeverage === beverage.id;
                return (
                  <button
                    key={beverage.id}
                    onClick={() => setSelectedBeverage(beverage.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      isSelected
                        ? "border-[hsl(var(--primary-blue))] bg-[hsl(var(--primary-blue))]/10"
                        : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary-blue))]/50"
                    }`}
                  >
                    <Icon 
                      className="w-5 h-5 mx-auto mb-1" 
                      style={{ color: isSelected ? "hsl(var(--primary-blue))" : beverage.color }}
                    />
                    <div className="text-xs font-medium">{beverage.name}</div>
                    <div className="text-xs text-[hsl(var(--text-light))]">
                      {beverage.id === "other" ? "Custom" : `${beverage.hydration}%`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Hydration Percentage for "Other" */}
          {selectedBeverage === "other" && (
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Hydration Percentage: {customHydration[0]}%
              </Label>
              <Slider
                value={customHydration}
                onValueChange={setCustomHydration}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[hsl(var(--text-light))] mt-1">
                <span>10%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Amount Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Amount (ml)</Label>
            
            {/* Preset Amounts */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {presetAmounts.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                    amount === preset
                      ? "border-[hsl(var(--primary-blue))] bg-[hsl(var(--primary-blue))] text-white"
                      : "border-[hsl(var(--border))] hover:border-[hsl(var(--primary-blue))]/50"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Custom Amount Input */}
            <div>
              <Label className="text-xs text-[hsl(var(--text-light))] mb-2 block">Custom Amount</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={1}
                max={5000}
                className="w-full"
                placeholder="Enter custom amount"
              />
            </div>
          </div>

          {/* Effective Hydration Display */}
          <div className="bg-[hsl(var(--soft-gray))] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Effective Hydration:</span>
              <span className="text-lg font-bold text-[hsl(var(--primary-blue))]">
                {Math.round((amount * hydrationPercentage) / 100)}ml
              </span>
            </div>
            <div className="text-xs text-[hsl(var(--text-light))] mt-1">
              {amount}ml × {hydrationPercentage}% hydration value
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-[hsl(var(--primary-blue))] hover:bg-blue-600 text-white"
              disabled={amount <= 0}
            >
              Log Intake
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
