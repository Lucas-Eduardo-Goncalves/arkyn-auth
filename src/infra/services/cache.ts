interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

class CacheService {
  private cache: Map<string, CacheItem<any>> = new Map();
  private defaultTTL: number;

  constructor(defaultTTL = DEFAULT_TTL) {
    this.defaultTTL = defaultTTL;
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) {
      return null;
    }

    const now = Date.now();
    const isExpired = now > item.timestamp + item.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    };

    this.cache.set(key, item);
  }

  cleanExpired(): number {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, item] of this.cache.entries()) {
      const isExpired = now > item.timestamp + item.ttl;

      if (isExpired) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    return cleaned;
  }
}

const cache = new CacheService();

export { cache };
