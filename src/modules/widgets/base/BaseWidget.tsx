import React, { ReactNode } from 'react';
import type {
  WidgetParams,
  WidgetData,
  RenderOptions,
  ValidationResult,
  WidgetConfig,
  EditPanelProps,
} from './types';

export abstract class BaseWidget {
  abstract id: string;
  abstract name: string;
  abstract description: string;
  abstract defaultConfig: WidgetConfig;
  abstract defaultSize: { width: number; height: number };

  abstract getData(params: WidgetParams): Promise<WidgetData>;
  abstract render(options: RenderOptions): ReactNode;
  abstract validateConfig(config: WidgetConfig): ValidationResult;
  abstract getEditPanel(): React.ComponentType<EditPanelProps>;

  getDefaultConfig(): Partial<WidgetConfig> {
    return this.defaultConfig;
  }

  getSupportedDataTypes(): string[] {
    return ['json', 'array'];
  }
}

