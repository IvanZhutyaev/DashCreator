import { widgetRegistry } from '@/modules/widgets';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useDashboardStore } from '@/core/stores/dashboardStore';
import { generateId } from '@/lib/utils';
import { GRID_COLUMNS } from '@/core/constants';

export function WidgetPalette() {
  const { addWidget } = useDashboardStore();
  const widgets = widgetRegistry.getAll();

  const handleAddWidget = (widgetType: string) => {
    const widgetDef = widgetRegistry.get(widgetType as any);
    if (!widgetDef) return;

    const newWidget = {
      id: generateId(),
      type: widgetType as any,
      title: widgetDef.name,
      x: 0,
      y: 0,
      width: widgetDef.defaultSize.width,
      height: widgetDef.defaultSize.height,
      config: { ...widgetDef.defaultConfig },
    };

    addWidget(newWidget);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Виджеты</h2>
      <div className="space-y-2">
        {widgets.map((widget) => (
          <Card
            key={widget.id}
            className="cursor-pointer hover:bg-accent transition-colors"
            onClick={() => handleAddWidget(widget.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{widget.name}</CardTitle>
              <CardDescription className="text-xs">{widget.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

