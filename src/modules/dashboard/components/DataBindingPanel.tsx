import { useDashboardStore } from '@/core/stores/dashboardStore';
import { useDataSourceStore } from '@/core/stores/dataSourceStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';

export function DataBindingPanel() {
  const { selectedWidgetId, widgets, updateWidget } = useDashboardStore();
  const { dataSources } = useDataSourceStore();

  const selectedWidget = widgets.find((w) => w.id === selectedWidgetId);

  if (!selectedWidget) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Выберите виджет для настройки источника данных
        </CardContent>
      </Card>
    );
  }

  const handleDataSourceChange = (dataSourceId: string) => {
    updateWidget(selectedWidget.id, { dataSourceId: dataSourceId || undefined });
  };

  const handleFieldChange = (field: string, value: string) => {
    const config = { ...selectedWidget.config };
    config[field] = value;
    updateWidget(selectedWidget.id, { config });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Привязка данных</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Источник данных</Label>
          <Select
            value={selectedWidget.dataSourceId || ''}
            onValueChange={handleDataSourceChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите источник" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Без источника</SelectItem>
              {dataSources.map((ds) => (
                <SelectItem key={ds.id} value={ds.id}>
                  {ds.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedWidget.type === 'time_series' && (
          <>
            <div>
              <Label>Поле оси X</Label>
              <Input
                value={(selectedWidget.config.xAxisField as string) || ''}
                onChange={(e) => handleFieldChange('xAxisField', e.target.value)}
                placeholder="date"
              />
            </div>
            <div>
              <Label>Поля оси Y (через запятую)</Label>
              <Input
                value={
                  Array.isArray(selectedWidget.config.yAxisFields)
                    ? selectedWidget.config.yAxisFields.join(', ')
                    : ''
                }
                onChange={(e) => {
                  const fields = e.target.value.split(',').map((f) => f.trim()).filter(Boolean);
                  handleFieldChange('yAxisFields', JSON.stringify(fields));
                }}
                placeholder="value, revenue, users"
              />
            </div>
          </>
        )}

        {selectedWidget.type === 'metric_card' && (
          <div>
            <Label>Поле значения</Label>
            <Input
              value={(selectedWidget.config.valueField as string) || ''}
              onChange={(e) => handleFieldChange('valueField', e.target.value)}
              placeholder="value"
            />
          </div>
        )}

        {selectedWidget.type === 'data_table' && (
          <div>
            <Label>Колонки (через запятую)</Label>
            <Input
              value={
                Array.isArray(selectedWidget.config.columns)
                  ? selectedWidget.config.columns.join(', ')
                  : ''
              }
              onChange={(e) => {
                const cols = e.target.value.split(',').map((c) => c.trim()).filter(Boolean);
                handleFieldChange('columns', JSON.stringify(cols));
              }}
              placeholder="id, name, value"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

