import type { WidgetConfig } from '../base/types';

interface GaugeDisplayProps {
  data: unknown[];
  config: WidgetConfig;
  width: number;
  height: number;
}

export function GaugeDisplay({ config }: GaugeDisplayProps) {
  const value = (config.value as number) || 50;
  const min = (config.min as number) || 0;
  const max = (config.max as number) || 100;
  const target = (config.target as number) || 80;
  const showTarget = config.showTarget !== false;

  const percentage = ((value - min) / (max - min)) * 100;
  const targetPercentage = ((target - min) / (max - min)) * 100;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage < 50) return '#ef4444'; // red
    if (percentage < 80) return '#f59e0b'; // yellow
    return '#10b981'; // green
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          {/* Target indicator */}
          {showTarget && (
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray={`${circumference * 0.05} ${circumference * 0.95}`}
              strokeDashoffset={circumference - (targetPercentage / 100) * circumference}
              className="opacity-50"
            />
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">
            {min} - {max}
          </div>
          {showTarget && (
            <div className="text-xs text-primary mt-1">Цель: {target}</div>
          )}
        </div>
      </div>
    </div>
  );
}

