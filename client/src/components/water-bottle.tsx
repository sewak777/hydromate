import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WaterBottleProps {
  currentAmount: number;
  goalAmount: number;
  className?: string;
}

export default function WaterBottle({ currentAmount, goalAmount, className }: WaterBottleProps) {
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);
  const animatedPercentage = Math.min((animatedAmount / goalAmount) * 100, 100);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setAnimatedAmount(currentAmount);
      setIsAnimating(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentAmount]);

  const getWaterColor = () => {
    if (progressPercentage >= 100) return "hsl(var(--accent-green))";
    if (progressPercentage >= 75) return "hsl(var(--primary-blue))";
    if (progressPercentage >= 50) return "hsl(168, 76%, 65%)";
    return "hsl(168, 76%, 70%)";
  };

  const getBubbles = () => {
    const bubbleCount = Math.floor(progressPercentage / 20) + 1;
    return Array.from({ length: Math.min(bubbleCount, 5) }, (_, i) => (
      <div
        key={i}
        className="absolute bg-white/30 rounded-full animate-pulse"
        style={{
          width: `${4 + Math.random() * 6}px`,
          height: `${4 + Math.random() * 6}px`,
          left: `${20 + Math.random() * 60}%`,
          bottom: `${10 + i * 15 + Math.random() * 10}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${2 + Math.random()}s`,
        }}
      />
    ));
  };

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Water Bottle Visualization */}
      <div className="relative">
        {/* Bottle Outline */}
        <div className="relative w-24 h-48 mx-auto">
          {/* Bottle Cap */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-lg border border-gray-400"></div>
          
          {/* Bottle Neck */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gradient-to-b from-blue-50 to-blue-100 border-l border-r border-blue-200"></div>
          
          {/* Main Bottle Body */}
          <div className="absolute top-10 w-full h-36 bg-gradient-to-b from-blue-50 to-blue-100 rounded-b-3xl border-2 border-blue-200 overflow-hidden shadow-lg">
            {/* Water Fill */}
            <div
              className="absolute bottom-0 left-0 right-0 rounded-b-3xl transition-all duration-1000 ease-out"
              style={{
                height: `${animatedPercentage}%`,
                background: `linear-gradient(180deg, ${getWaterColor()}, ${getWaterColor()}dd)`,
              }}
            >
              {/* Water Surface Animation */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/20 to-transparent animate-wave"></div>
              
              {/* Bubbles */}
              {animatedPercentage > 10 && getBubbles()}
            </div>
            
            {/* Bottle Reflection */}
            <div className="absolute top-0 left-2 w-4 h-full bg-gradient-to-b from-white/40 to-white/10 rounded-r-full"></div>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="absolute -inset-4 flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="hsl(var(--border))"
              strokeWidth="3"
              fill="none"
              opacity="0.3"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={getWaterColor()}
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Percentage Display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: getWaterColor() }}>
              {Math.round(progressPercentage)}%
            </div>
          </div>
        </div>
      </div>

      {/* Progress Details */}
      <div className="text-center space-y-2">
        <div className="text-lg font-semibold">
          {currentAmount.toLocaleString()}ml
        </div>
        <div className="text-sm text-[hsl(var(--text-light))]">
          of {goalAmount.toLocaleString()}ml goal
        </div>
        
        {/* Progress Bar */}
        <div className="w-48 h-2 bg-[hsl(var(--border))] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${progressPercentage}%`,
              background: `linear-gradient(90deg, ${getWaterColor()}, ${getWaterColor()}aa)`,
            }}
          />
        </div>
        
        {/* Remaining Amount */}
        <div className="text-xs text-[hsl(var(--text-light))]">
          {currentAmount >= goalAmount ? (
            <span className="text-[hsl(var(--accent-green))] font-medium">🎉 Goal achieved!</span>
          ) : (
            <span>{(goalAmount - currentAmount).toLocaleString()}ml remaining</span>
          )}
        </div>
      </div>

      {/* Achievement Indicator */}
      {progressPercentage >= 100 && (
        <div className="animate-bounce">
          <div className="w-8 h-8 bg-[hsl(var(--accent-green))] rounded-full flex items-center justify-center text-white text-sm font-bold">
            ✓
          </div>
        </div>
      )}
    </div>
  );
}
