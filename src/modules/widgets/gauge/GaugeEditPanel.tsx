import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { EditPanelProps } from '../base/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  value: z.number().min(0),
  min: z.number(),
  max: z.number().min(1),
  target: z.number().optional(),
  showTarget: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function GaugeEditPanel({ config, onChange }: EditPanelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: (config.value as number) || 50,
      min: (config.min as number) || 0,
      max: (config.max as number) || 100,
      target: (config.target as number) || 80,
      showTarget: config.showTarget !== false,
    },
  });

  const onSubmit = (data: FormData) => {
    onChange({ ...config, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Значение</label>
        <Input type="number" {...register('value', { valueAsNumber: true })} />
        {errors.value && (
          <p className="text-sm text-destructive mt-1">{errors.value.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Минимум</label>
        <Input type="number" {...register('min', { valueAsNumber: true })} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Максимум</label>
        <Input type="number" {...register('max', { valueAsNumber: true })} />
        {errors.max && (
          <p className="text-sm text-destructive mt-1">{errors.max.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Цель</label>
        <Input type="number" {...register('target', { valueAsNumber: true })} />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('showTarget')}
          className="w-4 h-4"
        />
        <label className="text-sm">Показывать цель</label>
      </div>

      <Button type="submit" className="w-full">
        Применить
      </Button>
    </form>
  );
}

