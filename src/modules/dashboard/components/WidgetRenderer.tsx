import { useDraggable } from '@dnd-kit/core';
import { widgetRegistry } from '@/modules/widgets';
import { Card } from '@/components/ui/Card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useDashboardStore } from '@/core/stores/dashboardStore';
import type { Widget } from '@/modules/dashboard/types';
import { GRID_ROW_HEIGHT } from '@/core/constants';

interface WidgetRendererProps {
  widget: Widget;
  isSelected: boolean;
  onClick: () => void;
}

export function WidgetRenderer({ widget, isSelected, onClick }: WidgetRendererProps) {
  const { removeWidget } = useDashboardStore();
  const widgetDef = widgetRegistry.get(widget.type);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: widget.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  if (!widgetDef) {
    return null;
  }

  const widgetStyle = {
    gridColumn: `span ${widget.width}`,
    gridRow: `span ${widget.height}`,
    minHeight: `${widget.height * GRID_ROW_HEIGHT}px`,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...widgetStyle }}
      className={`relative ${isSelected ? 'ring-2 ring-primary' : ''}`}
      onClick={onClick}
    >
      <Card className="h-full w-full flex flex-col">
        <div
          {...listeners}
          {...attributes}
          className="flex items-center justify-between p-2 border-b cursor-move"
        >
          <h3 className="text-sm font-semibold">{widget.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              removeWidget(widget.id);
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-hidden">
          {widgetDef.render({
            data: { data: [], fields: [] },
            config: widget.config,
            width: 0,
            height: 0,
            isEditing: true,
          })}
        </div>
      </Card>
    </div>
  );
}

