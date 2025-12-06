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
import { DataTableDisplay } from './DataTableDisplay';
import { DataTableEditPanel } from './DataTableEditPanel';

export class DataTableWidget extends BaseWidget {
  id = 'data_table';
  name = 'Таблица данных';
  description = 'Таблица с сортировкой, фильтрацией и пагинацией';
  defaultConfig: WidgetConfig = {
    columns: [],
    pageSize: 10,
    showPagination: true,
    showSearch: true,
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
      <DataTableDisplay
        data={options.data.data}
        config={options.config}
        width={options.width}
        height={options.height}
      />
    );
  }

  validateConfig(config: WidgetConfig): ValidationResult {
    return {
      valid: true,
    };
  }

  getEditPanel(): React.ComponentType<EditPanelProps> {
    return DataTableEditPanel;
  }
}

