import { Artisan, GovernmentApproval, VerificationStatus } from '../types';
import { SEED_ARTISANS } from '../data/seedData';
import { storageService } from './storageService';
import { impactStatisticsService } from './impactStatisticsService';
import { notificationService } from './notificationService';

type ArtisanListener = (artisans: Artisan[]) => void;

class GovernmentService {
  private artisans: Artisan[] = [];
  private listeners: Set<ArtisanListener> = new Set();

  constructor() {
    this.artisans = storageService.getItem<Artisan[]>('artisans_registry', SEED_ARTISANS);
  }

  getArtisans(): Artisan[] {
    return [...this.artisans];
  }

  getPendingArtisans(): Artisan[] {
    return this.artisans.filter((a) => a.verificationStatus === 'PENDING');
  }

  getVerifiedArtisans(): Artisan[] {
    return this.artisans.filter((a) => a.verificationStatus === 'VERIFIED');
  }

  getArtisanById(artisanId: string): Artisan | undefined {
    return this.artisans.find((a) => a.artisanId === artisanId);
  }

  verifyArtisan(artisanId: string, officerName: string = 'Dr. Sunita Verma, IAS'): boolean {
    const artisan = this.getArtisanById(artisanId);
    if (!artisan) return false;

    this.artisans = this.artisans.map((a) => {
      if (a.artisanId === artisanId) {
        return {
          ...a,
          verificationStatus: 'VERIFIED' as VerificationStatus,
          bankAccountVerified: true
        };
      }
      return a;
    });

    this.save();

    // 1. Increment Impact Statistics
    impactStatisticsService.incrementArtisanCount(1);

    // 2. Notify Artisan
    notificationService.addNotification({
      recipientId: artisan.userId,
      recipientRole: 'artisan',
      type: 'VERIFICATION',
      title: '🇮🇳 Government Verification Approved!',
      message: `Congratulations ${artisan.name}! Your master artisan profile for "${artisan.craftType}" has been authenticated by Ministry of Textiles.`,
      actionUrl: 'artisan'
    });

    notificationService.showToast(
      'Artisan Verified',
      `Master Artisan ${artisan.name} (${artisan.craftType}) is now officially certified.`,
      'success'
    );

    return true;
  }

  rejectArtisan(artisanId: string, remarks: string): boolean {
    const artisan = this.getArtisanById(artisanId);
    if (!artisan) return false;

    this.artisans = this.artisans.map((a) => {
      if (a.artisanId === artisanId) {
        return {
          ...a,
          verificationStatus: 'REJECTED' as VerificationStatus
        };
      }
      return a;
    });

    this.save();

    notificationService.addNotification({
      recipientId: artisan.userId,
      recipientRole: 'artisan',
      type: 'VERIFICATION',
      title: 'Verification Action Required',
      message: `Your artisan application requires additional GI craft certificate documentation: ${remarks}`,
      actionUrl: 'artisan'
    });

    notificationService.showToast(
      'Artisan Application Flagged',
      `Remarks recorded for ${artisan.name}.`,
      'info'
    );

    return true;
  }

  subscribe(listener: ArtisanListener): () => void {
    this.listeners.add(listener);
    listener([...this.artisans]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private save() {
    storageService.setItem('artisans_registry', this.artisans);
    this.listeners.forEach((l) => l([...this.artisans]));
  }
}

export const governmentService = new GovernmentService();
