import { apiClient } from './client';
import { mockApi } from './mock';
import type { DataSource, DataSourceTestResult } from '@/modules/data-sources/types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_BASE_URL;

export const dataSourceApi = USE_MOCK
  ? mockApi.dataSources
  : {
      getAll: () => apiClient.get<DataSource[]>('/data-sources'),
      getById: (id: string) => apiClient.get<DataSource>(`/data-sources/${id}`),
      create: (data: Omit<DataSource, 'id' | 'createdAt' | 'updatedAt'>) =>
        apiClient.post<DataSource>('/data-sources', data),
      update: (id: string, data: Partial<DataSource>) =>
        apiClient.put<DataSource>(`/data-sources/${id}`, data),
      delete: (id: string) => apiClient.delete<void>(`/data-sources/${id}`),
      test: (data: Partial<DataSource>) =>
        apiClient.post<DataSourceTestResult>('/data-sources/test', data),
    };

