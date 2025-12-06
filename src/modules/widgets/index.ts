import { lazy } from 'react';
import { widgetRegistry } from './registry/WidgetRegistry';
import { TimeSeriesWidget } from './time-series/TimeSeriesWidget';
import { MetricCardWidget } from './metric-card/MetricCardWidget';
import { DataTableWidget } from './data-table/DataTableWidget';
import { GaugeWidget } from './gauge/GaugeWidget';
import { GeographicMapWidget } from './geographic-map/GeographicMapWidget';

// Lazy loading для виджетов (code splitting)
export const TimeSeriesWidgetLazy = lazy(() =>
  import('./time-series/TimeSeriesWidget').then((m) => ({ default: m.TimeSeriesWidget }))
);

export const MetricCardWidgetLazy = lazy(() =>
  import('./metric-card/MetricCardWidget').then((m) => ({ default: m.MetricCardWidget }))
);

export const DataTableWidgetLazy = lazy(() =>
  import('./data-table/DataTableWidget').then((m) => ({ default: m.DataTableWidget }))
);

export const GaugeWidgetLazy = lazy(() =>
  import('./gauge/GaugeWidget').then((m) => ({ default: m.GaugeWidget }))
);

export const GeographicMapWidgetLazy = lazy(() =>
  import('./geographic-map/GeographicMapWidget').then((m) => ({ default: m.GeographicMapWidget }))
);

// Регистрация всех виджетов
export function registerWidgets() {
  widgetRegistry.register(new TimeSeriesWidget());
  widgetRegistry.register(new MetricCardWidget());
  widgetRegistry.register(new DataTableWidget());
  widgetRegistry.register(new GaugeWidget());
  widgetRegistry.register(new GeographicMapWidget());
}

export { widgetRegistry };
export * from './base/types';
export * from './base/BaseWidget';
