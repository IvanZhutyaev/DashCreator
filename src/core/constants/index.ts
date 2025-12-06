export const CACHE_STRATEGY = {
  realtime: { ttl: 30000, staleWhileRevalidate: true },
  'near-realtime': { ttl: 300000, revalidateOnFocus: true },
  hourly: { ttl: 3600000, revalidateOnMount: true },
} as const;

export const GRID_COLUMNS = 12;
export const GRID_ROW_HEIGHT = 50; // pixels
export const GRID_GAP = 16; // pixels

export const WIDGET_MIN_WIDTH = 2; // columns
export const WIDGET_MIN_HEIGHT = 2; // rows
export const WIDGET_MAX_WIDTH = 12; // columns
export const WIDGET_MAX_HEIGHT = 20; // rows

export const UNDO_REDO_LIMIT = 50;

export const DATA_SOURCE_TYPES = {
  REST_API: 'rest_api',
  GRAPHQL: 'graphql',
  CSV: 'csv',
  EXCEL: 'excel',
  GOOGLE_ANALYTICS: 'google_analytics',
  GOOGLE_SHEETS: 'google_sheets',
} as const;

export const AUTH_TYPES = {
  NONE: 'none',
  BEARER: 'bearer',
  BASIC: 'basic',
  OAUTH2: 'oauth2',
} as const;

export const AGGREGATION_TYPES = {
  SUM: 'sum',
  AVERAGE: 'average',
  COUNT: 'count',
  DISTINCT: 'distinct',
  MIN: 'min',
  MAX: 'max',
} as const;

export const WIDGET_TYPES = {
  TIME_SERIES: 'time_series',
  METRIC_CARD: 'metric_card',
  DATA_TABLE: 'data_table',
  GEOGRAPHIC_MAP: 'geographic_map',
  GAUGE: 'gauge',
} as const;

export const DASHBOARD_ACCESS_LEVELS = {
  PRIVATE: 'private',
  TEAM: 'team',
  PUBLIC: 'public',
} as const;

