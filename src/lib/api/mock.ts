// Моки для работы без бэкенда
import type { Dashboard } from '@/modules/dashboard/types';
import type { DataSource } from '@/modules/data-sources/types';
import { generateId } from '@/lib/utils';

const mockDashboards: Dashboard[] = [];
const mockDataSources: DataSource[] = [];

export const mockApi = {
  dashboards: {
    getAll: async (): Promise<Dashboard[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve([...mockDashboards]), 300);
      });
    },
    getById: async (id: string): Promise<Dashboard | null> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const dashboard = mockDashboards.find((d) => d.id === id);
          resolve(dashboard || null);
        }, 300);
      });
    },
    create: async (data: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dashboard> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newDashboard: Dashboard = {
            ...data,
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          mockDashboards.push(newDashboard);
          resolve(newDashboard);
        }, 300);
      });
    },
    update: async (id: string, data: Partial<Dashboard>): Promise<Dashboard> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = mockDashboards.findIndex((d) => d.id === id);
          if (index === -1) {
            reject(new Error('Dashboard not found'));
            return;
          }
          mockDashboards[index] = {
            ...mockDashboards[index],
            ...data,
            updatedAt: new Date().toISOString(),
          };
          resolve(mockDashboards[index]);
        }, 300);
      });
    },
    delete: async (id: string): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockDashboards.findIndex((d) => d.id === id);
          if (index !== -1) {
            mockDashboards.splice(index, 1);
          }
          resolve();
        }, 300);
      });
    },
  },
  dataSources: {
    getAll: async (): Promise<DataSource[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve([...mockDataSources]), 300);
      });
    },
    getById: async (id: string): Promise<DataSource | null> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const source = mockDataSources.find((d) => d.id === id);
          resolve(source || null);
        }, 300);
      });
    },
    create: async (
      data: Omit<DataSource, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<DataSource> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newSource: DataSource = {
            ...data,
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          mockDataSources.push(newSource);
          resolve(newSource);
        }, 300);
      });
    },
    update: async (id: string, data: Partial<DataSource>): Promise<DataSource> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = mockDataSources.findIndex((d) => d.id === id);
          if (index === -1) {
            reject(new Error('DataSource not found'));
            return;
          }
          mockDataSources[index] = {
            ...mockDataSources[index],
            ...data,
            updatedAt: new Date().toISOString(),
          };
          resolve(mockDataSources[index]);
        }, 300);
      });
    },
    delete: async (id: string): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const index = mockDataSources.findIndex((d) => d.id === id);
          if (index !== -1) {
            mockDataSources.splice(index, 1);
          }
          resolve();
        }, 300);
      });
    },
    test: async (): Promise<{ success: boolean; message?: string }> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 500);
      });
    },
  },
};

