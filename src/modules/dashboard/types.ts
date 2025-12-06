import { WIDGET_TYPES } from '@/core/constants';

export type WidgetType = (typeof WIDGET_TYPES)[keyof typeof WIDGET_TYPES];

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  x: number; // grid column start (0-based)
  y: number; // grid row start (0-based)
  width: number; // grid columns
  height: number; // grid rows
  config: Record<string, unknown>;
  dataSourceId?: string;
  filters?: Filter[];
  zIndex?: number;
}

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  widgets: Widget[];
  globalFilters?: Filter[];
  accessLevel: 'private' | 'team' | 'public';
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface Filter {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'gt' | 'lt' | 'gte' | 'lte' | 'between' | 'in';
  value: unknown;
}

export interface DashboardState {
  currentDashboard: Dashboard | null;
  widgets: Widget[];
  selectedWidgetId: string | null;
  history: Array<{ widgets: Widget[] }>;
  historyIndex: number;
}

