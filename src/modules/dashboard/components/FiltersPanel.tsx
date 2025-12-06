import { useState, useMemo } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useDashboardStore } from '@/core/stores/dashboardStore';
import type { Filter } from '@/modules/dashboard/types';
import { generateId } from '@/lib/utils';
import { debounce } from '@/lib/utils';

const FILTER_OPERATORS = [
  { value: 'equals', label: 'Равно' },
  { value: 'not_equals', label: 'Не равно' },
  { value: 'contains', label: 'Содержит' },
  { value: 'gt', label: 'Больше' },
  { value: 'lt', label: 'Меньше' },
  { value: 'gte', label: 'Больше или равно' },
  { value: 'lte', label: 'Меньше или равно' },
  { value: 'between', label: 'Между' },
  { value: 'in', label: 'В списке' },
] as const;

export function FiltersPanel() {
  const { currentDashboard, updateDashboard } = useDashboardStore();
  const [filters, setFilters] = useState<Filter[]>(currentDashboard?.globalFilters || []);

  // Дебаунс для обновления дашборда
  const debouncedUpdate = useMemo(
    () =>
      debounce((newFilters: Filter[]) => {
        updateDashboard({ globalFilters: newFilters });
      }, 300),
    [updateDashboard]
  );

  const handleAddFilter = () => {
    const newFilter: Filter = {
      id: generateId(),
      field: '',
      operator: 'equals',
      value: '',
    };
    const newFilters = [...filters, newFilter];
    setFilters(newFilters);
    debouncedUpdate(newFilters);
  };

  const handleRemoveFilter = (id: string) => {
    const newFilters = filters.filter((f) => f.id !== id);
    setFilters(newFilters);
    updateDashboard({ globalFilters: newFilters });
  };

  const handleUpdateFilter = (id: string, updates: Partial<Filter>) => {
    const newFilters = filters.map((f) => (f.id === id ? { ...f, ...updates } : f));
    setFilters(newFilters);
    debouncedUpdate(newFilters);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Глобальные фильтры</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleAddFilter}>
            <Plus className="w-4 h-4 mr-1" />
            Добавить
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {filters.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Нет фильтров. Добавьте фильтр для фильтрации данных во всех виджетах.
          </p>
        ) : (
          filters.map((filter) => (
            <div key={filter.id} className="flex gap-2 items-start p-3 border rounded-lg">
              <div className="flex-1 grid grid-cols-3 gap-2">
                <Input
                  placeholder="Поле"
                  value={filter.field}
                  onChange={(e) => handleUpdateFilter(filter.id, { field: e.target.value })}
                />
                <Select
                  value={filter.operator}
                  onValueChange={(value) =>
                    handleUpdateFilter(filter.id, { operator: value as Filter['operator'] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FILTER_OPERATORS.map((op) => (
                      <SelectItem key={op.value} value={op.value}>
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Значение"
                  value={String(filter.value || '')}
                  onChange={(e) => handleUpdateFilter(filter.id, { value: e.target.value })}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveFilter(filter.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
