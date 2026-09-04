import React, { useState, useEffect } from 'react';
import { trackingService } from '../../services/trackingService';
import { orderService } from '../../services/orderService';
import { deliveryService } from '../../services/deliveryService';
import { TrackingEvent, Order, Delivery } from '../../types';
import { DEMO_TRACKING_ID } from '../../data/seedData';
import { StatusBadge } from '../common/StatusBadge';
import { DeliveryRouteMap } from '../delivery/DeliveryRouteMap';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Package,
  QrCode,
  Sparkles,
  Smartphone,
  ChevronRight
} from 'lucide-react';

interface OrderTrackingViewProps {
  initialTrackingId?: string;
  onOpenQr?: (trackingId: string) => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  initialTrackingId = DEMO_TRACKING_ID,
  onOpenQr
}) => {
  const [searchInput, setSearchInput] = useState<string>(initialTrackingId);
  const [activeTrackingId, setActiveTrackingId] = useState<string>(initialTrackingId);
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [delivery, setDelivery] = useState<Delivery | undefined>(undefined);

  useEffect(() => {
    const unsubTracking = trackingService.subscribe(() => {
      loadData(activeTrackingId);
    });

    const unsubOrders = orderService.subscribe(() => {
      loadData(activeTrackingId);
    });

    const unsubDeliveries = deliveryService.subscribe(() => {
      loadData(activeTrackingId);
    });

    return () => {
      unsubTracking();
      unsubOrders();
      unsubDeliveries();
    };
  }, [activeTrackingId]);

  const loadData = (id: string) => {
    const evts = trackingService.getEventsForTrackingId(id);
    const ord = orderService.getOrderByTrackingId(id);
    const del = deliveryService.getDeliveryByTrackingId(id);

    setEvents(evts);
    setOrder(ord);
    setDelivery(del);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveTrackingId(searchInput.trim().toUpperCase());
      loadData(searchInput.trim().toUpperCase());
    }
  };

  // 6 Defined Standard Milestone Checkpoints for the timeline
  const milestones = [
    { key: 'ORDER_PLACED', label: 'Order Confirmed', role: 'Customer Gateway' },
    { key: 'PAYMENT_CONFIRMED', label: 'Payment & Handover Authorized', role: 'Gateway & Logistics' },
    { key: 'PICKED_UP', label: 'Picked Up from Workshop', role: 'Logistics Partner' },
    { key: 'IN_TRANSIT', label: 'In Transit via Regional Corridor', role: 'Express Fleet' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Doorstep Delivery', role: 'Last-Mile Courier' },
    { key: 'DELIVERED', label: 'Delivered & Completed', role: 'Recipient POD' }
  ];

  const currentStatus = delivery?.status || order?.orderStatus || 'IN_TRANSIT';

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      {/* Title & Search Bar */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-craft-50 border border-craft-200 text-craft-800 text-xs font-bold uppercase tracking-wider">
          <Truck className="w-3.5 h-3.5 text-craft-600" />
          <span>Real-Time Consignment Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Track Your ShilpSetu Order
        </h1>
        <p className="text-slate-600 text-sm">
          Trace your handcrafted heritage product from rural artisan clusters directly to your doorstep.
        </p>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="pt-2">
          <div className="relative max-w-lg mx-auto flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Tracking ID (e.g. SHP-2026-7K29A4)"
              className="w-full pl-12 pr-32 py-4 rounded-2xl border-2 border-craft-300 bg-white font-mono text-sm focus:border-craft-600 focus:outline-hidden shadow-lg shadow-craft-500/10"
            />
            <button
              type="submit"
              className="absolute right-2 px-6 py-2.5 rounded-xl bg-craft-600 hover:bg-craft-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Track
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-2">
            <span>Try demo consignment:</span>
            <button
              type="button"
              onClick={() => {
                setSearchInput(DEMO_TRACKING_ID);
                setActiveTrackingId(DEMO_TRACKING_ID);
                loadData(DEMO_TRACKING_ID);
              }}
              className="text-craft-700 font-mono font-bold hover:underline"
            >
              {DEMO_TRACKING_ID}
            </button>
          </div>
        </form>
      </div>

      {/* Main Consignment Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-craft-lg space-y-8">
        {/* Consignment Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold uppercase text-slate-400">Tracking Reference:</span>
              <span className="font-mono text-lg font-extrabold text-craft-700 bg-craft-50 px-3 py-1 rounded-xl border border-craft-200">
                {activeTrackingId}
              </span>
            </div>
            {order && (
              <p className="text-xs text-slate-500 mt-1">
                Order ID: <strong className="text-slate-800">{order.orderId}</strong> • Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={currentStatus} size="lg" />
          </div>
        </div>

        {/* Product & Artisan Provenance Summary */}
        {order && order.products && order.products[0] && (
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={order.products[0].product.enhancedImage || order.products[0].product.images[0]}
                alt={order.products[0].product.name}
                className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-xs flex-shrink-0"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  {order.products[0].product.name}
                </h4>
                <p className="text-xs text-craft-700 font-medium">
                  Artisan: <strong>{order.artisanName}</strong> ({order.artisanLocation})
                </p>
                <p className="text-[11px] text-slate-500">
                  Destination: {order.shippingAddress.generalArea || order.shippingAddress.city}
                </p>
              </div>
            </div>

            <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Value</span>
              <span className="text-lg font-extrabold text-slate-900 font-mono">
                ₹{order.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}

        {/* STRONGEST VISUAL ELEMENT: THE DELIVERY TIMELINE (SECTION 30) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-craft-700">
                Milestone Verification History
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                DELIVERY TIMELINE
              </h3>
            </div>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Immutable Chain Log</span>
            </span>
          </div>

          {/* Timeline Nodes */}
          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {events.map((evt, idx) => {
              const isLast = idx === events.length - 1;
              const isDelivered = evt.status === 'DELIVERED';

              return (
                <div key={evt.trackingEventId} className="relative group">
                  {/* Status Indicator Icon */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 shadow-xs transition-transform group-hover:scale-110 ${
                      isDelivered
                        ? 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-100'
                        : isLast
                        ? 'bg-amber-500 text-slate-950 border-amber-300 ring-4 ring-amber-100 animate-pulse'
                        : 'bg-white text-emerald-600 border-emerald-500'
                    }`}
                  >
                    {isDelivered ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : isLast ? (
                      <span className="text-xs font-extrabold">●</span>
                    ) : (
                      <span className="text-xs font-extrabold">✓</span>
                    )}
                  </div>

                  {/* Event Details Card */}
                  <div className="bg-slate-50 hover:bg-craft-50/40 rounded-2xl p-5 border border-slate-200/80 shadow-xs transition-all space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                          {evt.title}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                          {evt.actorRole}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-500 font-medium">
                        {evt.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-craft-600 flex-shrink-0" />
                        <span>{evt.generalLocation}</span>
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        Log Ref: #{evt.trackingEventId.slice(-6)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simulated Route Visualization Map */}
        <div className="pt-4 border-t border-slate-100">
          <DeliveryRouteMap trackingId={activeTrackingId} status={currentStatus} />
        </div>
      </div>
    </div>
  );
};
