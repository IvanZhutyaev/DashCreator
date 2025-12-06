import { useEffect, useState } from 'react';
import { wsService } from '@/lib/websocket/WebSocketService';
import { useDashboardStore } from '@/core/stores/dashboardStore';

interface RealtimeUpdate {
  dashboardId: string;
  widgetId: string;
  data: unknown[];
}

export function useRealtimeUpdates(enabled: boolean = true) {
  const [isConnected, setIsConnected] = useState(false);
  const { currentDashboard, widgets, updateWidget } = useDashboardStore();

  useEffect(() => {
    if (!enabled || !currentDashboard) return;

    // Подключение к WebSocket
    wsService.connect();

    // Обработка подключения
    const unsubscribeConnected = wsService.on('connected', () => {
      setIsConnected(true);
      // Подписываемся на обновления для этого дашборда
      wsService.send('subscribe', { dashboardId: currentDashboard.id });
    });

    // Обработка обновлений данных
    const unsubscribeUpdate = wsService.on('data_update', (update: RealtimeUpdate) => {
      if (update.dashboardId === currentDashboard.id) {
        // Обновляем данные виджета
        const widget = widgets.find((w) => w.id === update.widgetId);
        if (widget) {
          // Здесь можно обновить данные виджета
          // В реальном приложении нужно сохранить данные в виджете
          console.log('Real-time update for widget:', update.widgetId, update.data);
        }
      }
    });

    // Обработка отключения
    const unsubscribeDisconnected = wsService.on('disconnected', () => {
      setIsConnected(false);
    });

    return () => {
      unsubscribeConnected();
      unsubscribeUpdate();
      unsubscribeDisconnected();
      wsService.disconnect();
    };
  }, [enabled, currentDashboard?.id, widgets]);

  return { isConnected };
}

