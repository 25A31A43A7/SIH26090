// Central storage service with localStorage persistence and offline queue

class StorageService {
  private isOnlineStatus: boolean = true;
  private offlineQueue: Array<{ action: string; payload: any; timestamp: string }> = [];

  constructor() {
    this.isOnlineStatus = typeof navigator !== 'undefined' ? navigator.onLine : true;
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnlineStatus = true;
        this.flushOfflineQueue();
      });
      window.addEventListener('offline', () => {
        this.isOnlineStatus = false;
      });
    }
  }

  getItem<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(`shilpsetu_${key}`);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn(`Error reading localStorage key "${key}":`, e);
      return defaultValue;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`shilpsetu_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing localStorage key "${key}":`, e);
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(`shilpsetu_${key}`);
    } catch (e) {
      console.warn(`Error removing localStorage key "${key}":`, e);
    }
  }

  isOnline(): boolean {
    return this.isOnlineStatus;
  }

  enqueueOfflineAction(action: string, payload: any): void {
    this.offlineQueue.push({ action, payload, timestamp: new Date().toISOString() });
    this.setItem('offline_queue', this.offlineQueue);
  }

  getOfflineQueue() {
    return this.offlineQueue;
  }

  clearOfflineQueue() {
    this.offlineQueue = [];
    this.setItem('offline_queue', []);
  }

  private flushOfflineQueue() {
    if (this.offlineQueue.length > 0) {
      console.log(`[ShilpSetu Offline Sync] Synchronized ${this.offlineQueue.length} queued offline actions.`);
      this.clearOfflineQueue();
    }
  }
}

export const storageService = new StorageService();
