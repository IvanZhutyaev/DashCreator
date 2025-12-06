import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Dashboard, Widget, DashboardState } from '@/modules/dashboard/types';

interface DashboardStore extends DashboardState {
  // Actions
  setCurrentDashboard: (dashboard: Dashboard | null) => void;
  addWidget: (widget: Widget) => void;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  removeWidget: (id: string) => void;
  setSelectedWidget: (id: string | null) => void;
  updateDashboard: (updates: Partial<Dashboard>) => void;
  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const initialState: DashboardState = {
  currentDashboard: null,
  widgets: [],
  selectedWidgetId: null,
  history: [],
  historyIndex: -1,
};

export const useDashboardStore = create<DashboardStore>()(
  devtools(
    (set, get): DashboardStore => ({
      ...initialState,

      setCurrentDashboard: (dashboard) => {
        set({
          currentDashboard: dashboard,
          widgets: dashboard?.widgets || [],
          selectedWidgetId: null,
          history: [],
          historyIndex: -1,
        });
      },

      addWidget: (widget) => {
        const state = get();
        const newWidgets = [...state.widgets, widget];
        const newHistory = addToHistory(state, { widgets: newWidgets });
        set({ widgets: newWidgets, history: newHistory.history, historyIndex: newHistory.index });
      },

      updateWidget: (id, updates) => {
        const state = get();
        const newWidgets = state.widgets.map((w) =>
          w.id === id ? { ...w, ...updates } : w
        );
        const newHistory = addToHistory(state, { widgets: newWidgets });
        set({ widgets: newWidgets, history: newHistory.history, historyIndex: newHistory.index });
      },

      removeWidget: (id) => {
        const state = get();
        const newWidgets = state.widgets.filter((w) => w.id !== id);
        const newHistory = addToHistory(state, { widgets: newWidgets });
        set({ widgets: newWidgets, selectedWidgetId: null, history: newHistory.history, historyIndex: newHistory.index });
      },

      setSelectedWidget: (id) => {
        set({ selectedWidgetId: id });
      },

      updateDashboard: (updates) => {
        const state = get();
        const newDashboard = state.currentDashboard
          ? { ...state.currentDashboard, ...updates }
          : null;
        set({ currentDashboard: newDashboard });
      },

      undo: () => {
        const state = get();
        if (state.historyIndex > 0) {
          const newIndex = state.historyIndex - 1;
          const historyState = state.history[newIndex];
          set({
            widgets: historyState.widgets,
            historyIndex: newIndex,
          });
        }
      },

      redo: () => {
        const state = get();
        if (state.historyIndex < state.history.length - 1) {
          const newIndex = state.historyIndex + 1;
          const historyState = state.history[newIndex];
          set({
            widgets: historyState.widgets,
            historyIndex: newIndex,
          });
        }
      },

      canUndo: () => {
        return get().historyIndex > 0;
      },

      canRedo: () => {
        const state = get();
        return state.historyIndex < state.history.length - 1;
      },
    }),
    { name: 'DashboardStore' }
  )
);

function addToHistory(
  state: DashboardStore,
  newState: { widgets: Widget[] }
): { history: Array<{ widgets: Widget[] }>; index: number } {
  const UNDO_REDO_LIMIT = 50;
  const { history, historyIndex } = state;

  // Remove future history if we're not at the end
  const newHistory = history.slice(0, historyIndex + 1);

  // Add new state
  newHistory.push(newState);

  // Limit history size
  if (newHistory.length > UNDO_REDO_LIMIT) {
    newHistory.shift();
  }

  return {
    history: newHistory,
    index: newHistory.length - 1,
  };
}

