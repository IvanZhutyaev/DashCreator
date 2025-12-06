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
import { MetricCardDisplay } from './MetricCardDisplay';
import { MetricCardEditPanel } from './MetricCardEditPanel';

export class MetricCardWidget extends BaseWidget {
  id = 'metric_card';
  name = 'Метрика';
  description = 'Отображение ключевой метрики с дельтой и трендом';
  defaultConfig: WidgetConfig = {
    valueField: 'value',
    title: 'Метрика',
    showDelta: true,
    showSparkline: true,
    format: 'number',
  };
  defaultSize = { width: 3, height: 2 };

  async getData(params: WidgetParams): Promise<WidgetData> {
    return {
      data: [],
      fields: [],
    };
  }

  render(options: RenderOptions): React.ReactNode {
    return (
      <MetricCardDisplay
        data={options.data.data}
        config={options.config}
        width={options.width}
        height={options.height}
      />
    );
  }

  validateConfig(config: WidgetConfig): ValidationResult {
    const errors: string[] = [];

    if (!config.valueField) {
      errors.push('Не указано поле для значения');
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  getEditPanel(): React.ComponentType<EditPanelProps> {
    return MetricCardEditPanel;
  }
}

