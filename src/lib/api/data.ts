import { apiClient } from './client';

export interface DataQuery {
  dataSourceId: string;
  filters?: unknown[];
  dateRange?: {
    from: string;
    to: string;
  };
  fields?: string[];
  aggregation?: {
    field: string;
    type: 'sum' | 'average' | 'count' | 'distinct' | 'min' | 'max';
  };
}

export const dataApi = {
  query: (query: DataQuery) => apiClient.post<unknown[]>('/data/query', query),
};

