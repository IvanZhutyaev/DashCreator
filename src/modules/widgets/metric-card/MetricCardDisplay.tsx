import { memo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { WidgetConfig } from '../base/types';
import { formatNumber } from '@/lib/utils';

interface MetricCardDisplayProps {
  data: unknown[];
  config: WidgetConfig;
  width: number;
  height: number;
}

export const MetricCardDisplay = memo(function MetricCardDisplay({ config }: MetricCardDisplayProps) {
  const title = (config.title as string) || 'Метрика';
  const value = (config.value as number) || 12345;
  const delta = (config.delta as number) || 12.5;
  const showDelta = config.showDelta !== false;
  const format = (config.format as string) || 'number';

  const formattedValue =
    format === 'number' ? formatNumber(value) : value.toLocaleString();

  return (
    <div className="w-full h-full p-6 bg-card border rounded-lg">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
          <div className="text-3xl font-bold">{formattedValue}</div>
        </div>
        {showDelta && (
          <div className="flex items-center gap-1 mt-4">
            {delta >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${delta >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(delta)}%
            </span>
            <span className="text-sm text-muted-foreground">за период</span>
          </div>
        )}
      </div>
    </div>
  );
});
