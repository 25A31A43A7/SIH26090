import { SmsLog } from '../types';
import { storageService } from './storageService';
import { notificationService } from './notificationService';

type SmsListener = (logs: SmsLog[]) => void;

class SmsService {
  private logs: SmsLog[] = [];
  private listeners: Set<SmsListener> = new Set();
  private latestSms: SmsLog | null = null;
  private latestSmsListeners: Set<(sms: SmsLog | null) => void> = new Set();

  constructor() {
    this.logs = storageService.getItem<SmsLog[]>('sms_logs', [
      {
        id: 'sms_1',
        phone: '+91 98765 43210',
        message: 'ShilpSetu: Order SHP-2026-7K29A4 has been picked up from Kondapalli Craft Cluster. Track at shilpsetu.in/track',
        timestamp: '03 Sep 2026, 04:30 PM',
        trackingId: 'SHP-2026-7K29A4',
        type: 'PICKUP'
      }
    ]);
  }

  sendSms(phone: string, message: string, trackingId?: string, type: SmsLog['type'] = 'TRANSIT'): SmsLog {
    const newLog: SmsLog = {
      id: `sms_${Date.now()}`,
      phone: phone || '+91 98765 43210',
      message: message,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      trackingId,
      type
    };

    this.logs = [newLog, ...this.logs];
    this.latestSms = newLog;
    storageService.setItem('sms_logs', this.logs);

    // Notify listeners
    this.listeners.forEach((l) => l([...this.logs]));
    this.latestSmsListeners.forEach((l) => l(newLog));

    // Show simulated toast on screen
    notificationService.showToast(
      `📱 SMS Sent to ${phone}`,
      `"${message}"`,
      'info',
      6000
    );

    return newLog;
  }

  getLogs(): SmsLog[] {
    return [...this.logs];
  }

  getLatestSms(): SmsLog | null {
    return this.latestSms;
  }

  subscribeLogs(listener: SmsListener): () => void {
    this.listeners.add(listener);
    listener([...this.logs]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  subscribeLatestSms(listener: (sms: SmsLog | null) => void): () => void {
    this.latestSmsListeners.add(listener);
    listener(this.latestSms);
    return () => {
      this.latestSmsListeners.delete(listener);
    };
  }

  clearLatest() {
    this.latestSms = null;
    this.latestSmsListeners.forEach((l) => l(null));
  }
}

export const smsService = new SmsService();
