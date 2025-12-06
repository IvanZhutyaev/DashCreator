import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { EditPanelProps } from '../base/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const schema = z.object({
  columns: z.array(z.string()),
  pageSize: z.number().min(1).max(100),
  showPagination: z.boolean(),
  showSearch: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export function DataTableEditPanel({ config, onChange }: EditPanelProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      columns: (config.columns as string[]) || [],
      pageSize: (config.pageSize as number) || 10,
      showPagination: config.showPagination !== false,
      showSearch: config.showSearch !== false,
    },
  });

  const onSubmit = (data: FormData) => {
    onChange({ ...config, ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Колонки (через запятую)</label>
        <Input
          placeholder="id, name, value"
          onChange={(e) => {
            const cols = e.target.value.split(',').map((c) => c.trim()).filter(Boolean);
            onChange({ ...config, columns: cols });
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Размер страницы</label>
        <Input
          type="number"
          {...register('pageSize', { valueAsNumber: true })}
          min={1}
          max={100}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('showPagination')}
          className="w-4 h-4"
        />
        <label className="text-sm">Показывать пагинацию</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register('showSearch')}
          className="w-4 h-4"
        />
        <label className="text-sm">Показывать поиск</label>
      </div>

      <Button type="submit" className="w-full">
        Применить
      </Button>
    </form>
  );
}

