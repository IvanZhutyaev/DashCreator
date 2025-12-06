import { DATA_SOURCE_TYPES, AUTH_TYPES } from '@/core/constants';

export type DataSourceType = (typeof DATA_SOURCE_TYPES)[keyof typeof DATA_SOURCE_TYPES];
export type AuthType = (typeof AUTH_TYPES)[keyof typeof AUTH_TYPES];

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  config: DataSourceConfig;
  auth?: AuthConfig;
  cacheTTL?: number; // milliseconds
  refreshInterval?: number; // milliseconds
  createdAt: string;
  updatedAt: string;
}

export interface DataSourceConfig {
  url?: string; // for REST API, GraphQL
  endpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  query?: string; // for GraphQL
  file?: File; // for CSV/Excel
  sheetId?: string; // for Google Sheets
  range?: string; // for Google Sheets
}

export interface AuthConfig {
  type: AuthType;
  token?: string; // for Bearer
  username?: string; // for Basic
  password?: string; // for Basic
  clientId?: string; // for OAuth2
  clientSecret?: string; // for OAuth2
  accessToken?: string; // for OAuth2
  refreshToken?: string; // for OAuth2
}

export interface DataSourceTestResult {
  success: boolean;
  message?: string;
  sampleData?: unknown[];
  fields?: string[];
}

