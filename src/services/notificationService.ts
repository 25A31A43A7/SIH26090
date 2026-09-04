import { Notification, UserRole } from '../types';
import { SEED_NOTIFICATIONS } from '../data/seedData';
import { storageService } from './storageService';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

type NotificationListener = (notifications: Notification[]) => void;
type ToastListener = (toasts: ToastMessage[]) => void;

class NotificationService {
  private notifications: Notification[] = [];
  private activeToasts: ToastMessage[] = [];
  private notifListeners: Set<NotificationListener> = new Set();
  private toastListeners: Set<ToastListener> = new Set();

  constructor() {
    this.notifications = storageService.getItem<Notification[]>('notifications', SEED_NOTIFICATIONS);
  }

  getNotifications(role?: UserRole | 'ALL', userId?: string): Notification[] {
    if (!role || role === 'ALL') {
      return [...this.notifications];
    }
    return this.notifications.filter(
      (n) => n.recipientRole === 'ALL' || n.recipientRole === role || (userId && n.recipientId === userId)
    );
  }

  getUnreadCount(role?: UserRole | 'ALL', userId?: string): number {
    return this.getNotifications(role, userId).filter((n) => !n.read).length;
  }

  addNotification(notification: Omit<Notification, 'notificationId' | 'timestamp' | 'read'>): Notification {
    const newNotif: Notification = {
      ...notification,
      notificationId: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      read: false
    };

    this.notifications = [newNotif, ...this.notifications];
    storageService.setItem('notifications', this.notifications);
    this.notifyNotifListeners();

    // Also trigger a toast popup
    this.showToast(newNotif.title, newNotif.message, 'info');

    // Play subtle synthesized audio cue
    this.playAudioCue();

    return newNotif;
  }

  markAsRead(notificationId: string): void {
    this.notifications = this.notifications.map((n) =>
      n.notificationId === notificationId ? { ...n, read: true } : n
    );
    storageService.setItem('notifications', this.notifications);
    this.notifyNotifListeners();
  }

  markAllAsRead(role?: UserRole, userId?: string): void {
    this.notifications = this.notifications.map((n) => {
      if (!role || n.recipientRole === role || n.recipientRole === 'ALL' || (userId && n.recipientId === userId)) {
        return { ...n, read: true };
      }
      return n;
    });
    storageService.setItem('notifications', this.notifications);
    this.notifyNotifListeners();
  }

  showToast(title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info', duration = 4500): void {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastMessage = { id, title, message, type, duration };

    this.activeToasts = [...this.activeToasts, newToast];
    this.notifyToastListeners();

    setTimeout(() => {
      this.removeToast(id);
    }, duration);
  }

  removeToast(id: string): void {
    this.activeToasts = this.activeToasts.filter((t) => t.id !== id);
    this.notifyToastListeners();
  }

  subscribeNotifications(listener: NotificationListener): () => void {
    this.notifListeners.add(listener);
    listener([...this.notifications]);
    return () => {
      this.notifListeners.delete(listener);
    };
  }

  subscribeToasts(listener: ToastListener): () => void {
    this.toastListeners.add(listener);
    listener([...this.activeToasts]);
    return () => {
      this.toastListeners.delete(listener);
    };
  }

  private notifyNotifListeners() {
    this.notifListeners.forEach((l) => l([...this.notifications]));
  }

  private notifyToastListeners() {
    this.toastListeners.forEach((l) => l([...this.activeToasts]));
  }

  private playAudioCue() {
    try {
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      }
    } catch {
      // Audio context might be restricted before user interaction, silent fallback
    }
  }
}

export const notificationService = new NotificationService();
