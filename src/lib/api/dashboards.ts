import { apiClient } from './client';
import { mockApi } from './mock';
import type { Dashboard } from '@/modules/dashboard/types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_BASE_URL;

export const dashboardApi = USE_MOCK
  ? mockApi.dashboards
  : {
      getAll: () => apiClient.get<Dashboard[]>('/dashboards'),
      getById: (id: string) => apiClient.get<Dashboard>(`/dashboards/${id}`),
      create: (data: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>) =>
        apiClient.post<Dashboard>('/dashboards', data),
      update: (id: string, data: Partial<Dashboard>) =>
        apiClient.put<Dashboard>(`/dashboards/${id}`, data),
      delete: (id: string) => apiClient.delete<void>(`/dashboards/${id}`),
    };

