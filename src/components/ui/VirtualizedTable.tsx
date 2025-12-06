import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { WidgetConfig } from '@/modules/widgets/base/types';

interface VirtualizedTableProps {
  data: unknown[];
  config: WidgetConfig;
  height: number;
}

export function VirtualizedTable({ data, config, height }: VirtualizedTableProps) {
  const columns = (config.columns as string[]) || [];
  const tableData = data as Array<Record<string, unknown>>;
  const displayColumns = columns.length > 0 ? columns : Object.keys(tableData[0] || {});

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: tableData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      style={{ height, overflow: 'auto' }}
      className="w-full"
    >
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-background z-10">
          <tr className="border-b">
            {displayColumns.map((col) => (
              <th key={col} className="text-left p-2 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = tableData[virtualRow.index];
            return (
              <tr
                key={virtualRow.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="border-b hover:bg-muted/50"
              >
                {displayColumns.map((col) => (
                  <td key={col} className="p-2">
                    {String(row[col] ?? '')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

