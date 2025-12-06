// Моки для работы без бэкенда
// Данные сохраняются в localStorage браузера
import type { Dashboard } from '@/modules/dashboard/types';
import type { DataSource } from '@/modules/data-sources/types';
import { generateId } from '@/lib/utils';

// Ключи для localStorage
const STORAGE_KEYS = {
  DASHBOARDS: 'dashcreator_dashboards',
  DATA_SOURCES: 'dashcreator_data_sources',
} as const;

// Функции для работы с localStorage
function getDashboards(): Dashboard[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DASHBOARDS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveDashboards(dashboards: Dashboard[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DASHBOARDS, JSON.stringify(dashboards));
  } catch (error) {
    console.error('Ошибка сохранения дашбордов:', error);
  }
}

function getDataSources(): DataSource[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DATA_SOURCES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveDataSources(sources: DataSource[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DATA_SOURCES, JSON.stringify(sources));
  } catch (error) {
    console.error('Ошибка сохранения источников:', error);
  }
}

export const mockApi = {
  dashboards: {
    getAll: async (): Promise<Dashboard[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const dashboards = getDashboards();
          resolve([...dashboards]);
        }, 300);
      });
    },
    getById: async (id: string): Promise<Dashboard | null> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const dashboards = getDashboards();
          const dashboard = dashboards.find((d) => d.id === id);
          resolve(dashboard || null);
        }, 300);
      });
    },
    create: async (data: Omit<Dashboard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Dashboard> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const dashboards = getDashboards();
          const newDashboard: Dashboard = {
            ...data,
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          dashboards.push(newDashboard);
          saveDashboards(dashboards);
          resolve(newDashboard);
        }, 300);
      });
    },
    update: async (id: string, data: Partial<Dashboard>): Promise<Dashboard> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const dashboards = getDashboards();
          const index = dashboards.findIndex((d) => d.id === id);
          if (index === -1) {
            reject(new Error('Dashboard not found'));
            return;
          }
          dashboards[index] = {
            ...dashboards[index],
            ...data,
            updatedAt: new Date().toISOString(),
          };
          saveDashboards(dashboards);
          resolve(dashboards[index]);
        }, 300);
      });
    },
    delete: async (id: string): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const dashboards = getDashboards();
          const index = dashboards.findIndex((d) => d.id === id);
          if (index !== -1) {
            dashboards.splice(index, 1);
            saveDashboards(dashboards);
          }
          resolve();
        }, 300);
      });
    },
  },
  dataSources: {
    getAll: async (): Promise<DataSource[]> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const sources = getDataSources();
          resolve([...sources]);
        }, 300);
      });
    },
    getById: async (id: string): Promise<DataSource | null> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const sources = getDataSources();
          const source = sources.find((d) => d.id === id);
          resolve(source || null);
        }, 300);
      });
    },
    create: async (
      data: Omit<DataSource, 'id' | 'createdAt' | 'updatedAt'>
    ): Promise<DataSource> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const sources = getDataSources();
          const newSource: DataSource = {
            ...data,
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          sources.push(newSource);
          saveDataSources(sources);
          resolve(newSource);
        }, 300);
      });
    },
    update: async (id: string, data: Partial<DataSource>): Promise<DataSource> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const sources = getDataSources();
          const index = sources.findIndex((d) => d.id === id);
          if (index === -1) {
            reject(new Error('DataSource not found'));
            return;
          }
          sources[index] = {
            ...sources[index],
            ...data,
            updatedAt: new Date().toISOString(),
          };
          saveDataSources(sources);
          resolve(sources[index]);
        }, 300);
      });
    },
    delete: async (id: string): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const sources = getDataSources();
          const index = sources.findIndex((d) => d.id === id);
          if (index !== -1) {
            sources.splice(index, 1);
            saveDataSources(sources);
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

