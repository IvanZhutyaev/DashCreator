import { describe, it, expect } from 'vitest';
import { formatNumber, generateId, debounce } from '@/lib/utils';

describe('utils', () => {
  describe('formatNumber', () => {
    it('should format large numbers', () => {
      expect(formatNumber(1000)).toBe('1.0K');
      expect(formatNumber(1000000)).toBe('1.0M');
      expect(formatNumber(1000000000)).toBe('1.0B');
    });

    it('should return string for small numbers', () => {
      expect(formatNumber(100)).toBe('100');
      expect(formatNumber(999)).toBe('999');
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^\d+-[a-z0-9]+$/);
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let callCount = 0;
      const fn = debounce(() => {
        callCount++;
      }, 100);

      fn();
      fn();
      fn();

      expect(callCount).toBe(0);

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });
  });
});

