/**
 * Versioned Local Storage Abstraction
 * Handles serialization, version checks, and storage fallback errors gracefully.
 */

const STORAGE_PREFIX = 'rdd_v1_';

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      if (item === null) return fallback;
      return JSON.parse(item) as T;
    } catch (err) {
      console.warn(`Error reading localStorage key "${key}":`, err);
      return fallback;
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn(`Error setting localStorage key "${key}":`, err);
      return false;
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (err) {
      console.warn(`Error removing localStorage key "${key}":`, err);
    }
  },

  clear(): void {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith(STORAGE_PREFIX))
        .forEach(k => localStorage.removeItem(k));
    } catch (err) {
      console.warn('Error clearing app storage:', err);
    }
  }
};
