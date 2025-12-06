import type { BaseWidget } from '../base/BaseWidget';
import type { WidgetType } from '@/modules/dashboard/types';

class WidgetRegistry {
  private widgets = new Map<WidgetType, BaseWidget>();

  register(widget: BaseWidget): void {
    this.widgets.set(widget.id as WidgetType, widget);
  }

  get(type: WidgetType): BaseWidget | undefined {
    return this.widgets.get(type);
  }

  getAll(): BaseWidget[] {
    return Array.from(this.widgets.values());
  }

  has(type: WidgetType): boolean {
    return this.widgets.has(type);
  }
}

export const widgetRegistry = new WidgetRegistry();

