import { useState } from 'react';
import type { WidgetConfig } from '../base/types';

interface GeographicMapDisplayProps {
  data: unknown[];
  config: WidgetConfig;
  width: number;
  height: number;
}

// Упрощенная карта для демонстрации
// В продакшне можно использовать deck.gl или leaflet
export function GeographicMapDisplay({ config }: GeographicMapDisplayProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const mapType = (config.mapType as string) || 'choropleth';
  const locationField = (config.locationField as string) || 'country';
  const valueField = (config.valueField as string) || 'value';
  const showTooltips = config.showTooltips !== false;

  // Моковые данные для демонстрации
  const mockData = [
    { country: 'Россия', value: 1000 },
    { country: 'США', value: 2000 },
    { country: 'Китай', value: 1500 },
    { country: 'Германия', value: 800 },
    { country: 'Франция', value: 600 },
  ];

  const tableData = mockData as Array<Record<string, unknown>>;

  const getColor = (value: number) => {
    const max = Math.max(...tableData.map((d) => Number(d[valueField]) || 0));
    const intensity = (value / max) * 100;
    
    if (intensity > 75) return 'bg-blue-700';
    if (intensity > 50) return 'bg-blue-500';
    if (intensity > 25) return 'bg-blue-300';
    return 'bg-blue-100';
  };

  return (
    <div className="w-full h-full p-4">
      <div className="h-full border rounded-lg bg-muted/20 relative overflow-hidden">
        {/* Упрощенная визуализация карты */}
        <div className="p-4">
          <h3 className="text-sm font-semibold mb-4">
            {mapType === 'choropleth' ? 'Хороплет карта' : 'Bubble карта'}
          </h3>
          
          <div className="space-y-2">
            {tableData.map((item, idx) => {
              const location = String(item[locationField] || '');
              const value = Number(item[valueField] || 0);
              const isHovered = hoveredRegion === location;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-2 rounded transition-all ${
                    isHovered ? 'bg-accent' : ''
                  }`}
                  onMouseEnter={() => setHoveredRegion(location)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  <div className={`w-16 h-12 rounded ${getColor(value)} flex items-center justify-center text-white text-xs font-bold`}>
                    {mapType === 'bubble' ? (
                      <div
                        className="rounded-full bg-primary"
                        style={{
                          width: `${Math.min(value / 10, 40)}px`,
                          height: `${Math.min(value / 10, 40)}px`,
                        }}
                      />
                    ) : (
                      location.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{location}</div>
                    <div className="text-sm text-muted-foreground">{value.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {showTooltips && hoveredRegion && (
            <div className="absolute bottom-4 left-4 bg-popover border rounded-lg p-3 shadow-lg z-10">
              <div className="font-semibold">{hoveredRegion}</div>
              <div className="text-sm text-muted-foreground">
                Значение:{' '}
                {tableData.find((d) => String(d[locationField]) === hoveredRegion)?.[valueField]}
              </div>
            </div>
          )}

          <div className="mt-4 text-xs text-muted-foreground text-center">
            💡 В продакшне здесь будет интерактивная карта (Leaflet/Deck.gl)
          </div>
        </div>
      </div>
    </div>
  );
}

