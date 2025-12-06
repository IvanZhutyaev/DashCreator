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
import { GeographicMapDisplay } from './GeographicMapDisplay';
import { GeographicMapEditPanel } from './GeographicMapEditPanel';

export class GeographicMapWidget extends BaseWidget {
  id = 'geographic_map';
  name = 'Географическая карта';
  description = 'Интерактивная карта с данными по регионам';
  defaultConfig: WidgetConfig = {
    mapType: 'choropleth', // 'choropleth' | 'bubble'
    locationField: 'country',
    valueField: 'value',
    colorScheme: 'blue',
    showTooltips: true,
  };
  defaultSize = { width: 6, height: 6 };

  async getData(params: WidgetParams): Promise<WidgetData> {
    return {
      data: [],
      fields: [],
    };
  }

  render(options: RenderOptions): React.ReactNode {
    return (
      <GeographicMapDisplay
        data={options.data.data}
        config={options.config}
        width={options.width}
        height={options.height}
      />
    );
  }

  validateConfig(config: WidgetConfig): ValidationResult {
    const errors: string[] = [];

    if (!config.locationField) {
      errors.push('Не указано поле для локации');
    }

    if (!config.valueField) {
      errors.push('Не указано поле для значения');
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  getEditPanel(): React.ComponentType<EditPanelProps> {
    return GeographicMapEditPanel;
  }
}

