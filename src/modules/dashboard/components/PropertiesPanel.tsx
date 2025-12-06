import { useState } from 'react';
import { useDashboardStore } from '@/core/stores/dashboardStore';
import { widgetRegistry } from '@/modules/widgets';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { FiltersPanel } from './FiltersPanel';
import { DataBindingPanel } from './DataBindingPanel';

export function PropertiesPanel() {
  const { selectedWidgetId, widgets, updateWidget } = useDashboardStore();
  const [activeTab, setActiveTab] = useState('widget');

  const selectedWidget = widgets.find((w) => w.id === selectedWidgetId);

  if (!selectedWidget) {
    return (
      <div className="p-4 space-y-4">
        <FiltersPanel />
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
    <div className="p-4 space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="widget">Виджет</TabsTrigger>
          <TabsTrigger value="data">Данные</TabsTrigger>
          <TabsTrigger value="filters">Фильтры</TabsTrigger>
        </TabsList>

        <TabsContent value="widget" className="mt-4">
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
        </TabsContent>

        <TabsContent value="data" className="mt-4">
          <DataBindingPanel />
        </TabsContent>

        <TabsContent value="filters" className="mt-4">
          <FiltersPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

