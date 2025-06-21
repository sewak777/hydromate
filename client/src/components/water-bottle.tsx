import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface WaterBottleProps {
  currentAmount: number;
  goalAmount: number;
  className?: string;
  onFillAnimation?: () => void;
}

export default function WaterBottle({ currentAmount, goalAmount, className, onFillAnimation }: WaterBottleProps) {
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);
  const animatedPercentage = Math.min((animatedAmount / goalAmount) * 100, 100);

  useEffect(() => {
    if (currentAmount !== animatedAmount) {
      setIsAnimating(true);
      onFillAnimation?.();
      
      // Smooth animation from current to new amount
      const startAmount = animatedAmount;
      const difference = currentAmount - startAmount;
      const duration = Math.min(1500, Math.abs(difference) * 2); // Scale duration with amount
      const steps = 60;
      const stepDuration = duration / steps;
      const stepAmount = difference / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const newAmount = startAmount + (stepAmount * currentStep);
        
        if (currentStep >= steps) {
          setAnimatedAmount(currentAmount);
          setIsAnimating(false);
          clearInterval(interval);
        } else {
          setAnimatedAmount(newAmount);
        }
      }, stepDuration);
      
      return () => {
        clearInterval(interval);
        setIsAnimating(false);
      };
    }
  }, [currentAmount, animatedAmount]);

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
        <svg width="120" height="200" viewBox="0 0 120 200" className="drop-shadow-lg">
          <defs>
            {/* Gradients for glass effect */}
            <linearGradient id="bottleGlass" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#f8fafc', stopOpacity: 0.8 }} />
              <stop offset="20%" style={{ stopColor: '#ffffff', stopOpacity: 0.9 }} />
              <stop offset="80%" style={{ stopColor: '#e2e8f0', stopOpacity: 0.7 }} />
              <stop offset="100%" style={{ stopColor: '#cbd5e1', stopOpacity: 0.6 }} />
            </linearGradient>
            
            <linearGradient id="waterFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: getWaterColor(), stopOpacity: 0.9 }} />
              <stop offset="50%" style={{ stopColor: getWaterColor(), stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: getWaterColor(), stopOpacity: 0.8 }} />
            </linearGradient>
            
            <linearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#64748b' }} />
              <stop offset="50%" style={{ stopColor: '#475569' }} />
              <stop offset="100%" style={{ stopColor: '#334155' }} />
            </linearGradient>
            
            {/* Filter for glass effect */}
            <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
            </filter>
            
            {/* Clip path for water */}
            <clipPath id="bottleClip">
              <path d="M25 40 Q25 35 30 35 L50 35 Q55 35 55 40 L55 170 Q55 180 45 180 L35 180 Q25 180 25 170 Z" />
            </clipPath>
          </defs>
          
          {/* Bottle Cap */}
          <rect x="35" y="15" width="30" height="12" rx="2" fill="url(#capGradient)" />
          <rect x="37" y="17" width="26" height="8" rx="1" fill="#94a3b8" opacity="0.7" />
          
          {/* Bottle Neck */}
          <rect x="40" y="27" width="20" height="13" fill="url(#bottleGlass)" stroke="#cbd5e1" strokeWidth="1" />
          
          {/* Main Bottle Body */}
          <path 
            d="M25 40 Q25 35 30 35 L50 35 Q55 35 55 40 L55 170 Q55 180 45 180 L35 180 Q25 180 25 170 Z" 
            fill="url(#bottleGlass)" 
            stroke="#cbd5e1" 
            strokeWidth="1.5"
          />
          
          {/* Water Fill */}
          <g clipPath="url(#bottleClip)">
            <rect
              x="25"
              y={180 - (animatedPercentage * 140 / 100)}
              width="30"
              height={animatedPercentage * 140 / 100}
              fill="url(#waterFill)"
              className="transition-all duration-1000 ease-out"
            />
            
            {/* Water surface with wave effect */}
            {animatedPercentage > 0 && (
              <ellipse
                cx="40"
                cy={180 - (animatedPercentage * 140 / 100)}
                rx="14"
                ry="2"
                fill="white"
                opacity="0.3"
                className="animate-pulse"
              />
            )}
          </g>
          
          {/* Bottle Highlight */}
          <path 
            d="M30 40 Q30 37 32 37 L32 175 Q30 175 30 172 Z" 
            fill="white" 
            opacity="0.4"
            filter="url(#glassBlur)"
          />
          
          {/* Glass reflection */}
          <ellipse cx="35" cy="55" rx="3" ry="8" fill="white" opacity="0.6" />
          <ellipse cx="35" cy="75" rx="2" ry="5" fill="white" opacity="0.4" />
          
          {/* Enhanced Bubbles during animation */}
          {animatedPercentage > 20 && (
            <>
              <circle cx="38" cy={170 - (animatedPercentage * 100 / 100)} r={isAnimating ? "2" : "1.5"} fill="white" opacity={isAnimating ? "0.8" : "0.6"} className="animate-pulse" />
              <circle cx="42" cy={165 - (animatedPercentage * 100 / 100)} r={isAnimating ? "1.5" : "1"} fill="white" opacity={isAnimating ? "0.7" : "0.5"} className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="36" cy={160 - (animatedPercentage * 100 / 100)} r={isAnimating ? "1.2" : "0.8"} fill="white" opacity={isAnimating ? "0.6" : "0.4"} className="animate-pulse" style={{ animationDelay: '1s' }} />
              {isAnimating && (
                <>
                  <circle cx="40" cy={175 - (animatedPercentage * 100 / 100)} r="1" fill="white" opacity="0.5" className="animate-ping" />
                  <circle cx="35" cy={168 - (animatedPercentage * 100 / 100)} r="0.8" fill="white" opacity="0.4" className="animate-ping" style={{ animationDelay: '0.8s' }} />
                </>
              )}
            </>
          )}
        </svg>
        
        {/* Percentage Display */}
        <div className="absolute inset-0 flex items-center justify-center mt-8">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
            <div className="text-xl font-bold" style={{ color: getWaterColor() }}>
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
