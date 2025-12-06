import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { dataCache } from '@/lib/cache/DataCache';

describe('DataCache', () => {
  beforeEach(() => {
    dataCache.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should store and retrieve data', () => {
    dataCache.set('test', { value: 123 }, 1000);
    expect(dataCache.get('test')).toEqual({ value: 123 });
  });

  it('should return null for expired entries', () => {
    dataCache.set('test', { value: 123 }, 1000);
    vi.advanceTimersByTime(1500);
    expect(dataCache.get('test')).toBeNull();
  });

  it('should check if key exists', () => {
    dataCache.set('test', { value: 123 }, 1000);
    expect(dataCache.has('test')).toBe(true);
    expect(dataCache.has('nonexistent')).toBe(false);
  });

  it('should delete entries', () => {
    dataCache.set('test', { value: 123 }, 1000);
    dataCache.delete('test');
    expect(dataCache.get('test')).toBeNull();
  });
});

