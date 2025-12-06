import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { EditPanelProps } from '../base/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  chartType: z.enum(['line', 'bar', 'area']),
  xAxisField: z.string().min(1, 'Обязательное поле'),
  yAxisFields: z.array(z.string()).min(1, 'Добавьте хотя бы одно поле'),
  showLegend: z.boolean(),
  showGrid: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function TimeSeriesEditPanel({ config, onChange, widget }: EditPanelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      chartType: (config.chartType as 'line' | 'bar' | 'area') || 'line',
      xAxisField: (config.xAxisField as string) || '',
      yAxisFields: (config.yAxisFields as string[]) || [],
      showLegend: config.showLegend !== false,
      showGrid: config.showGrid !== false,
    },
  });

  const onSubmit = (data: FormData) => {
    onChange({ ...config, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Тип графика</label>
        <select {...register('chartType')} className="w-full p-2 border rounded">
          <option value="line">Линейный</option>
          <option value="bar">Столбчатый</option>
          <option value="area">Площадной</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Поле оси X</label>
        <Input {...register('xAxisField')} />
        {errors.xAxisField && (
          <p className="text-sm text-destructive mt-1">{errors.xAxisField.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Поля оси Y (через запятую)</label>
        <Input
          {...register('yAxisFields')}
          placeholder="value, revenue, users"
          onChange={(e) => {
            const fields = e.target.value.split(',').map((f) => f.trim()).filter(Boolean);
            onChange({ ...config, yAxisFields: fields });
          }}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('showLegend')}
          className="w-4 h-4"
        />
        <label className="text-sm">Показывать легенду</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('showGrid')}
          className="w-4 h-4"
        />
        <label className="text-sm">Показывать сетку</label>
      </div>

      <Button type="submit" className="w-full">
        Применить
      </Button>
    </form>
  );
}

