import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { WidgetConfig } from '../base/types';

interface TimeSeriesChartProps {
  data: unknown[];
  config: WidgetConfig;
  width: number;
  height: number;
}

export function TimeSeriesChart({ data, config }: TimeSeriesChartProps) {
  const chartType = (config.chartType as string) || 'line';
  const xAxisField = (config.xAxisField as string) || 'date';
  const yAxisFields = (config.yAxisFields as string[]) || [];
  const showGrid = config.showGrid !== false;
  const showLegend = config.showLegend !== false;

  // Моковые данные для демонстрации
  const mockData = [
    { date: '2024-01-01', value: 100 },
    { date: '2024-01-02', value: 120 },
    { date: '2024-01-03', value: 110 },
    { date: '2024-01-04', value: 130 },
    { date: '2024-01-05', value: 125 },
  ];

  const chartData = (data.length > 0 ? data : mockData) as Array<Record<string, unknown>>;

  return (
    <div className="w-full h-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey={xAxisField} />
          <YAxis />
          <Tooltip />
          {showLegend && <Legend />}
          {yAxisFields.length > 0 ? (
            yAxisFields.map((field) => (
              <Line
                key={field}
                type="monotone"
                dataKey={field}
                stroke="#3b82f6"
                strokeWidth={2}
              />
            ))
          ) : (
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

