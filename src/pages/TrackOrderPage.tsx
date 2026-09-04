import React from 'react';
import { OrderTrackingView } from '../components/tracking/OrderTrackingView';
import { DEMO_TRACKING_ID } from '../data/seedData';

interface TrackOrderPageProps {
  initialTrackingId?: string;
}

export const TrackOrderPage: React.FC<TrackOrderPageProps> = ({ initialTrackingId = DEMO_TRACKING_ID }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <OrderTrackingView initialTrackingId={initialTrackingId} />
    </div>
  );
};
