import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { useDashboardStore } from '@/core/stores/dashboardStore';
import { WidgetRenderer } from './WidgetRenderer';
import { GRID_COLUMNS, GRID_ROW_HEIGHT, GRID_GAP } from '@/core/constants';
import { widgetRegistry } from '@/modules/widgets';

export function DashboardCanvas() {
  const { widgets, selectedWidgetId, setSelectedWidget, updateWidget, currentDashboard } =
    useDashboardStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const widget = widgets.find((w) => w.id === active.id);
    if (!widget) return;

    // Вычисляем новую позицию на основе дельты
    const gridX = Math.round(delta.x / ((window.innerWidth - 320) / GRID_COLUMNS));
    const gridY = Math.round(delta.y / GRID_ROW_HEIGHT);

    const newX = Math.max(0, widget.x + gridX);
    const newY = Math.max(0, widget.y + gridY);

    updateWidget(widget.id, { x: newX, y: newY });
  };

  const handleWidgetClick = (widgetId: string) => {
    setSelectedWidget(widgetId);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        id="dashboard-canvas"
        className="relative w-full min-h-full bg-background"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
          gap: `${GRID_GAP}px`,
        }}
      >
        {widgets.map((widget) => {
          const widgetDef = widgetRegistry.get(widget.type);
          if (!widgetDef) return null;

          return (
            <WidgetRenderer
              key={widget.id}
              widget={widget}
              isSelected={selectedWidgetId === widget.id}
              onClick={() => handleWidgetClick(widget.id)}
            />
          );
        })}
      </div>
    </DndContext>
  );
}

