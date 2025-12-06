import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { DataSource } from '@/modules/data-sources/types';

interface DataSourceStore {
  dataSources: DataSource[];
  selectedDataSourceId: string | null;
  setDataSources: (sources: DataSource[]) => void;
  addDataSource: (source: DataSource) => void;
  updateDataSource: (id: string, updates: Partial<DataSource>) => void;
  removeDataSource: (id: string) => void;
  setSelectedDataSource: (id: string | null) => void;
}

export const useDataSourceStore = create<DataSourceStore>()(
  devtools(
    (set) => ({
      dataSources: [],
      selectedDataSourceId: null,

      setDataSources: (sources) => {
        set({ dataSources: sources });
      },

      addDataSource: (source) => {
        set((state) => ({
          dataSources: [...state.dataSources, source],
        }));
      },

      updateDataSource: (id, updates) => {
        set((state) => ({
          dataSources: state.dataSources.map((ds) =>
            ds.id === id ? { ...ds, ...updates } : ds
          ),
        }));
      },

      removeDataSource: (id) => {
        set((state) => ({
          dataSources: state.dataSources.filter((ds) => ds.id !== id),
          selectedDataSourceId:
            state.selectedDataSourceId === id ? null : state.selectedDataSourceId,
        }));
      },

      setSelectedDataSource: (id) => {
        set({ selectedDataSourceId: id });
      },
    }),
    { name: 'DataSourceStore' }
  )
);

