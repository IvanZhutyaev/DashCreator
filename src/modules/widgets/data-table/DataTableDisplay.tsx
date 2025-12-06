import type { WidgetConfig } from '../base/types';

interface DataTableDisplayProps {
  data: unknown[];
  config: WidgetConfig;
  width: number;
  height: number;
}

export function DataTableDisplay({ config }: DataTableDisplayProps) {
  const columns = (config.columns as string[]) || [];
  const pageSize = (config.pageSize as number) || 10;

  // Моковые данные
  const mockData = [
    { id: 1, name: 'Элемент 1', value: 100 },
    { id: 2, name: 'Элемент 2', value: 200 },
    { id: 3, name: 'Элемент 3', value: 150 },
  ];

  const tableData = (data.length > 0 ? data : mockData) as Array<Record<string, unknown>>;
  const displayColumns = columns.length > 0 ? columns : Object.keys(tableData[0] || {});

  return (
    <div className="w-full h-full p-4 overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            {displayColumns.map((col) => (
              <th key={col} className="text-left p-2 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.slice(0, pageSize).map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-muted/50">
              {displayColumns.map((col) => (
                <td key={col} className="p-2">
                  {String(row[col] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {tableData.length > pageSize && (
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Показано {pageSize} из {tableData.length} записей
        </div>
      )}
    </div>
  );
}

