import { widgetRegistry } from './registry/WidgetRegistry';
import { TimeSeriesWidget } from './time-series/TimeSeriesWidget';
import { MetricCardWidget } from './metric-card/MetricCardWidget';
import { DataTableWidget } from './data-table/DataTableWidget';
import { GaugeWidget } from './gauge/GaugeWidget';

// Регистрация всех виджетов
export function registerWidgets() {
  widgetRegistry.register(new TimeSeriesWidget());
  widgetRegistry.register(new MetricCardWidget());
  widgetRegistry.register(new DataTableWidget());
  widgetRegistry.register(new GaugeWidget());
}

export { widgetRegistry };
export * from './base/types';
export * from './base/BaseWidget';

