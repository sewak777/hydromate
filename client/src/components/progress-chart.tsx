import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ProgressChartProps {
  data: Array<{
    date: string;
    totalIntake: number;
    goalAmount: number;
    goalMet: boolean;
  }>;
}

export default function ProgressChart({ data }: ProgressChartProps) {
  const chartData = useMemo(() => {
    return data.map((item) => {
      // Parse date in local timezone to avoid UTC conversion issues
      const dateParts = item.date.split('-');
      const date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
      const dayName = date.toLocaleDateString('en-CA', { weekday: 'short', timeZone: 'America/Toronto' });
      const dateNumber = date.getDate();
      
      return {
        ...item,
        dayLabel: `${dayName} ${dateNumber}`,
        progressPercentage: Math.round((item.totalIntake / item.goalAmount) * 100),
        intakeInLiters: (item.totalIntake / 1000).toFixed(1),
        goalInLiters: (item.goalAmount / 1000).toFixed(1),
      };
    }).reverse(); // Show most recent dates on the right
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-[hsl(var(--border))]">
          <p className="font-medium text-[hsl(var(--text-dark))]">{label}</p>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm text-[hsl(var(--text-light))]">Intake:</span>
              <span className="font-medium text-[hsl(var(--primary-blue))]">
                {data.intakeInLiters}L
              </span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm text-[hsl(var(--text-light))]">Goal:</span>
              <span className="font-medium text-[hsl(var(--accent-green))]">
                {data.goalInLiters}L
              </span>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <span className="text-sm text-[hsl(var(--text-light))]">Progress:</span>
              <span className={`font-medium ${
                data.goalMet ? "text-[hsl(var(--accent-green))]" : "text-[hsl(var(--vibrant-orange))]"
              }`}>
                {data.progressPercentage}%
              </span>
            </div>
            {data.goalMet && (
              <div className="text-xs text-[hsl(var(--accent-green))] font-medium">
                ✓ Goal achieved!
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (item: any, index: number) => {
    if (item.goalMet) {
      return "hsl(var(--accent-green))"; // Green for achieved goals
    } else if (item.progressPercentage >= 75) {
      return "hsl(var(--primary-blue))"; // Blue for close to goal
    } else if (item.progressPercentage >= 50) {
      return "hsl(var(--vibrant-orange))"; // Orange for moderate progress
    } else {
      return "hsl(0, 60%, 60%)"; // Red-ish for low progress
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-[hsl(var(--text-light))]">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>No data available yet</p>
          <p className="text-sm">Start logging your intake to see progress!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="dayLabel" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--text-light))" }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--text-light))" }}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}L`}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Bar 
              dataKey="totalIntake" 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry, index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend and Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-3 bg-[hsl(var(--soft-gray))] rounded-lg">
          <div className="w-4 h-4 bg-[hsl(var(--accent-green))] rounded mx-auto mb-2"></div>
          <div className="text-xs text-[hsl(var(--text-light))]">Goals Met</div>
          <div className="font-bold text-[hsl(var(--accent-green))]">
            {chartData.filter(d => d.goalMet).length}
          </div>
        </div>
        
        <div className="p-3 bg-[hsl(var(--soft-gray))] rounded-lg">
          <div className="w-4 h-4 bg-[hsl(var(--primary-blue))] rounded mx-auto mb-2"></div>
          <div className="text-xs text-[hsl(var(--text-light))]">Avg Intake</div>
          <div className="font-bold text-[hsl(var(--primary-blue))]">
            {(chartData.reduce((sum, d) => sum + d.totalIntake, 0) / chartData.length / 1000).toFixed(1)}L
          </div>
        </div>
        
        <div className="p-3 bg-[hsl(var(--soft-gray))] rounded-lg">
          <div className="w-4 h-4 bg-[hsl(var(--vibrant-orange))] rounded mx-auto mb-2"></div>
          <div className="text-xs text-[hsl(var(--text-light))]">Best Day</div>
          <div className="font-bold text-[hsl(var(--vibrant-orange))]">
            {Math.max(...chartData.map(d => d.totalIntake)) / 1000}L
          </div>
        </div>
        
        <div className="p-3 bg-[hsl(var(--soft-gray))] rounded-lg">
          <div className="w-4 h-4 bg-[hsl(var(--deep-teal))] rounded mx-auto mb-2"></div>
          <div className="text-xs text-[hsl(var(--text-light))]">Streak</div>
          <div className="font-bold text-[hsl(var(--deep-teal))]">
            {(() => {
              let streak = 0;
              for (let i = chartData.length - 1; i >= 0; i--) {
                if (chartData[i].goalMet) {
                  streak++;
                } else {
                  break;
                }
              }
              return streak;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
