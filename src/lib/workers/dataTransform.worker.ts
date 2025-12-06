// Web Worker для трансформации данных
// Используется для тяжелых вычислений без блокировки UI

export interface TransformMessage {
  type: 'transform';
  data: unknown[];
  config: {
    aggregation?: 'sum' | 'average' | 'count' | 'distinct' | 'min' | 'max';
    field?: string;
    groupBy?: string;
  };
}

export interface TransformResult {
  type: 'result';
  data: unknown[];
}

self.onmessage = (e: MessageEvent<TransformMessage>) => {
  if (e.data.type === 'transform') {
    const { data, config } = e.data;
    let result: unknown[] = [];

    try {
      if (config.aggregation && config.field) {
        result = performAggregation(data, config);
      } else {
        result = data;
      }

      const response: TransformResult = {
        type: 'result',
        data: result,
      };

      self.postMessage(response);
    } catch (error) {
      self.postMessage({
        type: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
};

function performAggregation(
  data: unknown[],
  config: TransformMessage['config']
): unknown[] {
  if (!config.aggregation || !config.field) return data;

  const field = config.field;
  const aggregation = config.aggregation;

  if (config.groupBy) {
    // Группировка по полю
    const groups = new Map<string, unknown[]>();

    for (const item of data) {
      const record = item as Record<string, unknown>;
      const groupKey = String(record[config.groupBy] || '');
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push(item);
    }

    const result: unknown[] = [];
    for (const [key, groupData] of groups.entries()) {
      const aggregated = aggregateGroup(groupData, field, aggregation);
      result.push({ [config.groupBy!]: key, [field]: aggregated });
    }
    return result;
  } else {
    // Агрегация всех данных
    const aggregated = aggregateGroup(data, field, aggregation);
    return [{ [field]: aggregated }];
  }
}

function aggregateGroup(
  data: unknown[],
  field: string,
  aggregation: string
): number {
  const values = data
    .map((item) => {
      const record = item as Record<string, unknown>;
      const value = record[field];
      return typeof value === 'number' ? value : 0;
    })
    .filter((v) => !isNaN(v));

  switch (aggregation) {
    case 'sum':
      return values.reduce((a, b) => a + b, 0);
    case 'average':
      return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    case 'count':
      return values.length;
    case 'distinct':
      return new Set(values).size;
    case 'min':
      return values.length > 0 ? Math.min(...values) : 0;
    case 'max':
      return values.length > 0 ? Math.max(...values) : 0;
    default:
      return 0;
  }
}

