export interface RouteCheckpoint {
  id: string;
  name: string;
  type: 'pickup' | 'hub' | 'transit' | 'local_hub' | 'destination';
  location: string;
  lat: number;
  lng: number;
  status: 'completed' | 'current' | 'upcoming';
  timeEstimate?: string;
}

export interface RouteData {
  trackingId: string;
  origin: string;
  destination: string;
  totalDistanceKm: number;
  estimatedHours: number;
  currentProgressPercent: number;
  checkpoints: RouteCheckpoint[];
}

class MapService {
  getRouteForTracking(trackingId: string, status: string): RouteData {
    // Standard realistic route Kondapalli (AP) to Hyderabad (Telangana) ~275 KM
    let progress = 60;
    if (status === 'ORDER_PLACED' || status === 'PENDING_PICKUP') progress = 15;
    else if (status === 'PICKED_UP') progress = 35;
    else if (status === 'IN_TRANSIT') progress = 65;
    else if (status === 'OUT_FOR_DELIVERY') progress = 90;
    else if (status === 'DELIVERED') progress = 100;

    const checkpoints: RouteCheckpoint[] = [
      {
        id: 'cp_1',
        name: 'Artisan Workshop Cluster',
        type: 'pickup',
        location: 'Kondapalli, Krishna Dist, AP',
        lat: 16.6198,
        lng: 80.5369,
        status: progress >= 35 ? 'completed' : 'current',
        timeEstimate: 'Completed'
      },
      {
        id: 'cp_2',
        name: 'Krishna Valley Regional Logistics Hub',
        type: 'hub',
        location: 'Vijayawada Outer Ring, AP',
        lat: 16.5062,
        lng: 80.6480,
        status: progress > 35 ? 'completed' : progress === 35 ? 'current' : 'upcoming',
        timeEstimate: progress > 35 ? 'Completed' : '1 hr'
      },
      {
        id: 'cp_3',
        name: 'NH65 National Express Corridor',
        type: 'transit',
        location: 'Suryapet Transit Corridor',
        lat: 17.1439,
        lng: 79.6239,
        status: progress > 65 ? 'completed' : progress === 65 ? 'current' : 'upcoming',
        timeEstimate: progress > 65 ? 'Completed' : '3 hrs'
      },
      {
        id: 'cp_4',
        name: 'Sorting Hub 04 (South Zone)',
        type: 'local_hub',
        location: 'LB Nagar / Shamshabad, Hyderabad',
        lat: 17.3616,
        lng: 78.4747,
        status: progress >= 90 ? 'completed' : progress === 65 ? 'upcoming' : 'upcoming',
        timeEstimate: 'Arrived at Hub'
      },
      {
        id: 'cp_5',
        name: 'Customer Delivery Address',
        type: 'destination',
        location: 'Banjara Hills, Hyderabad, TS',
        lat: 17.4156,
        lng: 78.4354,
        status: progress === 100 ? 'completed' : progress === 90 ? 'current' : 'upcoming',
        timeEstimate: progress === 100 ? 'Delivered' : 'Today by 5:30 PM'
      }
    ];

    return {
      trackingId,
      origin: 'Kondapalli Craft Cluster, AP',
      destination: 'Banjara Hills, Hyderabad, TS',
      totalDistanceKm: 274,
      estimatedHours: 6.5,
      currentProgressPercent: progress,
      checkpoints
    };
  }
}

export const mapService = new MapService();
