import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api/dashboards';
import { useDashboardStore } from '@/core/stores/dashboardStore';
import { registerWidgets } from '@/modules/widgets';
import { DashboardCanvas } from '../components/DashboardCanvas';
import { WidgetPalette } from '../components/WidgetPalette';
import { PropertiesPanel } from '../components/PropertiesPanel';
import { Toolbar } from '../components/Toolbar';
import { generateId } from '@/lib/utils';
import type { Dashboard } from '../types';

export function DashboardBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  const { setCurrentDashboard, widgets, updateDashboard } = useDashboardStore();

  // Регистрируем виджеты при монтировании
  useEffect(() => {
    registerWidgets();
  }, []);

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['dashboard', id],
    queryFn: () => (id ? dashboardApi.getById(id) : null),
    enabled: !!id && id !== 'new',
  });

  useEffect(() => {
    if (id === 'new') {
      // Создаем новый дашборд
      const newDashboard: Dashboard = {
        id: generateId(),
        name: 'Новый дашборд',
        widgets: [],
        accessLevel: 'private',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCurrentDashboard(newDashboard);
    } else if (dashboard) {
      setCurrentDashboard(dashboard);
    }
  }, [dashboard, id, setCurrentDashboard]);

  const handleSave = async () => {
    const currentDashboard = useDashboardStore.getState().currentDashboard;
    if (!currentDashboard) return;

    try {
      if (id === 'new' || !id) {
        const created = await dashboardApi.create({
          ...currentDashboard,
          widgets,
        });
        navigate(`/dashboards/${created.id}`);
      } else {
        await dashboardApi.update(id, {
          ...currentDashboard,
          widgets,
        });
      }
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Левая панель - Палитра виджетов */}
      {isLeftPanelOpen && (
        <div className="w-64 border-r bg-card overflow-y-auto">
          <WidgetPalette />
        </div>
      )}

      {/* Центральная область - Canvas */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Toolbar
          onSave={handleSave}
          onToggleLeftPanel={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
          onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)}
        />
        <div className="flex-1 overflow-auto bg-muted/20 p-4">
          <DashboardCanvas />
        </div>
      </div>

      {/* Правая панель - Свойства */}
      {isRightPanelOpen && (
        <div className="w-80 border-l bg-card overflow-y-auto">
          <PropertiesPanel />
        </div>
      )}
    </div>
  );
}

