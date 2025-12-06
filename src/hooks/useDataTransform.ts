import { useState, useCallback } from 'react';

interface TransformConfig {
  aggregation?: 'sum' | 'average' | 'count' | 'distinct' | 'min' | 'max';
  field?: string;
  groupBy?: string;
}

export function useDataTransform() {
  const [isProcessing, setIsProcessing] = useState(false);

  const transform = useCallback(async (data: unknown[], config: TransformConfig) => {
    // Для простых операций выполняем синхронно
    // Для сложных - можно использовать Web Worker
    if (data.length < 1000) {
      // Малые объемы - синхронно
      return performTransformSync(data, config);
    }

    // Большие объемы - через Web Worker
    setIsProcessing(true);
    try {
      return await performTransformAsync(data, config);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { transform, isProcessing };
}

function performTransformSync(data: unknown[], config: TransformConfig): unknown[] {
  if (!config.aggregation || !config.field) return data;

  const field = config.field;
  const values = data
    .map((item) => {
      const record = item as Record<string, unknown>;
      return typeof record[field] === 'number' ? record[field] : 0;
    })
    .filter((v) => typeof v === 'number') as number[];

  let result: number;
  switch (config.aggregation) {
    case 'sum':
      result = values.reduce((a, b) => a + b, 0);
      break;
    case 'average':
      result = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      break;
    case 'count':
      result = values.length;
      break;
    case 'distinct':
      result = new Set(values).size;
      break;
    case 'min':
      result = values.length > 0 ? Math.min(...values) : 0;
      break;
    case 'max':
      result = values.length > 0 ? Math.max(...values) : 0;
      break;
    default:
      result = 0;
  }

  return [{ [field]: result }];
}

async function performTransformAsync(
  data: unknown[],
  config: TransformConfig
): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL('../lib/workers/dataTransform.worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.onmessage = (e) => {
      if (e.data.type === 'result') {
        worker.terminate();
        resolve(e.data.data);
      } else if (e.data.type === 'error') {
        worker.terminate();
        reject(new Error(e.data.error));
      }
    };

    worker.onerror = (error) => {
      worker.terminate();
      reject(error);
    };

    worker.postMessage({
      type: 'transform',
      data,
      config,
    });
  });
}

