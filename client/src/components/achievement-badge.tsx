import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Target, Zap, Calendar, Droplets, Star, Lock } from "lucide-react";

interface Achievement {
  id: number;
  name: string;
  description: string;
  iconName: string;
  badgeColor: string;
  isPremium: boolean;
  unlocked: boolean;
  unlockedAt?: string;
}

const iconMap = {
  trophy: Trophy,
  award: Award,
  target: Target,
  zap: Zap,
  calendar: Calendar,
  droplets: Droplets,
  star: Star,
};

export default function AchievementBadge() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
    retry: false,
  });

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  const getIconComponent = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Trophy;
  };

  const getBadgeColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      gold: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      silver: "bg-gradient-to-br from-gray-300 to-gray-500",
      bronze: "bg-gradient-to-br from-orange-400 to-orange-600",
      blue: "bg-gradient-to-br from-blue-400 to-blue-600",
      green: "bg-gradient-to-br from-green-400 to-green-600",
      purple: "bg-gradient-to-br from-purple-400 to-purple-600",
      red: "bg-gradient-to-br from-red-400 to-red-600",
    };
    return colorMap[color] || "bg-gradient-to-br from-gray-400 to-gray-600";
  };

  if (achievements.length === 0) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-[hsl(var(--soft-gray))] rounded-full flex items-center justify-center mx-auto mb-3">
          <Trophy className="w-8 h-8 text-[hsl(var(--text-light))]" />
        </div>
        <p className="text-sm text-[hsl(var(--text-light))]">Loading achievements...</p>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Trophy className="w-4 h-4 mr-2" />
          View All Achievements
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-[hsl(var(--deep-teal))]" />
            <span>Your Achievements</span>
            <Badge variant="secondary" className="ml-2">
              {unlockedAchievements.length} / {achievements.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Progress Summary */}
          <div className="bg-[hsl(var(--soft-gray))] p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Achievement Progress</span>
              <span className="text-lg font-bold text-[hsl(var(--deep-teal))]">
                {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-[hsl(var(--border))] rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[hsl(var(--deep-teal))] to-[hsl(var(--accent-green))] h-2 rounded-full transition-all duration-500"
                style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Unlocked Achievements */}
          {unlockedAchievements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--accent-green))]">
                🏆 Unlocked ({unlockedAchievements.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {unlockedAchievements.map((achievement) => {
                  const IconComponent = getIconComponent(achievement.iconName);
                  return (
                    <div
                      key={achievement.id}
                      className="flex items-start space-x-3 p-4 bg-white rounded-lg border-2 border-[hsl(var(--accent-green))]/20 shadow-sm"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getBadgeColorClass(achievement.badgeColor)}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-[hsl(var(--text-dark))]">
                            {achievement.name}
                          </h4>
                          {achievement.isPremium && (
                            <Badge variant="secondary" className="text-xs">
                              Premium
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[hsl(var(--text-light))] mb-2">
                          {achievement.description}
                        </p>
                        {achievement.unlockedAt && (
                          <p className="text-xs text-[hsl(var(--accent-green))] font-medium">
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Locked Achievements */}
          {lockedAchievements.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--text-light))]">
                🔒 Locked ({lockedAchievements.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {lockedAchievements.map((achievement) => {
                  const IconComponent = getIconComponent(achievement.iconName);
                  return (
                    <div
                      key={achievement.id}
                      className="flex items-start space-x-3 p-4 bg-[hsl(var(--soft-gray))] rounded-lg border border-[hsl(var(--border))] opacity-75"
                    >
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 relative">
                        <IconComponent className="w-6 h-6" />
                        <Lock className="w-4 h-4 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-[hsl(var(--text-light))]">
                            {achievement.name}
                          </h4>
                          {achievement.isPremium && (
                            <Badge variant="outline" className="text-xs">
                              Premium
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[hsl(var(--text-light))]">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Achievement Preview for Dashboard */}
          {unlockedAchievements.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[hsl(var(--soft-gray))] rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-[hsl(var(--text-light))]" />
              </div>
              <h3 className="font-semibold text-[hsl(var(--text-dark))] mb-2">
                Start Your Achievement Journey!
              </h3>
              <p className="text-sm text-[hsl(var(--text-light))]">
                Complete hydration goals and unlock your first achievement badge.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
