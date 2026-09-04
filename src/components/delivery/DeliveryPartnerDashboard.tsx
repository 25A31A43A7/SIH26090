import React, { useEffect, useState } from 'react';
import { Delivery, DeliveryStatus } from '../../types';
import { deliveryService } from '../../services/deliveryService';
import { StatusBadge } from '../common/StatusBadge';
import { QrScannerModal } from './QrScannerModal';
import { QrCodeModal } from '../common/QrCodeModal';
import { DeliveryRouteMap } from './DeliveryRouteMap';
import {
  Truck,
  Scan,
  CheckCircle2,
  Navigation,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  QrCode,
  PackageCheck,
  Play
} from 'lucide-react';

interface DeliveryPartnerDashboardProps {
  onTrackOrder: (trackingId: string) => void;
}

export const DeliveryPartnerDashboard: React.FC<DeliveryPartnerDashboardProps> = ({ onTrackOrder }) => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [qrModalTrackingId, setQrModalTrackingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'ALL'>('ACTIVE');

  useEffect(() => {
    return deliveryService.subscribe((all) => {
      setDeliveries(all);
    });
  }, []);

  const handleUpdateStatus = (trackingId: string, status: DeliveryStatus) => {
    deliveryService.updateDeliveryStatus(trackingId, status);
  };

  const handleScanSuccess = (trackingId: string) => {
    const del = deliveryService.getDeliveryByTrackingId(trackingId);
    if (del && del.status === 'PENDING_PICKUP') {
      deliveryService.updateDeliveryStatus(trackingId, 'PICKED_UP');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2 border border-purple-500/30">
            <Truck className="w-4 h-4 text-purple-400" />
            <span>ShilpSetu Smart Logistics Network</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Delivery Partner Console
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-lg">
            Officer: <strong>Rajesh Kumar</strong> (Hub 04, South Hyderabad). Advance consignment stages, scan physical handicraft tags, and verify final customer handovers.
          </p>
        </div>

        <button
          onClick={() => setIsScannerOpen(true)}
          className="px-6 py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm shadow-xl shadow-purple-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2 flex-shrink-0"
        >
          <Scan className="w-5 h-5" />
          <span>Scan Consignment QR</span>
        </button>
      </div>

      {/* Active Live Consignments */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Assigned Craft Deliveries</h3>
            <p className="text-xs text-slate-500">Live demonstration packages assigned for fulfillment</p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            {deliveries.length} Packages Assigned
          </span>
        </div>

        {deliveries.map((delivery) => (
          <div
            key={delivery.deliveryId}
            className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-md hover:shadow-craft-lg transition-all space-y-6"
          >
            {/* Top Bar with Tracking ID and Status */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-slate-400">Tracking Ref:</span>
                  <span className="font-mono text-base font-extrabold text-craft-700 bg-craft-50 px-3 py-1 rounded-xl border border-craft-200">
                    {delivery.trackingId}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    (Order #{delivery.orderId})
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Current Checkpoint: <strong className="text-slate-800">{delivery.currentCheckpoint}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={delivery.status} size="lg" />
                <button
                  onClick={() => setQrModalTrackingId(delivery.trackingId)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                  title="View Physical QR Tag"
                >
                  <QrCode className="w-5 h-5 text-craft-600" />
                </button>
              </div>
            </div>

            {/* Route Map Visualizer */}
            <DeliveryRouteMap trackingId={delivery.trackingId} status={delivery.status} />

            {/* Pick-up / Destination Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[10px] block">
                  1. Artisan Workshop Origin
                </span>
                <p className="font-bold text-slate-900 text-sm">{delivery.pickupArea}</p>
                <p className="text-slate-500">Collected with verified QR handover tag</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[10px] block">
                  2. Destination Customer Hub
                </span>
                <p className="font-bold text-slate-900 text-sm">{delivery.destinationArea}</p>
                <p className="text-slate-500">Final doorstep recipient verification</p>
              </div>
            </div>

            {/* Interactive Milestone Action Buttons for Judges to test status transitions */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Interactive Live Status Controls
                </span>
                <p className="text-xs text-slate-300">
                  Click below to advance this delivery through each live milestone:
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* 1. Picked Up */}
                <button
                  onClick={() => handleUpdateStatus(delivery.trackingId, 'PICKED_UP')}
                  disabled={delivery.status === 'PICKED_UP' || delivery.status === 'IN_TRANSIT' || delivery.status === 'OUT_FOR_DELIVERY' || delivery.status === 'DELIVERED'}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    delivery.status === 'PENDING_PICKUP'
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md font-extrabold'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  ✓ Picked Up
                </button>

                {/* 2. Start Transit */}
                <button
                  onClick={() => handleUpdateStatus(delivery.trackingId, 'IN_TRANSIT')}
                  disabled={delivery.status === 'IN_TRANSIT' || delivery.status === 'OUT_FOR_DELIVERY' || delivery.status === 'DELIVERED'}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    delivery.status === 'PICKED_UP'
                      ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-md font-extrabold'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  ⚡ Start Transit
                </button>

                {/* 3. Out for Delivery */}
                <button
                  onClick={() => handleUpdateStatus(delivery.trackingId, 'OUT_FOR_DELIVERY')}
                  disabled={delivery.status === 'OUT_FOR_DELIVERY' || delivery.status === 'DELIVERED'}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    delivery.status === 'IN_TRANSIT'
                      ? 'bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-md font-extrabold'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  🛵 Out for Delivery
                </button>

                {/* 4. Mark Delivered */}
                <button
                  onClick={() => handleUpdateStatus(delivery.trackingId, 'DELIVERED')}
                  disabled={delivery.status === 'DELIVERED'}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    delivery.status === 'OUT_FOR_DELIVERY' || delivery.status === 'IN_TRANSIT'
                      ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg font-extrabold animate-pulse'
                      : delivery.status === 'DELIVERED'
                      ? 'bg-emerald-900/60 text-emerald-300 cursor-not-allowed font-semibold'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  🎉 Mark Delivered
                </button>

                {/* Quick Link to Customer Tracking Screen */}
                <button
                  onClick={() => onTrackOrder(delivery.trackingId)}
                  className="px-3.5 py-2 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold"
                >
                  View Public Tracking &rarr;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      {qrModalTrackingId && (
        <QrCodeModal
          isOpen={Boolean(qrModalTrackingId)}
          onClose={() => setQrModalTrackingId(null)}
          trackingId={qrModalTrackingId}
          orderId="ORD-98214"
          craftName="Kondapalli Traditional Dancing Doll"
          artisanName="Lakshmi Devi (Kondapalli)"
          destination="Banjara Hills, Hyderabad"
        />
      )}
    </div>
  );
};
