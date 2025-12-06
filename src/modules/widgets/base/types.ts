import type { Widget } from '@/modules/dashboard/types';
import type { Filter } from '@/modules/dashboard/types';

export interface WidgetParams {
  widget: Widget;
  dataSourceId?: string;
  filters?: Filter[];
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface WidgetData {
  data: unknown[];
  fields?: string[];
  metadata?: Record<string, unknown>;
}

export interface RenderOptions {
  data: WidgetData;
  config: Widget['config'];
  width: number;
  height: number;
  isEditing?: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

export interface WidgetConfig {
  [key: string]: unknown;
}

export interface EditPanelProps {
  config: WidgetConfig;
  onChange: (config: WidgetConfig) => void;
  widget: Widget;
}

export interface BaseWidgetDefinition {
  id: string;
  name: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  defaultConfig: WidgetConfig;
  defaultSize: {
    width: number;
    height: number;
  };
  minSize?: {
    width: number;
    height: number;
  };
  maxSize?: {
    width: number;
    height: number;
  };
}

