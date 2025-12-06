import React from 'react';
import { BaseWidget } from '../base/BaseWidget';
import type {
  WidgetParams,
  WidgetData,
  RenderOptions,
  ValidationResult,
  WidgetConfig,
  EditPanelProps,
} from '../base/types';
import { TimeSeriesChart } from './TimeSeriesChart';
import { TimeSeriesEditPanel } from './TimeSeriesEditPanel';

export class TimeSeriesWidget extends BaseWidget {
  id = 'time_series';
  name = 'Временной ряд';
  description = 'График изменения метрик во времени';
  defaultConfig: WidgetConfig = {
    chartType: 'line',
    xAxisField: 'date',
    yAxisFields: [],
    showLegend: true,
    showGrid: true,
    stacked: false,
    cumulative: false,
  };
  defaultSize = { width: 6, height: 4 };

  async getData(params: WidgetParams): Promise<WidgetData> {
    // В реальном приложении здесь будет запрос к API
    // Пока возвращаем моковые данные
    return {
      data: [],
      fields: [],
    };
  }

  render(options: RenderOptions): React.ReactNode {
    return (
      <TimeSeriesChart
        data={options.data.data}
        config={options.config}
        width={options.width}
        height={options.height}
      />
    );
  }

  validateConfig(config: WidgetConfig): ValidationResult {
    const errors: string[] = [];

    if (!config.xAxisField) {
      errors.push('Не указано поле для оси X');
    }

    if (!Array.isArray(config.yAxisFields) || config.yAxisFields.length === 0) {
      errors.push('Не указаны поля для оси Y');
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  getEditPanel(): React.ComponentType<EditPanelProps> {
    return TimeSeriesEditPanel;
  }
}

