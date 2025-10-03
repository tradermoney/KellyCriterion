/**
 * IndexedDB 存储工具类
 * 用于持久化用户的配置和偏好设置
 */

const DB_NAME = 'KellyCriterionDB';
const DB_VERSION = 1;
const STORE_NAME = 'appState';

interface StorageData {
  key: string;
  value: any;
  timestamp: number;
}

class IndexedDBStorage {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void> | null = null;

  /**
   * 初始化数据库
   */
  private async init(): Promise<void> {
    if (this.db) return;
    
    if (this.initPromise) {
      await this.initPromise;
      return;
    }

    this.initPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('IndexedDB 打开失败', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // 创建对象存储
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });

    await this.initPromise;
  }

  /**
   * 保存数据
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await this.init();
      
      if (!this.db) {
        throw new Error('数据库未初始化');
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        const data: StorageData = {
          key,
          value,
          timestamp: Date.now()
        };

        const request = store.put(data);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`IndexedDB 保存失败 (${key}):`, error);
      // 降级到 localStorage
      this.fallbackToLocalStorage(key, value);
    }
  }

  /**
   * 读取数据
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      await this.init();
      
      if (!this.db) {
        throw new Error('数据库未初始化');
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);

        request.onsuccess = () => {
          const result = request.result as StorageData | undefined;
          resolve(result ? result.value : null);
        };
        
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`IndexedDB 读取失败 (${key}):`, error);
      // 降级到 localStorage
      return this.fallbackGetFromLocalStorage<T>(key);
    }
  }

  /**
   * 删除数据
   */
  async removeItem(key: string): Promise<void> {
    try {
      await this.init();
      
      if (!this.db) {
        throw new Error('数据库未初始化');
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(key);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error(`IndexedDB 删除失败 (${key}):`, error);
      // 降级到 localStorage
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('localStorage 删除失败:', e);
      }
    }
  }

  /**
   * 清空所有数据
   */
  async clear(): Promise<void> {
    try {
      await this.init();
      
      if (!this.db) {
        throw new Error('数据库未初始化');
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('IndexedDB 清空失败:', error);
    }
  }

  /**
   * 获取所有键
   */
  async getAllKeys(): Promise<string[]> {
    try {
      await this.init();
      
      if (!this.db) {
        throw new Error('数据库未初始化');
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAllKeys();

        request.onsuccess = () => {
          resolve(request.result as string[]);
        };
        
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('IndexedDB 获取键失败:', error);
      return [];
    }
  }

  /**
   * 降级到 localStorage（写入）
   */
  private fallbackToLocalStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('localStorage 保存失败:', error);
    }
  }

  /**
   * 降级到 localStorage（读取）
   */
  private fallbackGetFromLocalStorage<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('localStorage 读取失败:', error);
      return null;
    }
  }
}

// 导出单例
export const storage = new IndexedDBStorage();

// 存储键常量
export const STORAGE_KEYS = {
  SIMULATION_CONFIG: 'simulation_config',
  THEME: 'theme',
  LANGUAGE: 'language',
  LAST_RESULT: 'last_result',
} as const;

