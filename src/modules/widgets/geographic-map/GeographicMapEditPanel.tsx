import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { EditPanelProps } from '../base/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';

const schema = z.object({
  mapType: z.enum(['choropleth', 'bubble']),
  locationField: z.string().min(1, 'Обязательное поле'),
  valueField: z.string().min(1, 'Обязательное поле'),
  colorScheme: z.enum(['blue', 'green', 'red', 'purple']),
  showTooltips: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function GeographicMapEditPanel({ config, onChange }: EditPanelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      mapType: (config.mapType as 'choropleth' | 'bubble') || 'choropleth',
      locationField: (config.locationField as string) || '',
      valueField: (config.valueField as string) || '',
      colorScheme: (config.colorScheme as 'blue' | 'green' | 'red' | 'purple') || 'blue',
      showTooltips: config.showTooltips !== false,
    },
  });

  const onSubmit = (data: FormData) => {
    onChange({ ...config, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Тип карты</Label>
        <select {...register('mapType')} className="w-full p-2 border rounded">
          <option value="choropleth">Хороплет (цветовые зоны)</option>
          <option value="bubble">Bubble (круги по размеру)</option>
        </select>
      </div>

      <div>
        <Label>Поле локации</Label>
        <Input {...register('locationField')} placeholder="country" />
        {errors.locationField && (
          <p className="text-sm text-destructive mt-1">{errors.locationField.message}</p>
        )}
      </div>

      <div>
        <Label>Поле значения</Label>
        <Input {...register('valueField')} placeholder="value" />
        {errors.valueField && (
          <p className="text-sm text-destructive mt-1">{errors.valueField.message}</p>
        )}
      </div>

      <div>
        <Label>Цветовая схема</Label>
        <select {...register('colorScheme')} className="w-full p-2 border rounded">
          <option value="blue">Синяя</option>
          <option value="green">Зеленая</option>
          <option value="red">Красная</option>
          <option value="purple">Фиолетовая</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('showTooltips')}
          className="w-4 h-4"
        />
        <label className="text-sm">Показывать подсказки</label>
      </div>

      <Button type="submit" className="w-full">
        Применить
      </Button>
    </form>
  );
}

