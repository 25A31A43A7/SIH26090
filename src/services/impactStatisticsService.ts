import { ImpactStatistics } from '../types';
import { INITIAL_IMPACT_STATISTICS } from '../data/seedData';
import { storageService } from './storageService';

type StatsListener = (stats: ImpactStatistics) => void;

class ImpactStatisticsService {
  private stats: ImpactStatistics;
  private listeners: Set<StatsListener> = new Set();

  constructor() {
    this.stats = storageService.getItem<ImpactStatistics>('impact_stats', INITIAL_IMPACT_STATISTICS);
  }

  getStatistics(): ImpactStatistics {
    return { ...this.stats };
  }

  subscribe(listener: StatsListener): () => void {
    this.listeners.add(listener);
    listener({ ...this.stats });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    storageService.setItem('impact_stats', this.stats);
    this.listeners.forEach((listener) => listener({ ...this.stats }));
  }

  incrementArtisanCount(by: number = 1): void {
    this.stats.artisanCount += by;
    this.notify();
  }

  incrementApprovedProductCount(by: number = 1): void {
    this.stats.approvedProductCount += by;
    this.notify();
  }

  incrementOrderedCount(orderValue: number = 0): void {
    this.stats.orderedCount += 1;
    if (orderValue > 0) {
      this.stats.totalRevenueGenerated += orderValue;
    }
    this.notify();
  }

  incrementDeliveredCount(): void {
    this.stats.deliveredCount += 1;
    this.notify();
  }

  resetToDefaults(): void {
    this.stats = { ...INITIAL_IMPACT_STATISTICS };
    this.notify();
  }
}

export const impactStatisticsService = new ImpactStatisticsService();
