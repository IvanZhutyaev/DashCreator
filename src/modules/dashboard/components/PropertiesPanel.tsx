import { useDashboardStore } from '@/core/stores/dashboardStore';
import { widgetRegistry } from '@/modules/widgets';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export function PropertiesPanel() {
  const { selectedWidgetId, widgets, updateWidget } = useDashboardStore();

  const selectedWidget = widgets.find((w) => w.id === selectedWidgetId);

  if (!selectedWidget) {
    return (
      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          Выберите виджет для редактирования свойств
        </p>
      </div>
    );
  }

  const widgetDef = widgetRegistry.get(selectedWidget.type);
  if (!widgetDef) {
    return (
      <div className="p-4">
        <p className="text-sm text-destructive">Виджет не найден</p>
      </div>
    );
  }

  const EditPanel = widgetDef.getEditPanel();

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Свойства виджета</CardTitle>
        </CardHeader>
        <CardContent>
          <EditPanel
            config={selectedWidget.config}
            onChange={(newConfig) => {
              updateWidget(selectedWidget.id, { config: newConfig });
            }}
            widget={selectedWidget}
          />
        </CardContent>
      </Card>
    </div>
  );
}

