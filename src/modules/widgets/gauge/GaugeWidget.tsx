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
import { GaugeDisplay } from './GaugeDisplay';
import { GaugeEditPanel } from './GaugeEditPanel';

export class GaugeWidget extends BaseWidget {
  id = 'gauge';
  name = 'Индикатор';
  description = 'Круговой индикатор прогресса с целевыми зонами';
  defaultConfig: WidgetConfig = {
    value: 0,
    min: 0,
    max: 100,
    target: 80,
    showTarget: true,
  };
  defaultSize = { width: 3, height: 3 };

  async getData(params: WidgetParams): Promise<WidgetData> {
    return {
      data: [],
      fields: [],
    };
  }

  render(options: RenderOptions): React.ReactNode {
    return (
      <GaugeDisplay
        data={options.data.data}
        config={options.config}
        width={options.width}
        height={options.height}
      />
    );
  }

  validateConfig(config: WidgetConfig): ValidationResult {
    const errors: string[] = [];
    const min = (config.min as number) || 0;
    const max = (config.max as number) || 100;
    const value = (config.value as number) || 0;

    if (min >= max) {
      errors.push('Минимум должен быть меньше максимума');
    }

    if (value < min || value > max) {
      errors.push('Значение должно быть в диапазоне min-max');
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  getEditPanel(): React.ComponentType<EditPanelProps> {
    return GaugeEditPanel;
  }
}

