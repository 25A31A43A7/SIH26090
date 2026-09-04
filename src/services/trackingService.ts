import { TrackingEvent } from '../types';
import { SEED_TRACKING_EVENTS, DEMO_TRACKING_ID } from '../data/seedData';
import { storageService } from './storageService';

type TrackingListener = (events: TrackingEvent[]) => void;

class TrackingService {
  private events: TrackingEvent[] = [];
  private listeners: Set<TrackingListener> = new Set();

  constructor() {
    this.events = storageService.getItem<TrackingEvent[]>('tracking_events', SEED_TRACKING_EVENTS);
  }

  getEventsForTrackingId(trackingId: string): TrackingEvent[] {
    return this.events.filter((e) => e.trackingId.toUpperCase() === trackingId.trim().toUpperCase());
  }

  getAllEvents(): TrackingEvent[] {
    return [...this.events];
  }

  addEvent(
    trackingId: string,
    status: string,
    title: string,
    description: string,
    actorRole: string,
    actorId: string,
    generalLocation: string,
    checkpointIndex: number
  ): TrackingEvent {
    const newEvent: TrackingEvent = {
      trackingEventId: `trk_ev_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      trackingId: trackingId.toUpperCase(),
      status,
      title,
      description,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      actorRole,
      actorId,
      generalLocation,
      checkpointIndex,
      isCompleted: true
    };

    this.events = [...this.events, newEvent];
    storageService.setItem('tracking_events', this.events);
    this.notify();
    return newEvent;
  }

  subscribe(listener: TrackingListener): () => void {
    this.listeners.add(listener);
    listener([...this.events]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l([...this.events]));
  }
}

export const trackingService = new TrackingService();
