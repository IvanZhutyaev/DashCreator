import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { EditPanelProps } from '../base/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  title: z.string().min(1, 'Обязательное поле'),
  valueField: z.string().min(1, 'Обязательное поле'),
  format: z.enum(['number', 'currency', 'percent']),
  showDelta: z.boolean(),
  showSparkline: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function MetricCardEditPanel({ config, onChange }: EditPanelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: (config.title as string) || 'Метрика',
      valueField: (config.valueField as string) || '',
      format: (config.format as 'number' | 'currency' | 'percent') || 'number',
      showDelta: config.showDelta !== false,
      showSparkline: config.showSparkline !== false,
    },
  });

  const onSubmit = (data: FormData) => {
    onChange({ ...config, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Заголовок</label>
        <Input {...register('title')} />
        {errors.title && (
          <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Поле значения</label>
        <Input {...register('valueField')} />
        {errors.valueField && (
          <p className="text-sm text-destructive mt-1">{errors.valueField.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Формат</label>
        <select {...register('format')} className="w-full p-2 border rounded">
          <option value="number">Число</option>
          <option value="currency">Валюта</option>
          <option value="percent">Процент</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('showDelta')}
          className="w-4 h-4"
        />
        <label className="text-sm">Показывать дельту</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('showSparkline')}
          className="w-4 h-4"
        />
        <label className="text-sm">Показывать мини-график</label>
      </div>

      <Button type="submit" className="w-full">
        Применить
      </Button>
    </form>
  );
}

